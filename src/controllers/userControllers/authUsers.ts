import { Request, Response } from "express";
import { Op } from "sequelize";
import { v4 as uuidV4 } from "uuid";
import {
  HTTP_STATUS_CODE,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN,
} from "../../constants";
import { passwordUtils, PasswordHarsher, Jwt } from "../../utilities/helpers";
import logger from "../../utilities/logger";
import { registerSchema, loginSchema } from "../../utilities/validators";
import Users from "../../models/users";
import { ENV } from "../../config";

export const registerUser = async (req: Request, res: Response) => {
  const passwordRegex = passwordUtils.regex;
  try {
    const userValidate = registerSchema.strict().safeParse(req.body);

    if (userValidate.success) {
      const { firstName, lastName, email, phone, password } = userValidate.data;
      const newEmail = email.trim().toLowerCase();

      if (!passwordRegex.test(password)) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          message: passwordUtils.error,
        });
      }
      const userExist = await Users.findOne({
        where: {
          [Op.or]: [{ email: newEmail }, { phone: phone }],
        },
      });
      if (!userExist) {
        const hashedPassword = await PasswordHarsher.hash(password);
        const id = uuidV4();

        const user = await Users.create({
          id,
          firstName,
          lastName,
          email: newEmail,
          phone,
          password: hashedPassword,
        });

        return res.status(HTTP_STATUS_CODE.SUCCESS).json({
          message: `Registration Successful`,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        });
      } else {
        return res.status(HTTP_STATUS_CODE.CONFLICT).send({
          message: "This account already exist",
        });
      }
    }
  } catch (error) {
    logger.error(error);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: [
        { message: `This is our fault, our team are working to resolve this.` },
      ],
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const validationResult = loginSchema.strict().safeParse(req.body);

    if (!validationResult.success) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: validationResult.error.issues,
      });
    }

    const { email, password } = validationResult.data;

    const confirmUser = await Users.findOne({
      where: { email: email },
    });

    if (confirmUser) {
      const confirmPassword = await PasswordHarsher.compare(
        password,
        confirmUser.password
      );

      if (confirmPassword) {
        const payload = {
          id: confirmUser.id,
        };

        const accessToken = await Jwt.sign(payload, {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        });

        const refreshToken = await Jwt.sign(payload, {
          expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
          _secret: process.env.JWT_REFRESH_SECRET,
        });

        res.cookie(REFRESH_TOKEN, refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: ENV.IS_PROD,
        });

        // Return basic user data to client-side
        return res.status(HTTP_STATUS_CODE.SUCCESS).json({
          message: [`Login Successful`],
          user: {
            id: confirmUser.id,
            email: confirmUser.email,
            firstName: confirmUser.firstName,
            lastName: confirmUser.lastName,
          },
          token: accessToken,
        });
      }
    }

    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
      message: "Invalid Credentials!",
    });
  } catch (error) {
    console.log("error", error);

    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: [`This is our fault, our team are working to resolve this.`],
    });
  }
};

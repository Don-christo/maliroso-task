import { Response } from "express";
import { RequestExt } from "../../middlewares/authorization/authentication";
import { HTTP_STATUS_CODE } from "../../constants";
import { v4 as uuidV4 } from "uuid";
import Products from "../../models/product";
import { createProductSchema } from "../../utilities/validators";
import logger from "../../utilities/logger";

export const createProduct = async (req: RequestExt, res: Response) => {
  const { _user: user, _userId: userId, ...rest } = req.body;

  const requestData = createProductSchema.strict().safeParse(rest);

  if (!requestData.success) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      message: requestData.error.issues,
    });
  }
  const _data = requestData.data;
  const productId = uuidV4();

  try {
    const newProduct = {
      id: productId,
      name: _data.name,
    };
    const createdProduct = await Products.create(newProduct);
    return res.status(HTTP_STATUS_CODE.CREATED).json({
      message: "Group created successfully",
      product: createdProduct,
    });
  } catch (error) {
    logger.error(error);
    await Products.destroy({ where: { id: productId } });
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: "Something went wrong, our team has been notified.",
    });
  }
};

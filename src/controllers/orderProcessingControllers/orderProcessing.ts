import { Response } from "express";
import Order from "../../models/order";
import { RequestExt } from "../../middlewares/authorization/authentication";
import logger from "../../utilities/logger";
import { HTTP_STATUS_CODE } from "../../constants";
import { v4 as uuidV4 } from "uuid";
import { createOrderSchema } from "../../utilities/validators";

export const createOrder = async (req: RequestExt, res: Response) => {
  const { _user: user, _userId: userId, ...rest } = req.body;
  const requestData = createOrderSchema.strict().safeParse(rest);

  if (!requestData.success) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      message: requestData.error.issues,
    });
  }
  const _data = requestData.data;
  try {
    const user = userId;
    const id = uuidV4();

    // Create a new order
    const order = await Order.create({
      id,
      userId: user,
      product: _data.product,
      quantity: _data.quantity,
    });
    return res.status(HTTP_STATUS_CODE.CREATED).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    logger.error(error);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: `Something went wrong, our team has been notified.`,
    });
  }
};

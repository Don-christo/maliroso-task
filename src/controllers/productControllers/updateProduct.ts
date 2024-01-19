import { Response } from "express";
import { RequestExt } from "../../middlewares/authorization/authentication";
import { HTTP_STATUS_CODE } from "../../constants";
import Products from "../../models/product";
import logger from "../../utilities/logger";

export const updateProduct = async (req: RequestExt, res: Response) => {
  try {
    const { _user: user, _userId: userId, ...rest } = req.body;
    const productId = req.params.productId;

    // Find the product by ID
    const existingProduct = await Products.findByPk(productId);

    if (!existingProduct) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        message: `Product not found`,
      });
    }

    // Update the product
    await existingProduct.update(rest);

    // Fetch the updated product
    const updatedProduct = await Products.findByPk(productId);

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: `Product updated successfully`,
      updatedProduct,
    });
  } catch (error) {
    logger.error(error);
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: "Something went wrong, our team has been notified.",
    });
  }
};

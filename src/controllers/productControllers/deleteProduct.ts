import { Response } from "express";
import { RequestExt } from "../../middlewares/authorization/authentication";
import { HTTP_STATUS_CODE } from "../../constants";
import Products from "../../models/product";
import logger from "../../utilities/logger";

export const deleteProduct = async (req: RequestExt, res: Response) => {
  try {
    const productId = req.params.id;

    // Find the product by ID and delete it
    const deletedProduct = await Products.findByPk(productId);

    if (!deletedProduct) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        message: `Product not found`,
      });
    }

    await deletedProduct.destroy();

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: `Product deleted successfully`,
      deletedProduct,
    });
  } catch (error) {
    logger.error(error);
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: "Something went wrong, our team has been notified.",
    });
  }
};

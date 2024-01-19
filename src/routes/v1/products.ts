import { Router } from "express";
import {
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/productControllers";
import { authorizationMiddleware } from "../../middlewares/authorization/authentication";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: APIs for managing products
 * paths:
 *   /api/v1/products/createProduct:
 *     post:
 *       summary: Create a new product
 *       tags: [Products]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *               example:
 *                 name: "New Product"
 *       responses:
 *         201:
 *           description: Product created successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "Product created successfully"
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 message: "Validation error"
 *                 issues:
 *                   - "name is required"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error, please try again later"
 */
router.post("/createProduct", authorizationMiddleware, createProduct);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: APIs for managing products
 * paths:
 *   /api/v1/products/{productId}:
 *     get:
 *       summary: Retrieve product by ID
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: productId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the product to retrieve
 *       responses:
 *         200:
 *           description: Product retrieved successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "Product retrieved successfully"
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *         404:
 *           description: Product not found
 *           content:
 *             application/json:
 *               example:
 *                 message: "Product not found"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error, please try again later"
 */
router.get("/readProduct", authorizationMiddleware, readProduct);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: APIs for managing products
 * paths:
 *   /api/v1/products/{productId}:
 *     put:
 *       summary: Update product by ID
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: productId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the product to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *               example:
 *                 name: "Updated Product Name"
 *       responses:
 *         200:
 *           description: Product updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "Product updated successfully"
 *                 updatedProduct:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *         404:
 *           description: Product not found
 *           content:
 *             application/json:
 *               example:
 *                 message: "Product not found"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error, please try again later"
 */
router.put("/updateProduct", authorizationMiddleware, updateProduct);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: APIs for managing products
 * paths:
 *   /api/v1/products/{productId}:
 *     delete:
 *       summary: Delete product by ID
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: productId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the product to delete
 *       responses:
 *         200:
 *           description: Product deleted successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "Product deleted successfully"
 *                 deletedProduct:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *         404:
 *           description: Product not found
 *           content:
 *             application/json:
 *               example:
 *                 message: "Product not found"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error, please try again later"
 */
router.delete("/deleteProduct", authorizationMiddleware, deleteProduct);

export default router;

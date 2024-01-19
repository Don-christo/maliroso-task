import { Router } from "express";
import { createOrder } from "../../controllers/orderProcessingControllers";
import { authorizationMiddleware } from "../../middlewares/authorization/authentication";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: APIs for managing orders
 * paths:
 *   /api/v1/orders/create:
 *     post:
 *       summary: Place a new order
 *       tags: [Orders]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: string
 *                   description: ID or name of the product
 *                 quantity:
 *                   type: integer
 *                   description: Quantity of the product to be ordered
 *               example:
 *                 product: "Product123"
 *                 quantity: 2
 *       responses:
 *         201:
 *           description: Order placed successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "Order placed successfully."
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 message: "Validation error"
 *                 issues:
 *                   - "product is required"
 *                   - "quantity must be a positive integer"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error, please try again later"
 */
router.post("/create", authorizationMiddleware, createOrder);

export default router;

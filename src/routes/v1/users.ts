import { Router } from "express";
import { registerUser, loginUser } from "../../controllers/userControllers";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 * tags:
 *   name: Users
 *   description: All user APIs
 * paths:
 *   /api/v1/users/register:
 *     post:
 *       summary: Register new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       responses:
 *         200:
 *           description: Registration successful
 *           content:
 *             application/json:
 *               example:
 *                 message: "Registration Successful."
 *                 user:
 *                   type: object
 *                   properties:
 *                     firstName: string
 *                     lastName: string
 *                     email: string
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Password mismatch"
 *         409:
 *           description: Conflict
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Account already exists"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
router.post("/register", registerUser);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: All user APIs
 * paths:
 *   /api/v1/users/login:
 *     post:
 *       summary: Login user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email address of the user
 *                 password:
 *                   type: string
 *                   format: password
 *                   description: User password
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       token:
 *                         type: string
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Invalid email or password"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
router.post("/login", loginUser);

export default router;

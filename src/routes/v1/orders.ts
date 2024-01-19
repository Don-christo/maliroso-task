import { Router } from "express";
import { createOrder } from "../../controllers/orderProcessingControllers";
import { authorizationMiddleware } from "../../middlewares/authorization/authentication";

const router = Router();

router.post("/order", authorizationMiddleware, createOrder);

export default router;

import { Router } from "express";
import userRoutes from './users'
import productRoutes from './products'
import orderRoutes from './orders'

const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

export default router;
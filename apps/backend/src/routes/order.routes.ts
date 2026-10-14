import { Router } from "express";
import { createOrder, getAllOrders, getSpecificOrder } from "../controllers/order.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/get-all-orders', getAllOrders); 
router.get('/get-specific-order/:id', getSpecificOrder);
router.post('/create-order', authenticate, createOrder); 

export default router;  
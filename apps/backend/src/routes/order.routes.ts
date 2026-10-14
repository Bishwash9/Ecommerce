import { Router } from "express";
import { createOrder, getAllOrders, getSpecificOrder } from "../controllers/order.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/get-all-orders', authenticate, authorizeAdmin, getAllOrders); 
router.get('/get-specific-order/:id', authenticate, authorizeAdmin, getSpecificOrder);
router.post('/create-order', authenticate, createOrder); 

export default router;  
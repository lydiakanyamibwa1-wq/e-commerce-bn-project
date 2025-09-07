import express from 'express';
import orderController from '../controllers/orderController';
import validate from '../middleware/validate';
import { updateOrderSchema } from '../validation/orderValidation';

const orderRoutes = express.Router();
const { saveOrder, deleteOrder, getOrderById, getAllOrders, updateOrder } = orderController;

orderRoutes.post('/', saveOrder);
orderRoutes.get('/', getAllOrders);
orderRoutes.get('/:id', getOrderById);
orderRoutes.delete('/:id', deleteOrder);
orderRoutes.put('/:id', validate(updateOrderSchema), updateOrder);

export default orderRoutes;

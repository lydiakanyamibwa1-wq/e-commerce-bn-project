import express from 'express';
const orderRoutes = express.Router();
import orderController from '../controllers/orderController';
const { saveOrder, deleteOrder, getOrderById, getAllOrders, updateOrder } = orderController;

orderRoutes.post('/', saveOrder);
orderRoutes.get('/', getAllOrders);
orderRoutes.get('/:id', getOrderById);
orderRoutes.delete('/:id', deleteOrder);
orderRoutes.put('/:id', updateOrder); 

export default orderRoutes;

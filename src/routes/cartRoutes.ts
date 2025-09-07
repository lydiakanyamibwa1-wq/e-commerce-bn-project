import express from 'express';
import cartController from '../controllers/cartControllers';
import validate from '../middleware/validate';
import { addCartItemSchema, updateCartItemSchema } from '../validation/cartValidation';

const cartRoutes = express.Router();
const { saveCartItem, deleteCartItem, updateCartItem, getAllCartItems, getCartItemById } = cartController;

cartRoutes.post('/', validate(addCartItemSchema), saveCartItem);
cartRoutes.put('/:productId', validate(updateCartItemSchema), updateCartItem);
cartRoutes.delete('/:productId', deleteCartItem);
cartRoutes.get('/:id', getCartItemById);
cartRoutes.get('/', getAllCartItems);

export default cartRoutes;

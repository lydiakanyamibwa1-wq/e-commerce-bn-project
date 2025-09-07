import express from 'express';
import productController from '../controllers/productController';
import validate from '../middleware/validate';
import { createProductSchema, updateProductSchema } from '../validation/productValidation';

const productRouter = express.Router();
const { saveProduct, deleteProduct, updateProduct, getProductbyid, getAllProducts } = productController;

productRouter.post('/', validate(createProductSchema), saveProduct);
productRouter.put('/:id', validate(updateProductSchema), updateProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.get('/:id', getProductbyid);
productRouter.get('/', getAllProducts);

export default productRouter;

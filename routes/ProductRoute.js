import express from 'express';
import {
  getProducts,
  getProductsForGuest,
  getProductById,
  getProductByIdForGuest,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/Products.js';
import { verfyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/products', verfyUser, getProducts);
router.get('/productsguest', getProductsForGuest);
router.get('/products/:id', verfyUser, getProductById);
router.get('/productsguest/:id', getProductByIdForGuest);
router.post('/products', verfyUser, createProduct);
router.put('/products/:id', verfyUser, updateProduct);
router.delete('/products/:id', verfyUser, deleteProduct);

export default router;

import express from 'express';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/itemController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '@src/middleware/validators/validation';
import { idValidator } from '@src/middleware/validators/customValidator';
import { createItemValidator, updateItemValidator } from '@src/middleware/validators/itemValidator';

const router = express.Router();

router.get('/', authMiddleware, getItems);

router.get('/:id', authMiddleware, validate(idValidator), getItem);

router.post('/', authMiddleware, validate(createItemValidator), createItem);

router.put('/:id', 
  authMiddleware, 
  validate([...idValidator, ...updateItemValidator]), 
  updateItem
);

router.delete('/:id', authMiddleware, validate(idValidator), deleteItem);

export default router;
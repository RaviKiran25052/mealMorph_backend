import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
	getPredefinedCategories
} from '../controllers/categoryController.js';

const router = Router();

// All routes are protected
router.use(auth);

// Category routes
router.get('/', getCategories);
router.get('/predefined', getPredefinedCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router; 
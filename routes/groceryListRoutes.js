import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
	getGroceryLists,
	getGroceryList,
	createGroceryList,
	addRecipeToGroceryList,
	updateGroceryListItem,
	removeGroceryListItem,
	deleteGroceryList
} from '../controllers/groceryListController.js';

const router = Router();

// All routes are protected
router.use(auth);

// Grocery list routes
router.get('/', getGroceryLists);
router.get('/:id', getGroceryList);
router.post('/', createGroceryList);
router.post('/:id/add-recipe', addRecipeToGroceryList);
router.patch('/:id/items/:itemId', updateGroceryListItem);
router.delete('/:id/items/:itemId', removeGroceryListItem);
router.delete('/:id', deleteGroceryList);

export default router; 
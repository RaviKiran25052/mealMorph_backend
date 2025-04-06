import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
	getRecipes,
	getRecipe,
	createRecipe,
	updateRecipe,
	deleteRecipe
} from '../controllers/recipeController.js';

const router = Router();

// All routes are protected
router.use(auth);

// Recipe routes
router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router; 
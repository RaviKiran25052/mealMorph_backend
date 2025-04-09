import { Router } from 'express';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import {
	getRecipes,
	getRecipe,
	createRecipe,
	updateRecipe,
	deleteRecipe,
	searchRecipesByIngredients
} from '../controllers/recipeController.js';

const router = Router();

// Public routes
router.get('/', getRecipes);
router.get('/search/ingredients', searchRecipesByIngredients);
router.get('/:id', getRecipe);

// Admin routes
router.use(auth);
router.use(adminAuth);
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router; 
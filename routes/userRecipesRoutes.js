import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
	addCookedRecipe,
	getCookedRecipes,
	addFavoriteRecipe,
	removeFavoriteRecipe,
	getFavoriteRecipes
} from '../controllers/userRecipesController.js';

const router = Router();

// All routes are protected
router.use(auth);

// Cooked recipes routes
router.post('/recipes/:recipeId/cooked', addCookedRecipe);
router.get('/recipes/cooked', getCookedRecipes);

// Favorite recipes routes
router.post('/recipes/:recipeId/favorite', addFavoriteRecipe);
router.delete('/recipes/:recipeId/favorite', removeFavoriteRecipe);
router.get('/recipes/favorites', getFavoriteRecipes);

export default router; 
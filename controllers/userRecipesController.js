import User from '../models/User.js';
import Recipe from '../models/Recipe.js';

// Add a recipe to cooked recipes
export const addCookedRecipe = async (req, res) => {
	try {
		const { recipeId } = req.params;
		const { notes } = req.body;
		const userId = req.user._id;

		// Check if recipe exists
		const recipe = await Recipe.findById(recipeId);
		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}

		// Check if already cooked
		const user = await User.findById(userId);
		const alreadyCooked = user.cookedRecipes.some(cr => cr.recipe.toString() === recipeId);
		if (alreadyCooked) {
			return res.status(400).json({ message: 'Recipe already marked as cooked' });
		}

		// Add to cooked recipes
		user.cookedRecipes.push({
			recipe: recipeId,
			notes
		});
		await user.save();

		res.status(201).json({ message: 'Recipe added to cooked recipes' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get user's cooked recipes
export const getCookedRecipes = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId)
			.populate('cookedRecipes.recipe')
			.select('cookedRecipes');

		res.json(user.cookedRecipes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Add recipe to favorites
export const addFavoriteRecipe = async (req, res) => {
	try {
		const { recipeId } = req.params;
		const userId = req.user._id;

		// Check if recipe exists
		const recipe = await Recipe.findById(recipeId);
		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}

		// Add to favorites if not already there
		const user = await User.findById(userId);
		if (user.favoriteRecipes.includes(recipeId)) {
			return res.status(400).json({ message: 'Recipe already in favorites' });
		}

		user.favoriteRecipes.push(recipeId);
		await user.save();

		res.status(201).json({ message: 'Recipe added to favorites' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Remove recipe from favorites
export const removeFavoriteRecipe = async (req, res) => {
	try {
		const { recipeId } = req.params;
		const userId = req.user._id;

		const user = await User.findById(userId);
		if (!user.favoriteRecipes.includes(recipeId)) {
			return res.status(400).json({ message: 'Recipe not in favorites' });
		}

		user.favoriteRecipes = user.favoriteRecipes.filter(
			id => id.toString() !== recipeId
		);
		await user.save();

		res.json({ message: 'Recipe removed from favorites' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get user's favorite recipes
export const getFavoriteRecipes = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId)
			.populate('favoriteRecipes')
			.select('favoriteRecipes');

		res.json(user.favoriteRecipes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}; 
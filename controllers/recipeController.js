import Recipe from '../models/Recipe.js';

// Get all recipes (public endpoint)
export const getRecipes = async (req, res) => {
	try {
		const { category, dishType, difficulty } = req.query;
		const filter = {};

		if (category) {
			filter.category = category;
		}
		if (dishType) {
			filter.dishType = dishType;
		}
		if (difficulty) {
			filter.difficulty = difficulty;
		}

		const recipes = await Recipe.find(filter)
			.sort({ createdAt: -1 });

		res.json(recipes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Search recipes by ingredients (public endpoint)
export const searchRecipesByIngredients = async (req, res) => {
	try {
		const { ingredients } = req.query;

		if (!ingredients) {
			return res.status(400).json({ message: 'Ingredients parameter is required' });
		}

		// Convert ingredients string to array and trim whitespace
		const ingredientList = ingredients.split(',').map(ing => ing.trim().toLowerCase());

		// Find all recipes that contain any of the specified ingredients
		const recipes = await Recipe.find({
			'ingredients.name': {
				$in: ingredientList
			}
		});

		// Calculate match count for each recipe and sort
		const recipesWithMatchCount = recipes.map(recipe => {
			const matchCount = recipe.ingredients.filter(ing =>
				ingredientList.includes(ing.name.toLowerCase())
			).length;
			return {
				...recipe.toObject(),
				matchCount,
				matchPercentage: (matchCount / ingredientList.length) * 100
			};
		}).sort((a, b) => b.matchCount - a.matchCount);

		res.json(recipesWithMatchCount);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a single recipe (public endpoint)
export const getRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);
		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}
		res.json(recipe);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Create a new recipe (admin only)
export const createRecipe = async (req, res) => {
	try {
		if (req.user.role !== 'admin') {
			return res.status(403).json({ message: 'Only admins can create recipes' });
		}

		const recipe = new Recipe(req.body);
		await recipe.save();
		res.status(201).json(recipe);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Update a recipe (admin only)
export const updateRecipe = async (req, res) => {
	try {
		if (req.user.role !== 'admin') {
			return res.status(403).json({ message: 'Only admins can update recipes' });
		}

		const recipe = await Recipe.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}

		res.json(recipe);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Delete a recipe (admin only)
export const deleteRecipe = async (req, res) => {
	try {
		if (req.user.role !== 'admin') {
			return res.status(403).json({ message: 'Only admins can delete recipes' });
		}

		const recipe = await Recipe.findByIdAndDelete(req.params.id);
		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}
		res.json({ message: 'Recipe deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}; 
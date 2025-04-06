import Recipe from '../models/Recipe.js';

// Get all recipes with optional filters
export const getRecipes = async (req, res) => {
	try {
		const filters = {};
		if (req.query.category) {
			filters.categories = req.query.category;
		}
		if (req.query.user) {
			filters.user = req.query.user;
		}
		if (req.query.dishType) {
			if (!['veg', 'non-veg'].includes(req.query.dishType)) {
				return res.status(400).json({
					message: 'Invalid dish type. Must be either "veg" or "non-veg"'
				});
			}
			filters.dishType = req.query.dishType;
		}

		const recipes = await Recipe.find(filters)
			.populate('categories', 'name')
			.populate('user', 'username')
			.sort({ createdAt: -1 });

		res.json(recipes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a single recipe by ID
export const getRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id)
			.populate('categories', 'name')
			.populate('user', 'username');

		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}

		res.json(recipe);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Create a new recipe
export const createRecipe = async (req, res) => {
	try {
		if (req.body.dishType && !['veg', 'non-veg'].includes(req.body.dishType)) {
			return res.status(400).json({
				message: 'Invalid dish type. Must be either "veg" or "non-veg"'
			});
		}

		const recipe = new Recipe({
			...req.body,
			user: req.user._id
		});

		const savedRecipe = await recipe.save();
		await savedRecipe.populate('categories', 'name');
		await savedRecipe.populate('user', 'username');

		res.status(201).json(savedRecipe);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Update a recipe
export const updateRecipe = async (req, res) => {
	try {
		if (req.body.dishType && !['veg', 'non-veg'].includes(req.body.dishType)) {
			return res.status(400).json({
				message: 'Invalid dish type. Must be either "veg" or "non-veg"'
			});
		}

		const recipe = await Recipe.findById(req.params.id);

		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}

		if (recipe.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: 'Not authorized to update this recipe' });
		}

		Object.assign(recipe, req.body);
		const updatedRecipe = await recipe.save();
		await updatedRecipe.populate('categories', 'name');
		await updatedRecipe.populate('user', 'username');

		res.json(updatedRecipe);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Delete a recipe
export const deleteRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);

		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}

		if (recipe.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: 'Not authorized to delete this recipe' });
		}

		await recipe.deleteOne();
		res.json({ message: 'Recipe deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}; 
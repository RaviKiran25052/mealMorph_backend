import GroceryList from '../models/GroceryList.js';
import Recipe from '../models/Recipe.js';

// Get all grocery lists for a user
export const getGroceryLists = async (req, res) => {
	try {
		const lists = await GroceryList.find({ user: req.user._id })
			.sort({ createdAt: -1 });
		res.json(lists);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a single grocery list
export const getGroceryList = async (req, res) => {
	try {
		const list = await GroceryList.findOne({
			_id: req.params.id,
			user: req.user._id
		}).populate('items.recipe', 'title');

		if (!list) {
			return res.status(404).json({ message: 'Grocery list not found' });
		}

		res.json(list);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Create a new grocery list
export const createGroceryList = async (req, res) => {
	try {
		const list = new GroceryList({
			...req.body,
			user: req.user._id
		});

		const savedList = await list.save();
		res.status(201).json(savedList);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Add recipe items to grocery list
export const addRecipeToGroceryList = async (req, res) => {
	try {
		const { recipeId, servings } = req.body;
		const list = await GroceryList.findOne({
			_id: req.params.id,
			user: req.user._id
		});

		if (!list) {
			return res.status(404).json({ message: 'Grocery list not found' });
		}

		const recipe = await Recipe.findById(recipeId);
		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}

		const servingMultiplier = servings / recipe.servings;
		const newItems = recipe.ingredients.map(ingredient => ({
			name: ingredient.name,
			quantity: ingredient.quantity * servingMultiplier,
			unit: ingredient.unit,
			recipe: recipe._id,
			category: 'From Recipe'
		}));

		list.items.push(...newItems);
		const updatedList = await list.save();
		await updatedList.populate('items.recipe', 'title');

		res.json(updatedList);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Update grocery list item
export const updateGroceryListItem = async (req, res) => {
	try {
		const list = await GroceryList.findOne({
			_id: req.params.id,
			user: req.user._id
		});

		if (!list) {
			return res.status(404).json({ message: 'Grocery list not found' });
		}

		const item = list.items.id(req.params.itemId);
		if (!item) {
			return res.status(404).json({ message: 'Item not found' });
		}

		Object.assign(item, req.body);
		const updatedList = await list.save();
		await updatedList.populate('items.recipe', 'title');

		res.json(updatedList);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Remove item from grocery list
export const removeGroceryListItem = async (req, res) => {
	try {
		const list = await GroceryList.findOne({
			_id: req.params.id,
			user: req.user._id
		});

		if (!list) {
			return res.status(404).json({ message: 'Grocery list not found' });
		}

		list.items.pull(req.params.itemId);
		const updatedList = await list.save();
		await updatedList.populate('items.recipe', 'title');

		res.json(updatedList);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Delete a grocery list
export const deleteGroceryList = async (req, res) => {
	try {
		const list = await GroceryList.findOneAndDelete({
			_id: req.params.id,
			user: req.user._id
		});

		if (!list) {
			return res.status(404).json({ message: 'Grocery list not found' });
		}

		res.json({ message: 'Grocery list deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}; 
import MealPlan from '../models/MealPlan.js';
import GroceryList from '../models/GroceryList.js';
import Recipe from '../models/Recipe.js';

// Get all meal plans for a user
export const getUserMealPlans = async (req, res) => {
	try {
		const mealPlans = await MealPlan.find({ user: req.user._id })
			.sort({ createdAt: -1 });

		return res.json(mealPlans);
	} catch (error) {
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Get a specific meal plan by ID
export const getMealPlanById = async (req, res) => {
	try {
		const mealPlan = await MealPlan.findOne({
			_id: req.params.id,
			user: req.user._id
		}).populate({
			path: 'meals.monday.breakfast meals.monday.lunch meals.monday.dinner ' +
				'meals.tuesday.breakfast meals.tuesday.lunch meals.tuesday.dinner ' +
				'meals.wednesday.breakfast meals.wednesday.lunch meals.wednesday.dinner ' +
				'meals.thursday.breakfast meals.thursday.lunch meals.thursday.dinner ' +
				'meals.friday.breakfast meals.friday.lunch meals.friday.dinner ' +
				'meals.saturday.breakfast meals.saturday.lunch meals.saturday.dinner ' +
				'meals.sunday.breakfast meals.sunday.lunch meals.sunday.dinner',
			select: 'title image prepTime cookTime servings dishType difficulty'
		});

		if (!mealPlan) {
			return res.status(404).json({ message: 'Meal plan not found' });
		}

		return res.json(mealPlan);
	} catch (error) {
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Create a new meal plan
export const createMealPlan = async (req, res) => {
	try {
		const newMealPlan = new MealPlan({
			user: req.user._id,
			meals: req.body.meals || {}
		});

		await newMealPlan.save();
		return res.status(201).json(newMealPlan);
	} catch (error) {
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Update an existing meal plan
export const updateMealPlan = async (req, res) => {
	try {
		const mealPlan = await MealPlan.findOne({
			_id: req.params.id,
			user: req.user._id
		});

		if (!mealPlan) {
			return res.status(404).json({ message: 'Meal plan not found' });
		}

		if (req.body.meals) mealPlan.meals = req.body.meals;

		await mealPlan.save();
		return res.json(mealPlan);
	} catch (error) {
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Delete a meal plan
export const deleteMealPlan = async (req, res) => {
	try {
		const result = await MealPlan.deleteOne({
			_id: req.params.id,
			user: req.user._id
		});

		if (result.deletedCount === 0) {
			return res.status(404).json({ message: 'Meal plan not found' });
		}

		return res.json({ message: 'Meal plan deleted successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Generate grocery list from meal plan
export const generateGroceryList = async (req, res) => {
	try {
		const mealPlan = await MealPlan.findOne({
			_id: req.params.id,
			user: req.user._id
		});

		if (!mealPlan) {
			return res.status(404).json({ message: 'Meal plan not found' });
		}

		// Collect all recipe IDs from the meal plan
		const recipeIds = [];
		Object.keys(mealPlan.meals).forEach(day => {
			Object.values(mealPlan.meals[day]).forEach(meal => {
				if (meal) recipeIds.push(meal);
			});
		});

		// Get all recipes with their ingredients
		const recipes = await Recipe.find({
			_id: { $in: recipeIds }
		}, 'title ingredients');

		// Collect and combine ingredients
		const ingredientMap = {};

		recipes.forEach(recipe => {
			recipe.ingredients.forEach(ingredient => {
				const key = `${ingredient.name}_${ingredient.unit}`;
				if (ingredientMap[key]) {
					ingredientMap[key].quantity += ingredient.quantity;
				} else {
					ingredientMap[key] = {
						name: ingredient.name,
						quantity: ingredient.quantity,
						unit: ingredient.unit,
						recipe: recipe._id
					};
				}
			});
		});

		// Create grocery list items
		const items = Object.values(ingredientMap).map(item => ({
			name: item.name,
			quantity: item.quantity,
			unit: item.unit,
			recipe: item.recipe,
			checked: false
		}));

		// Create the grocery list
		const groceryList = new GroceryList({
			name: `Grocery List for Meal Plan`,
			items: items,
			user: req.user._id
		});

		await groceryList.save();
		return res.status(201).json(groceryList);
	} catch (error) {
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};
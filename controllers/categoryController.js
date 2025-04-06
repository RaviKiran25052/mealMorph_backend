import Category from '../models/Category.js';

// Get all categories
export const getCategories = async (req, res) => {
	try {
		const categories = await Category.find({ user: req.user._id })
			.sort({ name: 1 });
		res.json(categories);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a single category
export const getCategory = async (req, res) => {
	try {
		const category = await Category.findOne({
			_id: req.params.id,
			user: req.user._id
		});

		if (!category) {
			return res.status(404).json({ message: 'Category not found' });
		}

		res.json(category);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Create a new category
export const createCategory = async (req, res) => {
	try {
		const category = new Category({
			...req.body,
			user: req.user._id
		});

		const savedCategory = await category.save();
		res.status(201).json(savedCategory);
	} catch (error) {
		if (error.code === 11000) {
			return res.status(400).json({
				message: 'Category name already exists for this user'
			});
		}
		res.status(400).json({ message: error.message });
	}
};

// Update a category
export const updateCategory = async (req, res) => {
	try {
		const category = await Category.findOne({
			_id: req.params.id,
			user: req.user._id
		});

		if (!category) {
			return res.status(404).json({ message: 'Category not found' });
		}

		Object.assign(category, req.body);
		const updatedCategory = await category.save();
		res.json(updatedCategory);
	} catch (error) {
		if (error.code === 11000) {
			return res.status(400).json({
				message: 'Category name already exists for this user'
			});
		}
		res.status(400).json({ message: error.message });
	}
};

// Delete a category
export const deleteCategory = async (req, res) => {
	try {
		const category = await Category.findOneAndDelete({
			_id: req.params.id,
			user: req.user._id
		});

		if (!category) {
			return res.status(404).json({ message: 'Category not found' });
		}

		res.json({ message: 'Category deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get predefined categories
export const getPredefinedCategories = async (req, res) => {
	try {
		const predefinedCategories = [
			'Breakfast',
			'Lunch',
			'Dinner',
			'Desserts',
			'Snacks',
			'Vegetarian',
			'Non-Vegetarian',
			'Seafood',
			'Soups',
			'Smoothies',
			'Cake'
		];

		res.json(predefinedCategories);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}; 
import Feedback from '../models/Feedback.js';
import Recipe from '../models/Recipe.js';
import {
	addFeedbackToRecipe,
	removeFeedbackFromRecipe,
	updateFeedbackInRecipe
} from '../utils/feedbackUtils.js';

// Add feedback to a recipe (authenticated users only)
export const addFeedback = async (req, res) => {
	try {
		const { recipeId } = req.params;
		const { name, rating, description } = req.body;
		const userId = req.user._id;

		// Check if recipe exists
		const recipe = await Recipe.findById(recipeId);
		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}

		// Check if user has already given feedback
		const existingFeedback = await Feedback.findOne({
			recipe: recipeId,
			user: userId
		});

		if (existingFeedback) {
			return res.status(400).json({ message: 'You have already given feedback for this recipe' });
		}

		// Create new feedback
		const feedback = new Feedback({
			recipe: recipeId,
			user: userId,
			name,
			rating,
			description
		});

		await feedback.save();

		// Update recipe feedback statistics using utility function
		await addFeedbackToRecipe(recipeId, rating);

		res.status(201).json(feedback);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get all feedback for a recipe (public endpoint)
export const getRecipeFeedback = async (req, res) => {
	try {
		const { recipeId } = req.params;

		const feedback = await Feedback.find({ recipe: recipeId })
			.sort({ createdAt: -1 })
			.populate('user', 'firstName lastName');

		res.json(feedback);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get user's feedback for a recipe (authenticated users only)
export const getUserFeedback = async (req, res) => {
	try {
		const { recipeId } = req.params;
		const userId = req.user._id;

		const feedback = await Feedback.findOne({
			recipe: recipeId,
			user: userId
		});

		res.json(feedback);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update feedback
export const updateFeedback = async (req, res) => {
	try {
		const { recipeId } = req.params;
		const { name, rating, description } = req.body;
		const userId = req.user._id;

		const feedback = await Feedback.findOne({
			recipe: recipeId,
			user: userId
		});

		if (!feedback) {
			return res.status(404).json({ message: 'Feedback not found' });
		}

		// Store old rating for statistics update
		const oldRating = feedback.rating;

		// Update feedback
		feedback.name = name;
		feedback.rating = rating;
		feedback.description = description;
		await feedback.save();

		// Update recipe statistics using utility function
		await updateFeedbackInRecipe(recipeId, oldRating, rating);

		res.json(feedback);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
	try {
		const { recipeId } = req.params;
		const userId = req.user._id;

		const feedback = await Feedback.findOneAndDelete({
			recipe: recipeId,
			user: userId
		});

		if (!feedback) {
			return res.status(404).json({ message: 'Feedback not found' });
		}

		// Update recipe statistics using utility function
		await removeFeedbackFromRecipe(recipeId, feedback.rating);

		res.json({ message: 'Feedback deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}; 
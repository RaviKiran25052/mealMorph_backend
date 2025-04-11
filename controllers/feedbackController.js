import Feedback from '../models/Feedback.js';
import { addRecipeFeedback } from '../utils/feedbackUtils.js';

// Add feedback to a recipe (authenticated users only)
export const addFeedback = async (req, res) => {
	try {
		const { recipeId } = req.params;
		const { name, rating, description } = req.body;
		const userId = req.user._id;

		// Check if user has already given feedback for this recipe
		const existingFeedback = await Feedback.findOne({
			recipe: recipeId,
			user: userId
		});

		if (existingFeedback) {
			return res.status(400).json({ message: 'You have already given feedback for this recipe' });
		}

		// Create feedback data
		const feedbackData = {
			recipe: recipeId,
			user: userId,
			name,
			rating,
			description
		};

		// Use the utility function to add feedback and update recipe
		const result = await addRecipeFeedback(feedbackData);

		res.status(201).json(result.feedback);
	} catch (error) {
		if (error.message === 'Recipe not found') {
			return res.status(404).json({ message: error.message });
		}
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
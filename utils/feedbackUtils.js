import Feedback from '../models/Feedback.js';
import Recipe from '../models/Recipe.js';

/**
 * Adds a new feedback for a recipe and updates the recipe's feedback statistics
 * @param {Object} feedbackData - The feedback data containing recipe, user, name, rating, and description
 * @returns {Promise<Object>} The created feedback and updated recipe
 * @throws {Error} If the recipe or user doesn't exist, or if the user has already given feedback
 */
export const addRecipeFeedback = async (feedbackData) => {
	try {
		// Check if recipe exists
		const recipe = await Recipe.findById(feedbackData.recipe);
		if (!recipe) {
			throw new Error('Recipe not found');
		}

		// Create new feedback
		const feedback = new Feedback(feedbackData);
		await feedback.save();

		// Update recipe feedback statistics
		const newCount = recipe.feedback.count + 1;
		const newAverage = ((recipe.feedback.rating * recipe.feedback.count) + feedbackData.rating) / newCount;

		// Update the recipe
		const updatedRecipe = await Recipe.findByIdAndUpdate(
			feedbackData.recipe,
			{
				feedback: {
					count: newCount,
					rating: newAverage
				}
			},
			{ new: true }
		);

		return {
			feedback,
			recipe: updatedRecipe
		};
	} catch (error) {
		// Handle duplicate feedback error
		if (error.code === 11000) {
			throw new Error('You have already given feedback for this recipe');
		}
		throw error;
	}
}; 
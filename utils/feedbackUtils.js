import Recipe from '../models/Recipe.js';
import Feedback from '../models/Feedback.js';

/**
 * Updates the feedback statistics (count and average rating) for a recipe
 * @param {string} recipeId - The ID of the recipe to update
 * @returns {Promise<Object>} The updated recipe with new statistics
 */
export const updateRecipeFeedbackStats = async (recipeId) => {
	try {
		// Get all feedback for the recipe
		const allFeedback = await Feedback.find({ recipe: recipeId });

		// Calculate new statistics
		const feedbackCount = allFeedback.length;
		const totalRating = allFeedback.reduce((sum, feedback) => sum + feedback.rating, 0);
		const averageRating = feedbackCount > 0 ? totalRating / feedbackCount : 0;

		// Update the recipe
		const updatedRecipe = await Recipe.findByIdAndUpdate(
			recipeId,
			{
				feedbackCount,
				averageRating
			},
			{ new: true }
		);

		return updatedRecipe;
	} catch (error) {
		console.error('Error updating recipe feedback statistics:', error);
		throw error;
	}
};

/**
 * Updates recipe statistics when a new feedback is added
 * @param {string} recipeId - The ID of the recipe
 * @param {number} newRating - The rating from the new feedback
 * @returns {Promise<Object>} The updated recipe with new statistics
 */
export const addFeedbackToRecipe = async (recipeId, newRating) => {
	try {
		const recipe = await Recipe.findById(recipeId);
		if (!recipe) {
			throw new Error('Recipe not found');
		}

		// Calculate new average rating
		const newCount = recipe.feedbackCount + 1;
		const newAverage = ((recipe.averageRating * recipe.feedbackCount) + newRating) / newCount;

		// Update the recipe
		const updatedRecipe = await Recipe.findByIdAndUpdate(
			recipeId,
			{
				feedbackCount: newCount,
				averageRating: newAverage
			},
			{ new: true }
		);

		return updatedRecipe;
	} catch (error) {
		console.error('Error adding feedback to recipe:', error);
		throw error;
	}
};

/**
 * Updates recipe statistics when a feedback is removed
 * @param {string} recipeId - The ID of the recipe
 * @param {number} removedRating - The rating from the removed feedback
 * @returns {Promise<Object>} The updated recipe with new statistics
 */
export const removeFeedbackFromRecipe = async (recipeId, removedRating) => {
	try {
		const recipe = await Recipe.findById(recipeId);
		if (!recipe) {
			throw new Error('Recipe not found');
		}

		// Calculate new average rating
		const newCount = recipe.feedbackCount - 1;
		let newAverage;
		if (newCount === 0) {
			newAverage = 0;
		} else {
			newAverage = ((recipe.averageRating * recipe.feedbackCount) - removedRating) / newCount;
		}

		// Update the recipe
		const updatedRecipe = await Recipe.findByIdAndUpdate(
			recipeId,
			{
				feedbackCount: newCount,
				averageRating: newAverage
			},
			{ new: true }
		);

		return updatedRecipe;
	} catch (error) {
		console.error('Error removing feedback from recipe:', error);
		throw error;
	}
};

/**
 * Updates recipe statistics when a feedback is modified
 * @param {string} recipeId - The ID of the recipe
 * @param {number} oldRating - The old rating
 * @param {number} newRating - The new rating
 * @returns {Promise<Object>} The updated recipe with new statistics
 */
export const updateFeedbackInRecipe = async (recipeId, oldRating, newRating) => {
	try {
		const recipe = await Recipe.findById(recipeId);
		if (!recipe) {
			throw new Error('Recipe not found');
		}

		// Calculate new average rating
		const totalRating = (recipe.averageRating * recipe.feedbackCount) - oldRating + newRating;
		const newAverage = totalRating / recipe.feedbackCount;

		// Update the recipe
		const updatedRecipe = await Recipe.findByIdAndUpdate(
			recipeId,
			{
				averageRating: newAverage
			},
			{ new: true }
		);

		return updatedRecipe;
	} catch (error) {
		console.error('Error updating feedback in recipe:', error);
		throw error;
	}
}; 
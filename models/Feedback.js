import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
	recipe: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Recipe',
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Create a compound index to ensure one user can only give one feedback per recipe
feedbackSchema.index({ recipe: 1, user: 1 }, { unique: true });

// Post-save hook to update recipe feedback summary
feedbackSchema.post('save', async function () {
	const recipeId = this.recipe;

	const feedbacks = await this.constructor.find({ recipe: recipeId });

	const count = feedbacks.length;
	const average = count === 0
		? 0
		: Math.round((feedbacks.reduce((sum, f) => sum + f.rating, 0) / count) * 10) / 10;

	// Update the corresponding recipe
	await mongoose.model('Recipe').findByIdAndUpdate(recipeId, {
		'feedback.count': count,
		'feedback.rating': average
	});
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback; 
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

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback; 
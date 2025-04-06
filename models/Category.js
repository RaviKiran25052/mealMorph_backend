import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		enum: [
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
		]
	},
	description: {
		type: String,
		trim: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Add index for faster queries
categorySchema.index({ name: 1, user: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);

export default Category; 
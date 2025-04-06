import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	quantity: {
		type: String,
		required: true
	},
	unit: {
		type: String,
		default: ''
	}
});

const recipeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	},
	cuisine: {
		type: String,
		required: true,
		trim: true
	},
	servings: {
		type: Number,
		required: true,
		min: 1
	},
	prepTime: {
		type: String,
		required: true
	},
	cookTime: {
		type: String,
		required: true
	},
	ingredients: [ingredientSchema],
	instructions: [{
		type: String,
		required: true
	}],
	image: {
		type: String,
		default: ''
	},
	calories: {
		type: Number,
		required: true
	},
	difficulty: {
		type: String,
		required: true,
		enum: ['Easy', 'Medium', 'Hard']
	},
	tags: [{
		type: String,
		trim: true
	}],
	dishType: {
		type: String,
		required: true,
		enum: ['veg', 'non-veg'],
		default: 'veg'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

// Update the updatedAt field before saving
recipeSchema.pre('save', function (next) {
	this.updatedAt = Date.now();
	next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe; 
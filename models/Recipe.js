import mongoose from 'mongoose';

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
		type: String,
		required: true,
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
		type: Number,
		required: true,
		min: 0
	},
	cookTime: {
		type: Number,
		required: true,
		min: 0
	},
	ingredients: [{
		name: {
			type: String,
			required: true,
			trim: true
		},
		quantity: {
			type: Number,
			required: true,
			min: 0
		},
		unit: {
			type: String,
			default: ''
		}
	}],
	instructions: [{
		type: String,
		required: true,
		trim: true
	}],
	image: {
		type: String,
		default: ''
	},
	calories: {
		type: Number,
		required: true,
		min: 0
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
	feedbackCount: {
		type: Number,
		default: 0
	},
	averageRating: {
		type: Number,
		default: 0
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	nutritionFacts: {
		calories: { type: Number, unit: 'kcal' },
		protein: { type: Number, unit: 'g' },
		carbohydrates: { type: Number, unit: 'g' },
		totalFat: { type: Number, unit: 'g' },
		fiber: { type: Number, unit: 'g' },
		sugar: { type: Number, unit: 'g' },
		vitamins: {
			vitaminA: { type: Number, unit: 'IU' },
			vitaminC: { type: Number, unit: 'mg' },
			vitaminD: { type: Number, unit: 'IU' },
			vitaminE: { type: Number, unit: 'mg' },
			vitaminK: { type: Number, unit: 'mcg' },
			vitaminB1: { type: Number, unit: 'mg' },
			vitaminB2: { type: Number, unit: 'mg' },
			vitaminB3: { type: Number, unit: 'mg' },
			vitaminB6: { type: Number, unit: 'mg' },
			vitaminB12: { type: Number, unit: 'mcg' },
			folate: { type: Number, unit: 'mcg' }
		}
	},
	healthBenefits: [{
		type: String,
		required: true
	}]
}, {
	timestamps: true
});

// Update the updatedAt field before saving
recipeSchema.pre('save', function (next) {
	this.updatedAt = Date.now();
	next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe; 
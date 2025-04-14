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
		trim: true,
		enum: [
			'American',
			'British',
			'Chinese',
			'French',
			'Greek',
			'Indian',
			'Italian',
			'Japanese',
			'Korean',
			'Mexican',
			'Spanish',
			'Thai',
			'Turkish'
		]
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
		},
		substitutions: [{
			type: String,
			required: true,
			trim: true
		}]
	}],
	instructions: [{
		description: {
			type: String,
			required: true,
			trim: true
		},
		timer: {
			type: Number,
			trim: true
		}
	}],
	image: {
		type: String,
		default: ''
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
	feedback: {
		count: {
			type: Number,
			default: 0
		},
		rating: {
			type: Number,
			default: 0
		}
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
		vitamins: [{
			type: String,
			enum: [
				'Vitamin A',
				'Vitamin C',
				'Vitamin D',
				'Vitamin E',
				'Vitamin K',
				'Vitamin B1',
				'Vitamin B2',
				'Vitamin B3',
				'Vitamin B6',
				'Vitamin B12',
				'Folate'
			]
		}]
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
import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	meals: {
		monday: {
			breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null }
		},
		tuesday: {
			breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null }
		},
		wednesday: {
			breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null }
		},
		thursday: {
			breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null }
		},
		friday: {
			breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null }
		},
		saturday: {
			breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null }
		},
		sunday: {
			breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
			dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null }
		}
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

mealPlanSchema.pre('save', function (next) {
	this.updatedAt = Date.now();
	next();
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

export default MealPlan;
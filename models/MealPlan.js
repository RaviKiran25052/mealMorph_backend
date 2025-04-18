import mongoose from 'mongoose';

// Create a reusable schema for daily meals
const dayMealSchema = new mongoose.Schema({
	breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
	lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
	dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null }
}, { _id: false });

const mealPlanSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	meals: {
		monday: dayMealSchema,
		tuesday: dayMealSchema,
		wednesday: dayMealSchema,
		thursday: dayMealSchema,
		friday: dayMealSchema,
		saturday: dayMealSchema,
		sunday: dayMealSchema
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
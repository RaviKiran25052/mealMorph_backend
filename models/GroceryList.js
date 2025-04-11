import mongoose from 'mongoose';

const groceryListItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	quantity: {
		type: Number,
		required: true
	},
	unit: {
		type: String,
		required: true,
		trim: true
	},
	checked: {
		type: Boolean,
		default: false
	},
	recipe: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Recipe'
	}
});

const groceryListSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	items: [groceryListItemSchema],
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
groceryListSchema.pre('save', function (next) {
	this.updatedAt = Date.now();
	next();
});

const GroceryList = mongoose.model('GroceryList', groceryListSchema);

export default GroceryList; 
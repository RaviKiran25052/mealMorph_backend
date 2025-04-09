import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	profileImage: {
		type: String,
		default: ''
	},
	preferences: {
		dietaryRestrictions: [String]
	},
	cookedRecipes: [{
		recipe: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Recipe'
		},
		cookedAt: {
			type: Date,
			default: Date.now
		},
		notes: String
	}],
	favoriteRecipes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Recipe'
	}],
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

// Hash password before saving
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	this.updatedAt = Date.now();
	next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

// Method to return user data without sensitive information
userSchema.methods.toJSON = function () {
	const user = this.toObject();
	delete user.password;
	return user;
};

const User = mongoose.model('User', userSchema);

export default User; 
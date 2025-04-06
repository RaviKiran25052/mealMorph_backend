import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req, res) => {
	try {
		const { email, password, firstName, lastName } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user
		const user = new User({
			email,
			password: hashedPassword,
			firstName,
			lastName
		});

		await user.save();

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		);

		res.status(201).json({
			token,
			user: {
				id: user._id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				role: user.role
			}
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Login user
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		);

		res.json({
			token,
			user: {
				id: user._id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				role: user.role
			}
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get current user
export const getCurrentUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select('-password');
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get current user profile
export const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		res.json(user.toJSON());
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update user profile
export const updateProfile = async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['firstName', 'lastName', 'password', 'preferences'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).json({ message: 'Invalid updates' });
	}

	try {
		const user = await User.findById(req.user._id);
		updates.forEach(update => user[update] = req.body[update]);
		await user.save();
		res.json(user.toJSON());
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}; 
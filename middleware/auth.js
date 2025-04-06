import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
	try {
		// Get token from header
		const token = req.header('Authorization')?.replace('Bearer ', '');

		if (!token) {
			throw new Error();
		}

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Find user
		const user = await User.findById(decoded.userId);

		if (!user) {
			throw new Error();
		}

		// Attach user to request
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Please authenticate' });
	}
};

export default auth; 
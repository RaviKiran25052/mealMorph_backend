import { verify } from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = verify(token, process.env.JWT_SECRET);
			req.user = decoded;
			next();
		} catch (error) {
			res.status(403).json({ message: 'Not authorized, invalid token' });
		}
	}

	if (!token) {
		res.status(401).json({ message: 'Not authorized, no token provided' });
	}
};

export default authMiddleware;

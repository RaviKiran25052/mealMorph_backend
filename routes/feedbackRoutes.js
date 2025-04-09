import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
	addFeedback,
	getRecipeFeedback,
	getUserFeedback
} from '../controllers/feedbackController.js';

const router = Router();

// Public routes
router.get('/recipes/:recipeId/feedback', getRecipeFeedback);

// Protected routes (authenticated users only)
router.use(auth);
router.post('/recipes/:recipeId/feedback', addFeedback);
router.get('/recipes/:recipeId/my-feedback', getUserFeedback);

export default router; 
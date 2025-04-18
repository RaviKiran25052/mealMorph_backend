import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
	getUserMealPlans,
	getMealPlanById,
	createMealPlan,
	updateMealPlan,
	deleteMealPlan,
	generateGroceryList
} from '../controllers/mealPlanController.js';

const router = Router();

// All routes are protected
router.use(auth);

// Get all meal plans for the logged-in user
router.get('/', getUserMealPlans);

// Get a specific meal plan
router.get('/:id', getMealPlanById);

// Create a new meal plan
router.post('/', createMealPlan);

// Update a meal plan
router.put('/:id', updateMealPlan);

// Delete a meal plan
router.delete('/:id', deleteMealPlan);

// Generate grocery list from meal plan
router.post('/:id/grocery-list', generateGroceryList);

export default router;
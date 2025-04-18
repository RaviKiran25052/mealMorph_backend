import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import groceryListRoutes from './routes/groceryListRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import userRecipesRoutes from './routes/userRecipesRoutes.js';
import mealPlanRoutes from './routes/mealPlanRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/mealmorph/auth", authRoutes);
app.use("/mealmorph/recipes", recipeRoutes);
app.use("/mealmorph/grocery-lists", groceryListRoutes);
app.use("/mealmorph", feedbackRoutes);
app.use("/mealmorph/users", userRecipesRoutes);
app.use("/mealmorph/meal-plans", mealPlanRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 1436;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

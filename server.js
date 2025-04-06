import express, { json } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import groceryListRoutes from "./routes/groceryListRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

// Middleware imports
import errorHandler from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/mealmorph/auth", authRoutes);
app.use("/mealmorph/recipes", recipeRoutes);
app.use("/mealmorph/grocery-lists", groceryListRoutes);
app.use("/mealmorph/categories", categoryRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

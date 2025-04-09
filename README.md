# MealMorph Backend

Backend API for the MealMorph recipe management and grocery list application.

## Features

- User authentication and authorization
- Recipe management (CRUD operations)
- Dish type classification (veg/non-veg)
- Food category management (built-in categories)
- Grocery list management
- Image upload support (coming soon)

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose ODM

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=1436
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
  - Body: `{ email, password, firstName, lastName }`
- POST `/api/auth/login` - Login user
  - Body: `{ email, password }`
- GET `/api/auth/me` - Get current user profile

### Recipes

- GET `/api/recipes` - Get all recipes
  - Query params: `category?`, `dishType?`, `difficulty?`
- GET `/api/recipes/:id` - Get a single recipe
- POST `/api/recipes` - Create a new recipe
  - Body: `{ title, description, category, cuisine, servings, prepTime, cookTime, ingredients, instructions, calories, difficulty, tags, dishType }`
  - `category`: Must be one of: Breakfast, Lunch, Dinner, Desserts, Snacks, Vegetarian, Non-Vegetarian, Seafood, Soups, Smoothies, Cake
  - `dishType`: Must be either 'veg' or 'non-veg'
  - `difficulty`: Must be either 'Easy', 'Medium', or 'Hard'
- PUT `/api/recipes/:id` - Update a recipe
- DELETE `/api/recipes/:id` - Delete a recipe

### Grocery Lists

- GET `/api/grocery-lists` - Get all grocery lists
- GET `/api/grocery-lists/:id` - Get a single grocery list
- POST `/api/grocery-lists` - Create a new grocery list
- POST `/api/grocery-lists/:id/add-recipe` - Add recipe items to a grocery list
- PATCH `/api/grocery-lists/:id/items/:itemId` - Update a grocery list item
- DELETE `/api/grocery-lists/:id/items/:itemId` - Remove an item from a grocery list
- DELETE `/api/grocery-lists/:id` - Delete a grocery list

## Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer your_jwt_token
```

## Error Handling

The API uses consistent error responses:

- 400: Bad Request (validation errors)
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error response format:
```json
{
  "message": "Error message",
  "errors": ["Detailed error messages"] // For validation errors
}
```

## Development

1. Run tests:
   ```bash
   npm test
   ```
2. Format code:
   ```bash
   npm run format
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 
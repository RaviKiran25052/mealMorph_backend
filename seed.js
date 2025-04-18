import dotenv from 'dotenv';
import User from './models/User.js';
import Recipe from './models/Recipe.js';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

connectDB();
// Create a default admin user
const createDefaultUser = async () => {
	try {
		const adminUser = await User.findOne({ email: 'admin@mealmorph.com' });
		if (!adminUser) {
			const newAdmin = new User({
				email: 'admin@mealmorph.com',
				password: 'admin123',
				firstName: 'Admin',
				lastName: 'User',
				role: 'admin'
			});
			await newAdmin.save();
			console.log('Default admin user created');
			return newAdmin;
		}
		return adminUser;
	} catch (error) {
		console.error('Error creating default user:', error);
		throw error;
	}
};
const seedBreakfastRecipes = async () => {
	try {
		// First, find an admin user to associate with the recipes
		const adminUser = await User.findOne({ role: 'admin' });

		if (!adminUser) {
			console.log('No admin user found. Please run seed.js first.');
			process.exit(1);
		}

		// Check if recipes already exist to avoid duplicates
		const existingCount = await Recipe.countDocuments({
			category: 'Breakfast',
			cuisine: { $in: ['American', 'Indian', 'Chinese'] }
		});

		if (existingCount >= 3) {
			console.log('Breakfast recipes already seeded.');
			process.exit(0);
		}

		// American breakfast recipe
		const americanBreakfast = new Recipe({
			title: 'Classic American Pancakes',
			description: 'Fluffy, golden pancakes served with maple syrup and butter. A staple American breakfast that\'s easy to make and always satisfying.',
			category: 'Breakfast',
			cuisine: 'American',
			servings: 4,
			prepTime: 15,
			cookTime: 20,
			ingredients: [
				{
					name: 'All-purpose flour',
					quantity: 2,
					unit: 'cups',
					substitutions: ['Whole wheat flour']
				},
				{
					name: 'Sugar',
					quantity: 3,
					unit: 'tbsp',
					substitutions: ['Honey']
				},
				{
					name: 'Baking powder',
					quantity: 1,
					unit: 'tbsp',
					substitutions: ['Baking soda + cream of tartar']
				},
				{
					name: 'Salt',
					quantity: 0.5,
					unit: 'tsp',
					substitutions: ['Sea salt']
				},
				{
					name: 'Milk',
					quantity: 1.5,
					unit: 'cups',
					substitutions: ['Almond milk', 'Oat milk']
				},
				{
					name: 'Eggs',
					quantity: 2,
					unit: '',
					substitutions: ['Flax eggs']
				},
				{
					name: 'Butter',
					quantity: 3,
					unit: 'tbsp',
					substitutions: ['Vegetable oil']
				},
				{
					name: 'Maple syrup',
					quantity: 0.5,
					unit: 'cup',
					substitutions: ['Honey']
				},
				{
					name: 'Fresh berries',
					quantity: 1,
					unit: 'cup',
					substitutions: ['Sliced banana']
				}
			],
			instructions: [
				{
					description: 'In a large bowl, whisk together flour, sugar, baking powder, and salt.',
					timer: null
				},
				{
					description: 'In another bowl, beat the eggs, then add milk and melted butter.',
					timer: null
				},
				{
					description: 'Pour the wet ingredients into the dry ingredients and stir until just combined (a few lumps are okay).',
					timer: null
				},
				{
					description: 'Heat a lightly oiled griddle or frying pan over medium-high heat.',
					timer: null
				},
				{
					description: 'Pour about 1/4 cup of batter onto the griddle for each pancake.',
					timer: null
				},
				{
					description: 'Cook until bubbles form on the surface and the edges look dry, then flip and cook until golden brown on the other side.',
					timer: 3
				},
				{
					description: 'Serve hot with maple syrup, butter, and fresh berries.',
					timer: null
				}
			],
			image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			difficulty: 'Easy',
			tags: ['Pancakes', 'Sweet', 'Classic', 'Family-friendly'],
			dishType: 'veg',
			nutritionFacts: {
				calories: 380,
				protein: 8,
				carbohydrates: 58,
				totalFat: 14,
				fiber: 2,
				sugar: 25,
				vitamins: ['Vitamin A', 'Vitamin D', 'Vitamin B12']
			},
			healthBenefits: [
				'Source of energy from carbohydrates',
				'Contains essential vitamins and minerals',
				'Provides protein for muscle maintenance'
			]
		});

		// Indian breakfast recipe
		const indianBreakfast = new Recipe({
			title: 'Masala Dosa with Sambar',
			description: 'Crispy fermented rice crepes filled with spiced potato filling, served with sambar and coconut chutney. A popular South Indian breakfast.',
			category: 'Breakfast',
			cuisine: 'Indian',
			servings: 4,
			prepTime: 25,
			cookTime: 35,
			ingredients: [
				{
					name: 'Rice',
					quantity: 2,
					unit: 'cups',
					substitutions: ['Rice flour']
				},
				{
					name: 'Urad dal',
					quantity: 1,
					unit: 'cup',
					substitutions: ['Split black gram']
				},
				{
					name: 'Potatoes',
					quantity: 4,
					unit: 'medium',
					substitutions: ['Sweet potatoes']
				},
				{
					name: 'Onion',
					quantity: 2,
					unit: 'medium',
					substitutions: ['Shallots']
				},
				{
					name: 'Green chilies',
					quantity: 3,
					unit: '',
					substitutions: ['Serrano peppers']
				},
				{
					name: 'Mustard seeds',
					quantity: 1,
					unit: 'tsp',
					substitutions: ['Black mustard seeds']
				},
				{
					name: 'Cumin seeds',
					quantity: 1,
					unit: 'tsp',
					substitutions: ['Ground cumin']
				},
				{
					name: 'Curry leaves',
					quantity: 10,
					unit: '',
					substitutions: ['Bay leaves']
				},
				{
					name: 'Turmeric powder',
					quantity: 0.5,
					unit: 'tsp',
					substitutions: ['Fresh turmeric']
				},
				{
					name: 'Ginger',
					quantity: 1,
					unit: 'inch',
					substitutions: ['Ginger paste']
				},
				{
					name: 'Cilantro',
					quantity: 0.25,
					unit: 'cup',
					substitutions: ['Parsley']
				},
				{
					name: 'Oil',
					quantity: 3,
					unit: 'tbsp',
					substitutions: ['Ghee']
				}
			],
			instructions: [
				{
					description: 'Soak rice and urad dal separately for 4-6 hours, then drain.',
					timer: null
				},
				{
					description: 'Grind them separately to a smooth paste, then mix together and let ferment overnight.',
					timer: null
				},
				{
					description: 'Boil potatoes until tender, then peel and mash them.',
					timer: 20
				},
				{
					description: 'Heat oil in a pan, add mustard seeds and let them splutter.',
					timer: null
				},
				{
					description: 'Add cumin seeds, curry leaves, green chilies, and ginger. Sauté until fragrant.',
					timer: 2
				},
				{
					description: 'Add onions and cook until translucent.',
					timer: 5
				},
				{
					description: 'Add turmeric powder and mashed potatoes. Mix well and cook for a few minutes.',
					timer: 5
				},
				{
					description: 'Add salt to taste and garnish with cilantro. This is your potato filling.',
					timer: null
				},
				{
					description: 'Heat a flat griddle and spread a ladleful of fermented batter in a circular motion.',
					timer: null
				},
				{
					description: 'Drizzle oil around the edges and cook until golden brown.',
					timer: 3
				},
				{
					description: 'Place a spoonful of potato filling in the center, fold the dosa over, and serve hot with sambar and coconut chutney.',
					timer: null
				}
			],
			image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			difficulty: 'Medium',
			tags: ['Dosa', 'South Indian', 'Fermented', 'Spicy'],
			dishType: 'veg',
			nutritionFacts: {
				calories: 450,
				protein: 12,
				carbohydrates: 85,
				totalFat: 8,
				fiber: 6,
				sugar: 3,
				vitamins: ['Vitamin C', 'Vitamin B6', 'Folate']
			},
			healthBenefits: [
				'Rich in complex carbohydrates for sustained energy',
				'Contains probiotics from fermentation',
				'Good source of plant-based protein',
				'High in dietary fiber'
			]
		});

		// Chinese breakfast recipe
		const chineseBreakfast = new Recipe({
			title: 'Congee with Century Egg',
			description: 'Silky rice porridge topped with century egg, green onions, and crispy fried shallots. A comforting Chinese breakfast staple.',
			category: 'Breakfast',
			cuisine: 'Chinese',
			servings: 4,
			prepTime: 15,
			cookTime: 90,
			ingredients: [
				{
					name: 'Jasmine rice',
					quantity: 1,
					unit: 'cup',
					substitutions: ['Short-grain rice']
				},
				{
					name: 'Chicken broth',
					quantity: 8,
					unit: 'cups',
					substitutions: ['Vegetable broth']
				},
				{
					name: 'Century egg',
					quantity: 2,
					unit: '',
					substitutions: ['Salted duck egg']
				},
				{
					name: 'Green onions',
					quantity: 4,
					unit: '',
					substitutions: ['Chives']
				},
				{
					name: 'Ginger',
					quantity: 2,
					unit: 'inch',
					substitutions: ['Ginger powder']
				},
				{
					name: 'Soy sauce',
					quantity: 2,
					unit: 'tbsp',
					substitutions: ['Tamari']
				},
				{
					name: 'Sesame oil',
					quantity: 1,
					unit: 'tsp',
					substitutions: ['Peanut oil']
				},
				{
					name: 'White pepper',
					quantity: 0.5,
					unit: 'tsp',
					substitutions: ['Black pepper']
				},
				{
					name: 'Fried shallots',
					quantity: 3,
					unit: 'tbsp',
					substitutions: ['Fried garlic']
				},
				{
					name: 'Cilantro',
					quantity: 0.25,
					unit: 'cup',
					substitutions: ['Thai basil']
				},
				{
					name: 'Salt',
					quantity: 1,
					unit: 'tsp',
					substitutions: ['Sea salt']
				}
			],
			instructions: [
				{
					description: 'Rinse rice until water runs clear, then drain well.',
					timer: null
				},
				{
					description: 'In a large pot, combine rice, chicken broth, and sliced ginger.',
					timer: null
				},
				{
					description: 'Bring to a boil, then reduce heat to low and simmer, partially covered.',
					timer: 15
				},
				{
					description: 'Stir occasionally to prevent rice from sticking to the bottom of the pot.',
					timer: null
				},
				{
					description: 'Continue cooking until rice breaks down and porridge becomes creamy and thick (about 1-1.5 hours).',
					timer: 90
				},
				{
					description: 'Peel and dice century eggs into small cubes.',
					timer: null
				},
				{
					description: 'Season congee with soy sauce, white pepper, and salt to taste.',
					timer: null
				},
				{
					description: 'Serve in bowls topped with century egg, sliced green onions, cilantro, fried shallots, and a drizzle of sesame oil.',
					timer: null
				}
			],
			image: 'https://images.unsplash.com/photo-1623595119496-26d2441e6d76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
			difficulty: 'Medium',
			tags: ['Congee', 'Porridge', 'Comfort food', 'Savory'],
			dishType: 'non-veg',
			nutritionFacts: {
				calories: 280,
				protein: 14,
				carbohydrates: 42,
				totalFat: 6,
				fiber: 1,
				sugar: 2,
				vitamins: ['Vitamin B1', 'Vitamin B3', 'Vitamin E']
			},
			healthBenefits: [
				'Easy to digest for sensitive stomachs',
				'Good source of energy from complex carbohydrates',
				'Contains protein for muscle repair',
				'Rich in minerals and vitamins'
			]
		});

		// Save recipes to database
		await Promise.all([
			americanBreakfast.save(),
			indianBreakfast.save(),
			chineseBreakfast.save()
		]);

		console.log('Breakfast recipes seeded successfully!');
		process.exit(0);
	} catch (error) {
		console.error('Error seeding breakfast recipes:', error);
		process.exit(1);
	}
};

// Run the seeding
createDefaultUser();
seedBreakfastRecipes();
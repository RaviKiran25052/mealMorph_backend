import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Recipe from './models/Recipe.js';
import Category from './models/Category.js';
import User from './models/User.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('MongoDB connection error:', err));

// Sample recipes data
const recipes = [
	// Breakfast recipes
	{
		title: "Masala Dosa",
		description: "A crispy South Indian crepe made from fermented rice and lentil batter, filled with spiced potato mixture.",
		category: "Breakfast",
		cuisine: "Indian",
		servings: 4,
		prepTime: "8 hours",
		cookTime: "30 mins",
		ingredients: [
			{ name: "Rice", quantity: "2", unit: "cups" },
			{ name: "Urad dal", quantity: "0.5", unit: "cup" },
			{ name: "Fenugreek seeds", quantity: "1", unit: "tsp" },
			{ name: "Salt", quantity: "to taste", unit: "" },
			{ name: "Potatoes", quantity: "4", unit: "medium" },
			{ name: "Onions", quantity: "2", unit: "medium" },
			{ name: "Green chilies", quantity: "2", unit: "pieces" },
			{ name: "Mustard seeds", quantity: "1", unit: "tsp" },
			{ name: "Curry leaves", quantity: "10", unit: "leaves" },
			{ name: "Oil", quantity: "2", unit: "tbsp" }
		],
		instructions: [
			"Soak rice and urad dal separately for 6-8 hours",
			"Grind them together with fenugreek seeds to make a smooth batter",
			"Ferment the batter overnight",
			"For potato filling: Boil and mash potatoes",
			"Sauté onions, green chilies, and spices",
			"Add mashed potatoes and mix well",
			"Heat a dosa tawa and spread the batter thinly",
			"Cook until golden brown, add potato filling",
			"Fold and serve with coconut chutney and sambar"
		],
		image: "masala-dosa.jpg",
		calories: 350,
		difficulty: "Medium",
		tags: ["South Indian", "Fermented", "Crispy"],
		dishType: "veg"
	},
	{
		title: "Poha",
		description: "Flattened rice cooked with onions, potatoes, and spices, a popular Maharashtrian breakfast dish.",
		category: "Breakfast",
		cuisine: "Indian",
		servings: 4,
		prepTime: "15 mins",
		cookTime: "20 mins",
		ingredients: [
			{ name: "Flattened rice (Poha)", quantity: "2", unit: "cups" },
			{ name: "Onion", quantity: "1", unit: "large" },
			{ name: "Potato", quantity: "1", unit: "medium" },
			{ name: "Peanuts", quantity: "0.25", unit: "cup" },
			{ name: "Green chilies", quantity: "2", unit: "pieces" },
			{ name: "Curry leaves", quantity: "10", unit: "leaves" },
			{ name: "Turmeric powder", quantity: "0.5", unit: "tsp" },
			{ name: "Mustard seeds", quantity: "1", unit: "tsp" },
			{ name: "Lemon juice", quantity: "1", unit: "tbsp" },
			{ name: "Coriander leaves", quantity: "2", unit: "tbsp" }
		],
		instructions: [
			"Wash and soak poha for 2-3 minutes",
			"Drain excess water and set aside",
			"Heat oil and temper mustard seeds, curry leaves",
			"Add chopped onions, green chilies, and sauté",
			"Add diced potatoes and cook until soft",
			"Add turmeric powder and soaked poha",
			"Mix gently and cook for 2-3 minutes",
			"Garnish with lemon juice and coriander leaves",
			"Serve hot with sev and chutney"
		],
		image: "poha.jpg",
		calories: 280,
		difficulty: "Easy",
		tags: ["Maharashtrian", "Quick", "Healthy"],
		dishType: "veg"
	},
	// Lunch recipes
	{
		title: "Rajma Chawal",
		description: "A classic North Indian dish of red kidney beans in a rich, spicy gravy served with rice.",
		category: "Lunch",
		cuisine: "Indian",
		servings: 4,
		prepTime: "8 hours",
		cookTime: "45 mins",
		ingredients: [
			{ name: "Kidney beans", quantity: "2", unit: "cups" },
			{ name: "Onion", quantity: "2", unit: "medium" },
			{ name: "Tomatoes", quantity: "3", unit: "medium" },
			{ name: "Ginger-garlic paste", quantity: "1", unit: "tbsp" },
			{ name: "Rajma masala", quantity: "2", unit: "tbsp" },
			{ name: "Coriander powder", quantity: "1", unit: "tsp" },
			{ name: "Turmeric powder", quantity: "0.5", unit: "tsp" },
			{ name: "Cream", quantity: "2", unit: "tbsp" },
			{ name: "Basmati rice", quantity: "2", unit: "cups" }
		],
		instructions: [
			"Soak kidney beans overnight",
			"Pressure cook beans until soft",
			"Sauté onions until golden brown",
			"Add ginger-garlic paste and tomatoes",
			"Add spices and cook until oil separates",
			"Add cooked beans and water",
			"Simmer for 15-20 minutes",
			"Add cream and garnish with coriander",
			"Serve with steamed basmati rice"
		],
		image: "rajma-chawal.jpg",
		calories: 420,
		difficulty: "Medium",
		tags: ["Punjabi", "Comfort Food", "Protein Rich"],
		dishType: "veg"
	},
	{
		title: "Biryani",
		description: "A fragrant rice dish layered with marinated meat, herbs, and spices, cooked to perfection.",
		category: "Lunch",
		cuisine: "Indian",
		servings: 4,
		prepTime: "30 mins",
		cookTime: "60 mins",
		ingredients: [
			{ name: "Basmati rice", quantity: "2", unit: "cups" },
			{ name: "Chicken", quantity: "500", unit: "grams" },
			{ name: "Yogurt", quantity: "0.5", unit: "cup" },
			{ name: "Onions", quantity: "3", unit: "large" },
			{ name: "Ginger-garlic paste", quantity: "2", unit: "tbsp" },
			{ name: "Biryani masala", quantity: "2", unit: "tbsp" },
			{ name: "Saffron", quantity: "few", unit: "strands" },
			{ name: "Mint leaves", quantity: "0.5", unit: "cup" },
			{ name: "Coriander leaves", quantity: "0.5", unit: "cup" },
			{ name: "Ghee", quantity: "3", unit: "tbsp" }
		],
		instructions: [
			"Marinate chicken in yogurt and spices",
			"Soak rice for 30 minutes",
			"Fry onions until golden brown",
			"Layer half cooked rice in pot",
			"Add marinated chicken",
			"Add fried onions and herbs",
			"Top with remaining rice",
			"Add saffron milk and ghee",
			"Seal and cook on dum for 30 minutes"
		],
		image: "biryani.jpg",
		calories: 550,
		difficulty: "Hard",
		tags: ["Hyderabadi", "Festive", "Aromatic"],
		dishType: "non-veg"
	},
	// Dinner recipes
	{
		title: "Dal Makhani",
		description: "A rich and creamy lentil dish made with black lentils and kidney beans, slow-cooked to perfection.",
		category: "Dinner",
		cuisine: "Indian",
		servings: 4,
		prepTime: "8 hours",
		cookTime: "60 mins",
		ingredients: [
			{ name: "Whole black lentils", quantity: "1", unit: "cup" },
			{ name: "Red kidney beans", quantity: "0.25", unit: "cup" },
			{ name: "Onion", quantity: "1", unit: "large" },
			{ name: "Tomatoes", quantity: "2", unit: "medium" },
			{ name: "Ginger-garlic paste", quantity: "1", unit: "tbsp" },
			{ name: "Butter", quantity: "3", unit: "tbsp" },
			{ name: "Cream", quantity: "0.5", unit: "cup" },
			{ name: "Garam masala", quantity: "1", unit: "tsp" },
			{ name: "Kasuri methi", quantity: "1", unit: "tbsp" }
		],
		instructions: [
			"Soak lentils and beans overnight",
			"Pressure cook until soft",
			"Sauté onions until golden brown",
			"Add ginger-garlic paste and tomatoes",
			"Add cooked lentils and beans",
			"Simmer for 30-40 minutes",
			"Add butter and cream",
			"Finish with garam masala and kasuri methi",
			"Serve with naan or rice"
		],
		image: "dal-makhani.jpg",
		calories: 380,
		difficulty: "Medium",
		tags: ["Punjabi", "Creamy", "Comfort Food"],
		dishType: "veg"
	},
	{
		title: "Malai Kofta",
		description: "Deep-fried dumplings made with paneer and potatoes, served in a rich and creamy tomato-based gravy.",
		category: "Dinner",
		cuisine: "Indian",
		servings: 4,
		prepTime: "30 mins",
		cookTime: "45 mins",
		ingredients: [
			{ name: "Paneer", quantity: "200", unit: "grams" },
			{ name: "Potatoes", quantity: "2", unit: "medium" },
			{ name: "Cashew nuts", quantity: "15", unit: "pieces" },
			{ name: "Onion", quantity: "1", unit: "large" },
			{ name: "Tomatoes", quantity: "3", unit: "medium" },
			{ name: "Cream", quantity: "0.5", unit: "cup" },
			{ name: "Garam masala", quantity: "1", unit: "tsp" },
			{ name: "Kasuri methi", quantity: "1", unit: "tbsp" },
			{ name: "Oil", quantity: "for frying", unit: "" }
		],
		instructions: [
			"Boil and mash potatoes",
			"Grate paneer and mix with potatoes",
			"Make small balls and deep fry",
			"Prepare onion-tomato gravy",
			"Add cream and spices",
			"Add fried koftas to gravy",
			"Simmer for 10 minutes",
			"Garnish with cream and coriander",
			"Serve with naan or rice"
		],
		image: "malai-kofta.jpg",
		calories: 420,
		difficulty: "Medium",
		tags: ["Mughlai", "Rich", "Festive"],
		dishType: "veg"
	},
	// Dessert recipes
	{
		title: "Gulab Jamun",
		description: "Deep-fried milk solids soaked in sugar syrup, flavored with cardamom and rose water.",
		category: "Desserts",
		cuisine: "Indian",
		servings: 4,
		prepTime: "20 mins",
		cookTime: "30 mins",
		ingredients: [
			{ name: "Khoya", quantity: "200", unit: "grams" },
			{ name: "All-purpose flour", quantity: "2", unit: "tbsp" },
			{ name: "Sugar", quantity: "2", unit: "cups" },
			{ name: "Water", quantity: "2", unit: "cups" },
			{ name: "Cardamom powder", quantity: "0.5", unit: "tsp" },
			{ name: "Rose water", quantity: "1", unit: "tsp" },
			{ name: "Oil", quantity: "for frying", unit: "" }
		],
		instructions: [
			"Mix khoya and flour to make dough",
			"Make small smooth balls",
			"Prepare sugar syrup with cardamom",
			"Heat oil on medium flame",
			"Fry balls until golden brown",
			"Soak in warm sugar syrup",
			"Add rose water for flavor",
			"Let it rest for 2 hours",
			"Serve warm or cold"
		],
		image: "gulab-jamun.jpg",
		calories: 350,
		difficulty: "Medium",
		tags: ["Festive", "Sweet", "Traditional"],
		dishType: "veg"
	},
	{
		title: "Rasmalai",
		description: "Soft cottage cheese dumplings soaked in saffron-flavored thickened milk.",
		category: "Desserts",
		cuisine: "Indian",
		servings: 4,
		prepTime: "30 mins",
		cookTime: "45 mins",
		ingredients: [
			{ name: "Milk", quantity: "1", unit: "liter" },
			{ name: "Lemon juice", quantity: "2", unit: "tbsp" },
			{ name: "Sugar", quantity: "1", unit: "cup" },
			{ name: "Cardamom powder", quantity: "0.5", unit: "tsp" },
			{ name: "Saffron", quantity: "few", unit: "strands" },
			{ name: "Pistachios", quantity: "10", unit: "pieces" },
			{ name: "Almonds", quantity: "10", unit: "pieces" }
		],
		instructions: [
			"Boil milk and add lemon juice",
			"Strain to get chenna",
			"Knead chenna until smooth",
			"Make small discs",
			"Prepare sugar syrup",
			"Cook discs in syrup",
			"Prepare thickened milk with saffron",
			"Soak discs in milk",
			"Garnish with dry fruits"
		],
		image: "rasmalai.jpg",
		calories: 280,
		difficulty: "Hard",
		tags: ["Bengali", "Creamy", "Festive"],
		dishType: "veg"
	},
	// Snack recipes
	{
		title: "Samosa",
		description: "Crispy pastry filled with spiced potatoes and peas, a popular Indian street food.",
		category: "Snacks",
		cuisine: "Indian",
		servings: 4,
		prepTime: "30 mins",
		cookTime: "30 mins",
		ingredients: [
			{ name: "All-purpose flour", quantity: "2", unit: "cups" },
			{ name: "Potatoes", quantity: "3", unit: "medium" },
			{ name: "Peas", quantity: "0.5", unit: "cup" },
			{ name: "Ginger", quantity: "1", unit: "inch" },
			{ name: "Green chilies", quantity: "2", unit: "pieces" },
			{ name: "Coriander powder", quantity: "1", unit: "tsp" },
			{ name: "Garam masala", quantity: "1", unit: "tsp" },
			{ name: "Oil", quantity: "for frying", unit: "" }
		],
		instructions: [
			"Prepare dough with flour and oil",
			"Boil and mash potatoes",
			"Sauté peas with spices",
			"Mix with mashed potatoes",
			"Roll dough into thin circles",
			"Cut into semi-circles",
			"Fill with potato mixture",
			"Seal edges and shape",
			"Deep fry until golden brown"
		],
		image: "samosa.jpg",
		calories: 300,
		difficulty: "Medium",
		tags: ["Street Food", "Crispy", "Spicy"],
		dishType: "veg"
	},
	{
		title: "Pani Puri",
		description: "Hollow crispy puris filled with spicy and tangy mint-flavored water, a popular street snack.",
		category: "Snacks",
		cuisine: "Indian",
		servings: 4,
		prepTime: "30 mins",
		cookTime: "20 mins",
		ingredients: [
			{ name: "Semolina", quantity: "1", unit: "cup" },
			{ name: "All-purpose flour", quantity: "0.5", unit: "cup" },
			{ name: "Mint leaves", quantity: "1", unit: "cup" },
			{ name: "Coriander leaves", quantity: "1", unit: "cup" },
			{ name: "Tamarind", quantity: "50", unit: "grams" },
			{ name: "Green chilies", quantity: "3", unit: "pieces" },
			{ name: "Boiled potatoes", quantity: "2", unit: "medium" },
			{ name: "Chickpeas", quantity: "0.5", unit: "cup" },
			{ name: "Spices", quantity: "as needed", unit: "" }
		],
		instructions: [
			"Prepare dough with semolina and flour",
			"Make small puris and deep fry",
			"Prepare mint-coriander water",
			"Make tamarind chutney",
			"Mash potatoes with spices",
			"Assemble with chickpeas",
			"Fill puris with potato mixture",
			"Add mint water and chutney",
			"Serve immediately"
		],
		image: "pani-puri.jpg",
		calories: 250,
		difficulty: "Medium",
		tags: ["Street Food", "Tangy", "Refreshing"],
		dishType: "veg"
	},
	// Vegetarian recipes
	{
		title: "Palak Paneer",
		description: "Fresh spinach purée cooked with cottage cheese cubes and aromatic spices.",
		category: "Vegetarian",
		cuisine: "Indian",
		servings: 4,
		prepTime: "15 mins",
		cookTime: "25 mins",
		ingredients: [
			{ name: "Paneer", quantity: "200", unit: "grams" },
			{ name: "Spinach", quantity: "500", unit: "grams" },
			{ name: "Onion", quantity: "2", unit: "medium" },
			{ name: "Tomatoes", quantity: "2", unit: "medium" },
			{ name: "Ginger-garlic paste", quantity: "1", unit: "tbsp" },
			{ name: "Cumin seeds", quantity: "1", unit: "tsp" },
			{ name: "Garam masala", quantity: "1", unit: "tsp" },
			{ name: "Cream", quantity: "2", unit: "tbsp" },
			{ name: "Oil", quantity: "2", unit: "tbsp" }
		],
		instructions: [
			"Blanch spinach and make puree",
			"Sauté onions until golden",
			"Add ginger-garlic paste",
			"Add tomatoes and spices",
			"Add spinach puree",
			"Add paneer cubes",
			"Simmer for 5 minutes",
			"Add cream and mix well",
			"Garnish with cream"
		],
		image: "palak-paneer.jpg",
		calories: 320,
		difficulty: "Medium",
		tags: ["North Indian", "Healthy", "Creamy"],
		dishType: "veg"
	},
	{
		title: "Chana Masala",
		description: "Chickpeas cooked in a spicy tomato-onion gravy, a protein-rich vegetarian dish.",
		category: "Vegetarian",
		cuisine: "Indian",
		servings: 4,
		prepTime: "8 hours",
		cookTime: "30 mins",
		ingredients: [
			{ name: "Chickpeas", quantity: "2", unit: "cups" },
			{ name: "Onion", quantity: "2", unit: "medium" },
			{ name: "Tomatoes", quantity: "3", unit: "medium" },
			{ name: "Ginger-garlic paste", quantity: "1", unit: "tbsp" },
			{ name: "Chana masala powder", quantity: "2", unit: "tbsp" },
			{ name: "Coriander powder", quantity: "1", unit: "tsp" },
			{ name: "Turmeric powder", quantity: "0.5", unit: "tsp" },
			{ name: "Oil", quantity: "2", unit: "tbsp" }
		],
		instructions: [
			"Soak chickpeas overnight",
			"Pressure cook until soft",
			"Sauté onions until golden",
			"Add ginger-garlic paste",
			"Add tomatoes and spices",
			"Add cooked chickpeas",
			"Simmer for 15 minutes",
			"Garnish with coriander",
			"Serve with rice or roti"
		],
		image: "chana-masala.jpg",
		calories: 280,
		difficulty: "Easy",
		tags: ["North Indian", "Protein Rich", "Spicy"],
		dishType: "veg"
	},
	// Non-vegetarian recipes
	{
		title: "Butter Chicken",
		description: "Tender chicken pieces cooked in a rich, creamy tomato-based gravy.",
		category: "Non-Vegetarian",
		cuisine: "Indian",
		servings: 4,
		prepTime: "20 mins",
		cookTime: "40 mins",
		ingredients: [
			{ name: "Chicken", quantity: "500", unit: "grams" },
			{ name: "Yogurt", quantity: "1", unit: "cup" },
			{ name: "Tomatoes", quantity: "4", unit: "medium" },
			{ name: "Cashew nuts", quantity: "15", unit: "pieces" },
			{ name: "Ginger-garlic paste", quantity: "1", unit: "tbsp" },
			{ name: "Garam masala", quantity: "1", unit: "tsp" },
			{ name: "Kasuri methi", quantity: "1", unit: "tbsp" },
			{ name: "Cream", quantity: "0.5", unit: "cup" },
			{ name: "Butter", quantity: "2", unit: "tbsp" }
		],
		instructions: [
			"Marinate chicken in yogurt and spices",
			"Grill or bake chicken",
			"Prepare tomato-cashew gravy",
			"Add grilled chicken to gravy",
			"Simmer for 10 minutes",
			"Add cream and butter",
			"Finish with kasuri methi",
			"Garnish with cream",
			"Serve with naan or rice"
		],
		image: "butter-chicken.jpg",
		calories: 450,
		difficulty: "Medium",
		tags: ["Punjabi", "Creamy", "Rich"],
		dishType: "non-veg"
	},
	{
		title: "Rogan Josh",
		description: "A Kashmiri-style lamb curry cooked with aromatic spices and yogurt.",
		category: "Non-Vegetarian",
		cuisine: "Indian",
		servings: 4,
		prepTime: "15 mins",
		cookTime: "60 mins",
		ingredients: [
			{ name: "Lamb", quantity: "500", unit: "grams" },
			{ name: "Onion", quantity: "2", unit: "medium" },
			{ name: "Yogurt", quantity: "0.5", unit: "cup" },
			{ name: "Kashmiri red chili powder", quantity: "1", unit: "tbsp" },
			{ name: "Ginger powder", quantity: "1", unit: "tsp" },
			{ name: "Fennel powder", quantity: "1", unit: "tsp" },
			{ name: "Garam masala", quantity: "1", unit: "tsp" },
			{ name: "Oil", quantity: "3", unit: "tbsp" }
		],
		instructions: [
			"Marinate lamb in yogurt and spices",
			"Sauté onions until golden",
			"Add marinated lamb",
			"Cook on low heat",
			"Add water and simmer",
			"Cook until tender",
			"Adjust seasoning",
			"Garnish with coriander",
			"Serve with rice"
		],
		image: "rogan-josh.jpg",
		calories: 380,
		difficulty: "Hard",
		tags: ["Kashmiri", "Spicy", "Aromatic"],
		dishType: "non-veg"
	},
	// Seafood recipes
	{
		title: "Fish Curry",
		description: "A coconut-based fish curry with tamarind and curry leaves.",
		category: "Seafood",
		cuisine: "Indian",
		servings: 4,
		prepTime: "15 mins",
		cookTime: "25 mins",
		ingredients: [
			{ name: "Fish fillets", quantity: "500", unit: "grams" },
			{ name: "Coconut milk", quantity: "1", unit: "can" },
			{ name: "Tamarind paste", quantity: "1", unit: "tbsp" },
			{ name: "Curry leaves", quantity: "10", unit: "leaves" },
			{ name: "Mustard seeds", quantity: "1", unit: "tsp" },
			{ name: "Turmeric powder", quantity: "0.5", unit: "tsp" },
			{ name: "Red chili powder", quantity: "1", unit: "tsp" },
			{ name: "Oil", quantity: "2", unit: "tbsp" }
		],
		instructions: [
			"Marinate fish with turmeric and salt",
			"Prepare coconut milk gravy",
			"Add tamarind and spices",
			"Gently add fish pieces",
			"Simmer until fish is cooked",
			"Add curry leaves",
			"Adjust seasoning",
			"Garnish with coriander",
			"Serve with rice"
		],
		image: "fish-curry.jpg",
		calories: 320,
		difficulty: "Medium",
		tags: ["South Indian", "Tangy", "Creamy"],
		dishType: "non-veg"
	},
	{
		title: "Prawn Masala",
		description: "Spicy and flavorful prawns cooked with onions and tomatoes.",
		category: "Seafood",
		cuisine: "Indian",
		servings: 4,
		prepTime: "15 mins",
		cookTime: "20 mins",
		ingredients: [
			{ name: "Prawns", quantity: "500", unit: "grams" },
			{ name: "Onion", quantity: "2", unit: "medium" },
			{ name: "Tomatoes", quantity: "2", unit: "medium" },
			{ name: "Ginger-garlic paste", quantity: "1", unit: "tbsp" },
			{ name: "Coriander powder", quantity: "1", unit: "tsp" },
			{ name: "Turmeric powder", quantity: "0.5", unit: "tsp" },
			{ name: "Garam masala", quantity: "1", unit: "tsp" },
			{ name: "Oil", quantity: "2", unit: "tbsp" }
		],
		instructions: [
			"Clean and devein prawns",
			"Marinate with turmeric and salt",
			"Sauté onions until golden",
			"Add ginger-garlic paste",
			"Add tomatoes and spices",
			"Add prawns and cook",
			"Simmer for 5 minutes",
			"Garnish with coriander",
			"Serve with rice or roti"
		],
		image: "prawn-masala.jpg",
		calories: 280,
		difficulty: "Easy",
		tags: ["Coastal", "Spicy", "Quick"],
		dishType: "non-veg"
	},
	// Soup recipes
	{
		title: "Tomato Shorba",
		description: "A light and tangy Indian-style tomato soup.",
		category: "Soups",
		cuisine: "Indian",
		servings: 4,
		prepTime: "10 mins",
		cookTime: "20 mins",
		ingredients: [
			{ name: "Tomatoes", quantity: "6", unit: "medium" },
			{ name: "Onion", quantity: "1", unit: "medium" },
			{ name: "Ginger", quantity: "1", unit: "inch" },
			{ name: "Garlic", quantity: "4", unit: "cloves" },
			{ name: "Cumin seeds", quantity: "1", unit: "tsp" },
			{ name: "Red chili powder", quantity: "0.5", unit: "tsp" },
			{ name: "Coriander leaves", quantity: "2", unit: "tbsp" },
			{ name: "Oil", quantity: "1", unit: "tbsp" }
		],
		instructions: [
			"Blanch and puree tomatoes",
			"Sauté onions, ginger, garlic",
			"Add tomato puree",
			"Add spices and water",
			"Simmer for 15 minutes",
			"Strain the soup",
			"Adjust seasoning",
			"Garnish with coriander",
			"Serve hot"
		],
		image: "tomato-shorba.jpg",
		calories: 120,
		difficulty: "Easy",
		tags: ["Light", "Tangy", "Healthy"],
		dishType: "veg"
	},
	{
		title: "Mulligatawny Soup",
		description: "A spiced lentil soup with coconut milk and vegetables.",
		category: "Soups",
		cuisine: "Indian",
		servings: 4,
		prepTime: "15 mins",
		cookTime: "30 mins",
		ingredients: [
			{ name: "Lentils", quantity: "0.5", unit: "cup" },
			{ name: "Carrots", quantity: "2", unit: "medium" },
			{ name: "Celery", quantity: "2", unit: "stalks" },
			{ name: "Apple", quantity: "1", unit: "medium" },
			{ name: "Coconut milk", quantity: "0.5", unit: "cup" },
			{ name: "Curry powder", quantity: "1", unit: "tbsp" },
			{ name: "Turmeric powder", quantity: "0.5", unit: "tsp" },
			{ name: "Oil", quantity: "1", unit: "tbsp" }
		],
		instructions: [
			"Cook lentils until soft",
			"Sauté vegetables",
			"Add curry powder",
			"Add cooked lentils",
			"Add coconut milk",
			"Simmer for 15 minutes",
			"Blend until smooth",
			"Adjust seasoning",
			"Serve hot"
		],
		image: "mulligatawny.jpg",
		calories: 180,
		difficulty: "Medium",
		tags: ["Creamy", "Spicy", "Comforting"],
		dishType: "veg"
	},
	// Smoothie recipes
	{
		title: "Mango Lassi",
		description: "A creamy yogurt-based drink with sweet mangoes and cardamom.",
		category: "Smoothies",
		cuisine: "Indian",
		servings: 2,
		prepTime: "5 mins",
		cookTime: "0 mins",
		ingredients: [
			{ name: "Mango", quantity: "2", unit: "medium" },
			{ name: "Yogurt", quantity: "1", unit: "cup" },
			{ name: "Milk", quantity: "0.5", unit: "cup" },
			{ name: "Sugar", quantity: "2", unit: "tbsp" },
			{ name: "Cardamom powder", quantity: "0.25", unit: "tsp" },
			{ name: "Ice cubes", quantity: "4", unit: "pieces" }
		],
		instructions: [
			"Peel and chop mango",
			"Add all ingredients to blender",
			"Blend until smooth",
			"Adjust sweetness",
			"Add ice cubes",
			"Blend again",
			"Pour into glasses",
			"Garnish with mint",
			"Serve chilled"
		],
		image: "mango-lassi.jpg",
		calories: 220,
		difficulty: "Easy",
		tags: ["Refreshing", "Sweet", "Summer"],
		dishType: "veg"
	},
	{
		title: "Banana Smoothie",
		description: "A healthy smoothie made with ripe bananas, yogurt, and honey.",
		category: "Smoothies",
		cuisine: "Indian",
		servings: 2,
		prepTime: "5 mins",
		cookTime: "0 mins",
		ingredients: [
			{ name: "Bananas", quantity: "2", unit: "ripe" },
			{ name: "Yogurt", quantity: "1", unit: "cup" },
			{ name: "Honey", quantity: "2", unit: "tbsp" },
			{ name: "Cinnamon powder", quantity: "0.5", unit: "tsp" },
			{ name: "Almonds", quantity: "10", unit: "pieces" },
			{ name: "Ice cubes", quantity: "4", unit: "pieces" }
		],
		instructions: [
			"Peel and chop bananas",
			"Add all ingredients to blender",
			"Blend until smooth",
			"Adjust sweetness",
			"Add ice cubes",
			"Blend again",
			"Pour into glasses",
			"Garnish with almonds",
			"Serve chilled"
		],
		image: "banana-smoothie.jpg",
		calories: 250,
		difficulty: "Easy",
		tags: ["Healthy", "Energy", "Quick"],
		dishType: "veg"
	},
	// Cake recipes
	{
		title: "Gajar Ka Halwa Cake",
		description: "A fusion dessert combining traditional carrot halwa with modern cake.",
		category: "Cake",
		cuisine: "Indian",
		servings: 8,
		prepTime: "30 mins",
		cookTime: "60 mins",
		ingredients: [
			{ name: "Carrots", quantity: "500", unit: "grams" },
			{ name: "All-purpose flour", quantity: "2", unit: "cups" },
			{ name: "Sugar", quantity: "1.5", unit: "cups" },
			{ name: "Ghee", quantity: "1", unit: "cup" },
			{ name: "Milk", quantity: "1", unit: "cup" },
			{ name: "Cardamom powder", quantity: "1", unit: "tsp" },
			{ name: "Baking powder", quantity: "1", unit: "tsp" },
			{ name: "Dry fruits", quantity: "0.5", unit: "cup" }
		],
		instructions: [
			"Grate carrots finely",
			"Sauté carrots in ghee",
			"Add milk and cook",
			"Mix dry ingredients",
			"Combine with carrot mixture",
			"Add dry fruits",
			"Pour into greased pan",
			"Bake at 180°C",
			"Cool and serve"
		],
		image: "gajar-halwa-cake.jpg",
		calories: 380,
		difficulty: "Medium",
		tags: ["Fusion", "Sweet", "Festive"],
		dishType: "veg"
	},
	{
		title: "Gulab Jamun Cake",
		description: "A unique fusion cake inspired by the classic Indian dessert Gulab Jamun.",
		category: "Cake",
		cuisine: "Indian",
		servings: 8,
		prepTime: "30 mins",
		cookTime: "45 mins",
		ingredients: [
			{ name: "All-purpose flour", quantity: "2", unit: "cups" },
			{ name: "Khoya", quantity: "200", unit: "grams" },
			{ name: "Sugar", quantity: "1", unit: "cup" },
			{ name: "Milk", quantity: "1", unit: "cup" },
			{ name: "Baking powder", quantity: "1", unit: "tsp" },
			{ name: "Cardamom powder", quantity: "1", unit: "tsp" },
			{ name: "Rose water", quantity: "1", unit: "tsp" },
			{ name: "Ghee", quantity: "0.5", unit: "cup" }
		],
		instructions: [
			"Mix khoya and flour",
			"Add sugar and milk",
			"Add baking powder",
			"Add cardamom and rose water",
			"Mix well to form batter",
			"Pour into greased pan",
			"Bake at 180°C",
			"Prepare sugar syrup",
			"Soak cake in syrup"
		],
		image: "gulab-jamun-cake.jpg",
		calories: 400,
		difficulty: "Medium",
		tags: ["Fusion", "Sweet", "Rich"],
		dishType: "veg"
	}
];

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

// Create categories
const createCategories = async () => {
	const categories = [
		"Breakfast",
		"Lunch",
		"Dinner",
		"Desserts",
		"Snacks",
		"Vegetarian",
		"Non-Vegetarian",
		"Seafood",
		"Soups",
		"Smoothies",
		"Cake"
	];

	try {
		const adminUser = await createDefaultUser();

		for (const categoryName of categories) {
			const existingCategory = await Category.findOne({ name: categoryName });
			if (!existingCategory) {
				const newCategory = new Category({
					name: categoryName,
					user: adminUser._id
				});
				await newCategory.save();
				console.log(`Created category: ${categoryName}`);
			}
		}
	} catch (error) {
		console.error('Error creating categories:', error);
		throw error;
	}
};

// Seed the database
const seedDatabase = async () => {
	try {
		// Clear existing data
		await Recipe.deleteMany({});
		console.log('Cleared existing recipes');

		// Create categories
		await createCategories();
		console.log('Created categories');

		// Create recipes
		const adminUser = await User.findOne({ email: 'admin@mealmorph.com' });
		for (const recipeData of recipes) {
			const category = await Category.findOne({ name: recipeData.category });
			const recipe = new Recipe({
				...recipeData,
				user: adminUser._id,
				category: category._id
			});
			await recipe.save();
			console.log(`Created recipe: ${recipe.title}`);
		}

		console.log('Database seeded successfully');
		process.exit(0);
	} catch (error) {
		console.error('Error seeding database:', error);
		process.exit(1);
	}
};

// Run the seed script
seedDatabase(); 
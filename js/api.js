// Put your Spoonacular API key here
const API_KEY = '97444eb3d83745259dc84ef8a15b9576';
const BASE_URL = 'https://api.spoonacular.com/recipes/findByIngredients';

// This function takes an array of ingredients and fetches recipes
export async function fetchRecipes(ingredients) {
    // 1. Format the ingredients for the URL (e.g., "chicken,rice" becomes "chicken%2Crice")
    const ingredientsString = ingredients.join(',');

    // 2. Build the full URL with the API key, ingredients, and some settings
    const url = `${BASE_URL}?ingredients=${ingredientsString}&number=6&ranking=1&ignorePantry=true&apiKey=${API_KEY}`;

    try {
        // 3. Fetch the data from Spoonacular
        const response = await fetch(url);

        // 4. Check if the request was successful
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        // 5. Convert the response to JSON and return it
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching recipes:", error);
        // We throw the error so main.js can catch it and show a message to the user
        throw error; 
    }
}

// Add this to the bottom of api.js
export async function fetchRecipeDetails(id) {
    // We use /recipes/{id}/information to get the full details
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        throw error;
    }
}
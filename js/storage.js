const STORAGE_KEY = 'ff-favorites';

// Get the list of saved recipes
export function getFavorites() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : []; 
}

// Save a new recipe to the list
export function saveFavorite(recipe) {
    const favorites = getFavorites();
    
    // Check if it's already saved so we don't get duplicates
    const isAlreadySaved = favorites.some(fav => fav.id === recipe.id);
    if (isAlreadySaved) {
        alert("Recipe is already in your favorites!");
        return;
    }

    favorites.push(recipe);
    // Convert the array to a JSON string and save it
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)); 
    alert(`${recipe.title} saved to favorites!`);
}

// Remove a recipe from the list
export function removeFavorite(recipeId) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.id !== recipeId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}



const PANTRY_KEY = 'ff-pantry';

export function getPantry() {
    const data = localStorage.getItem(PANTRY_KEY);
    return data ? JSON.parse(data) : [];
}

export function savePantryItem(item) {
    const pantry = getPantry();
    pantry.push(item);
    localStorage.setItem(PANTRY_KEY, JSON.stringify(pantry));
}

export function removePantryItem(index) {
    const pantry = getPantry();
    pantry.splice(index, 1);
    localStorage.setItem(PANTRY_KEY, JSON.stringify(pantry));
}
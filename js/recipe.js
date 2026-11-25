import { fetchRecipeDetails } from './api.js';

const container = document.getElementById('recipe-details-container');

async function loadRecipe() {
    // 1. Get the ID from the URL (e.g., recipe.html?id=12345)
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (!recipeId) {
        container.innerHTML = "<p>No recipe selected. <a href='index.html'>Go back home</a>.</p>";
        return;
    }

    try {
        // 2. Fetch the data
        const recipe = await fetchRecipeDetails(recipeId);

        // 3. Build the HTML
        container.innerHTML = `
            <div class="recipe-header">
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" alt="${recipe.title}" class="detail-img">
            </div>
            
            <div class="recipe-body">
                <div class="ingredients-section">
                    <h3>Ingredients</h3>
                    <ul>
                        ${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}
                    </ul>
                </div>

                <div class="instructions-section">
                    <h3>Instructions</h3>
                    <p>${recipe.instructions || "No instructions provided for this recipe."}</p>
                </div>
            </div>
            
            <a href="index.html" class="back-btn">← Back to Search</a>
        `;

    } catch (error) {
        container.innerHTML = "<p class='error'>Failed to load recipe details.</p>";
    }
}

// Run the function when page loads
loadRecipe();
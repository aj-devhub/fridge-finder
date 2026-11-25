import { fetchRecipes } from './api.js';
import { saveFavorite } from './storage.js'; 

const searchForm = document.getElementById('search-form');
const ingredientInput = document.getElementById('ingredient-input');
const resultsContainer = document.getElementById('results-container');
const searchBtn = document.getElementById('search-btn');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const userInput = ingredientInput.value;
    const ingredientsArray = userInput.split(',').map(item => item.trim());

    if (ingredientsArray.length === 0 || ingredientsArray[0] === "") {
        alert("Please enter at least one ingredient.");
        return;
    }

    searchBtn.textContent = "Searching...";
    searchBtn.disabled = true;
    resultsContainer.innerHTML = "<p>Loading recipes...</p>";

    try {
        const recipes = await fetchRecipes(ingredientsArray);
        resultsContainer.innerHTML = "";

        if (recipes.length === 0) {
            resultsContainer.innerHTML = "<p>No recipes found. Try different ingredients!</p>";
            return;
        }

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');

            // UPDATED: Using a div with a click event for better reliability
            card.innerHTML = `
                <div class="clickable-area" style="cursor: pointer;">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div class="card-content">
                        <h3>${recipe.title}</h3>
                    </div>
                </div>
                <div class="card-info">
                    <p><strong>Uses:</strong> ${recipe.usedIngredientCount} ingredients</p>
                    <p><strong>Missing:</strong> ${recipe.missedIngredientCount} ingredients</p>
                    <button class="save-btn" data-id="${recipe.id}">❤️ Save to Favorites</button>
                </div>
            `;

            // Make the image and title clickable
            const clickableArea = card.querySelector('.clickable-area');
            clickableArea.addEventListener('click', () => {
                window.location.href = `recipe.html?id=${recipe.id}`;
            });

            // Add event listener to the save button
            const saveBtn = card.querySelector('.save-btn');
            saveBtn.addEventListener('click', () => {
                saveFavorite(recipe);
            });

            resultsContainer.appendChild(card);
        });

    } catch (error) {
        resultsContainer.innerHTML = `<p class="error">Error fetching recipes. Please try again.</p>`;
    } finally {
        searchBtn.textContent = "Search Recipes";
        searchBtn.disabled = false;
    }
});
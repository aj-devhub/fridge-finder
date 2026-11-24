import { getFavorites, removeFavorite } from './storage.js';

const favoritesContainer = document.getElementById('favorites-container');

function renderFavorites() {
    // 1. Get the saved recipes from localStorage
    const favorites = getFavorites();
    
    // 2. Clear the container
    favoritesContainer.innerHTML = "";

    // 3. Check if empty
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>You haven't saved any recipes yet! Go to the Search page to find some.</p>";
        return;
    }

    // 4. Loop through and build the cards
    favorites.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');

        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="card-content">
                <h3>${recipe.title}</h3>
                <p><strong>Uses:</strong> ${recipe.usedIngredientCount} ingredients</p>
                <button class="remove-btn" data-id="${recipe.id}">🗑️ Remove</button>
            </div>
        `;

        // Add event listener to the remove button
        const removeBtn = card.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            removeFavorite(recipe.id); // Remove from localStorage
            renderFavorites(); // Re-draw the page instantly
        });

        favoritesContainer.appendChild(card);
    });
}

// Run this function as soon as the page loads
renderFavorites();
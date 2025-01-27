const API_URL = 'https://api-development-assignement-julieoyen.onrender.com/';

async function fetchRecipes() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const recipes = await response.json();

    const allRecipesDiv = document.getElementById('all-recipes');
    allRecipesDiv.innerHTML = '';

    recipes.forEach((recipe) => {
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');
      recipeDiv.className =
        'border rounded-lg shadow-lg justify-between justify-items-center overflow-hidden max-w-xs mb-5 text-left bg-white flex flex-col min-w-[350px] min-h-[400px]';

      const ingredientsList = recipe.ingredients
        .map((ingredient) => `<li>${ingredient}</li>`)
        .join('');

      recipeDiv.innerHTML = `
        <h3 class="text-xxl font-bold">${recipe.title}</h3>
        <p><strong>Author:</strong> ${recipe.author_name || 'Unknown'}</p>
        <p><strong>Description:</strong> ${recipe.description}</p>
        <p><strong>Ingredients:</strong></p>
        <ul class="list-disc">${ingredientsList}</ul>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        <p><strong>Prep Time:</strong> ${recipe.prep_time} minutes</p>
        <p><strong>Cook Time:</strong> ${recipe.cook_time} minutes</p>
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Category:</strong> ${recipe.category}</p>
        <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
        ${
          recipe.images && recipe.images.length > 0
            ? `<p><strong>Images:</strong> ${recipe.images
                .map(
                  (img) =>
                    `<img src="${img}" alt="${recipe.title}" style="max-width: 100px; margin-right: 10px;" />`
                )
                .join('')}</p>`
            : ''
        }
      `;

      allRecipesDiv.appendChild(recipeDiv);
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    const allRecipesDiv = document.getElementById('all-recipes');
    allRecipesDiv.innerHTML = `<p style="color: red;">Failed to fetch recipes. Please try again later.</p>`;
  }
}

fetchRecipes();

document.querySelector('#create-btn').addEventListener('click', () => {
  window.location.href = './create';
});

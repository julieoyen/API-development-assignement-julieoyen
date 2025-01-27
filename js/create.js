const API_URL =
  'https://api-development-assignement-julieoyen.onrender.com/create';

document.querySelector('#add-ingredient').addEventListener('click', () => {
  const container = document.querySelector('#ingredients-container');
  const inputCount = container.querySelectorAll('.ingredient-item').length + 1;

  const ingredientItem = document.createElement('div');
  ingredientItem.className = 'ingredient-item';

  const input = document.createElement('input');
  input.type = 'text';
  input.className =
    'ingredient w-full my-2 bg-gray-100 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600';
  input.placeholder = `Ingredient ${inputCount}`;
  ingredientItem.appendChild(input);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className =
    'delete-ingredient bg-red-500 hover:bg-red-600 text-white font-bold p-1 rounded';
  deleteButton.textContent = 'Remove';
  ingredientItem.appendChild(deleteButton);

  container.appendChild(ingredientItem);

  deleteButton.addEventListener('click', () => {
    ingredientItem.remove();
  });
});

document.querySelector('#add-image').addEventListener('click', () => {
  const container = document.querySelector('#images-container');
  const inputCount = container.querySelectorAll('.image-item').length + 1;

  const imageItem = document.createElement('div');
  imageItem.className = 'image-item';

  const input = document.createElement('input');
  input.type = 'url';
  input.className =
    'image-url w-full mx-2 bg-gray-100 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600';
  input.placeholder = `Image URL ${inputCount}`;
  imageItem.appendChild(input);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className =
    'delete-image bg-red-500 hover:bg-red-600 text-white font-bold p-1 rounded';
  deleteButton.textContent = 'Remove';
  imageItem.appendChild(deleteButton);

  container.appendChild(imageItem);

  deleteButton.addEventListener('click', () => {
    imageItem.remove();
  });
});

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const author_id = document.querySelector('#author-id').value;
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const ingredients = Array.from(document.querySelectorAll('.ingredient')).map(
    (input) => input.value
  );
  const instructions = document.querySelector('#instructions').value;
  const prep_time = document.querySelector('#prep-time').value;
  const cook_time = document.querySelector('#cook-time').value;
  const servings = document.querySelector('#servings').value;
  const category = document.querySelector('#category').value;
  const cuisine = document.querySelector('#cuisine').value;
  const images = Array.from(document.querySelectorAll('.image-url')).map(
    (input) => input.value
  );

  const body = {
    author_id: Number(author_id),
    title,
    description,
    ingredients,
    instructions,
    prep_time: Number(prep_time),
    cook_time: Number(cook_time),
    servings: Number(servings),
    category,
    cuisine,
    images,
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorMessage = `Error: ${res.status} ${res.statusText}`;
      console.error(errorMessage);
      alert(errorMessage);
      return;
    }

    const data = await res.json();
    alert('Form submitted successfully!');
    window.location.href = '/';
  } catch (error) {
    console.error('Network or unexpected error:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
});

document.querySelectorAll('.delete-ingredient').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.target.closest('.ingredient-item').remove();
  });
});

document.querySelectorAll('.delete-image').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.target.closest('.image-item').remove();
  });
});

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const port = process.env.PORT || 3004;

const SECRET = process.env.SECRET || 'its a secret';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/recipes', async (req, res) => {
  try {
    const [recipeRows] = await connection.query(`
      SELECT 
        recipes.id AS recipe_id,
        recipes.author_id,
        recipes.title,
        recipes.description,
        recipes.instructions,
        recipes.prep_time,
        recipes.cook_time,
        recipes.servings,
        recipes.category,
        recipes.cuisine,
        users.name AS author_name
      FROM recipes
      JOIN users ON recipes.author_id = users.id
    `);

    const [ingredientRows] = await connection.query(`
      SELECT recipe_ingredients.recipe_id, recipe_ingredients.ingredient
      FROM recipe_ingredients
    `);

    const [imageRows] = await connection.query(`
      SELECT recipe_images.recipe_id, recipe_images.image_url
      FROM recipe_images
    `);

    const recipes = recipeRows.map((recipe) => {
      const ingredients = ingredientRows
        .filter((ing) => ing.recipe_id === recipe.recipe_id)
        .map((ing) => ing.ingredient);

      const images = imageRows
        .filter((img) => img.recipe_id === recipe.recipe_id)
        .map((img) => img.image_url);

      return {
        author_id: recipe.author_id,
        author_name: recipe.author_name,
        title: recipe.title,
        description: recipe.description,
        ingredients,
        instructions: recipe.instructions,
        prep_time: Number(recipe.prep_time),
        cook_time: Number(recipe.cook_time),
        servings: Number(recipe.servings),
        category: recipe.category,
        cuisine: recipe.cuisine,
        images,
      };
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const [result] = await connection.query(
    `INSERT INTO post (title, content, user_id)
    VALUES ('${name}', '${email}', '${password}')
 `
  );
  res.json(result);
});

app.post('/create', async (req, res) => {
  const {
    title,
    description,
    instructions,
    prep_time,
    cook_time,
    servings,
    category,
    cuisine,
    author_id,
    ingredients,
    images,
  } = req.body;

  try {
    const [recipeResult] = await connection.execute(
      `
        INSERT INTO recipes (title, description, instructions, prep_time, cook_time, servings, category, cuisine, author_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
      [
        title,
        description,
        instructions,
        prep_time,
        cook_time,
        servings,
        category,
        cuisine,
        author_id,
      ]
    );

    const recipeId = recipeResult.insertId;

    if (ingredients && ingredients.length > 0) {
      const ingredientQueries = ingredients.map((ingredient) =>
        connection.execute(
          `INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES (?, ?)`,
          [recipeId, ingredient]
        )
      );
      await Promise.all(ingredientQueries);
    }

    if (images && images.length > 0) {
      const imageQueries = images.map((imageUrl) =>
        connection.execute(
          `INSERT INTO recipe_images (recipe_id, image_url) VALUES (?, ?)`,
          [recipeId, imageUrl]
        )
      );
      await Promise.all(imageQueries);
    }

    res.status(201).json({ success: true, recipeId });
  } catch (error) {
    console.error('Error inserting recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log('Server started', port);
});

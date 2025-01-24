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

app.post('/post', async (req, res) => {
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

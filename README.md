## API Development Assignment

### This project is a demonstration of server-side development with Node.js, a SQL database (MySQL), and a basic frontend interface to interact with the API. 


## Table of Contents:

- [Features](#features)
- [Technologies Used](#Technologies-used)
- [Installing](#installing)
- [Endpoints](#endpoints)
- [Create New Recipe](#create-new-recipe)
- [Note](#Note)

## 1. Features

- Backend:
  - A RESTful API with endpoints to handle user registration and recipe creation.
  - SQL database (MySQL) with proper relationships between tables.
    Secure handling of environment variables.
- Frontend:
  - User-friendly interface to display and create recipes.
  - Styled with Tailwind CSS

## 2. Technologies Used

- Backend:
  Node.js
  Express.js
  MySQL (via mysql2)
- Frontend:
  HTML, CSS (Tailwind CSS), JavaScript
- Hosting:
  Backend: Render
  Frontend: Netlify

## 3. Installing

1. Clone directory:

   ```bash
   git clone https://github.com/julieoyen/API-development-assignement-julieoyen
   ```

2. Redirect to the right folder

   ```bash
   cd API-development-assignment-julieoyen
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```
4. Start the Express server:
   ```bash
   node index.js
   ```

## 4. Endpoints

| Method | Endpoint    | Description         | Authenticated |
| ------ | ----------- | ------------------- | ------------- |
| POST   | `/register` | Register a new user | No            |
| GET    | `/`         | Get all recipes     | No            |
| POST   | `/create`   | Create a new recipe | No            |

## 5. Create new recipe

### To create a new recipe, you need to write `2` as the `author ID`.

## 6. Note

I ran out of time and was not able to finish what I had visioned. Thats why the register is not added in the main page.

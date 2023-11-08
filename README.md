# Dogagatchi+ 

Dogagatchi+ combines trivia, collecting and caretaking game components to create an immersive dog-owning experience.

## Starting the app

Run 'npm install' to install all packages locally.

Start the app locally with the following commands:

### compile with webpack
> npm run build

### start express server
> npm run start

## Database

The database is hosted on MongoDB's Atlas service. The uri to connect to the database is stored as an environmental variable in the untracked .env file in the root folder; the uri is loaded into the database connection method through the server's config.js file.


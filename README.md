# Node.js Blog

A simple blog application built with Node.js and EJS, allowing admins to manage blog posts and users to view blogs.

## Features

- **Admin Blog Management**: Create, edit, and delete blog posts.
- **Individual Blog Pages**: Each blog is displayed on its own page.
- **Dynamic Templating**: Built with EJS for server-side rendering.

## Usage

### 1. Setup MongoDB
- Create a MongoDB database using [MongoDB Atlas](https://www.mongodb.com/atlas/database) or a local MongoDB instance.
- Obtain your MongoDB URI.

### 2. Environment Variables
Create a `.env` file in the root of your project and populate it with the following variables:

```
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Replace the placeholders with your actual values.

### 3. Install Dependencies
Run the following command to install the required dependencies:

```
npm install
```

### 4. Run the Application
Start the development environment with the following command:

```
npm run watch
```

This will start the server with `nodemon` for live updates.

### 5. Build & Deploy
To deploy the application in a production environment, run:

```
npm start
```

## Tech Stack

- **Backend**: Node.js, Express.js
- **Templating Engine**: EJS, Express-EJS-Layouts
- **Database**: MongoDB (Atlas or local instance)
- **Authentication**: JSON Web Tokens (JWT), bcryptjs

## Key Dependencies

- **express**: For server-side functionality
- **mongoose**: For MongoDB integration
- **ejs**: For server-side templating
- **bcryptjs**: For password hashing
- **jsonwebtoken**: For secure user authentication
- **method-override**: For supporting PUT and DELETE HTTP methods
- **connect-mongo**: For session storage in MongoDB



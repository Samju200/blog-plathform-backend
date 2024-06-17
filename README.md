Overview
This project is a simple blogging platform built with a Node.js backend and a React frontend. It features user authentication (sign-up, login, logout), CRUD operations for blog posts, markdown support for writing posts, a commenting system, and search functionality for blog posts.

Prerequisites
Node.js (v14 or later)
npm (v6 or later)
MongoDB (running locally or via a service like MongoDB Atlas)
Setup Instructions
Backend (Node.js with Express)
1. Clone the repository:
git clone https://github.com/your-repo/blog-platform.git
cd blog-platform-backend
2. Install dependencies:
npm install
3. Configure the environment variables:
Create a .env file in the backend directory with the following content:
MONGO_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=your_jwt_secret
4. Start the backend server:
Approach and Design
Backend
The backend is built using Express and MongoDB. Key considerations and features include:

Express for Routing: Simple and lightweight routing is provided by Express, making it easy to manage different endpoints for authentication, posts, and comments.
Mongoose for Database Interaction: Mongoose is used to interact with MongoDB, providing a straightforward way to define schemas and models for users and posts.
JWT for Authentication: JSON Web Tokens (JWT) are used to handle authentication, ensuring secure and stateless user sessions.
Routes
Auth Routes (/api/auth): Handles user registration, login, and logout.
Post Routes (/api/posts): Provides CRUD operations for blog posts.
Comment Routes (/api/comments): Manages comments on posts.


# Concepta - The Ecommerce Shopping Website

## Description

The back-end side of the "Concepta" ecommerce shopping website is built using Node.js and MongoDB

### Getting Started

To get started with the project, follow these steps:

1. Clone the project to your machine:
   ```bash
   git clone https://github.com/PabodaSenevirathne/QuickServe-v5.0.0.git
   ```

2. Navigate to the project folder

   cd QuickServe-v5.0.0


3. Install dependencies:
    
    ```
    npm install
    
    ```

4. Start the development server

   ```
   node app.js

   ```

Server is running on port 5001


## Features

* User Authentication and Authorization: Register and login with email and password. JSON Web Tokens (JWT) are used for authentication.
* Product Management: Add, update, delete, and view products. Products can have descriptions, prices, and images.
* User Management: Register new users and manage user profiles.
* Image Upload: Upload product images to the server.


## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcrypt
* JSON Web Tokens (JWT)
* Multer
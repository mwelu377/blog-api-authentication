# Blog API

## Project Overview

The Blog API is a backend application that allows users to create accounts, log in, and manage blog articles securely.

It uses JWT authentication to protect routes and ensures that users can manage their own articles.

The API is built with Node.js, Express.js, and MongoDB.

## Features

* User registration and login.
* Secure password hashing using bcrypt.
* JWT authentication to protect API routes.
* Create, read, update, and delete blog articles (CRUD).
* Article ownership checks to ensure users can manage only their own articles.
* MongoDB database integration for storing users and articles.

## Technologies Used

* **Node.js** — JavaScript runtime for running the backend.
* **Express.js** — Framework for building the API and handling routes.
* **MongoDB** — Database for storing users and blog articles.
* **Mongoose** — Connects the application to MongoDB and manages data models.
* **JWT (JSON Web Token)** — Used for authentication.
* **bcryptjs** — Used to hash passwords securely.
* **Joi** — Used to validate incoming data.
* **dotenv** — Used to load environment variables from a `.env` file.

## Installation and Setup

Follow these steps to run the Blog API locally.

### 1. Clone the Repository

```bash
git clone https://github.com/mwelu377/blog-api-authentication.git
```

### 2. Navigate to the Project Folder

```bash
cd blog-api-authentication
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory of the project and add the required environment variables.

### 5. Start the Development Server

```bash
npm run dev
```

The API will run on the port configured in your environment variables.

## Environment Variables

To run this project locally, create a `.env` file in the root directory.

Add the following environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the placeholder values with your own credentials.

**Security Note:** Never share your actual MongoDB connection string or JWT secret publicly. The `.env` file should not be committed to GitHub.

## API Documentation

### Base URL

**Live API:** https://blog-api-authentication-and-ownership.onrender.com

All endpoints below are relative to this base URL.

### Authentication Endpoints

#### 1. Register a User

* **Endpoint:** `/auth/signup`
* **Method:** `POST`
* **Description:** Creates a new user account.
* **Content-Type:** `application/json`

**Request Body:**

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "your_password"
}
```

**Successful Response (201 Created):**

```json
{
  "message": "User created successfully",
  "user": {
    "id": "generated_user_id",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

**Possible Errors:**

* `400 Bad Request` — A required field is missing or the email already exists.
* `500 Internal Server Error` — An unexpected server error occurs.

#### 2. Log In

* **Endpoint:** `/auth/login`
* **Method:** `POST`
* **Description:** Authenticates an existing user and returns a JWT token.
* **Content-Type:** `application/json`

**Request Body:**

```json
{
  "email": "test@example.com",
  "password": "your_password"
}
```

**Successful Response (200 OK):**

```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

**Possible Errors:**

* `400 Bad Request` — Email or password is missing.
* `401 Unauthorized` — The email or password is incorrect.
* `500 Internal Server Error` — An unexpected server error occurs.

### Authentication

The JWT token expires after one hour. Include it in the `Authorization` header when accessing protected endpoints.

```text
Authorization: Bearer your_jwt_token
```

### Article Endpoints

All article endpoints require authentication. Include your JWT token in the request header.

#### 3. Get All Articles

* **Endpoint:** `/articles`
* **Method:** `GET`
* **Description:** Retrieves all articles.
* **Authentication:** Required

**Successful Response (200 OK):**

Returns an array containing the articles.

#### 4. Get a Single Article

* **Endpoint:** `/articles/:id`
* **Method:** `GET`
* **Description:** Retrieves a specific article using its ID.
* **Authentication:** Required

Replace `:id` with the actual article ID.

**Successful Response (200 OK):**

Returns the requested article.

**Possible Errors:**

* `404 Not Found` — The article does not exist.
* `500 Internal Server Error` — An unexpected server error occurs.

#### 5. Create an Article

* **Endpoint:** `/articles`
* **Method:** `POST`
* **Description:** Creates a new article belonging to the authenticated user.
* **Authentication:** Required
* **Content-Type:** `application/json`

**Request Body:**

```json
{
  "title": "Learning Backend Development",
  "content": "I am learning how to build APIs using Node.js and Express."
}
```

**Successful Response (201 Created):**

Returns the newly created article, including its generated ID and associated user ID.

**Possible Errors:**

* `400 Bad Request` — The request body fails validation.
* `500 Internal Server Error` — An unexpected server error occurs.

#### 6. Update an Article

* **Endpoint:** `/articles/:id`
* **Method:** `PUT`
* **Description:** Updates an existing article owned by the authenticated user.
* **Authentication:** Required
* **Content-Type:** `application/json`

Replace `:id` with the actual article ID.

**Request Body:**

```json
{
  "title": "Updated Article Title",
  "content": "This is the updated article content."
}
```

**Successful Response (200 OK):**

Returns the updated article.

**Possible Errors:**

* `400 Bad Request` — The request body fails validation.
* `403 Forbidden` — You are not allowed to edit another user's article.
* `404 Not Found` — The article does not exist.
* `500 Internal Server Error` — An unexpected server error occurs.

#### 7. Delete an Article

* **Endpoint:** `/articles/:id`
* **Method:** `DELETE`
* **Description:** Deletes an existing article owned by the authenticated user.
* **Authentication:** Required

Replace `:id` with the actual article ID.

**Successful Response (200 OK):**

```json
{
  "message": "Article deleted successfully"
}
```

**Possible Errors:**

* `403 Forbidden` — You are not allowed to delete another user's article.
* `404 Not Found` — The article does not exist.
* `500 Internal Server Error` — An unexpected server error occurs.

## Error Handling

The API uses HTTP status codes to indicate the outcome of requests.

 Status Code                  Meaning                                              
 `200 OK`                     The request was successful.                          
 `201 Created`                A resource was created successfully.                 
 `400 Bad Request`            The request contains missing or invalid data.        
 `401 Unauthorized`           Authentication is missing, invalid, or expired.      
 `403 Forbidden`              You are not allowed to perform the requested action. 
 `404 Not Found`              The requested resource does not exist.               
 `500 Internal Server Error`  An unexpected server error occurred.                 

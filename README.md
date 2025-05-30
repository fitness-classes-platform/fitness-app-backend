# ✅ BACKEND README 

## Fitness App – Backend (Express API)

## Description

This repository contains the **Backend** of the Fitness App, built with **Node.js** and **Express**.  
It provides the API that handles authentication, user data, and fitness class management.

The **frontend (React)** repository can be found here:

🔗 (https://github.com/fitness-classes-platform/fitness-app-frontend)



## 🛠️ How to Run This App Locally

Follow these steps to clone and run the project on your local machine:

### 1. Clone the repository
```bash
git clone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables
```bash
PORT=5005
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```
### 4. Run the server
```bash
npm run dev
```

---

## Demo
🔗 https://fitnessclassapp.netlify.app/

## Endpoints

### 🔐 Auth 
```bash
POST /auth/signup
Creates a new user account.

POST /auth/login
Authenticates a user and returns a JWT token.

GET /auth/verify
Verifies if the JWT token is valid.

```

### 🧘‍♀️ Class 
```bash
GET /class
Get all fitness classes (including reviews).

GET /class/:classId
Get a specific class by ID (including reviews).

POST /class
Create a new fitness class.
Requires multipart/form-data with optional image upload.

PUT /class/:classId
Update an existing class (authenticated).
Accepts optional image upload.

DELETE /class/:classId
Delete a class (authenticated).
```
### ⭐ Review 
```bash
GET /review/class/:classId
Get all reviews for a specific class.

POST /review/class/:classId
Create a review for a class (authenticated).

GET /review/:reviewId
Get a specific review by ID.

PUT /review/:reviewId
Update a review (authenticated).

DELETE /review/:reviewId
Delete a review (authenticated).
```
### 📤 Upload 
```bash
POST /upload
Upload an image using multipart/form-data.
```


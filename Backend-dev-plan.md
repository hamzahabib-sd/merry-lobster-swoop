# 1️⃣ Executive Summary
- This document outlines the backend development plan for CalorieQuest, a web application that helps users find healthy meal options nearby.
- The backend will be built using FastAPI (Python 3.13) and MongoDB Atlas, with no Docker.
- The development process will follow a dynamic sprint plan, with manual testing after every task and a single-branch Git workflow (`main`).

# 2️⃣ In-Scope & Success Criteria
- **In-Scope Features:**
  - User authentication (sign-up, login, logout)
  - Guest access
  - Find meals by calorie range and distance
  - Explore food categories
  - AI-powered nutrition chatbot
- **Success Criteria:**
  - All frontend features are fully functional end-to-end.
  - All task-level tests pass via UI.
  - Each sprint's code is pushed to `main` after verification.

# 3️⃣ API Design
- **Base path:** `/api/v1`
- **Error envelope:** `{ "error": "message" }`

---

### Authentication
- **`POST /api/v1/auth/signup`**
  - **Purpose:** Register a new user.
  - **Request:** `{ "email": "user@example.com", "password": "password123" }`
  - **Response:** `{ "token": "jwt_token" }`
  - **Validation:** Email must be unique; password must be at least 8 characters.

- **`POST /api/v1/auth/login`**
  - **Purpose:** Log in an existing user.
  - **Request:** `{ "email": "user@example.com", "password": "password123" }`
  - **Response:** `{ "token": "jwt_token" }`
  - **Validation:** Email and password must be correct.

- **`POST /api/v1/auth/logout`**
  - **Purpose:** Log out a user (invalidate token if using a blacklist).
  - **Request:** (none)
  - **Response:** `{ "message": "Logged out successfully" }`

- **`GET /api/v1/auth/me`**
  - **Purpose:** Get the current user's profile.
  - **Request:** (none)
  - **Response:** `{ "id": "user_id", "email": "user@example.com" }`

---

### Restaurants
- **`GET /api/v1/restaurants`**
  - **Purpose:** Get a list of restaurants based on filters.
  - **Request:** `?max_calories=600&max_distance=3`
  - **Response:** `[{ "id": "restaurant_id", "name": "Restaurant Name", "menu": [...] }]`
  - **Validation:** `max_calories` and `max_distance` must be numbers.

---

### Food Categories
- **`GET /api/v1/food-categories`**
  - **Purpose:** Get all food categories and their items.
  - **Request:** (none)
  - **Response:** `[{ "id": "category_id", "name": "Category Name", "items": [...] }]`

---

### Chatbot
- **`POST /api/v1/chatbot`**
  - **Purpose:** Get a response from the AI chatbot.
  - **Request:** `{ "message": "What are some healthy snack options?" }`
  - **Response:** `{ "response": "Great healthy snack options include..." }`

- **`POST /api/v1/chatbot/profile`**
  - **Purpose:** Save the user's profile for the chatbot.
  - **Request:** `{ "gender": "male", "height": "175", "weight": "70", "goal": "lose", "dietPlan": "none" }`
  - **Response:** `{ "message": "Profile saved successfully" }`

# 4️⃣ Data Model (MongoDB Atlas)
### `users`
- `_id`: ObjectId (auto-generated)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `createdAt`: DateTime (auto-generated)
- **Example:** `{ "_id": ObjectId("..."), "email": "user@example.com", "password": "hashed_password", "createdAt": ISODate("...") }`

---

### `restaurants`
- `_id`: ObjectId (auto-generated)
- `name`: String (required)
- `cuisine`: String
- `distance`: Number
- `menu`: Array of embedded documents:
  - `id`: String
  - `name`: String
  - `calories`: Number
  - `description`: String
- **Example:** `{ "_id": ObjectId("..."), "name": "McDonald's", "cuisine": "Fast Food", "distance": 0.8, "menu": [{ "id": "mc-double", "name": "McDouble", "calories": 400 }] }`

---

### `food_categories`
- `_id`: ObjectId (auto-generated)
- `name`: String (required)
- `items`: Array of embedded documents:
  - `id`: String
  - `name`: String
  - `description`: String
  - `imageUrl`: String
  - `calories`: Number
  - `tags`: Array of strings
- **Example:** `{ "_id": ObjectId("..."), "name": "Fast Food", "items": [{ "id": "burger", "name": "Classic Cheeseburger", "calories": 300 }] }`

---

### `user_profiles`
- `_id`: ObjectId (auto-generated)
- `userId`: ObjectId (references `users`)
- `gender`: String
- `height`: String
- `weight`: String
- `goal`: String
- `dietPlan`: String
- **Example:** `{ "_id": ObjectId("..."), "userId": ObjectId("..."), "gender": "male", "height": "175", "weight": "70", "goal": "lose", "dietPlan": "none" }`

# 5️⃣ Frontend Audit & Feature Map
### `AuthPage.tsx`
- **Purpose:** User authentication.
- **Endpoints:** `POST /api/v1/auth/signup`, `POST /api/v1/auth/login`
- **Models:** `users`

---

### `FindMealPage.tsx`
- **Purpose:** Find meals by calorie range and distance.
- **Endpoints:** `GET /api/v1/restaurants`
- **Models:** `restaurants`

---

### `FoodExplorerPage.tsx`
- **Purpose:** Explore food categories.
- **Endpoints:** `GET /api/v1/food-categories`
- **Models:** `food_categories`

---

### `Chatbot.tsx`
- **Purpose:** AI-powered nutrition chatbot.
- **Endpoints:** `POST /api/v1/chatbot`, `POST /api/v1/chatbot/profile`
- **Models:** `user_profiles`

# 6️⃣ Configuration & ENV Vars
- `APP_ENV`: `development` or `production`
- `PORT`: `8000`
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for signing JWTs
- `JWT_EXPIRES_IN`: `3600` (1 hour)
- `CORS_ORIGINS`: `http://localhost:5173`

# 7️⃣ Testing Strategy (Manual via Frontend)
- Validation will be performed exclusively through the frontend UI.
- Every task will include a **Manual Test Step** and a **User Test Prompt**.
- After all tasks in a sprint pass, the code will be committed and pushed to `main`.

# 8️⃣ Dynamic Sprint Plan & Backlog

## S0 – Environment Setup & Frontend Connection
- **Objectives:**
  - Create a FastAPI skeleton with `/api/v1` and `/healthz`.
  - Connect to MongoDB Atlas using `MONGODB_URI`.
  - `/healthz` performs a DB ping and returns a JSON status.
  - Enable CORS for the frontend.
  - Replace dummy API URLs in the frontend with real backend URLs.
  - Initialize Git, set the default branch to `main`, and push to GitHub.
  - Create a single `.gitignore` file at the root.
- **Definition of Done:**
  - Backend runs locally and connects to MongoDB Atlas.
  - `/healthz` returns a success status.
  - Frontend renders live data.
  - Repo is live on GitHub `main`.
- **Manual Test Step:**
  - Run the backend, open the frontend, and check **Network → /healthz → 200 OK** with DB status.
- **User Test Prompt:**
  > "Start the backend and refresh the app. Confirm that the status shows a successful DB connection."

---

## S1 – Basic Auth (Signup / Login / Logout)
- **Objectives:**
  - Implement JWT-based signup, login, and logout.
  - Protect one backend route and one frontend page.
- **Tasks:**
  - Store users in MongoDB (hashed password via Argon2).
    - **Manual Test Step:** Sign up via the UI → success message is visible.
    - **User Test Prompt:** "Create a new account and verify the confirmation."
  - Implement login that issues a JWT.
    - **Manual Test Step:** Log in → token is saved → redirected to the dashboard.
    - **User Test Prompt:** "Log in and confirm redirection to the dashboard."
  - Implement logout (clear client token).
    - **Manual Test Step:** Click logout → protected pages are blocked.
    - **User Test Prompt:** "After logging out, refresh a protected page—it should redirect to the login page."
- **Definition of Done:**
  - The auth flow works end-to-end in the frontend.
- **Post-sprint:**
  - Commit and push to `main`.

---

## S2 – Find Meal & Food Explorer
- **Objectives:**
  - Implement the "Find Meal" feature with calorie and distance filters.
  - Implement the "Food Explorer" feature to browse food categories.
- **Tasks:**
  - Create the `GET /api/v1/restaurants` endpoint.
    - **Manual Test Step:** Use the filters on the "Find Meal" page → the restaurant list updates correctly.
    - **User Test Prompt:** "Filter restaurants by calorie range and distance, and verify the results."
  - Create the `GET /api/v1/food-categories` endpoint.
    - **Manual Test Step:** Navigate to the "Food Explorer" page → all food categories are displayed.
    - **User Test Prompt:** "Go to the Food Explorer page and confirm that all categories and items are visible."
- **Definition of Done:**
  - Both "Find Meal" and "Food Explorer" features are fully functional.
- **Post-sprint:**
  - Commit and push to `main`.

---

## S3 – AI Chatbot
- **Objectives:**
  - Implement the AI chatbot with personalized nutrition advice.
- **Tasks:**
  - Create the `POST /api/v1/chatbot/profile` endpoint.
    - **Manual Test Step:** Fill out the user profile in the chatbot → the profile is saved.
    - **User Test Prompt:** "Complete your profile in the chatbot and verify that it's saved."
  - Create the `POST /api/v1/chatbot` endpoint.
    - **Manual Test Step:** Ask the chatbot a nutrition question → a relevant response is received.
    - **User Test Prompt:** "Ask the chatbot a question about nutrition and confirm that you receive a helpful answer."
- **Definition of Done:**
  - The chatbot is fully functional and provides personalized responses.
- **Post-sprint:**
  - Commit and push to `main`.
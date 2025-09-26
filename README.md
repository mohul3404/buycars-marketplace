# BuyCars.com Marketplace 🚗

A full-stack marketplace application for second-hand cars, built as a case implementation for Attryb. This project allows dealers to manage an inventory of used cars, which can be viewed and filtered by potential buyers.

---

## ✨ Features

This project successfully implements all the requirements outlined in the case study, broken down by phase.

### ✅ Phase I: Frontend (React)
- **Inventory Management**: Dealers can view all their car listings in a clean, card-based UI on the `/inventory` page.
- **Full CRUD Functionality**: The application supports full Create, Read, Update, and Delete operations for car listings.
- **Add & Edit Cars**: A single, intelligent form at `/add-car` and `/edit-car/:id` is used for both creating new listings and updating existing ones.
- **Multi-Delete**: Users can select multiple car entries via checkboxes and delete them with a single action.
- **Advanced Filtering**: The inventory page features real-time, instant filters for **Price** and **Mileage**. Selecting a filter automatically sends a new request to the backend and updates the view.
- **Signup/Login UI**: A modern, responsive UI for user authentication is in place at the root `/` route.

### ✅ Phase II: Database Design
- **Schema Design**: A clear and efficient relational database schema was designed with three main tables: `Dealers`, `OemSpecs`, and `MarketplaceInventory`, connected via foreign keys.
- **Automated Table Creation**: Sequelize's `sync()` feature is used to automatically create and update the database tables based on the JavaScript models defined in the code.
- **Dummy Data**: A `seed.js` script was created to populate the database with initial data for dealers, OEM specs, and inventory listings, making the application testable right away.

### ✅ Phase III: API Implementation
- **Full REST API**: A robust RESTful API was built using **Node.js** and **Express.js** to handle all inventory management operations.
- **OEM Spec Search API**: The specific endpoint `GET /api/oem-specs/search` was created to allow searching for manufacturer specifications based on `make`, `model_name`, and `model_year`.
- **Live Database Connection**: The API is connected to a live MySQL database, demonstrating real-world application architecture.

---

## 🛠️ Tech Stack

- **Frontend**: React (with Vite), JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Sequelize

---

## 🚀 Setup and Running the Application

Follow these instructions to run the project locally.

### Prerequisites
- Node.js (v18 or later)
- A MySQL database (a free one can be set up on a service like [Railway.app](https://railway.app))

### 1. Backend Setup

```bash
# 1. Navigate to the backend folder
cd buycars-backend

# 2. Install dependencies
npm install

# 3. Configure the database
#    - Open the config/database.js file.
#    - Enter your MySQL database credentials (host, port, user, password, db name).

# 4. Populate the database with initial data
node seed.js

# 5. Start the backend server
node server.js

# The backend will be running on http://localhost:3001
````

### 2\. Frontend Setup

```bash
# 1. Open a new, separate terminal and navigate to the frontend folder
cd buycars-app

# 2. Install dependencies
npm install

# 3. Start the React development server
npm run dev

# The frontend will be running on http://localhost:5173
```

-----

## 📋 API Endpoints

  - `GET /api/inventory`: Fetches all car listings. Supports query parameters `maxPrice`, `maxMileage`, and `color`.
  - `POST /api/inventory`: Adds a new car to the inventory.
  - `PUT /api/inventory/:id`: Updates an existing car.
  - `DELETE /api/inventory/:id`: Deletes a single car.
  - `GET /api/oem-specs/search`: Searches for OEM specs. Requires query parameters `make`, `model_name`, and `model_year`.

<!-- end list -->

````

---
### ## Final Step: Push the README to GitHub

After you've saved the `README.md` file, run these commands in your terminal to upload it to your GitHub repository:

```bash
git add README.md
git commit -m "Add professional project README"
git push
````

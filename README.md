# Fermentation Data Upload

This project is a web application that allows users to upload a fermentation run CSV file, select options for Pump1 and Pump2, and visualize the data. The application consists of a **backend** built with Node.js/Express and a **frontend** built with React.

## Features
- Upload CSV files
- Choose options for Pump1 and Pump2
- Store processed data in a database
- Visualize the data trends using interactive graphs
- Dockerized for easy deployment

---
## Setup Instructions

### Running Without Docker
#### **Backend Setup**
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```
   The server will be running on `http://localhost:5000`

#### **Frontend Setup**
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

---

### Running With Docker
#### **Step 1: Build and Start Containers**
Make sure you have Docker and Docker Compose installed. Then, run:
```sh
docker-compose up --build
```
This will:
- Build and run the backend container
- Build and run the frontend container

#### **Step 2: Access the Application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

#### **Stopping the Containers**
To stop the containers, run:
```sh
docker-compose down
```

---

### Notes
- Ensure that `server.js` in the backend is listening on `0.0.0.0` for Docker compatibility.
- Make sure your frontend API calls are correctly pointing to the backend.
- If you need to reset the database, manually remove and recreate your database volume.

This project is designed to be deployed using Docker for consistency and scalability.


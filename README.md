# Fermentation Data Upload

This project is a web application that allows users to upload a fermentation run CSV file, select options for Pump1 and Pump2, and visualize the data. The application consists of a **backend** built with Node.js/Express and a **frontend** built with React, integrated into a single project structure.

## Features
- Upload CSV files
- Choose options for Pump1 and Pump2
- Store processed data in a database
- Visualize the data trends using interactive graphs
- Dockerized for easy deployment

---
## Setup Instructions

### Running Without Docker
#### **Project Setup**
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm start
   ```
   The application will be available at `http://localhost:3000`

---

### Running With Docker
#### **Step 1: Build and Start Containers**
Make sure you have Docker and Docker Compose installed. Then, run:
```sh
docker-compose up --build
```

#### **Step 2: Access the Application**
- Application: `http://localhost:3000`
- Backend API: `http://localhost:5000`

#### **Stopping the Containers**
To stop the containers, run:
```sh
docker-compose down
```

---

### Notes
- This project uses a unified structure with both frontend and backend components
- The backend server runs separately and serves the API endpoints
- The frontend React application communicates with the backend API
- If you need to reset the database, manually remove and recreate your database volume

This project is designed to be deployed using Docker for consistency and scalability.
# SHMS

## Overview
SHMS is a Node.js backend application designed to manage housing, bookings, payments, maintenance, and more. It provides a robust API for handling various modules such as rooms, buildings, floors, apartments, and user authentication.

## About
SHMS is a comprehensive housing management system designed to streamline the management of rooms, buildings, and apartments. It offers features for booking, payment processing, maintenance tracking, and more, making it an ideal solution for property management and housing administration. This project was developed as a graduation project for the Institute HTI.

## Features
- **Housing Management:** Manage rooms, buildings, floors, and apartments.
- **Payment Module:** Handle payment processing.
- **Booking Module:** Manage booking requests and confirmations.
- **Maintenance Module:** Track and manage maintenance requests.
- **Delay Module:** Handle delays in services or bookings.
- **Holiday Module:** Manage holiday schedules.
- **Admin Dashboard APIs:** APIs for administrative tasks.
- **Rules & Bus Time:** Manage rules and bus schedules.
- **Warning Module:** Issue warnings and notifications.

## Technologies
- **Node.js** (with ES modules)
- **Express** (web framework)
- **Mongoose** (MongoDB ODM)
- **Joi** (validation)
- **JWT** (authentication)
- **bcrypt** (password hashing)
- **Multer** (file uploads)
- **Cloudinary** (media storage)
- **Nodemailer** (email)
- **ngrok** (tunneling)
- **dotenv** (environment variables)
- **Docker** (containerization)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SHMS
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `config` directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Start the application:
   ```bash
   npm start
   ```

## Usage
The application runs on port 3000 by default. You can access the API endpoints as defined in the `src/initApp.js` file.

## API Structure
The API is structured into several modules, each with its own router:
- `/room` - Room management
- `/auth` - Authentication
- `/building` - Building management
- `/maintenance` - Maintenance requests
- `/delay` - Delay management
- `/housing` - Housing management
- `/apartment` - Apartment management
- `/floor` - Floor management
- `/booking` - Booking management
- `/user` - User management
- `/holiday` - Holiday management
- `/payment` - Payment processing
- `/warning` - Warning system

## Environment Variables
Create a `.env` file in the `config` directory with the following variables:
```
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

## Docker
To run the application using Docker, follow these steps:
1. Build the Docker image:
   ```bash
   docker build -t shms .
   ```
2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 shms
   ```

## License
ISC 
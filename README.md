# Ticket Booking System

A Docker-based ticket booking system with React frontend and Express.js backend.

## Features

- **Colorful UI**: Modern, gradient-based design with smooth animations
- **Navigation Bar**: Professional navbar with logo placement in left corner
- **Authentication**: Login and signup pages with form validation
- **Docker Support**: Complete containerization with MongoDB integration

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Node.js (for local development)

### Running with Docker

1. Clone the repository
2. Navigate to the project directory
3. Start the application:

```bash
docker-compose up --build
```

This will start:
- Frontend on http://localhost:3000
- Backend API on http://localhost:5000


### Local Development

#### Frontend
```bash
cd front-end
npm install
npm start
```

#### Backend
```bash
cd back-end
npm install
npm run dev
```

## Project Structure

```
ticket-booking/
├── front-end/           # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── assets/      # Images, icons
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
├── back-end/            # Express.js API
│   ├── server.js        # Main server file
│   ├── config/          # Database configuration
│   ├── models/          # Database models
│   ├── middleware/      # Authentication middleware
│   ├── utils/           # JWT utilities
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml   # Docker orchestration
```

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user (protected)

## Technologies Used

- **Frontend**: React, React Router, CSS3 (Gradients & Animations)
- **Backend**: Express.js, Node.js, JWT Authentication
- **Database**: MongoDB with Mongoose
- **DevOps**: Docker, Docker Compose

## Database Schema

### User Model
- `name`: String (required, max 50 characters)
- `email`: String (required, unique, validated)
- `password`: String (required, min 6 characters, hashed)
- `role`: String (user/admin, default: user)
- `createdAt`: Date (auto-generated)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Input validation and sanitization
- CORS enabled for cross-origin requests

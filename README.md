# Tusome

A MERN application for managing online courses and user subscriptions. Tusome provides a complete platform for browsing courses, user authentication, and subscription management.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, React Router, Tailwind CSS |
| **Backend** | Node.js, Express |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Payments** | Mpesa integration |

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Course Management**: Browse and view available courses
- **Subscription System**: Subscribe to courses via Stripe checkout
- **User Dashboard**: Manage profile and view subscriptions
- **Protected Routes**: Secure access to authenticated areas

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Classes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/classes` | Get all available courses |
| GET | `/api/classes/:id` | Get course details by ID |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get authenticated user profile |
| PUT | `/api/users/profile` | Update user profile |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/checkout` | Create Mpesa STK Push|
## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Daraja Api (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tusome
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

**Start the backend server:**
```bash
cd backend
npm run dev
```

**Start the frontend (in a new terminal):**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Screenshots

![Home Page](./screenshots/home.png) 
![Course Detail](./screenshots/course-detail.png) 
![Dashboard](./screenshots/dashboard.png) 
![Checkout](./screenshots/checkout.png) 
s
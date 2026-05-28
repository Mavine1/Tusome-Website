# Tusome

A MERN application for managing online courses and user subscriptions. Tusome provides a complete platform for browsing courses, user authentication, and subscription management.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, React Router, Tailwind CSS |
| **Backend** | Node.js, Express |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Payments** | Stripe integration |

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Course Management**: Browse and view available courses
- **Subscription System**: Subscribe to courses via Stripe checkout
- **User Dashboard**: Manage profile and view subscriptions
- **Protected Routes**: Secure access to authenticated areas

## Project Structure

```
tusome/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers (auth, class, payment, user)
│   ├── middleware/      # JWT authentication middleware
│   ├── models/         # Mongoose schemas (Class, Subscription, User)
│   ├── routes/         # API route definitions
│   ├── services/        # Business logic layer
│   ├── server.js       # Express server entry point
│   ├── seed.js         # Database seeding script
│   └── .env            # Environment variables
│
└── frontend/
    ├── public/         # Static assets
    └── src/
        ├── components/ # Reusable UI components
        │   ├── CourseCard.jsx
        │   ├── Footer.jsx
        │   ├── Navbar.jsx
        │   └── ProtectedRoute.jsx
        ├── pages/      # Page components
        │   ├── Checkout.jsx
        │   ├── CourseDetail.jsx
        │   ├── Dashboard.jsx
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   └── Register.jsx
        ├── services/   # API service layer
        ├── App.js      # Main React component
        └── index.js    # React entry point
```

## API Endpoints

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
| POST | `/api/payments/checkout` | Create Stripe checkout session |
| POST | `/api/payments/webhook` | Handle Stripe webhook events |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Stripe account (for payments)

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

4. **Configure environment variables**

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/tusome
   JWT_SECRET=your-secret-key
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

5. **(Optional) Seed the database**
   ```bash
   cd backend
   node seed.js
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

| Page | Description |
|------|-------------|
| ![Home Page](./screenshots/home.png) | Homepage with course listings |
| ![Course Detail](./screenshots/course-detail.png) | Individual course details |
| ![Dashboard](./screenshots/dashboard.png) | User dashboard with subscriptions |
| ![Checkout](./screenshots/checkout.png) | Stripe checkout integration |

## License

MIT License
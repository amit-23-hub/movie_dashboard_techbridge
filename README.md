# Tech Bridge Movies

A full-stack movie management application built with React, Node.js, and MongoDB. This project consists of three main components: a client-facing movie browsing interface, an admin dashboard for movie management, and a REST API server.
## admin credential

-**admin mail** : admin@techbridge.com
-**admin pass** : admin123

## 🚀 Features

### Client Application
- **Movie Discovery**: Browse and search through a curated collection of movies
- **Advanced Filtering**: Filter movies by genre, year, language, and more
- **Responsive Design**: Mobile-first design that works on all devices
- **Movie Details**: Detailed view with descriptions, ratings, and metadata
- **Search Functionality**: Real-time search with autocomplete suggestions
- **Movie Slider**: Featured movies carousel on the homepage

### Admin Dashboard
- **Movie Management**: Add, edit, and delete movies
- **User Authentication**: Secure admin login system
- **Real-time Updates**: Instant updates when managing movie data
- **Responsive Interface**: Clean, modern admin interface
- **Bulk Operations**: Efficient movie management tools

### Backend API
- **RESTful API**: Clean, well-structured API endpoints
- **Authentication**: JWT-based authentication system
- **Database Integration**: MongoDB with Mongoose ODM
- **Data Validation**: Server-side validation and error handling
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
tech_bridge/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   └── services/      # API service functions
│   └── package.json
├── admin/                 # Admin dashboard application
│   ├── src/
│   │   ├── components/    # Admin-specific components
│   │   ├── pages/        # Admin pages
│   │   └── context/      # Authentication context
│   └── package.json
├── server/               # Backend API server
│   ├── src/
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── middleware/   # Custom middleware
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tech_bridge
   ```

2. **Install dependencies for all applications**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install

   # Install admin dependencies
   cd ../admin
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the server directory:
   ```env
 PORT=5000
 MONGODB_URI=mongodb+srv://amitsahani2322003_db_user:yC6NlxSE8Yz88kqp@cluster0.g7ptobg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 JWT_SECRET=tech-bridge
   ```

4. **Start the applications**

   **Terminal 1 - Start the server:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start the client:**
   ```bash
   cd client
   npm run dev
   ```

   **Terminal 3 - Start the admin dashboard:**
   ```bash
   cd admin
   npm run dev
   ```

5. **Access the applications**
   - Client Application: https://movie-client-omega.vercel.app/
   - Admin Dashboard: https://movie-admin-olive.vercel.app/
   - API Server: https://mov-backend-l34e.onrender.com

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Movie Endpoints
- `GET /api/movies` - Get all movies (with optional filtering)
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create new movie (admin only)
- `PUT /api/movies/:id` - Update movie (admin only)
- `DELETE /api/movies/:id` - Delete movie (admin only)

### Query Parameters for Movies
- `search` - Search in movie name and description
- `genre` - Filter by genre
- `year` - Filter by year
- `language` - Filter by language
- `limit` - Limit number of results
- `page` - Page number for pagination

## 🔧 Development

### Available Scripts

**Client & Admin:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Server:**
- `npm run dev` - Start with nodemon
- `npm start` - Start production server

### Database Schema

**User Model:**
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['admin', 'user', 'readonly'], default: 'admin'),
  timestamps: true
}
```

**Movie Model:**
```javascript
{
  movie_name: String (required),
  description: String (required),
  year: Number (required),
  genre: [String] (required),
  language: String (required),
  production: String (default: 'N/A'),
  poster_url: String (default: ''),
  timestamps: true
}
```

## 🎨 UI Components

### Client Components
- `MovieCard` - Individual movie display card
- `MovieGrid` - Grid layout for movies
- `MovieSlider` - Featured movies carousel
- `MovieFilters` - Advanced filtering interface
- `SearchBar` - Search input with suggestions
- `MovieDetail` - Detailed movie view

### Admin Components
- `Dashboard` - Main admin interface
- `ProtectedRoute` - Route protection wrapper

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes and API endpoints
- Input validation and sanitization
- CORS configuration

## 🚀 Deployment

### Environment Setup
1. Set up MongoDB Atlas or local MongoDB instance
2. Configure environment variables
3. Build production versions of client and admin apps
4. Deploy server to your preferred hosting platform
```






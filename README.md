# Entertainment Web App

A full-stack, production-ready entertainment web application built with modern web technologies. Inspired by popular streaming platforms, it features a sleek dark UI, real-time movie/TV show discovery via the TMDB API, and a personalized bookmarking system.

## 🚀 Teck Stack

- **Frontend**: React, Vite, Tailwind CSS
- **State Management**: Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT & Bcrypt
- **API**: TMDB (The Movie Database)

## 🛠️ Features

- **Authentication**: Secure registration and login.
- **Home Page**: See trending and recommended movies and TV series.
- **Media Discovery**: Dedicated pages for Movies and TV Series with grid layouts.
- **Search**: Global real-time search across all content with debouncing.
- **Bookmarks**: Save your favorite shows to your personal list (persisted in MongoDB).
- **Responsive**: Fully optimized for mobile, tablet, and desktop.

## 📦 Getting Started

### Prerequisites

- Node.js installed
- MongoDB URI (Atlas or Local)
- TMDB API Key (Get one at [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. **Clone the repository** (if applicable)
2. **Setup Backend**
   - Navigate to the `backend` folder.
   - Run `npm install`.
   - Create a `.env` file and add the following:
     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
   - Start the backend: `npm run dev`.

3. **Setup Frontend**
   - Navigate to the `frontend` folder.
   - Run `npm install`.
   - Create a `.env` file and add:
     ```env
     VITE_API_URL=http://localhost:5000/api
     VITE_TMDB_API_KEY=your_tmdb_api_key
     VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
     ```
   - Start the frontend: `npm run dev`.

## 📂 Project Structure

### Backend
- `/config`: Database connection setup.
- `/controllers`: Logic for auth and bookmarks.
- `/models`: Mongoose schemas.
- `/routes`: Express routes.
- `/middleware`: Auth protected routes logic.

### Frontend
- `/src/components`: Reusable UI elements (Navbar, MediaCard).
- `/src/pages`: Application views (Home, Movies, Bookmarks).
- `/src/redux`: Slices and Store configuration.
- `/src/services`: API handlers for backend and TMDB.

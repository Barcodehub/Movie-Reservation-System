# Movie Reservation System

A robust backend system for a movie reservation service built with Node.js, Express, and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)


## Overview
Movie Reservation System is a robust backend solution for managing cinema ticket bookings. Built with Node.js and MongoDB, it offers user authentication, movie and showtime management, seat reservation, and an admin dashboard. This system provides a secure and efficient API for handling movie theater operations, from user registration to ticket cancellation.

## Features

- User authentication and authorization (JWT)
- User roles (admin and regular user)
- Movie management (CRUD operations)
- Showtime scheduling
- Seat reservation system
- Reservation management for users
- Admin dashboard for overall system management
- Secure API with proper error handling


## Installation

1. Clone the repository

2. Install dependencies:

   `npm install`

## Configuration

1. Create a `.env` file in the root directory with the following content:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/movie_reservation_system
JWT_SECRET=your_jwt_secret_here

2. Adjust the values according to your environment.

## Usage

To start the server: npm start

The server will start running at `http://localhost:3000` (or the port you specified in the .env file).

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user

### Movies
- `GET /api/movies`: Get all movies
- `POST /api/movies`: Create a new movie (Admin only)
- `PUT /api/movies/:id`: Update a movie (Admin only)
- `DELETE /api/movies/:id`: Delete a movie (Admin only)

### Showtimes
- `GET /api/showtimes`: Get all showtimes
- `POST /api/showtimes`: Create a new showtime (Admin only)
- `PUT /api/showtimes/:id`: Update a showtime (Admin only)
- `DELETE /api/showtimes/:id`: Delete a showtime (Admin only)

### Reservations
- `POST /api/reservations`: Create a new reservation
- `GET /api/reservations/user`: Get user's reservations
- `DELETE /api/reservations/:id`: Cancel a reservation
- `GET /api/reservations/all`: Get all reservations (Admin only)

## Testing

To test the API endpoints, you can use Postman or any other API testing tool. Make sure to include the JWT token in the Authorization header for protected routes.

Example:

Authorization: `Bearer <your_jwt_token>`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License with an Attribution Clause - see the [LICENSE](LICENSE) file for details.
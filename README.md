# NASA Mission Control API

This project is a Node.js backend service that powers the NASA Mission Control Dashboard. The frontend is sourced from ZeroToMastery's NASA project, while the backend is custom-built to handle mission launches, planet data, and MongoDB integration.

## Features

- RESTful API endpoints for managing space missions
- MongoDB integration for persistent data storage
- CSV parsing for Kepler space data
- Launch scheduling and management
- Mission abort functionality
- Comprehensive test suite using Jest

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)
- **Jest** - Testing framework
- **PM2** - Process manager for Node.js
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing middleware

## Server Structure
```
server/
├── data/                        # Contains Kepler dataset
├── public/                      # Static files (built frontend)
├── src/
│   ├── models/                  # Database models
│   │   ├── launches.model.js    # Launch operations logic
│   │   ├── launches.mongo.js    # Launch MongoDB schema
│   │   ├── planets.model.js     # Planet operations logic
│   │   └── planets.mongo.js     # Planet MongoDB schema
│   ├── routes/                  # API routes
│   │   ├── launches/            # Launch-related endpoints
│   │   └── planets/             # Planet-related endpoints
│   ├── utils/                   # Utility functions
│   │   └── mongo.js             # MongoDB connection utilities
│   ├── app.js                   # Express application setup
│   └── server.js                # Server entry point
└── tests/                       # Test files
```

## Setup & Installation

1. Clone the repository
2. Install dependencies ```npm install```
3. Create a `.env` file in the server directory with:
   - PORT=8000
   - DB_PASSWORD=your_mongodb_password
4. Start the server ```dev, start, and cluster modes```

## API Endpoints

### Launches
- GET /launches - Retrieve all launches
- POST /launches - Schedule a new launch
  - Required body:
  ```
  {
    mission,
    rocket,
    launchDate,
    target
  }
  ```
- DELETE /launches/:id - Abort a launch by flight number

### Planets
- GET /planets - Retrieve all habitable planets from Kepler data

## Database Models

### Launch Schema
```
{
  flightNumber: Number,  // Auto-incrementing flight number
  mission: String,      // Mission name
  rocket: String,       // Rocket type
  launchDate: Date,     // Planned launch date
  target: String,       // Destination planet
  customers: [String],  // Array of mission customers
  upcoming: Boolean,    // Launch status
  success: Boolean      // Mission success status
}
```

### Planet Schema
```
{
  keplerName: String    // Name of the habitable planet
}
```

## Testing

Run the test suite ```npm test```
For watch mode ```npm run test-watch```

## Security Features

- CORS configured for development environment
- Environment variables for sensitive data
- MongoDB Atlas for secure database hosting
- Error handling middleware
- Input validation for launch data

## Frontend Integration

The frontend is sourced from ZeroToMastery and includes:
- React-based dashboard
- Arwes UI framework for sci-fi styling
- Mission scheduling interface
- Launch history visualization
- Upcoming missions management

The frontend build is served statically through the Express backend.

## Environment Variables

Required environment variables:
- PORT: Server port (default: 8000)
- DB_PASSWORD: MongoDB Atlas password
- MONGO_URL: MongoDB connection string (optional)

## Acknowledgments

- Frontend provided by [ZeroToMastery](https://zerotomastery.io/)
- Kepler space data provided by NASA
- MongoDB Atlas for database hosting

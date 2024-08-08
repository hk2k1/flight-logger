# FlightLogger

FlightLogger is a Single Page Application (SPA) built with Next.js and MongoDB, designed for pilots to create and manage their flight log entries efficiently.

## Features

- User authentication (login/logout)
- Create, read, update, and delete flight log entries
- Search functionality to find specific flight logs
- Responsive design for both desktop and mobile use

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (local instance or cloud-based service like MongoDB Atlas)

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/flight-logger.git
   cd flight-logger
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
flight-logger/
│
├── pages/
│   ├── api/
│   ├── _app.js
│   ├── index.js
│   └── login.js
│
├── styles/
│   └── globals.css
│
├── public/
│
└── tests/
```

## ST Assessment

This project was done for ST Engineering 1st Round Assessment.

## License

This project is licensed under the MIT License.

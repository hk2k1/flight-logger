# FlightLogger

FlightLogger is a sophisticated Single Page Application (SPA) built with Next.js and MongoDB, designed for pilots to efficiently create and manage their flight log entries. This project was developed as part of the ST Engineering 1st Round Assessment.

## Features

- Robust user authentication system (register/login/logout)
- Role-based access control (User and Admin roles)
- Create, read, update, and delete flight log entries
- User profile management
- Admin panel for user management
- Search and filter functionality for flight logs
- Responsive design for seamless use on both desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React
- **UI Library**: Shadcn UI
- **Styling**: TailwindCSS
- **Backend**: Next.js - API Routes, Server Actions (Express is installed but never used, instead opted for Server Actions)
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Form Handling**: react-hook-form with Zod validation
- **State Management**: React Context API

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
npm install or yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=anystring
```

4. Optional - To use GithHb or Google OAuth, you would require to get auth credentials from the providers.
   Create a OAuth App on the providers and copy their IDs & Secret respectively.

For GitHub: Go to [Settings -> Developer -> OAuth Apps](https://github.com/settings/developers)

For Google: Go to [Create a Project -> APIs & Services -> OAuth Consent Screen -> External + default options](https://console.cloud.google.com/)

```
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

5. Run the development server:

```
npm run dev or yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```

flight-logger/
│
├── app/
│ ├── api/
│ ├── dashboard/
│ │ ├── profile/
│ │ └── users/
│ ├── (auth)
│ │ ├── login/
│ | └── register/
│ └── layout.tsx
│
├── components/
│ ├── ui/
│ ├── forms/
│ └── tables/
│
├── lib/
│ ├── actions/
│ ├── models/
│ ├── validation/
│ └── hooks/
│
├── styles/
│ └── globals.css
│
└── public/

```

There were a few extra features implemented.

## Authentication and Authorization

FlightLogger implements authentication using [NextAuth.js V5 (Beta)](https://next-auth.js.org/). The authentication flow is handled through a combination of server-side checks and client-side route protection:

- Public routes are accessible to only logged/authenticated in users
- Auth routes (login/register) redirect authenticated users to the dashboard
- Protected routes redirect unauthenticated users to the login page
- API routes under `/api/auth` are always accessible

## Role-Based Access Control

The application supports two user roles:

- **User**: Can manage their own flight logs and profile
- **Admin**: Has access to user management and all flight logs

> Note: Profile might have a small bug -> Refresh page and try.

## Development Practices

- TypeScript for type safety
- ESLint and Prettier for code quality and formatting
- Git for version control
- Modular component architecture
- Server-side rendering and API routes for improved performance and SEO

## Deployment

Application deployed on Vercel.

> Note: If you try to run `npm run build`, it would fail.
> This is due to some edge runtime errors that hasn't been fixed by Nextjs.
> Refer to this [GitHub Discussion](https://github.com/vercel/next.js/discussions/46722).

## Thoughts

Fun learning experience trying to learn next-auth, OAuth for the first time.

## Contact

- If any issues, please contact me at my email: [m.harshakeerthan@gmail.com](mailto:m.harshakeerthan@gmail.com).

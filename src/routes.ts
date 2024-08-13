// all the routes available for logged out users
// routes that do not require auth
export const publicRoutes = ["/not-found"];

//routes that require authentication
export const authRoutes = ["/login", "/register"];

// routes that must always be accessible no matter the user's auth state
export const apiAuthPrefix = "/api/auth";

// default redirect path after login
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

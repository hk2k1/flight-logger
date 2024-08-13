import { NavItem } from "@/lib/types";

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: "user",
    label: "users",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "settings",
    label: "profile",
  },
  {
    title: "Logout",
    href: "/api/auth/signout",
    icon: "login",
    label: "logout",
  },
];

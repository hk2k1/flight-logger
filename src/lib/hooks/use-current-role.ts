import { auth } from "@/auth";
import { useSession } from "next-auth/react";

// using client side hook
export const useCurrentRole = async () => {
  const session = useSession();
  return session?.data?.user?.role;
};

// BELOW IS NOT WORKING - TODO: FIX
// using server side hook - NOT WORKING
// export const useCurrentRole = async () => {
//   const session = await auth();
//   return session;
// };

export const useCurrentUser = () => {
  const session = useSession();
  return session?.data?.user;
};

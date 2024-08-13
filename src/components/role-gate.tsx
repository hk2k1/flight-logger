"use client";

import { useCurrentRole } from "@/lib/hooks/use-current-role";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: "user" | "admin";
}

export default async function RoleGate({
  children,
  allowedRoles,
}: RoleGateProps) {
  const role = await useCurrentRole();
  if (role !== allowedRoles) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Forbidden!</AlertTitle>
        <AlertDescription>
          You are not authorized to view this page.
        </AlertDescription>
      </Alert>
    );
  }
  return <>{children}</>;
}

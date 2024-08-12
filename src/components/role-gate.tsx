"use client";

import { useCurrentRole } from "@/lib/hooks/use-current-role";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: string;
}

export default function RoleGate({ children, allowedRoles }: RoleGateProps) {
  const role = useCurrentRole();
  if (role !== allowedRoles) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Forbidden!</AlertTitle>
        <AlertDescription>
          You are not authorized to view this page.
        </AlertDescription>
      </Alert>
    );
  }
  return <>{children}</>;
}

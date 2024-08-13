import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive() {
  return (
    <Alert variant="destructive" className="p-8">
      <AlertCircle className="h-8 w-8" />
      <AlertTitle>Forbidden</AlertTitle>
      <AlertDescription className="text-gray-400">
        You do not have permission to access this page.
      </AlertDescription>
      <AlertDescription className="text-gray-400">
        Go to profile and switch role to ADMIN
      </AlertDescription>
    </Alert>
  );
}

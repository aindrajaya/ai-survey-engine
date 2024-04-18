import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { AlertCircle } from "lucide-react";

const page = () => {
  return (
    <Alert variant="default">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your answers were recorded successfully. Thank you for submitting the
        form.
      </AlertDescription>
    </Alert>
  );
};

export default page;

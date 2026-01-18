"use client";

import { AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PrototypeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-500 text-black px-4 py-2 flex items-center justify-between text-sm font-medium border-b border-yellow-600">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>
          <strong>Prototype Notice:</strong> This application is a prototype
          project only for Masinloc LGU. It does not represent the real status
          of the system and features may change without notice.
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsVisible(false)}
        className="h-6 w-6 text-black hover:bg-yellow-600 hover:text-black shrink-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

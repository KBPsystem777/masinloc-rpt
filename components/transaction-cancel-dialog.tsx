"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Ban, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TransactionCancelDialogProps {
  open: boolean;
  propertyPin: string;
  owner: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: CancelData) => void;
}

export interface CancelData {
  cancellationDate: string;
  reason: string;
  referenceDocument: string;
}

export function TransactionCancelDialog({
  open,
  propertyPin,
  owner,
  onOpenChange,
  onConfirm,
}: TransactionCancelDialogProps) {
  const [step, setStep] = useState<"form" | "review">("form");
  const [formData, setFormData] = useState<CancelData>({
    cancellationDate: new Date().toISOString().split("T")[0],
    reason: "",
    referenceDocument: "",
  });

  const handleConfirm = () => {
    if (formData.reason && formData.referenceDocument) {
      onConfirm(formData);
      setStep("form");
      setFormData({
        cancellationDate: new Date().toISOString().split("T")[0],
        reason: "",
        referenceDocument: "",
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Ban className="h-5 w-5" />
            Cancel Title Deed
          </DialogTitle>
          <DialogDescription>
            Proceed with caution. Cancellation of PIN {propertyPin} will mark it
            as inactive.
          </DialogDescription>
        </DialogHeader>

        {step === "form" ? (
          <div className="space-y-6">
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                This action will mark the property as inactive. This cannot be
                easily undone without administrative action.
              </AlertDescription>
            </Alert>

            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
              <p className="text-sm font-semibold">Current Status</p>
              <p className="text-lg">PIN: {propertyPin}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Owner: {owner}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="cancellationDate">Cancellation Date</Label>
                <Input
                  id="cancellationDate"
                  type="date"
                  value={formData.cancellationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cancellationDate: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="reason">Reason for Cancellation</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain why this title deed is being cancelled..."
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className="mt-2 min-h-24"
                />
              </div>

              <div>
                <Label htmlFor="refDoc">Reference Document / Court Order</Label>
                <Input
                  id="refDoc"
                  placeholder="e.g., Court Order / LRA Ruling Number"
                  value={formData.referenceDocument}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      referenceDocument: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>
            </div>

            <Separator />

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setStep("review")}
                disabled={!formData.reason || !formData.referenceDocument}
                variant="destructive"
              >
                Review Cancellation
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                Please confirm you understand this action will deactivate the
                property record.
              </AlertDescription>
            </Alert>

            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">PIN</span>
                <span className="font-mono font-semibold">{propertyPin}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Owner</span>
                <span className="font-semibold">{owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="font-semibold">
                  {formData.cancellationDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Reason</span>
                <span className="text-right text-sm max-w-xs">
                  {formData.reason}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Reference</span>
                <span className="font-mono text-sm">
                  {formData.referenceDocument}
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setStep("form")}>
                Back
              </Button>
              <Button onClick={handleConfirm} variant="destructive">
                Confirm Cancellation
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

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
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

interface TransactionTransferDialogProps {
  open: boolean;
  propertyPin: string;
  currentOwner: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: TransferData) => void;
}

export interface TransferData {
  newOwnerName: string;
  newOwnerAddress: string;
  transferDate: string;
  referenceDocument: string;
}

export function TransactionTransferDialog({
  open,
  propertyPin,
  currentOwner,
  onOpenChange,
  onConfirm,
}: TransactionTransferDialogProps) {
  const [step, setStep] = useState<"form" | "review">("form");
  const [formData, setFormData] = useState<TransferData>({
    newOwnerName: "",
    newOwnerAddress: "",
    transferDate: new Date().toISOString().split("T")[0],
    referenceDocument: "",
  });

  const handleConfirm = () => {
    if (
      formData.newOwnerName &&
      formData.newOwnerAddress &&
      formData.referenceDocument
    ) {
      onConfirm(formData);
      setStep("form");
      setFormData({
        newOwnerName: "",
        newOwnerAddress: "",
        transferDate: new Date().toISOString().split("T")[0],
        referenceDocument: "",
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Transfer Property Ownership
          </DialogTitle>
          <DialogDescription>
            Process ownership transfer for PIN: {propertyPin}
          </DialogDescription>
        </DialogHeader>

        {step === "form" ? (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <p className="text-sm font-semibold">Current Owner</p>
              <p className="text-lg">{currentOwner}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="newOwner">New Owner Name</Label>
                <Input
                  id="newOwner"
                  placeholder="Full name of new owner"
                  value={formData.newOwnerName}
                  onChange={(e) =>
                    setFormData({ ...formData, newOwnerName: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="address">New Owner Address</Label>
                <Input
                  id="address"
                  placeholder="Complete address"
                  value={formData.newOwnerAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newOwnerAddress: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="transferDate">Transfer Date</Label>
                <Input
                  id="transferDate"
                  type="date"
                  value={formData.transferDate}
                  onChange={(e) =>
                    setFormData({ ...formData, transferDate: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="refDoc">Reference Document Number</Label>
                <Input
                  id="refDoc"
                  placeholder="e.g., Transfer-Doc-2024-001"
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
                disabled={
                  !formData.newOwnerName ||
                  !formData.newOwnerAddress ||
                  !formData.referenceDocument
                }
              >
                Review Transfer
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">PIN</span>
                <span className="font-mono font-semibold">{propertyPin}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">From</span>
                <span className="font-semibold">{currentOwner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">To</span>
                <span className="font-semibold">{formData.newOwnerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Address</span>
                <span className="text-right text-sm">
                  {formData.newOwnerAddress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="font-semibold">{formData.transferDate}</span>
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
              <Button
                onClick={handleConfirm}
                className="bg-green-600 hover:bg-green-700"
              >
                Confirm Transfer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

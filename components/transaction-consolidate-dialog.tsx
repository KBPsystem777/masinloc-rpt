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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Merge } from "lucide-react";

interface TransactionConsolidateDialogProps {
  open: boolean;
  propertyPin: string;
  blockNumber: number;
  lotNumber: number;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: ConsolidateData) => void;
}

export interface ConsolidateData {
  selectedLots: string[];
  consolidationDate: string;
  referenceDocument: string;
}

export function TransactionConsolidateDialog({
  open,
  propertyPin,
  blockNumber,
  lotNumber,
  onOpenChange,
  onConfirm,
}: TransactionConsolidateDialogProps) {
  const [step, setStep] = useState<"form" | "review">("form");
  const [formData, setFormData] = useState<ConsolidateData>({
    selectedLots: [],
    consolidationDate: new Date().toISOString().split("T")[0],
    referenceDocument: "",
  });

  // Mock available lots for consolidation (same block, adjacent lots)
  const availableLots = [
    { lot: lotNumber + 1, pin: `${blockNumber}-${lotNumber + 1}` },
    { lot: lotNumber + 2, pin: `${blockNumber}-${lotNumber + 2}` },
    { lot: lotNumber - 1, pin: `${blockNumber}-${lotNumber - 1}` },
  ];

  const handleSelectLot = (lotPin: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedLots.includes(lotPin);
      return {
        ...prev,
        selectedLots: isSelected
          ? prev.selectedLots.filter((l) => l !== lotPin)
          : [...prev.selectedLots, lotPin],
      };
    });
  };

  const handleConfirm = () => {
    if (formData.selectedLots.length > 0 && formData.referenceDocument) {
      onConfirm(formData);
      setStep("form");
      setFormData({
        selectedLots: [],
        consolidationDate: new Date().toISOString().split("T")[0],
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
            <Merge className="h-5 w-5" />
            Consolidate Multiple Lots
          </DialogTitle>
          <DialogDescription>
            Combine PIN {propertyPin} with adjacent lots into a single property
          </DialogDescription>
        </DialogHeader>

        {step === "form" ? (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
              <p className="text-sm font-semibold">Primary Lot</p>
              <p className="text-lg font-mono">
                Block {blockNumber}, Lot {lotNumber}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PIN: {propertyPin}
              </p>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">
                Select Lots to Consolidate
              </Label>
              <div className="space-y-2">
                {availableLots.map((available) => (
                  <div
                    key={available.pin}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    <Checkbox
                      id={available.pin}
                      checked={formData.selectedLots.includes(available.pin)}
                      onCheckedChange={() => handleSelectLot(available.pin)}
                    />
                    <Label
                      htmlFor={available.pin}
                      className="flex-1 cursor-pointer font-medium"
                    >
                      <span className="text-base">Lot {available.lot}</span>
                      <span className="text-xs text-muted-foreground block">
                        {available.pin}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="consolidationDate">Consolidation Date</Label>
                <Input
                  id="consolidationDate"
                  type="date"
                  value={formData.consolidationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      consolidationDate: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="refDoc">Reference Document / Survey Plan</Label>
                <Input
                  id="refDoc"
                  placeholder="e.g., Consolidation-Doc-2024-001"
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
                  formData.selectedLots.length === 0 ||
                  !formData.referenceDocument
                }
              >
                Review Consolidation
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Primary PIN
                </span>
                <span className="font-mono font-semibold">{propertyPin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Lots to Consolidate
                </span>
                <span className="text-right">
                  {formData.selectedLots.length} lot(s)
                </span>
              </div>
              {formData.selectedLots.map((pin) => (
                <div
                  key={pin}
                  className="flex justify-between pl-4 border-l-2 border-purple-300"
                >
                  <span className="text-sm">Lot</span>
                  <span className="font-mono text-sm">{pin}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="font-semibold">
                  {formData.consolidationDate}
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
              <Button
                onClick={handleConfirm}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Confirm Consolidation
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

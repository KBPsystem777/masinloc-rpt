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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit3 } from "lucide-react";

interface TransactionAnnotationDialogProps {
  open: boolean;
  propertyPin: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: AnnotationData) => void;
}

export interface AnnotationData {
  annotationType: string;
  content: string;
  referenceDocument: string;
  annotationDate: string;
}

export function TransactionAnnotationDialog({
  open,
  propertyPin,
  onOpenChange,
  onConfirm,
}: TransactionAnnotationDialogProps) {
  const [step, setStep] = useState<"form" | "review">("form");
  const [formData, setFormData] = useState<AnnotationData>({
    annotationType: "",
    content: "",
    referenceDocument: "",
    annotationDate: new Date().toISOString().split("T")[0],
  });

  const annotationTypes = [
    { value: "easement", label: "Easement / Right of Way" },
    { value: "collateral", label: "Collateral / Encumbrance" },
    { value: "permit", label: "Building Permit / Development" },
    { value: "restriction", label: "Usage Restriction" },
    { value: "lien", label: "Tax Lien / Government Claim" },
    { value: "other", label: "Other Annotation" },
  ];

  const handleConfirm = () => {
    if (
      formData.annotationType &&
      formData.content &&
      formData.referenceDocument
    ) {
      onConfirm(formData);
      setStep("form");
      setFormData({
        annotationType: "",
        content: "",
        referenceDocument: "",
        annotationDate: new Date().toISOString().split("T")[0],
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Add Annotation
          </DialogTitle>
          <DialogDescription>
            Record additional remarks or restrictions for PIN {propertyPin}
          </DialogDescription>
        </DialogHeader>

        {step === "form" ? (
          <div className="space-y-6">
            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
              <p className="text-sm font-semibold">Property</p>
              <p className="text-lg font-mono">{propertyPin}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Annotation Type</Label>
                <Select
                  value={formData.annotationType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, annotationType: value })
                  }
                >
                  <SelectTrigger id="type" className="mt-2">
                    <SelectValue placeholder="Select annotation type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {annotationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content">Annotation Details</Label>
                <Textarea
                  id="content"
                  placeholder="Describe the annotation, restriction, or note in detail..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="mt-2 min-h-24"
                />
              </div>

              <div>
                <Label htmlFor="annotationDate">Annotation Date</Label>
                <Input
                  id="annotationDate"
                  type="date"
                  value={formData.annotationDate}
                  onChange={(e) =>
                    setFormData({ ...formData, annotationDate: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="refDoc">Reference Document / Number</Label>
                <Input
                  id="refDoc"
                  placeholder="e.g., Easement-2024 or Permit-2024-BLD-0445"
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
                  !formData.annotationType ||
                  !formData.content ||
                  !formData.referenceDocument
                }
              >
                Review Annotation
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">PIN</span>
                <span className="font-mono font-semibold">{propertyPin}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Type</span>
                <span className="font-semibold">
                  {
                    annotationTypes.find(
                      (t) => t.value === formData.annotationType,
                    )?.label
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="font-semibold">{formData.annotationDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Reference</span>
                <span className="font-mono text-sm">
                  {formData.referenceDocument}
                </span>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Details</p>
                <p className="text-sm bg-white dark:bg-gray-900 p-3 rounded">
                  {formData.content}
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setStep("form")}>
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                Confirm Annotation
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import type { Property } from "@/lib/pin-generator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertCircle } from "lucide-react";

interface SubdivideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property | null;
  onSubdivide: (
    property: Property,
    subdivisions: { area: number; owner: string }[],
  ) => void;
}

export function SubdivideDialog({
  open,
  onOpenChange,
  property,
  onSubdivide,
}: SubdivideDialogProps) {
  const [numSubdivisions, setNumSubdivisions] = useState("2");
  const [subdivisions, setSubdivisions] = useState<
    { area: string; owner: string }[]
  >([
    { area: "", owner: "" },
    { area: "", owner: "" },
  ]);

  const handleNumChange = (value: string) => {
    const num = Number.parseInt(value) || 2;
    setNumSubdivisions(value);
    const newSubs = Array.from(
      { length: num },
      (_, i) => subdivisions[i] || { area: "", owner: "" },
    );
    setSubdivisions(newSubs);
  };

  const updateSubdivision = (
    index: number,
    field: "area" | "owner",
    value: string,
  ) => {
    const newSubs = [...subdivisions];
    newSubs[index] = { ...newSubs[index], [field]: value };
    setSubdivisions(newSubs);
  };

  const totalArea = subdivisions.reduce(
    (sum, sub) => sum + (Number.parseFloat(sub.area) || 0),
    0,
  );
  const isValid = property && Math.abs(totalArea - property.area) < 0.01;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property || !isValid) return;

    const validSubs = subdivisions
      .filter((sub) => sub.area && sub.owner)
      .map((sub) => ({ area: Number.parseFloat(sub.area), owner: sub.owner }));

    onSubdivide(property, validSubs);
    setNumSubdivisions("2");
    setSubdivisions([
      { area: "", owner: "" },
      { area: "", owner: "" },
    ]);
    onOpenChange(false);
  };

  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Subdivide Lot</DialogTitle>
          <DialogDescription>
            Subdivide lot {property.pin} into multiple new lots. The total area
            must equal the original area.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                <strong>Original Area:</strong> {property.area.toLocaleString()}{" "}
                square meters
                <br />
                <span className="text-sm">
                  PIN: {property.pin} • Owner: {property.owner}
                </span>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="numSubs" className="text-base font-medium">
                Number of Subdivisions <span className="text-red-500">*</span>
              </Label>
              <Input
                id="numSubs"
                type="number"
                min="2"
                max="10"
                value={numSubdivisions}
                onChange={(e) => handleNumChange(e.target.value)}
                className="text-base"
              />
              <p className="text-sm text-muted-foreground">
                Choose how many lots to create from the subdivision (2-10 lots).
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-base">New Lot Details</h4>
              {subdivisions.map((sub, index) => (
                <div
                  key={index}
                  className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg space-y-3 bg-gray-50 dark:bg-gray-800"
                >
                  <h5 className="font-semibold text-sm text-blue-600">
                    New Lot #{index + 1}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`area-${index}`}
                        className="text-sm font-medium"
                      >
                        Area (square meters){" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`area-${index}`}
                        type="number"
                        step="0.01"
                        placeholder="Example: 125.25"
                        value={sub.area}
                        onChange={(e) =>
                          updateSubdivision(index, "area", e.target.value)
                        }
                        required
                        className="text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`owner-${index}`}
                        className="text-sm font-medium"
                      >
                        New Owner Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`owner-${index}`}
                        placeholder="Full name"
                        value={sub.owner}
                        onChange={(e) =>
                          updateSubdivision(index, "owner", e.target.value)
                        }
                        required
                        className="text-base"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Alert variant={isValid ? "default" : "destructive"}>
              {isValid ? (
                <Info className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                <strong>Total Area of New Lots:</strong>{" "}
                {totalArea.toLocaleString()} square meters
                {!isValid && totalArea > 0 && (
                  <>
                    <br />
                    <span className="text-red-600">
                      Difference:{" "}
                      {Math.abs(totalArea - property.area).toFixed(2)} square
                      meters
                    </span>
                    <br />
                    <span className="text-sm">
                      Total area is{" "}
                      {totalArea > property.area ? "over" : "under"} the
                      original. Adjust the areas to match the original lot.
                    </span>
                  </>
                )}
                {isValid && (
                  <>
                    <br />
                    <span className="text-green-600 text-sm">
                      ✓ Correct! Total area matches the original lot.
                    </span>
                  </>
                )}
              </AlertDescription>
            </Alert>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h5 className="font-medium text-sm mb-2 text-yellow-800 dark:text-yellow-200">
                Important Notes:
              </h5>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Original lot will be marked as "Subdivided"</li>
                <li>• New lots will each receive their own PIN</li>
                <li>• Subdivision cannot be changed after confirmation</li>
                <li>• Verify owner names are correct before proceeding</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Subdivide Lot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

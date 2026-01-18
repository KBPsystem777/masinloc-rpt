"use client";

import type React from "react";

import { useState } from "react";
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
import { Info } from "lucide-react";

interface CreateBlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nextBlockNumber: number;
  onCreateBlock: (area: number, owner: string) => void;
}

export function CreateBlockDialog({
  open,
  onOpenChange,
  nextBlockNumber,
  onCreateBlock,
}: CreateBlockDialogProps) {
  const [area, setArea] = useState("");
  const [owner, setOwner] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!area || !owner) return;

    onCreateBlock(Number.parseFloat(area), owner);
    setArea("");
    setOwner("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Block</DialogTitle>
          <DialogDescription>
            Create a new block with the first lot. The block number will be
            automatically assigned.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                The new block will be assigned number:{" "}
                <strong>{nextBlockNumber}</strong>
                <br />
                <span className="text-sm">
                  The first lot in this block will be Lot #1
                </span>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="area" className="text-base font-medium">
                Land Area (square meters){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="area"
                type="number"
                step="0.01"
                placeholder="Example: 500.75"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                className="text-base"
              />
              <p className="text-sm text-muted-foreground">
                Enter the total land area for the first lot of this new block.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner" className="text-base font-medium">
                Owner Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="owner"
                placeholder="Example: Maria Santos"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
                className="text-base"
              />
              <p className="text-sm text-muted-foreground">
                Enter the full name of the owner of the first lot in this new
                block.
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Important Notes:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• The new block will be Block #{nextBlockNumber}</li>
                <li>• The first lot will be Lot #1</li>
                <li>• You can add up to 999 lots to this block</li>
                <li>
                  • The PIN will be: 016-06-
                  {nextBlockNumber.toString().padStart(4, "0")}-001
                </li>
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
              disabled={!area || !owner}
              className="bg-green-600 hover:bg-green-700"
            >
              Create Block
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

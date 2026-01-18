"use client";

import type React from "react";

import { useState } from "react";
import {
  type Property,
  canAddLotToBlock,
  MAX_LOTS_PER_BLOCK,
} from "@/lib/pin-generator";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface CreateLotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  properties: Property[];
  onCreateLot: (blockNumber: number, area: number, owner: string) => void;
}

export function CreateLotDialog({
  open,
  onOpenChange,
  properties,
  onCreateLot,
}: CreateLotDialogProps) {
  const [blockNumber, setBlockNumber] = useState<string>("");
  const [area, setArea] = useState("");
  const [owner, setOwner] = useState("");

  const availableBlocks = Array.from(
    new Set(properties.map((p) => p.blockNumber))
  ).sort((a, b) => a - b);

  const canAdd = blockNumber
    ? canAddLotToBlock(properties, Number.parseInt(blockNumber))
    : true;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockNumber || !area || !owner) return;

    const block = Number.parseInt(blockNumber);
    if (!canAddLotToBlock(properties, block)) return;

    onCreateLot(block, Number.parseFloat(area), owner);
    setBlockNumber("");
    setArea("");
    setOwner("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Add New Lot</span>
          </DialogTitle>
          <DialogDescription>
            Add a new lot to an existing block. Maximum {MAX_LOTS_PER_BLOCK}{" "}
            lots per block.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="block" className="text-base font-medium">
                Block Number <span className="text-red-500">*</span>
              </Label>
              <Select value={blockNumber} onValueChange={setBlockNumber}>
                <SelectTrigger id="block">
                  <SelectValue placeholder="Select block..." />
                </SelectTrigger>
                <SelectContent>
                  {availableBlocks.map((block) => {
                    const lotsCount = properties.filter(
                      (p) => p.blockNumber === block && p.status === "Active"
                    ).length;
                    return (
                      <SelectItem key={block} value={block.toString()}>
                        Block {block} ({lotsCount}/{MAX_LOTS_PER_BLOCK} lots)
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Select the block where you want to add the new lot.
              </p>
            </div>

            {blockNumber && !canAdd && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Block {blockNumber} has reached the maximum of{" "}
                  {MAX_LOTS_PER_BLOCK} lots. Please create a new block instead.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="area" className="text-base font-medium">
                Land Area (square meters){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="area"
                type="number"
                step="0.01"
                placeholder="Example: 250.50"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                className="text-base"
              />
              <p className="text-sm text-muted-foreground">
                Enter the exact land area in square meters.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner" className="text-base font-medium">
                Owner Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="owner"
                placeholder="Example: Juan Dela Cruz"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
                className="text-base"
              />
              <p className="text-sm text-muted-foreground">
                Enter the full name of the property owner.
              </p>
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
              disabled={!canAdd || !blockNumber || !area || !owner}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Lot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

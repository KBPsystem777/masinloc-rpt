"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

interface CreateBlockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nextBlockNumber: number
  onCreateBlock: (area: number, owner: string) => void
}

export function CreateBlockDialog({ open, onOpenChange, nextBlockNumber, onCreateBlock }: CreateBlockDialogProps) {
  const [area, setArea] = useState("")
  const [owner, setOwner] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!area || !owner) return

    onCreateBlock(Number.parseFloat(area), owner)
    setArea("")
    setOwner("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Block</DialogTitle>
          <DialogDescription>
            Create a new block with the first lot. Block number will be auto-assigned.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                New block will be assigned number: <strong>{nextBlockNumber}</strong>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="area">Area (square meters)</Label>
              <Input
                id="area"
                type="number"
                step="0.01"
                placeholder="e.g., 250.50"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Owner Name</Label>
              <Input
                id="owner"
                placeholder="e.g., Juan Dela Cruz"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!area || !owner}>
              Create Block
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

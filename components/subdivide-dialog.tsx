"use client"

import type React from "react"

import { useState } from "react"
import type { Property } from "@/lib/pin-generator"
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
import { Info, AlertCircle } from "lucide-react"

interface SubdivideDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  property: Property | null
  onSubdivide: (property: Property, subdivisions: { area: number; owner: string }[]) => void
}

export function SubdivideDialog({ open, onOpenChange, property, onSubdivide }: SubdivideDialogProps) {
  const [numSubdivisions, setNumSubdivisions] = useState("2")
  const [subdivisions, setSubdivisions] = useState<{ area: string; owner: string }[]>([
    { area: "", owner: "" },
    { area: "", owner: "" },
  ])

  const handleNumChange = (value: string) => {
    const num = Number.parseInt(value) || 2
    setNumSubdivisions(value)
    const newSubs = Array.from({ length: num }, (_, i) => subdivisions[i] || { area: "", owner: "" })
    setSubdivisions(newSubs)
  }

  const updateSubdivision = (index: number, field: "area" | "owner", value: string) => {
    const newSubs = [...subdivisions]
    newSubs[index] = { ...newSubs[index], [field]: value }
    setSubdivisions(newSubs)
  }

  const totalArea = subdivisions.reduce((sum, sub) => sum + (Number.parseFloat(sub.area) || 0), 0)
  const isValid = property && Math.abs(totalArea - property.area) < 0.01

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!property || !isValid) return

    const validSubs = subdivisions
      .filter((sub) => sub.area && sub.owner)
      .map((sub) => ({ area: Number.parseFloat(sub.area), owner: sub.owner }))

    onSubdivide(property, validSubs)
    setNumSubdivisions("2")
    setSubdivisions([
      { area: "", owner: "" },
      { area: "", owner: "" },
    ])
    onOpenChange(false)
  }

  if (!property) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Subdivide Lot</DialogTitle>
          <DialogDescription>
            Split lot {property.pin} into multiple lots. Total area must equal original area.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Original Area: <strong>{property.area.toLocaleString()} sqm</strong>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="numSubs">Number of Subdivisions</Label>
              <Input
                id="numSubs"
                type="number"
                min="2"
                max="10"
                value={numSubdivisions}
                onChange={(e) => handleNumChange(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {subdivisions.map((sub, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3 bg-muted/30">
                  <h4 className="font-semibold text-sm">Subdivision {index + 1}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor={`area-${index}`}>Area (sqm)</Label>
                      <Input
                        id={`area-${index}`}
                        type="number"
                        step="0.01"
                        placeholder="e.g., 125.25"
                        value={sub.area}
                        onChange={(e) => updateSubdivision(index, "area", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`owner-${index}`}>Owner</Label>
                      <Input
                        id={`owner-${index}`}
                        placeholder="Owner name"
                        value={sub.owner}
                        onChange={(e) => updateSubdivision(index, "owner", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Alert variant={isValid ? "default" : "destructive"}>
              {isValid ? <Info className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertDescription>
                Total Area: <strong>{totalArea.toLocaleString()} sqm</strong>
                {!isValid && totalArea > 0 && (
                  <span className="block mt-1">Difference: {Math.abs(totalArea - property.area).toFixed(2)} sqm</span>
                )}
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Subdivide Lot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

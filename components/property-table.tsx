"use client"

import type { Property } from "@/lib/pin-generator"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Split } from "lucide-react"

interface PropertyTableProps {
  properties: Property[]
  onSubdivide: (property: Property) => void
}

export function PropertyTable({ properties, onSubdivide }: PropertyTableProps) {
  const sortedProperties = [...properties].sort((a, b) => {
    if (a.blockNumber !== b.blockNumber) {
      return a.blockNumber - b.blockNumber
    }
    return a.lotNumber - b.lotNumber
  })

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">PIN</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Block</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Lot</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Area (sqm)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Owner</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sortedProperties.map((property) => (
              <tr key={property.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-mono text-sm">{property.pin}</td>
                <td className="px-4 py-3 text-sm">{property.blockNumber}</td>
                <td className="px-4 py-3 text-sm">{property.lotNumber}</td>
                <td className="px-4 py-3 text-sm">{property.area.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{property.owner}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      property.status === "Active"
                        ? "default"
                        : property.status === "Subdivided"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {property.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {property.status === "Active" && (
                    <Button size="sm" variant="outline" onClick={() => onSubdivide(property)}>
                      <Split className="h-4 w-4 mr-1" />
                      Subdivide
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

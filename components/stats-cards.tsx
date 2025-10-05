import { type Property, MAX_LOTS_PER_BLOCK } from "@/lib/pin-generator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Grid3x3, MapPin, TrendingUp } from "lucide-react"

interface StatsCardsProps {
  properties: Property[]
}

export function StatsCards({ properties: allProperties }: StatsCardsProps) {
  const properties = allProperties.filter((p) => p.status === "Active")
  const blocks = new Set(properties.map((p) => p.blockNumber)).size
  const totalArea = properties.reduce((sum, p) => sum + p.area, 0)
  const avgLotsPerBlock = properties.length / blocks

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{properties.length}</div>
          <p className="text-xs text-muted-foreground">Active lots registered</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Blocks</CardTitle>
          <Grid3x3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{blocks}</div>
          <p className="text-xs text-muted-foreground">Max {MAX_LOTS_PER_BLOCK} lots per block</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Area</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalArea.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Square meters</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Lots/Block</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgLotsPerBlock.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Average distribution</p>
        </CardContent>
      </Card>
    </div>
  )
}

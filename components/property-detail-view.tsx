"use client";

import { type Property } from "@/lib/pin-generator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  FileText,
  TrendingUp,
  Layers,
  History,
  ArrowRight,
  Ban,
  Merge,
  Edit3,
} from "lucide-react";

interface PropertyDetailViewProps {
  property: Property;
  onTransfer?: () => void;
  onCancel?: () => void;
  onConsolidate?: () => void;
  onAnnotate?: () => void;
}

export function PropertyDetailView({
  property,
  onTransfer,
  onCancel,
  onConsolidate,
  onAnnotate,
}: PropertyDetailViewProps) {
  const statusColor =
    property.status === "Active"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";

  return (
    <div className="grid gap-6">
      {/* Header Card - Core Property Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{property.pin}</CardTitle>
              <CardDescription>Property Information Network ID</CardDescription>
            </div>
            <Badge className={statusColor}>{property.status}</Badge>
          </div>
          <Separator className="mt-4" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Owner</p>
              <p className="font-semibold">{property.owner}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold">
                Block {property.blockNumber}, Lot {property.lotNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Area</p>
              <p className="font-semibold">{property.area} sq. meters</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Municipality</p>
              <p className="font-semibold">{property.town}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Province</p>
              <p className="font-semibold">{property.province}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Record Created</p>
              <p className="font-semibold">
                {property.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Valuation & Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Market Value</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                ₱{(property.area * 15000).toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Assessed Value</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                ₱{(property.area * 12000).toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Annual Tax</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                ₱{Math.floor(property.area * 12000 * 0.01).toLocaleString()}
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Area Unit Cost</p>
              <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                ₱{(15000).toLocaleString()}/sq.m
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Technical Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Boundaries */}
            {property.boundaries && (
              <div>
                <h4 className="font-semibold mb-3">Property Boundaries</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase">
                      North
                    </p>
                    <p className="text-lg font-bold">
                      {property.boundaries.north}m
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase">
                      South
                    </p>
                    <p className="text-lg font-bold">
                      {property.boundaries.south}m
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase">
                      East
                    </p>
                    <p className="text-lg font-bold">
                      {property.boundaries.east}m
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase">
                      West
                    </p>
                    <p className="text-lg font-bold">
                      {property.boundaries.west}m
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Classification & Barangay */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.barangay && (
                <div>
                  <p className="text-sm text-muted-foreground">Barangay</p>
                  <p className="font-semibold">{property.barangay}</p>
                </div>
              )}
              {property.areaClassification && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    Area Classification
                  </p>
                  <Badge variant="outline">{property.areaClassification}</Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Geospatial Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Geospatial Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Map Placeholder */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {property.mapData || "Map visualization"}
                </p>
              </div>
            </div>

            {/* Coordinates */}
            {property.coordinates && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-sky-50 dark:bg-sky-950 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Latitude</p>
                  <p className="font-mono font-semibold">
                    {property.coordinates.latitude.toFixed(4)}°
                  </p>
                </div>
                <div className="bg-sky-50 dark:bg-sky-950 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Longitude</p>
                  <p className="font-mono font-semibold">
                    {property.coordinates.longitude.toFixed(4)}°
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* History Timeline Card */}
      {property.history && property.history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Transaction History
            </CardTitle>
            <CardDescription>
              {property.history.length} recorded event(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {property.history.map((event, idx) => (
                <div key={idx} className="flex gap-4">
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${idx === 0 ? "bg-blue-600" : "bg-gray-400"}`}
                    />
                    {idx < property.history!.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 dark:bg-gray-700 mt-2" />
                    )}
                  </div>

                  {/* Event Card */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">
                          {event.type.replace(/_/g, " ")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {event.date.toLocaleDateString()}
                        </p>
                      </div>
                      {event.type === "TD_Creation" && (
                        <Badge variant="default">Created</Badge>
                      )}
                      {event.type === "Transfer" && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Transfer
                        </Badge>
                      )}
                      {event.type === "Consolidation" && (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          Consolidation
                        </Badge>
                      )}
                      {event.type === "Annotation" && (
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Annotation
                        </Badge>
                      )}
                      {event.type === "TD_Cancellation" && (
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          Cancelled
                        </Badge>
                      )}
                      {event.type === "Annotation_Cancellation" && (
                        <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                          Cancelled
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mb-2">{event.description}</p>
                    {event.referenceDocument && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-mono">
                          Ref: {event.referenceDocument}
                        </span>
                      </p>
                    )}
                    {event.relatedPin && (
                      <p className="text-xs text-muted-foreground">
                        Related PIN:{" "}
                        <span className="font-mono">{event.relatedPin}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Transaction Actions
          </CardTitle>
          <CardDescription>
            Perform RPT transactions on this property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={onTransfer}
              className="justify-start"
              variant="outline"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Transfer Ownership
            </Button>
            <Button
              onClick={onCancel}
              className="justify-start"
              variant="outline"
            >
              <Ban className="h-4 w-4 mr-2" />
              Cancel Title Deed
            </Button>
            <Button
              onClick={onConsolidate}
              className="justify-start"
              variant="outline"
            >
              <Merge className="h-4 w-4 mr-2" />
              Consolidate Lots
            </Button>
            <Button
              onClick={onAnnotate}
              className="justify-start"
              variant="outline"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Add Annotation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

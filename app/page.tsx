"use client";

import { useState } from "react";
import {
  type Property,
  generatePIN,
  getNextBlockNumber,
  getNextLotNumber,
} from "@/lib/pin-generator";
import { createMockProperties, MASINLOC_CONFIG } from "@/lib/mock-data";
import { PropertyTable } from "@/components/property-table";
import { CreateLotDialog } from "@/components/create-lot-dialog";
import { CreateBlockDialog } from "@/components/create-block-dialog";
import { SubdivideDialog } from "@/components/subdivide-dialog";
import { StatsCards } from "@/components/stats-cards";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Grid3x3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AssessorPage() {
  const [properties, setProperties] = useState<Property[]>(
    createMockProperties()
  );
  const [createLotOpen, setCreateLotOpen] = useState(false);
  const [createBlockOpen, setCreateBlockOpen] = useState(false);
  const [subdivideOpen, setSubdivideOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const { toast } = useToast();

  const handleCreateLot = (
    blockNumber: number,
    area: number,
    owner: string
  ) => {
    const lotNumber = getNextLotNumber(properties, blockNumber);
    const pin = generatePIN(
      MASINLOC_CONFIG.provinceCode,
      MASINLOC_CONFIG.townCode,
      blockNumber,
      lotNumber
    );

    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      pin,
      province: MASINLOC_CONFIG.province,
      provinceCode: MASINLOC_CONFIG.provinceCode,
      town: MASINLOC_CONFIG.town,
      townCode: MASINLOC_CONFIG.townCode,
      blockNumber,
      lotNumber,
      area,
      owner,
      status: "Active",
      createdAt: new Date(),
    };

    setProperties([...properties, newProperty]);
    toast({
      title: "Lot Created",
      description: `New lot ${pin} has been created successfully.`,
    });
  };

  const handleCreateBlock = (area: number, owner: string) => {
    const blockNumber = getNextBlockNumber(properties);
    const lotNumber = 1;
    const pin = generatePIN(
      MASINLOC_CONFIG.provinceCode,
      MASINLOC_CONFIG.townCode,
      blockNumber,
      lotNumber
    );

    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      pin,
      province: MASINLOC_CONFIG.province,
      provinceCode: MASINLOC_CONFIG.provinceCode,
      town: MASINLOC_CONFIG.town,
      townCode: MASINLOC_CONFIG.townCode,
      blockNumber,
      lotNumber,
      area,
      owner,
      status: "Active",
      createdAt: new Date(),
    };

    setProperties([...properties, newProperty]);
    toast({
      title: "Block Created",
      description: `New block ${blockNumber} with lot ${pin} has been created.`,
    });
  };

  const handleSubdivide = (
    property: Property,
    subdivisions: { area: number; owner: string }[]
  ) => {
    const updatedProperties = properties.map((p) =>
      p.id === property.id ? { ...p, status: "Subdivided" as const } : p
    );

    const newProperties = subdivisions.map((sub, index) => {
      const lotNumber = getNextLotNumber(
        updatedProperties,
        property.blockNumber
      );
      const pin = generatePIN(
        MASINLOC_CONFIG.provinceCode,
        MASINLOC_CONFIG.townCode,
        property.blockNumber,
        lotNumber + index
      );

      return {
        id: `prop-${Date.now()}-${index}`,
        pin,
        province: MASINLOC_CONFIG.province,
        provinceCode: MASINLOC_CONFIG.provinceCode,
        town: MASINLOC_CONFIG.town,
        townCode: MASINLOC_CONFIG.townCode,
        blockNumber: property.blockNumber,
        lotNumber: lotNumber + index,
        area: sub.area,
        owner: sub.owner,
        status: "Active" as const,
        parentPin: property.pin,
        createdAt: new Date(),
      };
    });

    setProperties([...updatedProperties, ...newProperties]);
    toast({
      title: "Lot Subdivided",
      description: `Lot ${property.pin} has been subdivided into ${subdivisions.length} new lots.`,
    });
  };

  const handleSubdivideClick = (property: Property) => {
    setSelectedProperty(property);
    setSubdivideOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">
                LGU Assessor's Office
              </h1>
              <p className="text-muted-foreground mt-1">
                Property Index Number Management System
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{MASINLOC_CONFIG.town}</p>
              <p className="text-sm text-muted-foreground">
                {MASINLOC_CONFIG.province}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <StatsCards properties={properties} />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Property Registry</CardTitle>
                <CardDescription>
                  Manage property index numbers following Philippine standards
                  (PPP-TT-BBBB-BBB-LLL)
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setCreateLotOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Lot
                </Button>
                <Button
                  onClick={() => setCreateBlockOpen(true)}
                  variant="secondary"
                >
                  <Grid3x3 className="h-4 w-4 mr-2" />
                  Create Block
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PropertyTable
              properties={properties}
              onSubdivide={handleSubdivideClick}
            />
          </CardContent>
        </Card>
      </main>

      <CreateLotDialog
        open={createLotOpen}
        onOpenChange={setCreateLotOpen}
        properties={properties}
        onCreateLot={handleCreateLot}
      />

      <CreateBlockDialog
        open={createBlockOpen}
        onOpenChange={setCreateBlockOpen}
        nextBlockNumber={getNextBlockNumber(properties)}
        onCreateBlock={handleCreateBlock}
      />

      <SubdivideDialog
        open={subdivideOpen}
        onOpenChange={setSubdivideOpen}
        property={selectedProperty}
        onSubdivide={handleSubdivide}
      />
    </div>
  );
}

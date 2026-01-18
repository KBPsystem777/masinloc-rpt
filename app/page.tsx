"use client";

import { useState } from "react";
import {
  type Property,
  generatePIN,
  getNextBlockNumber,
  getNextLotNumber,
} from "@/lib/pin-generator";
import { createMockProperties, MASINLOC_CONFIG } from "@/lib/mock-data";
import { Navigation } from "@/components/navigation";
import { DashboardView } from "@/components/dashboard-view";
import { PropertyTable } from "@/components/property-table";
import { PropertyDetailView } from "@/components/property-detail-view";
import { ReportsView } from "@/components/reports-view";
import { CreateLotDialog } from "@/components/create-lot-dialog";
import { CreateBlockDialog } from "@/components/create-block-dialog";
import { SubdivideDialog } from "@/components/subdivide-dialog";
import {
  TransactionTransferDialog,
  type TransferData,
} from "@/components/transaction-transfer-dialog";
import {
  TransactionCancelDialog,
  type CancelData,
} from "@/components/transaction-cancel-dialog";
import {
  TransactionConsolidateDialog,
  type ConsolidateData,
} from "@/components/transaction-consolidate-dialog";
import {
  TransactionAnnotationDialog,
  type AnnotationData,
} from "@/components/transaction-annotation-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Grid3x3, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AssessorPage() {
  const [properties, setProperties] = useState<Property[]>(
    createMockProperties(),
  );
  const [currentView, setCurrentView] = useState("dashboard");
  const [createLotOpen, setCreateLotOpen] = useState(false);
  const [createBlockOpen, setCreateBlockOpen] = useState(false);
  const [subdivideOpen, setSubdivideOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [consolidateDialogOpen, setConsolidateDialogOpen] = useState(false);
  const [annotateDialogOpen, setAnnotateDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateLot = (
    blockNumber: number,
    area: number,
    owner: string,
  ) => {
    const lotNumber = getNextLotNumber(properties, blockNumber);
    const pin = generatePIN(
      MASINLOC_CONFIG.provinceCode,
      MASINLOC_CONFIG.townCode,
      blockNumber,
      lotNumber,
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
      lotNumber,
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
    subdivisions: { area: number; owner: string }[],
  ) => {
    const updatedProperties = properties.map((p) =>
      p.id === property.id ? { ...p, status: "Subdivided" as const } : p,
    );

    const newProperties = subdivisions.map((sub, index) => {
      const lotNumber = getNextLotNumber(
        updatedProperties,
        property.blockNumber,
      );
      const pin = generatePIN(
        MASINLOC_CONFIG.provinceCode,
        MASINLOC_CONFIG.townCode,
        property.blockNumber,
        lotNumber + index,
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

  const handleTransfer = (data: TransferData) => {
    if (selectedProperty) {
      const updated = {
        ...selectedProperty,
        owner: data.newOwnerName,
        history: [
          ...(selectedProperty.history || []),
          {
            type: "Transfer" as const,
            date: new Date(data.transferDate),
            description: `Ownership transferred from ${selectedProperty.owner} to ${data.newOwnerName}`,
            referenceDocument: data.referenceDocument,
          },
        ],
      };
      setProperties((prev) =>
        prev.map((p) => (p.id === selectedProperty.id ? updated : p)),
      );
      setSelectedProperty(updated);
      toast({
        title: "Transfer Recorded",
        description: `Property ownership transferred to ${data.newOwnerName}`,
      });
    }
  };

  const handleCancel = (data: CancelData) => {
    if (selectedProperty) {
      const updated = {
        ...selectedProperty,
        status: "Inactive" as const,
        history: [
          ...(selectedProperty.history || []),
          {
            type: "TD_Cancellation" as const,
            date: new Date(data.cancellationDate),
            description: data.reason,
            referenceDocument: data.referenceDocument,
          },
        ],
      };
      setProperties((prev) =>
        prev.map((p) => (p.id === selectedProperty.id ? updated : p)),
      );
      setSelectedProperty(updated);
      toast({
        title: "Cancellation Recorded",
        description: `Title deed cancelled. Property marked as inactive.`,
      });
    }
  };

  const handleConsolidate = (data: ConsolidateData) => {
    if (selectedProperty) {
      const updated = {
        ...selectedProperty,
        history: [
          ...(selectedProperty.history || []),
          {
            type: "Consolidation" as const,
            date: new Date(data.consolidationDate),
            description: `Consolidated with ${data.selectedLots.length} lot(s)`,
            referenceDocument: data.referenceDocument,
            relatedPin: data.selectedLots[0],
          },
        ],
      };
      setProperties((prev) =>
        prev.map((p) => (p.id === selectedProperty.id ? updated : p)),
      );
      setSelectedProperty(updated);
      toast({
        title: "Consolidation Recorded",
        description: `Property consolidated with ${data.selectedLots.length} lot(s)`,
      });
    }
  };

  const handleAnnotate = (data: AnnotationData) => {
    if (selectedProperty) {
      const updated = {
        ...selectedProperty,
        history: [
          ...(selectedProperty.history || []),
          {
            type: "Annotation" as const,
            date: new Date(data.annotationDate),
            description: `${data.annotationType}: ${data.content}`,
            referenceDocument: data.referenceDocument,
          },
        ],
      };
      setProperties((prev) =>
        prev.map((p) => (p.id === selectedProperty.id ? updated : p)),
      );
      setSelectedProperty(updated);
      toast({
        title: "Annotation Added",
        description: `New annotation recorded for property`,
      });
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <DashboardView
            properties={properties}
            onCreateLot={() => setCreateLotOpen(true)}
            onCreateBlock={() => setCreateBlockOpen(true)}
            onNavigate={setCurrentView}
          />
        );
      case "properties":
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Property Registry</CardTitle>
                  <CardDescription>
                    Manage Property Index Numbers (PIN) according to Philippine
                    standards (PPP-TT-BBBB-BBB-LLL)
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setCreateLotOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lot
                  </Button>
                  <Button
                    onClick={() => setCreateBlockOpen(true)}
                    variant="secondary"
                  >
                    <Grid3x3 className="h-4 w-4 mr-2" />
                    Add Block
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <PropertyTable
                properties={properties}
                onSubdivide={handleSubdivideClick}
                onView={(prop) => {
                  setSelectedProperty(prop);
                  setCurrentView("property-detail");
                }}
              />
            </CardContent>
          </Card>
        );
      case "search":
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-blue-600" />
                <CardTitle>Search Properties</CardTitle>
              </div>
              <CardDescription>
                Find properties using PIN, owner name, or other details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyTable
                properties={properties}
                onSubdivide={handleSubdivideClick}
                onView={(prop) => {
                  setSelectedProperty(prop);
                  setCurrentView("property-detail");
                }}
                searchMode={true}
              />
            </CardContent>
          </Card>
        );
      case "property-detail":
        return selectedProperty ? (
          <PropertyDetailView
            property={selectedProperty}
            onTransfer={() => setTransferDialogOpen(true)}
            onCancel={() => setCancelDialogOpen(true)}
            onConsolidate={() => setConsolidateDialogOpen(true)}
            onAnnotate={() => setAnnotateDialogOpen(true)}
          />
        ) : null;
      case "reports":
        return <ReportsView />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              This section is under development. Return to dashboard.
            </p>
            <Button
              onClick={() => setCurrentView("dashboard")}
              className="mt-4"
            >
              Back to Dashboard
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      <main className="container mx-auto px-4 py-8">{renderCurrentView()}</main>

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

      {selectedProperty && (
        <>
          <TransactionTransferDialog
            open={transferDialogOpen}
            onOpenChange={setTransferDialogOpen}
            propertyPin={selectedProperty.pin}
            currentOwner={selectedProperty.owner}
            onConfirm={handleTransfer}
          />

          <TransactionCancelDialog
            open={cancelDialogOpen}
            onOpenChange={setCancelDialogOpen}
            propertyPin={selectedProperty.pin}
            owner={selectedProperty.owner}
            onConfirm={handleCancel}
          />

          <TransactionConsolidateDialog
            open={consolidateDialogOpen}
            onOpenChange={setConsolidateDialogOpen}
            propertyPin={selectedProperty.pin}
            blockNumber={selectedProperty.blockNumber}
            lotNumber={selectedProperty.lotNumber}
            onConfirm={handleConsolidate}
          />

          <TransactionAnnotationDialog
            open={annotateDialogOpen}
            onOpenChange={setAnnotateDialogOpen}
            propertyPin={selectedProperty.pin}
            onConfirm={handleAnnotate}
          />
        </>
      )}
    </div>
  );
}

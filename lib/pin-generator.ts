// Philippine Property Index Number (PIN) Generator
// Format: PPP-TT-BBBB-BBB-LLL
// PPP = Province Code (3 digits)
// TT = Town/City Code (2 digits)
// BBBB-BBB = Block Number (7 digits, zero-padded)
// LLL = Lot Number (3 digits, zero-padded)

export interface Property {
  id: string;
  pin: string;
  province: string;
  provinceCode: string;
  town: string;
  townCode: string;
  blockNumber: number;
  lotNumber: number;
  area: number;
  owner: string;
  status: "Active" | "Subdivided" | "Consolidated" | "Inactive";
  parentPin?: string;
  previousTD?: string;
  classification?: string;
  marketValue?: number;
  assessedValue?: number;
  taxDeclaration?: string;
  createdAt: Date;
  // Technical & Geospatial Fields (NEW)
  boundaries?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  barangay?: string;
  areaClassification?:
    | "Agricultural"
    | "Residential"
    | "Commercial"
    | "Industrial";
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  mapData?: string;
  // Transaction History (NEW)
  history?: Array<{
    type:
      | "TD_Creation"
      | "TD_Cancellation"
      | "Consolidation"
      | "Annotation"
      | "Transfer"
      | "Annotation_Cancellation";
    date: Date;
    description: string;
    referenceDocument?: string;
    relatedPin?: string;
  }>;
}

export const MAX_LOTS_PER_BLOCK = 500;

export function generatePIN(
  provinceCode: string,
  townCode: string,
  blockNumber: number,
  lotNumber: number,
): string {
  const block = blockNumber.toString().padStart(7, "0");
  const lot = lotNumber.toString().padStart(3, "0");
  return `${provinceCode}-${townCode}-${block.slice(0, 4)}-${block.slice(4)}-${lot}`;
}

export function parsePIN(pin: string): {
  provinceCode: string;
  townCode: string;
  blockNumber: number;
  lotNumber: number;
} {
  const parts = pin.split("-");
  return {
    provinceCode: parts[0],
    townCode: parts[1],
    blockNumber: Number.parseInt(parts[2] + parts[3]),
    lotNumber: Number.parseInt(parts[4]),
  };
}

export function getNextBlockNumber(properties: Property[]): number {
  if (properties.length === 0) return 1;
  const maxBlock = Math.max(...properties.map((p) => p.blockNumber));
  return maxBlock + 1;
}

export function getNextLotNumber(
  properties: Property[],
  blockNumber: number,
): number {
  const lotsInBlock = properties.filter(
    (p) => p.blockNumber === blockNumber && p.status === "Active",
  );
  if (lotsInBlock.length === 0) return 1;
  const maxLot = Math.max(...lotsInBlock.map((p) => p.lotNumber));
  return maxLot + 1;
}

export function canAddLotToBlock(
  properties: Property[],
  blockNumber: number,
): boolean {
  const lotsInBlock = properties.filter(
    (p) => p.blockNumber === blockNumber && p.status === "Active",
  );
  return lotsInBlock.length < MAX_LOTS_PER_BLOCK;
}

import { type Property, generatePIN } from "./pin-generator";

// Masinloc, Zambales
// Province Code: 071 (Zambales)
// Town Code: 18 (Masinloc)

export const MASINLOC_CONFIG = {
  province: "Zambales",
  provinceCode: "016",
  town: "Masinloc",
  townCode: "06",
};

export function createMockProperties(): Property[] {
  const properties: Property[] = [];

  // Block 1 - 5 lots
  for (let i = 1; i <= 5; i++) {
    properties.push({
      id: `prop-1-${i}`,
      pin: generatePIN(
        MASINLOC_CONFIG.provinceCode,
        MASINLOC_CONFIG.townCode,
        1,
        i,
      ),
      province: "Zambales",
      provinceCode: MASINLOC_CONFIG.provinceCode,
      town: "Masinloc",
      townCode: MASINLOC_CONFIG.townCode,
      blockNumber: 1,
      lotNumber: i,
      area: Math.floor(Math.random() * 500) + 200,
      owner: `Owner ${i}`,
      status: "Active",
      createdAt: new Date(2024, 0, i),
    });
  }

  // Block 2 - 8 lots
  for (let i = 1; i <= 8; i++) {
    properties.push({
      id: `prop-2-${i}`,
      pin: generatePIN(
        MASINLOC_CONFIG.provinceCode,
        MASINLOC_CONFIG.townCode,
        2,
        i,
      ),
      province: "Zambales",
      provinceCode: MASINLOC_CONFIG.provinceCode,
      town: "Masinloc",
      townCode: MASINLOC_CONFIG.townCode,
      blockNumber: 2,
      lotNumber: i,
      area: Math.floor(Math.random() * 400) + 150,
      owner: `Owner ${i + 5}`,
      status: "Active",
      createdAt: new Date(2024, 1, i),
    });
  }

  // Block 3 - 3 lots
  for (let i = 1; i <= 3; i++) {
    properties.push({
      id: `prop-3-${i}`,
      pin: generatePIN(
        MASINLOC_CONFIG.provinceCode,
        MASINLOC_CONFIG.townCode,
        2,
        i,
      ),
      province: "Zambales",
      provinceCode: MASINLOC_CONFIG.provinceCode,
      town: "Masinloc",
      townCode: MASINLOC_CONFIG.townCode,
      blockNumber: 3,
      lotNumber: i,
      area: Math.floor(Math.random() * 600) + 300,
      owner: `Owner ${i + 13}`,
      status: "Active",
      createdAt: new Date(2024, 2, i),
    });
  }

  // Rich Property #1: Consolidation History Example
  const consolidationPin = generatePIN(
    MASINLOC_CONFIG.provinceCode,
    MASINLOC_CONFIG.townCode,
    4,
    1,
  );
  properties.push({
    id: "prop-consolidation-example",
    pin: consolidationPin,
    province: "Zambales",
    provinceCode: MASINLOC_CONFIG.provinceCode,
    town: "Masinloc",
    townCode: MASINLOC_CONFIG.townCode,
    blockNumber: 4,
    lotNumber: 1,
    area: 1200,
    owner: "Maria Santos",
    status: "Active",
    createdAt: new Date(2023, 5, 15),
    boundaries: {
      north: 500,
      south: 480,
      east: 450,
      west: 430,
    },
    barangay: "Palimbilan",
    areaClassification: "Agricultural",
    coordinates: {
      latitude: 15.8234,
      longitude: 120.3567,
    },
    mapData: "Settlement area with rice paddies",
    history: [
      {
        type: "TD_Creation",
        date: new Date(2023, 5, 15),
        description: "Original title deed created for lot 4-1",
        referenceDocument: "TD-071-06-004-00001",
      },
      {
        type: "Transfer",
        date: new Date(2023, 8, 20),
        description:
          "Ownership transferred from Juan Dela Cruz to Maria Santos",
        referenceDocument: "Transfer-Doc-2023-001",
      },
      {
        type: "Annotation",
        date: new Date(2023, 10, 5),
        description:
          "Annotation: Property used as collateral for agricultural loan",
        referenceDocument: "Loan-Annotation-2023",
      },
      {
        type: "Consolidation",
        date: new Date(2024, 0, 18),
        description: "Consolidated with lot 4-2 to form single larger property",
        referenceDocument: "Consolidation-Doc-2024-001",
        relatedPin: "071-06-004-00002",
      },
      {
        type: "Annotation",
        date: new Date(2024, 1, 10),
        description:
          "Annotation: Irrigation easement approved for neighbor property",
        referenceDocument: "Easement-2024",
      },
    ],
  });

  // Rich Property #2: Transfer & Full Geospatial Example
  const transferPin = generatePIN(
    MASINLOC_CONFIG.provinceCode,
    MASINLOC_CONFIG.townCode,
    5,
    1,
  );
  properties.push({
    id: "prop-transfer-example",
    pin: transferPin,
    province: "Zambales",
    provinceCode: MASINLOC_CONFIG.provinceCode,
    town: "Masinloc",
    townCode: MASINLOC_CONFIG.townCode,
    blockNumber: 5,
    lotNumber: 1,
    area: 850,
    owner: "Roberto Mercado",
    status: "Active",
    createdAt: new Date(2022, 11, 10),
    boundaries: {
      north: 620,
      south: 605,
      east: 540,
      west: 515,
    },
    barangay: "Cabilian",
    areaClassification: "Residential",
    coordinates: {
      latitude: 15.8567,
      longitude: 120.3234,
    },
    mapData:
      "Residential development zone near town center, accessible via Marcos Highway",
    history: [
      {
        type: "TD_Creation",
        date: new Date(2022, 11, 10),
        description: "Original title deed created for residential lot 5-1",
        referenceDocument: "TD-071-06-005-00001",
      },
      {
        type: "Annotation",
        date: new Date(2023, 2, 8),
        description:
          "Annotation: Community easement for water line maintenance",
        referenceDocument: "Easement-Water-2023",
      },
      {
        type: "Transfer",
        date: new Date(2023, 7, 25),
        description:
          "Ownership transferred from Ernesto Pacot to Roberto Mercado",
        referenceDocument: "Transfer-Doc-2023-045",
      },
      {
        type: "Annotation_Cancellation",
        date: new Date(2023, 9, 12),
        description:
          "Community easement annotation cancelled (relocated water line)",
        referenceDocument: "Easement-Cancel-2023",
      },
      {
        type: "Annotation",
        date: new Date(2024, 2, 20),
        description:
          "Annotation: Building permit issued for residential construction",
        referenceDocument: "Permit-2024-BLD-0445",
      },
    ],
  });

  return properties;
}

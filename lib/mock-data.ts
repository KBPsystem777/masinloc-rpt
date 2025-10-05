import { type Property, generatePIN } from "./pin-generator"

// Masinloc, Zambales
// Province Code: 071 (Zambales)
// Town Code: 18 (Masinloc)

export const MASINLOC_CONFIG = {
  province: "Zambales",
  provinceCode: "016",
  town: "Masinloc",
  townCode: "06",
}

export function createMockProperties(): Property[] {
  const properties: Property[] = []

  // Block 1 - 5 lots
  for (let i = 1; i <= 5; i++) {
    properties.push({
      id: `prop-1-${i}`,
      pin: generatePIN(MASINLOC_CONFIG.provinceCode, MASINLOC_CONFIG.townCode, 1, i),
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
    })
  }

  // Block 2 - 8 lots
  for (let i = 1; i <= 8; i++) {
    properties.push({
      id: `prop-2-${i}`,
      pin: generatePIN(MASINLOC_CONFIG.provinceCode, MASINLOC_CONFIG.townCode, 2, i),
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
    })
  }

  // Block 3 - 3 lots
  for (let i = 1; i <= 3; i++) {
    properties.push({
      id: `prop-3-${i}`,
      pin: generatePIN(MASINLOC_CONFIG.provinceCode, MASINLOC_CONFIG.townCode, 2, i),
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
    })
  }

  return properties
}

# Masinloc LGU - Real Property Tax (RPT) Management System

A prototype Real Property Tax Management System developed for the Local Government Unit (LGU) of Masinloc, Zambales. This application enables assessors to manage Property Index Numbers (PIN), track property records, and generate mandatory LGU reports.

## ⚠️ Prototype Status

This is a **prototype/development version** of the RPT Management System. All data is mock-based, and the system does not represent the real status of actual properties in Masinloc. Features and data structure are subject to change during development.

## 🚀 Features

### Core Capabilities

- **Dashboard**: Overview of key assessment statistics, property summaries, and quick-access commands
- **Property Management**:
  - Generate and manage Property Index Numbers (PIN) following Philippine standards (`PPP-TT-BBBB-BBB-LLL`)
  - View comprehensive property records with technical details, boundaries, and geospatial information
  - Track property history including transfers, consolidations, cancellations, and annotations
  - Support for property subdivision and lot consolidation workflows

- **Property Registry**: Browse all properties with filtering, sorting, and quick-view capabilities
- **Property Details**: Rich property view with:
  - Core information (PIN, owner, location, area)
  - Valuation data (market value, assessed value, tax calculations)
  - Technical specifications (boundaries, barangay, area classification)
  - Geospatial visualization (coordinates, map placeholder)
  - Complete transaction history timeline

- **RPT Transaction Workflows**:
  - Transfer property ownership
  - Cancel/deactivate title deeds
  - Consolidate multiple lots
  - Add annotations and remarks

- **LGU Reporting**:
  - Quarterly assessment reports (QRRPA-compliant)
  - Semestral summaries
  - Monthly monitoring reports
  - Assessment rolls and property inventories

- **User Interface**:
  - Responsive design for mobile, tablet, and desktop
  - Dark/Light theme support
  - Compact, icon-based navigation
  - Contextual help dialogs

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.2.4](https://nextjs.org/) with App Router and React 19
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode enabled)
- **UI Components**:
  - [Radix UI](https://www.radix-ui.com/) (headless component primitives)
  - [shadcn/ui](https://ui.shadcn.com/) (pre-styled Radix components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with dark mode support
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **State Management**: React Hooks (client-side only)
- **Form Validation**: React Hook Form + Zod
- **Package Manager**: pnpm
- **Hosting**: Vercel-ready configuration

## 📋 Project Structure

```
lgu-masinloc/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Main assessor dashboard/property management
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # shadcn/ui wrapped components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ... (20+ more)
│   ├── navigation.tsx           # Top navigation bar
│   ├── dashboard-view.tsx       # Dashboard overview
│   ├── property-table.tsx       # Property list with view/edit
│   ├── property-detail-view.tsx # Rich property detail view
│   ├── reports-view.tsx         # LGU reports section
│   ├── theme-provider.tsx       # Dark/Light theme support
│   ├── help-dialog.tsx          # Contextual help
│   ├── create-block-dialog.tsx  # Block creation modal
│   ├── create-lot-dialog.tsx    # Lot creation modal
│   ├── subdivide-dialog.tsx     # Lot subdivision modal
│   ├── transaction-transfer-dialog.tsx    # Transfer workflow
│   ├── transaction-cancel-dialog.tsx      # Cancellation workflow
│   ├── transaction-consolidate-dialog.tsx # Consolidation workflow
│   └── transaction-annotation-dialog.tsx  # Annotation workflow
├── lib/
│   ├── pin-generator.ts         # Property interface + PIN generation
│   ├── mock-data.ts             # Mock property database
│   └── utils.ts                 # Utility functions
├── hooks/
│   ├── use-mobile.ts            # Mobile viewport detection
│   └── use-toast.ts             # Toast notification hook
├── openspec/
│   ├── AGENTS.md                # OpenSpec guidelines for AI agents
│   ├── project.md               # Project context and conventions
│   └── changes/
│       ├── enhance-rpt-ux-minimal-design/  # First proposal (navigation & detail view)
│       └── refine-rpt-ux-and-reports/      # Second proposal (reports & localization)
├── public/                       # Static assets
├── styles/                       # CSS utilities
├── tsconfig.json                # TypeScript configuration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or later (LTS recommended)
- **pnpm**: v8 or later (recommended for this project)
- **Git**: For version control

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd lgu-masinloc
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 📖 Usage Guide

### Navigation

- **Dashboard**: Overview and key statistics
- **Property Registry**: Browse all properties
- **Reports**: View LGU-mandated assessment reports
- **Settings**: Application preferences and configuration
- **Help**: Context-sensitive documentation

### Creating Properties

1. Go to **Property Registry**
2. Click **Add Lot** or **Add Block**
3. Fill in required details (area, owner)
4. System auto-generates PIN following Philippine standards
5. Property appears in registry immediately

### Viewing Property Details

1. Click the PIN or owner name in the property table
2. View comprehensive property information:
   - Core details (PIN, owner, location)
   - Valuation and tax information
   - Technical specifications (boundaries, classification)
   - Geospatial data (coordinates, maps)
   - Full transaction history
3. Use action buttons to perform RPT transactions

### Processing Transactions

Click any of the 4 action buttons on the property detail view:

- **Transfer Ownership**: Record ownership change with new owner details
- **Cancel Title Deed**: Deactivate a property (requires reason)
- **Consolidate Lots**: Merge multiple lots into one larger property
- **Add Annotation**: Record remarks, easements, or special notes

Each transaction opens a modal with a form → review → confirm flow.

## 🏗️ Architecture & Design Principles

### Core Design Principles

- **DRY (Don't Repeat Yourself)**: Centralized utilities, components, and logic in `/lib`, `/hooks`, and `/components/ui`
- **KISS (Keep It Simple, Stupid)**: Straightforward, readable code prioritizing immediate user needs
- **Reusability**: Modular, flexible components that work across multiple views

### Component Patterns

All components follow these conventions:

- **File Naming**: kebab-case (e.g., `property-detail-view.tsx`)
- **Client Components**: Marked with `"use client"` directive
- **Props Interface**: `ComponentNameProps` interface above component definition
- **Absolute Imports**: Use `@/` path alias from project root
- **TypeScript**: Strict mode enabled project-wide

### State Management

Currently uses React Hooks for client-side state. As the application grows, consider:

- TanStack Query (React Query) for server-state management
- Zustand or Redux for complex global state
- Jotai for atom-based state management

### Theme Support

The application supports light and dark themes via the `ThemeProvider` component. Users can toggle theme in settings without reloading.

## 🧪 Development

### Code Standards

- **Language**: TypeScript with strict compiler options
- **Linting**: ESLint (currently permissive during build)
- **Formatting**: Follow Next.js conventions
- **Commits**: Use conventional commit messages

### Running Tests

Currently, no automated tests are configured. When adding tests, use:

- **Unit Tests**: Vitest
- **Component Tests**: Testing Library + Vitest
- **E2E Tests**: Playwright or Cypress

### Adding New Features

1. Create a feature branch
2. Follow the DRY/KISS/Reusability principles
3. Add components to `/components` or `/components/ui`
4. Add utilities to `/lib`
5. Update TypeScript types as needed
6. Test across mobile and desktop viewports
7. Submit a pull request with description

## 📊 Mock Data

The application uses completely mock data stored in `lib/mock-data.ts`:

- 16 default properties across 5 blocks
- 2 rich properties with 5+ transaction history events each
- Property types include residential, agricultural, and commercial
- All data is client-side (no backend API)

To add more properties, edit `createMockProperties()` in `lib/mock-data.ts`.

## 🌍 Localization

- **Current Language**: English (fully localized)
- **UI Text**: All labels, buttons, placeholders in English
- **Domain Terms**: Property-related terms follow Philippine RPT standards
- **Date Format**: Uses `date-fns` for locale-aware formatting

## 🔐 Security & Privacy

- **No Authentication**: Currently unprotected (prototype only)
- **No Data Persistence**: All data is client-side mock data
- **No External APIs**: Self-contained application
- **Browser Storage**: No sensitive data stored in localStorage

Before production:

1. Add authentication (Firebase, Auth0, or custom)
2. Implement backend API with database
3. Add role-based access control (RBAC)
4. Encrypt sensitive data in transit and at rest
5. Implement audit logging for transactions

## 📄 Licensing & Attribution

- **Project**: Masinloc LGU RPT Management System
- **Developed**: BPxAI (Prototype)
- **Year**: 2026
- **Purpose**: Local Government Unit Property Tax Management

## 🤝 Contributing

This is a prototype project for LGU Masinloc. Contributions should follow:

1. The project conventions documented in `openspec/project.md`
2. Existing component patterns and file structure
3. TypeScript strict mode compliance
4. Responsive design (mobile-first approach)
5. English language for all UI text and code comments

## 📞 Support

For questions or issues:

1. Check the **Help** dialog in the application (? icon in navigation)
2. Review code comments and inline documentation
3. Consult `openspec/project.md` for architectural decisions
4. Examine similar components for pattern examples

## 📝 License

© 2026 BPxAI for Masinloc LGU - Real Property Tax Management System

This is a **prototype/development version** and should not be used for official LGU operations without proper testing and approval.

---

### Work Log

#### January 18, 2026 - Proposal Completion & Documentation Enhancement

**Status**: ✅ All 26 Tasks Completed

**Completed Proposals**:

1. **enhance-rpt-ux-minimal-design** (17 tasks - 100% complete)
   - Property interface extended with technical & historical fields (boundaries, barangay, coordinates, area classification)
   - Rich mock properties created with multi-event histories (consolidations, transfers, cancellations)
   - Navigation refactored with compact mobile/desktop layouts and tooltips
   - PropertyDetailView component with 6-section layout: Core Info, Valuation, Technical Info, Geospatial, History Timeline, Actions
   - 4 transaction modals implemented: Transfer, Cancel, Consolidate, Annotate
   - Full localization audit completed (zero Tagalog terms in UI)

2. **refine-rpt-ux-and-reports** (9 tasks - 100% complete)
   - **openspec/project.md** enhanced with explicit DRY, KISS, and Reusability principle definitions
   - **README.md** comprehensively rewritten (~300 lines) with project structure, usage guide, architecture patterns, tech stack details, security considerations
   - UI localized to 100% English (grep verified across app/, components/, lib/)
   - PrototypeBanner component integrated in layout with dismissible alert
   - PropertyDetailView with historical data section and transaction history timeline
   - ReportsView with tabbed interface (Monthly, Quarterly, Semestral) including export and assessment rolls
   - All views integrated into main routing (app/page.tsx) with proper state management
   - PropertyTable view trigger working (onView callback properly wired)
   - Final validation: TypeScript zero errors, production build successful (173 kB First Load JS)

**Quality Assurance**:

- ✅ TypeScript compilation: Zero errors (strict mode)
- ✅ Production build: Successful with 4 static pages generated
- ✅ Localization audit: Zero Tagalog terms found
- ✅ Component integration: All views routed and functional

**Documentation Improvements**:

- Enhanced project.md with clearer architectural guidance
- Created comprehensive README with onboarding content for new developers
- Updated task checklists in both proposals to mark all items complete [x]
- Git staged all changes with commit message ready

**Next Phase**: Backend API integration and database implementation

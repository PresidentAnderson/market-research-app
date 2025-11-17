# Market Research App

A cross-project standard for generating accurate, defensible, source-backed insights across the PVT Ecosystem.

## Overview

This application implements the **PVT Ecosystem Market Research Protocol** - a standardized 19-step methodology for conducting rigorous market research across all ventures (Aurora, WisdomOS, PVT Hostel, LexChronos, etc.).

### Key Features

- **19-Step Research Methodology** - Structured workflow from research objectives to documentation
- **Source Evidence Log** - Track all research sources with confidence ratings and key figures
- **Multi-Project Support** - Manage research across multiple ventures
- **Progress Tracking** - Real-time status updates and completion metrics
- **Triangulation & Validation** - Cross-validate findings across multiple sources

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL via Supabase
- **Styling:** Tailwind CSS
- **State Management:** React Server Components + Server Actions
- **Deployment:** Vercel (recommended)

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- Git

### Installation

1. **Clone and navigate:**
   ```bash
   cd "/Volumes/DevOPS 2026/Market Research/market-research-app"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run database migrations:**

   In your Supabase dashboard, go to SQL Editor and run:
   ```bash
   cat supabase/migrations/001_initial_schema.sql
   ```

   Or using Supabase CLI:
   ```bash
   supabase db push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
market-research-app/
├── app/
│   ├── actions.ts                    # Server actions for data mutations
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page (project list)
│   ├── globals.css                   # Global styles
│   └── research-runs/
│       └── [id]/
│           ├── page.tsx              # Research run detail page
│           ├── ResearchStepsList.tsx # 19-step checklist component
│           └── SourcesPanel.tsx      # Sources table + add form
├── lib/
│   ├── marketResearchSteps.ts        # 19-step definitions
│   ├── types.ts                      # TypeScript types
│   ├── utils.ts                      # Utility functions
│   └── supabase/
│       ├── client.ts                 # Client-side Supabase client
│       └── server.ts                 # Server-side Supabase client
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql    # Database schema
├── components/                        # Shared UI components (future)
├── DATABASE_SCHEMA.md                 # Database documentation
├── package.json
└── README.md
```

## Usage

### Creating a Project

1. Navigate to the home page
2. Click "New Project"
3. Enter project name (e.g., "Aurora", "WisdomOS")
4. Add description

### Starting a Research Run

1. Open a project
2. Click "New Research Run"
3. Enter run label (e.g., "MR-2025-Q1")
4. Set start date
5. The system automatically creates 19 research steps

### Working Through the 19 Steps

Each research run follows the standard methodology:

1. **Define Decision Context & Research Objectives**
2. **Define Market Definition & Boundaries**
3. **Draft Initial Hypotheses & Key Metrics**
4. **Build Source Map (Databases, Reports, Competitors)**
5. **Secondary Research – Market Size & Growth**
6. **Secondary Research – Competitors & Benchmarks**
7. **Ethics, Compliance & Data Privacy**
8. **Research Design – Primary Methods & Sampling**
9. **Instrument Design (Surveys, Guides, Screens)**
10. **Pilot & Refine Research Instruments**
11. **Fieldwork – Qualitative (Interviews, Groups)**
12. **Fieldwork – Quantitative (Surveys, Panels)**
13. **Data Validation, Cleaning & Coding**
14. **TAM / SAM / SOM & Segmentation Modeling**
15. **Pricing & Revenue Modeling**
16. **Triangulation & Sensitivity Analysis**
17. **Insights Synthesis, Story & Narrative**
18. **Strategic Recommendations & Implementation Implications**
19. **Documentation, Source Log & Knowledge Base Update**

### Adding Sources

For each step, you can attach sources:

1. Expand a research step
2. Click "Add Source"
3. Fill in metadata:
   - Title (required)
   - URL
   - Source type (industry report, academic, competitor, etc.)
   - Confidence level (high, medium, low)
   - Key figures
   - Publisher, year, geography

4. Submit - the source appears in the right panel

### Tracking Progress

- **Status Pills:** Click to change step status (Not Started → In Progress → Done → Blocked)
- **Progress Bar:** Visual completion percentage
- **Source Count:** See how many sources are attached to each step

## The 19-Step Methodology

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for full details on the data model.

The methodology is defined in `lib/marketResearchSteps.ts`. Each step includes:
- **Order:** Sequential number (1-19)
- **Title:** Step name
- **Notes:** Detailed guidance on what to do and what outputs to produce

## Database Schema

The app uses 4 main tables:

1. **projects** - Top-level ventures (Aurora, WisdomOS, etc.)
2. **research_runs** - Individual research cycles
3. **research_steps** - The 19 methodology steps
4. **sources** - Evidence log with all research sources

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for complete schema documentation, including:
- Entity relationships
- Column definitions
- Indexes
- Common queries
- Migration instructions

## Key Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint

# Database (using Supabase CLI)
supabase init        # Initialize Supabase project
supabase db push     # Apply migrations
supabase db reset    # Reset local database
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Self-Hosted

```bash
npm run build
npm start
```

Set environment variables on your host.

## Development Workflow

### Adding a New Feature

1. Create feature branch
2. Implement changes (components, actions, types)
3. Update types in `lib/types.ts` if needed
4. If database changes are required:
   - Create migration in `supabase/migrations/`
   - Update `DATABASE_SCHEMA.md`
5. Test locally
6. Submit PR

### Modifying the 19-Step Methodology

If you need to adjust the steps:

1. Edit `lib/marketResearchSteps.ts`
2. Update any UI components that reference steps
3. Consider backward compatibility with existing runs

**Note:** Existing research runs won't automatically update. You may need a data migration.

## Integration with PVT Ecosystem

This app serves as the **market intelligence backbone** for:

- **Aurora** - OTA market sizing and competitive analysis
- **WisdomOS** - Self-improvement market segmentation
- **PVT Hostel** - Local market demand modeling
- **LexChronos** - Legal-tech TAM/SAM/SOM
- **Atlas Inventory** - Enterprise SaaS pricing research
- **StudioNYNE** - Music production market insights

All research outputs feed into the **Master Brief** and can be referenced in investor decks, product roadmaps, and strategic planning.

## Best Practices

1. **Source Everything** - Every claim must have a logged source
2. **Use Confidence Ratings** - Be honest about source quality
3. **Triangulate** - Cross-validate key figures across 3+ sources
4. **Document Assumptions** - Capture all modeling assumptions
5. **Version Research** - Use research run labels for versioning (Q1-2025, Q2-2025, etc.)

## Troubleshooting

### Database Connection Issues

- Verify Supabase credentials in `.env.local`
- Check Supabase project status
- Ensure RLS policies are configured

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node -v` (should be 18+)

### Type Errors

- Run `npm run lint` to see all TypeScript errors
- Ensure `lib/types.ts` is up to date with database schema

## Contributing

This is an internal PVT Ecosystem tool. For questions or issues, contact the development team.

## License

Proprietary - PVT Ecosystem / Axai Innovation

---

**Built with precision for the PVT Ecosystem** ✨

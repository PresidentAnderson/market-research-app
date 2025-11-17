# Quick Start Guide

Get the Market Research App running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

## Setup Steps

### 1. Install Dependencies (1 min)

```bash
cd "/Volumes/DevOPS 2026/Market Research/market-research-app"
npm install
```

### 2. Set Up Supabase Database (2 min)

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose organization, enter project name, database password
4. Wait for project to initialize (~30 seconds)
5. Go to **SQL Editor** in left sidebar
6. Click "New Query"
7. Copy-paste entire contents of `supabase/migrations/001_initial_schema.sql`
8. Click "Run" or press Cmd+Enter
9. Verify success message

### 3. Configure Environment Variables (1 min)

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key
3. In your terminal:

```bash
cp .env.example .env.local
```

4. Edit `.env.local` and paste your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Start Development Server (30 sec)

```bash
npm run dev
```

### 5. Open in Browser (instant)

Navigate to: **http://localhost:3000**

You should see the Market Research App home page!

---

## First Steps in the App

### Create Your First Project

1. Click "New Project" card
2. Enter name: "Aurora" (or your project name)
3. Add description: "AI-native OTA alternative"
4. Click "Create"

### Start a Research Run

1. Click on your project
2. Click "New Research Run"
3. Enter label: "MR-2025-Q1"
4. Set start date: Today's date
5. Click "Create Run"

The app will automatically generate all 19 research steps!

### Work Through Steps

1. Click on "Research Run" to open the war room
2. Expand a step to read guidance
3. Change status dropdown: Not Started → In Progress
4. Click "Add Source" to log evidence
5. Fill in source metadata and click "Create Source"
6. Watch the source appear in the right panel
7. Mark step as "Done" when complete

---

## Verify Everything Works

### Test Checklist

- [ ] Home page loads
- [ ] Can create a project
- [ ] Can create a research run
- [ ] Research run shows 19 steps
- [ ] Can expand/collapse steps
- [ ] Can change step status
- [ ] Can add a source
- [ ] Source appears in right panel
- [ ] Can filter sources by step
- [ ] Progress bar updates

If all checked, you're good to go!

---

## Common Issues

### "Cannot connect to database"
- Check `.env.local` has correct Supabase URL and key
- Verify Supabase project is active (not paused)
- Check internet connection

### "Table does not exist"
- Make sure you ran the SQL migration in Supabase
- Check for errors in SQL Editor
- Verify all 4 tables were created (projects, research_runs, research_steps, sources)

### Build errors
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

---

## Next Steps

1. **Read the README** - Full documentation in `README.md`
2. **Review the Schema** - Database details in `DATABASE_SCHEMA.md`
3. **Understand Architecture** - Component breakdown in `CLAUDE.md`
4. **Explore the Code** - Start with `app/research-runs/[id]/page.tsx`

---

## Deploy to Production

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repo
5. Add environment variables (same as `.env.local`)
6. Click "Deploy"
7. Done! You'll get a live URL

### Option 2: Self-Host

```bash
npm run build
npm start
```

Set environment variables on your server.

---

**Ready to conduct world-class market research!** 🚀

For questions, see `README.md` or `CLAUDE.md`.

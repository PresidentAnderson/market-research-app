# Using Existing Supabase Project (CTO Dashboard)

**Yes!** You can absolutely use your existing CTO Dashboard Supabase project for the Market Research App.

---

## Benefits of Sharing a Supabase Project

✅ **No additional cost** - Stay within free tier limits
✅ **Centralized data** - All PVT ecosystem data in one place
✅ **Easier management** - One database to maintain
✅ **Cross-project queries** - Could link market research to other projects later

---

## How to Add Tables to Your Existing Project

### Step 1: Access Your CTO Dashboard Supabase Project

1. Go to https://supabase.com
2. Sign in to your account
3. Select your **CTO Dashboard** project (or whatever it's named)
4. You should see your existing tables in the sidebar

### Step 2: Run the Migration SQL

1. Click **SQL Editor** in the left sidebar
2. Click **+ New Query**
3. Copy the entire contents of:
   ```
   /Volumes/DevOPS 2026/Market Research/market-research-app/supabase/migrations/001_initial_schema.sql
   ```
4. Paste into the SQL Editor
5. Click **Run** or press Cmd+Enter
6. You should see "Success. No rows returned"

This will add **4 new tables** to your existing database:
- `projects`
- `research_runs`
- `research_steps`
- `sources`

### Step 3: Verify Tables Were Created

1. In Supabase dashboard, click **Table Editor** (left sidebar)
2. You should now see your existing tables PLUS the 4 new ones:
   - ✅ `projects`
   - ✅ `research_runs`
   - ✅ `research_steps`
   - ✅ `sources`

### Step 4: Get Your Supabase Credentials

Since you're using an existing project, you already have these credentials:

1. Go to **Settings** → **API** (left sidebar)
2. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (the long JWT token)

### Step 5: Add Environment Variables to Vercel

Now configure the Market Research App to use your CTO Dashboard database:

**Option A: Vercel Dashboard**

1. Go to: https://vercel.com/axaiinovation/market-research-app/settings/environment-variables
2. Add two variables:

   **Variable 1:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase Project URL (from CTO Dashboard project)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Your Supabase anon key (from CTO Dashboard project)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

3. Click **Save**

**Option B: Vercel CLI**

```bash
cd "/Volumes/DevOPS 2026/Market Research/market-research-app"

# Add to all environments
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste your URL

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste your key

# Repeat for preview and development
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview

vercel env add NEXT_PUBLIC_SUPABASE_URL development
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development
```

### Step 6: Redeploy the App

```bash
cd "/Volumes/DevOPS 2026/Market Research/market-research-app"
vercel --prod
```

Or in Vercel dashboard:
1. Go to: https://vercel.com/axaiinovation/market-research-app
2. Click **Redeploy** on the latest deployment
3. Wait ~40 seconds for build

### Step 7: Test It!

Visit: https://market-research-app-lilac.vercel.app

You should now see:
- ✅ The Market Research Protocol home page (not the error page!)
- ✅ "New Project" card ready to click
- ✅ No database errors

---

## Understanding the Shared Database

### Your Database Now Contains:

**CTO Dashboard Tables** (existing):
- Whatever tables you already had
- User management, settings, etc.

**Market Research App Tables** (new):
- `projects` - Market research projects (Aurora, WisdomOS, etc.)
- `research_runs` - Individual research cycles
- `research_steps` - The 19-step methodology
- `sources` - Evidence log with citations

### They Won't Conflict Because:

1. **Different table names** - No overlap
2. **Separate data models** - Independent schemas
3. **UUID primary keys** - No ID conflicts
4. **Row Level Security** - Each app can have its own policies

### Future Integration Possibilities:

Since both apps share the same database, you could:
- Link market research projects to CTO dashboard projects
- Reference research data in reports
- Build cross-app analytics
- Share user authentication (add Supabase Auth later)

---

## Important: Database Size Considerations

### Supabase Free Tier Limits:
- **Database size:** 500 MB
- **Bandwidth:** 2 GB/month
- **File storage:** 1 GB

### Estimated Usage for Market Research App:
- **4 tables:** ~1 KB per table structure
- **Data per research run:** ~50-100 KB (19 steps + sources)
- **10 research runs:** ~1 MB total
- **100 research runs:** ~10 MB total

**Verdict:** ✅ Plenty of room! The Market Research App is very lightweight.

---

## Rollback Plan (If Needed)

If you want to remove the Market Research tables later:

```sql
-- WARNING: This deletes all market research data!
DROP TABLE IF EXISTS sources CASCADE;
DROP TABLE IF EXISTS research_steps CASCADE;
DROP TABLE IF EXISTS research_runs CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
```

But you probably won't need to - they coexist peacefully with your other tables.

---

## Security: Updating RLS Policies

Since you're sharing a database, you might want to ensure proper Row Level Security:

### Current Setup (Default):
```sql
-- All tables allow all operations
-- Fine for development, should tighten for production
```

### Recommended for Production:

```sql
-- Example: Only authenticated users can access market research data
DROP POLICY IF EXISTS "Allow all for authenticated users" ON projects;

CREATE POLICY "Authenticated users can read projects" ON projects
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update projects" ON projects
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Repeat for research_runs, research_steps, sources
```

You can set this up later when you add authentication.

---

## Quick Reference: SQL Migration File

The migration adds these exact tables:

```
projects
├── id (uuid, primary key)
├── name (text, required)
├── description (text)
├── created_at (timestamptz)
└── updated_at (timestamptz)

research_runs
├── id (uuid, primary key)
├── project_id (uuid, foreign key → projects)
├── label (text, required)
├── description (text)
├── start_date (date)
├── end_date (date)
├── created_at (timestamptz)
└── updated_at (timestamptz)

research_steps
├── id (uuid, primary key)
├── research_run_id (uuid, foreign key → research_runs)
├── order_index (integer, 1-19)
├── title (text, required)
├── notes (text, required)
├── status (text: not_started | in_progress | done | blocked)
├── due_date (date)
├── created_at (timestamptz)
└── updated_at (timestamptz)

sources
├── id (uuid, primary key)
├── research_run_id (uuid, foreign key → research_runs)
├── research_step_id (uuid, foreign key → research_steps)
├── project_id (uuid, foreign key → projects)
├── title (text, required)
├── url (text)
├── source_type (text: industry_report | academic | government | etc.)
├── publisher (text)
├── year (integer)
├── geography (text)
├── metric_category (text: market_size | growth_rate | pricing | etc.)
├── confidence (text: high | medium | low)
├── key_figures (text)
├── usage_notes (text)
├── methodology (text)
├── limitations (text)
├── date_accessed (date)
├── created_at (timestamptz)
└── updated_at (timestamptz)
```

All tables have auto-updating `updated_at` triggers.

---

## Summary

**Yes, use your CTO Dashboard Supabase project!**

1. ✅ Run the SQL migration to add 4 tables
2. ✅ Use the same Supabase URL and anon key
3. ✅ Add environment variables to Vercel
4. ✅ Redeploy
5. ✅ Done!

The tables will coexist peacefully with your existing CTO Dashboard data.

**Time to complete:** ~5 minutes
**Cost:** $0 (uses your existing free tier)
**Risk:** None (tables are isolated, can be removed if needed)

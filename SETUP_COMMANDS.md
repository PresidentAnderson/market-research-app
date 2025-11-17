# Setup Commands for Your CTO Dashboard Supabase Project

**Project ID:** `iithtbuedvwmtbagquxy`

---

## Your Supabase Credentials

Based on your project ID, your credentials are:

**Supabase URL:**
```
https://iithtbuedvwmtbagquxy.supabase.co
```

**Supabase Anon Key:**
You need to get this from your Supabase dashboard:
1. Go to: https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/settings/api
2. Copy the **anon public** key (long JWT token starting with `eyJ...`)

---

## Step 1: Add the Tables to Your Database

1. Go to: https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/sql/new
2. Copy the entire contents of this file:
   ```
   /Volumes/DevOPS 2026/Market Research/market-research-app/supabase/migrations/001_initial_schema.sql
   ```
3. Paste into the SQL Editor
4. Click **Run** or press Cmd+Enter
5. You should see "Success. No rows returned"

This adds 4 tables: `projects`, `research_runs`, `research_steps`, `sources`

---

## Step 2: Add Environment Variables to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/axaiinovation/market-research-app/settings/environment-variables

2. Click **Add New**

3. Add Variable 1:
   - **Key:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** `https://iithtbuedvwmtbagquxy.supabase.co`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

4. Click **Add New** again

5. Add Variable 2:
   - **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** [Paste your anon key from Supabase dashboard]
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

### Option B: Using Vercel CLI

```bash
cd "/Volumes/DevOPS 2026/Market Research/market-research-app"

# Add to production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# When prompted, enter: https://iithtbuedvwmtbagquxy.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# When prompted, paste your anon key

# Add to preview
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
# Enter: https://iithtbuedvwmtbagquxy.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
# Paste your anon key

# Add to development
vercel env add NEXT_PUBLIC_SUPABASE_URL development
# Enter: https://iithtbuedvwmtbagquxy.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development
# Paste your anon key
```

---

## Step 3: Redeploy the App

After adding environment variables, redeploy:

```bash
cd "/Volumes/DevOPS 2026/Market Research/market-research-app"
vercel --prod
```

Wait ~40 seconds for the build to complete.

---

## Step 4: Test the App

Visit: https://market-research-app-lilac.vercel.app

You should see:
- ✅ Market Research Protocol home page
- ✅ "New Project" card
- ✅ No error messages

Click "New Project" and create your first research project!

---

## Quick Links

- **Supabase Dashboard:** https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy
- **SQL Editor:** https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/sql/new
- **API Settings:** https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/settings/api
- **Table Editor:** https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/editor
- **Vercel Env Vars:** https://vercel.com/axaiinovation/market-research-app/settings/environment-variables

---

## Verification Checklist

- [ ] Ran SQL migration in Supabase
- [ ] See 4 new tables in Table Editor (projects, research_runs, research_steps, sources)
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL` to Vercel
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel
- [ ] Redeployed app with `vercel --prod`
- [ ] Visited app and see home page (not error)
- [ ] Can create a new project

---

## Troubleshooting

### Can't find anon key?
Go to: https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/settings/api
Copy the key labeled **anon public**

### Still seeing error page?
- Make sure you added both environment variables
- Make sure you selected all 3 environments (Production, Preview, Development)
- Make sure you redeployed after adding variables

### Tables not showing?
- Check SQL Editor for error messages
- Make sure the migration ran successfully
- Go to Table Editor to verify tables exist

---

**Total time:** ~5 minutes
**Cost:** $0 (uses your existing Supabase free tier)

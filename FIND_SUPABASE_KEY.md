# How to Find Your Supabase Anon Key

**You provided:** `sb_publishable_0iOb-1Q9NEYpHSiMnoHMLA_8TqslN35`

⚠️ **This appears to be a Stripe key, not a Supabase key.**

---

## Finding the Correct Supabase Anon Key

### Step 1: Go to Your Supabase API Settings

Click this link:
**https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/settings/api**

### Step 2: Look for "Project API keys" Section

You'll see a section that looks like this:

```
Project API keys

These keys are used to connect to your Supabase project.

┌─────────────────────────────────────────────────────────┐
│ Project URL                                              │
│ https://iithtbuedvwmtbagquxy.supabase.co               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ anon public                                              │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBh...│
│ [Click to reveal]                                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ service_role secret                                      │
│ [hidden] - DO NOT USE THIS ONE IN THE APP!              │
└─────────────────────────────────────────────────────────┘
```

### Step 3: Copy the "anon public" Key

1. Click on the **anon public** key section
2. Click the copy icon to copy it
3. The key should:
   - Start with `eyJ`
   - Be very long (200+ characters)
   - Look like a JWT token

### ⚠️ Important: Use "anon public", NOT "service_role"

- ✅ **anon public** - Safe to use in frontend apps
- ❌ **service_role** - NEVER use in frontend (full admin access)

---

## What Each Key Looks Like

### ✅ Correct: Supabase Anon Key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpdGh0YnVlZHZ3bXRiYWdxdXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQzMjE2MDAsImV4cCI6MTk5OTg5NzYwMH0.abcdefghijklmnopqrstuvwxyz1234567890
```
- Starts with `eyJ`
- Very long (200+ chars)
- Contains your project ID

### ❌ Wrong: Stripe Publishable Key
```
sb_publishable_0iOb-1Q9NEYpHSiMnoHMLA_8TqslN35
```
- Starts with `sb_publishable`
- Shorter (~40 chars)
- This is for Stripe, not Supabase

---

## Once You Have the Correct Key

### Add to Vercel (Dashboard Method)

1. Go to: https://vercel.com/axaiinovation/market-research-app/settings/environment-variables

2. Add these two variables:

   **Variable 1:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://iithtbuedvwmtbagquxy.supabase.co`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (paste your full key)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

3. Click **Save**

### Redeploy

```bash
cd "/Volumes/DevOPS 2026/Market Research/market-research-app"
vercel --prod
```

---

## Visual Guide

Here's what the Supabase dashboard looks like:

```
Supabase Dashboard
├── Project Settings (⚙️ icon)
    ├── General
    ├── Database
    └── API ← YOU ARE HERE
        │
        ├── Project URL
        │   └── https://iithtbuedvwmtbagquxy.supabase.co
        │
        ├── API Keys
        │   ├── anon public ← COPY THIS ONE
        │   │   └── eyJhbGc... (long JWT token)
        │   │
        │   └── service_role ← DON'T USE THIS
        │       └── [hidden]
        │
        └── JWT Settings
```

---

## Need Help?

If you're having trouble finding it:

1. Make sure you're logged into Supabase
2. Make sure you're viewing the correct project (iithtbuedvwmtbagquxy)
3. Click the direct link: https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/settings/api
4. Scroll down to "Project API keys"
5. Look for "anon public"
6. Click to reveal and copy

The key is always there - it's generated automatically when the project is created!

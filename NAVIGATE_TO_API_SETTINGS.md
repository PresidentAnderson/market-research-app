# Navigate to the Correct Page - API Settings (Not Data API)

## You're Currently On: Data API Settings ❌

This is the WRONG page. The page you're looking at is:
- **URL:** `.../settings/data-api`
- **Shows:** "Data API Settings", "Exposed schemas", "Max rows", etc.

## You Need To Go To: API Settings ✅

The correct page is:
- **URL:** `.../settings/api`
- **Shows:** "Project URL", "Project API keys", "anon public", "service_role"

---

## How to Get There

### Option 1: Click This Direct Link

**https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/settings/api**

Just click it and you'll go straight to the right page!

### Option 2: Navigate Using Sidebar

If you're already in Supabase dashboard:

1. Look at the **left sidebar**
2. Scroll to the bottom
3. Click **"Settings"** (⚙️ gear icon)
4. In the Settings menu, click **"API"** (NOT "Data API")

```
Supabase Dashboard
├── Table Editor
├── SQL Editor
├── Database
├── Storage
├── ...
└── Settings ← Click here
    ├── General
    ├── Database
    ├── API ← Then click here! ✅
    ├── Data API ← NOT this one ❌
    ├── Auth
    └── ...
```

---

## What Each Page Shows

### ❌ Data API Settings (where you are now)
```
Data API Settings
├── Exposed schemas
├── Extra search path
├── Max rows
└── Pool size
```
**This is for PostgREST configuration, not API keys!**

### ✅ API Settings (where you need to be)
```
API Settings
├── Configuration
│   ├── Project URL
│   │   └── https://iithtbuedvwmtbagquxy.supabase.co
│   └── Project API keys
│       ├── anon public ← YOUR KEY IS HERE!
│       └── service_role
├── GraphQL API
└── Connection String
```
**This is where the anon key is!**

---

## Quick Visual Check

When you're on the RIGHT page, you'll see:

✅ A section called **"Project API keys"**
✅ Two keys listed: **"anon public"** and **"service_role"**
✅ Each key has a **"Click to reveal"** or copy button

When you're on the WRONG page, you'll see:

❌ **"Exposed schemas"** dropdown
❌ **"Max rows"** setting
❌ **"Pool size"** setting

---

## Once You're on the Right Page

1. Look for **"Project API keys"** section
2. Find **"anon public"** (first key listed)
3. Click **"Click to reveal"** or the eye icon
4. Click the **copy button** (📋)
5. Paste the key here!

---

## Direct Link Again (Easy!)

Just click this and you're there:
**https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/settings/api**

This takes you directly to the API keys page!

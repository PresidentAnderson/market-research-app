# Getting Your Supabase Anon Key - Step by Step

**What you provided:** JWKS verification key - not what we need ❌

**What we need:** The anon public API key ✅

---

## Exact Steps to Get the Right Key

### Step 1: Go to API Settings

Click this exact link:
**https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/settings/api**

### Step 2: Scroll Down to "Project API keys"

You'll see a section that looks like this:

```
Configuration
├── Project URL
│   └── https://iithtbuedvwmtbagquxy.supabase.co
│
└── Project API keys
    ├── anon public (Click to reveal) ← THIS ONE!
    └── service_role (Click to reveal) ← NOT THIS ONE!
```

### Step 3: Click "Click to reveal" Under "anon public"

The page will show a long string that looks like:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpdGh0YnVlZHZ3bXRiYWdxdXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTU3NjAwMH0.abc123xyz...
```

### Step 4: Click the Copy Icon

There should be a copy button (📋) next to the key. Click it to copy.

---

## Alternative: Use Supabase CLI

If you have trouble with the dashboard, you can get it via CLI:

```bash
# Install Supabase CLI if you don't have it
brew install supabase/tap/supabase

# Login to Supabase
supabase login

# Get your project details
supabase projects list

# The anon key will be shown in the project details
```

---

## What Each Key Type Looks Like

### ❌ What You Sent (JWKS - Wrong)
```json
{
  "x": "nUBD-ESYN1XoDP7xPGa3chuf-JBa8ViLM5l6riKrWhA",
  "y": "8fHJHlZEdOWnz80t1IQbLfUOUE8PAigglpNB4NyhOcI",
  "alg": "ES256",
  ...
}
```
- This is JSON format
- Used for JWT signature verification
- Not an API key

### ✅ What We Need (Anon Public Key - Correct)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpdGh0YnVlZHZ3bXRiYWdxdXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTU3NjAwMH0.signature_here
```
- Single long string (not JSON)
- Starts with `eyJ`
- Has three parts separated by dots
- This is a JWT token

---

## Screenshot Guide

If you're looking at the Supabase dashboard, here's what to look for:

```
API Settings Page
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Configuration

Project URL
┌────────────────────────────────────────────┐
│ https://iithtbuedvwmtbagquxy.supabase.co  │
│ [Copy]                                     │
└────────────────────────────────────────────┘

Project API keys

These keys are safe to use in a browser if you have enabled Row Level Security (RLS).

anon public
┌────────────────────────────────────────────┐
│ •••••••••••••••••••••••••••••••••••••••••• │
│ [Click to reveal] [Copy]      ← CLICK HERE │
└────────────────────────────────────────────┘

service_role secret ⚠️
┌────────────────────────────────────────────┐
│ •••••••••••••••••••••••••••••••••••••••••• │
│ [Click to reveal] [Copy]    ← DON'T USE    │
└────────────────────────────────────────────┘
```

---

## Quick Test: Is It the Right Key?

If you decode the key at https://jwt.io, you should see:

```json
{
  "iss": "supabase",
  "ref": "iithtbuedvwmtbagquxy",  ← Your project ID
  "role": "anon",                 ← Should say "anon"
  "iat": 1700000000,
  "exp": 2015576000
}
```

If it says `"role": "anon"`, you have the right key!

---

## Still Can't Find It?

Try this alternative method:

1. Go to your Supabase project: https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy

2. Click **Settings** in the left sidebar (⚙️ icon at bottom)

3. Click **API** under "Project Settings"

4. Scroll to "Project API keys"

5. Look for the key labeled **"anon"** or **"anon public"**

6. Click the eye icon (👁️) or "Click to reveal" to show it

7. Click the copy icon (📋) to copy it

---

## Once You Have the Correct Key

It should:
- Be about 200-300 characters long
- Start with `eyJ`
- Have two dots (`.`) in it
- Look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...`

Then you can add it to Vercel!

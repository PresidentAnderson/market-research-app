# Get Your Anon Key in 30 Seconds (Browser Console Method)

This is the **fastest and easiest** way to get your anon key.

---

## Steps

### 1. Open the Supabase API Settings Page

Go to: **https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/settings/api**

### 2. Open Browser Developer Console

**On Mac:** Press `Cmd + Option + I`
**On Windows:** Press `Ctrl + Shift + I`

Or right-click anywhere on the page and select "Inspect"

### 3. Click the "Console" Tab

You'll see a tab bar at the top with: Elements, Console, Network, etc.
Click **"Console"**

### 4. Copy and Paste This Code

Copy this entire code block and paste it into the console, then press **Enter**:

```javascript
// Find and copy the Supabase anon key
(function() {
  // First, try to click reveal buttons
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('reveal') || btn.textContent.includes('Show')) {
      btn.click();
    }
  });

  // Wait a moment for reveals to work
  setTimeout(() => {
    // Search all text elements for the anon key
    const elements = Array.from(document.querySelectorAll('*'));
    let found = false;

    for (const el of elements) {
      const text = el.textContent || el.value || el.innerText || '';

      // Look for JWT tokens that start with eyJ and contain 'anon' in decoded form
      if (text.startsWith('eyJ') && text.length > 100 && text.split('.').length === 3) {
        try {
          // Decode the JWT payload
          const payload = JSON.parse(atob(text.split('.')[1]));

          // Check if it's the anon key
          if (payload.role === 'anon' && payload.ref === 'iithtbuedvwmtbagquxy') {
            console.log('✅ FOUND ANON KEY:');
            console.log(text);
            console.log('\n📋 Copying to clipboard...');
            navigator.clipboard.writeText(text);
            console.log('✅ COPIED! Paste it where you need it.');
            found = true;
            break;
          }
        } catch (e) {
          // Not a valid JWT, continue
        }
      }
    }

    if (!found) {
      console.log('❌ Anon key not found on page.');
      console.log('💡 Try clicking the "reveal" button next to "anon public" first, then run this again.');
    }
  }, 1000);
})();
```

### 5. Check the Output

You should see either:

**✅ Success:**
```
✅ FOUND ANON KEY:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

📋 Copying to clipboard...
✅ COPIED! Paste it where you need it.
```

The key is now in your clipboard! Just paste it (Cmd+V or Ctrl+V).

**❌ Not Found:**
```
❌ Anon key not found on page.
💡 Try clicking the "reveal" button next to "anon public" first...
```

If you see this:
1. Look for a button that says "Click to reveal" next to "anon public"
2. Click it
3. Run the code again

---

## What To Do With the Key

Once you have it copied, send it to me or:

1. Go to: https://vercel.com/axaiinovation/market-research-app/settings/environment-variables

2. Add these two variables:

   **Variable 1:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://iithtbuedvwmtbagquxy.supabase.co`

   **Variable 2:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: [Paste the key you just copied]

3. Redeploy:
   ```bash
   vercel --prod
   ```

---

## Why This Works

The anon key is displayed somewhere on that API settings page. This script:
1. Clicks any "reveal" buttons it finds
2. Searches all text on the page for JWT tokens
3. Decodes each token to check if it's the anon key
4. Copies it to your clipboard when found

It's much faster than manually searching!

---

## Alternative: Visual Search

If you prefer to do it manually:

1. On the API settings page, press `Cmd+F` (or `Ctrl+F`)
2. Search for: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
3. This should highlight the anon key if it's visible
4. Copy it manually

---

## Still Having Trouble?

Send me a screenshot of the API settings page and I can point out exactly where the key is!

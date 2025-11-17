#!/usr/bin/env node

/**
 * This script attempts to connect to your Supabase project
 * and retrieve the anon key by testing the public endpoint
 */

const https = require('https');

const SUPABASE_URL = 'https://iithtbuedvwmtbagquxy.supabase.co';

console.log('🔍 Attempting to retrieve Supabase anon key information...\n');

// Try to get server info
const options = {
  hostname: 'iithtbuedvwmtbagquxy.supabase.co',
  path: '/rest/v1/',
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    console.log('Response Headers:', JSON.stringify(res.headers, null, 2));
    console.log('\nResponse Body:', data);

    if (res.statusCode === 400 || res.statusCode === 401) {
      console.log('\n❌ API key is required but we got a response!');
      console.log('✅ This confirms your Supabase project is active.');
      console.log('\n📋 Next steps:');
      console.log('1. The anon key MUST be retrieved from the dashboard');
      console.log('2. Go to: https://supabase.com/dashboard/project/iithtbuedvwmtbagquxy/settings/api');
      console.log('3. Look for "Project API keys" section');
      console.log('4. Copy the "anon public" key (starts with eyJ)');
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Error:', e.message);
});

req.end();

console.log('Making request to:', SUPABASE_URL);
console.log('Waiting for response...\n');

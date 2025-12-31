/**
 * Script to get Spotify refresh token
 *
 * Usage:
 * 1. Create an app at https://developer.spotify.com/dashboard
 * 2. Set redirect URI to http://localhost:3000
 * 3. Run: node scripts/get-spotify-token.js
 * 4. Follow the prompts
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n🎵 Spotify Refresh Token Generator\n');
  console.log('This script will help you get your Spotify refresh token.');
  console.log('Make sure you have created a Spotify app at: https://developer.spotify.com/dashboard\n');

  const clientId = await question('Enter your Spotify Client ID: ');
  const clientSecret = await question('Enter your Spotify Client Secret: ');

  const redirectUri = 'http://127.0.0.1:3000';
  const scope = 'user-read-currently-playing user-read-playback-state';

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

  console.log('\n1. Visit this URL in your browser:');
  console.log(`\n${authUrl}\n`);
  console.log('2. After authorizing, you will be redirected to http://127.0.0.1:3000/?code=YOUR_CODE');
  console.log('3. Copy the "code" parameter from the URL\n');

  const code = await question('Enter the code from the redirect URL: ');

  console.log('\n📡 Exchanging code for refresh token...');
  console.log('Code received:', code.substring(0, 10) + '...');

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    console.log('Making request to Spotify API...');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code.trim(),
        redirect_uri: redirectUri,
      }),
    });

    console.log('Response status:', response.status);

    const data = await response.json();

    console.log('Response received\n');

    if (data.error) {
      console.error('❌ Error:', data.error);
      console.error('Description:', data.error_description);
      console.error('\nFull response:', JSON.stringify(data, null, 2));
    } else if (data.refresh_token) {
      console.log('✅ Success! Add these to your .env.local file:\n');
      console.log(`SPOTIFY_CLIENT_ID=${clientId}`);
      console.log(`SPOTIFY_CLIENT_SECRET=${clientSecret}`);
      console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
    } else {
      console.error('❌ Unexpected response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }

  rl.close();
}

main().catch(console.error);

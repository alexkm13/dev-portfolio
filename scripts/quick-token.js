// Quick token exchange - paste your code directly here
const code = 'PASTE_YOUR_CODE_HERE'; // Replace this with your code

const clientId = 'c1605263e0c84e799313e39b89caedff';
const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
const secretMatch = envContent.match(/SPOTIFY_CLIENT_SECRET=(.+)/);
const clientSecret = secretMatch[1].trim();

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${basic}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://127.0.0.1:3000',
  }),
})
.then(res => res.json())
.then(data => {
  if (data.error) {
    console.error('❌ Error:', data.error);
    console.error('Description:', data.error_description);
  } else {
    console.log('✅ SUCCESS!');
    console.log('\nYour refresh token:');
    console.log(data.refresh_token);
    console.log('\nCopy this entire token and paste it in your .env.local file');
  }
})
.catch(err => console.error('Error:', err));

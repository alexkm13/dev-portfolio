const http = require('http');
const url = require('url');

const clientId = 'c1605263e0c84e799313e39b89caedff';
const clientSecret = '0afc3dfce2f14027a265685eb58b71cb';
const redirectUri = 'http://127.0.0.1:3000';

const server = http.createServer(async (req, res) => {
  const queryObject = url.parse(req.url, true).query;

  if (queryObject.code) {
    const code = queryObject.code;
    console.log('\n✅ Received authorization code!');
    console.log('Exchanging for refresh token...\n');

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error('❌ Error:', data.error);
        console.error('Description:', data.error_description);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>Error: ${data.error}</h1><p>${data.error_description}</p>`);
      } else {
        console.log('✅ SUCCESS!\n');
        console.log('Add this to your .env.local file:\n');
        console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
        console.log('Token length:', data.refresh_token.length, 'characters\n');

        // Save to file
        const fs = require('fs');
        fs.writeFileSync('spotify-token.txt', data.refresh_token);
        console.log('✅ Token also saved to: spotify-token.txt\n');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <h1>Success!</h1>
          <p>Your refresh token has been generated. Check your terminal!</p>
          <p>Token length: ${data.refresh_token.length} characters</p>
          <p>You can close this window.</p>
        `);

        setTimeout(() => {
          console.log('Shutting down server...');
          server.close();
        }, 1000);
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`<h1>Error</h1><p>${error.message}</p>`);
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Waiting for authorization...</h1><p>Please complete the authorization in your browser.</p>');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('🎵 Spotify Authorization Server Running\n');
  console.log('Visit this URL to authorize:\n');
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user-read-currently-playing%20user-read-playback-state`;
  console.log(authUrl);
  console.log('\nWaiting for authorization...\n');
});

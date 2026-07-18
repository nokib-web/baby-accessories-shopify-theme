const https = require('https');
const fs = require('fs');

const url = 'https://nzskfw-2n.myshopify.com/pages/about-us-1?preview_theme_id=151230972079';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('c:\\pixelora\\little-leaf\\scratch\\page-html.txt', data);
    console.log('HTML fetched successfully. Length:', data.length);
  });
}).on('error', (err) => {
  console.error('Error fetching page:', err);
});

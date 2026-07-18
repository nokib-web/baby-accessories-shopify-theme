const fs = require('fs');

try {
  const content = fs.readFileSync('c:\\pixelora\\little-leaf\\templates\\page.about-us.json', 'utf8');
  const parsed = JSON.parse(content);
  console.log('JSON is 100% valid!');
  console.log('Sections in template:', Object.keys(parsed.sections));
} catch (err) {
  console.error('JSON Syntax Error:', err.message);
}

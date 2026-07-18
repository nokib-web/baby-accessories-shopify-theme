const fs = require('fs');
const path = require('path');

const files = [
  'sections/about-us-hero.liquid',
  'sections/about-us-promise.liquid',
  'sections/about-us-specialties.liquid',
  'sections/about-us-split-list.liquid',
  'sections/about-us-belief.liquid'
];

files.forEach(file => {
  const filePath = path.join('c:\\pixelora\\little-leaf', file);
  if (!fs.existsSync(filePath)) {
    console.error(`File missing: ${file}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Validate basic Liquid tags
  const openIfs = (content.match(/{%\s*if\s+/g) || []).length;
  const closeIfs = (content.match(/{%\s*endif\s*%}/g) || []).length;
  const openFors = (content.match(/{%\s*for\s+/g) || []).length;
  const closeFors = (content.match(/{%\s*endfor\s*%}/g) || []).length;

  console.log(`${file}:`);
  console.log(`  if tags: open=${openIfs}, close=${closeIfs}`);
  console.log(`  for tags: open=${openFors}, close=${closeFors}`);

  if (openIfs !== closeIfs) {
    console.error(`  [ERROR] Mismatched if/endif tags in ${file}!`);
  }
  if (openFors !== closeFors) {
    console.error(`  [ERROR] Mismatched for/endfor tags in ${file}!`);
  }

  // Extract and validate schema JSON
  const schemaMatch = content.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
  if (schemaMatch) {
    try {
      JSON.parse(schemaMatch[1].trim());
      console.log(`  [OK] Schema JSON is valid.`);
    } catch (err) {
      console.error(`  [ERROR] Invalid Schema JSON in ${file}:`, err.message);
    }
  } else {
    console.error(`  [ERROR] Missing {% schema %} in ${file}!`);
  }
});

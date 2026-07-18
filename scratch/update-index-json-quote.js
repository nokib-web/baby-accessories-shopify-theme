const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'templates', 'index.json');
let rawData = fs.readFileSync(indexPath, 'utf8');

// Strip the comment block
let jsonStr = rawData.replace(/\/\*[\s\S]*?\*\//, '').trim();
let indexData = JSON.parse(jsonStr);

if (indexData.sections['section_x8mrnx']) {
  const settings = indexData.sections['section_x8mrnx'].settings;
  settings.section_height = ""; // Set to Auto
  settings.gap = 20; // Reduce gap from 80 to 20
  settings.padding_block_start = 40; // Reduce from 64 to 40
  settings.padding_block_end = 40; // Reduce from 64 to 40
  
  console.log('Updating section_x8mrnx settings locally...');
} else {
  console.log('section_x8mrnx not found!');
}

const commentMatch = rawData.match(/\/\*[\s\S]*?\*\//);
const comment = commentMatch ? commentMatch[0] + '\n' : '';

fs.writeFileSync(indexPath, comment + JSON.stringify(indexData, null, 2) + '\n');
console.log('Successfully updated index.json with section_x8mrnx adjustments');

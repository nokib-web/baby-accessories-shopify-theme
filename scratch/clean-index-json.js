const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'templates', 'index.json');
let rawData = fs.readFileSync(indexPath, 'utf8');

let jsonStr = rawData.replace(/\/\*[\s\S]*?\*\//, '').trim();
let indexData = JSON.parse(jsonStr);

// Delete all instances of "promo-with-products"
const sectionsToDelete = [];
for (const key in indexData.sections) {
  if (indexData.sections[key].type === 'promo-with-products') {
    sectionsToDelete.push(key);
  }
}

sectionsToDelete.forEach(key => {
  delete indexData.sections[key];
});

indexData.order = indexData.order.filter(key => !sectionsToDelete.includes(key));

const commentMatch = rawData.match(/\/\*[\s\S]*?\*\//);
const comment = commentMatch ? commentMatch[0] + '\n' : '';

fs.writeFileSync(indexPath, comment + JSON.stringify(indexData, null, 2) + '\n');
console.log('Removed promo sections from index.json');

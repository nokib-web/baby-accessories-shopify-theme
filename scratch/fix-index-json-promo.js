const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'templates', 'index.json');
let rawData = fs.readFileSync(indexPath, 'utf8');

// The file has a comment at the top: /* ... */
let jsonStr = rawData.replace(/\/\*[\s\S]*?\*\//, '').trim();
let indexData = JSON.parse(jsonStr);

// 1. Delete all instances of "promo-with-products"
const sectionsToDelete = [];
for (const key in indexData.sections) {
  if (indexData.sections[key].type === 'promo-with-products') {
    sectionsToDelete.push(key);
  }
}

sectionsToDelete.forEach(key => {
  delete indexData.sections[key];
});

// Also remove them from the order array
indexData.order = indexData.order.filter(key => !sectionsToDelete.includes(key));


// 2. Insert a clean section with the CORRECT block type "_product-card"
const newSectionId = 'promo_with_products_fixed';
const promoSection = {
  "type": "promo-with-products",
  "blocks": {
    "product_card_1": {
      "type": "_product-card",
      "settings": {}
    }
  },
  "block_order": ["product_card_1"],
  "settings": {
    "section_width": "page-width",
    "section_bg_color": "#f4f4f4",
    "promo_title": "Inside Out\nA Trimester Guide for You and Baby",
    "promo_button_text": "Read More",
    "max_products": 6,
    "collection": "hopfrog-barefoot-shoes-multimix"
  }
};

indexData.sections[newSectionId] = promoSection;

let insertIndex = indexData.order.indexOf('hero_highlight_CFmN9h');
if (insertIndex === -1) {
  insertIndex = 1;
} else {
  insertIndex += 1;
}
indexData.order.splice(insertIndex, 0, newSectionId);

const commentMatch = rawData.match(/\/\*[\s\S]*?\*\//);
const comment = commentMatch ? commentMatch[0] + '\n' : '';

fs.writeFileSync(indexPath, comment + JSON.stringify(indexData, null, 2) + '\n');
console.log('Fixed index.json sections.');

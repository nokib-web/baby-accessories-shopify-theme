const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'templates', 'product.json');
let rawData = fs.readFileSync(productPath, 'utf8');

// Strip comment blocks
let jsonStr = rawData.replace(/\/\*[\s\S]*?\*\//, '').trim();
let productData = JSON.parse(jsonStr);

const productDetails = productData.sections.main.blocks['product-details'];
if (productDetails) {
  // Add trust_badges block configuration
  productDetails.blocks['trust_badges_block'] = {
    "type": "trust-badges",
    "settings": {
      "icon_1": "truck",
      "text_1": "Free UK Delivery over £25",
      "icon_2": "lock",
      "text_2": "100% Secure Checkout",
      "icon_3": "return",
      "text_3": "14-Day Easy Returns",
      "icon_4": "shield-check",
      "text_4": "Authentic Beauty Guarantee",
      "icon_size": 20,
      "icon_color": "#2e4a29",
      "font_size": 13,
      "margin_top": 24
    },
    "blocks": {}
  };

  // Find buy_buttons_eYQEYi in block_order, and insert trust_badges_block right after it
  const order = productDetails.block_order;
  const buyButtonsIndex = order.indexOf('buy_buttons_eYQEYi');
  if (buyButtonsIndex !== -1) {
    order.splice(buyButtonsIndex + 1, 0, 'trust_badges_block');
    console.log('Inserted trust_badges_block in block_order after buy_buttons.');
  } else {
    order.push('trust_badges_block');
  }
}

const commentMatch = rawData.match(/\/\*[\s\S]*?\*\//);
const comment = commentMatch ? commentMatch[0] + '\n' : '';

fs.writeFileSync(productPath, comment + JSON.stringify(productData, null, 2) + '\n');
console.log('Successfully added trust badges to product.json');

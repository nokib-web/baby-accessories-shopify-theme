const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'templates', 'product.json');
let rawData = fs.readFileSync(productPath, 'utf8');

// Strip any comment blocks (though usually templates/product.json doesn't have them)
let jsonStr = rawData.replace(/\/\*[\s\S]*?\*\//, '').trim();
let productData = JSON.parse(jsonStr);

// 1. Configure media-gallery
const mediaGallery = productData.sections.main.blocks['media-gallery'];
if (mediaGallery) {
  mediaGallery.settings.media_presentation = "carousel";
  mediaGallery.settings.slideshow_controls_style = "thumbnails";
  mediaGallery.settings.thumbnail_position = "right";
  console.log('Updated media-gallery to carousel with vertical thumbnails.');
}

// 2. Configure product-details block
const productDetails = productData.sections.main.blocks['product-details'];
if (productDetails) {
  // Replace the header block price with our new product-details-table, and add product-inventory block
  const headerGroup = productDetails.blocks['group_icgrde'];
  if (headerGroup) {
    // Add product-inventory block configuration
    headerGroup.blocks['inventory_pill'] = {
      "type": "product-inventory",
      "settings": {
        "inventory_threshold": 10,
        "show_inventory_quantity": false,
        "padding-block-start": 4,
        "padding-block-end": 4
      },
      "blocks": {}
    };

    // Add product-details-table block configuration
    headerGroup.blocks['details_table'] = {
      "type": "product-details-table",
      "settings": {},
      "blocks": {}
    };

    // Replace price block in headerGroup's blocks and update order
    delete headerGroup.blocks['price_tVjtKg'];
    
    headerGroup.block_order = [
      "text_xrnftG",
      "inventory_pill",
      "details_table"
    ];
    console.log('Updated Header block order to show Title -> Inventory Pill -> Details Table.');
  }

  // 3. Configure buy_buttons to show buttons side-by-side
  const buyButtons = productDetails.blocks['buy_buttons_eYQEYi'];
  if (buyButtons) {
    buyButtons.settings.stacking = false;
    console.log('Updated buy_buttons stacking to false (side-by-side).');
  }
}

const commentMatch = rawData.match(/\/\*[\s\S]*?\*\//);
const comment = commentMatch ? commentMatch[0] + '\n' : '';

fs.writeFileSync(productPath, comment + JSON.stringify(productData, null, 2) + '\n');
console.log('Successfully updated product.json');

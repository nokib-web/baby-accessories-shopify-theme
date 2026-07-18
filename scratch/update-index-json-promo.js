const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'templates', 'index.json');
let rawData = fs.readFileSync(indexPath, 'utf8');

// Strip the comment block
let jsonStr = rawData.replace(/\/\*[\s\S]*?\*\//, '').trim();
let indexData = JSON.parse(jsonStr);

// Let's check if there is an existing promo key
let promoKey = Object.keys(indexData.sections).find(k => indexData.sections[k].type === 'promo-with-products');

if (!promoKey) {
  promoKey = 'promo_with_products_default';
  indexData.sections[promoKey] = {
    "type": "promo-with-products",
    "blocks": {},
    "settings": {}
  };
  
  // Insert in order
  const order = indexData.order;
  let insertIndex = order.indexOf('hero_highlight_CFmN9h');
  if (insertIndex === -1) {
    insertIndex = 1;
  } else {
    insertIndex += 1;
  }
  order.splice(insertIndex, 0, promoKey);
  indexData.order = order;
}

// Update the settings and block order
indexData.sections[promoKey].settings = {
  "section_width": "custom",
  "custom_max_width": 1600,
  "section_bg_color": "#ffffff",
  "promo_overlay_color": "#000000",
  "promo_overlay_opacity": 20,
  "promo_title": "Inside Out\nA Trimester Guide for You and Baby",
  "promo_subtitle": "",
  "promo_button_text": "Read More",
  "promo_button_link": "",
  "promo_text_color": "#ffffff",
  "button_bg_color": "#2e4a29",
  "button_text_color": "#ffffff",
  "collection": "hopfrog-barefoot-shoes-multimix",
  "max_products": 8,
  "padding_top": 40,
  "padding_bottom": 40
};

indexData.sections[promoKey].blocks = {
  "static-product-card": {
    "type": "_product-card",
    "name": "t:names.product_card",
    "static": true,
    "settings": {
      "product_card_gap": 4,
      "background_color": "",
      "border": "none",
      "border_width": 1,
      "border_opacity": 100,
      "border_color": "",
      "border_radius": 0,
      "padding-block-start": 0,
      "padding-block-end": 0,
      "padding-inline-start": 0,
      "padding-inline-end": 0
    },
    "blocks": {
      "product_card_gallery_VEfXp3": {
        "type": "_product-card-gallery",
        "name": "t:names.product_card_media",
        "settings": {
          "image_ratio": "adapt",
          "border": "none",
          "border_width": 1,
          "border_opacity": 100,
          "border_color": "",
          "border_radius": 0,
          "padding-block-start": 0,
          "padding-block-end": 0,
          "padding-inline-start": 0,
          "padding-inline-end": 0
        },
        "blocks": {}
      },
      "product_title_bXVgVR": {
        "type": "product-title",
        "name": "t:names.product_title",
        "settings": {
          "width": "fit-content",
          "max_width": "normal",
          "alignment": "left",
          "type_preset": "rte",
          "font": "var(--font-body--family)",
          "font_size": "1rem",
          "line_height": "normal",
          "letter_spacing": "normal",
          "case": "none",
          "wrap": "pretty",
          "text_color": "",
          "background": false,
          "background_color": "#00000026",
          "corner_radius": 0,
          "padding-block-start": 4,
          "padding-block-end": 0,
          "padding-inline-start": 0,
          "padding-inline-end": 0
        },
        "blocks": {}
      },
      "price_86QeTN": {
        "type": "price",
        "name": "t:names.product_price",
        "settings": {
          "show_sale_price_first": true,
          "show_installments": false,
          "show_tax_info": false,
          "type_preset": "h6",
          "width": "100%",
          "alignment": "left",
          "font": "var(--font-body--family)",
          "font_size": "1rem",
          "line_height": "normal",
          "letter_spacing": "normal",
          "case": "none",
          "text_color": "",
          "padding-block-start": 0,
          "padding-block-end": 0,
          "padding-inline-start": 0,
          "padding-inline-end": 0
        },
        "blocks": {}
      }
    },
    "block_order": [
      "product_card_gallery_VEfXp3",
      "product_title_bXVgVR",
      "price_86QeTN"
    ]
  }
};

const commentMatch = rawData.match(/\/\*[\s\S]*?\*\//);
const comment = commentMatch ? commentMatch[0] + '\n' : '';

fs.writeFileSync(indexPath, comment + JSON.stringify(indexData, null, 2) + '\n');
console.log('Successfully updated index.json with full blocks promo section');

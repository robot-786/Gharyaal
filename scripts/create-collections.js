/**
 * Gharyaal Watch Store - Collection Creator Script
 * 
 * This script creates all brand collections and subcollections programmatically
 * using the Shopify Admin API.
 * 
 * SETUP:
 * 1. Create a private app in Shopify Admin > Settings > Apps and sales channels > Develop apps
 * 2. Give it permissions: write_products, read_products
 * 3. Copy the Admin API access token
 * 4. Update the SHOP_DOMAIN and ACCESS_TOKEN below
 * 5. Run: node scripts/create-collections.js
 * 
 * PRODUCT TAGGING CONVENTION:
 * - Add brand tag to products: "rolex", "patek-philippe", "audemars-piguet", etc.
 * - Add subcategory tag to products: "daydate", "submariner", "nautilus", etc.
 * - Products will automatically appear in matching collections
 */

const https = require('https');

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
const SHOP_DOMAIN = 'your-store.myshopify.com'; // e.g., 'gharyaal.myshopify.com'
const ACCESS_TOKEN = 'your-admin-api-access-token'; // Get from Shopify Admin

// ============================================
// COLLECTION DEFINITIONS
// ============================================
const collections = {
  // Main Brand Collections (use brand template)
  brands: [
    {
      title: 'Rolex',
      handle: 'rolex',
      template: 'collection.brand',
      rule_column: 'tag',
      rule_condition: 'rolex',
      subcollections: [
        { title: 'Rolex Daydate', handle: 'rolex-daydate', tag: 'daydate' },
        { title: 'Rolex Datejust', handle: 'rolex-datejust', tag: 'datejust' },
        { title: 'Rolex Submariner', handle: 'rolex-submariner', tag: 'submariner' },
        { title: 'Rolex GMT', handle: 'rolex-gmt', tag: 'gmt' },
        { title: 'Rolex Skydweller', handle: 'rolex-skydweller', tag: 'skydweller' },
        { title: 'Rolex Land Dweller', handle: 'rolex-land-dweller', tag: 'land-dweller' },
        { title: 'Rolex Daytona', handle: 'rolex-daytona', tag: 'daytona' },
        { title: 'Rolex Oyster Perpetual', handle: 'rolex-oyster-perpetual', tag: 'oyster-perpetual' },
        { title: 'Rolex Yacht Master', handle: 'rolex-yacht-master', tag: 'yacht-master' },
        { title: 'Rolex Explorer', handle: 'rolex-explorer', tag: 'explorer' },
        { title: 'Rolex 1908', handle: 'rolex-1908', tag: '1908' },
      ]
    },
    {
      title: 'Patek Philippe',
      handle: 'patek-philippe',
      template: 'collection.brand',
      rule_column: 'tag',
      rule_condition: 'patek-philippe',
      subcollections: [
        { title: 'Patek Philippe Nautilus', handle: 'patek-philippe-nautilus', tag: 'nautilus' },
        { title: 'Patek Philippe Aquanaut', handle: 'patek-philippe-aquanaut', tag: 'aquanaut' },
        { title: 'Patek Philippe Skeleton', handle: 'patek-philippe-skeleton', tag: 'skeleton' },
        { title: 'Patek Philippe Side Second', handle: 'patek-philippe-side-second', tag: 'side-second' },
        { title: 'Patek Philippe Power Reserve', handle: 'patek-philippe-power-reserve', tag: 'power-reserve' },
        { title: 'Patek Philippe Cubitus', handle: 'patek-philippe-cubitus', tag: 'cubitus' },
        { title: 'Patek Philippe Strap', handle: 'patek-philippe-strap', tag: 'strap' },
      ]
    },
    {
      title: 'Audemars Piguet',
      handle: 'audemars-piguet',
      template: 'collection.brand',
      rule_column: 'tag',
      rule_condition: 'audemars-piguet',
      subcollections: [
        { title: 'Audemars Piguet Automatic', handle: 'audemars-piguet-automatic', tag: 'automatic' },
        { title: 'Audemars Piguet Chronograph', handle: 'audemars-piguet-chronograph', tag: 'chronograph' },
        { title: 'Audemars Piguet Offshore', handle: 'audemars-piguet-offshore', tag: 'offshore' },
        { title: 'Audemars Piguet Skeleton', handle: 'audemars-piguet-skeleton', tag: 'skeleton' },
        { title: 'Audemars Piguet Strap', handle: 'audemars-piguet-strap', tag: 'strap' },
      ]
    },
    {
      title: 'Tissot',
      handle: 'tissot',
      template: 'collection.brand',
      rule_column: 'tag',
      rule_condition: 'tissot',
      subcollections: [
        { title: 'Tissot Strap', handle: 'tissot-strap', tag: 'strap' },
        { title: 'Tissot Bracelet', handle: 'tissot-bracelet', tag: 'bracelet' },
      ]
    },
    {
      title: 'Tag Heuer',
      handle: 'tag-heuer',
      template: 'collection.brand',
      rule_column: 'tag',
      rule_condition: 'tag-heuer',
      subcollections: [
        { title: 'Tag Heuer Strap', handle: 'tag-heuer-strap', tag: 'strap' },
        { title: 'Tag Heuer Bracelet', handle: 'tag-heuer-bracelet', tag: 'bracelet' },
      ]
    },
    {
      title: 'Omega',
      handle: 'omega',
      template: 'collection.brand',
      rule_column: 'tag',
      rule_condition: 'omega',
      subcollections: [
        { title: 'Omega Strap', handle: 'omega-strap', tag: 'strap' },
        { title: 'Omega Bracelet', handle: 'omega-bracelet', tag: 'bracelet' },
      ]
    },
    {
      title: 'Hublot',
      handle: 'hublot',
      template: 'collection.brand',
      rule_column: 'tag',
      rule_condition: 'hublot',
      subcollections: [] // No subcollections required
    },
    {
      title: 'OZ/RX Quality',
      handle: 'oz-rx-quality',
      template: 'collection.brand',
      rule_column: 'tag',
      rule_condition: 'oz-rx-quality',
      subcollections: [
        { title: 'OZ/RX Rolex', handle: 'oz-rx-quality-rolex', tag: 'rolex' },
        { title: 'OZ/RX Audemars Piguet', handle: 'oz-rx-quality-audemars-piguet', tag: 'audemars-piguet' },
        { title: 'OZ/RX Patek Philippe', handle: 'oz-rx-quality-patek-philippe', tag: 'patek-philippe' },
      ]
    },
    {
      title: 'Stone Watches',
      handle: 'stone-watches',
      template: 'collection.brand',
      rule_column: 'tag',
      rule_condition: 'stone-watches',
      subcollections: [
        { title: 'Stone Watches Strap', handle: 'stone-watches-strap', tag: 'strap' },
        { title: 'Stone Watches Bracelet', handle: 'stone-watches-bracelet', tag: 'bracelet' },
      ]
    },
    {
      title: 'Women Watches',
      handle: 'women-watches',
      template: 'collection.brand',
      rule_column: 'tag',
      rule_condition: 'women-watches',
      subcollections: [
        { title: 'Women Watches Strap', handle: 'women-watches-strap', tag: 'strap' },
        { title: 'Women Watches Bracelet', handle: 'women-watches-bracelet', tag: 'bracelet' },
      ]
    },
    {
      title: 'Budget Watches',
      handle: 'budget-watches',
      template: 'collection.brand',
      rule_column: 'tag',
      rule_condition: 'budget-watches',
      subcollections: [
        { title: 'Budget Watches Strap', handle: 'budget-watches-strap', tag: 'strap' },
        { title: 'Budget Watches Bracelet', handle: 'budget-watches-bracelet', tag: 'bracelet' },
      ]
    },
  ]
};

// ============================================
// API HELPER FUNCTIONS
// ============================================

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SHOP_DOMAIN,
      port: 443,
      path: `/admin/api/2024-01${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ACCESS_TOKEN,
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(result);
          } else {
            reject({ status: res.statusCode, body: result });
          }
        } catch (e) {
          reject({ status: res.statusCode, body: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Rate limiting helper
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// COLLECTION CREATION FUNCTIONS
// ============================================

async function createSmartCollection(collectionData) {
  const { title, handle, template, rules, disjunctive = false } = collectionData;
  
  const payload = {
    smart_collection: {
      title: title,
      handle: handle,
      rules: rules,
      disjunctive: disjunctive, // false = AND, true = OR
      published: true,
      sort_order: 'best-selling',
    }
  };

  // Add template suffix if specified
  if (template && template !== 'collection') {
    payload.smart_collection.template_suffix = template.replace('collection.', '');
  }

  try {
    const result = await makeRequest('POST', '/smart_collections.json', payload);
    console.log(`✓ Created: ${title} (${handle})`);
    return result.smart_collection;
  } catch (error) {
    if (error.body?.errors?.handle?.[0]?.includes('already')) {
      console.log(`⚠ Already exists: ${title} (${handle})`);
      return null;
    }
    console.error(`✗ Failed to create ${title}:`, error.body?.errors || error);
    return null;
  }
}

async function createAllCollections() {
  console.log('========================================');
  console.log('Gharyaal Watch Store - Collection Creator');
  console.log('========================================\n');

  if (SHOP_DOMAIN === 'your-store.myshopify.com' || ACCESS_TOKEN === 'your-admin-api-access-token') {
    console.error('ERROR: Please update SHOP_DOMAIN and ACCESS_TOKEN in this script!');
    console.log('\nInstructions:');
    console.log('1. Go to Shopify Admin > Settings > Apps and sales channels > Develop apps');
    console.log('2. Create a new app and give it "write_products" permission');
    console.log('3. Install the app and copy the Admin API access token');
    console.log('4. Update the SHOP_DOMAIN and ACCESS_TOKEN variables at the top of this script');
    process.exit(1);
  }

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  for (const brand of collections.brands) {
    console.log(`\n--- Creating ${brand.title} Collections ---`);
    
    // Create parent brand collection
    const parentRules = [
      {
        column: brand.rule_column,
        relation: 'equals',
        condition: brand.rule_condition
      }
    ];

    const parentResult = await createSmartCollection({
      title: brand.title,
      handle: brand.handle,
      template: brand.template,
      rules: parentRules,
      disjunctive: false
    });

    if (parentResult) totalCreated++;
    else if (parentResult === null) totalSkipped++;
    else totalFailed++;

    await delay(500); // Rate limiting

    // Create subcollections
    for (const sub of brand.subcollections) {
      // Subcollection needs BOTH the brand tag AND the subcategory tag
      const subRules = [
        {
          column: 'tag',
          relation: 'equals',
          condition: brand.rule_condition // Brand tag
        },
        {
          column: 'tag',
          relation: 'equals',
          condition: sub.tag // Subcategory tag
        }
      ];

      const subResult = await createSmartCollection({
        title: sub.title,
        handle: sub.handle,
        template: 'collection', // Normal template for subcollections
        rules: subRules,
        disjunctive: false // AND - must have BOTH tags
      });

      if (subResult) totalCreated++;
      else if (subResult === null) totalSkipped++;
      else totalFailed++;

      await delay(500); // Rate limiting
    }
  }

  console.log('\n========================================');
  console.log('Collection Creation Complete!');
  console.log('========================================');
  console.log(`✓ Created: ${totalCreated}`);
  console.log(`⚠ Already existed: ${totalSkipped}`);
  console.log(`✗ Failed: ${totalFailed}`);
  console.log('\n--- NEXT STEPS ---');
  console.log('1. Tag your products with the appropriate tags:');
  console.log('   - Brand tag: rolex, patek-philippe, audemars-piguet, etc.');
  console.log('   - Subcategory tag: daydate, submariner, nautilus, strap, bracelet, etc.');
  console.log('2. Products with matching tags will automatically appear in collections');
  console.log('3. Example: A Rolex Submariner needs tags: "rolex" AND "submariner"');
}

// Run the script
createAllCollections().catch(console.error);

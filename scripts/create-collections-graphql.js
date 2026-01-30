/**
 * Gharyaal Watch Store - Collection Creator (GraphQL Version)
 * 
 * Uses Shopify's GraphQL Admin API for better performance
 * 
 * SETUP:
 * 1. Install dependencies: npm install @shopify/shopify-api
 * 2. Update SHOP_DOMAIN and ACCESS_TOKEN below
 * 3. Run: node scripts/create-collections-graphql.js
 */

const https = require('https');

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
const SHOP_DOMAIN = 'your-store.myshopify.com';
const ACCESS_TOKEN = 'your-admin-api-access-token';
const API_VERSION = '2024-01';

// ============================================
// COLLECTION DEFINITIONS
// ============================================
const brandCollections = [
  {
    title: 'Rolex',
    handle: 'rolex',
    templateSuffix: 'brand',
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'rolex' }]
    },
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
    templateSuffix: 'brand',
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'patek-philippe' }]
    },
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
    templateSuffix: 'brand',
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'audemars-piguet' }]
    },
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
    templateSuffix: 'brand',
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'tissot' }]
    },
    subcollections: [
      { title: 'Tissot Strap', handle: 'tissot-strap', tag: 'strap' },
      { title: 'Tissot Bracelet', handle: 'tissot-bracelet', tag: 'bracelet' },
    ]
  },
  {
    title: 'Tag Heuer',
    handle: 'tag-heuer',
    templateSuffix: 'brand',
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'tag-heuer' }]
    },
    subcollections: [
      { title: 'Tag Heuer Strap', handle: 'tag-heuer-strap', tag: 'strap' },
      { title: 'Tag Heuer Bracelet', handle: 'tag-heuer-bracelet', tag: 'bracelet' },
    ]
  },
  {
    title: 'Omega',
    handle: 'omega',
    templateSuffix: 'brand',
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'omega' }]
    },
    subcollections: [
      { title: 'Omega Strap', handle: 'omega-strap', tag: 'strap' },
      { title: 'Omega Bracelet', handle: 'omega-bracelet', tag: 'bracelet' },
    ]
  },
  {
    title: 'Hublot',
    handle: 'hublot',
    templateSuffix: 'brand',
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'hublot' }]
    },
    subcollections: []
  },
  {
    title: 'OZ/RX Quality',
    handle: 'oz-rx-quality',
    templateSuffix: 'brand',
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'oz-rx-quality' }]
    },
    subcollections: [
      { title: 'OZ/RX Rolex', handle: 'oz-rx-quality-rolex', tag: 'rolex' },
      { title: 'OZ/RX Audemars Piguet', handle: 'oz-rx-quality-audemars-piguet', tag: 'audemars-piguet' },
      { title: 'OZ/RX Patek Philippe', handle: 'oz-rx-quality-patek-philippe', tag: 'patek-philippe' },
    ]
  },
  {
    title: 'Stone Watches',
    handle: 'stone-watches',
    templateSuffix: 'brand',
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'stone-watches' }]
    },
    subcollections: [
      { title: 'Stone Watches Strap', handle: 'stone-watches-strap', tag: 'strap' },
      { title: 'Stone Watches Bracelet', handle: 'stone-watches-bracelet', tag: 'bracelet' },
    ]
  },
  {
    title: 'Women Watches',
    handle: 'women-watches',
    templateSuffix: 'brand',
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'women-watches' }]
    },
    subcollections: [
      { title: 'Women Watches Strap', handle: 'women-watches-strap', tag: 'strap' },
      { title: 'Women Watches Bracelet', handle: 'women-watches-bracelet', tag: 'bracelet' },
    ]
  },
  {
    title: 'Budget Watches',
    handle: 'budget-watches',
    templateSuffix: 'brand',
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'budget-watches' }]
    },
    subcollections: [
      { title: 'Budget Watches Strap', handle: 'budget-watches-strap', tag: 'strap' },
      { title: 'Budget Watches Bracelet', handle: 'budget-watches-bracelet', tag: 'bracelet' },
    ]
  },
];

// ============================================
// GraphQL Mutation
// ============================================
const CREATE_COLLECTION_MUTATION = `
  mutation collectionCreate($input: CollectionInput!) {
    collectionCreate(input: $input) {
      collection {
        id
        title
        handle
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// ============================================
// API Helper
// ============================================
function graphqlRequest(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, variables });
    
    const options = {
      hostname: SHOP_DOMAIN,
      port: 443,
      path: `/admin/api/${API_VERSION}/graphql.json`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ACCESS_TOKEN,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// Main Function
// ============================================
async function createAllCollections() {
  console.log('========================================');
  console.log('Gharyaal - Collection Creator (GraphQL)');
  console.log('========================================\n');

  if (SHOP_DOMAIN === 'your-store.myshopify.com') {
    console.error('ERROR: Update SHOP_DOMAIN and ACCESS_TOKEN first!');
    process.exit(1);
  }

  let created = 0, failed = 0;

  for (const brand of brandCollections) {
    // Create parent brand collection
    console.log(`\n--- ${brand.title} ---`);
    
    try {
      const result = await graphqlRequest(CREATE_COLLECTION_MUTATION, {
        input: {
          title: brand.title,
          handle: brand.handle,
          templateSuffix: brand.templateSuffix,
          ruleSet: brand.ruleSet
        }
      });

      if (result.data?.collectionCreate?.collection) {
        console.log(`✓ ${brand.title}`);
        created++;
      } else if (result.data?.collectionCreate?.userErrors?.length > 0) {
        console.log(`⚠ ${brand.title}: ${result.data.collectionCreate.userErrors[0].message}`);
      }
    } catch (err) {
      console.log(`✗ ${brand.title}: ${err.message}`);
      failed++;
    }

    await delay(300);

    // Create subcollections
    for (const sub of brand.subcollections) {
      try {
        const brandTag = brand.ruleSet.rules[0].condition;
        const result = await graphqlRequest(CREATE_COLLECTION_MUTATION, {
          input: {
            title: sub.title,
            handle: sub.handle,
            ruleSet: {
              appliedDisjunctively: false,
              rules: [
                { column: 'TAG', relation: 'EQUALS', condition: brandTag },
                { column: 'TAG', relation: 'EQUALS', condition: sub.tag }
              ]
            }
          }
        });

        if (result.data?.collectionCreate?.collection) {
          console.log(`  ✓ ${sub.title}`);
          created++;
        } else if (result.data?.collectionCreate?.userErrors?.length > 0) {
          console.log(`  ⚠ ${sub.title}: ${result.data.collectionCreate.userErrors[0].message}`);
        }
      } catch (err) {
        console.log(`  ✗ ${sub.title}: ${err.message}`);
        failed++;
      }

      await delay(300);
    }
  }

  console.log('\n========================================');
  console.log(`Done! Created: ${created}, Failed: ${failed}`);
  console.log('========================================\n');
  console.log('Next: Tag your products with brand + subcategory tags');
}

createAllCollections().catch(console.error);

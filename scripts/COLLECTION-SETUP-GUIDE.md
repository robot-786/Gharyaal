# Gharyaal Watch Store - Collection Setup Guide

## Overview

This guide explains how to set up all brand collections and subcollections in your Shopify store.

## Method 1: Using the Script (Recommended)

### Prerequisites
1. Access to Shopify Admin
2. Node.js installed on your computer

### Setup Steps

1. **Create a Custom App in Shopify**
   - Go to: Shopify Admin → Settings → Apps and sales channels → Develop apps
   - Click "Create an app"
   - Name it "Collection Creator"
   - Configure Admin API scopes: `write_products`, `read_products`
   - Install the app
   - Copy the **Admin API access token**

2. **Configure the Script**
   - Open `scripts/create-collections.js`
   - Update line 22: `const SHOP_DOMAIN = 'your-store.myshopify.com';`
   - Update line 23: `const ACCESS_TOKEN = 'your-admin-api-access-token';`

3. **Run the Script**
   ```bash
   cd d:\COODE\WEB\gharyal\ghayalpk
   node scripts/create-collections.js
   ```

4. **Verify Collections**
   - Go to Shopify Admin → Products → Collections
   - You should see all brand collections and subcollections

---

## Collection Structure

### Brand Collections (use `collection.brand` template)

| Brand | Handle | Tag Required |
|-------|--------|--------------|
| Rolex | `rolex` | `rolex` |
| Patek Philippe | `patek-philippe` | `patek-philippe` |
| Audemars Piguet | `audemars-piguet` | `audemars-piguet` |
| Tissot | `tissot` | `tissot` |
| Tag Heuer | `tag-heuer` | `tag-heuer` |
| Omega | `omega` | `omega` |
| Hublot | `hublot` | `hublot` |
| OZ/RX Quality | `oz-rx-quality` | `oz-rx-quality` |
| Stone Watches | `stone-watches` | `stone-watches` |
| Women Watches | `women-watches` | `women-watches` |
| Budget Watches | `budget-watches` | `budget-watches` |

### Subcollections (use default template)

#### Rolex Subcollections
| Collection | Handle | Tags Required |
|------------|--------|---------------|
| Rolex Daydate | `rolex-daydate` | `rolex` + `daydate` |
| Rolex Datejust | `rolex-datejust` | `rolex` + `datejust` |
| Rolex Submariner | `rolex-submariner` | `rolex` + `submariner` |
| Rolex GMT | `rolex-gmt` | `rolex` + `gmt` |
| Rolex Skydweller | `rolex-skydweller` | `rolex` + `skydweller` |
| Rolex Land Dweller | `rolex-land-dweller` | `rolex` + `land-dweller` |
| Rolex Daytona | `rolex-daytona` | `rolex` + `daytona` |
| Rolex Oyster Perpetual | `rolex-oyster-perpetual` | `rolex` + `oyster-perpetual` |
| Rolex Yacht Master | `rolex-yacht-master` | `rolex` + `yacht-master` |
| Rolex Explorer | `rolex-explorer` | `rolex` + `explorer` |
| Rolex 1908 | `rolex-1908` | `rolex` + `1908` |

#### Patek Philippe Subcollections
| Collection | Handle | Tags Required |
|------------|--------|---------------|
| Patek Philippe Nautilus | `patek-philippe-nautilus` | `patek-philippe` + `nautilus` |
| Patek Philippe Aquanaut | `patek-philippe-aquanaut` | `patek-philippe` + `aquanaut` |
| Patek Philippe Skeleton | `patek-philippe-skeleton` | `patek-philippe` + `skeleton` |
| Patek Philippe Side Second | `patek-philippe-side-second` | `patek-philippe` + `side-second` |
| Patek Philippe Power Reserve | `patek-philippe-power-reserve` | `patek-philippe` + `power-reserve` |
| Patek Philippe Cubitus | `patek-philippe-cubitus` | `patek-philippe` + `cubitus` |
| Patek Philippe Strap | `patek-philippe-strap` | `patek-philippe` + `strap` |

#### Audemars Piguet Subcollections
| Collection | Handle | Tags Required |
|------------|--------|---------------|
| Audemars Piguet Automatic | `audemars-piguet-automatic` | `audemars-piguet` + `automatic` |
| Audemars Piguet Chronograph | `audemars-piguet-chronograph` | `audemars-piguet` + `chronograph` |
| Audemars Piguet Offshore | `audemars-piguet-offshore` | `audemars-piguet` + `offshore` |
| Audemars Piguet Skeleton | `audemars-piguet-skeleton` | `audemars-piguet` + `skeleton` |
| Audemars Piguet Strap | `audemars-piguet-strap` | `audemars-piguet` + `strap` |

#### Tissot Subcollections
| Collection | Handle | Tags Required |
|------------|--------|---------------|
| Tissot Strap | `tissot-strap` | `tissot` + `strap` |
| Tissot Bracelet | `tissot-bracelet` | `tissot` + `bracelet` |

#### Tag Heuer Subcollections
| Collection | Handle | Tags Required |
|------------|--------|---------------|
| Tag Heuer Strap | `tag-heuer-strap` | `tag-heuer` + `strap` |
| Tag Heuer Bracelet | `tag-heuer-bracelet` | `tag-heuer` + `bracelet` |

#### Omega Subcollections
| Collection | Handle | Tags Required |
|------------|--------|---------------|
| Omega Strap | `omega-strap` | `omega` + `strap` |
| Omega Bracelet | `omega-bracelet` | `omega` + `bracelet` |

#### OZ/RX Quality Subcollections
| Collection | Handle | Tags Required |
|------------|--------|---------------|
| OZ/RX Rolex | `oz-rx-quality-rolex` | `oz-rx-quality` + `rolex` |
| OZ/RX Audemars Piguet | `oz-rx-quality-audemars-piguet` | `oz-rx-quality` + `audemars-piguet` |
| OZ/RX Patek Philippe | `oz-rx-quality-patek-philippe` | `oz-rx-quality` + `patek-philippe` |

#### Stone Watches Subcollections
| Collection | Handle | Tags Required |
|------------|--------|---------------|
| Stone Watches Strap | `stone-watches-strap` | `stone-watches` + `strap` |
| Stone Watches Bracelet | `stone-watches-bracelet` | `stone-watches` + `bracelet` |

#### Women Watches Subcollections
| Collection | Handle | Tags Required |
|------------|--------|---------------|
| Women Watches Strap | `women-watches-strap` | `women-watches` + `strap` |
| Women Watches Bracelet | `women-watches-bracelet` | `women-watches` + `bracelet` |

#### Budget Watches Subcollections
| Collection | Handle | Tags Required |
|------------|--------|---------------|
| Budget Watches Strap | `budget-watches-strap` | `budget-watches` + `strap` |
| Budget Watches Bracelet | `budget-watches-bracelet` | `budget-watches` + `bracelet` |

---

## Product Tagging Guide

For products to automatically appear in the correct collections, tag them properly:

### Example 1: Rolex Submariner Watch
**Tags:** `rolex, submariner`
- Will appear in: Rolex (main) + Rolex Submariner (subcollection)

### Example 2: Patek Philippe Nautilus with Strap
**Tags:** `patek-philippe, nautilus, strap`
- Will appear in: Patek Philippe (main) + Patek Philippe Nautilus + Patek Philippe Strap

### Example 3: OZ/RX Quality Rolex
**Tags:** `oz-rx-quality, rolex`
- Will appear in: OZ/RX Quality (main) + OZ/RX Rolex

### Example 4: Women's Watch with Bracelet
**Tags:** `women-watches, bracelet`
- Will appear in: Women Watches (main) + Women Watches Bracelet

### Example 5: Hublot Watch (no subcategory)
**Tags:** `hublot`
- Will appear in: Hublot (main only - no subcollections)

---

## Method 2: Manual Creation in Shopify Admin

If you prefer to create collections manually:

1. Go to **Products → Collections → Create collection**
2. Choose **Automated** (smart collection)
3. Set the conditions:
   - For brand collection: Product tag **is equal to** `brand-tag`
   - For subcollection: Product tag **is equal to** `brand-tag` **AND** Product tag **is equal to** `subcategory-tag`
4. For brand collections, set Template to `collection.brand`
5. For subcollections, use the default template

---

## Transferring Theme to Client's Store

1. Push your theme changes:
   ```bash
   shopify theme push
   ```

2. Export theme as ZIP:
   ```bash
   shopify theme pull --store your-dev-store
   ```

3. On client's store:
   ```bash
   shopify theme push --store client-store.myshopify.com
   ```

4. Run the collection script on client's store (update SHOP_DOMAIN and ACCESS_TOKEN)

5. Tag products appropriately

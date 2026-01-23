# Gharyaal Watch Store - Shopify Setup Guide

Complete guide for setting up collections, adding products, and configuring your luxury watch store.

---

## Table of Contents
1. [Setting Up Collections](#1-setting-up-collections)
2. [Assigning Brand Templates](#2-assigning-brand-templates)
3. [Adding Products via CSV Import](#3-adding-products-via-csv-import)
4. [Manual Product Creation](#4-manual-product-creation)
5. [Automatic Categorization System](#5-automatic-categorization-system)
6. [Theme Settings](#6-theme-settings)
7. [Navigation Menu Setup](#7-navigation-menu-setup)

---

## 1. Setting Up Collections

### Step 1.1: Create Main Brand Collections

1. **Go to Shopify Admin** → **Products** → **Collections**
2. Click **"Create collection"**
3. For each main brand, create a collection with these exact handles:

| Collection Title | Handle (URL) | Description |
|-----------------|--------------|-------------|
| Rolex | `rolex` | Luxury Swiss watches by Rolex |
| Patek Philippe | `patek-philippe` | Premium Patek Philippe timepieces |
| Audemars Piguet | `audemars-piguet` | High-end AP watches |
| Tissot | `tissot` | Swiss-made Tissot watches |
| Tag Heuer | `tag-heuer` | Sporty Tag Heuer chronographs |
| Omega | `omega` | Iconic Omega watches |
| Hublot | `hublot` | Modern luxury Hublot watches |
| OZ/RX Quality | `oz-rx-quality` | Premium quality replicas |
| Stone Watches | `stone-watches` | Watches with stone embellishments |
| Women Watches | `women-watches` | Ladies watch collection |
| Budget Watches | `budget-watches` | Affordable luxury alternatives |

**Important:** The handle (URL) must match exactly as shown above for the system to work.

### Step 1.2: Create Subcategory Collections

For each brand, create subcollections using this format: `{brand}-{subcategory}`

#### **Rolex Subcategories:**
- `rolex-daydate` → Rolex Day-Date
- `rolex-datejust` → Rolex Datejust
- `rolex-submariner` → Rolex Submariner
- `rolex-gmt` → Rolex GMT-Master
- `rolex-skydweller` → Rolex Sky-Dweller
- `rolex-land-dweller` → Rolex Sea-Dweller
- `rolex-daytona` → Rolex Daytona
- `rolex-oyster-perpetual` → Rolex Oyster Perpetual
- `rolex-yacht-master` → Rolex Yacht-Master

#### **Patek Philippe Subcategories:**
- `patek-philippe-nautilus` → Patek Philippe Nautilus
- `patek-philippe-aquanaut` → Patek Philippe Aquanaut
- `patek-philippe-skeleton` → Patek Philippe Skeleton
- `patek-philippe-side-second` → Patek Philippe Side Second
- `patek-philippe-power-reserve` → Patek Philippe Power Reserve
- `patek-philippe-cubitus` → Patek Philippe Cubitus
- `patek-philippe-strap` → Patek Philippe with Strap

#### **Audemars Piguet Subcategories:**
- `audemars-piguet-automatic` → AP Automatic
- `audemars-piguet-chronograph` → AP Chronograph
- `audemars-piguet-offshore` → AP Royal Oak Offshore
- `audemars-piguet-skeleton` → AP Skeleton
- `audemars-piguet-strap` → AP with Strap

#### **Tissot, Tag Heuer, Omega Subcategories:**
- `tissot-strap` / `tissot-bracelet`
- `tag-heuer-strap` / `tag-heuer-bracelet`
- `omega-strap` / `omega-bracelet`

#### **OZ/RX Quality Subcategories:**
- `oz-rx-quality-rolex` → OZ/RX Rolex Quality
- `oz-rx-quality-audemars-piguet` → OZ/RX AP Quality
- `oz-rx-quality-patek-philippe` → OZ/RX Patek Quality

#### **Stone, Women, Budget Subcategories:**
- `stone-watches-strap` / `stone-watches-bracelet`
- `women-watches-strap` / `women-watches-bracelet`
- `budget-watches-strap` / `budget-watches-bracelet`

### Step 1.3: Collection Type Settings

For each collection:
1. **Collection type:** Choose "Manual" for main brand collections
2. **Collection type:** Choose "Automated" for subcategories (optional)
   - If automated, set conditions like: Product tag contains "daydate" for rolex-daydate
3. **SEO:** Add meta title and description for each collection
4. **Image:** Upload collection banner image (optional)

---

## 2. Assigning Brand Templates

### Step 2.1: Assign Template to Main Brand Collections

1. Go to **Products** → **Collections**
2. Click on a main brand collection (e.g., "Rolex")
3. Scroll down to **"Theme templates"** section
4. Click **"Change"** next to Template
5. Select **"collection.brand"** from dropdown
6. Click **"Save"**

**Apply this template to:**
- ✅ Rolex
- ✅ Patek Philippe
- ✅ Audemars Piguet
- ✅ Tissot
- ✅ Tag Heuer
- ✅ Omega
- ✅ Hublot
- ✅ OZ/RX Quality
- ✅ Stone Watches
- ✅ Women Watches
- ✅ Budget Watches

**Do NOT apply to subcategory collections** - they use the default template.

### Step 2.2: Verify Brand Logos

Make sure these logo files are uploaded to **Settings** → **Files**:
- `brand-rolex-logo.png`
- `brand-patek-logo.png`
- `brand-ap-logo.png`
- `brand-omega-logo.png`
- `brand-th-logo.png`
- `brand-tissot-logo.png`
- `brand-hublot-logo.png`

---

## 3. Adding Products via CSV Import

### Step 3.1: Prepare Your Images

1. **Convert HEIC to JPG:**
   ```bash
   # Install required packages
   pip install pillow pillow-heif
   
   # Run conversion script
   python convert_heic_to_jpg.py
   ```

2. **Upload images to hosting service:**
   - Upload all converted JPG images to your CDN/hosting
   - Or upload to Shopify Files: **Settings** → **Files** → **Upload files**
   - Note the base URL (e.g., `https://cdn.shopify.com/s/files/1/your-store/`)

### Step 3.2: Generate Product CSV

1. **Update the script configuration:**
   ```python
   # In generate_product_csv.py
   FOLDER_PATH = r"D:\Downloads\Rolex\Rolex"  # Your folder path
   BASE_URL = "https://cdn.shopify.com/s/files/1/your-store/"  # Your image URL
   DEFAULT_PRICE = 25000  # Adjust your base price
   DEFAULT_COMPARE_PRICE = 35000  # Adjust your compare price
   ```

2. **Run the generator:**
   ```bash
   python generate_product_csv.py
   ```

3. **Review the CSV:**
   - Open `shopify_products.csv` in Excel or Google Sheets
   - Verify product titles, collections, and image URLs
   - Adjust prices if needed

### Step 3.3: Import to Shopify

1. Go to **Products** → **All products**
2. Click **"Import"** button (top right)
3. Click **"Add file"** and select `shopify_products.csv`
4. Click **"Upload and continue"**
5. Review the import preview
6. Click **"Import products"**
7. Wait for import to complete (may take several minutes)

### Step 3.4: Verify Import

1. Check **Products** → **All products** to see imported products
2. Click on a product to verify:
   - ✅ Title is correct
   - ✅ Images are displayed
   - ✅ Collections are assigned (both main brand and subcategory)
   - ✅ Tags are correct
   - ✅ Price and compare price are set

---

## 4. Manual Product Creation

If you want to add products manually (without CSV):

### Step 4.1: Create New Product

1. Go to **Products** → **All products**
2. Click **"Add product"**
3. Fill in the details:

**Title:** `Rolex Submariner - Black Ceramic Bezel`

**Description:**
```html
<p>ROLEX - SUBMARINER - BLACK CERAMIC BEZEL</p>
<p>Premium quality luxury timepiece</p>
```

**Media:** Upload 3+ product images

**Pricing:**
- Price: `25000`
- Compare at price: `35000`

### Step 4.2: Product Organization

**Collections:** (CRITICAL for automatic categorization)
- Select `rolex` (main brand)
- Select `rolex-submariner` (subcategory)
- The product will now appear on both collection pages

**Tags:** (for filtering)
```
rolex, submariner, luxury, automatic, super-clone, black, ceramic
```

**Product type:** `Watches`

**Vendor:** `Gharyaal`

**Product category:** `Accessories > Jewelry > Watches`

### Step 4.3: SEO

- **SEO title:** Keep default or customize
- **SEO description:** Add compelling description
- **URL handle:** Auto-generated from title

Click **"Save"**

---

## 5. Automatic Categorization System

### How It Works

Your store uses a **dual-collection assignment system** that automatically sorts products:

#### **Folder Structure → Collections Mapping**

```
CSV Generator reads folder structure:
ROLEX/SUBMARINER/Product1/ → Collections: rolex, rolex-submariner
PATEK/NAUTILUS/Product2/   → Collections: patek-philippe, patek-philippe-nautilus
```

#### **Product Display Logic**

1. **Main Brand Page** (`/collections/rolex`):
   - Shows ALL products in the `rolex` collection
   - Displays subcategory filter links (Daydate, Submariner, etc.)
   - Uses the `collection.brand` template with centered logo

2. **Subcategory Page** (`/collections/rolex-submariner`):
   - Shows ONLY products in the `rolex-submariner` collection
   - Uses default collection template
   - No duplicate products across subcategories

3. **Collections Page** (`/collections`):
   - Shows brand logo grid
   - Links to main brand collections

### Example Product Flow

**Product:** Rolex Submariner Black Bezel
- **Assigned to:** `rolex`, `rolex-submariner`
- **Appears on:**
  - ✅ `/collections/rolex` (All Rolex products)
  - ✅ `/collections/rolex-submariner` (Submariner models only)
  - ❌ `/collections/rolex-daydate` (Not in this collection)

### Tags for Additional Filtering

Products also get tags for features:
- Brand: `rolex`, `patek philippe`, etc.
- Model: `submariner`, `daydate`, `nautilus`, etc.
- Features: `automatic`, `skeleton`, `chronograph`, etc.
- Material: `ceramic`, `steel`, `gold`, etc.
- Style: `strap`, `bracelet`, `luxury`, `super-clone`

You can create filters using these tags in **Online Store** → **Navigation** → **Filters**

---

## 6. Theme Settings

### Step 6.1: Configure Homepage

1. Go to **Online Store** → **Themes**
2. Click **"Customize"** on your active theme
3. Navigate to homepage sections:

**Shop By Brand Section:**
- Section should already be added
- Heading: "Shop By Brand"
- Shows 7 brand logos in horizontal scroll

### Step 6.2: Configure Collections Page

1. In the theme editor, navigate to **Templates** → **Collections list**
2. The "Brand Collections Grid" section should be active
3. Adjust settings:
   - Heading: "Shop By Brand"
   - Grid layout: 4 columns desktop, 2 columns mobile

### Step 6.3: Configure Brand Pages

1. Navigate to **Templates** → **Collection** → **collection.brand**
2. This template is used for main brand pages
3. Shows:
   - Centered brand logo
   - Brand name
   - Subcategory links
   - Product grid

---

## 7. Navigation Menu Setup

### Step 7.1: Create Main Navigation

1. Go to **Online Store** → **Navigation**
2. Click on **"Main menu"**
3. Add menu items:

```
Home (/)
Shop By Brand (dropdown)
  ├─ Rolex (/collections/rolex)
  ├─ Patek Philippe (/collections/patek-philippe)
  ├─ Audemars Piguet (/collections/audemars-piguet)
  ├─ Omega (/collections/omega)
  ├─ Tag Heuer (/collections/tag-heuer)
  ├─ Tissot (/collections/tissot)
  └─ Hublot (/collections/hublot)
All Collections (/collections)
Contact (/pages/contact)
```

### Step 7.2: Add Nested Subcategories (Optional)

For better organization, you can create nested menus:

```
Shop By Brand
  ├─ Rolex (/collections/rolex)
  │   ├─ Day-Date (/collections/rolex-daydate)
  │   ├─ Datejust (/collections/rolex-datejust)
  │   ├─ Submariner (/collections/rolex-submariner)
  │   └─ [Other Rolex models]
  ├─ Patek Philippe (/collections/patek-philippe)
  │   ├─ Nautilus (/collections/patek-philippe-nautilus)
  │   └─ [Other PP models]
  └─ [Other brands]
```

### Step 7.3: Mobile Menu (Hamburger)

Your theme already has a hamburger menu configured for both desktop and mobile:
- Located in `sections/header-drawer.liquid`
- Automatically uses the main navigation menu
- Shows all brands and subcategories

---

## Quick Reference Cheat Sheet

### Collection Handle Format
```
Main Brand:    {brand-name}
Subcategory:   {brand-name}-{model-name}

Examples:
- rolex
- rolex-submariner
- patek-philippe
- patek-philippe-nautilus
```

### CSV Import Workflow
```
1. Download images from Google Drive
2. Run: python convert_heic_to_jpg.py
3. Upload images to CDN/Shopify
4. Update BASE_URL in generate_product_csv.py
5. Run: python generate_product_csv.py
6. Import shopify_products.csv to Shopify
7. Verify products and collections
```

### Product Must-Have Fields
```
✅ Title
✅ At least 3 images
✅ Price & Compare price
✅ Collections: main brand + subcategory
✅ Tags: brand, model, features
✅ Vendor: Gharyaal
✅ Product type: Watches
```

### Brand Template Assignment
```
Apply collection.brand template to:
✅ Main brand collections only
❌ NOT to subcategory collections
```

---

## Troubleshooting

### Products not showing in collection?
- Check if product is assigned to the correct collection handle
- Verify collection handle matches exactly (no typos)
- Check if product is published (not draft)

### Brand logo not displaying?
- Verify logo file is uploaded to assets folder
- Check filename matches: `brand-{brand}-logo.png`
- Clear browser cache and refresh

### CSV import failed?
- Check CSV file encoding (UTF-8)
- Verify all required columns are present
- Ensure image URLs are accessible
- Check for special characters in product names

### Subcategories not showing on brand page?
- Verify subcategory collection exists
- Check collection handle format: `{brand}-{model}`
- Ensure subcollection has products assigned

---

## Support

For additional help:
- Shopify Help Center: https://help.shopify.com
- Theme Support: Contact theme developer
- Technical Issues: Check browser console for errors

---

**Last Updated:** January 18, 2026  
**Version:** 1.0  
**Theme:** Shopify Horizon v3.2.1 (Customized)

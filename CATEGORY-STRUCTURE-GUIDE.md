# Gharyaal Watch Store - Category & Brand Structure Guide

## 📋 Store Structure Overview

### 7 Brand Categories:
1. **Rolex** → Subcategories: Submariner, Daytona, Datejust, GMT-Master, etc.
2. **Patek Philippe** → Subcategories: Nautilus, Aquanaut, Calatrava, Complications, etc.
3. **Audemars Piguet** → Subcategories: Royal Oak, Royal Oak Offshore, Code 11.59, etc.
4. **Omega** → Subcategories: Speedmaster, Seamaster, Constellation, De Ville, etc.
5. **Hublot** → Subcategories: Big Bang, Classic Fusion, Spirit of Big Bang, etc.
6. **Tissot** → Subcategories: PRX, Gentleman, Seastar, Le Locle, etc.
7. **Tag Heuer** → Subcategories: Carrera, Monaco, Aquaracer, Formula 1, etc.

### 4 Special Categories:
8. **Ladies Watches** → Subcategories by brand/style
9. **Stone Watches** → Subcategories by stone type/brand
10. **Budget Watches** → Subcategories by price range
11. **Super Clones** → Subcategories by brand/quality level

---

## 🏗️ Shopify Collection Structure

### Step 1: Create Main Collections

In Shopify Admin → Products → Collections:

```
Main Collections (11 total):
├── rolex
├── patek-philippe
├── audemars-piguet
├── omega
├── hublot
├── tissot
├── tag-heuer
├── ladies-watches
├── stone-watches
├── budget-watches
└── super-clones
```

### Step 2: Create Subcollections

For each brand, create subcollections with naming convention: `brand-subcategory`

**Example - Rolex Subcollections:**
```
rolex-submariner
rolex-daytona
rolex-datejust
rolex-gmt-master
rolex-day-date
rolex-oyster-perpetual
rolex-sky-dweller
rolex-yacht-master
rolex-explorer
rolex-cosmograph
```

**Example - Patek Philippe Subcollections:**
```
patek-philippe-nautilus
patek-philippe-aquanaut
patek-philippe-calatrava
patek-philippe-complications
patek-philippe-grand-complications
patek-philippe-twenty-4
patek-philippe-golden-ellipse
```

**Repeat for all 11 main categories.**

### Step 3: Tag Products Properly

Each product should have tags in this format:
```
Brand: Rolex
Category: rolex
Subcategory: rolex-submariner
Type: Luxury
Condition: Super Clone
```

**Example Product Tags:**
- `brand:rolex`
- `category:rolex`
- `subcategory:rolex-submariner`
- `model:submariner-date`
- `quality:super-clone`
- `gender:mens`

---

## 📄 Collection Template Structure

### 1. Brand Landing Page (collection.brand.liquid)

Shows:
- Brand banner/hero
- Brand description
- Grid of subcategories with images
- Featured products from all subcategories

### 2. Subcategory Listing Page (collection.liquid)

Shows:
- Subcategory hero
- Breadcrumb: Home > Brand > Subcategory
- Product filters
- Product grid
- Pagination

---

## 🗂️ Recommended Subcategories

### Rolex (10 subcategories):
1. Submariner
2. Daytona
3. Datejust
4. GMT-Master II
5. Day-Date
6. Oyster Perpetual
7. Sky-Dweller
8. Yacht-Master
9. Explorer
10. Air-King

### Patek Philippe (8 subcategories):
1. Nautilus
2. Aquanaut
3. Calatrava
4. Complications
5. Grand Complications
6. Twenty~4 (Ladies)
7. Golden Ellipse
8. Gondolo

### Audemars Piguet (6 subcategories):
1. Royal Oak
2. Royal Oak Offshore
3. Royal Oak Concept
4. Code 11.59
5. Jules Audemars
6. Millenary

### Omega (8 subcategories):
1. Speedmaster
2. Seamaster
3. Constellation
4. De Ville
5. Seamaster Aqua Terra
6. Seamaster Planet Ocean
7. Seamaster Diver 300M
8. Speedmaster Moonwatch

### Hublot (5 subcategories):
1. Big Bang
2. Classic Fusion
3. Spirit of Big Bang
4. MP Collection
5. Square Bang

### Tissot (7 subcategories):
1. PRX
2. Gentleman
3. Seastar
4. Le Locle
5. Carson
6. Chemin des Tourelles
7. T-Race

### Tag Heuer (6 subcategories):
1. Carrera
2. Monaco
3. Aquaracer
4. Formula 1
5. Autavia
6. Link

### Ladies Watches (5 subcategories):
1. Ladies Rolex
2. Ladies Cartier
3. Ladies Patek Philippe
4. Ladies Omega
5. Fashion Ladies Watches

### Stone Watches (4 subcategories):
1. Diamond Bezel Watches
2. Gemstone Dial Watches
3. Iced Out Watches
4. Mother of Pearl Watches

### Budget Watches (4 subcategories):
1. Under PKR 10,000
2. PKR 10,000 - 20,000
3. PKR 20,000 - 50,000
4. PKR 50,000 - 100,000

### Super Clones (7 subcategories):
1. Super Clone Rolex
2. Super Clone Patek Philippe
3. Super Clone AP
4. Super Clone Omega
5. Super Clone Hublot
6. Super Clone Cartier
7. Super Clone Richard Mille

---

## 🎯 Implementation Steps

### Phase 1: Collections Setup (Shopify Admin)
1. ✅ Create 11 main collections
2. ✅ Create 60-80 subcollections (each brand has 4-10)
3. ✅ Set collection handles properly (URL-friendly)
4. ✅ Add collection images/banners
5. ✅ Write collection descriptions

### Phase 2: Product Organization
1. ✅ Tag all products with proper tags
2. ✅ Add products to main collections (automatic via tags)
3. ✅ Add products to subcollections (automatic via tags)
4. ✅ Set up collection filters

### Phase 3: Template Creation
1. ✅ Create brand landing page template
2. ✅ Create subcategory listing template
3. ✅ Update navigation menus
4. ✅ Add breadcrumbs

### Phase 4: Navigation Setup
1. ✅ Main menu: Show 11 categories
2. ✅ Mega menu: Show subcategories on hover
3. ✅ Footer: Quick links to popular subcategories
4. ✅ Brand pages: Grid of subcategories

---

## 📱 Example URLs Structure

```
Homepage: gharyaal.pk

Brand Pages:
- gharyaal.pk/collections/rolex
- gharyaal.pk/collections/patek-philippe
- gharyaal.pk/collections/audemars-piguet

Subcategory Pages:
- gharyaal.pk/collections/rolex-submariner
- gharyaal.pk/collections/rolex-daytona
- gharyaal.pk/collections/patek-philippe-nautilus
- gharyaal.pk/collections/ap-royal-oak

Special Categories:
- gharyaal.pk/collections/ladies-watches
- gharyaal.pk/collections/super-clones
- gharyaal.pk/collections/budget-watches

Subcategories of Special:
- gharyaal.pk/collections/ladies-rolex
- gharyaal.pk/collections/super-clone-rolex
- gharyaal.pk/collections/under-10000
```

---

## 🔍 Collection Filtering Logic

### Using Shopify Tags for Auto-Collections

**Example: Rolex Submariner Collection**
```
Collection Handle: rolex-submariner
Automated Conditions:
- Product tag CONTAINS "brand:rolex"
- AND Product tag CONTAINS "subcategory:rolex-submariner"
```

**Example: Ladies Watches Collection**
```
Collection Handle: ladies-watches
Automated Conditions:
- Product tag CONTAINS "gender:ladies"
- OR Product tag CONTAINS "category:ladies-watches"
```

**Example: Super Clone Rolex**
```
Collection Handle: super-clone-rolex
Automated Conditions:
- Product tag CONTAINS "brand:rolex"
- AND Product tag CONTAINS "quality:super-clone"
```

---

## 📊 Sample Product Tagging

**Product: Rolex Submariner Date 41mm Super Clone**
```
Tags:
- brand:rolex
- category:rolex
- subcategory:rolex-submariner
- model:submariner-date
- size:41mm
- quality:super-clone
- gender:mens
- type:luxury
- feature:ceramic-bezel
- movement:automatic
```

This product will appear in:
1. Main Rolex collection
2. Rolex Submariner subcollection
3. Super Clones collection
4. Super Clone Rolex subcollection
5. Mens Watches (if that collection exists)

---

## 🎨 Next Steps

I'll create:
1. **Brand Landing Page Template** - Shows subcategories grid
2. **Collection List Section** - Displays subcollections beautifully
3. **Mega Menu Navigation** - For easy browsing
4. **Breadcrumb Component** - For navigation clarity

Ready to proceed with template creation?

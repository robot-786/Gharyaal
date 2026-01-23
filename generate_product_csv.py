#!/usr/bin/env python3
"""
Shopify Product CSV Generator for Watch Products
Processes folders with product images to create Shopify import CSV

Usage:
1. Download the Google Drive folder to your local machine
2. Update the FOLDER_PATH variable below
3. Run: python generate_product_csv.py
"""

import os
import csv
import re
from pathlib import Path

# Configuration
FOLDER_PATH = r"D:\Downloads\Rolex\Rolex"  # Update this path
OUTPUT_FILE = "shopify_products.csv"
BASE_URL = "https://gharyaalbytaimour.com/data/images/"  # Update with your CDN/image hosting URL
VENDOR = "Gharyaal"
PRODUCT_CATEGORY = "Accessories > Jewelry > Watches"
PRODUCT_TYPE = "Watches"
DEFAULT_PRICE = 25000
DEFAULT_COMPARE_PRICE = 35000

# Brand mapping for collections and tags
BRAND_MAPPING = {
    'rolex': 'rolex',
    'patek': 'patek-philippe', 
    'philippe': 'patek-philippe',
    'ap': 'audemars-piguet',
    'audemars': 'audemars-piguet',
    'piguet': 'audemars-piguet',
    'tissot': 'tissot',
    'tag': 'tag-heuer',
    'heuer': 'tag-heuer',
    'omega': 'omega',
    'hublot': 'hublot',
    'oz': 'oz-rx-quality',
    'rx': 'oz-rx-quality',
    'stone': 'stone-watches',
    'women': 'women-watches',
    'budget': 'budget-watches'
}

# Subcategory mapping for specific models
SUBCATEGORY_MAPPING = {
    # Rolex subcategories
    'daydate': 'daydate',
    'datejust': 'datejust', 
    'submariner': 'submariner',
    'gmt': 'gmt',
    'skydweller': 'skydweller',
    'land': 'land-dweller',
    'dweller': 'land-dweller',
    'daytona': 'daytona',
    'oyster': 'oyster-perpetual',
    'perpetual': 'oyster-perpetual',
    'yacht': 'yacht-master',
    'master': 'yacht-master',
    
    # Patek Philippe subcategories
    'nautilus': 'nautilus',
    'aquanaut': 'aquanaut',
    'skeleton': 'skeleton',
    'side': 'side-second',
    'second': 'side-second',
    'power': 'power-reserve',
    'reserve': 'power-reserve',
    'cubitus': 'cubitus',
    
    # Audemars Piguet subcategories
    'automatic': 'automatic',
    'chronograph': 'chronograph',
    'offshore': 'offshore',
    
    # General subcategories
    'strap': 'strap',
    'bracelet': 'bracelet'
}

def clean_handle(text):
    """Convert text to Shopify handle format"""
    handle = re.sub(r'[^a-zA-Z0-9\s-]', '', text.lower())
    handle = re.sub(r'\s+', '-', handle)
    return handle.strip('-')

def extract_collections_from_path(relative_path):
    """Extract collections from the full folder path"""
    path_components = [comp.lower() for comp in relative_path.split(os.sep)]
    collections = []
    brand_found = None
    subcategory_found = None
    
    # First, find the main brand collection
    for component in path_components:
        for brand_key, brand_value in BRAND_MAPPING.items():
            if brand_key in component:
                collections.append(brand_value)
                brand_found = brand_value
                break
        if brand_found:
            break
    
    # Then find subcategory within the path
    for component in path_components:
        # Clean component for matching
        clean_component = re.sub(r'[^a-zA-Z]', '', component)
        
        # Check against subcategory mapping
        for sub_key, sub_value in SUBCATEGORY_MAPPING.items():
            if sub_key in clean_component:
                subcategory_found = sub_value
                break
        if subcategory_found:
            break
    
    # Create brand-subcategory collection if both found
    if brand_found and subcategory_found:
        # Special handling for OZ/RX quality which has brand subcategories
        if brand_found == 'oz-rx-quality':
            # For OZ/RX, the subcategory is actually the original brand
            # Example: OZ/ROLEX -> oz-rx-quality-rolex
            oz_subcategories = ['rolex', 'audemars-piguet', 'patek-philippe']
            for oz_sub in oz_subcategories:
                if any(brand in component for component in path_components 
                       for brand, value in BRAND_MAPPING.items() 
                       if value == oz_sub):
                    collections.append(f"{brand_found}-{oz_sub}")
                    break
        else:
            # Normal brand-subcategory combination
            collections.append(f"{brand_found}-{subcategory_found}")
    
    # Fallback: create collection from first two path components if no mapping found
    if not collections and len(path_components) >= 2:
        brand_part = clean_handle(path_components[0])
        model_part = clean_handle(path_components[1])
        collections.append(f"{brand_part}-{model_part}")
    
    # Remove duplicates and return
    return list(set(collections))

def generate_product_data(folder_path, folder_name, relative_path):
    """Generate product data from folder"""
    # Get images from folder (including subfolders)
    # Note: HEIC files should be converted to JPG first using convert_heic_to_jpg.py
    image_files = []
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.webp']:
        # Use rglob to search recursively in subfolders
        image_files.extend(list(Path(folder_path).rglob(ext)))
    
    image_files = sorted(image_files)
    
    if len(image_files) < 3:
        print(f"Need at least 3 images in {folder_name}, found {len(image_files)}")
        return None
    
    # Get the last 2 images to append to each product
    last_two_images = image_files[-2:]
    # Get the remaining images (first n-2 images) to create individual products
    main_images = image_files[:-2]
    
    # Extract collections and tags
    collections = extract_collections_from_path(relative_path)
    collection_string = ','.join(collections)
    
    # Extract brand and subcategory for tags
    path_components = [comp.lower() for comp in relative_path.split(os.sep)]
    brand_tag = 'luxury'
    subcategory_tag = None
    
    # Find brand
    for component in path_components:
        for brand_key, brand_value in BRAND_MAPPING.items():
            if brand_key in component:
                brand_tag = brand_value.replace('-', ' ')
                break
        if brand_tag != 'luxury':
            break
    
    # Find subcategory
    for component in path_components:
        clean_component = re.sub(r'[^a-zA-Z]', '', component)
        for sub_key, sub_value in SUBCATEGORY_MAPPING.items():
            if sub_key in clean_component:
                subcategory_tag = sub_value.replace('-', ' ')
                break
        if subcategory_tag:
            break
    
    # Generate base title from folder name
    base_title = folder_name.replace('-', ' ').replace('_', ' ').title()
    
    # Generate description from full path
    path_components = relative_path.split(os.sep)
    # Clean up each component and join with " - "
    cleaned_components = []
    for component in path_components:
        cleaned = component.replace('-', ' ').replace('_', ' ').upper()
        cleaned_components.append(cleaned)
    description = f"<p>{' - '.join(cleaned_components)}</p>"
    
    # Generate tags
    tags_list = [brand_tag, 'luxury', 'automatic', 'super-clone']
    if subcategory_tag:
        tags_list.append(subcategory_tag)
    tags = ','.join(tags_list)
    
    all_product_rows = []
    
    # Create a separate product for each main image
    for product_index, main_image in enumerate(main_images, 1):
        # Generate unique handle and title for each product
        handle = clean_handle(f"{folder_name}-{product_index}")
        title = f"{base_title} - {product_index}"
        sku = handle.upper().replace('-', '-')[:20]
        
        # Combine main image with last two images
        product_images = [main_image] + last_two_images
        
        # Create rows for this product (main image + 2 additional images)
        product_rows = []
        
        for i, image_file in enumerate(product_images):
            if i == 0:  # First row has all product data
                product_rows.append({
                    'Handle': handle,
                    'Title': title,
                    'Body (HTML)': description,
                    'Vendor': VENDOR,
                    'Product Category': PRODUCT_CATEGORY,
                    'Type': PRODUCT_TYPE,
                    'Tags': tags,
                    'Published': 'TRUE',
                    'Variant SKU': sku,
                    'Variant Price': DEFAULT_PRICE,
                    'Variant Compare At Price': DEFAULT_COMPARE_PRICE,
                    'Variant Weight': 150,
                    'Variant Weight Unit': 'g',
                    'Variant Requires Shipping': 'TRUE',
                    'Variant Taxable': 'TRUE',
                    'Image Src': f"{BASE_URL}{image_file.name}",
                    'Image Alt Text': f"{title} - Image {i+1}",
                    'Collection': collection_string,
                    'Status': 'active'
                })
            else:  # Additional image rows
                product_rows.append({
                    'Handle': '',
                    'Title': '',
                    'Body (HTML)': '',
                    'Vendor': '',
                    'Product Category': '',
                    'Type': '',
                    'Tags': '',
                    'Published': '',
                    'Variant SKU': '',
                    'Variant Price': '',
                    'Variant Compare At Price': '',
                    'Variant Weight': '',
                    'Variant Weight Unit': '',
                    'Variant Requires Shipping': '',
                    'Variant Taxable': '',
                    'Image Src': f"{BASE_URL}{image_file.name}",
                    'Image Alt Text': f"{title} - Image {i+1}",
                    'Collection': '',
                    'Status': ''
                })
        
        all_product_rows.extend(product_rows)
    
    return all_product_rows

def main():
    """Main function to process folders and generate CSV"""
    if not os.path.exists(FOLDER_PATH):
        print(f"Error: Folder path does not exist: {FOLDER_PATH}")
        print("Please update FOLDER_PATH in the script with your downloaded folder location")
        return
    
    print(f"Starting to process folder: {FOLDER_PATH}")
    print(f"Folder exists: {os.path.exists(FOLDER_PATH)}")
    print(f"Folder contents: {os.listdir(FOLDER_PATH)[:10]}")  # Show first 10 items
    print()
    
    csv_headers = [
        'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Product Category', 'Type', 'Tags',
        'Published', 'Variant SKU', 'Variant Price', 'Variant Compare At Price', 'Variant Weight',
        'Variant Weight Unit', 'Variant Requires Shipping', 'Variant Taxable',
        'Image Src', 'Image Alt Text', 'Collection', 'Status'
    ]
    
    all_rows = []
    processed_count = 0
    skipped_folders = []
    
    # Process each subfolder recursively
    def process_directory(current_path, relative_path="", depth=0):
        nonlocal processed_count
        
        print(f"{'  ' * depth}Checking directory: {relative_path or 'root'}")
        
        for item in os.listdir(current_path):
            item_path = os.path.join(current_path, item)
            current_relative = os.path.join(relative_path, item) if relative_path else item
            
            if os.path.isdir(item_path):
                # Check if this folder contains images (including subfolders)
                # Note: python generate_product_csv.py files should be converted to JPG first
                has_images = False
                image_count = 0
                for ext in ['*.jpg', '*.jpeg', '*.png', '*.webp']:
                    # Use rglob to search recursively
                    found_images = list(Path(item_path).rglob(ext))
                    image_count += len(found_images)
                    if found_images:
                        has_images = True
                
                print(f"{'  ' * (depth+1)}Found folder: {item} - Images: {image_count}")
                
                if has_images:
                    # This is a product folder
                    if image_count >= 3:
                        print(f"{'  ' * (depth+1)}✓ Processing as product: {current_relative}")
                        product_rows = generate_product_data(item_path, item, current_relative)
                        if product_rows:
                            all_rows.extend(product_rows)
                            processed_count += 1
                    else:
                        print(f"{'  ' * (depth+1)}✗ Skipped (need 3+ images): {current_relative}")
                        skipped_folders.append(f"{current_relative} (only {image_count} images)")
                else:
                    # This is a category folder, recurse into it
                    print(f"{'  ' * (depth+1)}→ Recursing into: {item}")
                    process_directory(item_path, current_relative, depth + 1)
    
    # Start processing from the root folder
    print("=" * 60)
    process_directory(FOLDER_PATH)
    print("=" * 60)
    
    # Write CSV file
    with open(OUTPUT_FILE, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=csv_headers)
        writer.writeheader()
        writer.writerows(all_rows)
    
    print(f"\nCSV generated successfully!")
    print(f"- File: {OUTPUT_FILE}")
    print(f"- Products processed: {processed_count}")
    print(f"- Total rows: {len(all_rows)}")
    
    if skipped_folders:
        print(f"\nSkipped folders (need 3+ images):")
        for folder in skipped_folders[:10]:  # Show first 10
            print(f"  - {folder}")
        if len(skipped_folders) > 10:
            print(f"  ... and {len(skipped_folders) - 10} more")
    
    print(f"\nNext steps:")
    print(f"1. Upload your product images to your image hosting service")
    print(f"2. Update the image URLs in the CSV file") 
    print(f"3. Review and adjust prices, descriptions, and other details")
    print(f"4. Import the CSV into Shopify Admin > Products > Import")

if __name__ == "__main__":
    main()
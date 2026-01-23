#!/usr/bin/env python3
"""
HEIC to JPEG Converter for Product Images
Converts all HEIC images in a folder structure to JPEG format

Usage:
1. Install required packages: pip install pillow pillow-heif
2. Update the FOLDER_PATH variable below
3. Run: python convert_heic_to_jpg.py
"""

import os
from pathlib import Path
from PIL import Image
from pillow_heif import register_heif_opener

# Register HEIF opener with Pillow
register_heif_opener()

# Configuration
FOLDER_PATH = r"D:\Downloads\Rolex\Rolex"  # Update this path
JPEG_QUALITY = 95  # Quality of output JPEG (1-100, 95 is high quality)
DELETE_ORIGINALS = False  # Set to True to delete HEIC files after conversion
OUTPUT_SUFFIX = ""  # Add suffix to converted files (e.g., "_converted") or leave empty

def convert_heic_to_jpeg(heic_path):
    """Convert a single HEIC file to JPEG"""
    try:
        # Open the HEIC image
        image = Image.open(heic_path)
        
        # Convert to RGB (JPEG doesn't support transparency)
        if image.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            background = Image.new('RGB', image.size, (255, 255, 255))
            if image.mode == 'P':
                image = image.convert('RGBA')
            background.paste(image, mask=image.split()[-1] if image.mode in ('RGBA', 'LA') else None)
            image = background
        elif image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Generate output filename
        output_path = heic_path.with_suffix('.jpg')
        if OUTPUT_SUFFIX:
            output_path = heic_path.with_name(f"{heic_path.stem}{OUTPUT_SUFFIX}.jpg")
        
        # Save as JPEG
        image.save(output_path, 'JPEG', quality=JPEG_QUALITY, optimize=True)
        
        return output_path, True
    except Exception as e:
        return None, False, str(e)

def main():
    """Main function to process all HEIC files"""
    if not os.path.exists(FOLDER_PATH):
        print(f"Error: Folder path does not exist: {FOLDER_PATH}")
        return
    
    print(f"Starting HEIC to JPEG conversion...")
    print(f"Folder: {FOLDER_PATH}")
    print(f"JPEG Quality: {JPEG_QUALITY}")
    print(f"Delete originals: {DELETE_ORIGINALS}")
    print("=" * 60)
    
    # Find all HEIC files
    heic_files = []
    for ext in ['*.HEIC', '*.heic']:
        heic_files.extend(list(Path(FOLDER_PATH).rglob(ext)))
    
    if not heic_files:
        print("No HEIC files found!")
        return
    
    print(f"Found {len(heic_files)} HEIC files to convert\n")
    
    converted_count = 0
    failed_count = 0
    failed_files = []
    
    for i, heic_file in enumerate(heic_files, 1):
        relative_path = heic_file.relative_to(FOLDER_PATH)
        print(f"[{i}/{len(heic_files)}] Converting: {relative_path}")
        
        result = convert_heic_to_jpeg(heic_file)
        
        if len(result) == 2:  # Success
            output_path, success = result
            if success:
                print(f"  ✓ Saved: {output_path.name}")
                converted_count += 1
                
                # Delete original if requested
                if DELETE_ORIGINALS:
                    try:
                        heic_file.unlink()
                        print(f"  ✓ Deleted original")
                    except Exception as e:
                        print(f"  ✗ Could not delete original: {e}")
            else:
                failed_count += 1
                failed_files.append(str(relative_path))
        else:  # Failed
            output_path, success, error = result
            print(f"  ✗ Failed: {error}")
            failed_count += 1
            failed_files.append(str(relative_path))
    
    print("\n" + "=" * 60)
    print(f"Conversion complete!")
    print(f"- Successfully converted: {converted_count}")
    print(f"- Failed: {failed_count}")
    
    if failed_files:
        print(f"\nFailed files:")
        for file in failed_files[:10]:
            print(f"  - {file}")
        if len(failed_files) > 10:
            print(f"  ... and {len(failed_files) - 10} more")
    
    print(f"\nNext steps:")
    print(f"1. Check the converted JPEG files")
    print(f"2. Run the product CSV generator: python generate_product_csv.py")
    print(f"3. Upload images and import CSV to Shopify")

if __name__ == "__main__":
    main()

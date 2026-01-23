import os
import re
from pathlib import Path

# --- CONFIGURATION ---
TARGET_DIRECTORY = r"D:\Downloads\Rolex"  # Change this to your folder path
DRY_RUN = True  # Set to False to actually rename files

def generate_short_code(folder_name):
    """
    Converts folder names into short codes based on user logic.
    Examples:
    - "Date-just" -> "DJ"
    - "Silver Jubilee Bracelet" -> "SJB"
    - "36mm" -> "36"
    - "Quartz" -> "Q"
    """
    # 1. Replace hyphens/underscores with spaces to handle "Date-just"
    clean_name = folder_name.replace('-', ' ').replace('_', ' ')
    
    # 2. Split into words
    parts = clean_name.split()
    code = ""
    
    for part in parts:
        if part and part[0].isdigit():
            # If word starts with number (e.g. 36mm), keep the digits
            match = re.match(r'\d+', part)
            if match:
                code += match.group(0)
        elif part:
            # Otherwise take the first letter and make it uppercase
            code += part[0].upper()
            
    return code

def rename_images_recursively(base_path):
    base_path = Path(base_path)
    
    if not base_path.exists():
        print(f"Error: Path '{base_path}' not found.")
        return

    print(f"Scanning '{base_path}'...\n")

    # Walk through all directories
    for root, dirs, files in os.walk(base_path):
        # Filter for .jpg files only (case insensitive)
        jpg_files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg'))]
        
        if not jpg_files:
            continue

        # Sort files to ensure img1, img2 are assigned consistently
        jpg_files.sort()

        # --- Build the Prefix ---
        # Get path relative to the script's target to build the chain
        # e.g., if root is ...\Rolex\Date-just\Quartz
        # relative_path is Rolex\Date-just\Quartz
        try:
            # We use absolute paths to ensure we capture the folder structure correctly
            current_full_path = Path(root)
            relative_path = current_full_path.relative_to(base_path.parent)
        except ValueError:
            continue

        path_parts = relative_path.parts
        
        # Generate short codes for each folder part
        # Logic: We might want the very first folder (Rolex) to keep its full name 
        # based on your example, or just use the short code logic for everything.
        # Below uses the short code logic for ALL parts for consistency.
        # If you want "Rolex" to stay "Rolex", you can skip the first part in this loop.
        short_codes = [generate_short_code(part) for part in path_parts]
        
        # Join with dashes: e.g. "Rolex-DJ-Q-36-SJB"
        # Note: If generate_short_code returns "R" for Rolex, and you want "Rolex", 
        # you can manually edit the folder name or the logic.
        prefix = "-".join(short_codes)

        # --- Rename Files ---
        for index, filename in enumerate(jpg_files, start=1):
            old_file_path = Path(root) / filename
            
            # Create new name: Prefix-imgX.jpg
            new_filename = f"{prefix}-img{index}{old_file_path.suffix}"
            new_file_path = Path(root) / new_filename

            if old_file_path.name == new_filename:
                continue # Skip if already renamed

            if DRY_RUN:
                print(f"[WOULD RENAME]\n  Old: {filename}\n  New: {new_filename}\n")
            else:
                try:
                    os.rename(old_file_path, new_file_path)
                    print(f"[RENAMED] {new_filename}")
                except Exception as e:
                    print(f"[ERROR] Could not rename {filename}: {e}")

if __name__ == "__main__":
    rename_images_recursively(TARGET_DIRECTORY)
    
    if DRY_RUN:
        print("-" * 40)
        print("Dry Run Complete. No files were changed.")
        print("Check the output above. If it looks correct, change 'DRY_RUN = True' to 'False' inside the script.")
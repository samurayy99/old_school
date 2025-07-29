#!/usr/bin/env python3
"""
Simple Logo Processor - Minimal dependencies version
Uses only PIL (Python Imaging Library) which is more commonly available
"""

import os
from PIL import Image, ImageOps
import shutil

# Logo mappings - what each file should be renamed to
LOGO_MAPPINGS = {
    'ethereum-eth-logo-full-vertical.svg': 'ethereum',
    '430px-Lisk-logo.png': 'lisk',
    'near-protocol-near1824.jpg': 'near',
    'casper-network-cspr1248.jpg': 'casper',
    'ava.do.logo.png': 'avado',
    'proxeus.jpeg': 'proxeus',
    'swarm-city.png': 'swarm-city'
}


def process_image(input_path, target_name):
    """Process image to standard format"""
    try:
        # For SVG, we'll just copy it for now and handle in CSS
        if input_path.endswith('.svg'):
            print(f"⚠️  SVG file {input_path} - will handle with CSS filters")
            # Copy SVG for light mode
            light_output = f"public/logos/{target_name}.svg"
            shutil.copy2(input_path, light_output)
            print(f"  ✓ Copied SVG: {light_output}")
            return True

        # Open image
        img = Image.open(input_path)

        # Convert to RGBA for transparency support
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # Standard size: 400x200 pixels
        target_size = (400, 200)

        # Calculate resize ratio to maintain aspect ratio
        img_ratio = img.width / img.height
        target_ratio = target_size[0] / target_size[1]

        if img_ratio > target_ratio:
            # Image is wider - fit to width
            new_width = target_size[0]
            new_height = int(target_size[0] / img_ratio)
        else:
            # Image is taller - fit to height
            new_height = target_size[1]
            new_width = int(target_size[1] * img_ratio)

        # Resize image
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

        # Create canvas with target size and transparent background
        canvas = Image.new('RGBA', target_size, (255, 255, 255, 0))

        # Center the image on canvas
        x_offset = (target_size[0] - new_width) // 2
        y_offset = (target_size[1] - new_height) // 2
        canvas.paste(img, (x_offset, y_offset), img)

        # Save optimized PNG
        output_path = f"public/logos/{target_name}.png"
        canvas.save(output_path, 'PNG', optimize=True)
        print(f"  ✓ Processed: {output_path}")

        return True

    except Exception as e:
        print(f"  ✗ Error processing {input_path}: {e}")
        return False


def main():
    print("🎨 Simple Logo Processor")
    print("=" * 40)

    # Process each logo
    for original_filename, target_name in LOGO_MAPPINGS.items():
        input_path = f"public/logos/{original_filename}"

        if os.path.exists(input_path):
            print(f"Processing: {original_filename} -> {target_name}")
            process_image(input_path, target_name)
        else:
            print(f"⚠️  File not found: {input_path}")

    print("\n✅ Processing completed!")
    print("\nNext steps:")
    print("1. Run the updated React component")
    print("2. Dark mode will be handled via CSS filters")


if __name__ == "__main__":
    main()

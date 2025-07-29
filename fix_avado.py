#!/usr/bin/env python3
"""
Fix AVADO Logo - Handle white logo properly
"""

import os
from PIL import Image, ImageOps
import numpy as np


def process_avado():
    """Process the white AVADO logo"""
    input_path = "public/logos/avado_new.png"
    output_path = "public/logos/avado.png"

    if not os.path.exists(input_path):
        print(f"❌ File not found: {input_path}")
        print("💡 Available AVADO files:")
        logos_dir = "public/logos"
        for file in os.listdir(logos_dir):
            if 'avado' in file.lower():
                print(f"   📁 {file}")
        return False

    try:
        print(f"📂 Opening: {input_path}")

        # Open the white logo
        img = Image.open(input_path)
        print(f"📏 Original size: {img.width}x{img.height}, Mode: {img.mode}")

        # Convert to RGBA for transparency
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
            print("🔄 Converted to RGBA")

        # Remove white background and make transparent
        data = np.array(img)

        # Find white/very light pixels (background)
        white_threshold = 240
        white_mask = np.all(data[:, :, :3] >= white_threshold, axis=2)

        # Make white background transparent
        data[white_mask] = [255, 255, 255, 0]

        # Convert back to PIL
        transparent_img = Image.fromarray(data, 'RGBA')
        print("🔍 Removed white background")

        # Get bounding box to crop tight
        bbox = transparent_img.getbbox()
        if bbox:
            transparent_img = transparent_img.crop(bbox)
            print(
                f"✂️  Cropped to content: {transparent_img.width}x{transparent_img.height}")

        # Standard resize to our format
        target_width = 400
        target_height = 200

        # Calculate aspect ratio
        img_ratio = transparent_img.width / transparent_img.height
        target_ratio = target_width / target_height

        # Use 80% of canvas space
        scale_factor = 0.8

        if img_ratio > target_ratio:
            new_width = int(target_width * scale_factor)
            new_height = int(new_width / img_ratio)
        else:
            new_height = int(target_height * scale_factor)
            new_width = int(new_height * img_ratio)

        # Resize with high quality
        resized = transparent_img.resize(
            (new_width, new_height), Image.Resampling.LANCZOS)

        # Create transparent canvas
        canvas = Image.new(
            'RGBA', (target_width, target_height), (255, 255, 255, 0))

        # Center the logo
        x_offset = (target_width - new_width) // 2
        y_offset = (target_height - new_height) // 2

        canvas.paste(resized, (x_offset, y_offset), resized)

        # Save
        canvas.save(output_path, 'PNG', optimize=True)
        print(f"✅ Processed AVADO: {output_path}")
        print(
            f"📐 Final size: {new_width}x{new_height} on {target_width}x{target_height} canvas")

        return True

    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def main():
    print("🔧 Fixing AVADO Logo")
    print("=" * 40)

    if process_avado():
        print("\n🎉 Success! AVADO logo processed!")
        print("• White background removed")
        print("• Transparent background")
        print("• Should work in both light/dark mode")
        print("\n🚀 Restart dev server: npm run dev")
    else:
        print("\n💥 Something went wrong!")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Fix Swarm City Logo - Focus on one logo
"""

import os
from PIL import Image


def process_swarm_city():
    """Process the new Swarm City logo without background"""
    input_path = "public/logos/swarm.city-logo-removebg-preview-2.png"
    output_path = "public/logos/swarm-city.png"

    if not os.path.exists(input_path):
        print(f"❌ File not found: {input_path}")
        return False

    try:
        print(f"📂 Opening: {input_path}")

        # Open the image
        img = Image.open(input_path)
        print(f"📏 Original size: {img.width}x{img.height}, Mode: {img.mode}")

        # Convert to RGBA to ensure transparency support
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
            print("🔄 Converted to RGBA")

        # Standard target size
        target_width = 400
        target_height = 200

        # Calculate aspect ratio
        img_ratio = img.width / img.height
        target_ratio = target_width / target_height

        print(
            f"📐 Image ratio: {img_ratio:.2f}, Target ratio: {target_ratio:.2f}")

        # For Swarm City, we want it bigger! Let's use 80% of the canvas
        scale_factor = 0.8  # Use 80% of available space

        if img_ratio > target_ratio:
            # Image is wider - fit to width
            new_width = int(target_width * scale_factor)
            new_height = int(new_width / img_ratio)
        else:
            # Image is taller - fit to height
            new_height = int(target_height * scale_factor)
            new_width = int(new_height * img_ratio)

        # Make sure it's not too small - minimum size
        min_width = 200
        min_height = 100

        if new_width < min_width:
            new_width = min_width
            new_height = int(min_width / img_ratio)

        if new_height < min_height:
            new_height = min_height
            new_width = int(min_height * img_ratio)

        print(f"🎯 New size: {new_width}x{new_height}")

        # Resize with high quality
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

        # Create transparent canvas
        canvas = Image.new(
            'RGBA', (target_width, target_height), (255, 255, 255, 0))

        # Center the image
        x_offset = (target_width - new_width) // 2
        y_offset = (target_height - new_height) // 2

        print(f"📍 Positioning at: ({x_offset}, {y_offset})")

        # Paste the image on canvas
        canvas.paste(img, (x_offset, y_offset), img)

        # Save
        canvas.save(output_path, 'PNG', optimize=True)
        print(f"✅ Saved: {output_path}")

        return True

    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def main():
    print("🎨 Fixing Swarm City Logo")
    print("=" * 40)

    if process_swarm_city():
        print("\n🎉 Success! Swarm City logo is ready!")
        print("🚀 Now restart your dev server: npm run dev")
    else:
        print("\n💥 Something went wrong!")


if __name__ == "__main__":
    main()

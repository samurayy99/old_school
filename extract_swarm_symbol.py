#!/usr/bin/env python3
"""
Extract Swarm City Symbol Only
Remove the text part and keep only the infinity symbol
"""

import os
from PIL import Image


def extract_symbol_only():
    """Extract only the infinity symbol from Swarm City logo"""
    input_path = "public/logos/swarm-city.png"
    output_path = "public/logos/swarm-city.png"

    if not os.path.exists(input_path):
        print(f"❌ File not found: {input_path}")
        return False

    try:
        # Open the current logo
        img = Image.open(input_path)
        print(f"📂 Original size: {img.width}x{img.height}")

        # Convert to RGBA
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # The text is in the bottom part, symbol is in the top part
        # Let's crop to keep only the top 70% (where the symbol is)
        crop_height = int(img.height * 0.7)  # Keep top 70%

        # Crop the image to remove text at bottom
        cropped = img.crop((0, 0, img.width, crop_height))
        print(f"🔪 Cropped to: {cropped.width}x{cropped.height}")

        # Now resize this to our standard format
        target_width = 400
        target_height = 200

        # Scale up to use more space since we removed text
        scale_factor = 0.9  # Use 90% of canvas

        # Calculate new size maintaining aspect ratio
        img_ratio = cropped.width / cropped.height
        target_ratio = target_width / target_height

        if img_ratio > target_ratio:
            new_width = int(target_width * scale_factor)
            new_height = int(new_width / img_ratio)
        else:
            new_height = int(target_height * scale_factor)
            new_width = int(new_height * img_ratio)

        # Resize
        resized = cropped.resize(
            (new_width, new_height), Image.Resampling.LANCZOS)

        # Create transparent canvas
        canvas = Image.new(
            'RGBA', (target_width, target_height), (255, 255, 255, 0))

        # Center the symbol
        x_offset = (target_width - new_width) // 2
        y_offset = (target_height - new_height) // 2

        canvas.paste(resized, (x_offset, y_offset), resized)

        # Save
        canvas.save(output_path, 'PNG', optimize=True)
        print(f"✅ Symbol-only logo saved: {output_path}")

        return True

    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def main():
    print("✂️  Extracting Swarm City Symbol")
    print("=" * 40)

    if extract_symbol_only():
        print("\n🎉 Success! Now you have:")
        print("• Infinity symbol only (no text)")
        print("• Clean HTML text below")
        print("• No more double text!")
        print("\n🚀 Restart dev server: npm run dev")
    else:
        print("\n💥 Something went wrong!")


if __name__ == "__main__":
    main()

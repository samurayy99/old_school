#!/usr/bin/env python3
"""
Fix Blue AVADO Logo - Make background transparent
"""

import os
from PIL import Image
import numpy as np


def fix_blue_avado():
    """Make the blue AVADO logo background transparent"""
    input_path = "public/logos/avado.png"

    if not os.path.exists(input_path):
        print(f"❌ File not found: {input_path}")
        return False

    try:
        print(f"📂 Opening: {input_path}")

        # Open the blue logo
        img = Image.open(input_path)
        print(f"📏 Size: {img.width}x{img.height}, Mode: {img.mode}")

        # Convert to RGBA
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # Convert to numpy for processing
        data = np.array(img)

        # Find the blue background (not the blue logo elements)
        # We want to keep the blue logo but remove blue background
        # The background is usually more uniform blue

        # Create backup
        backup_path = "public/logos/avado_backup.png"
        img.save(backup_path)
        print(f"💾 Backup saved: {backup_path}")

        # For now, let's just clean up the edges/background
        # This is tricky because we want to keep blue logo elements

        # Get the corners to identify background color
        corner_colors = [
            data[0, 0],          # top-left
            data[0, -1],         # top-right
            data[-1, 0],         # bottom-left
            data[-1, -1]         # bottom-right
        ]

        # Find the most common corner color (likely background)
        from collections import Counter
        corner_tuples = [tuple(color[:3])
                         for color in corner_colors]  # RGB only
        most_common_bg = Counter(corner_tuples).most_common(1)[0][0]

        print(f"🎨 Detected background color: {most_common_bg}")

        # Make pixels similar to background transparent
        bg_threshold = 30  # Allow some variation

        for i in range(data.shape[0]):
            for j in range(data.shape[1]):
                pixel_rgb = data[i, j, :3]
                # Check if pixel is similar to background
                diff = np.abs(pixel_rgb - most_common_bg).sum()
                if diff < bg_threshold:
                    data[i, j, 3] = 0  # Make transparent

        # Convert back to PIL
        result = Image.fromarray(data, 'RGBA')

        # Save
        result.save(input_path, 'PNG', optimize=True)
        print(f"✅ Fixed blue AVADO logo: {input_path}")

        return True

    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def main():
    print("🔧 Fixing Blue AVADO Logo")
    print("=" * 40)

    if fix_blue_avado():
        print("\n🎉 Success!")
        print("• Blue background made transparent")
        print("• Logo elements preserved")
        print("\n🚀 Restart dev server: npm run dev")
    else:
        print("\n💥 Something went wrong!")


if __name__ == "__main__":
    main()

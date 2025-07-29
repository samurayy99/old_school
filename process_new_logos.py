#!/usr/bin/env python3
"""
Process New Logos - Swarm City and AVADO
"""

import os
import shutil
from PIL import Image, ImageOps
import numpy as np


def process_swarm_city():
    """Process the new Swarm City logo"""
    input_path = "public/logos/swarm.city-logo.png"
    output_path = "public/logos/swarm-city.png"

    if not os.path.exists(input_path):
        print(f"⚠️  {input_path} not found")
        return

    try:
        # Open and process the image
        img = Image.open(input_path)

        # Convert to RGBA
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # Resize to our standard format (400x200)
        target_size = (400, 200)

        # Calculate aspect ratio
        img_ratio = img.width / img.height
        target_ratio = target_size[0] / target_size[1]

        if img_ratio > target_ratio:
            new_width = target_size[0]
            new_height = int(target_size[0] / img_ratio)
        else:
            new_height = target_size[1]
            new_width = int(target_size[1] * img_ratio)

        # Resize
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

        # Create canvas and center
        canvas = Image.new('RGBA', target_size, (255, 255, 255, 0))
        x_offset = (target_size[0] - new_width) // 2
        y_offset = (target_size[1] - new_height) // 2
        canvas.paste(img, (x_offset, y_offset), img)

        # Save
        canvas.save(output_path, 'PNG', optimize=True)
        print(f"✓ Processed Swarm City: {output_path}")

    except Exception as e:
        print(f"✗ Error processing Swarm City: {e}")


def process_avado():
    """Process the new AVADO logo"""
    input_path = "public/logos/avado_new.png"
    output_path = "public/logos/avado.png"

    if not os.path.exists(input_path):
        print(f"⚠️  {input_path} not found")
        return

    try:
        # Open the white logo
        img = Image.open(input_path)

        # Convert to RGBA
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # For white logos, we need to make them dark for light mode
        # and keep them white for dark mode
        data = np.array(img)

        # Find white pixels (but keep alpha)
        white_mask = np.all(data[:, :, :3] > 240, axis=2) & (data[:, :, 3] > 0)

        # Make white pixels dark for light mode version
        data[white_mask, :3] = [60, 60, 60]  # Dark gray instead of black

        # Convert back to image
        dark_version = Image.fromarray(data, 'RGBA')

        # Resize to standard format
        target_size = (400, 200)
        img_ratio = dark_version.width / dark_version.height
        target_ratio = target_size[0] / target_size[1]

        if img_ratio > target_ratio:
            new_width = target_size[0]
            new_height = int(target_size[0] / img_ratio)
        else:
            new_height = target_size[1]
            new_width = int(target_size[1] * img_ratio)

        dark_version = dark_version.resize(
            (new_width, new_height), Image.Resampling.LANCZOS)

        # Create canvas and center
        canvas = Image.new('RGBA', target_size, (255, 255, 255, 0))
        x_offset = (target_size[0] - new_width) // 2
        y_offset = (target_size[1] - new_height) // 2
        canvas.paste(dark_version, (x_offset, y_offset), dark_version)

        # Save the light mode version (dark logo)
        canvas.save(output_path, 'PNG', optimize=True)
        print(f"✓ Processed AVADO: {output_path}")

    except Exception as e:
        print(f"✗ Error processing AVADO: {e}")


def main():
    print("🎨 Processing New Logos")
    print("=" * 40)

    # Process both logos
    process_swarm_city()
    process_avado()

    print("\n✅ New logos processed!")
    print("\nNow restart your dev server to see the changes!")


if __name__ == "__main__":
    main()

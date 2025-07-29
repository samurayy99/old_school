#!/usr/bin/env python3
"""
Logo Master Processor V4 - World-Class Edition
- Minimizes padding for maximum content visibility
- Creates perfect, pure white dark mode versions by filling the shape
- Optimized for web display with proper content-to-canvas ratio
"""

import os
from PIL import Image, ImageEnhance
import numpy as np

# --- OPTIMIZED CONFIGURATION ---
LOGO_DIR = "public/logos"
TARGET_WIDTH = 200
TARGET_HEIGHT = 80
PADDING = 3  # Dramatically reduced from 15px to 3px
QUALITY_OPTIMIZE = True


def make_background_transparent(image):
    """Make background transparent by using the color of the corner pixel."""
    image = image.convert("RGBA")
    data = np.array(image)
    corner_pixel = data[0, 0]

    if corner_pixel[3] < 255:
        return image

    r, g, b, _ = corner_pixel
    tolerance = 40
    white_ish = r > 215 and g > 215 and b > 215

    if white_ish:
        tolerance = 80

    red, green, blue, alpha = data.T

    is_background = (red >= r - tolerance) & (red <= r + tolerance) & \
                    (green >= g - tolerance) & (green <= g + tolerance) & \
                    (blue >= b - tolerance) & (blue <= b + tolerance)

    data[..., -1][is_background] = 0
    return Image.fromarray(data)


def standardize_to_dark_content(image):
    """Ensure the logo content (text/shape) is dark."""
    image = image.convert("RGBA")
    data = np.array(image)

    rgb = data[:, :, :3]
    alpha = data[:, :, 3]

    visible_mask = alpha > 50
    if not np.any(visible_mask):
        return image

    brightness = np.mean(rgb[visible_mask] * [0.299, 0.587, 0.114])

    if brightness > 128:
        rgb[visible_mask] = 255 - rgb[visible_mask]
        img_temp = Image.fromarray(rgb[visible_mask].reshape(-1, 1, 3))
        enhancer = ImageEnhance.Contrast(img_temp)
        img_enhanced = enhancer.enhance(1.1)
        rgb[visible_mask] = np.array(img_enhanced).reshape(-1, 3)

    data[:, :, :3] = rgb
    return Image.fromarray(data)


def create_dark_mode_version_professional(image):
    """Create a pure white dark mode version by filling the logo's shape."""
    image = image.convert("RGBA")

    # Create a mask from the alpha channel (this is the logo's shape)
    alpha_mask = image.getchannel('A')

    # Create a new, solid white image of the same size
    white_fill = Image.new('RGB', image.size, (255, 255, 255))

    # Create the final RGBA image
    white_logo = Image.new('RGBA', image.size)
    white_logo.paste(white_fill, (0, 0), mask=alpha_mask)

    return white_logo


def resize_and_pad(image):
    """Resize image to fit within target dimensions with minimal padding."""
    bg = Image.new('RGBA', (TARGET_WIDTH, TARGET_HEIGHT), (0, 0, 0, 0))

    original_width, original_height = image.size
    # Use almost full canvas with minimal padding
    scale_factor = min((TARGET_WIDTH - PADDING * 2) / original_width,
                       (TARGET_HEIGHT - PADDING * 2) / original_height)

    new_width = int(original_width * scale_factor)
    new_height = int(original_height * scale_factor)

    # Use LANCZOS for highest quality scaling
    resized = image.resize((new_width, new_height), Image.Resampling.LANCZOS)

    paste_x = (TARGET_WIDTH - new_width) // 2
    paste_y = (TARGET_HEIGHT - new_height) // 2

    bg.paste(resized, (paste_x, paste_y), resized)
    return bg


def process_logo(filepath):
    """Full processing pipeline for a single logo."""
    filename = os.path.basename(filepath)
    print(f"--- Processing {filename} ---")

    try:
        image = Image.open(filepath)

        transparent_img = make_background_transparent(image)
        standardized_light_img = standardize_to_dark_content(transparent_img)
        dark_mode_img = create_dark_mode_version_professional(
            standardized_light_img)

        final_light = resize_and_pad(standardized_light_img)
        final_dark = resize_and_pad(dark_mode_img)

        base_name = os.path.splitext(filename)[0].replace('-dark', '')
        light_path = os.path.join(LOGO_DIR, f"{base_name}.png")
        dark_path = os.path.join(LOGO_DIR, f"{base_name}-dark.png")

        # Save with optimized settings for web
        final_light.save(light_path, "PNG",
                         optimize=QUALITY_OPTIMIZE, compress_level=1)
        final_dark.save(dark_path, "PNG",
                        optimize=QUALITY_OPTIMIZE, compress_level=1)

        print(
            f"✅ Success: Saved {os.path.basename(light_path)} and {os.path.basename(dark_path)}")
        print(
            f"   Content area: {TARGET_WIDTH-PADDING*2}x{TARGET_HEIGHT-PADDING*2} (padding: {PADDING}px)")
        return True

    except Exception as e:
        print(f"❌ Error processing {filename}: {e}")
        return False


def main():
    print("🚀 Launching Logo Master Processor V4 - World-Class Edition...")
    print(
        f"📐 Target: {TARGET_WIDTH}x{TARGET_HEIGHT}px with {PADDING}px padding")
    print(f"🎯 Content area: {TARGET_WIDTH-PADDING*2}x{TARGET_HEIGHT-PADDING*2}px ({((TARGET_WIDTH-PADDING*2)*TARGET_HEIGHT-PADDING*2)/(TARGET_WIDTH*TARGET_HEIGHT)*100:.1f}% usage)")

    files_to_process = [f for f in os.listdir(LOGO_DIR) if f.lower().endswith(
        ('.png', '.jpg', '.jpeg', '.webp')) and not f.endswith('-dark.png')]

    if not files_to_process:
        print("No logos found to process.")
        return

    success_count = 0
    for filename in files_to_process:
        if process_logo(os.path.join(LOGO_DIR, filename)):
            success_count += 1

    print("\n🎉 Processing complete!")
    print(
        f"Successfully processed {success_count}/{len(files_to_process)} logos.")


if __name__ == "__main__":
    main()

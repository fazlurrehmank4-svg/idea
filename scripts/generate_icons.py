import sys
from PIL import Image, ImageDraw

def create_icon(size, filename):
    img = Image.new("RGBA", (size, size), (15, 23, 42, 255)) # #0F172A slate-900
    draw = ImageDraw.Draw(img)

    # Outer ring / accent circle
    margin = size // 8
    draw.ellipse([margin, margin, size - margin, size - margin], outline=(99, 102, 241, 255), width=max(2, size // 32))

    # Inner glowing core
    core_margin = size // 3
    draw.ellipse([core_margin, core_margin, size - core_margin, size - core_margin], fill=(251, 191, 36, 255))

    img.save(filename, "PNG")

def main():
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    import os
    os.makedirs("public/icons", exist_ok=True)

    for s in sizes:
        create_icon(s, f"public/icons/icon-{s}x{s}.png")
    create_icon(512, "public/icons/maskable_icon.png")
    print("Generated all PWA icons successfully.")

if __name__ == "__main__":
    main()

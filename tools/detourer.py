"""Détoure un sprite généré sur fond uni et l'enregistre en PNG transparent recadré.

Usage : python3 tools/detourer.py source.jpg destination.png [taille_max]
"""
import statistics
import sys

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageMath, ImageOps

HARD = 60
SOFT = 115


def detourer(source, destination, max_size=512):
    image = Image.open(source).convert("RGB")
    width, height = image.size
    border = [image.getpixel((x, y)) for x in range(0, width, 4) for y in (0, height - 1)]
    border += [image.getpixel((x, y)) for y in range(0, height, 4) for x in (0, width - 1)]
    background = tuple(int(statistics.median(channel)) for channel in zip(*border))

    red, green, blue = image.split()
    bg_red, bg_green, bg_blue = background
    if bg_green > max(bg_red, bg_blue):
        key = "g - max(r, b)"
        background_key = bg_green - max(bg_red, bg_blue)
    else:
        key = "min(r, b) - g"
        background_key = min(bg_red, bg_blue) - bg_green
    distance = ImageMath.eval(
        f"convert(min(max(({background_key} - ({key})) * 255 / {background_key}, 0), 255), 'L')",
        r=red, g=green, b=blue,
    )

    mask = distance.point(lambda value: 255 if value < SOFT else 0)
    for x in range(width):
        for y in (0, height - 1):
            if mask.getpixel((x, y)) == 255:
                ImageDraw.floodfill(mask, (x, y), 128)
    for y in range(height):
        for x in (0, width - 1):
            if mask.getpixel((x, y)) == 255:
                ImageDraw.floodfill(mask, (x, y), 128)
    enclosed_holes = distance.point(lambda value: 255 if value < HARD * 0.6 else 0)
    reached = ImageChops.lighter(mask.point(lambda value: 255 if value == 128 else 0), enclosed_holes)

    ramp = distance.point(lambda value: max(0, min(255, int((value - HARD) * 255 / (SOFT - HARD)))))
    alpha = Image.composite(ramp, Image.new("L", image.size, 255), reached)
    alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))

    edges = alpha.point(lambda value: 255 if 0 < value < 245 else 0).filter(ImageFilter.MaxFilter(3))
    red, green, blue = image.split()
    if background[1] > max(background[0], background[2]):
        clamped = ImageMath.eval("convert(min(g, max(r, b) + 12), 'L')", r=red, g=green, b=blue)
        spill = ImageMath.eval("convert((g - max(r, b)) * 255 / 30, 'L')", r=red, g=green, b=blue)
        spill = ImageChops.lighter(spill.point(lambda value: 255 if value >= 255 else 0), edges.filter(ImageFilter.MaxFilter(5)))
        image = Image.merge("RGB", (red, Image.composite(clamped, green, spill), blue))
    else:
        excess = ImageMath.eval("convert(max(min(r, b) - g - 12, 0), 'L')", r=red, g=green, b=blue)
        despilled = Image.merge("RGB", (ImageChops.subtract(red, excess), green, ImageChops.subtract(blue, excess)))
        spill = excess.point(lambda value: 255 if value > 30 else 0)
        image = Image.composite(despilled, image, ImageChops.lighter(spill, edges.filter(ImageFilter.MaxFilter(5))))
    neutral = Image.blend(image, ImageOps.grayscale(image).convert("RGB"), 0.5)
    image = Image.composite(neutral, image, edges)

    result = image.convert("RGBA")
    result.putalpha(alpha)
    bbox = alpha.point(lambda value: 255 if value > 24 else 0).getbbox()
    if bbox is None:
        raise SystemExit(f"Aucun personnage détecté dans {source}")
    result = result.crop(bbox)
    result.thumbnail((max_size, max_size), Image.LANCZOS)
    result.save(destination, optimize=True)
    print(f"{destination} {result.size} fond={background}")


if __name__ == "__main__":
    detourer(sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 512)

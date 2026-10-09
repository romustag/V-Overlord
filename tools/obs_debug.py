#!/usr/bin/env python3
"""Aide au calage des collisions 2D.

  obs_debug.py grid <carte> <sortie.png>    quadrillage normalisé (pas 0.05) sur la carte
  obs_debug.py poly <carte> <sortie.png>    polygones de obstacles-2d.js dessinés sur la carte

<carte> : 1 2 3 4 5 throne
"""
import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent


def load_obstacles():
    text = (ROOT / "obstacles-2d.js").read_text(encoding="utf-8")
    body = text[text.index("{"): text.rindex("}") + 1]
    body = re.sub(r"//[^\n]*", "", body)
    body = re.sub(r",(\s*[\]}])", r"\1", body)
    body = re.sub(r"([{,]\s*)(\w+)\s*:", r'\1"\2":', body)
    return json.loads(body)


def main():
    mode, name, out = sys.argv[1:4]
    image = Image.open(ROOT / "assets" / f"map-{name}-2d.jpg").convert("RGB")
    scale = 1.5
    image = image.resize((int(image.width * scale), int(image.height * scale)), Image.LANCZOS)
    width, height = image.size
    draw = ImageDraw.Draw(image, "RGBA")
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 15)
    except OSError:
        font = ImageFont.load_default()
    if mode == "grid":
        for i in range(0, 21):
            u = i / 20
            x = round(u * (width - 1))
            major = i % 2 == 0
            draw.line([(x, 0), (x, height)], fill=(255, 255, 255, 150 if major else 60), width=1)
            if major:
                draw.text((x + 2, 2), f"{u:.1f}", fill=(255, 255, 0, 255), font=font)
        for j in range(0, 21):
            v = j / 20
            y = round(v * (height - 1))
            major = j % 2 == 0
            draw.line([(0, y), (width, y)], fill=(255, 255, 255, 150 if major else 60), width=1)
            if major:
                draw.text((2, y + 2), f"{v:.1f}", fill=(255, 255, 0, 255), font=font)
    else:
        obstacles = load_obstacles()[name]
        for index, poly in enumerate(obstacles):
            if isinstance(poly[0], (int, float)):
                x0, y0, x1, y1 = poly
                poly = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]
            points = [(u * width, v * height) for u, v in poly]
            draw.polygon(points, fill=(255, 40, 40, 90), outline=(255, 255, 0, 255))
            cx = sum(p[0] for p in points) / len(points)
            cy = sum(p[1] for p in points) / len(points)
            draw.text((cx - 6, cy - 8), str(index), fill=(255, 255, 255, 255), font=font)
    image.save(out)


if __name__ == "__main__":
    main()

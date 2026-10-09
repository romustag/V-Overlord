#!/usr/bin/env python3
"""Retire le fond magenta uni d'un héros généré et exporte un PNG transparent.

Usage : python3 tools/key_hero.py entree.jpg sortie.png [hauteur=320]
"""
import sys
from collections import deque

from PIL import Image, ImageFilter


def dist(a, b):
    return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** 0.5


def key(src, dst, height=320, tol=95):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    px = im.load()
    corners = [px[2, 2], px[w - 3, 2], px[2, h - 3], px[w - 3, h - 3]]
    bg = tuple(sorted(c[i] for c in corners)[1] for i in range(3))

    bg_mask = Image.new("L", (w, h), 0)
    mp = bg_mask.load()
    seen = bytearray(w * h)
    queue = deque()
    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))
    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= w or y >= h:
            continue
        i = y * w + x
        if seen[i]:
            continue
        seen[i] = 1
        if dist(px[x, y], bg) > tol:
            continue
        mp[x, y] = 255
        queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    # Alpha = inverse du fond, érodé d'1px puis adouci pour éviter le liseré magenta.
    alpha = bg_mask.point(lambda v: 255 - v)
    alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7))

    # Décontamine les bords : remplace le rose par la couleur voisine la plus sombre.
    out = im.convert("RGBA")
    out.putalpha(alpha)
    bbox = alpha.point(lambda v: 255 if v > 24 else 0).getbbox()
    out = out.crop(bbox)
    ratio = height / out.height
    out = out.resize((max(1, round(out.width * ratio)), height), Image.LANCZOS)
    out.save(dst)
    print(dst, out.size)


if __name__ == "__main__":
    key(sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 320)

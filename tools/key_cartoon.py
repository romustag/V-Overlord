#!/usr/bin/env python3
"""Retire le fond magenta d'un sprite cartoon généré et exporte un PNG transparent.

Différences avec key_hero.py : supprime aussi le magenta enfermé (entre un bras et le corps,
dans un arc…) et nettoie le liseré rose sur les bords.

Usage : python3 tools/key_cartoon.py entree.jpg sortie.png [hauteur=320]
"""
import sys
from collections import deque

from PIL import Image, ImageFilter


def dist(a, b):
    return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** 0.5


def magenta(p):
    r, g, b = p
    return r > 140 and b > 90 and g < min(r, b) - 55


def key(src, dst, height=320, tol_edge=95, tol_inner=70, min_hole=60):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    px = im.load()
    corners = [px[2, 2], px[w - 3, 2], px[2, h - 3], px[w - 3, h - 3]]
    bg = tuple(sorted(c[i] for c in corners)[1] for i in range(3))

    removed = bytearray(w * h)

    # 1) fond relié aux bords
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
        if removed[i] or dist(px[x, y], bg) > tol_edge:
            continue
        removed[i] = 1
        queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    # 2) poches de fond enfermées : zones magenta assez grandes
    seen = bytearray(w * h)
    for y0 in range(h):
        for x0 in range(w):
            i0 = y0 * w + x0
            if removed[i0] or seen[i0]:
                continue
            p = px[x0, y0]
            if dist(p, bg) > tol_inner or not magenta(p):
                continue
            comp = []
            dq = deque([(x0, y0)])
            seen[i0] = 1
            while dq:
                x, y = dq.popleft()
                comp.append(i0 if False else y * w + x)
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        j = ny * w + nx
                        if seen[j] or removed[j]:
                            continue
                        q = px[nx, ny]
                        if dist(q, bg) <= tol_inner + 25 and magenta(q):
                            seen[j] = 1
                            dq.append((nx, ny))
            if len(comp) >= min_hole:
                for j in comp:
                    removed[j] = 1

    mask = Image.new("L", (w, h), 0)
    mp = mask.load()
    for y in range(h):
        row = y * w
        for x in range(w):
            if removed[row + x]:
                mp[x, y] = 255
    # on grossit un peu le fond retiré pour manger le halo (anti-crénelage rose)
    mask = mask.filter(ImageFilter.MaxFilter(3))
    alpha = mask.point(lambda v: 255 - v).filter(ImageFilter.GaussianBlur(0.6))

    out = im.convert("RGBA")
    out.putalpha(alpha)

    # 3) décontamine les pixels de bord encore teintés de rose : on les assombrit
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = op[x, y]
            if a == 0:
                continue
            near_edge = False
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1), (x + 2, y), (x - 2, y), (x, y + 2), (x, y - 2)):
                if 0 <= nx < w and 0 <= ny < h and removed[ny * w + nx]:
                    near_edge = True
                    break
            if near_edge and magenta((r, g, b)):
                k = 0.42
                op[x, y] = (int(r * k), int(g * k), int(b * k), a)

    bbox = alpha.point(lambda v: 255 if v > 24 else 0).getbbox()
    out = out.crop(bbox)
    ratio = height / out.height
    out = out.resize((max(1, round(out.width * ratio)), height), Image.LANCZOS)
    out.save(dst)
    print(dst, out.size)


if __name__ == "__main__":
    key(sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 320)

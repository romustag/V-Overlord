#!/usr/bin/env python3
"""Zones accessibles au joueur sur chaque carte 2D (simule les collisions du jeu).

  obs_reach.py <carte> <sortie.png>

vert = accessible, jaune = libre mais enfermé, rouge = bloqué par un obstacle.
"""
import sys
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, str(Path(__file__).resolve().parent))
from obs_debug import ROOT, load_obstacles  # noqa: E402

W, H = 1160, 653
FOOT_RADIUS = 14
FOOT_DROP = 25
EDGE_X = W * 0.018 + 34
EDGE_Y = H * 0.025 + 41


def main():
    name, out = sys.argv[1:3]
    polys = load_obstacles()[name]
    mask = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(mask)
    for poly in polys:
        if isinstance(poly[0], (int, float)):
            x0, y0, x1, y1 = poly
            poly = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]
        draw.polygon([(u * W, v * H) for u, v in poly], fill=255)
    blocked = mask.filter(ImageFilter.MaxFilter(FOOT_RADIUS * 2 + 1))
    blocked_px = blocked.load()
    free = {}
    for y in range(H):
        cy = y - FOOT_DROP  # centre du personnage
        for x in range(W):
            ok = EDGE_X <= x <= W - EDGE_X and EDGE_Y <= cy <= H - EDGE_Y and not blocked_px[x, y]
            free[(x, y)] = ok
    # la zone principale = plus grande composante libre (comme getMainArea dans le jeu)
    seen = set()
    best = set()
    for key, ok in free.items():
        if not ok or key in seen:
            continue
        comp = {key}
        queue = deque([key])
        seen.add(key)
        while queue:
            x, y = queue.popleft()
            for nxt in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if nxt in seen or not free.get(nxt):
                    continue
                seen.add(nxt)
                comp.add(nxt)
                queue.append(nxt)
        if len(comp) > len(best):
            best = comp
    seen = best
    image = Image.open(ROOT / "assets" / f"map-{name}-2d.jpg").convert("RGB").resize((W, H))
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    px = overlay.load()
    free_total = reach = 0
    for (x, y), ok in free.items():
        if ok:
            free_total += 1
            if (x, y) in seen:
                reach += 1
                if (x + y) % 6 == 0:
                    px[x, y] = (60, 255, 90, 120)
            else:
                px[x, y] = (255, 230, 0, 150)
        elif mask.getpixel((x, y)):
            px[x, y] = (255, 40, 40, 90)
    image = Image.alpha_composite(image.convert("RGBA"), overlay)
    image.convert("RGB").save(out)
    print(name, f"libre={free_total} accessible={reach} enfermé={free_total - reach}")


if __name__ == "__main__":
    main()

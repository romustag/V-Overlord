#!/usr/bin/env python3
"""Découpe une planche de personnages sur fond magenta en sprites individuels détourés.

Usage : python3 tools/split_sheet.py planche.jpg id1,id2,id3,... [dossier_sortie=assets/real/heros]
Les ids sont attribués dans l'ordre de lecture (ligne par ligne, de gauche à droite).
"""
import os
import sys
import tempfile
from collections import deque

from PIL import Image, ImageFilter

sys.path.insert(0, os.path.dirname(__file__))
from key_cartoon import key  # noqa: E402


def is_bg(p, bg, tol=80):
    return sum((p[i] - bg[i]) ** 2 for i in range(3)) ** 0.5 <= tol


def components(img, step=4):
    w, h = img.size
    px = img.load()
    corners = [px[2, 2], px[w - 3, 2], px[2, h - 3], px[w - 3, h - 3]]
    bg = tuple(sorted(c[i] for c in corners)[1] for i in range(3))
    lw, lh = w // step, h // step
    low = Image.new("L", (lw, lh), 0)
    lp = low.load()
    for y in range(lh):
        for x in range(lw):
            found = False
            for dy in range(0, step, 2):
                for dx in range(0, step, 2):
                    if not is_bg(px[x * step + dx, y * step + dy], bg):
                        found = True
                        break
                if found:
                    break
            if found:
                lp[x, y] = 255
    fg = low.copy()
    low = low.filter(ImageFilter.MaxFilter(3))
    lp = low.load()
    seen = bytearray(lw * lh)
    boxes = []
    for y0 in range(lh):
        for x0 in range(lw):
            if lp[x0, y0] == 0 or seen[y0 * lw + x0]:
                continue
            dq = deque([(x0, y0)])
            seen[y0 * lw + x0] = 1
            xs, ys, area = [x0], [y0], 0
            minx = maxx = x0
            miny = maxy = y0
            while dq:
                x, y = dq.popleft()
                area += 1
                minx, maxx = min(minx, x), max(maxx, x)
                miny, maxy = min(miny, y), max(maxy, y)
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < lw and 0 <= ny < lh and lp[nx, ny] and not seen[ny * lw + nx]:
                        seen[ny * lw + nx] = 1
                        dq.append((nx, ny))
            if area > 120:
                boxes.append((minx * step, miny * step, (maxx + 1) * step, (maxy + 1) * step))
    # une colonne dont deux personnages se touchent presque : on coupe à la ligne la plus vide
    fp = fg.load()
    result = []
    for (x0, y0, x1, y1) in boxes:
        if (y1 - y0) > 0.6 * h and not os.environ.get("NOSPLIT"):
            lx0, lx1, ly0, ly1 = x0 // step, x1 // step, y0 // step, y1 // step
            span = ly1 - ly0
            best, best_y = None, None
            for ly in range(ly0 + int(span * 0.35), ly0 + int(span * 0.65)):
                count = sum(1 for lx in range(lx0, lx1) if fp[lx, ly])
                if best is None or count < best:
                    best, best_y = count, ly
            for (a, b) in ((ly0, best_y), (best_y + 1, ly1)):
                ys = [ly for ly in range(a, b) if any(fp[lx, ly] for lx in range(lx0, lx1))]
                xs = [lx for lx in range(lx0, lx1) if any(fp[lx, ly] for ly in range(a, b))]
                if ys and xs:
                    result.append((min(xs) * step, min(ys) * step, (max(xs) + 1) * step, (max(ys) + 1) * step))
        else:
            result.append((x0, y0, x1, y1))
    return result


def order(boxes):
    """Ordre de lecture : lignes (par centre vertical) puis gauche -> droite."""
    boxes = sorted(boxes, key=lambda b: (b[1] + b[3]) / 2)
    rows, current = [], []
    for b in boxes:
        cy = (b[1] + b[3]) / 2
        if current and cy - (current[0][1] + current[0][3]) / 2 > 150:
            rows.append(current)
            current = []
        current.append(b)
    if current:
        rows.append(current)
    return [b for row in rows for b in sorted(row, key=lambda b: b[0])]


def main():
    sheet, ids = sys.argv[1], sys.argv[2].split(",")
    out_dir = sys.argv[3] if len(sys.argv) > 3 else "assets/real/heros"
    img = Image.open(sheet).convert("RGB")
    boxes = order(components(img))
    print(f"{len(boxes)} personnage(s) détecté(s) pour {len(ids)} ids")
    if len(boxes) != len(ids):
        for b in boxes:
            print("  ", b)
        sys.exit(1)
    pad = 14
    w, h = img.size
    px = img.load()
    corners = [px[2, 2], px[w - 3, 2], px[2, h - 3], px[w - 3, h - 3]]
    bg_color = tuple(sorted(c[i] for c in corners)[1] for i in range(3))
    for cid, (x0, y0, x1, y1) in zip(ids, boxes):
        # on ne garde que la boîte du personnage ; la marge est refaite en fond pour ne pas importer un voisin
        inner = img.crop((x0, y0, x1, y1))
        crop = Image.new("RGB", (inner.width + 2 * pad, inner.height + 2 * pad), bg_color)
        crop.paste(inner, (pad, pad))
        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
            crop.save(tmp.name)
        key(tmp.name, os.path.join(out_dir, f"{cid}.png"), 320)
        os.unlink(tmp.name)


if __name__ == "__main__":
    main()

import sys, glob
from PIL import Image
files = sys.argv[2:]
W = sum(Image.open(f).width + 10 for f in files)
H = max(Image.open(f).height for f in files) + 10
sheet = Image.new("RGB", (W, H), (60, 120, 70))
x = 5
for f in files:
    im = Image.open(f).convert("RGBA")
    sheet.paste(im, (x, 5), im)
    x += im.width + 10
sheet.save(sys.argv[1])

#!/bin/bash
# Usage: c2d_apply.sh <sous-dossier|""> <nom> <hauteur>   (c2d-<...>.jpg généré -> assets/real/<...>.png sans fond magenta)
SRC=/home/ubuntu/.cursor/projects/home-ubuntu-Documents-Romuald-V-Overlord/assets
cd /home/ubuntu/Documents/Romuald/V-Overlord
python3 tools/key_hero.py "$SRC/c2d-$1.jpg" "assets/real/$2.png" "$3"

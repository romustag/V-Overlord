"""Analyse les silhouettes détourées et calcule les articulations d'un squelette 2D.

Usage : python3 tools/rig_analyse.py [--apercu tools/_rig.png]
Affiche un objet JSON {fichier: {hip, shoulder, split, armL, armR, handL, handR}} en pourcentages.
"""
import json
import os
import sys

from PIL import Image, ImageDraw

RACINE = os.path.join(os.path.dirname(__file__), "..", "assets", "real")
SANS_MEMBRES = {"citrouille.png", "citrouille-vive.png", "grosse-citrouille.png", "minion-ombre.png", "boss-cauchemars.png"}
SEUIL = 90


def segments(ligne):
    resultat, debut = [], None
    for x, plein in enumerate(ligne):
        if plein and debut is None:
            debut = x
        elif not plein and debut is not None:
            resultat.append((debut, x - 1))
            debut = None
    if debut is not None:
        resultat.append((debut, len(ligne) - 1))
    return [s for s in resultat if s[1] - s[0] >= 1]


def mediane(valeurs, defaut):
    valeurs = sorted(valeurs)
    return valeurs[len(valeurs) // 2] if valeurs else defaut


def analyser(chemin):
    image = Image.open(chemin).convert("RGBA")
    largeur, hauteur = image.size
    alpha = image.getchannel("A").load()
    plein = [[alpha[x, y] > SEUIL for x in range(largeur)] for y in range(hauteur)]

    bas = range(int(hauteur * 0.82), int(hauteur * 0.97))
    colonnes = range(int(largeur * 0.32), int(largeur * 0.68))
    comptes = {x: sum(plein[y][x] for y in bas) for x in colonnes}
    split = min(comptes, key=lambda x: (comptes[x], abs(x - largeur / 2)))
    robe = comptes[split] > len(bas) * 0.6
    if robe:
        split = largeur // 2
        entrejambe = int(hauteur * 0.66)
    else:
        entrejambe = hauteur - 1
        while entrejambe > hauteur * 0.4 and not any(plein[entrejambe][split + d] for d in (-1, 0, 1)):
            entrejambe -= 1
        entrejambe = max(int(hauteur * 0.5), min(int(hauteur * 0.8), entrejambe))
    hanche = entrejambe - int(hauteur * 0.05)

    largeurs = []
    for y in range(hauteur):
        segs = segments(plein[y])
        largeurs.append((segs[-1][1] - segs[0][0]) if segs else 0)
    reference = max(largeurs[int(hauteur * 0.15):int(hauteur * 0.5)] or [1])
    epaule = int(hauteur * 0.21)
    for y in range(int(hauteur * 0.1), int(hauteur * 0.4)):
        if largeurs[y] >= reference * 0.72:
            epaule = y
            break
    epaule = max(epaule, int(hauteur * 0.17))

    gauches, droites = [], []
    for y in range(epaule + int(hauteur * 0.08), hanche):
        segs = segments(plein[y])
        if not segs:
            continue
        centre = min(segs, key=lambda s: 0 if s[0] <= split <= s[1] else min(abs(s[0] - split), abs(s[1] - split)))
        if len(segs) >= 2:
            if segs.index(centre) > 0:
                gauches.append((segs[segs.index(centre) - 1][1] + centre[0]) // 2)
            if segs.index(centre) < len(segs) - 1:
                droites.append((centre[1] + segs[segs.index(centre) + 1][0]) // 2)
    corps = [segments(plein[y]) for y in range(int(hauteur * 0.36), hanche)]
    bords_g = [s[0][0] for s in corps if s]
    bords_d = [s[-1][1] for s in corps if s]
    bras_g = mediane(gauches, None)
    bras_d = mediane(droites, None)
    if bras_g is None:
        bras_g = mediane(bords_g, 0) + int(largeur * 0.12)
    if bras_d is None:
        bras_d = mediane(bords_d, largeur) - int(largeur * 0.12)
    bras_g = max(int(largeur * 0.12), min(int(largeur * 0.42), bras_g))
    bras_d = min(int(largeur * 0.88), max(int(largeur * 0.58), bras_d))

    def main(x0, x1):
        limite = min(int(hauteur * 0.8), hanche + int(hauteur * 0.16))
        for y in range(hanche, limite):
            if not any(plein[y][x] for x in range(x0, x1)):
                return y + int(hauteur * 0.01)
        return min(limite, hanche + int(hauteur * 0.1))

    main_g = main(0, bras_g)
    main_d = main(bras_d, largeur)
    pct = lambda v, total: round(v * 100 / total, 1)
    return {
        "hip": pct(hanche, hauteur),
        "shoulder": pct(epaule, hauteur),
        "split": pct(split, largeur),
        "armL": pct(bras_g, largeur),
        "armR": pct(bras_d, largeur),
        "handL": pct(main_g, hauteur),
        "handR": pct(main_d, hauteur),
    }


def fichiers():
    for nom in sorted(os.listdir(RACINE)):
        if nom.endswith(".png") and nom not in SANS_MEMBRES:
            yield nom, os.path.join(RACINE, nom)
    dossier = os.path.join(RACINE, "heros")
    for nom in sorted(os.listdir(dossier)):
        yield f"heros/{nom}", os.path.join(dossier, nom)


def apercu(resultats, sortie):
    cellule = 180
    noms = list(resultats)
    colonnes = 9
    feuille = Image.new("RGB", (colonnes * cellule, ((len(noms) + colonnes - 1) // colonnes) * (cellule + 14)), (60, 60, 60))
    for index, nom in enumerate(noms):
        image = Image.open(os.path.join(RACINE, nom)).convert("RGBA")
        image.thumbnail((cellule - 8, cellule - 8))
        l, h = image.size
        r = resultats[nom]
        calque = Image.new("RGBA", image.size, (0, 0, 0, 0))
        dessin = ImageDraw.Draw(calque)
        X = lambda p: p * l / 100
        Y = lambda p: p * h / 100
        dessin.rectangle([0, Y(r["shoulder"]), X(r["armL"]), Y(r["handL"])], fill=(0, 120, 255, 90))
        dessin.rectangle([X(r["armR"]), Y(r["shoulder"]), l, Y(r["handR"])], fill=(0, 220, 120, 90))
        dessin.rectangle([X(r["armL"]), Y(r["hip"]), X(r["split"]), h], fill=(255, 60, 60, 80))
        dessin.rectangle([X(r["split"]), Y(r["hip"]), X(r["armR"]), h], fill=(255, 200, 0, 80))
        image = Image.alpha_composite(image, calque)
        x = (index % colonnes) * cellule
        y = (index // colonnes) * (cellule + 14)
        feuille.paste(image, (x + 4, y + 4), image)
        ImageDraw.Draw(feuille).text((x + 3, y + cellule), nom.split("/")[-1][:24], fill=(255, 255, 0))
    feuille.save(sortie)


if __name__ == "__main__":
    resultats = {nom: analyser(chemin) for nom, chemin in fichiers()}
    if "--apercu" in sys.argv:
        apercu(resultats, sys.argv[sys.argv.index("--apercu") + 1])
    print(json.dumps(resultats, indent=1))

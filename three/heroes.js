// Héros jouables en 3D : un constructeur "figurine" paramétré par une fiche par skin.
import { THREE, solid, emit, group, limb } from "./core.js?v=53";
import { buildWeapon } from "./weapons.js?v=53";

const SKIN = 0xf2bf94;
const DARK = 0x1b1426;

// ---------- Têtes : chapeaux, casques, capuches ----------
const HATS = {
  cap(head, c) {
    solid(head, "dome", c, [1.02, 0.95, 1.04], [0, 0.0, 0], [-0.42, 0, 0]);
    solid(head, "box", c, [0.62, 0.05, 0.38], [0, 0.2, 0.5], [0.12, 0, 0]);
  },
  helmet(head, c, c2) {
    solid(head, "dome", c, [1.06, 1.0, 1.08], [0, 0.0, 0], [-0.4, 0, 0], { gloss: true });
    solid(head, "box", c2 ?? c, [0.1, 0.34, 0.06], [0, 0.0, 0.5]);
  },
  hood(head, c) {
    solid(head, "dome", c, [1.14, 1.14, 1.16], [0, -0.02, -0.02], [-0.5, 0, 0]);
    solid(head, "sphere", c, [1.0, 1.0, 0.8], [0, -0.02, -0.14]);
    solid(head, "cone", c, [0.4, 0.55, 0.4], [0, 0.06, -0.52], [-1.9, 0, 0]);
  },
  wide(head, c, c2) {
    solid(head, "cyl", c, [1.34, 0.06, 1.34], [0, 0.2, 0.02], [-0.06, 0, 0]);
    solid(head, "cyl", c, [0.74, 0.36, 0.74], [0, 0.42, 0], [-0.06, 0, 0]);
    if (c2 !== undefined) solid(head, "cyl", c2, [0.77, 0.08, 0.77], [0, 0.28, 0], [-0.06, 0, 0]);
  },
  witch(head, c, c2) {
    solid(head, "cyl", c, [1.4, 0.06, 1.4], [0, 0.2, 0], [-0.1, 0, 0]);
    solid(head, "cone", c, [0.78, 1.1, 0.78], [0, 0.78, -0.06], [-0.1, 0, 0]);
    solid(head, "cone", c, [0.3, 0.42, 0.3], [0, 1.36, -0.26], [-0.9, 0, 0]);
    solid(head, "cyl", c2 ?? 0x7a3bd1, [0.76, 0.1, 0.76], [0, 0.28, -0.02], [-0.1, 0, 0]);
  },
  top(head, c, c2) {
    solid(head, "cyl", c, [1.0, 0.06, 1.0], [0, 0.34, 0], [-0.1, 0, 0]);
    solid(head, "cyl", c, [0.66, 0.72, 0.66], [0, 0.7, 0], [-0.1, 0, 0]);
    solid(head, "cyl", c2 ?? 0xffd23f, [0.68, 0.1, 0.68], [0, 0.42, 0], [-0.1, 0, 0]);
  },
  tricorn(head, c, c2) {
    solid(head, "cyl", c, [1.24, 0.1, 1.24], [0, 0.26, 0], [-0.12, 0, 0]);
    solid(head, "cyl", c, [0.7, 0.34, 0.7], [0, 0.44, 0], [-0.12, 0, 0]);
    solid(head, "cone", c, [0.5, 0.45, 0.5], [0, 0.4, 0.62], [-1.5, 0, 0]);
    solid(head, "cone", c, [0.5, 0.45, 0.5], [-0.56, 0.4, -0.2], [-0.3, 0, 1.5]);
    solid(head, "cone", c, [0.5, 0.45, 0.5], [0.56, 0.4, -0.2], [-0.3, 0, -1.5]);
    solid(head, "cyl", c2 ?? 0xd9b25a, [0.74, 0.07, 0.74], [0, 0.34, 0], [-0.12, 0, 0]);
    solid(head, "sphere", 0xf3efe2, [0.14, 0.14, 0.05], [0, 0.46, 0.4], [0, 0, 0]);
  },
  kabuto(head, c, c2) {
    solid(head, "dome", c, [1.12, 1.04, 1.12], [0, 0.02, 0], [-0.4, 0, 0], { gloss: true });
    solid(head, "cyl", c, [1.3, 0.1, 0.9], [0, -0.06, -0.3], [0.5, 0, 0]);
    solid(head, "cone", c2 ?? 0xffcb3d, [0.12, 0.7, 0.06], [-0.28, 0.62, 0.3], [0.25, 0, 0.55]);
    solid(head, "cone", c2 ?? 0xffcb3d, [0.12, 0.7, 0.06], [0.28, 0.62, 0.3], [0.25, 0, -0.55]);
  },
  vikinghelm(head, c, c2) {
    solid(head, "dome", c, [1.08, 1.0, 1.1], [0, 0.0, 0], [-0.4, 0, 0], { gloss: true });
    solid(head, "cyl", c2 ?? 0x8b5a2b, [1.1, 0.07, 1.12], [0, 0.12, 0], [-0.4, 0, 0]);
    solid(head, "box", c, [0.09, 0.38, 0.06], [0, -0.02, 0.5]);
    solid(head, "cone", 0xf0e6cf, [0.2, 0.6, 0.2], [-0.56, 0.38, 0], [0, 0, 0.9]);
    solid(head, "cone", 0xf0e6cf, [0.2, 0.6, 0.2], [0.56, 0.38, 0], [0, 0, -0.9]);
  },
  hardhat(head, c) {
    solid(head, "dome", c, [1.06, 1.0, 1.08], [0, 0.04, 0], [-0.3, 0, 0], { gloss: true });
    solid(head, "box", c, [0.7, 0.05, 0.4], [0, 0.18, 0.5], [0.08, 0, 0]);
    solid(head, "box", c, [0.12, 0.08, 0.9], [0, 0.5, 0]);
    solid(head, "cyl", 0x2c2f3a, [0.3, 0.07, 0.07], [0, 0.22, 0.47], [0, 0, 0]);
  },
  bandana(head, c) {
    solid(head, "dome", c, [1.0, 0.9, 1.02], [0, 0.02, 0], [-0.45, 0, 0]);
    solid(head, "torus", c, [0.9, 0.9, 0.9], [0, 0.18, 0], [Math.PI / 2 - 0.1, 0, 0], { outline: 0.02 });
    solid(head, "cone", c, [0.2, 0.4, 0.1], [-0.12, 0.22, -0.5], [0.6, 0, 0.5]);
  },
  // casque d'écailles argent : crête rouge, cornes recourbées et petit crâne sur le front (Maisie draconique)
  dragonhelm(head, c, c2) {
    solid(head, "dome", c, [1.12, 1.04, 1.14], [0, 0.04, -0.02], [-0.42, 0, 0], { gloss: true });
    solid(head, "cyl", c2 ?? 0x8e97a8, [1.13, 0.09, 1.16], [0, 0.1, -0.02], [-0.42, 0, 0], { gloss: true });
    solid(head, "box", 0xc9242f, [0.12, 0.3, 0.62], [0, 0.5, -0.1], [-0.35, 0, 0]);
    for (const side of [-1, 1]) {
      solid(head, "cone", 0xc9242f, [0.22, 0.6, 0.22], [side * 0.5, 0.36, -0.1], [-0.35, 0, -side * 0.85]);
      solid(head, "cone", 0xe8e1cf, [0.1, 0.24, 0.1], [side * 0.62, 0.62, -0.24], [-0.5, 0, -side * 1.1], { noOutline: true });
      solid(head, "cone", c2 ?? 0x8e97a8, [0.2, 0.3, 0.16], [side * 0.5, 0.0, 0.0], [0, 0, -side * 1.35], { gloss: true });
    }
    solid(head, "sphere", 0xefe8d4, [0.2, 0.17, 0.09], [0, 0.36, 0.48], [0.5, 0, 0], { noOutline: true });
    solid(head, "sphere", DARK, [0.05, 0.06, 0.04], [-0.05, 0.37, 0.52], [0.5, 0, 0], { noOutline: true });
    solid(head, "sphere", DARK, [0.05, 0.06, 0.04], [0.05, 0.37, 0.52], [0.5, 0, 0], { noOutline: true });
  },
  horns(head, c) {
    solid(head, "cone", c, [0.2, 0.62, 0.2], [-0.3, 0.52, 0.04], [0.2, 0, 0.45]);
    solid(head, "cone", c, [0.2, 0.62, 0.2], [0.3, 0.52, 0.04], [0.2, 0, -0.45]);
  },
  beanie(head, c) {
    solid(head, "dome", c, [1.02, 1.0, 1.04], [0, 0.02, 0], [-0.3, 0, 0]);
    solid(head, "cyl", c, [0.98, 0.14, 0.98], [0, 0.17, 0.04], [-0.3, 0, 0]);
  },
};

// ---------- Cheveux ----------
const HAIR = {
  short(head, c) {
    solid(head, "dome", c, [1.0, 0.94, 1.02], [0, 0.04, -0.01], [-0.46, 0, 0]);
  },
  spiky(head, c) {
    solid(head, "dome", c, [1.0, 0.9, 1.02], [0, 0.03, -0.01], [-0.5, 0, 0]);
    const spikes = [[-0.28, 0.42, 0.1, 0.5], [0, 0.5, 0.12, 0], [0.28, 0.42, 0.1, -0.5], [-0.16, 0.46, -0.2, 0.3], [0.16, 0.46, -0.2, -0.3]];
    for (const [x, y, z, r] of spikes) solid(head, "cone", c, [0.24, 0.44, 0.24], [x, y, z], [-0.15, 0, r]);
  },
  long(head, c) {
    solid(head, "dome", c, [1.04, 0.96, 1.06], [0, 0.04, -0.02], [-0.5, 0, 0]);
    solid(head, "cyl", c, [0.98, 0.7, 0.4], [0, -0.14, -0.3]);
    solid(head, "sphere", c, [0.22, 0.5, 0.26], [-0.46, -0.1, -0.06]);
    solid(head, "sphere", c, [0.22, 0.5, 0.26], [0.46, -0.1, -0.06]);
  },
  braid(head, c) {
    HAIR.short(head, c);
    solid(head, "sphere", c, [0.5, 0.5, 0.4], [0, -0.1, -0.4]);
    for (let i = 0; i < 4; i += 1) solid(head, "sphere", c, [0.2 - i * 0.015, 0.2, 0.2], [0.05, -0.34 - i * 0.17, -0.44 - i * 0.03]);
  },
  slick(head, c) {
    solid(head, "dome", c, [1.0, 0.94, 1.02], [0, 0.05, -0.02], [-0.55, 0, 0]);
    solid(head, "cone", c, [0.36, 0.34, 0.2], [0, 0.2, 0.42], [1.2, 0, 0]);
  },
  curly(head, c) {
    // Boucles sur les côtés et l'arrière seulement : le visage reste dégagé.
    for (let i = 0; i < 12; i += 1) {
      const a = (i / 12) * Math.PI * 2;
      if (Math.sin(a) > 0.45) continue;
      solid(head, "sphere", c, 0.34, [Math.cos(a) * 0.5, 0.2 + (i % 2) * 0.14, Math.sin(a) * 0.46 - 0.06]);
    }
    solid(head, "sphere", c, [0.5, 0.38, 0.5], [0, 0.42, -0.06]);
  },
  // touffes blanches qui débordent du casque
  fluffy(head, c) {
    solid(head, "sphere", c, [0.5, 0.34, 0.5], [0, 0.56, -0.12]);
    for (const side of [-1, 1]) {
      solid(head, "sphere", c, [0.26, 0.36, 0.34], [side * 0.5, -0.04, -0.06]);
      solid(head, "sphere", c, [0.22, 0.24, 0.26], [side * 0.5, 0.2, 0.08]);
    }
    solid(head, "sphere", c, [0.78, 0.46, 0.3], [0, 0.0, -0.46]);
  },
  bob(head, c) {
    solid(head, "dome", c, [1.04, 0.96, 1.06], [0, 0.04, -0.02], [-0.5, 0, 0]);
    solid(head, "sphere", c, [0.3, 0.55, 0.5], [-0.46, -0.12, -0.04]);
    solid(head, "sphere", c, [0.3, 0.55, 0.5], [0.46, -0.12, -0.04]);
    solid(head, "sphere", c, [0.86, 0.55, 0.4], [0, -0.1, -0.34]);
  },
};

// ---------- Visages ----------
function addFace(head, spec) {
  const eyes = spec.eyes ?? "dot";
  if (eyes !== "none") {
    for (const side of [-1, 1]) {
      if (eyes === "glow") {
        emit(head, "sphere", spec.eyeColor ?? 0x7cf6ff, [0.15, 0.17, 0.06], [side * 0.16, 0.02, 0.41]);
      } else if (eyes === "hollow") {
        solid(head, "sphere", DARK, [0.17, 0.2, 0.06], [side * 0.16, 0.02, 0.405], [0, 0, 0], { noOutline: true });
        emit(head, "sphere", spec.eyeColor ?? 0xb56bff, [0.06, 0.06, 0.04], [side * 0.16, 0.02, 0.43]);
      } else {
        solid(head, "sphere", 0xffffff, [0.29, 0.38, 0.09], [side * 0.2, 0.0, 0.39], [0, 0, 0], { noOutline: true, gloss: true });
        solid(head, "sphere", spec.iris ?? 0x1c1226, [0.2, 0.3, 0.06], [side * 0.198, -0.01, 0.43], [0, 0, 0], { noOutline: true });
        emit(head, "sphere", 0xffffff, [0.085, 0.11, 0.03], [side * 0.198 + 0.045, 0.07, 0.46]);
        emit(head, "sphere", 0xffffff, [0.04, 0.05, 0.02], [side * 0.198 - 0.04, -0.08, 0.46]);
      }
      if (eyes === "angry" || (eyes === "dot" && spec.brows !== false) || spec.angryBrows) {
        solid(head, "box", spec.browColor ?? spec.hair?.[1] ?? DARK, [0.27, 0.08, 0.06], [side * 0.2, 0.26, 0.4], [0, 0, -side * 0.3], { noOutline: true });
      }
    }
  }
  if (spec.female && eyes !== "none") {
    for (const side of [-1, 1]) {
      solid(head, "box", DARK, [0.14, 0.04, 0.05], [side * 0.3, 0.17, 0.4], [0, 0, side * -0.5], { noOutline: true });
      solid(head, "box", DARK, [0.1, 0.035, 0.05], [side * 0.33, 0.07, 0.38], [0, 0, side * -0.9], { noOutline: true });
    }
  }
  const mouth = spec.mouth ?? "smile";
  if (mouth === "smile") solid(head, "arc", DARK, [0.3, 0.2, 0.1], [0, -0.1, 0.43], [0.1, 0, Math.PI], { noOutline: true });
  else if (mouth === "grin") {
    solid(head, "box", DARK, [0.26, 0.09, 0.05], [0, -0.16, 0.43], [0, 0, 0], { noOutline: true });
    solid(head, "box", 0xffffff, [0.2, 0.035, 0.05], [0, -0.135, 0.455], [0, 0, 0], { noOutline: true });
  } else if (mouth === "fangs") {
    solid(head, "box", DARK, [0.16, 0.05, 0.05], [0, -0.16, 0.43], [0, 0, 0], { noOutline: true });
    solid(head, "cone", 0xffffff, [0.045, 0.1, 0.04], [-0.07, -0.2, 0.44], [Math.PI, 0, 0], { noOutline: true });
    solid(head, "cone", 0xffffff, [0.045, 0.1, 0.04], [0.07, -0.2, 0.44], [Math.PI, 0, 0], { noOutline: true });
  } else if (mouth === "flat") solid(head, "box", DARK, [0.2, 0.04, 0.04], [0, -0.16, 0.435], [0, 0, 0], { noOutline: true });
  if (spec.nose !== false && mouth !== "none") solid(head, "sphere", spec.noseColor ?? 0xe29c76, [0.08, 0.07, 0.07], [0, -0.04, 0.45], [0, 0, 0], { noOutline: true });
}

function addBeard(head, c, style = "full") {
  if (style === "full") {
    solid(head, "sphere", c, [0.78, 0.5, 0.5], [0, -0.28, 0.12]);
    solid(head, "sphere", c, [0.34, 0.14, 0.12], [0, -0.1, 0.44], [0, 0, 0], { noOutline: true });
  } else if (style === "braids") {
    solid(head, "sphere", c, [0.78, 0.46, 0.5], [0, -0.28, 0.12]);
    solid(head, "cyl", c, [0.14, 0.5, 0.14], [-0.18, -0.58, 0.32]);
    solid(head, "cyl", c, [0.14, 0.5, 0.14], [0.18, -0.58, 0.32]);
  } else if (style === "goatee") {
    solid(head, "cone", c, [0.2, 0.3, 0.14], [0, -0.38, 0.38], [Math.PI, 0, 0]);
  }
}

// ---------- Fiches des 32 skins ----------
const S = (o) => o;
export const HERO_SPECS = {
  survivant: S({
    hair: ["spiky", 0x6b4326], torso: 0x5d6a35, sleeve: 0x5d6a35, shirt: 0x2a2630, legs: 0x6a4a2c, boots: 0x3d2a1b, belt: 0x3d2a1b, pack: 0x7a5530,
    mouth: "smile", brows: true,
  }),
  pisteur: S({
    hat: ["bandana", 0x56642f], hair: ["short", 0x3a2a1c], torso: 0x4d5a2e, legs: 0x4a5530, boots: 0x4a3322, hands: 0x23232b, pack: 0xa98657,
    belt: 0x3a2a1c, paint: 0x2e4020, eyes: "angry",
  }),
  secouriste: S({
    female: true,
    hair: ["short", 0xf0c25a], hat: ["hood", 0xeee7da], torso: 0xf1ebe0, sleeve: 0xf1ebe0, legs: 0x2d3340, boots: 0x20232c, belt: 0x20232c,
    pack: 0xd23a3a, cross: 0xd23a3a, mouth: "smile",
  }),
  sentinelle: S({
    hat: ["helmet", 0xaab7c8, 0x8f9db0], beard: 0x5b3a22, torso: 0x2c4a8a, sleeve: 0x2c4a8a, legs: 0x3a3d52, boots: 0x6a6f7c, pads: 0xaab7c8, cape: 0x2a3f78,
    belt: 0x5b3a22, chain: 0x8f9db0, mouth: "none",
  }),
  aventuriere: S({
    female: true,
    hair: ["braid", 0x9b4a22], torso: 0xdcc08f, sleeve: 0xdcc08f, vest: 0x6a4125, legs: 0x6b4a2d, boots: 0x4b2f1b, belt: 0x4b2f1b, pack: 0x7a5530,
    hat: undefined, mouth: "smile",
  }),
  cendre: S({
    hat: ["hood", 0x4a4f5a], mask: 0x353a45, torso: 0x4a5260, sleeve: 0x4a5260, legs: 0x3b414d, boots: 0x4a3322, pack: 0x6a6b3a, scarf: 0x7a2a22, eyes: "angry",
  }),
  chevalier: S({
    hat: ["helmet", 0xc9d2de, 0xd4a93a], plume: 0xd23a3a, visor: true, torso: 0xc9d2de, sleeve: 0xaeb8c6, legs: 0xaeb8c6, boots: 0x8d97a6, pads: 0xd4a93a,
    tabard: 0xc43838, cape: 0xa02a2a, belt: 0xd4a93a, eyes: "none", mouth: "none", armor: true,
  }),
  citrouille: S({
    pumpkinHead: true, torso: 0xe8791c, sleeve: 0xe8791c, legs: 0x5a3a1d, boots: 0x3f2815, vines: true, belt: 0x3f7a2c,
  }),
  clown: S({
    hair: ["curly", 0xff8a2a], hat: ["top", 0x7a3bd1, 0xffd23f], whiteFace: true, nose: false, torso: 0xffffff, stripe: 0xb046e8, sleeve: 0xffd23f, legs: 0xb046e8,
    boots: 0xd62b2b, bigShoes: true, ruff: 0xffffff, redNose: true, mouth: "grin",
  }),
  cowboy: S({
    hat: ["wide", 0x7a4f2a, 0x3d2a1b], beard: 0x4a2f1a, bandana: 0xc23b2b, torso: 0xc9a46a, sleeve: 0xc9a46a, coat: 0xb48b52, legs: 0x3d5f9a, boots: 0x5a3820,
    belt: 0x3d2a1b, mouth: "none",
  }),
  cyborg: S({
    hat: ["helmet", 0x2a2f3d, 0x2a2f3d], mask: 0x2a2f3d, visorGlow: 0x00e5ff, torso: 0x2a2f3d, sleeve: 0x2a2f3d, legs: 0x1f232e, boots: 0x16181f, hands: 0x4a5266, neon: 0x00e5ff,
    neon2: 0xff2bd6, eyes: "none", mouth: "none", pads: 0x3a4152, armor: true,
  }),
  demon: S({
    skin: 0xd83a2e, hat: ["horns", 0x2a1a1a], hair: ["spiky", 0x1b1015], torso: 0x2a1f2a, sleeve: 0xd83a2e, legs: 0x2a1f2a, boots: 0x16101a, pads: 0x4a3340, spikes: true,
    lava: 0xff7a1a, eyes: "glow", eyeColor: 0xffe14a, mouth: "fangs", tail: 0xd83a2e, hands: 0xd83a2e, armor: true, nose: false,
  }),
  epouvantail: S({
    skin: 0xe9c56a, hat: ["wide", 0x8a5a2a, 0xc23b2b], pointedHat: true, torso: 0xb04a2a, sleeve: 0xb04a2a, checks: 0x2a2230, legs: 0x3a3f58, boots: 0x4a3322, stitches: true,
    straw: 0xe8c64a, eyes: "glow", eyeColor: 0xfff06a, mouth: "grin", nose: false,
  }),
  fantome: S({
    skin: 0xdfe8f2, hat: ["hood", 0x59606f], ghost: 0x59606f, eyes: "glow", eyeColor: 0x6fe8ff, mouth: "none", torso: 0x59606f, sleeve: 0x59606f, chains: true, nose: false,
  }),
  faucheuse: S({
    skinless: true, hat: ["hood", 0x1b1426], ghost: 0x241a38, skull: true, mouth: "none", eyes: "hollow", eyeColor: 0xc06bff, torso: 0x241a38, sleeve: 0x241a38, flame: 0xa855ff,
  }),
  feuillage: S({
    hair: ["short", 0x3a2a1c], hat: ["hood", 0x4f7a2a], leafy: [0x5f8f2f, 0xc27a2a, 0x8aa83a], torso: 0x4f7a2a, sleeve: 0x4f7a2a, legs: 0x3d4f25, boots: 0x3a2a1c,
    pack: 0x5a4a2a, eyes: "angry",
  }),
  "garde-forestier": S({
    hat: ["wide", 0x6b4a2a, 0x3d2a1b], beard: 0x6a3f22, torso: 0x4f7a3a, sleeve: 0x4f7a3a, vest: 0x6a4125, legs: 0x9a7a4a, boots: 0x4a3322, belt: 0x3d2a1b, rope: 0xd8c28a,
    mouth: "none",
  }),
  loup: S({
    hat: ["hood", 0x8a8f9c], wolf: true, hair: ["short", 0x1b1426], glasses: true, torso: 0x8a8f9c, sleeve: 0x8a8f9c, belly: 0xdfe3ea, legs: 0x8a8f9c, boots: 0x4a4f5c,
    tail: 0x8a8f9c, mouth: "smile",
  }),
  mecanicien: S({
    hat: ["hardhat", 0xffc21a], goggles: true, beard: 0x5b3a22, torso: 0x3a62a8, sleeve: 0xd8d2c4, legs: 0x3a62a8, boots: 0x4a3322, hands: 0x7a5530, belt: 0x7a5530,
    mouth: "none",
  }),
  momie: S({
    skin: 0xdcc79a, wraps: 0xe6d6a8, torso: 0xe0d0a0, sleeve: 0xe0d0a0, legs: 0xe0d0a0, boots: 0xc9b480, hands: 0xe6d6a8, sash: 0x9a3a2a, eyes: "glow",
    eyeColor: 0x5ad7ff, mouth: "none", nose: false, scarab: 0xd4a93a, wrapHead: true,
  }),
  ninja: S({
    female: true,
    hat: ["hood", 0x2b2140], mask: 0x2b2140, torso: 0x2b2140, sleeve: 0x2b2140, legs: 0x241b36, boots: 0x16101f, scarf: 0x7a3bd1, hands: 0x16101f, belt: 0x7a3bd1,
    eyes: "angry", band: 0xb046e8,
  }),
  nomade: S({
    female: true,
    hat: ["hood", 0xc9a76a], mask: 0xb89358, goggles: true, torso: 0xc9a76a, sleeve: 0xc9a76a, legs: 0x7a5a38, boots: 0x6a4a2c, cape: 0xb48b52, belt: 0x6a4a2c, eyes: "angry",
  }),
  pirate: S({
    skin: 0x7a9db0, hat: ["tricorn", 0x14121f, 0xd9b25a], beard: 0x14121f, eyes: "glow", eyeColor: 0x6fe8ff, torso: 0x233a6a, sleeve: 0x233a6a, sash: 0xc23b2b,
    legs: 0x1b1d2e, boots: 0x14121f, belt: 0x14121f, buttons: 0xd9b25a, cape: 0x233a6a, mouth: "none", flames: 0x4ad8ff, hands: 0x7a9db0,
  }),
  renard: S({
    female: true,
    hat: ["hood", 0xe8731c], fox: true, hair: ["short", 0xe8731c], torso: 0xe8731c, sleeve: 0xe8731c, belly: 0xf6ead2, legs: 0xe8731c, boots: 0x20202a, tail: 0xe8731c,
    tailTip: 0xffffff, mouth: "smile", brows: true,
  }),
  samourai: S({
    hat: ["kabuto", 0xb02a2a, 0xffcb3d], menpo: 0x1b1426, torso: 0xb02a2a, sleeve: 0x241b2f, legs: 0x241b2f, boots: 0x3a2a1c, pads: 0xb02a2a, belt: 0xffcb3d,
    eyes: "angry", armor: true, mouth: "none",
  }),
  squelette: S({
    skull: true, skinless: true, mouth: "none", eyes: "hollow", eyeColor: 0xff9a2a, torso: 0x241b2f, sleeve: 0xefe8d4, legs: 0xefe8d4, boots: 0x16101f, ribs: true, hands: 0xefe8d4,
    belt: 0x7a5a2a,
  }),
  sorciere: S({
    female: true,
    hat: ["witch", 0x1b1426, 0x7a3bd1], hair: ["long", 0x1b1426], torso: 0x6a2fa8, sleeve: 0x6a2fa8, coat: 0x4a2278, legs: 0x241b36, boots: 0x16101f, belt: 0xd9b25a,
    mouth: "smile", runes: 0xe0b3ff,
  }),
  vampire: S({
    skin: 0xe6dcea, hair: ["slick", 0x14121f], eyes: "glow", eyeColor: 0xff2a3a, mouth: "fangs", torso: 0x1b1426, sleeve: 0x1b1426, legs: 0x241b36, boots: 0x14121f,
    cape: 0x1b1426, capeLining: 0xb01c2e, collar: 0x1b1426, jabot: 0xf1ebe0, nose: false, tall: true,
  }),
  viking: S({
    hat: ["vikinghelm", 0x9aa4b4, 0x6a4a2c], beard: [0xd9742a, "braids"], torso: 0x3a62a8, sleeve: 0x3a62a8, mail: 0x9aa4b4, legs: 0x6a4a2c, boots: 0xe0d6c0, fur: 0xe9e0cc,
    belt: 0x4a3322, mouth: "none",
  }),
  // Maisie draconique (skin Brawl) : armure cramoisie, casque d'argent à cornes, masque noir aux yeux rouges et gantelet-dragon
  "maisie-draconique": S({
    female: true, skin: 0x8a5a3e, hair: ["fluffy", 0xf5f7fc], hat: ["dragonhelm", 0xc3cad8, 0x8e97a8], eyeMask: 0x1b1426,
    eyes: "glow", eyeColor: 0xff2330, angryBrows: true, browColor: 0x1b1426, mouth: "none", nose: false,
    torso: 0xb71e33, sleeve: 0x8d1626, legs: 0x7a1424, boots: 0xc3cad8, hands: 0x2a1c22, pads: 0xc3cad8, armor: true,
    chest: 0xc3cad8, belt: 0xd9742a, tabard: 0x8d1626, dragonArm: 0xc9242f, pose: "ready",
  }),
  zombie: S({
    skin: 0x86b45a, hair: ["spiky", 0x1b1426], torso: 0x6a3a3a, sleeve: 0x6a3a3a, checks: 0x2a2230, legs: 0x6a5a3a, boots: 0x9a2a2a, hands: 0x86b45a, bandage: 0xe8dfc4,
    mouth: "fangs", eyes: "hollow", eyeColor: 0xd8f26a, torn: true, nose: false,
  }),
  astronaute: S({
    helmet: true, torso: 0xf4f6fa, sleeve: 0xf4f6fa, legs: 0xf4f6fa, boots: 0xe8731c, hands: 0xe8731c, pack: 0xd7dbe4, chest: 0xe8731c, belt: 0xe8731c, mouth: "smile",
    hair: ["short", 0x3a2a1c],
  }),
  "chasseur-vampires": S({
    hat: ["wide", 0x1b1426, 0x7a1f2a], hair: ["short", 0x3a2a1c], torso: 0x4a2f22, sleeve: 0x4a2f22, coat: 0x4a2f22, legs: 0x241b2f, boots: 0x14121f, scarf: 0xb02a2a,
    belt: 0x14121f, bandolier: 0x7a5a2a, stake: true, eyes: "angry", mouth: "flat",
  }),
};

// ---------- Construction ----------
export function hasHero(name) {
  return Object.prototype.hasOwnProperty.call(HERO_SPECS, name);
}

export function buildHero(name) {
  const spec = { skin: SKIN, ...HERO_SPECS[name] };
  const root = group(null);
  const body = group(root);
  const ticks = [];
  const skin = spec.skin;
  const tall = spec.tall ? 1.06 : 1;
  const handColor = spec.hands ?? skin;

  // Silhouette humaine : hanches à 1,35, buste 0,9, tête ≈ 1/4 de la taille.
  const F = Boolean(spec.female);
  const HIP = 1.72;
  const TORSO_H = 1.12;
  const SHOULDER = HIP + TORSO_H - 0.1;
  const SW = F ? 0.46 : 0.55;                       // demi-largeur des épaules

  // jambes : cuisse, genou, mollet galbé, pied
  const legs = [];
  const legColor = spec.legs ?? 0x4a4a55;
  if (!spec.ghost) {
    for (const side of [-1, 1]) {
      const leg = group(body, [side * (F ? 0.21 : 0.2), HIP, 0]);
      solid(leg, "limb", legColor, F ? [0.42, 0.9, 0.44] : [0.46, 0.9, 0.48], [0, -0.4, 0]);
      const knee = group(leg, [0, -0.8, 0]);
      solid(knee, "sphere", legColor, F ? 0.25 : 0.29, [0, 0, 0.01]);
      solid(knee, "calf", legColor, F ? [0.33, 0.9, 0.36] : [0.38, 0.9, 0.4], [0, -0.38, 0]);
      const shoeLen = spec.bigShoes ? 0.78 : 0.62;
      solid(knee, "box", spec.boots ?? 0x2a2a30, [0.46, 0.36, shoeLen + 0.14], [0, -0.78, 0.12 + (shoeLen - 0.5) / 2]);
      if (spec.fur) solid(knee, "cyl", spec.fur, [0.42, 0.22, 0.44], [0, -0.7, 0]);
      if (spec.bandage && side > 0) solid(knee, "torus", spec.bandage, [0.3, 0.3, 0.3], [0, -0.3, 0], [Math.PI / 2, 0, 0], { outline: 0.02 });
      leg.userData.knee = knee;
      legs.push(leg);
    }
    solid(body, "sphere", legColor, F ? [0.78, 0.46, 0.56] : [0.66, 0.42, 0.5], [0, HIP + 0.04, 0]);
  }

  // buste
  const torso = group(body, [0, HIP - 0.02, 0]);
  torso.scale.set(F ? 1.12 : 1.42, 1.72, F ? 1.0 : 1.16);
  solid(torso, F ? "torsoFem" : "torsoBody", spec.torso ?? 0x555566, [0.7, 0.64 * tall, 0.5], [0, 0.3, 0]);
  if (F) {
    for (const side of [-1, 1]) solid(body, "sphere", spec.torso ?? 0x555566, [0.26, 0.25, 0.26], [side * 0.15, HIP + 0.8, 0.2]);
  }
  if (spec.shirt) solid(torso, "box", spec.shirt, [0.3, 0.56, 0.05], [0, 0.3, 0.2]);
  if (spec.belly) solid(torso, "sphere", spec.belly, [0.42, 0.46, 0.2], [0, 0.28, 0.17], [0, 0, 0], { noOutline: true });
  if (spec.chest) solid(torso, "box", spec.chest, [0.32, 0.22, 0.06], [0, 0.34, 0.21]);
  if (spec.stripe) for (let i = 0; i < 3; i += 1) solid(torso, "cyl", spec.stripe, [0.7, 0.09, 0.48], [0, 0.12 + i * 0.18, 0], [0, 0, 0], { noOutline: true });
  if (spec.vest) solid(torso, "cyl", spec.vest, [0.7, 0.4, 0.46], [0, 0.22, 0.01]);
  if (spec.mail) solid(torso, "cyl", spec.mail, [0.69, 0.3, 0.46], [0, 0.34, 0]);
  if (spec.tabard) solid(torso, "box", spec.tabard, [0.4, 0.62, 0.06], [0, 0.18, 0.23]);
  if (spec.cross) solid(torso, "box", spec.cross, [0.2, 0.06, 0.04], [0, 0.34, 0.23], [0, 0, 0], { noOutline: true }), solid(torso, "box", spec.cross, [0.06, 0.2, 0.04], [0, 0.34, 0.23], [0, 0, 0], { noOutline: true });
  if (spec.ribs) for (let i = 0; i < 3; i += 1) solid(torso, "box", 0xefe8d4, [0.5 - i * 0.06, 0.05, 0.05], [0, 0.18 + i * 0.12, 0.23], [0, 0, 0], { noOutline: true });
  if (spec.checks) for (let i = 0; i < 4; i += 1) solid(torso, "box", spec.checks, [0.06, 0.58, 0.05], [-0.24 + i * 0.16, 0.3, 0.215], [0, 0, 0], { noOutline: true });
  if (spec.neon) {
    emit(torso, "box", spec.neon, [0.05, 0.4, 0.04], [-0.15, 0.3, 0.225]);
    emit(torso, "box", spec.neon2 ?? spec.neon, [0.05, 0.4, 0.04], [0.15, 0.3, 0.225]);
  }
  if (spec.lava) emit(torso, "box", spec.lava, [0.08, 0.38, 0.04], [0, 0.3, 0.225]);
  if (spec.runes) for (let i = 0; i < 3; i += 1) emit(torso, "sphere", spec.runes, [0.07, 0.07, 0.03], [-0.12 + i * 0.12, 0.2 + (i % 2) * 0.2, 0.225]);
  if (spec.buttons) for (let i = 0; i < 3; i += 1) emit(torso, "sphere", spec.buttons, [0.06, 0.06, 0.04], [0.1, 0.12 + i * 0.16, 0.225]);
  if (spec.scarab) emit(torso, "sphere", spec.scarab, [0.14, 0.18, 0.05], [0, 0.36, 0.23]);
  if (spec.wraps) for (let i = 0; i < 4; i += 1) solid(torso, "cyl", spec.wraps, [0.69, 0.07, 0.47], [0, 0.1 + i * 0.15, 0], [0.18 * (i % 2 ? 1 : -1), 0, 0.14 * (i % 2 ? -1 : 1)], { outline: 0.016 });
  if (spec.torn) solid(torso, "cone", spec.torso, [0.18, 0.2, 0.1], [0.2, -0.04, 0.12], [Math.PI, 0, 0]);
  if (spec.belt) solid(torso, "cyl", spec.belt, [0.69, 0.1, 0.47], [0, 0.02, 0]);
  if (spec.sash) solid(torso, "cyl", spec.sash, [0.7, 0.1, 0.48], [0, 0.05, 0], [0, 0, 0.0]);
  if (spec.bandolier) solid(torso, "box", spec.bandolier, [0.1, 0.84, 0.06], [0, 0.3, 0.22], [0, 0, 0.7]);
  if (spec.rope) solid(torso, "torus", spec.rope, [0.66, 0.66, 0.66], [0, 0.3, 0], [Math.PI / 2, 0, 0.2], { outline: 0.016 });
  if (spec.chain) solid(torso, "torus", spec.chain, [0.62, 0.62, 0.62], [0, 0.46, 0], [Math.PI / 2.4, 0, 0], { outline: 0.016 });
  if (spec.collar) {
    solid(torso, "box", spec.collar, [0.12, 0.34, 0.14], [-0.3, 0.64, -0.12], [0, 0, 0.35]);
    solid(torso, "box", spec.collar, [0.12, 0.34, 0.14], [0.3, 0.64, -0.12], [0, 0, -0.35]);
  }
  if (spec.jabot) solid(torso, "cone", spec.jabot, [0.26, 0.3, 0.1], [0, 0.54, 0.22], [Math.PI, 0, 0]);
  if (spec.ruff) solid(torso, "torus", spec.ruff, [0.7, 0.7, 0.7], [0, 0.64, 0], [Math.PI / 2, 0, 0], { outline: 0.02 });
  if (spec.fur) solid(torso, "torus", spec.fur, [0.74, 0.74, 0.74], [0, 0.6, 0], [Math.PI / 2, 0, 0], { outline: 0.02 });
  if (spec.scarf) {
    solid(torso, "torus", spec.scarf, [0.62, 0.62, 0.62], [0, 0.62, 0.02], [Math.PI / 2, 0, 0], { outline: 0.02 });
    solid(torso, "box", spec.scarf, [0.18, 0.46, 0.06], [-0.18, 0.4, -0.26], [0.1, 0, 0.18]);
  }
  if (spec.bandana) solid(torso, "cone", spec.bandana, [0.34, 0.26, 0.2], [0, 0.56, 0.2], [Math.PI, 0, 0]);
  if (spec.coat) solid(body, "taper", spec.coat, [F ? 0.9 : 1.04, 1.3, 0.74], [0, HIP - 0.5, 0], [0, 0, 0]);
  if (spec.ghost) {
    solid(body, "taper", spec.ghost, [1.06, 2.15, 0.8], [0, 1.02, 0]);
    const wisps = group(body, [0, 0.02, 0]);
    for (let i = 0; i < 6; i += 1) {
      const a = (i / 6) * Math.PI * 2;
      solid(wisps, "cone", spec.ghost, [0.2, 0.3, 0.2], [Math.cos(a) * 0.36, 0.0, Math.sin(a) * 0.3], [Math.PI, 0, 0]);
    }
    if (spec.flame) {
      for (let i = 0; i < 5; i += 1) {
        const a = (i / 5) * Math.PI * 2;
        const flame = emit(body, "cone", spec.flame, [0.16, 0.34, 0.16], [Math.cos(a) * 0.4, 0.06, Math.sin(a) * 0.34], [0, 0, 0], 0.85);
        ticks.push((t) => { flame.scale.y = 0.34 + Math.sin(t * 9 + i * 1.7) * 0.08; });
      }
    }
  }
  if (spec.vines) {
    for (let i = 0; i < 4; i += 1) solid(torso, "box", 0xc4620f, [0.04, 0.58, 0.05], [-0.24 + i * 0.16, 0.3, 0.2], [0, 0, 0], { noOutline: true });
    solid(torso, "torus", spec.belt, [0.4, 0.4, 0.4], [0, 0.1, 0.1], [Math.PI / 2, 0, 0], { outline: 0.016 });
  }

  // sac à dos
  if (spec.pack) solid(body, "box", spec.pack, [0.62, 0.7, 0.32], [0, SHOULDER - 0.5, -0.4]);
  if (spec.stake) solid(body, "cone", 0xcaa56a, [0.06, 0.5, 0.06], [-0.2, SHOULDER - 0.25, -0.3], [0.1, 0, 0.5]);

  // cape
  let cape;
  if (spec.cape) {
    cape = group(body, [0, SHOULDER + 0.05, -0.34]);
    solid(cape, "box", spec.cape, [1.1, 1.9, 0.09], [0, -0.95, -0.02]);
    if (spec.capeLining) solid(cape, "box", spec.capeLining, [0.9, 1.85, 0.04], [0, -0.95, 0.03], [0, 0, 0], { noOutline: true });
    if (spec.nomad) solid(cape, "cone", spec.cape, [0.94, 0.3, 0.1], [0, -2.0, -0.02], [Math.PI, 0, 0]);
  }

  // épaulières
  if (spec.pads) {
    for (const side of [-1, 1]) {
      solid(body, "sphere", spec.pads, [0.5, 0.4, 0.5], [side * SW, SHOULDER, 0], [0, 0, 0], { gloss: Boolean(spec.armor) });
      if (spec.spikes) solid(body, "cone", spec.pads, [0.16, 0.38, 0.16], [side * (SW + 0.04), SHOULDER + 0.26, 0], [0, 0, -side * 0.4]);
    }
  }

  // bras : épaule (deltoïde), biceps, coude, avant-bras, main avec doigts
  const arms = [];
  const sleeveColor = spec.sleeve ?? spec.torso ?? 0x555566;
  const aw = F ? 0.27 : 0.34;
  for (const side of [-1, 1]) {
    const arm = group(body, [side * SW, SHOULDER, 0]);
    solid(arm, "sphere", sleeveColor, F ? 0.27 : 0.32, [0, 0, 0]);
    solid(arm, "limb", sleeveColor, [aw, 0.72, aw], [0, -0.3, 0]);
    const elbow = group(arm, [0, -0.58, 0]);
    solid(elbow, "sphere", sleeveColor, aw * 0.8, [0, 0, 0]);
    solid(elbow, "limb", sleeveColor, [aw * 0.84, 0.64, aw * 0.84], [0, -0.27, 0]);
    if (spec.wraps) solid(elbow, "torus", spec.wraps, [0.24, 0.24, 0.24], [0, -0.22, 0], [Math.PI / 2, 0, 0], { outline: 0.016 });
    solid(elbow, "sphere", handColor, [0.42, 0.48, 0.28], [0, -0.68, 0.04]);
    solid(elbow, "sphere", handColor, [0.34, 0.3, 0.22], [0, -0.86, 0.06]);
    solid(elbow, "sphere", handColor, [0.17, 0.3, 0.17], [-side * 0.2, -0.66, 0.13], [0.3, 0, -side * 0.55]);
    if (spec.bandage && side < 0) solid(elbow, "torus", spec.bandage, [0.25, 0.25, 0.25], [0, -0.3, 0], [Math.PI / 2, 0, 0], { outline: 0.02 });
    arm.rotation.z = side * 0.1;
    arm.userData.elbow = elbow;
    arms.push(arm);
  }
  const [armL, armR] = arms;
  if (spec.dragonArm) addDragonArm(armL.userData.elbow, spec.dragonArm);
  const hand = group(armR.userData.elbow, [0, -0.74, 0.06], [0, 0, 0], "hand");

  // tête
  const neck = solid(body, "limb", skin, [F ? 0.2 : 0.26, 0.34, F ? 0.2 : 0.26], [0, HIP + TORSO_H + 0.04, 0]);
  neck.rotation.x = Math.PI;
  const head = group(body, [0, (HIP + TORSO_H + 0.46) * (spec.tall ? 1.01 : 1), 0]);
  head.scale.setScalar(1.0);
  buildHead(head, spec, ticks);

  // queue
  let tail;
  if (spec.tail) {
    tail = group(body, [0, HIP + 0.1, -0.28]);
    solid(tail, "sphere", spec.tail, [0.22, 0.22, 0.4], [0, 0.05, -0.2], [-0.4, 0, 0]);
    solid(tail, "sphere", spec.tail, [0.3, 0.3, 0.5], [0, 0.2, -0.56], [-0.6, 0, 0]);
    if (spec.tailTip) solid(tail, "sphere", spec.tailTip, [0.22, 0.22, 0.26], [0, 0.34, -0.82], [-0.6, 0, 0]);
    if (spec.demonTail) solid(tail, "cone", spec.tail, [0.14, 0.2, 0.14], [0, 0.3, -0.82], [-2, 0, 0]);
  }

  // flammes de bottes (pirate)
  if (spec.flames) {
    for (const leg of legs) {
      const flame = emit(leg.userData.knee, "cone", spec.flames, [0.18, 0.34, 0.18], [0, -0.95, 0], [Math.PI, 0, 0], 0.85);
      ticks.push((t) => { flame.scale.y = 0.34 + Math.sin(t * 10 + leg.position.x * 9) * 0.08; });
    }
  }

  const model = {
    root, body, head, armL, armR, legs, hand, cape, tail, ticks, spec,
    frame: { height: 5.2, center: 2.05, pitch: 0.3 },
    weaponId: null,
    weaponNode: null,
    muzzleFlash: null,
    state: { walk: 0, aim: 0, phase: 0, kick: 0, swing: 1, dodgeT: 0, shooting: false, dodging: false, drawT: 1, drawing: false, land: 0, air: 0, crouch: 0, hurt: 0, hurtAt: 0 },
  };
  root.rotation.y = 0.34;
  model.pose = spec.pose ?? POSE_OF[name] ?? "relaxed";
  model.blobSize = 1.9;

  model.setWeapon = (id, coating) => {
    if (model.weaponNode) {
      model.weaponNode.removeFromParent();
      model.weaponNode = null;
    }
    model.weaponId = id;
    const built = id ? buildWeapon(id, coating) : null;
    if (!built) return;
    model.weaponNode = built.root;
    model.weaponInfo = built;
    built.mount.removeFromParent();
    hand.add(built.mount);
    built.mount.scale.multiplyScalar(1.5);
    model.weaponNode = built.mount;
    if (built.muzzle) {
      const flash = emit(built.muzzle, "sphere", 0xffe27a, [0.3, 0.3, 0.3], [0, 0, 0], [0, 0, 0], 0.95);
      flash.visible = false;
      model.muzzleFlash = flash;
    }
  };

  model.update = (owner, t, dt) => updateHero(model, owner, t, dt);
  return model;
}

// Gantelet en tête de dragon enfilé sur l'avant-bras : crâne, museau, mâchoire à crocs, cornes et œil ardent.
function addDragonArm(elbow, c) {
  const dragon = group(elbow, [0, -0.7, 0.2], [0.1, 0.6, 0]);
  dragon.scale.setScalar(0.82);
  solid(dragon, "sphere", c, [0.7, 0.6, 0.74], [0, 0, 0]);
  solid(dragon, "sphere", 0x8d1626, [0.48, 0.34, 0.6], [0, -0.02, 0.6]);
  solid(dragon, "sphere", c, [0.44, 0.28, 0.48], [0, 0.04, 0.82]);
  solid(dragon, "box", 0x6a0f1d, [0.38, 0.1, 0.58], [0, -0.25, 0.56], [-0.1, 0, 0]);
  for (let i = 0; i < 4; i += 1) {
    const x = -0.15 + i * 0.1;
    solid(dragon, "cone", 0xf3ecd8, [0.06, 0.14, 0.06], [x, -0.16, 0.78], [Math.PI, 0, 0], { noOutline: true });
  }
  for (const side of [-1, 1]) {
    solid(dragon, "cone", 0xe8e1cf, [0.15, 0.46, 0.15], [side * 0.28, 0.28, -0.18], [-1.1, 0, -side * 0.35]);
    emit(dragon, "sphere", 0xffc233, [0.13, 0.11, 0.06], [side * 0.27, 0.1, 0.4], [0, 0, side * 0.35]);
    solid(dragon, "sphere", DARK, [0.05, 0.05, 0.04], [side * 0.1, 0.1, 1.02], [0, 0, 0], { noOutline: true });
  }
  solid(dragon, "box", 0xc9242f, [0.1, 0.22, 0.46], [0, 0.33, 0.1], [-0.2, 0, 0]);
  return dragon;
}

function buildHead(head, spec, ticks) {
  const skin = spec.skin;
  const skullColor = 0xefe8d4;
  if (spec.pumpkinHead) {
    solid(head, "sphere", 0xe8791c, [1.04, 0.92, 1.04], [0, 0.02, 0]);
    for (const x of [-0.3, 0, 0.3]) solid(head, "cyl", 0xd2640f, [0.12, 0.9, 0.12], [x, 0.0, 0.42 * (1 - Math.abs(x))], [0, 0, 0], { noOutline: true });
    solid(head, "cyl", 0x4f7a2a, [0.14, 0.2, 0.14], [0, 0.5, 0], [0.2, 0, 0.2]);
    solid(head, "cone", 0x4f7a2a, [0.2, 0.22, 0.04], [0.16, 0.44, 0.02], [0, 0, -1.2], { noOutline: true });
    for (const side of [-1, 1]) {
      emit(head, "cone", 0xffd23f, [0.2, 0.22, 0.05], [side * 0.2, 0.08, 0.5], [0, 0, 0]);
    }
    emit(head, "cone", 0xffd23f, [0.1, 0.1, 0.05], [0, -0.06, 0.5], [Math.PI, 0, 0]);
    emit(head, "box", 0xffd23f, [0.5, 0.1, 0.05], [0, -0.22, 0.5]);
    for (let i = 0; i < 4; i += 1) solid(head, "box", 0xd2640f, [0.07, 0.12, 0.06], [-0.18 + i * 0.12, -0.22, 0.51], [0, 0, 0], { noOutline: true });
    return;
  }
  const faceColor = spec.skull ? skullColor : skin;
  if (spec.helmet) {
    solid(head, "sphere", faceColor, [0.9, 0.9, 0.9], [0, 0, 0]);
  } else {
    solid(head, "sphere", faceColor, [0.92, 0.88, 0.92], [0, 0, 0]);
  }
  if (spec.skull) {
    solid(head, "box", skullColor, [0.5, 0.26, 0.3], [0, -0.32, 0.18]);
    for (const side of [-1, 1]) solid(head, "sphere", DARK, [0.26, 0.28, 0.08], [side * 0.16, 0.02, 0.4], [0, 0, 0], { noOutline: true });
    solid(head, "cone", DARK, [0.1, 0.12, 0.05], [0, -0.14, 0.45], [Math.PI, 0, 0], { noOutline: true });
    for (let i = 0; i < 5; i += 1) solid(head, "box", DARK, [0.035, 0.1, 0.04], [-0.12 + i * 0.06, -0.36, 0.34], [0, 0, 0], { noOutline: true });
  }
  if (spec.whiteFace) solid(head, "sphere", 0xffffff, [0.8, 0.7, 0.3], [0, -0.04, 0.26], [0, 0, 0], { noOutline: true });
  if (spec.paint) {
    solid(head, "box", spec.paint, [0.34, 0.06, 0.04], [-0.2, -0.1, 0.43], [0, 0, 0.2], { noOutline: true });
    solid(head, "box", spec.paint, [0.34, 0.06, 0.04], [0.2, -0.1, 0.43], [0, 0, -0.2], { noOutline: true });
  }
  if (spec.mask || spec.menpo) {
    solid(head, "sphere", spec.mask ?? spec.menpo, [0.96, 0.5, 0.96], [0, -0.22, 0.0]);
  }
  if (!spec.skull && !spec.ghost && !spec.pumpkinHead) {
    for (const side of [-1, 1]) solid(head, "sphere", faceColor, [0.1, 0.17, 0.12], [side * 0.43, -0.03, -0.03]);
  }
  if (spec.eyeMask) {
    solid(head, "sphere", spec.eyeMask, [0.97, 0.4, 0.66], [0, 0.04, 0.1], [0, 0, 0], { noOutline: true });
    for (const side of [-1, 1]) solid(head, "cone", spec.eyeMask, [0.18, 0.24, 0.08], [side * 0.42, 0.2, 0.3], [0, 0, side * 0.9], { noOutline: true });
  }
  addFace(head, spec);
  if (spec.redNose) solid(head, "sphere", 0xe0242b, [0.2, 0.2, 0.2], [0, -0.06, 0.46]);
  if (spec.glasses) {
    for (const side of [-1, 1]) solid(head, "torus", 0x3a2f4a, [0.24, 0.24, 0.24], [side * 0.17, 0.04, 0.42], [0, 0, 0], { outline: 0.012 });
  }
  if (spec.goggles) {
    for (const side of [-1, 1]) {
      solid(head, "cyl", 0x3a3f4a, [0.26, 0.1, 0.26], [side * 0.17, 0.12, 0.42], [Math.PI / 2, 0, 0]);
      emit(head, "cyl", 0x9ee8ff, [0.18, 0.05, 0.18], [side * 0.17, 0.12, 0.47], [Math.PI / 2, 0, 0], 0.9);
    }
    solid(head, "cyl", 0x3a3f4a, [0.96, 0.07, 0.96], [0, 0.14, 0], [0, 0, 0]);
  }
  if (spec.visorGlow) {
    emit(head, "box", spec.visorGlow, [0.6, 0.13, 0.05], [0, 0.1, 0.4], [-0.08, 0, 0]);
  }
  if (spec.helmet) {
    solid(head, "sphere", 0xaee4ff, [1.1, 1.06, 1.1], [0, 0.02, 0], [0, 0, 0], { material: toonGlass(), noOutline: true });
    solid(head, "torus", 0xd7dbe4, [0.98, 0.98, 0.98], [0, -0.44, 0], [Math.PI / 2, 0, 0], { outline: 0.02 });
  }
  if (spec.wrapHead) {
    for (let i = 0; i < 4; i += 1) solid(head, "cyl", spec.wraps, [0.96 - i * 0.04, 0.09, 0.96 - i * 0.04], [0, 0.3 - i * 0.13, 0], [0.15 * (i % 2 ? 1 : -1), 0, 0.1], { outline: 0.014 });
  }
  if (spec.bandage && !spec.wrapHead) {
    solid(head, "torus", spec.bandage, [0.9, 0.9, 0.9], [0, 0.14, 0], [Math.PI / 2 - 0.2, 0, 0], { outline: 0.016 });
  }
  if (spec.stitches) {
    for (let i = 0; i < 3; i += 1) solid(head, "box", DARK, [0.03, 0.12, 0.03], [0.26 + i * 0.03, -0.12 + i * 0.1, 0.38], [0, 0, 0], { noOutline: true });
    solid(head, "box", DARK, [0.4, 0.03, 0.03], [0, -0.15, 0.44], [0, 0, 0], { noOutline: true });
  }
  if (spec.hair) HAIR[spec.hair[0]](head, spec.hair[1]);
  if (spec.beard) {
    if (Array.isArray(spec.beard)) addBeard(head, spec.beard[0], spec.beard[1]);
    else addBeard(head, spec.beard);
  }
  if (spec.hat) {
    HATS[spec.hat[0]](head, spec.hat[1], spec.hat[2]);
    if (spec.hat[0] === "hood" && spec.fox) {
      for (const side of [-1, 1]) {
        solid(head, "cone", spec.hat[1], [0.34, 0.5, 0.2], [side * 0.3, 0.6, -0.04], [0, 0, -side * 0.2]);
        solid(head, "cone", 0xf6ead2, [0.18, 0.3, 0.1], [side * 0.3, 0.58, 0.04], [0, 0, -side * 0.2], { noOutline: true });
      }
      solid(head, "sphere", 0xf6ead2, [0.5, 0.3, 0.3], [0, -0.14, 0.34], [0, 0, 0], { noOutline: true });
    }
    if (spec.hat[0] === "hood" && spec.wolf) {
      for (const side of [-1, 1]) {
        solid(head, "cone", spec.hat[1], [0.3, 0.46, 0.2], [side * 0.32, 0.6, -0.04], [0, 0, -side * 0.16]);
        solid(head, "cone", 0x3a3f4c, [0.16, 0.26, 0.08], [side * 0.32, 0.58, 0.04], [0, 0, -side * 0.16], { noOutline: true });
      }
    }
    if (spec.leafy) {
      const palette = spec.leafy;
      for (let i = 0; i < 14; i += 1) {
        const a = (i / 14) * Math.PI * 2;
        const color = palette[i % palette.length];
        solid(head, "cone", color, [0.18, 0.4, 0.06], [Math.cos(a) * 0.5, 0.2 + (i % 3) * 0.1, Math.sin(a) * 0.46 - 0.05], [Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9], { outline: 0.016 });
      }
    }
  }
  if (spec.plume) {
    solid(head, "cone", spec.plume, [0.2, 0.62, 0.32], [0, 0.72, -0.2], [-0.6, 0, 0]);
  }
  if (spec.visor) {
    solid(head, "box", 0x2b3040, [0.56, 0.12, 0.06], [0, 0.05, 0.5], [0, 0, 0], { noOutline: true });
    solid(head, "box", 0x2b3040, [0.08, 0.3, 0.06], [0, -0.1, 0.5], [0, 0, 0], { noOutline: true });
  }
  if (spec.band) solid(head, "box", spec.band, [0.96, 0.1, 0.4], [0, 0.16, 0.34], [0, 0, 0], { noOutline: true });
  if (spec.ghost && !spec.skull) {
    solid(head, "sphere", skin, [0.56, 0.5, 0.2], [0, -0.02, 0.3], [0, 0, 0], { noOutline: true });
  }
}

let glassMaterial;
function toonGlass() {
  if (!glassMaterial) {
    glassMaterial = new THREE.MeshStandardMaterial({ color: 0xe6f8ff, transparent: true, opacity: 0.22, depthWrite: false, roughness: 0.1 });
  }
  return glassMaterial;
}

// ---------- Poses d'attente ----------
// Chaque pose donne, pour un côté (-1 gauche, +1 droite) : rotation de l'épaule (x, z) et du coude (x, z).
const POSES = {
  relaxed: (side) => ({ ax: 0.04, az: side * 0.12, ex: -0.24, ez: 0 }),
  hips: (side) => ({ ax: 0.1, az: side * 0.7, ex: -0.1, ez: -side * 1.6 }),
  crossed: (side) => ({ ax: -0.3, az: -side * 0.22, ex: -1.35, ez: -side * 0.75 }),
  ready: (side) => ({ ax: -0.5, az: side * -0.05, ex: -1.0, ez: -side * 0.32 }),
  // arme posée sur l'épaule droite (bras droit replié, main près de l'épaule), main gauche sur la hanche
  shoulder: (side, melee) => (side > 0
    ? { ax: -0.25, az: 0.24, ex: -2.55, ez: 0, hx: melee ? 0 : -0.72 }
    : { ax: 0.1, az: -0.7, ex: -0.1, ez: 1.6 }),
  guard: (side) => ({ ax: -0.3, az: side * 0.3, ex: -2.0, ez: -side * 0.3 }),
};
const POSE_OF = {
  survivant: "shoulder", pisteur: "shoulder", secouriste: "hips", sentinelle: "shoulder", aventuriere: "hips", cendre: "guard", chevalier: "shoulder",
  citrouille: "hips", clown: "hips", cowboy: "hips", cyborg: "guard", demon: "crossed", epouvantail: "relaxed", fantome: "relaxed",
  faucheuse: "crossed", feuillage: "shoulder", "garde-forestier": "shoulder", loup: "guard", mecanicien: "hips", momie: "relaxed", ninja: "guard",
  nomade: "crossed", pirate: "hips", renard: "guard", samourai: "shoulder", squelette: "hips", sorciere: "hips", vampire: "crossed",
  viking: "shoulder", zombie: "relaxed", astronaute: "hips", "chasseur-vampires": "shoulder",
};

// ---------- Animation ----------
const lerp = (a, b, k) => a + (b - a) * k;
const MELEE = new Set(["sword", "blade", "axe", "hammer", "spear", "staff", "scythe", "whip", "chain", "melee", "club"]);

function updateHero(model, owner, t, dt) {
  const s = model.state;
  const has = (name) => Boolean(owner?.classList.contains(name));
  const live = Boolean(owner?.classList.contains("player"));
  const k = Math.min(1, dt * 12);

  const walkTarget = has("is-running") ? 1.5 : has("is-walking") ? 1 : 0;
  s.walk = lerp(s.walk, walkTarget, k);
  s.phase += dt * (6.5 + s.walk * 3.5) * (s.walk > 0.05 ? 1 : 0);

  const hold = model.weaponInfo?.hold ?? "gun";
  const aimTarget = has("is-aiming") || has("is-shooting") || has("is-drawing") ? 1 : 0;
  s.aim = lerp(s.aim, aimTarget, Math.min(1, dt * 14));

  const shooting = has("is-shooting");
  if (shooting && !s.shooting) {
    s.kick = 1;
    s.swing = 0;
  }
  s.shooting = shooting;
  s.kick = Math.max(0, s.kick - dt * 6);
  s.swing = Math.min(1, s.swing + dt / 0.3);

  const dodging = has("is-dodging");
  const force = owner?.dataset?.pose ?? "";           // outil de test : air | crouch | hurt | run
  if (dodging && !s.dodging) s.land = 0;
  if (!dodging && s.dodging) s.land = 1;               // atterrissage après le saut
  s.dodging = dodging;
  s.dodgeT = dodging ? s.dodgeT + dt : 0;
  s.land = Math.max(0, (s.land ?? 0) - dt / 0.3);
  const hurtAt = Number(owner?.dataset?.hurtAt ?? 0);
  if (hurtAt && hurtAt !== s.hurtAt) {
    s.hurtAt = hurtAt;
    s.hurt = 1;
  }
  s.hurt = Math.max(0, (s.hurt ?? 0) - dt / 0.42);

  // saut : accroupi → envol → réception
  const jp = dodging ? Math.min(1, s.dodgeT / 0.24) : 0;
  let airT = dodging ? Math.sin(jp * Math.PI) : 0;
  let crouchT = dodging ? Math.max(0, 1 - jp / 0.22) * 0.7 : Math.sin(Math.min(1, s.land) * Math.PI * 0.5) * 0.85;
  if (force === "air") airT = 1;
  if (force === "crouch") crouchT = 1;
  s.air = lerp(s.air ?? 0, airT, Math.min(1, dt * 22));
  s.crouch = lerp(s.crouch ?? 0, crouchT, Math.min(1, dt * 22));
  const air = s.air;
  const crouch = s.crouch;
  const hurt = force === "hurt" ? 1 : s.hurt;

  // allures : marche (0..1) puis course (1..1,5)
  const moveAmt = Math.min(1, s.walk);
  const run = force === "run" ? 1 : Math.max(0, Math.min(1, (s.walk - 1) * 2));
  const swingAmp = 0.5 * moveAmt + 0.5 * run;
  const sway = Math.sin(s.phase);
  const body = model.body;

  // jambes : foulée, genou plié quand la jambe passe vers l'avant, rebond du buste
  if (model.legs.length === 2) {
    model.legs.forEach((leg, i) => {
      const ph = s.phase + (i ? Math.PI : 0);
      leg.rotation.x = Math.sin(ph) * swingAmp;
      leg.userData.knee.rotation.x = 0.04 + Math.max(0, -Math.cos(ph)) * (0.55 * moveAmt + 0.95 * run);
    });
  }
  const step = Math.abs(sway);
  const bounce = (1 - run) * 0.09 * (1 - step) + run * 0.2 * step;
  body.position.y = bounce * moveAmt + Math.sin(t * 2.2) * 0.014 * (1 - s.walk);
  body.rotation.z = sway * (0.04 * moveAmt + 0.04 * run);
  body.rotation.x = 0.05 * moveAmt + 0.2 * run;
  body.position.z = -s.kick * 0.06;
  body.scale.y = 1 + Math.sin(t * 2.2) * 0.01 * (1 - s.walk);       // respiration
  model.head.rotation.z = Math.sin(t * 1.7) * 0.025 * (1 - moveAmt);
  model.head.rotation.x = -body.rotation.x * 0.75 - s.aim * 0.05;

  // bras
  const armL = model.armL;
  const armR = model.armR;
  const twoHands = model.weaponInfo?.twoHands ?? false;
  const restL = -sway * swingAmp * 1.15;
  const restR = sway * swingAmp * 1.15 - (model.weaponNode ? 0.45 : 0);
  const melee = MELEE.has(hold);
  let aimR = melee ? -0.95 : -1.5;
  let aimL = twoHands ? (melee ? -0.9 : -1.38) : 0.15;
  if (melee && s.swing < 1) {
    const e = s.swing;
    aimR = lerp(-2.5, 0.35, e * e * (3 - 2 * e));
    if (twoHands) aimL = aimR * 0.95;
  } else {
    aimR -= s.kick * (melee ? 0 : 0.34);
  }
  armR.rotation.x = lerp(restR, aimR, s.aim);
  armL.rotation.x = lerp(restL, aimL, s.aim);
  armL.rotation.z = lerp(-0.1, twoHands ? 0.85 : -0.1, s.aim);
  armR.rotation.z = lerp(0.1, twoHands ? -0.5 : -0.25, s.aim);
  const fwdL = Math.max(0, sway);
  const fwdR = Math.max(0, -sway);
  armR.userData.elbow.rotation.x = lerp(-0.22 - fwdR * 0.35 * moveAmt - run * (0.85 + fwdR * 0.35), melee ? -0.5 : -0.3, s.aim);
  armL.userData.elbow.rotation.x = lerp(-0.22 - fwdL * 0.35 * moveAmt - run * (0.85 + fwdL * 0.35), twoHands ? -0.35 : -0.2, s.aim);
  // pose d'attente propre à chaque personnage (mains sur les hanches, bras croisés, garde…)
  const idleW = (1 - s.aim) * Math.max(0, 1 - s.walk * 1.4) * (1 - air) * (1 - crouch);
  const poseName = model.pose === "shoulder" && !model.weaponNode ? "hips" : model.pose;
  const pose = POSES[poseName] ?? POSES.relaxed;
  for (const [arm, side] of [[armL, -1], [armR, 1]]) {
    const p = pose(side, melee);
    arm.rotation.x = lerp(arm.rotation.x, p.ax, idleW);
    arm.rotation.z = lerp(arm.rotation.z, p.az, idleW);
    arm.userData.elbow.rotation.x = lerp(arm.userData.elbow.rotation.x, p.ex, idleW);
    arm.userData.elbow.rotation.z = p.ez * idleW;
  }
  if (model.hand) model.hand.rotation.x = (pose(1, melee).hx ?? 0) * idleW;
  if (model.legs.length === 2) {
    model.legs[0].rotation.z = -0.05 * idleW;
    model.legs[1].rotation.z = 0.05 * idleW;
  }
  body.rotation.y = Math.sin(t * 0.9) * 0.04 * idleW + sway * 0.1 * moveAmt;
  model.weaponInfo?.tick?.(t);

  // saut et réception : genoux fléchis, bras balancés, puis jambes repliées en l'air
  if (air > 0.01 || crouch > 0.01) {
    const [l0, l1] = model.legs;
    if (l0 && l1) {
      l0.rotation.x = lerp(l0.rotation.x, -1.05, air);
      l1.rotation.x = lerp(l1.rotation.x, 0.4, air);
      l0.userData.knee.rotation.x = lerp(l0.userData.knee.rotation.x, 1.3, air);
      l1.userData.knee.rotation.x = lerp(l1.userData.knee.rotation.x, 1.0, air);
      for (const leg of model.legs) {
        leg.rotation.x = lerp(leg.rotation.x, -0.9, crouch);
        leg.userData.knee.rotation.x = lerp(leg.userData.knee.rotation.x, 1.5, crouch);
        leg.rotation.z = lerp(leg.rotation.z, 0, Math.max(air, crouch));
      }
    }
    armL.rotation.x = lerp(lerp(armL.rotation.x, -2.5, air), 0.7, crouch);
    armL.rotation.z = lerp(armL.rotation.z, -0.55, air);
    armR.rotation.x = lerp(lerp(armR.rotation.x, model.weaponNode ? -1.5 : -2.2, air), 0.7, crouch);
    armR.rotation.z = lerp(armR.rotation.z, 0.5, air);
    armL.userData.elbow.rotation.x = lerp(armL.userData.elbow.rotation.x, -0.3, Math.max(air, crouch));
    armR.userData.elbow.rotation.x = lerp(armR.userData.elbow.rotation.x, -0.3, Math.max(air, crouch));
    body.position.y -= crouch * 0.37;
    body.rotation.x += air * 0.14 + crouch * 0.28;
    model.head.rotation.x -= crouch * 0.2;
  }

  // coup reçu : le buste part en arrière, les bras s'écartent
  if (hurt > 0.01) {
    const h = hurt * hurt * (3 - 2 * hurt) * 1.0;
    body.rotation.x -= h * 0.38;
    body.position.z -= h * 0.22;
    model.head.rotation.x -= h * 0.3;
    armL.rotation.z -= h * 0.7;
    armR.rotation.z += h * 0.7;
    armL.rotation.x -= h * 0.5;
    armR.rotation.x -= h * 0.5;
  }

  if (model.cape) model.cape.rotation.x = 0.1 + moveAmt * 0.2 + run * 0.4 + air * 0.5 + Math.sin(t * 3) * 0.05;
  if (model.tail) {
    model.tail.rotation.y = Math.sin(t * 4.2 + s.walk * 2) * 0.35;
    model.tail.rotation.x = 0.1 + s.walk * 0.12 + air * 0.3;
  }

  // le héros se tourne de profil pour viser (le miroir gauche/droite est géré par le CSS)
  model.root.rotation.y = lerp(0.3 + moveAmt * 0.1 + run * 0.1, 0.62, s.aim);
  // caméra à la 3e personne : le script donne le cap du héros dans le repère de la caméra (0 = face à l'écran, π = de dos)
  const turnData = owner?.dataset?.turn;
  if (turnData !== undefined && turnData !== "") {
    const target = Number(turnData);
    if (s.turn === undefined || !Number.isFinite(s.turn)) s.turn = target;
    const delta = Math.atan2(Math.sin(target - s.turn), Math.cos(target - s.turn));
    s.turn += delta * Math.min(1, dt * 12);
    model.root.rotation.y = s.turn + (has("is-world") ? 0 : 0.18);
  } else {
    s.turn = undefined;
  }

  // élan du saut + écrasement à la réception
  model.root.rotation.x = 0;
  model.root.position.y = (force === "air" ? 0.5 : dodging ? Math.sin(jp * Math.PI) * 0.5 : 0);
  const squash = crouch * 0.1;
  model.root.scale.set(1 + squash * 0.5, 1 - squash, 1 + squash * 0.5);

  if (model.muzzleFlash) {
    const show = s.kick > 0.62 && hold !== "none" && !melee;
    model.muzzleFlash.visible = show;
    if (show) model.muzzleFlash.scale.setScalar(0.18 + s.kick * 0.2);
  }

  for (const tick of model.ticks) tick(t, s);
  void live;
}

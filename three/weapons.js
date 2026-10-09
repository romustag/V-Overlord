// Armes 3D : repère de l'arme = canon / lame vers +Z, dessus vers +Y, poignée à l'origine.
import { THREE, solid as baseSolid, emit, group, toon, limb, stylize } from "./core.js?v=53";

// Les armes gardent des reflets métalliques, contrairement aux vêtements (matière mate).
const solid = (parent, kind, color, size, position, rotation, options = {}) => baseSolid(parent, kind, color, size, position, rotation, { gloss: true, rough: 0.42, metal: 0.18, ...options });

const COATINGS = {
  rouille: { metal: 0x8a4a28, accent: 0x6a3a22 },
  encre: { metal: 0x1b1b28, accent: 0x2a2a3c, glow: 0x6a4aff },
  jade: { metal: 0x3ccf8a, accent: 0x1f8f5c },
  sang: { metal: 0xa01824, accent: 0x6a0f18, glow: 0xff2a3a },
  givre: { metal: 0x9ee6ff, accent: 0x6cc4ee, glow: 0xdff8ff },
  toxique: { metal: 0x9bff3a, accent: 0x4fae1a, glow: 0xd8ff6a },
  or: { metal: 0xffcf3a, accent: 0xd49a12 },
  lave: { metal: 0xff6a1a, accent: 0x8a1f0a, glow: 0xffb02a, emissive: 0xaa3000 },
  spectre: { metal: 0xbda8ff, accent: 0x8f78e6, glow: 0xe8e0ff, ghost: true },
  chroma: { metal: 0xff4a9a, accent: 0x4aa8ff, chroma: true },
};

const SWAPS = {};

function palette(base, coating) {
  const c = COATINGS[coating];
  if (!c) return { ...base, tick: null };
  return {
    ...base,
    metal: c.metal,
    accent: c.accent ?? base.accent,
    glow: c.glow ?? base.glow,
    emissive: c.emissive,
    ghost: c.ghost,
    chroma: c.chroma,
  };
}

// ---------- Armes à feu ----------
function gun(w, P, o = {}) {
  const len = o.len ?? 0.34;
  const bodyColor = o.body ?? P.metal;
  solid(w, "box", o.grip ?? P.wood, [0.09, 0.26, 0.11], [0, -0.12, -0.02], [0.22, 0, 0]);
  solid(w, "box", bodyColor, [o.bodyW ?? 0.11, o.bodyH ?? 0.13, len], [0, 0.05, len / 2 - 0.08]);
  const barrelLen = o.barrel ?? 0.3;
  const z = len - 0.08 + barrelLen / 2 - 0.02;
  solid(w, "cyl", o.barrelColor ?? P.metal, [o.barrelW ?? 0.075, barrelLen, o.barrelW ?? 0.075], [0, 0.06, z], [Math.PI / 2, 0, 0]);
  if (o.flare) solid(w, "cone", o.barrelColor ?? P.metal, [o.flare, 0.22, o.flare], [0, 0.06, len - 0.08 + barrelLen], [Math.PI / 2, 0, 0]);
  if (o.drum) solid(w, "cyl", P.accent, [0.17, 0.2, 0.17], [0, 0.06, 0.08], [Math.PI / 2, 0, 0]);
  if (o.hammer !== false) solid(w, "box", P.accent, [0.04, 0.09, 0.05], [0, 0.15, -0.04], [0.5, 0, 0]);
  if (o.scope) {
    solid(w, "cyl", 0x2b2f3a, [0.07, 0.4, 0.07], [0, 0.18, 0.2], [Math.PI / 2, 0, 0]);
    emit(w, "sphere", 0x9ee8ff, [0.06, 0.06, 0.04], [0, 0.18, 0.41]);
  }
  if (o.pump) solid(w, "box", P.wood, [0.13, 0.1, 0.2], [0, -0.02, 0.4]);
  return len - 0.08 + barrelLen + (o.flare ? 0.12 : 0);
}

const BUILDERS = {
  "pistolet-silex": (w, P) => gun(w, P, { len: 0.28, barrel: 0.34, grip: P.wood, barrelW: 0.07, flare: 0.13 }),
  "revolver-sherif": (w, P) => gun(w, P, { len: 0.22, barrel: 0.36, drum: true, grip: P.wood }),
  "pistolet-citrouille": (w, P) => {
    solid(w, "box", 0x4a2f1a, [0.09, 0.26, 0.11], [0, -0.12, -0.02], [0.22, 0, 0]);
    solid(w, "sphere", 0xe8791c, [0.3, 0.26, 0.32], [0, 0.06, 0.12]);
    solid(w, "cyl", 0x4f7a2a, [0.06, 0.1, 0.06], [0, 0.22, 0.12], [0.2, 0, 0.2]);
    solid(w, "cyl", 0xd2640f, [0.1, 0.32, 0.1], [0, 0.06, 0.4], [Math.PI / 2, 0, 0]);
    emit(w, "sphere", 0xffd23f, [0.06, 0.07, 0.04], [-0.07, 0.08, 0.26]);
    emit(w, "sphere", 0xffd23f, [0.06, 0.07, 0.04], [0.07, 0.08, 0.26]);
    return 0.58;
  },
  "pistolet-spectral": (w, P) => {
    gun(w, { ...P, metal: 0x9ad8ff, accent: 0x5ab8ff, wood: 0x6aa8e8 }, { len: 0.3, barrel: 0.3, flare: 0.14 });
    emit(w, "sphere", P.glow ?? 0xcaf3ff, [0.12, 0.12, 0.12], [0, 0.06, 0.1], [0, 0, 0], 0.8);
    return 0.62;
  },
  "canon-roi-ombres": (w, P) => {
    gun(w, { ...P, metal: 0x3a2a55, accent: 0x7a4fd1, wood: 0x241a38 }, { len: 0.34, barrel: 0.3, flare: 0.17, bodyH: 0.16 });
    for (let i = -1; i <= 1; i += 1) solid(w, "cone", 0xd4a93a, [0.07, 0.16, 0.07], [i * 0.07, 0.2, 0.2]);
    emit(w, "sphere", 0xb56bff, [0.08, 0.08, 0.06], [0, 0.06, 0.0]);
    return 0.72;
  },
  "pistolet-givre": (w, P) => {
    gun(w, { ...P, metal: 0x9ee6ff, accent: 0x6cc4ee, wood: 0x4a78b0 }, { len: 0.3, barrel: 0.3, flare: 0.13 });
    for (let i = 0; i < 3; i += 1) solid(w, "cone", 0xdff8ff, [0.06, 0.16, 0.06], [0, 0.14, 0.1 + i * 0.1], [0, 0, 0]);
    return 0.66;
  },
  "blaster-neon": (w, P) => {
    gun(w, { ...P, metal: 0x2a2f3d, accent: 0x00e5ff, wood: 0x1f232e }, { len: 0.34, barrel: 0.26, barrelW: 0.1, hammer: false });
    emit(w, "box", 0x00e5ff, [0.115, 0.03, 0.26], [0, 0.12, 0.14]);
    emit(w, "box", 0xff2bd6, [0.115, 0.03, 0.22], [0, 0.0, 0.16]);
    return 0.62;
  },
  "lance-bonbons": (w, P) => {
    gun(w, { ...P, metal: 0xff5a8a, accent: 0xffffff, wood: 0xffffff }, { len: 0.3, barrel: 0.2, flare: 0.22, hammer: false });
    for (let i = 0; i < 3; i += 1) solid(w, "cyl", 0xffffff, [0.14, 0.04, 0.14], [0, 0.05, 0.0 + i * 0.1], [Math.PI / 2, 0, 0], { noOutline: true });
    emit(w, "sphere", 0xffd23f, [0.1, 0.1, 0.1], [0, 0.18, 0.4]);
    return 0.62;
  },
  "tromblon-pirate": (w, P) => gun(w, { ...P, metal: 0xb08a3a, accent: 0x6a4a2c, wood: 0x5a3820 }, { len: 0.34, barrel: 0.3, flare: 0.3 }),
  "fusil-precision": (w, P) => gun(w, { ...P, metal: 0x3a3f4c, wood: 0x6a4a2c }, { len: 0.46, barrel: 0.5, scope: true, barrelW: 0.06, hammer: false }),
  "fusil-pompe": (w, P) => gun(w, { ...P, metal: 0x4a4f5c, wood: 0x7a4f2a }, { len: 0.4, barrel: 0.44, pump: true, barrelW: 0.09, hammer: false }),
  "lance-clous": (w, P) => {
    gun(w, { ...P, metal: 0xf0b323, accent: 0x3a3f4c, wood: 0x2c2f3a }, { len: 0.34, barrel: 0.16, bodyH: 0.2, bodyW: 0.15, hammer: false });
    solid(w, "box", 0x3a3f4c, [0.1, 0.1, 0.2], [0, 0.2, 0.18]);
    for (let i = 0; i < 3; i += 1) solid(w, "cyl", 0xbfc5d0, [0.025, 0.12, 0.025], [0, 0.07, 0.5 + i * 0.0], [Math.PI / 2, 0, 0], { noOutline: true });
    return 0.58;
  },
  arbalete: (w, P) => {
    solid(w, "box", P.wood, [0.1, 0.14, 0.62], [0, 0.03, 0.22]);
    solid(w, "box", P.metal, [0.82, 0.07, 0.07], [0, 0.07, 0.5], [0, 0.0, 0]);
    solid(w, "box", P.metal, [0.28, 0.07, 0.07], [-0.5, 0.07, 0.4], [0, 0.6, 0]);
    solid(w, "box", P.metal, [0.28, 0.07, 0.07], [0.5, 0.07, 0.4], [0, -0.6, 0]);
    limb(w, "cyl", 0xe8e0c8, [-0.62, 0.07, 0.32], [0, 0.07, 0.08], 0.015, { noOutline: true });
    limb(w, "cyl", 0xe8e0c8, [0.62, 0.07, 0.32], [0, 0.07, 0.08], 0.015, { noOutline: true });
    solid(w, "cone", 0xbfc5d0, [0.05, 0.16, 0.05], [0, 0.1, 0.62], [Math.PI / 2, 0, 0]);
    return 0.72;
  },
  "arc-long": (w, P) => {
    for (const s of [-1, 1]) {
      solid(w, "box", P.wood, [0.07, 0.42, 0.07], [0, s * 0.2, 0.06], [s * 0.2, 0, 0]);
      solid(w, "box", P.wood, [0.06, 0.34, 0.06], [0, s * 0.5, -0.02], [-s * 0.4, 0, 0]);
    }
    solid(w, "box", P.accent, [0.09, 0.2, 0.09], [0, 0, 0.06]);
    limb(w, "cyl", 0xf0e6cf, [0, 0.66, -0.14], [0, -0.66, -0.14], 0.014, { noOutline: true });
    solid(w, "cone", 0xbfc5d0, [0.05, 0.14, 0.05], [0, 0.0, 0.5], [Math.PI / 2, 0, 0]);
    limb(w, "cyl", P.wood, [0, 0, -0.14], [0, 0, 0.45], 0.025, { noOutline: true });
    return 0.5;
  },
  fronde: (w, P) => {
    solid(w, "cyl", P.wood, [0.07, 0.34, 0.07], [0, -0.1, 0.0], [0.2, 0, 0]);
    solid(w, "cyl", P.wood, [0.06, 0.28, 0.06], [-0.1, 0.18, 0.1], [0.2, 0, 0.5]);
    solid(w, "cyl", P.wood, [0.06, 0.28, 0.06], [0.1, 0.18, 0.1], [0.2, 0, -0.5]);
    limb(w, "cyl", 0x2b2f3a, [-0.17, 0.3, 0.14], [0.17, 0.3, 0.14], 0.025, { noOutline: true });
    solid(w, "sphere", 0xd9c27a, 0.12, [0, 0.3, 0.18]);
    return 0.4;
  },
  "double-fronde": (w, P) => {
    BUILDERS.fronde(w, P);
    solid(w, "cyl", P.accent, [0.08, 0.1, 0.5], [0, 0.0, 0.14], [0, 0, 0]);
    return 0.4;
  },

  // ---------- Armes magiques ----------
  "tir-chauve-souris": (w, P) => {
    limb(w, "cyl", P.wood, [0, 0, -0.3], [0, 0, 0.7], 0.07);
    solid(w, "sphere", P.glow ?? 0xb56bff, 0.2, [0, 0.02, 0.8], [0, 0, 0], { material: undefined });
    for (const s of [-1, 1]) {
      solid(w, "cone", 0x241a38, [0.3, 0.5, 0.05], [s * 0.26, 0.04, 0.76], [0, 0, -s * 1.3]);
      solid(w, "cone", 0x241a38, [0.2, 0.34, 0.05], [s * 0.2, 0.2, 0.7], [0, 0, -s * 0.5]);
    }
    emit(w, "sphere", 0xff4a6a, [0.05, 0.05, 0.05], [-0.05, 0.06, 0.9]);
    emit(w, "sphere", 0xff4a6a, [0.05, 0.05, 0.05], [0.05, 0.06, 0.9]);
    return 0.9;
  },
  "lanterne-ames": (w, P) => {
    limb(w, "cyl", P.wood, [0, 0, -0.3], [0, 0, 0.6], 0.06);
    limb(w, "cyl", P.metal, [0, 0, 0.6], [0, 0.1, 0.66], 0.03, { noOutline: true });
    solid(w, "cone", P.metal, [0.3, 0.14, 0.3], [0, 0.35, 0.72]);
    emit(w, "box", P.glow ?? 0x7cf6ff, [0.2, 0.26, 0.2], [0, 0.18, 0.72], [0, 0.4, 0], 0.9);
    solid(w, "box", P.metal, [0.26, 0.05, 0.26], [0, 0.04, 0.72], [0, 0.4, 0]);
    for (const [x, z] of [[-0.11, 0.62], [0.11, 0.62], [-0.11, 0.82], [0.11, 0.82]]) solid(w, "cyl", P.metal, [0.03, 0.3, 0.03], [x, 0.19, z], [0, 0, 0], { noOutline: true });
    return 0.84;
  },
  "grimoire-maudit": (w, P) => {
    solid(w, "box", 0x4a2278, [0.42, 0.52, 0.1], [0, 0.06, 0.28], [0, 0, 0]);
    solid(w, "box", 0xe9dfc2, [0.36, 0.46, 0.08], [0, 0.06, 0.23], [0, 0, 0], { noOutline: true });
    emit(w, "sphere", P.glow ?? 0xe0b3ff, [0.16, 0.16, 0.04], [0, 0.08, 0.35]);
    solid(w, "box", 0xd4a93a, [0.07, 0.52, 0.12], [-0.2, 0.06, 0.28], [0, 0, 0]);
    return 0.5;
  },
  "baguette-foudre": (w, P) => {
    limb(w, "cyl", P.wood, [0, 0, -0.2], [0, 0, 0.62], 0.05);
    solid(w, "cone", P.accent, [0.1, 0.16, 0.1], [0, 0, 0.66], [Math.PI / 2, 0, 0]);
    emit(w, "box", 0xffe14a, [0.06, 0.2, 0.06], [0.0, 0.1, 0.72], [0, 0, 0.5]);
    emit(w, "box", 0xffe14a, [0.06, 0.2, 0.06], [0.06, -0.02, 0.76], [0, 0, -0.5]);
    return 0.82;
  },

  // ---------- Armes de mêlée ----------
  "epee-rouillee": (w, P) => sword(w, { blade: 0x8a7a68, guard: 0x5a3a22, grip: 0x3a2a1c, len: 0.74, jagged: 0x6a4a2c }),
  "epee-chevalier": (w, P) => sword(w, { blade: 0xd6dfeb, guard: 0xd4a93a, grip: 0x3a62a8, len: 0.8, pommel: 0xd4a93a, wide: true }),
  "coutelas-fantome": (w, P) => sword(w, { blade: 0xaee8ff, guard: 0x7aa0c8, grip: 0x4a78b0, len: 0.72, curve: true, glowBlade: true }),
  "lame-braise": (w, P) => sword(w, { blade: 0xff7a1a, guard: 0x3a2a2a, grip: 0x2a1a1a, len: 0.82, glowBlade: true, flame: true }),
  "epee-lune-sanglante": (w, P) => sword(w, { blade: 0xc01c34, guard: 0x2a1426, grip: 0x2a1426, len: 0.86, crescent: true, glowBlade: false, wide: true }),
  "katana-ombre": (w, P) => sword(w, { blade: 0x7a6aa8, guard: 0x16101f, grip: 0x241b36, len: 1.0, thin: true, curve: true, glowEdge: 0xb056ff }),
  "dague-assassin": (w, P) => sword(w, { blade: 0xc4cbd8, guard: 0x7a3bd1, grip: 0x241b36, len: 0.42, thin: true, wide: false }),
  "hache-bucheron": (w, P) => {
    limb(w, "cyl", P.wood, [0, 0, -0.26], [0, 0, 0.82], 0.07);
    solid(w, "box", P.metal, [0.07, 0.34, 0.3], [0, 0.12, 0.72]);
    solid(w, "cone", P.metal, [0.07, 0.3, 0.4], [0, 0.3, 0.72], [0, 0, Math.PI / 2 * 0]);
    solid(w, "box", P.metal, [0.09, 0.16, 0.14], [0, -0.06, 0.74]);
    return 0.95;
  },
  "lance-centurion": (w, P) => {
    limb(w, "cyl", P.wood, [0, 0, -0.6], [0, 0, 1.0], 0.06);
    solid(w, "cone", 0xd4dae6, [0.14, 0.4, 0.05], [0, 0, 1.2], [Math.PI / 2, 0, 0]);
    solid(w, "cyl", 0xd4a93a, [0.1, 0.08, 0.1], [0, 0, 1.0], [Math.PI / 2, 0, 0]);
    solid(w, "cone", 0xc43838, [0.16, 0.3, 0.16], [0, 0.12, 0.95], [-1.9, 0, 0]);
    return 1.4;
  },
  "marteau-guerre": (w, P) => {
    limb(w, "cyl", P.wood, [0, 0, -0.24], [0, 0, 0.82], 0.075);
    solid(w, "box", P.metal, [0.34, 0.3, 0.42], [0, 0.0, 0.82]);
    solid(w, "box", P.accent, [0.36, 0.1, 0.44], [0, 0.0, 0.82]);
    solid(w, "cone", P.metal, [0.14, 0.16, 0.14], [0, 0.0, 1.1], [Math.PI / 2, 0, 0]);
    return 1.1;
  },
  "faux-spectrale": (w, P) => {
    limb(w, "cyl", P.wood, [0, 0, -0.3], [0, 0, 1.0], 0.07);
    const color = P.ghost ? P.metal : 0xaee8ff;
    for (let i = 0; i < 5; i += 1) {
      const a = i / 4;
      const x = 0.0;
      solid(w, "box", color, [0.05, 0.14 - a * 0.06, 0.26], [x, 0.14 + Math.sin(a * 1.4) * 0.22, 1.0 + a * 0.14 + 0.08], [-0.5 + a * 0.9, 0, 0], { noOutline: false });
    }
    emit(w, "sphere", 0xdff8ff, [0.1, 0.1, 0.1], [0, 0.1, 1.0], [0, 0, 0], 0.7);
    return 1.2;
  },
  "fouet-ronces": (w, P) => {
    solid(w, "cyl", P.wood, [0.07, 0.3, 0.07], [0, 0, 0.06], [Math.PI / 2, 0, 0]);
    let prev = [0, 0, 0.2];
    for (let i = 1; i <= 9; i += 1) {
      const a = i / 9;
      const next = [Math.sin(a * 5) * 0.12, 0.04 - a * 0.12 + Math.sin(a * 3) * 0.08, 0.2 + a * 0.9];
      limb(w, "cyl", 0x3f7a2c, prev, next, 0.05 - a * 0.02, { outline: 0.02 });
      if (i % 2 === 0) solid(w, "cone", 0x2a5a1c, [0.05, 0.12, 0.05], [next[0], next[1] + 0.05, next[2]], [0, 0, 0]);
      prev = next;
    }
    return 1.1;
  },
};

function sword(w, o) {
  const len = o.len ?? 0.8;
  const thick = o.thin ? 0.04 : 0.06;
  const height = o.thin ? 0.09 : o.wide ? 0.18 : 0.13;
  solid(w, "cyl", o.grip, [0.075, 0.3, 0.075], [0, 0, 0.0], [Math.PI / 2, 0, 0]);
  solid(w, "sphere", o.pommel ?? o.guard, 0.11, [0, 0, -0.16]);
  solid(w, "box", o.guard, [0.07, 0.34, 0.09], [0, 0, 0.17]);
  if (o.curve) {
    const parts = 6;
    for (let i = 0; i < parts; i += 1) {
      const a = i / (parts - 1);
      const mat = o.glowBlade ? { material: undefined } : {};
      solid(w, "box", o.blade, [thick, height * (1 - a * 0.35), len / parts * 1.15], [0, 0.0 + Math.sin(a * 1.2) * 0.1 * 1, 0.2 + a * len], [-0.15 + a * 0.35, 0, 0], mat);
    }
  } else {
    solid(w, "box", o.blade, [thick, height, len], [0, 0, 0.2 + len / 2]);
    solid(w, "cone", o.blade, [thick * 1.1, height, 0.18], [0, 0, 0.2 + len + 0.07], [Math.PI / 2, 0, 0]);
  }
  if (o.crescent) {
    solid(w, "cone", o.blade, [0.06, 0.34, 0.3], [0, 0.18, 0.2 + len * 0.8], [0.2, 0, 0]);
    emit(w, "sphere", 0xff4a6a, [0.08, 0.08, 0.08], [0, 0, 0.2]);
  }
  if (o.jagged) for (let i = 0; i < 4; i += 1) solid(w, "cone", o.jagged, [0.05, 0.09, 0.07], [0, 0.09, 0.3 + i * 0.16], [0, 0, 0]);
  if (o.glowEdge) emit(w, "box", o.glowEdge, [0.015, 0.02, len], [0, height / 2, 0.2 + len / 2], [0, 0, 0], 0.9);
  if (o.glowBlade) emit(w, "box", o.flame ? 0xffd23f : 0xe8fbff, [0.025, height * 0.7, len * 0.92], [0, 0, 0.2 + len / 2], [0, 0, 0], 0.85);
  if (o.flame) {
    for (let i = 0; i < 4; i += 1) emit(w, "cone", 0xff8a2a, [0.1, 0.22, 0.06], [0, height / 2 + 0.05, 0.3 + i * 0.18], [0, 0, 0], 0.85);
  }
  return len + 0.3;
}

const TWO_HANDED = new Set([
  "fronde", "double-fronde", "arc-long", "arbalete", "fusil-pompe", "lance-clous", "faux-spectrale", "grimoire-maudit", "lance-centurion", "marteau-guerre",
  "tromblon-pirate", "fusil-precision",
]);
const MELEE = new Set([
  "faux-spectrale", "fouet-ronces", "epee-rouillee", "epee-chevalier", "coutelas-fantome", "lame-braise", "epee-lune-sanglante", "hache-bucheron", "lance-centurion",
  "marteau-guerre", "dague-assassin", "katana-ombre",
]);

export function hasWeapon(id) {
  return Object.prototype.hasOwnProperty.call(BUILDERS, id);
}

// Renvoie { mount, muzzle, hold, twoHands, tick } : `mount` s'accroche à la main du héros.
export function buildWeapon(id, coating) {
  const builder = BUILDERS[id];
  if (!builder) return null;
  const base = { metal: 0xb8c0cc, accent: 0x7a8494, wood: 0x6a4a2c, glow: undefined };
  const P = palette(base, coating);
  const mount = group(null);
  const w = group(mount);
  const length = builder(w, P) ?? 0.6;
  const hold = MELEE.has(id) ? "melee" : "gun";
  mount.rotation.x = hold === "gun" ? Math.PI / 2 : 0;
  mount.rotation.y = 0;
  mount.scale.setScalar(hold === "gun" ? 1.3 : 1.15);
  if (hold === "melee") mount.rotation.x = 0.1;
  const muzzle = group(w, [0, 0.05, length]);
  let tick = null;
  const cfg = COATINGS[coating];
  if (cfg && !cfg.chroma) {
    const target = new THREE.Color(cfg.metal);
    const cache = new Map();
    w.traverse((node) => {
      if (!node.isMesh || !node.material?.isMeshStandardMaterial) return;
      let material = cache.get(node.material);
      if (!material) {
        material = stylize(node.material.clone());
        material.color.lerp(target, 0.72);
        if (cfg.emissive) material.emissive = new THREE.Color(cfg.emissive);
        if (cfg.ghost) {
          material.transparent = true;
          material.opacity = 0.72;
        }
        cache.set(node.material, material);
      }
      node.material = material;
    });
  }
  if (P.chroma) {
    const tinted = [];
    w.traverse((node) => {
      if (node.isMesh && node.material?.isMeshStandardMaterial) {
        node.material = stylize(node.material.clone());
        tinted.push(node.material);
      }
    });
    tick = (t) => {
      tinted.forEach((material, index) => material.color.setHSL((t * 0.4 + index * 0.07) % 1, 0.85, 0.6));
    };
  }
  return { mount, muzzle, hold, length, twoHands: TWO_HANDED.has(id), tick };
}

export { THREE, toon, SWAPS };

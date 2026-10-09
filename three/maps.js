// Cartes 3D façon Brawl Stars, thème Halloween, rendues avec Three.js.
// Chaque carte est construite sur les polygones de collision du jeu (map-data.js) : chaque obstacle
// devient un vrai bâtiment / véhicule / chapiteau en volume, au même endroit que l'ancien décor.
// Le rendu (caméra orthographique inclinée) est exporté en image ; le jeu l'utilise comme fond.
import { THREE, solid, emit, group, limb, vivid, stylize, lowDetail, GRADIENT } from "./core.js?v=53";
import { MAP_OBSTACLES } from "./map-data.js?v=53";

// ---------- Projection : écran (u, v) normalisé <-> monde ----------
export const WORLD_W = 36;                       // largeur monde = largeur image
const SCREEN_H = WORLD_W / (1405 / 768);          // hauteur écran = 19.68
const PITCH = (52 * Math.PI) / 180;
const SIN = Math.sin(PITCH);
const COS = Math.cos(PITCH);
const WORLD_D = SCREEN_H / SIN;                   // profondeur du sol

const toX = (u) => (u - 0.5) * WORLD_W;
const toZ = (v) => ((v - 0.5) * SCREEN_H) / SIN;

function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const INK = 0x1a0b2e;
const S = (parent, kind, color, size, position, rotation, options) => solid(parent, kind, color, size, position, rotation, { outline: 0.07, ...options });
const G = (parent, kind, color, size, position, rotation, opacity = 1) => emit(parent, kind, color, size, position, rotation, opacity);

// ---------- Matériaux à rayures ----------
let hullMat;
function stripedMesh(parent, { rTop, rBottom, h, segs = 12, colors, position = [0, 0, 0], openEnded = false, scaleZ = 1 }) {
  const geometry = new THREE.CylinderGeometry(rTop, rBottom, h, segs, 1, openEnded).toNonIndexed();
  const pos = geometry.attributes.position;
  const col = new Float32Array(pos.count * 3);
  const tmp = new THREE.Color();
  for (let i = 0; i < pos.count; i += 3) {
    const cx = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
    const cz = (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;
    const index = Math.floor(((Math.atan2(cz, cx) + Math.PI) / (Math.PI * 2)) * segs);
    tmp.copy(vivid(colors[index % colors.length]));
    for (let k = 0; k < 3; k += 1) col.set([tmp.r, tmp.g, tmp.b], (i + k) * 3);
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(col, 3));
  geometry.computeVertexNormals();
  const material = stylize(new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: GRADIENT }));
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.scale.z = scaleZ;
  hullMat ??= new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide });
  const hull = new THREE.Mesh(geometry, hullMat);
  const r = Math.max(rTop, rBottom, 0.1);
  hull.scale.set(1 + 0.08 / r, 1 + 0.06 / h, 1 + 0.08 / r);
  mesh.add(hull);
  parent.add(mesh);
  return mesh;
}

// ---------- Éléments animés en direct (jeu) ----------
// Les nœuds portant userData.live sont extraits dans une scène à part (arbres, lueurs, fumées, flammes, fanions).
function halo(parent, position, color, size) {
  const marker = group(parent, position);
  marker.userData.live = "halo";
  marker.userData.halo = { color, size };
  return marker;
}

// ---------- Éléments de décor réutilisables ----------
function pumpkin(parent, x, y, z, size, rng, lit = false) {
  const g = group(parent, [x, y, z], [0, rng() * 6.28, 0]);
  const color = [0xf08a1c, 0xe8741c, 0xf59a2c][Math.floor(rng() * 3)];
  S(g, "sphere", color, [size, size * 0.8, size], [0, size * 0.4, 0], [0, 0, 0], { outline: 0.05 });
  for (const a of [0.5, -0.5]) S(g, "sphere", color, [size * 0.62, size * 0.78, size * 0.9], [a * size * 0.34, size * 0.4, 0], [0, 0, 0], { noOutline: true });
  S(g, "cyl", 0x4f7a2a, [size * 0.14, size * 0.24, size * 0.14], [0, size * 0.82, 0], [0.15, 0, 0.2], { outline: 0.03 });
  if (lit) {
    halo(g, [0, size * 0.45, size * 0.3], 0xffd23a, size * 4.2);
    for (const side of [-1, 1]) G(g, "cone", 0xffe14a, [size * 0.16, size * 0.18, 0.04], [side * size * 0.2, size * 0.5, size * 0.46], [0, 0, 0]);
    G(g, "box", 0xffe14a, [size * 0.5, size * 0.1, 0.04], [0, size * 0.24, size * 0.48]);
  }
  return g;
}

// Arbres façon Animal Crossing : tronc court et épais, grosse couronne ronde et moelleuse, fruits colorés.
function autumnTree(parent, x, z, scale, rng, palette) {
  const g = group(parent, [x, 0, z], [0, rng() * 6.28, 0]);
  g.userData.live = "tree";
  g.userData.phase = x * 1.7 + z * 0.9;
  g.userData.trunk = 0.5 * scale + 0.12;           // rayon de collision : seul le tronc bloque
  const colors = (palette ?? [0xf08020, 0xe0561c, 0xf5a82c]).map((c) => new THREE.Color(c).multiplyScalar(0.8).getHex());
  const bark = 0x7a4a2c;
  S(g, "taper", bark, [1.0 * scale, 2.0 * scale, 1.0 * scale], [0, 1.0 * scale, 0], [0, 0, 0], { outline: 0.07 });
  for (const a of [0.6, 2.7, 4.8]) {
    S(g, "cone", bark, [0.5 * scale, 0.5 * scale, 0.5 * scale], [Math.cos(a) * 0.46 * scale, 0.22 * scale, Math.sin(a) * 0.46 * scale], [Math.sin(a) * 0.95, 0, -Math.cos(a) * 0.95], { noOutline: true });
  }
  // couronne : une grosse boule et des bosses rondes tout autour
  const blobs = [[0, 3.7, 0, 4.1, 0], [-1.45, 3.1, 0.3, 2.6, 1], [1.5, 3.2, -0.2, 2.7, 2], [0.2, 4.95, 0.1, 2.7, 2], [0.1, 3.1, 1.55, 2.5, 1], [-0.2, 3.2, -1.45, 2.4, 0]];
  blobs.forEach(([bx, by, bz, size, c]) => {
    const blob = S(g, "sphere", colors[c % colors.length], [size * scale, size * 0.92 * scale, size * scale], [bx * scale, by * scale, bz * scale], [0, 0, 0], { outline: 0.09 });
    blob.userData.sway = blob.position.clone();
  });
  // fruits : petites boules sur la couronne (positions fixes, pour ne pas modifier le tirage aléatoire)
  const fruit = [0xd0243a, 0xffd23f, 0xff7aa8, 0xd0243a, 0xffd23f];
  for (let k = 0; k < 7; k += 1) {
    const a = k * 0.95 + 0.4;
    const lift = ((k * 37) % 5) / 5 - 0.25;
    const dir = [Math.cos(a) * Math.cos(lift), Math.sin(lift), Math.sin(a) * Math.cos(lift)];
    const r = 2.0;
    const f = S(g, "sphere", fruit[k % fruit.length], [0.34 * scale, 0.34 * scale, 0.34 * scale], [dir[0] * r * scale, (3.7 + dir[1] * r) * scale, dir[2] * r * scale], [0, 0, 0], { outline: 0.03 });
    f.userData.sway = f.position.clone();
  }
  return g;
}

function deadTree(parent, x, z, scale, rng) {
  const g = group(parent, [x, 0, z], [0, rng() * 6.28, 0]);
  g.userData.live = "tree";
  g.userData.phase = x * 1.7 + z * 0.9;
  g.userData.dead = true;
  g.userData.trunk = 0.42 * scale + 0.12;
  const bark = 0x4a3448;
  const h = 3.2 * scale;
  S(g, "taper", bark, [0.95 * scale, h, 0.95 * scale], [0, h / 2, 0], [0, 0, 0], { outline: 0.06 });
  for (let i = 0; i < 4; i += 1) {
    const side = i % 2 ? 1 : -1;
    const y = h * (0.5 + i * 0.1);
    const tip = [side * (1.0 + rng() * 0.5) * scale, y + (0.7 + rng() * 0.6) * scale, (rng() - 0.5) * scale];
    limb(g, "taper", bark, [0, y, 0], tip, 0.3 * scale, { outline: 0.05 });
    S(g, "sphere", bark, [0.36 * scale, 0.36 * scale, 0.36 * scale], tip, [0, 0, 0], { outline: 0.04 });
  }
  return g;
}

// Palmier d'île déserte : tronc courbe, palmes qui retombent, noix de coco-citrouilles (le feuillage se balance).
function palm(parent, x, z, scale, rng) {
  const g = group(parent, [x, 0, z], [0, rng() * 6.28, 0]);
  g.userData.live = "tree";
  g.userData.phase = x * 1.7 + z * 0.9;
  g.userData.trunk = 0.24 * scale + 0.1;
  const bark = 0x8a6a4c;
  const lean = (rng() - 0.5) * 1.6 * scale;
  const top = [lean, 4.4 * scale, lean * 0.3];
  const mid = [lean * 0.35, 2.2 * scale, 0];
  limb(g, "taper", bark, [0, 0, 0], mid, 0.5 * scale, { outline: 0.05 });
  limb(g, "taper", 0x7a5a40, mid, top, 0.4 * scale, { outline: 0.05 });
  const fronds = [0x2f8a5a, 0x3aa86a, 0x58a84a, 0x2a7a6a];
  for (let i = 0; i < 8; i += 1) {
    const yaw = (i / 8) * Math.PI * 2 + rng() * 0.3;
    const holder = group(g, top, [0, yaw, 0]);
    const droop = 0.35 + (i % 2) * 0.25;
    const frond = S(holder, "sphere", fronds[i % fronds.length], [0.7 * scale, 0.12 * scale, 2.7 * scale], [0, -Math.sin(droop) * 1.0 * scale, Math.cos(droop) * 1.35 * scale], [droop, 0, 0], { outline: 0.05 });
    frond.userData.sway = frond.position.clone();
  }
  for (let i = 0; i < 3; i += 1) {
    const a = i * 2.1;
    const nut = S(g, "sphere", i === 1 ? 0xf08a1c : 0x5a3a28, [0.4 * scale, 0.4 * scale, 0.4 * scale], [top[0] + Math.cos(a) * 0.3 * scale, top[1] - 0.25 * scale, top[2] + Math.sin(a) * 0.3 * scale], [0, 0, 0], { outline: 0.03 });
    nut.userData.sway = nut.position.clone();
  }
  return g;
}

// Torche de plage : citrouille allumée plantée sur un piquet.
function torch(parent, x, z, rng) {
  const g = group(parent, [x, 0, z]);
  S(g, "cyl", 0x6a4a30, [0.16, 1.5, 0.16], [0, 0.75, 0], [0.05, 0, -0.05], { outline: 0.04 });
  pumpkin(g, 0, 1.5, 0, 0.55, rng, true);
  return g;
}

function driftwood(parent, x, z, rng) {
  const g = group(parent, [x, 0, z], [0, rng() * 3.14, 0]);
  S(g, "cyl", 0xa8886a, [0.24, 1.9 + rng() * 0.8, 0.24], [0, 0.14, 0], [0, 0, Math.PI / 2 + (rng() - 0.5) * 0.2], { outline: 0.04 });
  if (rng() < 0.6) S(g, "cyl", 0x8a6a4c, [0.16, 0.9, 0.16], [0.3, 0.22, 0.12], [0.3, 0.5, Math.PI / 2], { outline: 0.03 });
  return g;
}

function beachRock(parent, x, z, scale, rng) {
  const g = group(parent, [x, 0, z], [0, rng() * 6.28, 0]);
  S(g, "sphere", 0x7a7490, [1.1 * scale, 0.7 * scale, 0.9 * scale], [0, 0.22 * scale, 0], [0, 0, 0], { outline: 0.05 });
  S(g, "sphere", 0x6a6482, [0.6 * scale, 0.45 * scale, 0.55 * scale], [0.55 * scale, 0.14 * scale, 0.3 * scale], [0, 0, 0], { outline: 0.04 });
  return g;
}

function flower(parent, x, z, rng) {
  const g = group(parent, [x, 0, z]);
  const color = [0xffffff, 0xff9ac8, 0xffe14a, 0xb89aff, 0xff8a5a][Math.floor(rng() * 5)];
  for (let i = 0; i < 5; i += 1) {
    const a = (i / 5) * Math.PI * 2;
    S(g, "sphere", color, [0.22, 0.1, 0.22], [Math.cos(a) * 0.17, 0.09, Math.sin(a) * 0.17], [0, 0, 0], { outline: 0.02 });
  }
  S(g, "sphere", 0xffd23f, [0.16, 0.12, 0.16], [0, 0.13, 0], [0, 0, 0], { outline: 0.02 });
  return g;
}

function mushroom(parent, x, z, rng, scale = 1) {
  const g = group(parent, [x, 0, z], [0, rng() * 6, 0]);
  S(g, "cyl", 0xf4ead2, [0.26 * scale, 0.4 * scale, 0.26 * scale], [0, 0.2 * scale, 0], [0, 0, 0], { outline: 0.03 });
  S(g, "dome", 0xd83a3a, [0.74 * scale, 0.42 * scale, 0.74 * scale], [0, 0.42 * scale, 0], [0, 0, 0], { outline: 0.04 });
  for (const [dx, dz] of [[0.2, 0.05], [-0.12, 0.2], [-0.05, -0.2]]) {
    S(g, "sphere", 0xffffff, [0.14 * scale, 0.07 * scale, 0.14 * scale], [dx * scale, 0.6 * scale, dz * scale], [0, 0, 0], { noOutline: true });
  }
  return g;
}

function tomb(parent, x, z, rng, scale = 1) {
  const g = group(parent, [x, 0, z], [0, (rng() - 0.5) * 0.4, 0]);
  const color = [0xb9b2cc, 0xa49cbc, 0xc7c0d8][Math.floor(rng() * 3)];
  S(g, "box", color, [0.8 * scale, 1.0 * scale, 0.28 * scale], [0, 0.5 * scale, 0], [0, 0, 0], { outline: 0.05 });
  S(g, "dome", color, [0.8 * scale, 0.45 * scale, 0.28 * scale], [0, 1.0 * scale, 0], [0, 0, 0], { outline: 0.05 });
  S(g, "box", 0x5a5070, [0.18 * scale, 0.04, 0.04], [0, 0.72 * scale, 0.15 * scale], [0, 0, 0], { noOutline: true });
  S(g, "box", 0x5a5070, [0.04, 0.34 * scale, 0.04], [0, 0.7 * scale, 0.15 * scale], [0, 0, 0], { noOutline: true });
  return g;
}

function bush(parent, x, z, scale, rng, color = 0x4a9a3a) {
  const g = group(parent, [x, 0, z]);
  for (let i = 0; i < 3; i += 1) S(g, "sphere", i === 1 ? 0x5aae42 : color, [0.9 * scale, 0.7 * scale, 0.9 * scale], [(i - 1) * 0.5 * scale, 0.32 * scale, (rng() - 0.5) * 0.3], [0, 0, 0], { outline: 0.05 });
  return g;
}

function lamp(parent, x, z) {
  const g = group(parent, [x, 0, z]);
  S(g, "cyl", 0x3a2a36, [0.14, 2.0, 0.14], [0, 1.0, 0], [0, 0, 0], { outline: 0.04 });
  S(g, "box", 0x3a2a36, [0.46, 0.1, 0.46], [0, 2.05, 0], [0, 0, 0], { outline: 0.03 });
  G(g, "box", 0xffc65a, [0.34, 0.4, 0.34], [0, 2.3, 0], [0, 0, 0]);
  S(g, "cone", 0x3a2a36, [0.5, 0.26, 0.5], [0, 2.6, 0], [0, 0, 0], { outline: 0.03 });
  halo(g, [0, 2.3, 0.1], 0xffc65a, 4.2);
  return g;
}

function barrel(parent, x, z, rng, color = 0x8a5a32) {
  const g = group(parent, [x, 0, z], [0, rng() * 6, 0]);
  S(g, "cyl", color, [0.7, 0.9, 0.7], [0, 0.45, 0], [0, 0, 0], { outline: 0.05 });
  for (const y of [0.2, 0.7]) S(g, "cyl", 0x3a2f3f, [0.74, 0.07, 0.74], [0, y, 0], [0, 0, 0], { noOutline: true });
  return g;
}

function crate(parent, x, y, z, size, rng, color = 0xb07a42) {
  const g = group(parent, [x, y, z], [0, (rng() - 0.5) * 0.5, 0]);
  S(g, "box", color, [size, size, size], [0, size / 2, 0], [0, 0, 0], { outline: 0.05 });
  for (const s of [-1, 1]) S(g, "box", 0x6a4524, [size * 1.02, size * 0.1, size * 1.02], [0, size / 2 + s * size * 0.32, 0], [0, 0, 0], { noOutline: true });
  S(g, "box", 0x6a4524, [size * 0.1, size * 1.02, size * 1.02], [0, size / 2, 0], [0, 0, 0], { noOutline: true });
  return g;
}

function hay(parent, x, z, rng) {
  const g = group(parent, [x, 0, z], [0, rng() * 6, 0]);
  S(g, "cyl", 0xe8c24a, [1.0, 0.8, 1.0], [0, 0.4, 0], [Math.PI / 2, 0, 0], { outline: 0.05 });
  S(g, "torus", 0xb89030, [0.9, 0.9, 0.9], [0, 0.4, 0.42], [0, 0, 0], { noOutline: true });
  return g;
}

function leafPile(parent, x, z, rng) {
  const g = group(parent, [x, 0, z]);
  const colors = [0xf08020, 0xe0561c, 0xf5a82c, 0xc4401a];
  for (let i = 0; i < 4; i += 1) S(g, "sphere", colors[i % 4], [0.6 + rng() * 0.3, 0.14, 0.5 + rng() * 0.3], [(rng() - 0.5) * 0.9, 0.06, (rng() - 0.5) * 0.7], [0, rng() * 3, 0], { noOutline: true });
  return g;
}

function skull(parent, x, z, rng) {
  const g = group(parent, [x, 0, z], [0, rng() * 6, 0]);
  S(g, "sphere", 0xefe8d4, [0.4, 0.34, 0.36], [0, 0.2, 0], [0, 0, 0], { outline: 0.03 });
  for (const side of [-1, 1]) S(g, "sphere", INK, [0.1, 0.12, 0.05], [side * 0.1, 0.22, 0.17], [0, 0, 0], { noOutline: true });
  return g;
}

function cornRow(parent, x, z, length, rng) {
  const g = group(parent, [x, 0, z]);
  g.userData.corn = true;   // les tiges plient autour du joueur (vertex shader, voir relief.js)
  for (let i = 0; i < length; i += 1) {
    const sx = (i - length / 2) * 0.55;
    S(g, "taper", 0x6a9a3a, [0.28, 1.8 + rng() * 0.5, 0.28], [sx, 0.95, (rng() - 0.5) * 0.2], [0, 0, (rng() - 0.5) * 0.2], { outline: 0.03 });
    S(g, "sphere", 0xf5c93a, [0.28, 0.6, 0.28], [sx + 0.12, 1.5, 0.16], [0, 0, -0.3], { outline: 0.03 });
    S(g, "cone", 0x8abc4a, [0.12, 1.0, 0.04], [sx - 0.18, 1.35, 0], [0, 0, 0.7], { noOutline: true });
  }
  return g;
}

// ---------- Constructions (origine = centre au sol, façade vers +z) ----------
function windowsOn(g, w, hw, d, rows, cols, lit = 0.8, rng = Math.random) {
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const x = ((c + 0.5) / cols - 0.5) * w * 0.8;
      const y = hw * ((r + 0.7) / (rows + 0.5));
      const on = rng() < lit;
      S(g, "box", 0x3a2438, [0.62, 0.78, 0.06], [x, y, d / 2 + 0.01], [0, 0, 0], { noOutline: true });
      G(g, "box", on ? 0xffc65a : 0x4a3a6a, [0.46, 0.62, 0.06], [x, y, d / 2 + 0.05], [0, 0, 0]);
      S(g, "box", 0x3a2438, [0.5, 0.05, 0.07], [x, y, d / 2 + 0.06], [0, 0, 0], { noOutline: true });
    }
  }
}

function house(g, { w, d, h, wall = 0xb6623f, roof = 0x7a3b6e, trim = 0x3a2438, rows = 1, cols = 2, rng, chimney = true, door = true, roofRatio = 0.46 }) {
  const hr = Math.max(0.8, Math.min(h * roofRatio, d * 0.62));
  const hw = Math.max(1.2, h - hr);
  S(g, "box", wall, [w, hw, d], [0, hw / 2, 0], [0, 0, 0], { outline: 0.08 });
  for (let i = 1; i < 5; i += 1) S(g, "box", trim, [w * 1.005, 0.035, d * 1.005], [0, hw * (i / 5), 0], [0, 0, 0], { noOutline: true });
  const roofLit = (() => {
    const c = new THREE.Color(roof);
    const hsl = {};
    c.getHSL(hsl);
    return c.setHSL(hsl.h, Math.min(hsl.s, 0.6), Math.min(Math.max(hsl.l, 0.24), 0.34)).getHex();
  })();
  S(g, "gable", roofLit, [d * 1.14, hr, w * 1.12], [0, hw + hr / 2 - 0.02, 0], [0, Math.PI / 2, 0], { outline: 0.09 });
  for (const t of [0.2, 0.4, 0.6, 0.8]) {
    const slope = Math.atan2(hr, d * 0.57);
    S(g, "box", 0x1a0f2a, [w * 1.1, 0.05, 0.06], [0, hw + hr * t - 0.02 + 0.05, d * 0.57 * (1 - t) + 0.05], [-slope, 0, 0], { noOutline: true });
  }
  S(g, "box", trim, [w * 1.14, 0.12, 0.14], [0, hw + 0.02, d * 0.56], [0, 0, 0], { noOutline: true });
  windowsOn(g, w, hw, d, rows, cols, 0.85, rng);
  if (door) {
    const dx = cols % 2 ? 0 : w * 0.34;
    S(g, "box", 0x4a2a22, [0.8, 1.15, 0.1], [dx, 0.58, d / 2 + 0.02], [0, 0, 0], { noOutline: true });
    S(g, "dome", 0x4a2a22, [0.8, 0.36, 0.1], [dx, 1.15, d / 2 + 0.02], [0, 0, 0], { noOutline: true });
    S(g, "box", 0x8a8294, [0.9, 0.12, 0.34], [dx, 0.06, d / 2 + 0.2], [0, 0, 0], { noOutline: true });
  }
  if (chimney) {
    S(g, "box", 0x6a4a58, [0.5, 1.0, 0.5], [-w * 0.3, hw + hr * 0.7, -d * 0.1], [0, 0, 0], { outline: 0.05 });
    G(g, "sphere", 0xffd0a0, [0.28, 0.18, 0.28], [-w * 0.3, hw + hr * 0.7 + 0.56, -d * 0.1], [0, 0, 0], 0.55);
    group(g, [-w * 0.3, hw + hr * 0.7 + 0.6, -d * 0.1]).userData.live = "smoke";
  }
}

function manor(g, { w, d, h, rng }) {
  const stone = 0x6a4a7c;
  const roof = 0x3a2a58;
  house(g, { w: w * 0.5, d, h: h * 0.92, wall: stone, roof, rows: 3, cols: 3, rng, chimney: false, trim: 0x2a1c3a, roofRatio: 0.36 });
  for (const side of [-1, 1]) {
    const wing = group(g, [side * w * 0.33, 0, -d * 0.04]);
    house(wing, { w: w * 0.3, d: d * 0.9, h: h * 0.7, wall: 0x7a5a8c, roof, rows: 2, cols: 2, rng, chimney: side > 0, door: false, trim: 0x2a1c3a });
    const tower = group(g, [side * w * 0.5, 0, d * 0.1]);
    S(tower, "cyl", stone, [d * 0.5, h * 0.95, d * 0.5], [0, h * 0.475, 0], [0, 0, 0], { outline: 0.08 });
    S(tower, "cone", 0x2a1c4a, [d * 0.62, h * 0.5, d * 0.62], [0, h * 0.95 + h * 0.2, 0], [0, 0, 0], { outline: 0.08 });
    G(tower, "box", 0xffc65a, [0.42, 0.7, 0.06], [0, h * 0.6, d * 0.26], [0, 0, 0]);
    S(tower, "sphere", 0xf08a1c, [0.3, 0.3, 0.3], [0, h * 1.25, 0], [0, 0, 0], { noOutline: true });
  }
  // grand escalier + portail lumineux
  S(g, "box", 0x8a8294, [w * 0.2, 0.2, 0.7], [0, 0.1, d / 2 + 0.5], [0, 0, 0], { noOutline: true });
  G(g, "box", 0xffa63a, [0.9, 1.4, 0.06], [0, 0.8, d / 2 + 0.06], [0, 0, 0]);
  for (const side of [-1, 1]) {
    S(g, "cyl", 0x4a3a58, [0.3, 1.8, 0.3], [side * w * 0.12, 0.9, d / 2 + 0.2], [0, 0, 0], { outline: 0.04 });
    pumpkin(g, side * w * 0.2, 0.2, d / 2 + 0.9, 0.7, rng, true);
  }
}

function barn(g, { w, d, h, rng }) {
  house(g, { w, d, h, wall: 0xc2402e, roof: 0x8a4a6a, rows: 0, cols: 0, rng, chimney: false, door: false, roofRatio: 0.4, trim: 0x7a2a26 });
  const hw = h * 0.6;
  S(g, "box", 0xf1e8d4, [w * 0.34, hw * 0.74, 0.1], [0, hw * 0.37, d / 2 + 0.04], [0, 0, 0], { noOutline: true });
  for (const s of [-1, 1]) S(g, "box", 0xf1e8d4, [0.12, hw * 0.9, 0.05], [0, hw * 0.37, d / 2 + 0.11], [0, 0, s * 0.7], { noOutline: true });
  S(g, "box", 0x7a2a26, [w * 0.34, 0.08, 0.06], [0, hw * 0.37, d / 2 + 0.1], [0, 0, 0], { noOutline: true });
  G(g, "box", 0xffc65a, [0.6, 0.5, 0.06], [0, hw * 0.92, d / 2 + 0.06], [0, 0, 0]);
  for (let i = 0; i < 3; i += 1) hay(g, -w * 0.7 + i * 0.4, d / 2 + 0.9 + (i % 2) * 0.4, rng);
}

function crypt(g, { w, d, h, rng }) {
  const hs = h * 0.62;
  S(g, "box", 0x9a92b0, [w, hs, d], [0, hs / 2, 0], [0, 0, 0], { outline: 0.07 });
  S(g, "gable", 0x6a6088, [d * 1.15, h * 0.34, w * 1.12], [0, hs + h * 0.17, 0], [0, Math.PI / 2, 0], { outline: 0.07 });
  S(g, "box", 0x18102a, [w * 0.42, hs * 0.66, 0.1], [0, hs * 0.33, d / 2 + 0.02], [0, 0, 0], { noOutline: true });
  S(g, "dome", 0x18102a, [w * 0.42, hs * 0.3, 0.1], [0, hs * 0.66, d / 2 + 0.02], [0, 0, 0], { noOutline: true });
  G(g, "box", 0x9a5aff, [w * 0.26, hs * 0.46, 0.05], [0, hs * 0.26, d / 2 + 0.08], [0, 0, 0], 0.9);
  S(g, "box", 0xcfc8e0, [0.14, 0.6, 0.12], [0, hs + h * 0.34 + 0.2, 0], [0, 0, 0], { outline: 0.04 });
  S(g, "box", 0xcfc8e0, [0.46, 0.14, 0.12], [0, hs + h * 0.34 + 0.3, 0], [0, 0, 0], { outline: 0.04 });
  for (const s of [-1, 1]) S(g, "cyl", 0xcfc8e0, [0.22, hs, 0.22], [s * w * 0.46, hs / 2, d / 2 + 0.1], [0, 0, 0], { outline: 0.04 });
}

function car(g, { w, d, h, color = 0xc03a3a, rng, truck = false }) {
  const bh = h * 0.5;
  const r = Math.min(0.5, d * 0.32);
  S(g, "box", color, [w * 0.96, bh, d * 0.98], [0, bh / 2 + r * 0.7, 0], [0, 0, 0], { outline: 0.06 });
  const cabW = truck ? w * 0.38 : w * 0.52;
  S(g, "box", color, [cabW, h * 0.42, d * 0.88], [truck ? w * 0.22 : -w * 0.04, bh + r * 0.7 + h * 0.19, 0], [0, 0, 0], { outline: 0.06 });
  S(g, "box", 0x4a6a9a, [cabW * 0.92, h * 0.26, d * 0.9], [truck ? w * 0.22 : -w * 0.04, bh + r * 0.7 + h * 0.22, 0], [0, 0, 0], { noOutline: true, gloss: true });
  if (truck) S(g, "box", 0x6a4a3a, [w * 0.4, h * 0.14, d * 0.84], [-w * 0.24, bh + r * 0.7 + h * 0.04, 0], [0, 0, 0], { outline: 0.04 });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    S(g, "cyl", 0x2a2230, [r * 2, 0.22, r * 2], [sx * w * 0.3, r, sz * d * 0.5], [Math.PI / 2, 0, 0], { outline: 0.04 });
    S(g, "cyl", 0xb8b0c8, [r * 1.0, 0.24, r * 1.0], [sx * w * 0.3, r, sz * d * 0.5], [Math.PI / 2, 0, 0], { noOutline: true });
  }
  for (const sz of [-1, 1]) G(g, "sphere", 0xfff0a0, [0.2, 0.2, 0.16], [w * 0.48, bh * 0.8 + r * 0.7, sz * d * 0.3], [0, 0, 0]);
}

function tractor(g, { w, d, h, rng }) {
  S(g, "box", 0xc23a2a, [w * 0.62, h * 0.34, d * 0.55], [w * 0.14, h * 0.34, 0], [0, 0, 0], { outline: 0.06 });
  S(g, "box", 0xc23a2a, [w * 0.34, h * 0.4, d * 0.62], [-w * 0.14, h * 0.74, 0], [0, 0, 0], { outline: 0.06 });
  S(g, "box", 0x4a6a9a, [w * 0.3, h * 0.26, d * 0.64], [-w * 0.14, h * 0.76, 0], [0, 0, 0], { noOutline: true, gloss: true });
  S(g, "cyl", 0x3a3040, [0.14, h * 0.5, 0.14], [w * 0.34, h * 0.78, d * 0.1], [0, 0, 0], { outline: 0.03 });
  for (const sz of [-1, 1]) {
    S(g, "cyl", 0x2a2230, [h * 0.9, 0.34, h * 0.9], [-w * 0.26, h * 0.45, sz * d * 0.42], [Math.PI / 2, 0, 0], { outline: 0.05 });
    S(g, "cyl", 0xe8c24a, [h * 0.4, 0.36, h * 0.4], [-w * 0.26, h * 0.45, sz * d * 0.42], [Math.PI / 2, 0, 0], { noOutline: true });
    S(g, "cyl", 0x2a2230, [h * 0.5, 0.26, h * 0.5], [w * 0.34, h * 0.25, sz * d * 0.42], [Math.PI / 2, 0, 0], { outline: 0.04 });
  }
}

function caravan(g, { w, d, h, rng }) {
  const bh = h * 0.72;
  S(g, "box", 0xcb5a72, [w, bh, d], [0, bh / 2 + 0.3, 0], [0, 0, 0], { outline: 0.07 });
  S(g, "cyl", 0xe8dcd0, [d * 0.96, w * 1.02, d * 0.96], [0, bh + 0.3, 0], [0, 0, Math.PI / 2], { outline: 0.06 }).scale.y = w * 1.02;
  for (let i = 0; i < 2; i += 1) {
    S(g, "box", 0x3a2438, [0.9, 0.8, 0.06], [-w * 0.22 + i * w * 0.44, bh * 0.62 + 0.3, d / 2 + 0.02], [0, 0, 0], { noOutline: true });
    G(g, "box", i ? 0xffc65a : 0x7ad0ff, [0.72, 0.62, 0.06], [-w * 0.22 + i * w * 0.44, bh * 0.62 + 0.3, d / 2 + 0.05], [0, 0, 0]);
  }
  for (const s of [-1, 1]) {
    S(g, "cyl", 0x2a2230, [0.8, 0.26, 0.8], [s * w * 0.25, 0.4, d * 0.52], [Math.PI / 2, 0, 0], { outline: 0.04 });
    S(g, "cyl", 0xb8b0c8, [0.36, 0.28, 0.36], [s * w * 0.25, 0.4, d * 0.52], [Math.PI / 2, 0, 0], { noOutline: true });
  }
}

function patch(g, { w, d, h, rng }) {
  const count = Math.round(w * d * 0.75);
  S(g, "cyl", 0x4a6a28, [w * 0.98, 0.18, d * 0.98], [0, 0.09, 0], [0, 0, 0], { outline: 0.04 });
  for (let i = 0; i < count; i += 1) {
    const a = rng() * Math.PI * 2;
    const rr = Math.sqrt(rng());
    const x = Math.cos(a) * rr * (w / 2 - 0.5);
    const z = Math.sin(a) * rr * (d / 2 - 0.5);
    const size = 0.8 + rng() * 0.5;
    pumpkin(g, x, 0.1 + rng() * 0.12, z, size, rng, rng() < 0.12 && z > 0);
  }
  for (let i = 0; i < 10; i += 1) {
    const a = rng() * Math.PI * 2;
    S(g, "sphere", 0x5aae42, [0.7, 0.2, 0.5], [Math.cos(a) * w * 0.42, 0.14, Math.sin(a) * d * 0.4], [0, a, 0], { noOutline: true });
  }
}

function totem(g, { w, d, h, rng }) {
  const s = Math.min(w * 0.95, h * 0.34);
  for (let i = 0; i < 3; i += 1) pumpkin(g, 0, i * s * 0.74, 0, s * (1.05 - i * 0.05), rng, true);
  S(g, "cyl", 0x6a3a1a, [s * 1.5, 0.08, s * 1.5], [0, 3 * s * 0.74 + 0.1, 0], [0, 0, 0], { outline: 0.04 });
  S(g, "cone", 0x6a3a1a, [s * 0.9, s * 0.8, s * 0.9], [0, 3 * s * 0.74 + 0.5, 0], [0, 0, 0], { outline: 0.05 });
}

function bigTop(g, { w, d, h, rng }) {
  const R = w / 2;
  const sz = d / w;
  const wallH = h * 0.4;
  const colors = [0x9b2fc9, 0xf08a1c];
  const lower = group(g, [0, 0, 0]);
  lower.scale.z = sz;
  stripedMesh(lower, { rTop: R, rBottom: R, h: wallH, segs: 16, colors, position: [0, wallH / 2, 0] });
  stripedMesh(lower, { rTop: R * 0.1, rBottom: R, h: h * 0.5, segs: 16, colors, position: [0, wallH + h * 0.25, 0] });
  S(lower, "cyl", 0xf0b323, [R * 2.02, 0.22, R * 2.02], [0, wallH, 0], [0, 0, 0], { outline: 0.06 });
  S(g, "cyl", 0x5a3a28, [0.14, h * 0.2, 0.14], [0, h * 0.97 + 0.4, 0], [0, 0, 0], { noOutline: true });
  S(g, "gable", 0xf08a1c, [0.04, 0.6, 1.1], [0.55, h * 1.12, 0], [0, 0, 0], { noOutline: true });
  S(g, "sphere", 0xf0b323, [0.34, 0.34, 0.34], [0, h * 1.08 + 0.4, 0], [0, 0, 0], { noOutline: true });
  // entrée : arche sombre + vortex violet
  const zf = (R * sz) * 0.9;
  S(g, "box", 0x1a0b2e, [R * 0.7, wallH * 0.92, 0.2], [0, wallH * 0.46, zf + 0.2], [0, 0, 0], { noOutline: true });
  S(g, "dome", 0x1a0b2e, [R * 0.7, wallH * 0.7, 0.2], [0, wallH * 0.92, zf + 0.2], [0, 0, 0], { noOutline: true });
  G(g, "box", 0x9a4aff, [R * 0.5, wallH * 0.62, 0.05], [0, wallH * 0.36, zf + 0.32], [0, 0, 0], 0.95);
  S(g, "gable", 0xf0b323, [0.4, 0.5, R * 0.9], [0, wallH * 1.18, zf + 0.25], [0, Math.PI / 2, 0], { outline: 0.05 });
  for (const s of [-1, 1]) {
    S(g, "cyl", 0xf0b323, [0.34, wallH, 0.34], [s * R * 0.38, wallH * 0.5, zf + 0.35], [0, 0, 0], { outline: 0.05 });
    lamp(g, s * (R * 0.58), zf + 0.9);
  }
}

function stall(g, { w, d, h, rng, color = 0xc23a4a, awning = [0xc23a4a, 0xf1e8d4] }) {
  S(g, "box", 0x7a4a32, [w, h * 0.5, d * 0.5], [0, h * 0.25, d * 0.16], [0, 0, 0], { outline: 0.06 });
  S(g, "box", 0x6a3a28, [w, h * 0.9, 0.2], [0, h * 0.45, -d * 0.32], [0, 0, 0], { outline: 0.06 });
  for (const s of [-1, 1]) S(g, "cyl", 0x5a3a28, [0.2, h * 0.92, 0.2], [s * (w / 2 - 0.1), h * 0.46, d * 0.38], [0, 0, 0], { outline: 0.04 });
  const aw = group(g, [0, h * 0.86, 0.1], [0.5, 0, 0]);
  const stripes = 6;
  for (let i = 0; i < stripes; i += 1) S(aw, "box", awning[i % 2], [w / stripes, 0.14, d * 0.9], [(i - (stripes - 1) / 2) * (w / stripes), 0, 0], [0, 0, 0], { outline: 0.04 });
  for (let i = 0; i < 4; i += 1) {
    const x = (i - 1.5) * (w / 4.5);
    S(g, "sphere", [0x7aff9a, 0xff7ad0, 0x7ad0ff, 0xffd23a][i], [0.3, 0.38, 0.3], [x, h * 0.5 + 0.2, d * 0.2], [0, 0, 0], { outline: 0.03 });
    G(g, "sphere", [0x7aff9a, 0xff7ad0, 0x7ad0ff, 0xffd23a][i], [0.14, 0.14, 0.14], [x, h * 0.5 + 0.22, d * 0.2 + 0.1], [0, 0, 0], 0.8);
  }
  G(g, "box", 0xffc65a, [w * 0.5, 0.3, 0.05], [0, h * 0.74, d * 0.52], [0, 0, 0]);
}

function smallTent(g, { w, d, h, rng, colors = [0x9b2fc9, 0xf08a1c] }) {
  const R = w / 2;
  const t = group(g, [0, 0, 0]);
  t.scale.z = d / w;
  stripedMesh(t, { rTop: R, rBottom: R, h: h * 0.38, segs: 10, colors, position: [0, h * 0.19, 0] });
  stripedMesh(t, { rTop: R * 0.06, rBottom: R * 1.02, h: h * 0.6, segs: 10, colors, position: [0, h * 0.38 + h * 0.3, 0] });
  S(t, "sphere", 0xf0b323, [0.3, 0.3, 0.3], [0, h * 1.0 + 0.1, 0], [0, 0, 0], { noOutline: true });
  S(g, "box", 0x1a0b2e, [R * 0.5, h * 0.3, 0.1], [0, h * 0.15, (d / 2) * 0.92], [0, 0, 0], { noOutline: true });
}

function crates(g, { w, d, h, rng }) {
  const s = Math.min(w * 0.55, 1.1);
  crate(g, -w * 0.2, 0, 0, s * 1.05, rng, 0xb07a42);
  crate(g, w * 0.22, 0, d * 0.05, s, rng, 0xa4692e);
  crate(g, -w * 0.12, s * 1.05, 0, s * 0.9, rng, 0xc08a52);
  crate(g, w * 0.2, s, d * 0.05, s * 0.8, rng, 0xb07a42);
  crate(g, 0, 0, d * 0.3, s * 0.8, rng, 0x9a5a28);
}

function wagon(g, { w, d, h, rng }) {
  const bh = h * 0.5;
  S(g, "box", 0x9a4a3a, [w * 0.9, bh, d * 0.9], [0, bh / 2 + 0.45, 0], [0, 0, 0], { outline: 0.07 });
  S(g, "gable", 0x6a2a3a, [d * 1.0, h * 0.34, w * 0.98], [0, bh + 0.45 + h * 0.17, 0], [0, Math.PI / 2, 0], { outline: 0.07 });
  G(g, "box", 0xffc65a, [0.6, 0.55, 0.06], [-w * 0.2, bh * 0.6 + 0.45, d * 0.46], [0, 0, 0]);
  for (const s of [-1, 1]) {
    S(g, "cyl", 0x5a3a28, [1.0, 0.2, 1.0], [s * w * 0.3, 0.5, d * 0.5], [Math.PI / 2, 0, 0], { outline: 0.05 });
    S(g, "cyl", 0xc89a5a, [0.5, 0.24, 0.5], [s * w * 0.3, 0.5, d * 0.5], [Math.PI / 2, 0, 0], { noOutline: true });
  }
  S(g, "box", 0x5a3a28, [0.14, 0.14, 1.4], [-w * 0.52, 0.5, d * 0.7], [0, 0.3, 0], { noOutline: true });
}

function theatre(g, { w, d, h, rng }) {
  S(g, "box", 0x8a5a32, [w, 0.5, d * 0.9], [0, 0.25, 0], [0, 0, 0], { outline: 0.06 });
  S(g, "box", 0x4a2a52, [w * 0.92, h * 0.62, 0.3], [0, h * 0.5, -d * 0.36], [0, 0, 0], { outline: 0.06 });
  S(g, "box", 0xb0243a, [w * 0.64, h * 0.56, 0.2], [0, h * 0.5, -d * 0.2], [0, 0, 0], { outline: 0.04 });
  for (const s of [-1, 1]) {
    S(g, "cyl", 0xe8c24a, [0.5, h * 0.78, 0.5], [s * w * 0.4, h * 0.45, d * 0.1], [0, 0, 0], { outline: 0.06 });
    S(g, "sphere", 0xf0b323, [0.64, 0.4, 0.64], [s * w * 0.4, h * 0.86, d * 0.1], [0, 0, 0], { outline: 0.05 });
    S(g, "box", 0xb0243a, [w * 0.18, h * 0.5, 0.18], [s * w * 0.3, h * 0.46, d * 0.0], [0, 0, s * -0.06], { noOutline: true });
  }
  S(g, "box", 0xe8c24a, [w * 0.98, 0.5, 0.5], [0, h * 0.96, d * 0.06], [0, 0, 0], { outline: 0.06 });
  S(g, "dome", 0xf0b323, [w * 0.5, h * 0.3, 0.5], [0, h * 1.0, d * 0.06], [0, 0, 0], { outline: 0.06 });
  S(g, "sphere", 0xefe8d4, [0.6, 0.5, 0.5], [0, h * 1.12, d * 0.1], [0, 0, 0], { outline: 0.04 });
  for (const s of [-1, 1]) S(g, "sphere", INK, [0.14, 0.16, 0.06], [s * 0.15, h * 1.14, d * 0.1 + 0.26], [0, 0, 0], { noOutline: true });
  for (let i = 0; i < 4; i += 1) S(g, "box", 0xa88a62, [w * 0.34, 0.16, 0.5], [0, 0.55 + i * 0.0, d * 0.5 - i * 0.0 + 0.2 + i * 0.0], [0, 0, 0], { noOutline: true }).position.set(0, 0.1 + i * 0.12, d * 0.5 + 0.9 - i * 0.28);
}

function blocks(g, { w, d, h, rng, kind = "tower" }) {
  const u = Math.min(w * 0.9, h * 0.34, 1.6);
  const colors = [0xf4a09a, 0xf0b323, 0x7ad0a0, 0x7a9aff, 0xd070e0];
  const levels = Math.max(1, Math.min(3, Math.round(h / u)));
  for (let i = 0; i < levels; i += 1) {
    const c = group(g, [(rng() - 0.5) * 0.2, i * u, 0], [0, (rng() - 0.5) * 0.3, 0]);
    S(c, "box", colors[(i + Math.floor(rng() * 5)) % 5], [u, u, u], [0, u / 2, 0], [0, 0, 0], { outline: 0.06 });
    if (i % 2 === 0) {
      for (const [dx, dz] of [[-0.25, -0.25], [0.25, 0.25], [0, 0], [-0.25, 0.25], [0.25, -0.25]]) S(c, "sphere", 0xffffff, [0.14 * u, 0.14 * u, 0.06], [dx * u, u * 0.5 + 0.0, u / 2 + 0.01], [0, 0, 0], { noOutline: true }).position.set(dx * u, u * 0.5 + dz * u, u / 2 + 0.01);
    } else {
      for (let r = 3; r >= 1; r -= 1) S(c, "cyl", r % 2 ? 0xffffff : 0xd0243a, [u * 0.26 * r, 0.03, u * 0.26 * r], [0, u / 2, u / 2 + 0.02], [Math.PI / 2, 0, 0], { noOutline: true });
    }
  }
  S(g, "pyr", 0xd0243a, [u * 1.0, u * 0.7, u * 1.0], [0, levels * u + u * 0.35, 0], [0, 0, 0], { outline: 0.06 });
}

function rocks(g, { w, d, h, rng }) {
  const colors = [0xc99aa8, 0xb98ca0, 0xd8aab8, 0xa57e92];
  for (let i = 0; i < 7; i += 1) {
    const a = (i / 7) * Math.PI * 2;
    const r = i === 0 ? 0 : 0.7;
    const s = (i === 0 ? 1.7 : 1.1) * Math.min(1.1, w / 3);
    S(g, "sphere", colors[i % 4], [s, s * 0.85, s * 0.9], [Math.cos(a) * w * 0.25 * r, s * 0.4, Math.sin(a) * d * 0.25 * r], [rng() * 0.6, rng() * 3, rng() * 0.6], { outline: 0.07 });
  }
}

function cartProp(g, { w, d, h, rng }) {
  S(g, "box", 0x8a5a32, [w * 0.7, h * 0.4, d * 0.8], [0, h * 0.5, 0], [0, 0, 0], { outline: 0.06 });
  for (let i = 0; i < 4; i += 1) S(g, "sphere", [0xf08a1c, 0xe0561c][i % 2], [0.5, 0.5, 0.5], [(i - 1.5) * 0.45, h * 0.78, 0], [0, 0, 0], { outline: 0.04 });
  for (const s of [-1, 1]) S(g, "cyl", 0x5a3a28, [h * 0.8, 0.18, h * 0.8], [s * w * 0.28, h * 0.4, d * 0.5], [Math.PI / 2, 0, 0], { outline: 0.05 });
}

// ---------- Définition des cartes : types d'obstacles et décor ----------
const CAR_COLORS = [0xc03a3a, 0x7a4ac9, 0xd0902a, 0x3a8ac9, 0xc94a8a, 0x5ab04a, 0xe86a2a, 0x3ab0a0];

const MAPS = {
  1: {
    seed: 11,
    name: "Village hanté",
    light: 0xffe2c0,
    ground: ["#7d9a3c", "#88a845"],
    leaf: ["#e98a22", "#d6561e", "#f5b22c"],
    path: { color: "#d9a066", edge: "#9a6a3a", width: 0.05, cobble: true, points: [[0.74, 0.37], [0.62, 0.33], [0.46, 0.3], [0.33, 0.31], [0.27, 0.45], [0.26, 0.64], [0.34, 0.8], [0.47, 0.93], [0.52, 1.02]] },
    types: ["manor", "house:0", "house:1", "house:2", "house:3", "house:4", "crypt", "crypt", "crypt", ...Array(8).fill("car")],
    tomb: { region: [0.62, 0.45, 0.98, 0.78], count: 22 },
    trees: { autumn: 0.8, dead: 0.2 },
  },
  2: {
    seed: 23,
    name: "Domaine de l'épouvantail",
    light: 0xffe0b0,
    ground: ["#b9843c", "#c4903f"],
    leaf: ["#e98a22", "#c4401a", "#f5b22c"],
    path: { color: "#e8be7a", edge: "#a8743a", width: 0.06, cobble: false, points: [[0.55, 1.02], [0.5, 0.88], [0.36, 0.78], [0.24, 0.62], [0.22, 0.42], [0.32, 0.24], [0.5, 0.17], [0.7, 0.22], [0.8, 0.4]] },
    types: ["patch", "patch", "totem", "barn", "caravan", "car:truck", "tractor", "car", "car", "car", "car"],
    corn: [[0.3, 0.12, 0.46, 0.2], [0.5, 0.1, 0.78, 0.22], [0.7, 0.3, 0.9, 0.78]],
    trees: { autumn: 0.55, dead: 0.45 },
  },
  3: {
    seed: 37,
    name: "Fête foraine du cauchemar",
    light: 0xe8d0ff,
    ground: ["#a0623e", "#ac6c44"],
    leaf: ["#e98a22", "#c4401a", "#9b2fc9"],
    path: { color: "#e0a870", edge: "#9a6038", width: 0.045, cobble: false, ring: [0.515, 0.5, 0.27, 0.4], points: [[0.5, 0.74], [0.5, 1.02]] },
    types: ["bigtop", "crates", "stall:0", "tent:0", "stall:1", "stall:2", "tent:1", "tent:2", "wagon", "tent:3", "tent:4"],
    trees: { autumn: 0.3, dead: 0.7 },
    flags: true,
  },
  4: {
    seed: 41,
    name: "Rues du bouffon",
    light: 0xfff0d0,
    ground: ["#8a7aa8", "#9686b4"],
    leaf: ["#e98a22", "#d6561e", "#f5b22c"],
    path: { color: "#b8a0d0", edge: "#6a5a8a", width: 0.04, cobble: true, tiles: true, points: [[0.2, 0.64], [0.3, 0.62], [0.4, 0.57], [0.48, 0.54], [0.54, 0.62], [0.62, 0.7], [0.71, 0.74], [0.82, 0.7]] },
    types: ["theatre", "house:5", "blocks", "blocks", "blocks", "blocks", "blocks", "blocks", "house:6", "house:7", "rocks", "house:8", "house:9", "house:5", "house:6", "cart"],
    trees: { autumn: 0.7, dead: 0.3 },
  },
};

// Vague 5 : la carte 3 d'origine, sans île ni passages élargis.
MAPS[5] = { ...MAPS[3], plain: true };

const HOUSE_STYLES = [
  { wall: 0xb6623f, roof: 0x7a3b6e },   // 0 brique + prune
  { wall: 0xc47a46, roof: 0x4a3a7a },   // 1 bois clair
  { wall: 0x9a4a5e, roof: 0x3a2a58 },   // 2 vieux rose
  { wall: 0xb8683c, roof: 0x6a2a3a },   // 3
  { wall: 0x8a5a3a, roof: 0x5a3a52 },   // 4
  { wall: 0xc0663c, roof: 0xa83a3a },   // 5 maison de jouets rouge
  { wall: 0x6a5ac0, roof: 0xa83a3a },   // 6 maison bleue
  { wall: 0xd88a4a, roof: 0x8a2a4a },   // 7
  { wall: 0x9a6a8a, roof: 0x4a8a8a },   // 8
  { wall: 0xc8584a, roof: 0x5a3a8a },   // 9
];
const STALL_STYLES = [
  { color: 0xc23a4a, awning: [0xc23a4a, 0xf1e8d4] },
  { color: 0xd88a2a, awning: [0xd88a2a, 0x5a2a8a] },
  { color: 0x9b2fc9, awning: [0x9b2fc9, 0xf0b323] },
];
const TENT_STYLES = [
  [0x9b2fc9, 0xf08a1c], [0xd0607a, 0xf1d8d0], [0x9b2fc9, 0xf0b323], [0xf08a1c, 0x9b2fc9], [0xc23a8a, 0xf1e8d4],
];

// ---------- Utilitaires de carte ----------
function bbox(poly) {
  const us = poly.map((p) => p[0]);
  const vs = poly.map((p) => p[1]);
  return { umin: Math.min(...us), umax: Math.max(...us), vmin: Math.min(...vs), vmax: Math.max(...vs) };
}

function catmull(points, steps = 14) {
  const out = [];
  const p = [points[0], ...points, points[points.length - 1]];
  for (let i = 1; i < p.length - 2; i += 1) {
    for (let s = 0; s < steps; s += 1) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p[i - 1][0], p[i][0], p[i + 1][0], p[i + 2][0]), f(p[i - 1][1], p[i][1], p[i + 1][1], p[i + 2][1])]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

function pathPoints(def) {
  if (def.ring) {
    const [cx, cy, rx, ry] = def.ring;
    const ring = [];
    for (let i = 0; i <= 60; i += 1) ring.push([cx + Math.cos((i / 60) * Math.PI * 2) * rx, cy + Math.sin((i / 60) * Math.PI * 2) * ry]);
    return [ring, catmull(def.points)];
  }
  return [catmull(def.points)];
}

// ---------- Île déserte d'Halloween (cartes 1 à 4) ----------
// Le sol déborde de la carte de 28 % : la mer entoure l'île pour qu'il n'y ait jamais de vide à l'écran.
export const EXT = 1.28;
const WIDEN = 0.8;                                // les obstacles rétrécissent pour élargir les passages
const ISLAND = { shoreX: 1.3, shoreY: 0.85, sand: 1.5, n: 9 };

// Rétrécit un obstacle autour de son centre, sans le laisser coller au bord de la carte (même règle dans script.js).
export function widenPoly(poly) {
  const us = poly.map((p) => p[0]);
  const vs = poly.map((p) => p[1]);
  const cu = (Math.min(...us) + Math.max(...us)) / 2;
  const cv = (Math.min(...vs) + Math.max(...vs)) / 2;
  const out = poly.map(([u, v]) => [cu + (u - cu) * WIDEN, cv + (v - cv) * WIDEN]);
  const shift = (values, low, high) => {
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    if (hi - lo > high - low) return 0;
    if (lo < low) return low - lo;
    if (hi > high) return high - hi;
    return 0;
  };
  const du = shift(out.map((p) => p[0]), 0.04, 0.96);
  const dv = shift(out.map((p) => p[1]), 0.06, 0.95);
  return out.map(([u, v]) => [Number((u + du).toFixed(4)), Number((v + dv).toFixed(4))]);
}

function islandWobble(theta, seed) {
  return 0.35 * Math.sin(theta * 3 + seed) + 0.25 * Math.sin(theta * 5 + seed * 2.1) + 0.15 * Math.sin(theta * 9 + seed * 0.7);
}

function islandAxes(theta, offset, seed) {
  const k = islandWobble(theta, seed);
  return { a: 0.5 - (ISLAND.shoreX + k + offset) / WORLD_W, b: 0.5 - (ISLAND.shoreY + k * 0.6 + offset * 0.65) / SCREEN_H };
}

// Point (u, v) du contour de l'île ; offset > 0 = vers l'intérieur, < 0 = vers la mer (unités du monde).
function islandPoint(theta, offset, seed) {
  const { a, b } = islandAxes(theta, offset, seed);
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const r = (Math.abs(c) ** ISLAND.n + Math.abs(s) ** ISLAND.n) ** (-1 / ISLAND.n);
  return [0.5 + a * r * c, 0.5 + b * r * s];
}

function islandContains(u, v, offset, seed) {
  const x = u - 0.5;
  const y = v - 0.5;
  let a = 0.5 - ISLAND.shoreX / WORLD_W;
  let b = 0.5 - ISLAND.shoreY / SCREEN_H;
  let theta = Math.atan2(y / b, x / a);
  for (let i = 0; i < 3; i += 1) {
    ({ a, b } = islandAxes(theta, offset, seed));
    theta = Math.atan2(y / b, x / a);
  }
  return Math.abs(x / a) ** ISLAND.n + Math.abs(y / b) ** ISLAND.n <= 1;
}

function traceIsland(ctx, W, H, offset, seed) {
  ctx.beginPath();
  for (let i = 0; i <= 220; i += 1) {
    const [u, v] = islandPoint((i / 220) * Math.PI * 2, offset, seed);
    if (i) ctx.lineTo(u * W, v * H);
    else ctx.moveTo(u * W, v * H);
  }
  ctx.closePath();
}

// Mer, eaux peu profondes, sable et écume autour de l'île (dessinés avant l'herbe).
function paintSea(ctx, W, H, map) {
  const r = mulberry32(map.seed + 91);
  const unit = W / WORLD_W;
  const deep = ctx.createRadialGradient(W / 2, H / 2, H * 0.4, W / 2, H / 2, W * 0.85);
  deep.addColorStop(0, "#2a7a96");
  deep.addColorStop(0.55, "#1b4a78");
  deep.addColorStop(1, "#14234a");
  ctx.fillStyle = deep;
  ctx.fillRect(-W, -H, W * 3, H * 3);
  ctx.lineCap = "round";
  for (let i = 0; i < 420; i += 1) {
    const x = (r() * 1.7 - 0.35) * W;
    const y = (r() * 1.7 - 0.35) * H;
    const len = unit * (0.5 + r() * 1.1);
    ctx.strokeStyle = `rgba(190,235,245,${0.1 + r() * 0.18})`;
    ctx.lineWidth = unit * (0.05 + r() * 0.05);
    ctx.beginPath();
    ctx.moveTo(x - len, y);
    ctx.quadraticCurveTo(x, y - unit * 0.18, x + len, y);
    ctx.stroke();
  }
  for (const [offset, color] of [[-3.2, "rgba(60,150,170,0.7)"], [-1.9, "#4cb0b8"], [-0.9, "#86d6cc"]]) {
    traceIsland(ctx, W, H, offset, map.seed);
    ctx.fillStyle = color;
    ctx.fill();
  }
  traceIsland(ctx, W, H, 0, map.seed);
  ctx.fillStyle = "#b8955e";
  ctx.fill();
  traceIsland(ctx, W, H, 0.4, map.seed);
  ctx.fillStyle = "#e8cc90";
  ctx.fill();
  for (let i = 0; i < 1400; i += 1) {
    const [u, v] = islandPoint(r() * Math.PI * 2, 0.2 + r() * ISLAND.sand, map.seed);
    ctx.fillStyle = r() < 0.5 ? "rgba(255,246,225,0.7)" : "rgba(150,110,60,0.5)";
    ctx.beginPath();
    ctx.ellipse(u * W, v * H, unit * (0.03 + r() * 0.05), unit * (0.02 + r() * 0.03), r() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.lineJoin = "round";
  traceIsland(ctx, W, H, -0.15, map.seed);
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = unit * 0.22;
  ctx.stroke();
  traceIsland(ctx, W, H, -0.85, map.seed);
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = unit * 0.12;
  ctx.setLineDash([unit * 1.4, unit * 0.9]);
  ctx.stroke();
  ctx.setLineDash([]);
}

// Masque de la mer (blanc = eau) : sert aux reflets animés dans le jeu.
function waterMask(map, width = 1024) {
  const W = width / EXT;
  const H = W * (SCREEN_H / WORLD_W);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = Math.round(H * EXT);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate((canvas.width - W) / 2, (canvas.height - H) / 2);
  traceIsland(ctx, W, H, -0.2, map.seed);
  ctx.fillStyle = "#000";
  ctx.fill();
  return canvas;
}

// ---------- Sol peint (texture) ----------
function drawGround(map, rng, W, H) {
  const island = !map.plain;
  const canvas = document.createElement("canvas");
  canvas.width = island ? Math.round(W * EXT) : W;
  canvas.height = island ? Math.round(H * EXT) : H;
  const ctx = canvas.getContext("2d");
  if (island) {
    ctx.translate((canvas.width - W) / 2, (canvas.height - H) / 2);
    paintSea(ctx, W, H, map);
    ctx.save();
    traceIsland(ctx, W, H, ISLAND.sand, map.seed);
    ctx.clip();
  }
  const tile = W / 36 * 1.5;
  for (let y = 0; y < H / tile + 1; y += 1) {
    for (let x = 0; x < W / tile + 1; x += 1) {
      ctx.fillStyle = map.ground[(x + y) % 2];
      ctx.fillRect(x * tile, y * tile, tile + 1, tile + 1);
    }
  }
  // taches de couleur : feuilles, herbe sombre
  for (let i = 0; i < 900; i += 1) {
    const x = rng() * W;
    const y = rng() * H;
    ctx.fillStyle = map.leaf[Math.floor(rng() * map.leaf.length)];
    ctx.globalAlpha = 0.5 + rng() * 0.4;
    ctx.beginPath();
    ctx.ellipse(x, y, 5 + rng() * 9, 3 + rng() * 5, rng() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  if (island) {
    ctx.restore();
    traceIsland(ctx, W, H, ISLAND.sand, map.seed);
    ctx.strokeStyle = "rgba(60,90,30,0.4)";
    ctx.lineWidth = W / WORLD_W * 0.45;
    ctx.stroke();
    // le chemin traverse la plage jusqu'à l'eau
    ctx.save();
    traceIsland(ctx, W, H, 0.2, map.seed);
    ctx.clip();
  }
  // chemin
  const def = map.path;
  const lines = pathPoints(def);
  const stroke = (pts, width, color) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    pts.forEach(([u, v], i) => (i ? ctx.lineTo(u * W, v * H) : ctx.moveTo(u * W, v * H)));
    ctx.stroke();
  };
  for (const pts of lines) {
    stroke(pts, def.width * W * 1.22, def.edge);
    stroke(pts, def.width * W, def.color);
  }
  if (def.cobble) {
    ctx.globalAlpha = 0.5;
    for (const pts of lines) {
      for (let i = 0; i < pts.length; i += 1) {
        for (let k = 0; k < 5; k += 1) {
          const [u, v] = pts[i];
          const x = u * W + (rng() - 0.5) * def.width * W * 0.8;
          const y = v * H + (rng() - 0.5) * def.width * W * 0.5;
          ctx.fillStyle = rng() < 0.5 ? def.edge : "#ffffff";
          ctx.beginPath();
          ctx.ellipse(x, y, 7 + rng() * 6, 4 + rng() * 3, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1;
  }
  if (def.tiles) {
    const colors = ["#e84a4a", "#f0b323", "#4ab04a", "#4a8ae8", "#a84ad0", "#f08a1c"];
    const pts = lines[0];
    let n = 0;
    for (let i = 0; i < pts.length - 1; i += 3) {
      const [u, v] = pts[i];
      const [u2, v2] = pts[Math.min(pts.length - 1, i + 1)];
      const ang = Math.atan2((v2 - v) * H, (u2 - u) * W);
      ctx.save();
      ctx.translate(u * W, v * H);
      ctx.rotate(ang);
      ctx.fillStyle = colors[n++ % colors.length];
      ctx.strokeStyle = "#1a0b2e";
      ctx.lineWidth = 3;
      const tw = W * 0.032;
      const th = W * 0.022;
      ctx.beginPath();
      ctx.roundRect(-tw / 2, -th / 2, tw, th, 6);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
  if (island) {
    ctx.restore();
    return canvas;
  }
  // cercles de lumière chaude + vignette : le bord de carte s'enfonce dans la nuit
  const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, W * 0.62);
  vignette.addColorStop(0, "rgba(30,10,60,0)");
  vignette.addColorStop(1, "rgba(30,10,60,0.55)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);
  return canvas;
}

// Masque d'exclusion (obstacles + chemin) pour placer le décor sans gêner.
function makeMask(map, obstacles) {
  const W = 360;
  const H = 197;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 7;
  for (const poly of obstacles) {
    ctx.beginPath();
    poly.forEach(([u, v], i) => (i ? ctx.lineTo(u * W, v * H) : ctx.moveTo(u * W, v * H)));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = map.path.width * W * 1.5;
  for (const pts of pathPoints(map.path)) {
    ctx.beginPath();
    pts.forEach(([u, v], i) => (i ? ctx.lineTo(u * W, v * H) : ctx.moveTo(u * W, v * H)));
    ctx.stroke();
  }
  const data = ctx.getImageData(0, 0, W, H).data;
  return {
    blocked(u, v, extra = 0) {
      const x = Math.floor(u * W);
      const y = Math.floor(v * H);
      for (let dy = -extra; dy <= extra; dy += 1) {
        for (let dx = -extra; dx <= extra; dx += 1) {
          const px = x + dx;
          const py = y + dy;
          if (px < 0 || py < 0 || px >= W || py >= H) continue;
          if (data[(py * W + px) * 4 + 3] > 0) return true;
        }
      }
      return false;
    },
    claim(u, v, r = 3) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(u * W, v * H, r, 0, Math.PI * 2);
      ctx.fill();
      const fresh = ctx.getImageData(0, 0, W, H).data;
      data.set(fresh);
    },
  };
}

// ---------- Construction d'une carte ----------
const BUILDERS = { manor, house, barn, crypt, car, tractor, caravan, patch, totem, bigtop: bigTop, stall, tent: smallTent, crates, wagon, theatre, blocks, rocks, cart: cartProp };

function buildMap(id, mode = "full") {
  const map = MAPS[id];
  const rng = mulberry32(map.seed);
  const plain = Boolean(map.plain);
  const rawObstacles = MAP_OBSTACLES[id === 5 ? 3 : id];
  const obstacles = plain ? rawObstacles : rawObstacles.map(widenPoly);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2a1448);

  // sol
  const GW = 4096;
  const GH = Math.round(GW / (1405 / 768));
  // en mode « live », le sol n'est pas nécessaire (l'image de fond le fournit) : on évite de le peindre
  const ground = mode === "live" || mode === "relief"
    ? new THREE.Object3D()
    : new THREE.Mesh(
      new THREE.PlaneGeometry(WORLD_W * (plain ? 1 : EXT), WORLD_D * (plain ? 1 : EXT)),
      new THREE.MeshToonMaterial({ map: (() => { const t = new THREE.CanvasTexture(drawGround(map, mulberry32(map.seed + 1), GW, GH)); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; })(), gradientMap: GRADIENT }),
    );
  if (mode !== "live" && mode !== "relief") {
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
  }
  scene.add(ground);

  const props = group(scene);
  const mask = makeMask(map, obstacles);

  // obstacles = vrais volumes, posés sur les polygones de collision
  obstacles.forEach((poly, index) => {
    const spec = map.types[index] ?? "crates";
    const [type, variantRaw] = spec.split(":");
    const variant = variantRaw === undefined ? undefined : Number.isNaN(Number(variantRaw)) ? variantRaw : Number(variantRaw);
    const b = bbox(poly);
    const w = (b.umax - b.umin) * WORLD_W;
    const Hs = (b.vmax - b.vmin) * SCREEN_H;
    const fd = { manor: 0.34, house: 0.4, barn: 0.42, crypt: 0.4, car: 0.58, tractor: 0.5, caravan: 0.44, patch: 0.78, totem: 0.2, bigtop: 0.62, stall: 0.46, tent: 0.46, crates: 0.5, wagon: 0.42, theatre: 0.38, blocks: 0.3, rocks: 0.5, cart: 0.46 }[type] ?? 0.45;
    const d = Math.max(0.9, (fd * Hs) / SIN);
    const h = Math.max(0.8, ((1 - fd) * Hs * 1.3) / COS);
    const cx = toX((b.umin + b.umax) / 2);
    const zf = toZ(b.vmax);
    const g = group(props, [cx, 0, zf - d / 2]);
    const options = { w, d, h, rng: mulberry32(map.seed * 100 + index) };
    if (type === "house") Object.assign(options, HOUSE_STYLES[variant ?? 0], { rows: h > 3.4 ? 2 : 1, cols: w > 3.4 ? 3 : 2 });
    if (type === "car") {
      options.color = CAR_COLORS[(index * 3 + map.seed) % CAR_COLORS.length];
      options.truck = variant === "truck";
    }
    if (type === "stall") Object.assign(options, STALL_STYLES[variant ?? 0]);
    if (type === "tent") options.colors = TENT_STYLES[variant ?? 0];
    if (type === "car" || type === "tractor") g.rotation.y = ((index % 3) - 1) * 0.16;
    (BUILDERS[type] ?? crates)(g, options);
  });

  // décor praticable : arbres de bordure, tombes, citrouilles, lampes, feuilles
  const free = (u, v, extra = 2) => !mask.blocked(u, v, extra);
  const place = (fn, u, v, extra = 2, claim = 2) => {
    if (u < 0.01 || u > 0.99 || v < 0.02 || v > 1.0) return false;
    if (!plain && !islandContains(u, v, ISLAND.sand + 0.3, map.seed)) return false;
    if (!free(u, v, extra)) return false;
    fn(toX(u), toZ(v));
    mask.claim(u, v, claim);
    return true;
  };

  const border = plain
    ? (u, v) => u < 0.055 || u > 0.945 || v < 0.075 || v > 0.955
    : (u, v) => !islandContains(u, v, 4.4, map.seed);
  let placed = 0;
  for (let attempt = 0; attempt < 900 && placed < (plain ? 44 : 30); attempt += 1) {
    const u = rng();
    const v = rng() * 1.04;
    if (!border(u, v)) continue;
    const dead = rng() < map.trees.dead;
    const ok = place((x, z) => {
      if (dead) deadTree(props, x, z, 0.8 + rng() * 0.5, rng);
      else autumnTree(props, x, z, 0.62 + rng() * 0.38, rng, map.leaf.map((c) => Number.parseInt(c.slice(1), 16)));
    }, u, v, 3, 5);
    if (ok) placed += 1;
  }

  // petits éléments dispersés
  const scatter = (count, fn, region = [0.04, 0.08, 0.96, 0.96], extra = 2) => {
    let ok = 0;
    for (let attempt = 0; attempt < count * 14 && ok < count; attempt += 1) {
      const u = region[0] + rng() * (region[2] - region[0]);
      const v = region[1] + rng() * (region[3] - region[1]);
      if (place(fn, u, v, extra, 2)) ok += 1;
    }
  };
  scatter(30, (x, z) => leafPile(props, x, z, rng));
  scatter(14, (x, z) => pumpkin(props, x, 0, z, 0.55 + rng() * 0.4, rng, rng() < 0.4));
  scatter(10, (x, z) => bush(props, x, z, 0.8 + rng() * 0.5, rng, id === 4 ? 0x5a9a6a : 0x4a8a3a));
  scatter(5, (x, z) => lamp(props, x, z), [0.1, 0.12, 0.9, 0.9], 3);
  scatter(5, (x, z) => barrel(props, x, z, rng));
  scatter(4, (x, z) => skull(props, x, z, rng));
  if (map.tomb) {
    const [u0, v0, u1, v1] = map.tomb.region;
    scatter(map.tomb.count, (x, z) => tomb(props, x, z, rng, 0.85 + rng() * 0.4), [u0, v0, u1, v1], 1);
  } else {
    scatter(6, (x, z) => tomb(props, x, z, rng, 0.8), [0.05, 0.1, 0.95, 0.95], 1);
  }
  if (map.corn) {
    for (const [u0, v0, u1, v1] of map.corn) {
      const rows = Math.round((v1 - v0) * 28);
      for (let r = 0; r < rows; r += 1) {
        const v = v0 + ((r + 0.5) / rows) * (v1 - v0);
        const u = (u0 + u1) / 2;
        if (!free(u, v, 1) && !free(u0 + 0.01, v, 1)) continue;
        cornRow(props, toX(u), toZ(v), Math.round((u1 - u0) * 36 / 0.55 * 0.9), rng);
      }
    }
  }
  if (map.flags) {
    for (let i = 0; i < 6; i += 1) {
      const u = 0.1 + i * 0.16;
      const pole = group(props, [toX(u), 0, toZ(0.07)]);
      S(pole, "cyl", 0x5a3a28, [0.2, 3.6, 0.2], [0, 1.8, 0], [0, 0, 0], { outline: 0.04 });
      for (let k = 0; k < 4; k += 1) {
        const pennant = S(pole, "cone", [0x9b2fc9, 0xf08a1c, 0xf0b323, 0xd0243a][k], [0.34, 0.5, 0.06], [0.5 + k * 0.5, 3.4 - Math.sin(k * 0.8) * 0.15, 0], [0, 0, Math.PI], { noOutline: true });
        pennant.userData.live = "flag";
        pennant.userData.k = k + i * 0.7;
      }
    }
  }

  // petits détails façon Animal Crossing : fleurs et champignons dans l'herbe
  scatter(34, (x, z) => flower(props, x, z, rng), [0.04, 0.08, 0.96, 0.96], 1);
  scatter(9, (x, z) => mushroom(props, x, z, rng, 0.8 + rng() * 0.5), [0.05, 0.1, 0.95, 0.95], 1);

  // île déserte d'Halloween : palmiers, torches-citrouilles, bois flotté, rochers et crânes sur la plage
  if (!plain) {
    const beach = (count, fn, from, to, claim = 2) => {
      let ok = 0;
      for (let attempt = 0; attempt < count * 30 && ok < count; attempt += 1) {
        const [u, v] = islandPoint(rng() * Math.PI * 2, from + rng() * (to - from), map.seed);
        if (u < 0.01 || u > 0.99 || v < 0.02 || v > 1.0 || !free(u, v, 2)) continue;
        fn(toX(u), toZ(v));
        mask.claim(u, v, claim);
        ok += 1;
      }
    };
    beach(15, (x, z) => palm(props, x, z, 0.8 + rng() * 0.45, rng), 0.5, 1.3, 4);
    beach(9, (x, z) => torch(props, x, z, rng), 0.4, 1.2, 3);
    beach(8, (x, z) => driftwood(props, x, z, rng), 0.2, 1.3, 2);
    beach(9, (x, z) => beachRock(props, x, z, 0.8 + rng() * 0.7, rng), -0.3, 0.9, 3);
    beach(6, (x, z) => skull(props, x, z, rng), 0.3, 1.3, 2);
  }

  // éclairage : lune violette, lumière chaude directionnelle, contre-jour bleuté
  scene.add(new THREE.HemisphereLight(0xcdb8ff, 0x7a5aa8, 1.9));
  const sun = new THREE.DirectionalLight(map.light, 2.1);
  sun.position.set(-14, 20, 9);
  sun.castShadow = mode !== "live" && mode !== "relief";
  sun.shadow.mapSize.set(4096, 4096);
  const sc = sun.shadow.camera;
  sc.left = -26; sc.right = 26; sc.top = 20; sc.bottom = -20; sc.near = 1; sc.far = 80;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.04;
  scene.add(sun);
  const back = new THREE.DirectionalLight(0x9ab8ff, 1.2);
  back.position.set(10, 8, -12);
  scene.add(back);

  scene.traverse((node) => {
    if (!node.isMesh || node === ground) return;
    const basic = node.material?.isMeshBasicMaterial;
    node.castShadow = !basic;
    node.receiveShadow = !basic;
  });
  return finishScene(scene, mode, id, { ground, props });
}

// Mode « base » : les éléments animés restent invisibles mais projettent leur ombre (le jeu les redessine en direct).
function prepareBase(scene) {
  const ghost = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false });
  scene.traverse((node) => {
    const kind = node.userData.live;
    if (kind !== "tree" && kind !== "flame" && kind !== "flag") return;
    node.traverse((mesh) => {
      if (!mesh.isMesh) return;
      mesh.material = ghost;
      mesh.castShadow = kind === "tree";
      mesh.receiveShadow = false;
    });
  });
}

// Mode « live » : on ne garde que les éléments animés, avec leur position monde, dans une scène transparente.
function extractLive(scene, id) {
  scene.updateMatrixWorld(true);
  const tagged = [];
  const lights = [];
  scene.traverse((node) => {
    if (node.userData.live) tagged.push(node);
    if (node.isLight) lights.push(node);
  });
  const live = new THREE.Scene();
  const items = { trees: [], halos: [], smokes: [], flames: [], flags: [] };
  for (const light of lights) live.add(light);
  for (const node of tagged) {
    live.attach(node);
    const list = { tree: items.trees, halo: items.halos, smoke: items.smokes, flame: items.flames, flag: items.flags }[node.userData.live];
    list?.push(node);
    node.traverse((mesh) => {
      if (mesh.isMesh) {
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
  }
  return { scene: live, items, map: MAPS[id] ?? null };
}

// Mode « ground » : seul le sol est dessiné, avec les ombres portées de tout le décor (qui, lui, est rendu en vrai relief dans le jeu).
function prepareGround(scene, ground) {
  const ghost = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false });
  scene.traverse((node) => {
    if (!node.isMesh || node === ground) return;
    node.material = ghost;
    node.receiveShadow = false;
  });
}

// ---------- Mode « relief » : décor en vrai 3D, fusionné par morceaux pour rester léger ----------
const RELIEF_COLS = 6;
const RELIEF_ROWS = 4;
const tmpColor = new THREE.Color();

function meshColor(mesh, geometry) {
  return geometry.getAttribute("color") ? null : (mesh.material.color ?? tmpColor.set(0xffffff));
}

// Fusionne tous les maillages sous `roots` (coordonnées exprimées par rapport à `space`) en quelques gros maillages à couleurs de sommets.
function mergeMeshes(roots, space, extra = null) {
  const inverse = space ? space.clone().invert() : null;
  const buckets = new Map();
  const leftovers = [];
  const relative = new THREE.Matrix4();
  const normalMatrix = new THREE.Matrix3();
  const v = new THREE.Vector3();
  const visit = (node) => {
    if (node.isMesh && !node.isInstancedMesh && node.visible) {
      const material = node.material;
      const geometry = lowDetail(node.geometry);
      let kind;
      if (material.isMeshBasicMaterial) {
        kind = material.side === THREE.BackSide ? "hull" : material.transparent ? `glow:${material.opacity}` : "glow";
      } else if (material.transparent || material.opacity < 1) {
        kind = null;
      } else {
        kind = material.side === THREE.DoubleSide ? "toon2" : "toon";
      }
      node.updateWorldMatrix(true, false);
      relative.copy(node.matrixWorld);
      if (inverse) relative.premultiply(inverse);
      if (kind === null) {
        const copy = new THREE.Mesh(geometry, material);
        copy.applyMatrix4(relative);
        leftovers.push(copy);
      } else {
        let bucket = buckets.get(kind);
        if (!bucket) {
          bucket = { positions: [], normals: [], colors: [], indices: [], phases: [], count: 0, opacity: material.opacity };
          buckets.set(kind, bucket);
        }
        const position = geometry.getAttribute("position");
        const normal = geometry.getAttribute("normal");
        const colorAttr = geometry.getAttribute("color");
        const flat = meshColor(node, geometry);
        const base = flat ? tmpColor.copy(flat) : null;
        normalMatrix.getNormalMatrix(relative);
        for (let i = 0; i < position.count; i += 1) {
          v.fromBufferAttribute(position, i).applyMatrix4(relative);
          bucket.positions.push(v.x, v.y, v.z);
          if (normal) v.fromBufferAttribute(normal, i).applyMatrix3(normalMatrix).normalize();
          else v.set(0, 1, 0);
          bucket.normals.push(v.x, v.y, v.z);
          if (colorAttr) bucket.colors.push(colorAttr.getX(i), colorAttr.getY(i), colorAttr.getZ(i));
          else bucket.colors.push(base.r, base.g, base.b);
          if (extra) bucket.phases.push(extra.phase);
        }
        const index = geometry.getIndex();
        if (index) for (let i = 0; i < index.count; i += 1) bucket.indices.push(index.getX(i) + bucket.count);
        else for (let i = 0; i < position.count; i += 1) bucket.indices.push(i + bucket.count);
        bucket.count += position.count;
      }
    }
    for (const child of node.children) {
      if (child.userData.live) continue;
      visit(child);
    }
  };
  for (const root of roots) visit(root);

  const meshes = [];
  const box = new THREE.Box3();
  for (const [kind, bucket] of buckets) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(bucket.positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(bucket.normals, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(bucket.colors, 3));
    if (extra) geometry.setAttribute("aPhase", new THREE.Float32BufferAttribute(bucket.phases, 1));
    geometry.setIndex(new THREE.Uint32BufferAttribute(bucket.indices, 1));
    geometry.computeBoundingBox();
    box.union(geometry.boundingBox);
    const mesh = new THREE.Mesh(geometry, null);
    mesh.userData.reliefKind = kind.startsWith("glow:") ? "glow" : kind;
    mesh.userData.opacity = bucket.opacity;
    mesh.userData.swayShader = Boolean(extra) && !extra.corn;
    mesh.userData.corn = Boolean(extra?.corn);
    mesh.frustumCulled = false;
    meshes.push(mesh);
  }
  for (const copy of leftovers) {
    copy.userData.reliefKind = "loose";
    copy.frustumCulled = false;
    meshes.push(copy);
  }
  return { meshes, box };
}

function extractRelief(scene, id, { props }) {
  scene.updateMatrixWorld(true);
  const world = new THREE.Group();
  const live = new THREE.Scene();
  const items = { trees: [], halos: [], smokes: [], flames: [], flags: [], chunks: [] };
  const lights = [];
  const tagged = [];
  scene.traverse((node) => {
    if (node.userData.live) tagged.push(node);
    if (node.isLight) lights.push(node);
  });
  for (const light of lights) live.add(light);
  live.add(world);

  // arbres : le tronc et le feuillage deviennent deux maillages ; le feuillage se balance dans le vertex shader
  for (const node of tagged) {
    if (node.userData.live !== "tree") continue;
    const space = node.matrixWorld.clone();
    const trunkParts = [];
    const canopyParts = [];
    node.traverse((mesh) => {
      if (!mesh.isMesh) return;
      let cursor = mesh;
      let canopy = false;
      while (cursor && cursor !== node.parent) {
        if (cursor.userData.sway) canopy = true;
        cursor = cursor.parent;
      }
      (canopy ? canopyParts : trunkParts).push(mesh);
    });
    const holder = new THREE.Group();
    space.decompose(holder.position, holder.quaternion, holder.scale);
    // on ne fusionne que les maillages eux-mêmes : on passe chacun comme racine isolée
    const collect = (parts, extra) => {
      const wrappers = parts.map((mesh) => {
        const single = new THREE.Mesh(mesh.geometry, mesh.material);
        single.applyMatrix4(mesh.matrixWorld);
        return single;
      });
      return mergeMeshes(wrappers, space, extra);
    };
    const trunk = collect(trunkParts, null);
    for (const mesh of trunk.meshes) holder.add(mesh);
    if (canopyParts.length) {
      const canopy = collect(canopyParts, { phase: node.userData.phase });
      for (const mesh of canopy.meshes) holder.add(mesh);
    }
    holder.userData = { ...node.userData };
    holder.userData.box = new THREE.Box3(
      new THREE.Vector3(holder.position.x - 3.4, 0, holder.position.z - 3.4),
      new THREE.Vector3(holder.position.x + 3.4, 8, holder.position.z + 3.4),
    );
    holder.updateMatrixWorld(true);
    node.removeFromParent();
    world.add(holder);
    items.trees.push(holder);
  }

  // lueurs, fumées, flammes, fanions : animés un par un
  for (const node of tagged) {
    const kind = node.userData.live;
    if (kind === "tree") continue;
    world.attach(node);
    ({ halo: items.halos, smoke: items.smokes, flame: items.flames, flag: items.flags })[kind]?.push(node);
    node.traverse((mesh) => {
      if (mesh.isMesh) {
        mesh.geometry = lowDetail(mesh.geometry);
        mesh.frustumCulled = false;
      }
    });
  }

  // le reste du décor, fusionné par zones de la carte (une zone n'est dessinée que si elle est à l'écran)
  const zones = new Map();
  const cornZones = new Map();
  for (const item of [...props.children]) {
    const p = new THREE.Vector3().setFromMatrixPosition(item.matrixWorld);
    const col = Math.max(0, Math.min(RELIEF_COLS - 1, Math.floor(((p.x + WORLD_W / 2) / WORLD_W) * RELIEF_COLS)));
    const row = Math.max(0, Math.min(RELIEF_ROWS - 1, Math.floor(((p.z + WORLD_D / 2) / WORLD_D) * RELIEF_ROWS)));
    const key = row * RELIEF_COLS + col;
    const target = item.userData.corn ? cornZones : zones;
    if (!target.has(key)) target.set(key, []);
    target.get(key).push(item);
  }
  // le maïs est fusionné à part : ses tiges plient et frémissent quand le joueur passe (shader dédié)
  for (const list of cornZones.values()) {
    const merged = mergeMeshes(list, null, { phase: 0, corn: true });
    const chunk = new THREE.Group();
    for (const mesh of merged.meshes) chunk.add(mesh);
    merged.box.max.y += 1;
    chunk.userData.box = merged.box;
    world.add(chunk);
    items.chunks.push(chunk);
  }
  for (const list of zones.values()) {
    const merged = mergeMeshes(list, null);
    const chunk = new THREE.Group();
    for (const mesh of merged.meshes) chunk.add(mesh);
    chunk.userData.box = merged.box;
    world.add(chunk);
    items.chunks.push(chunk);
  }
  props.removeFromParent();
  const map = MAPS[id] ?? null;
  return { scene: live, items, map, ext: map && !map.plain ? EXT : 1, water: map && !map.plain ? waterMask(map) : null };
}

function finishScene(scene, mode, id, parts = {}) {
  if (mode === "live") return extractLive(scene, id);
  if (mode === "relief") return extractRelief(scene, id, parts);
  if (mode === "base") prepareBase(scene);
  if (mode === "ground") prepareGround(scene, parts.ground);
  return scene;
}

// ---------- Salle du trône ----------
function buildThrone(mode = "full") {
  const rng = mulberry32(77);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a0b2e);
  const W = 4096;
  const H = Math.round(W / (1405 / 768));
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  const tile = W / 36 * 1.5;
  for (let y = 0; y < H / tile + 1; y += 1) {
    for (let x = 0; x < W / tile + 1; x += 1) {
      ctx.fillStyle = (x + y) % 2 ? "#4a3070" : "#3a2460";
      ctx.fillRect(x * tile, y * tile, tile + 1, tile + 1);
    }
  }
  // tapis rouge
  ctx.fillStyle = "#6a1428";
  ctx.fillRect(W * 0.38, 0, W * 0.24, H);
  ctx.fillStyle = "#b0243a";
  ctx.fillRect(W * 0.395, 0, W * 0.21, H);
  ctx.fillStyle = "#f0b323";
  for (const x of [0.395, 0.605]) ctx.fillRect(W * x - 5, 0, 10, H);
  for (let i = 0; i < 14; i += 1) {
    ctx.fillStyle = "#f0b323";
    ctx.beginPath();
    ctx.arc(W * 0.5, H * (0.1 + i * 0.07), 14, 0, Math.PI * 2);
    ctx.fill();
  }
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, W * 0.62);
  vg.addColorStop(0, "rgba(10,0,30,0)");
  vg.addColorStop(1, "rgba(10,0,30,0.6)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_W, WORLD_D), new THREE.MeshToonMaterial({ map: tex, gradientMap: GRADIENT }));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  const props = group(scene);
  // mur du fond + vitraux
  const backZ = toZ(0.02);
  S(props, "box", 0x3a2460, [WORLD_W, 8, 1], [0, 4, backZ - 0.2], [0, 0, 0], { outline: 0.08 });
  for (let i = 0; i < 5; i += 1) {
    const x = (i - 2) * 6.4;
    S(props, "box", 0x2a1848, [3, 5, 0.3], [x, 4.2, backZ + 0.35], [0, 0, 0], { outline: 0.05 });
    S(props, "dome", 0x2a1848, [3, 1.4, 0.3], [x, 6.7, backZ + 0.35], [0, 0, 0], { outline: 0.05 });
    G(props, "box", [0x7a4aff, 0xe84a8a, 0xf0b323, 0x4ac8e8, 0xa84ad0][i], [2.4, 4.4, 0.06], [x, 4.2, backZ + 0.55], [0, 0, 0], 0.9);
  }
  // trône
  const throne = group(props, [0, 0, toZ(0.2)]);
  throne.scale.setScalar(0.8);
  throne.position.z = toZ(0.3);
  for (let i = 0; i < 3; i += 1) S(throne, "box", 0x6a3a5a, [6 - i * 1.2, 0.45, 3 - i * 0.6], [0, 0.22 + i * 0.45, 0], [0, 0, 0], { outline: 0.06 });
  S(throne, "box", 0xb0243a, [2.2, 2.0, 1.6], [0, 2.4, 0], [0, 0, 0], { outline: 0.07 });
  S(throne, "box", 0xb0243a, [2.8, 4.6, 0.6], [0, 4.4, -0.8], [0, 0, 0], { outline: 0.07 });
  S(throne, "dome", 0xb0243a, [2.8, 1.4, 0.6], [0, 6.7, -0.8], [0, 0, 0], { outline: 0.07 });
  for (const s of [-1, 1]) {
    S(throne, "box", 0xf0b323, [0.4, 1.4, 1.6], [s * 1.3, 2.6, 0], [0, 0, 0], { outline: 0.05 });
    S(throne, "cone", 0xf0b323, [0.4, 1.0, 0.4], [s * 1.2, 7.2, -0.8], [0, 0, 0], { outline: 0.05 });
  }
  S(throne, "sphere", 0xefe8d4, [0.8, 0.7, 0.7], [0, 6.2, -0.45], [0, 0, 0], { outline: 0.05 });
  // piliers + braseros le long des murs
  for (const s of [-1, 1]) {
    for (let i = 0; i < 4; i += 1) {
      const v = 0.18 + i * 0.22;
      const px = s * (WORLD_W * 0.43);
      const p = group(props, [px, 0, toZ(v)]);
      S(p, "cyl", 0x6a5a8c, [1.5, 5.2, 1.5], [0, 2.6, 0], [0, 0, 0], { outline: 0.08 });
      S(p, "cyl", 0x8a7aac, [2.0, 0.5, 2.0], [0, 0.25, 0], [0, 0, 0], { outline: 0.06 });
      S(p, "cyl", 0x8a7aac, [2.0, 0.5, 2.0], [0, 5.2, 0], [0, 0, 0], { outline: 0.06 });
      const br = group(props, [px + s * -2.2, 0, toZ(v) + 0.8]);
      S(br, "cyl", 0x2a2238, [0.9, 1.2, 0.9], [0, 0.6, 0], [0, 0, 0], { outline: 0.05 });
      const flame = S(br, "cone", 0xff7a1a, [0.7, 1.1, 0.7], [0, 1.6, 0], [0, 0, 0], { noOutline: true });
      const core = G(br, "cone", 0xffd23a, [0.4, 0.8, 0.4], [0, 1.6, 0], [0, 0, 0], 0.9);
      for (const part of [flame, core]) {
        part.userData.live = "flame";
        part.userData.k = v * 9 + s;
      }
      halo(br, [0, 1.8, 0.2], 0xff9a3a, 6);
    }
  }
  scene.add(new THREE.HemisphereLight(0xd8c0ff, 0x6a3a8a, 2.6));
  const sun = new THREE.DirectionalLight(0xffd0a0, 2.4);
  sun.position.set(-8, 18, 12);
  sun.castShadow = mode !== "live";
  sun.shadow.mapSize.set(4096, 4096);
  const sc = sun.shadow.camera;
  sc.left = -26; sc.right = 26; sc.top = 20; sc.bottom = -20; sc.near = 1; sc.far = 80;
  sun.shadow.bias = -0.0006;
  scene.add(sun);
  scene.traverse((node) => {
    if (!node.isMesh || node === ground) return;
    const basic = node.material?.isMeshBasicMaterial;
    node.castShadow = !basic;
    node.receiveShadow = !basic;
  });
  ground.receiveShadow = true;
  void rng;
  return finishScene(scene, mode, "throne");
}

// ---------- Rendu ----------
export function mapIds() {
  return [1, 2, 3, 4, "throne"];
}

// Caméra orthographique inclinée : identique pour l'image de fond et pour la couche animée du jeu.
export function makeMapCamera(zoomOut = 1) {
  const camera = new THREE.OrthographicCamera((-WORLD_W / 2) * zoomOut, (WORLD_W / 2) * zoomOut, (SCREEN_H / 2) * zoomOut, (-SCREEN_H / 2) * zoomOut, 0.1, 200);
  camera.position.set(0, 80 * SIN, 80 * COS);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld(true);
  return camera;
}

// mode : "full" (image complète), "base" (sans arbres ni flammes, pour la couche animée du jeu)
export function renderMap(id, { width = 2810, height = 1536, canvas, mode = "full" } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = id === "throne" ? buildThrone(mode) : buildMap(Number(id), mode);
  // le sol de l'île déborde de la carte : son image couvre aussi la mer autour
  const wide = mode === "ground" && id !== "throne" && !MAPS[Number(id)].plain;
  if (wide) renderer.setSize(Math.round(width * EXT), Math.round(height * EXT), false);
  renderer.render(scene, makeMapCamera(wide ? EXT : 1));
  return renderer.domElement;
}

// Scène animée en direct : arbres, lueurs, fumées, flammes, fanions, avec la même lumière que l'image de fond.
export function buildLiveScene(id) {
  return id === "throne" ? buildThrone("live") : buildMap(Number(id), "live");
}

// Décor en vrai relief (cartes 1 à 4) : maillages fusionnés par zone, arbres à feuillage animé par shader.
export function buildReliefScene(id) {
  return buildMap(Number(id), "relief");
}

// Troncs d'arbres de chaque carte, en polygones normalisés (u, v) comme les obstacles du jeu : on passe entre les arbres, pas dessus.
export function treeColliders(id) {
  const { items } = buildLiveScene(id);
  return items.trees.map((tree) => {
    const r = tree.userData.trunk;
    const cu = tree.position.x / WORLD_W + 0.5;
    const cv = (tree.position.z * SIN) / SCREEN_H + 0.5;
    const ru = r / WORLD_W;
    const rv = (r * SIN) / SCREEN_H;
    const points = [];
    for (let i = 0; i < 8; i += 1) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      points.push([Number((cu + Math.cos(a) * ru).toFixed(4)), Number((cv + Math.sin(a) * rv).toFixed(4))]);
    }
    return points;
  });
}

export { SCREEN_H };
export { MAPS };

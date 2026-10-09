// Sbires et boss en 3D : un modèle procédural par sprite, animé selon la démarche (data-gait) et les états CSS.
import { THREE, solid, emit, group, limb } from "./core.js?v=53";

const DARK = 0x1b1426;
const BONE = 0xefe8d4;

function base(frame) {
  const root = group(null);
  const body = group(root);
  root.rotation.y = 0.3;
  return {
    root, body, legs: [], armL: null, armR: null, head: null, ticks: [],
    frame, cfg: { gait: "walk", aimArms: false, armRest: 0.15 },
    s: { move: 0, phase: 0, wind: 0, atk: 0, kick: 0, prevX: null, prevY: null, shooting: false, attacking: false, enter: 0 },
  };
}

function addLeg(m, x, y, len, thick, color, boot, bootColor) {
  const g = group(m.body, [x, y, 0]);
  solid(g, "limb", color, [thick * 1.15, len, thick * 1.15], [0, -len / 2, 0]);
  if (boot) solid(g, "box", bootColor ?? color, [thick * 1.45, boot * 1.4, thick * 2.1], [0, -len, thick * 0.45]);
  m.legs.push(g);
  return g;
}

function addArm(m, side, x, y, len, thick, color, handColor, handSize = 0.2) {
  const g = group(m.body, [x, y, 0]);
  solid(g, "limb", color, [thick * 1.15, len, thick * 1.15], [0, -len / 2, 0]);
  solid(g, "sphere", handColor ?? color, handSize * 1.5, [0, -len - 0.04, 0.03]);
  solid(g, "sphere", handColor ?? color, [handSize * 0.7, handSize * 1.0, handSize * 0.7], [-side * handSize * 0.85, -len + 0.02, handSize * 0.5], [0.3, 0, -side * 0.5]);
  g.rotation.z = side * 0.12;
  if (side < 0) m.armL = g;
  else m.armR = g;
  return g;
}

function glowEyes(parent, color, y, z, spread = 0.16, size = [0.14, 0.1, 0.05], angle = 0.3) {
  for (const side of [-1, 1]) emit(parent, "sphere", color, size, [side * spread, y, z], [0, 0, side * angle]);
}

function pumpkinBody(m, o) {
  const s = o.size ?? 1;
  const body = m.body;
  solid(body, "sphere", o.color, [1.28 * s, 1.08 * s, 1.18 * s], [0, 0.72 * s, 0]);
  for (const x of [-0.4, 0.4]) solid(body, "sphere", o.color, [0.76 * s, 1.06 * s, 1.14 * s], [x * s, 0.72 * s, 0.02], [0, 0, 0], { noOutline: true });
  solid(body, "sphere", o.dark, [0.22 * s, 1.0 * s, 1.2 * s], [0, 0.72 * s, 0.0], [0, 0, 0], { noOutline: true });
  solid(body, "cyl", 0x4f7a2a, [0.16 * s, 0.24 * s, 0.16 * s], [0.02 * s, 1.34 * s, 0], [0.1, 0, 0.25]);
  solid(body, "cone", 0x3f6a22, [0.2 * s, 0.26 * s, 0.05], [0.2 * s, 1.34 * s, 0.02], [0, 0, -1.2], { noOutline: true });
  const face = group(body, [0, 0.78 * s, 0.58 * s]);
  for (const side of [-1, 1]) emit(face, "cone", o.eye ?? 0xffd23f, [0.24 * s, 0.26 * s, 0.05], [side * 0.26 * s, 0.1 * s, 0], [0, 0, side * (o.angry ? 0.5 : 0.0)]);
  emit(face, "cone", o.eye ?? 0xffd23f, [0.1 * s, 0.1 * s, 0.05], [0, -0.06 * s, 0], [0, 0, Math.PI]);
  emit(face, "box", o.eye ?? 0xffd23f, [0.62 * s, o.angry ? 0.16 * s : 0.12 * s, 0.05], [0, -0.28 * s, 0]);
  for (let i = 0; i < 4; i += 1) solid(face, "box", o.dark, [0.08 * s, 0.14 * s, 0.07], [(-0.2 + i * 0.13) * s, -0.28 * s + (i % 2 ? 0.05 : -0.05) * s, 0.01], [0, 0, 0], { noOutline: true });
  addLeg(m, -0.26 * s, 0.22 * s, 0.22 * s, 0.22 * s, 0x4a2f1a, 0.1 * s);
  addLeg(m, 0.26 * s, 0.22 * s, 0.22 * s, 0.22 * s, 0x4a2f1a, 0.1 * s);
  addArm(m, -1, -0.62 * s, 0.9 * s, 0.34 * s, 0.14 * s, o.dark, o.dark, 0.2 * s);
  addArm(m, 1, 0.62 * s, 0.9 * s, 0.34 * s, 0.14 * s, o.dark, o.dark, 0.2 * s);
}

// ---------- Sbires ----------
const BUILDERS = {
  citrouille(m) {
    m.frame = { height: 2.7, center: 1, pitch: 0.3 };
    m.cfg.gait = "waddle";
    pumpkinBody(m, { color: 0xea7a1c, dark: 0xc4560a, eye: 0xffd23f, size: 1 });
  },
  "citrouille-vive"(m) {
    m.frame = { height: 2.5, center: 1, pitch: 0.3 };
    m.cfg.gait = "skitter";
    pumpkinBody(m, { color: 0xf2a02a, dark: 0xd2780f, eye: 0xfff06a, size: 0.86, angry: true });
    m.body.rotation.x = 0.1;
  },
  "grosse-citrouille"(m) {
    m.frame = { height: 3.4, center: 1, pitch: 0.3 };
    m.cfg.gait = "stomp";
    pumpkinBody(m, { color: 0xc9570f, dark: 0x8f3a08, eye: 0xff8a2a, size: 1.28, angry: true });
    for (const side of [-1, 1]) {
      solid(m.body, "sphere", 0x8f3a08, [0.36, 0.36, 0.36], [side * 0.9, 0.9, 0.0]);
      solid(m.body, "cone", 0x4f7a2a, [0.14, 0.34, 0.14], [side * 0.5, 1.5, 0.1], [0, 0, side * 0.5]);
    }
  },

  "minion-squelette"(m) {
    m.frame = { height: 2.3, center: 1, pitch: 0.3 };
    m.cfg.gait = "walk";
    const b = m.body;
    for (const side of [-1, 1]) addLeg(m, side * 0.15, 0.7, 0.62, 0.1, BONE, 0.1, 0x6a5a3a);
    solid(b, "cyl", BONE, [0.46, 0.16, 0.26], [0, 0.74, 0]);
    solid(b, "cyl", BONE, [0.1, 0.5, 0.1], [0, 0.98, -0.04]);
    for (let i = 0; i < 4; i += 1) solid(b, "torus", BONE, [0.5 - i * 0.04, 0.5 - i * 0.04, 0.5 - i * 0.04], [0, 0.88 + i * 0.12, 0.0], [Math.PI / 2, 0, 0], { outline: 0.016 });
    solid(b, "box", 0x4a3a2a, [0.5, 0.5, 0.2], [0, 1.0, -0.06], [0, 0, 0]);
    solid(b, "box", 0x4a3a2a, [0.5, 0.34, 0.04], [0, 1.1, 0.05], [0, 0, 0], { noOutline: true });
    addArm(m, -1, -0.34, 1.26, 0.52, 0.09, BONE, BONE, 0.14);
    addArm(m, 1, 0.34, 1.26, 0.52, 0.09, BONE, BONE, 0.14);
    const head = group(b, [0, 1.62, 0]);
    solid(head, "sphere", BONE, [0.64, 0.58, 0.62], [0, 0, 0]);
    solid(head, "box", BONE, [0.34, 0.2, 0.26], [0, -0.28, 0.1]);
    for (const side of [-1, 1]) emit(head, "sphere", 0xff9a2a, [0.14, 0.17, 0.06], [side * 0.14, 0.02, 0.28]);
    solid(head, "box", DARK, [0.2, 0.03, 0.04], [0, -0.3, 0.24], [0, 0, 0], { noOutline: true });
    m.head = head;
    const sword = group(m.armR, [0, -0.54, 0.02], [0.2, 0, 0]);
    solid(sword, "box", 0x8a7a68, [0.06, 0.12, 0.7], [0, 0, 0.4]);
    solid(sword, "box", 0x5a3a22, [0.32, 0.06, 0.07], [0, 0, 0.08]);
    solid(sword, "cyl", 0x3a2a1c, [0.07, 0.26, 0.07], [0, 0, -0.06], [Math.PI / 2, 0, 0]);
    sword.rotation.x = 0.9;
    m.cfg.weapon = sword;
  },

  "minion-gargouille"(m) {
    m.frame = { height: 2.6, center: 1, pitch: 0.3 };
    m.cfg.gait = "stomp";
    const b = m.body;
    const stone = 0x8c93a3;
    const stone2 = 0x6c7384;
    for (const side of [-1, 1]) addLeg(m, side * 0.22, 0.6, 0.52, 0.26, stone2, 0.14, stone2);
    solid(b, "sphere", stone, [0.92, 0.96, 0.72], [0, 1.0, 0]);
    solid(b, "sphere", stone2, [0.5, 0.5, 0.1], [0, 0.96, 0.34], [0, 0, 0], { noOutline: true });
    addArm(m, -1, -0.5, 1.28, 0.5, 0.2, stone, stone2, 0.26);
    addArm(m, 1, 0.5, 1.28, 0.5, 0.2, stone, stone2, 0.26);
    for (const arm of [m.armL, m.armR]) for (const x of [-0.07, 0, 0.07]) solid(arm, "cone", 0x3a3f4c, [0.05, 0.14, 0.05], [x, -0.64, 0.08], [Math.PI * 0.9, 0, 0], { noOutline: true });
    const head = group(b, [0, 1.7, 0.04]);
    solid(head, "sphere", stone, [0.7, 0.62, 0.64], [0, 0, 0]);
    solid(head, "box", stone2, [0.4, 0.2, 0.28], [0, -0.2, 0.2]);
    for (const side of [-1, 1]) {
      solid(head, "cone", 0x3a3f4c, [0.14, 0.4, 0.14], [side * 0.26, 0.4, -0.04], [0, 0, -side * 0.35]);
      emit(head, "sphere", 0xff5a2a, [0.14, 0.1, 0.06], [side * 0.15, 0.06, 0.29], [0, 0, side * 0.3]);
      solid(head, "cone", BONE, [0.05, 0.1, 0.05], [side * 0.1, -0.3, 0.3], [Math.PI, 0, 0], { noOutline: true });
    }
    m.head = head;
    const wings = [];
    for (const side of [-1, 1]) {
      const wing = group(b, [side * 0.34, 1.34, -0.34], [0, side * 0.5, 0]);
      for (let i = 0; i < 3; i += 1) {
        solid(wing, "cone", stone2, [0.2, 0.9 - i * 0.14, 0.05], [side * (0.28 + i * 0.2), 0.12 - i * 0.12, 0], [0, 0, -side * (1.15 + i * 0.28)]);
      }
      wings.push({ wing, side });
    }
    m.ticks.push((t, s) => wings.forEach(({ wing, side }) => { wing.rotation.z = side * (0.15 + Math.sin(t * (6 + s.move * 4)) * 0.25); }));
    const tail = group(b, [0, 0.72, -0.34]);
    solid(tail, "cone", stone2, [0.12, 0.7, 0.12], [0, 0.0, -0.3], [-1.9, 0, 0]);
  },

  "minion-ombre"(m) {
    m.frame = { height: 2.2, center: 1, pitch: 0.3 };
    m.cfg.gait = "float";
    const b = m.body;
    const purple = 0x2d1b4e;
    solid(b, "taper", purple, [0.9, 1.0, 0.7], [0, 0.9, 0], [0, 0, 0], { opacity: 0.94 });
    for (let i = 0; i < 6; i += 1) {
      const a = (i / 6) * Math.PI * 2;
      const wisp = solid(b, "cone", purple, [0.24, 0.5, 0.2], [Math.cos(a) * 0.36, 0.34, Math.sin(a) * 0.28], [Math.PI, 0, 0]);
      m.ticks.push((t) => { wisp.scale.y = 0.5 + Math.sin(t * 5 + i * 1.3) * 0.12; });
    }
    solid(b, "sphere", purple, [0.7, 0.62, 0.64], [0, 1.55, 0]);
    const head = group(b, [0, 1.55, 0]);
    for (const side of [-1, 1]) {
      emit(head, "sphere", 0xb56bff, [0.16, 0.2, 0.06], [side * 0.15, 0.02, 0.3], [0, 0, side * 0.35]);
      solid(head, "cone", purple, [0.12, 0.34, 0.1], [side * 0.22, 0.34, 0], [0, 0, -side * 0.3]);
    }
    emit(head, "box", 0xb56bff, [0.2, 0.04, 0.05], [0, -0.14, 0.3]);
    m.head = head;
    addArm(m, -1, -0.44, 1.3, 0.5, 0.1, purple, purple, 0.18);
    addArm(m, 1, 0.44, 1.3, 0.5, 0.1, purple, purple, 0.18);
    for (const arm of [m.armL, m.armR]) for (const x of [-0.06, 0, 0.06]) solid(arm, "cone", 0x6a4aa8, [0.04, 0.16, 0.04], [x, -0.64, 0.02], [Math.PI, 0, 0], { noOutline: true });
  },

  "minion-bouffon"(m) {
    m.frame = { height: 2.5, center: 1, pitch: 0.3 };
    m.cfg.gait = "hop";
    const b = m.body;
    for (const side of [-1, 1]) addLeg(m, side * 0.16, 0.62, 0.48, 0.2, side > 0 ? 0xd62b4a : 0xf0b323, 0.18, 0x3a2a55);
    solid(b, "cyl", 0xd62b4a, [0.64, 0.58, 0.44], [0, 0.94, 0]);
    solid(b, "box", 0xf0b323, [0.32, 0.5, 0.05], [0, 0.94, 0.23], [0, 0, 0.78], { noOutline: true });
    solid(b, "torus", 0xffffff, [0.66, 0.66, 0.66], [0, 1.22, 0], [Math.PI / 2, 0, 0], { outline: 0.02 });
    addArm(m, -1, -0.4, 1.12, 0.44, 0.16, 0xf0b323, 0xffffff, 0.2);
    addArm(m, 1, 0.4, 1.12, 0.44, 0.16, 0xd62b4a, 0xffffff, 0.2);
    const head = group(b, [0, 1.62, 0]);
    solid(head, "sphere", 0xfff1e0, [0.78, 0.72, 0.74], [0, 0, 0]);
    for (const side of [-1, 1]) {
      solid(head, "sphere", DARK, [0.1, 0.14, 0.06], [side * 0.15, 0.04, 0.34], [0, 0, 0], { noOutline: true });
      solid(head, "sphere", 0xd62b4a, [0.12, 0.12, 0.04], [side * 0.26, -0.08, 0.3], [0, 0, 0], { noOutline: true });
    }
    solid(head, "sphere", 0xd62b4a, [0.15, 0.15, 0.15], [0, -0.04, 0.38]);
    solid(head, "arc", DARK, [0.3, 0.2, 0.1], [0, -0.16, 0.34], [0.1, 0, Math.PI], { noOutline: true });
    solid(head, "dome", 0xd62b4a, [0.82, 0.7, 0.8], [0, 0.08, 0], [-0.2, 0, 0]);
    for (const side of [-1, 1]) {
      solid(head, "cone", side > 0 ? 0xf0b323 : 0xd62b4a, [0.3, 0.7, 0.3], [side * 0.4, 0.5, 0], [0, 0, -side * 1.0]);
      solid(head, "sphere", 0xffe27a, 0.14, [side * 0.68, 0.7, 0]);
    }
    m.head = head;
    solid(m.armR, "cyl", 0x6a4a2c, [0.06, 0.4, 0.06], [0, -0.4, 0.08], [0.4, 0, 0]);
    solid(m.armR, "sphere", 0x3a2a1c, 0.16, [0, -0.52, 0.2]);
  },

  "minion-archer-ombre"(m) {
    m.frame = { height: 2.3, center: 1, pitch: 0.3 };
    m.cfg.gait = "walk";
    m.cfg.aimArms = true;
    const b = m.body;
    const cloth = 0x241a3d;
    for (const side of [-1, 1]) addLeg(m, side * 0.15, 0.66, 0.5, 0.2, 0x1b1426, 0.16, 0x14101f);
    solid(b, "taper", cloth, [0.78, 0.8, 0.52], [0, 0.86, 0]);
    solid(b, "cyl", 0x3a2a55, [0.6, 0.1, 0.42], [0, 0.9, 0]);
    solid(b, "box", 0x4a2f22, [0.24, 0.36, 0.12], [0.1, 1.12, -0.32], [0.1, 0, 0.15]);
    for (let i = 0; i < 3; i += 1) solid(b, "cyl", 0xcaa56a, [0.03, 0.2, 0.03], [0.05 + i * 0.06, 1.36, -0.32], [0, 0, 0], { noOutline: true });
    addArm(m, -1, -0.38, 1.18, 0.46, 0.14, cloth, 0x6a5a8a, 0.18);
    addArm(m, 1, 0.38, 1.18, 0.46, 0.14, cloth, 0x6a5a8a, 0.18);
    const head = group(b, [0, 1.66, 0]);
    solid(head, "sphere", 0x120c1e, [0.62, 0.58, 0.6], [0, 0, 0.02]);
    solid(head, "dome", cloth, [0.84, 0.82, 0.86], [0, 0.0, -0.02], [-0.5, 0, 0]);
    solid(head, "sphere", cloth, [0.8, 0.76, 0.6], [0, -0.04, -0.14]);
    solid(head, "cone", cloth, [0.4, 0.5, 0.36], [0, 0.04, -0.46], [-1.9, 0, 0]);
    glowEyes(head, 0xb56bff, 0.0, 0.3, 0.14, [0.14, 0.08, 0.05], 0.25);
    m.head = head;
    // arc tenu à la main gauche
    const bow = group(m.armL, [0, -0.56, 0.06]);
    for (const s of [-1, 1]) {
      solid(bow, "box", 0x4a2f22, [0.07, 0.4, 0.07], [0, s * 0.2, 0.06], [s * 0.2, 0, 0]);
      solid(bow, "box", 0x4a2f22, [0.06, 0.3, 0.06], [0, s * 0.5, -0.0], [-s * 0.4, 0, 0]);
    }
    limb(bow, "cyl", 0xd8c8a8, [0, 0.62, -0.1], [0, -0.62, -0.1], 0.014, { noOutline: true });
    bow.rotation.x = 1.2;
    bow.rotation.y = 0.0;
    m.cfg.weapon = bow;
  },

  "minion-soldat-ombre"(m) {
    m.frame = { height: 2.5, center: 1, pitch: 0.3 };
    m.cfg.gait = "stomp";
    const b = m.body;
    const steel = 0x3a3552;
    const trim = 0x6a4fd1;
    for (const side of [-1, 1]) addLeg(m, side * 0.2, 0.68, 0.52, 0.26, steel, 0.18, 0x241f38);
    solid(b, "cyl", steel, [0.84, 0.64, 0.56], [0, 1.0, 0]);
    emit(b, "box", trim, [0.06, 0.5, 0.04], [0, 1.0, 0.29]);
    solid(b, "cyl", 0x241f38, [0.86, 0.12, 0.58], [0, 0.72, 0]);
    for (const side of [-1, 1]) solid(b, "sphere", steel, [0.38, 0.28, 0.38], [side * 0.54, 1.34, 0]);
    addArm(m, -1, -0.54, 1.26, 0.5, 0.18, steel, 0x241f38, 0.24);
    addArm(m, 1, 0.54, 1.26, 0.5, 0.18, steel, 0x241f38, 0.24);
    const head = group(b, [0, 1.74, 0]);
    solid(head, "sphere", steel, [0.7, 0.66, 0.68], [0, 0, 0]);
    solid(head, "box", 0x120c1e, [0.5, 0.12, 0.05], [0, 0.04, 0.34], [0, 0, 0], { noOutline: true });
    emit(head, "box", 0xb56bff, [0.4, 0.05, 0.05], [0, 0.04, 0.37]);
    solid(head, "cone", trim, [0.2, 0.5, 0.3], [0, 0.46, -0.12], [-0.5, 0, 0]);
    m.head = head;
    // bouclier + lance
    const shield = group(m.armL, [0, -0.5, 0.2]);
    solid(shield, "cyl", steel, [0.6, 0.08, 0.6], [0, 0, 0.1], [Math.PI / 2, 0, 0]);
    emit(shield, "sphere", trim, [0.2, 0.2, 0.06], [0, 0, 0.16]);
    shield.rotation.y = 0.2;
    const spear = group(m.armR, [0, -0.5, 0.06]);
    limb(spear, "cyl", 0x4a3a5a, [0, 0, -0.5], [0, 0, 1.1], 0.06);
    solid(spear, "cone", 0xb8bfd0, [0.14, 0.4, 0.05], [0, 0, 1.3], [Math.PI / 2, 0, 0]);
    spear.rotation.x = 0.95;
    m.cfg.weapon = spear;
  },

  "minion-goule-ombre"(m) {
    m.frame = { height: 2.1, center: 1, pitch: 0.3 };
    m.cfg.gait = "skitter";
    const b = m.body;
    const skin = 0x7e8f86;
    for (const side of [-1, 1]) addLeg(m, side * 0.2, 0.56, 0.44, 0.2, 0x4a4f5c, 0.14, 0x3a3f4c);
    const torso = group(b, [0, 0, 0]);
    torso.rotation.x = 0.28;
    solid(torso, "sphere", skin, [0.8, 0.92, 0.64], [0, 0.98, 0]);
    solid(torso, "cyl", 0x3a3f4c, [0.8, 0.3, 0.6], [0, 0.72, 0.0], [0, 0, 0.1]);
    for (let i = 0; i < 4; i += 1) solid(torso, "cone", 0x5a6a60, [0.1, 0.22, 0.1], [-0.24 + i * 0.16, 1.4, -0.26], [-0.5, 0, 0]);
    addArm(m, -1, -0.46, 1.16, 0.82, 0.14, skin, skin, 0.2);
    addArm(m, 1, 0.46, 1.16, 0.82, 0.14, skin, skin, 0.2);
    for (const arm of [m.armL, m.armR]) for (const x of [-0.07, 0, 0.07]) solid(arm, "cone", 0xe8e0c8, [0.05, 0.2, 0.05], [x, -0.98, 0.04], [Math.PI, 0, 0], { noOutline: true });
    const head = group(b, [0, 1.64, 0.28]);
    solid(head, "sphere", skin, [0.7, 0.62, 0.64], [0, 0, 0]);
    solid(head, "box", 0x3a2a2a, [0.4, 0.14, 0.1], [0, -0.2, 0.28], [0, 0, 0], { noOutline: true });
    for (let i = 0; i < 4; i += 1) solid(head, "cone", BONE, [0.05, 0.1, 0.05], [-0.12 + i * 0.08, -0.14, 0.32], [0, 0, 0], { noOutline: true });
    glowEyes(head, 0xffe14a, 0.06, 0.3, 0.15, [0.16, 0.1, 0.05], 0.35);
    for (const side of [-1, 1]) solid(head, "cone", skin, [0.12, 0.3, 0.1], [side * 0.34, 0.1, -0.04], [0, 0, -side * 1.2]);
    m.head = head;
  },

  // ---------- Boss ----------
  "boss-fossoyeur"(m) {
    m.frame = { height: 2.8, center: 1, pitch: 0.3 };
    m.cfg.gait = "walk";
    const b = m.body;
    const coat = 0x4a2f22;
    const coat2 = 0x35211a;
    for (const side of [-1, 1]) addLeg(m, side * 0.2, 0.7, 0.54, 0.26, 0x241a14, 0.2, 0x3a2418);
    solid(b, "taper", coat, [1.0, 0.98, 0.7], [0, 0.98, 0]);
    solid(b, "cyl", 0x241a14, [0.62, 0.64, 0.5], [0, 1.1, 0.04]);
    solid(b, "cyl", 0x6a4a2c, [0.78, 0.1, 0.55], [0, 0.88, 0.04]);
    solid(b, "box", 0x8a6a3a, [0.14, 0.2, 0.1], [0.26, 0.84, 0.28], [0, 0, 0], { noOutline: false });
    for (const side of [-1, 1]) solid(b, "box", coat2, [0.22, 0.4, 0.08], [side * 0.4, 1.32, 0.18], [0, 0, side * 0.5]);
    solid(b, "box", 0x6a4a2c, [0.08, 0.9, 0.04], [0, 1.1, 0.3], [0, 0, 0.7], { noOutline: true });
    addArm(m, -1, -0.54, 1.32, 0.5, 0.22, coat, 0x2a1a14, 0.24);
    addArm(m, 1, 0.54, 1.32, 0.5, 0.22, coat, 0x2a1a14, 0.24);
    const head = group(b, [0, 1.8, 0.04]);
    solid(head, "sphere", 0x241a14, [0.78, 0.72, 0.72], [0, 0, 0]);
    glowEyes(head, 0x5ad7ff, 0.04, 0.34, 0.17, [0.2, 0.1, 0.05], 0.22);
    solid(head, "box", 0x120c0a, [0.4, 0.05, 0.05], [0, -0.18, 0.34], [0, 0, 0], { noOutline: true });
    solid(head, "cyl", 0x4a2f22, [1.4, 0.07, 1.4], [0, 0.26, 0], [-0.05, 0, 0]);
    solid(head, "cyl", 0x4a2f22, [0.78, 0.4, 0.78], [0, 0.48, 0], [-0.05, 0, 0]);
    solid(head, "cyl", 0x241a14, [0.8, 0.1, 0.8], [0, 0.34, 0], [-0.05, 0, 0]);
    emit(head, "sphere", 0xd4a93a, [0.1, 0.1, 0.04], [0.26, 0.5, 0.4]);
    m.head = head;
    // pelle (gauche) et lanterne (droite)
    const shovel = group(m.armL, [0, -0.56, 0.04], [0.5, 0, 0.0]);
    limb(shovel, "cyl", 0x6a4a2c, [0, 0, -0.7], [0, 0, 0.7], 0.08);
    solid(shovel, "box", 0x6a4a3a, [0.5, 0.06, 0.6], [0, 0, 0.98], [0, 0, 0]);
    const lantern = group(m.armR, [0, -0.58, 0.14]);
    emit(lantern, "box", 0x5ad7ff, [0.28, 0.34, 0.28], [0, -0.28, 0], [0, 0.3, 0], 0.92);
    solid(lantern, "cone", 0x3a2a1c, [0.4, 0.14, 0.4], [0, -0.06, 0], [0, 0.3, 0]);
    solid(lantern, "box", 0x3a2a1c, [0.34, 0.06, 0.34], [0, -0.46, 0], [0, 0.3, 0]);
    solid(lantern, "torus", 0x3a2a1c, [0.2, 0.2, 0.2], [0, 0.04, 0], [Math.PI / 2, 0, 0], { outline: 0.016 });
    m.cfg.rest = { arm: "L", armX: -0.9, weapon: shovel, weaponX: -1.46, base: 0.5 };
    m.ticks.push((t) => { lantern.rotation.z = Math.sin(t * 2.4) * 0.12; });
  },

  "boss-epouvantail"(m) {
    m.frame = { height: 3.5, center: 1, pitch: 0.3 };
    m.cfg.gait = "stomp";
    const b = m.body;
    const jacket = 0x9a4a22;
    const patch = 0x3a5f9a;
    for (const side of [-1, 1]) addLeg(m, side * 0.24, 0.76, 0.58, 0.3, 0x3a3f58, 0.2, 0x2a1f18);
    solid(b, "cyl", jacket, [0.98, 0.9, 0.64], [0, 1.2, 0]);
    solid(b, "box", patch, [0.26, 0.26, 0.05], [-0.22, 1.1, 0.33], [0, 0, 0.1], { noOutline: true });
    solid(b, "box", 0xe8c64a, [0.2, 0.2, 0.05], [0.24, 1.4, 0.33], [0, 0, -0.2], { noOutline: true });
    solid(b, "cyl", 0x4a2f1a, [1.02, 0.12, 0.68], [0, 0.82, 0]);
    for (let i = 0; i < 7; i += 1) solid(b, "cone", 0xe8c64a, [0.06, 0.34, 0.06], [-0.36 + i * 0.12, 0.74, 0.32], [Math.PI * 0.9, 0, 0.1 * (i - 3)], { noOutline: true });
    addArm(m, -1, -0.66, 1.54, 0.64, 0.24, jacket, 0xe8c64a, 0.26);
    addArm(m, 1, 0.66, 1.54, 0.64, 0.24, jacket, 0xe8c64a, 0.26);
    for (const arm of [m.armL, m.armR]) for (let i = 0; i < 5; i += 1) solid(arm, "cone", 0xe8c64a, [0.05, 0.2, 0.05], [-0.1 + i * 0.05, -0.88, 0.0], [Math.PI * 0.9, 0, 0.12 * (i - 2)], { noOutline: true });
    const head = group(b, [0, 2.0, 0.02]);
    solid(head, "sphere", 0xd9b45a, [0.94, 0.88, 0.88], [0, 0, 0]);
    solid(head, "cyl", 0x9a7a3a, [0.9, 0.05, 0.4], [0, 0.06, 0.38], [0, 0, 0], { noOutline: true });
    for (const side of [-1, 1]) emit(head, "cone", 0xff9a2a, [0.2, 0.2, 0.05], [side * 0.2, 0.06, 0.44], [0, 0, side * 0.5 + Math.PI]);
    solid(head, "box", DARK, [0.5, 0.1, 0.05], [0, -0.22, 0.44], [0, 0, 0], { noOutline: true });
    for (let i = 0; i < 4; i += 1) solid(head, "box", 0xe8c64a, [0.06, 0.14, 0.06], [-0.16 + i * 0.1, -0.22, 0.46], [0, 0, 0], { noOutline: true });
    solid(head, "cyl", 0x6a3a1a, [1.5, 0.07, 1.5], [0, 0.4, 0], [-0.06, 0, 0]);
    solid(head, "cone", 0x6a3a1a, [0.86, 0.9, 0.86], [0, 0.88, 0], [-0.06, 0, 0]);
    solid(head, "cyl", 0xc4560a, [0.8, 0.1, 0.8], [0, 0.5, 0], [-0.06, 0, 0]);
    for (let i = 0; i < 6; i += 1) solid(head, "cone", 0xe8c64a, [0.06, 0.3, 0.06], [-0.4 + i * 0.16, 0.2, -0.38], [-1.5, 0, 0], { noOutline: true });
    m.head = head;
    // fourche
    const fork = group(m.armR, [0, -0.88, 0.04], [0.9, 0, 0]);
    limb(fork, "cyl", 0x6a4a2c, [0, 0, -0.8], [0, 0, 1.0], 0.08);
    for (const x of [-0.16, 0, 0.16]) limb(fork, "cone", 0xb8bfd0, [x, 0, 1.0], [x, 0, 1.5], 0.07);
    solid(fork, "box", 0xb8bfd0, [0.4, 0.06, 0.07], [0, 0, 1.0]);
    m.cfg.weapon = fork;
    m.cfg.rest = { arm: "R", armX: -0.9, weapon: fork, weaponX: -1.46 };
  },

  "boss-cauchemars"(m) {
    m.frame = { height: 3.3, center: 1, pitch: 0.3 };
    m.cfg.gait = "float";
    const b = m.body;
    const purple = 0x2a1648;
    const veins = 0xd23aff;
    solid(b, "taper", purple, [1.3, 1.6, 0.9], [0, 1.1, 0]);
    solid(b, "sphere", purple, [1.1, 0.9, 0.8], [0, 1.8, 0]);
    for (let i = 0; i < 4; i += 1) emit(b, "box", veins, [0.05, 0.4, 0.04], [-0.3 + i * 0.2, 1.5 - (i % 2) * 0.2, 0.4], [0, 0, 0.3 * (i - 1.5)]);
    for (let i = 0; i < 9; i += 1) {
      const a = (i / 9) * Math.PI * 2;
      const wisp = solid(b, "cone", 0x4a2a7a, [0.3, 0.8, 0.24], [Math.cos(a) * 0.5, 0.3, Math.sin(a) * 0.36], [Math.PI, 0, 0], { opacity: 0.95 });
      m.ticks.push((t) => { wisp.scale.y = 0.8 + Math.sin(t * 4 + i) * 0.18; });
    }
    const makeArm = (side, y, spread, length, name) => {
      const g = group(b, [side * 0.62, y, 0]);
      solid(g, "cyl", purple, [0.2, length, 0.2], [0, -length / 2, 0]);
      solid(g, "sphere", 0x3a2060, [0.28, 0.28, 0.28], [0, -length, 0]);
      for (const x of [-0.1, 0, 0.1]) solid(g, "cone", 0x6a4aa8, [0.07, 0.34, 0.07], [x, -length - 0.2, 0.02], [Math.PI * 0.95, 0, x * 3], { noOutline: true });
      g.rotation.z = side * spread;
      g.name = name;
      return g;
    };
    m.armL = makeArm(-1, 2.08, 0.55, 0.9, "upper");
    m.armR = makeArm(1, 2.08, 0.55, 0.9, "upper");
    const lowL = makeArm(-1, 1.5, 0.9, 0.8, "lower");
    const lowR = makeArm(1, 1.5, 0.9, 0.8, "lower");
    m.ticks.push((t) => { lowL.rotation.z = -0.9 + Math.sin(t * 2.2) * 0.12; lowR.rotation.z = 0.9 - Math.sin(t * 2.2 + 1) * 0.12; });
    const head = group(b, [0, 2.2, 0.04]);
    solid(head, "sphere", 0x1b0f30, [0.78, 0.72, 0.7], [0, 0, 0]);
    for (const side of [-1, 1]) {
      emit(head, "sphere", 0xe06bff, [0.2, 0.12, 0.06], [side * 0.17, 0.06, 0.33], [0, 0, side * 0.45]);
    }
    emit(head, "box", 0xe06bff, [0.24, 0.05, 0.04], [0, -0.18, 0.34]);
    const horns = [[-0.34, 0.38, 0.5], [0.34, 0.38, -0.5], [-0.14, 0.46, 0.2], [0.14, 0.46, -0.2], [0, 0.5, 0]];
    for (const [x, y, r] of horns) solid(head, "cone", 0x3a2060, [0.16, 0.6, 0.16], [x, y, -0.04], [0, 0, -r]);
    m.head = head;
  },

  "boss-bouffon"(m) {
    m.frame = { height: 3.4, center: 1, pitch: 0.3 };
    m.cfg.gait = "hop";
    const b = m.body;
    const red = 0xc2243e;
    const purple = 0x6a2fa8;
    const gold = 0xf0b323;
    for (const side of [-1, 1]) {
      addLeg(m, side * 0.22, 0.7, 0.54, 0.26, side > 0 ? red : purple, 0.2, 0x2a1f40);
      solid(b, "cone", gold, [0.18, 0.36, 0.18], [side * 0.22, 0.08, 0.44], [Math.PI / 2 + 0.3, 0, 0]);
    }
    solid(b, "cyl", red, [0.94, 0.8, 0.68], [0, 1.1, 0]);
    solid(b, "box", purple, [0.5, 0.8, 0.06], [0, 1.1, 0.34], [0, 0, 0.78], { noOutline: true });
    solid(b, "box", gold, [0.12, 0.7, 0.06], [0, 1.1, 0.36], [0, 0, -0.78], { noOutline: true });
    for (let i = 0; i < 3; i += 1) solid(b, "sphere", gold, 0.12, [0, 0.8 + i * 0.28, 0.4]);
    for (let i = 0; i < 9; i += 1) {
      const a = (i / 9) * Math.PI * 2;
      solid(b, "cone", i % 2 ? gold : 0xffffff, [0.3, 0.3, 0.12], [Math.cos(a) * 0.46, 1.52, Math.sin(a) * 0.36], [Math.sin(a) * 1.6 - 0.2, 0, -Math.cos(a) * 1.6]);
    }
    addArm(m, -1, -0.62, 1.4, 0.58, 0.22, purple, 0xffffff, 0.26);
    addArm(m, 1, 0.62, 1.4, 0.58, 0.22, red, 0xffffff, 0.26);
    const head = group(b, [0, 1.96, 0.04]);
    solid(head, "sphere", 0xfff1e0, [0.9, 0.84, 0.84], [0, 0, 0]);
    solid(head, "box", red, [0.14, 0.2, 0.05], [-0.2, 0.02, 0.41], [0, 0, 0.7], { noOutline: true });
    solid(head, "box", red, [0.14, 0.2, 0.05], [0.2, 0.02, 0.41], [0, 0, 0.7], { noOutline: true });
    for (const side of [-1, 1]) {
      solid(head, "sphere", DARK, [0.1, 0.14, 0.06], [side * 0.18, 0.06, 0.4], [0, 0, 0], { noOutline: true });
      solid(head, "sphere", 0xff6a8a, [0.14, 0.12, 0.04], [side * 0.3, -0.08, 0.36], [0, 0, 0], { noOutline: true });
    }
    solid(head, "sphere", red, [0.2, 0.2, 0.2], [0, -0.06, 0.45]);
    solid(head, "box", DARK, [0.5, 0.14, 0.06], [0, -0.22, 0.4], [0, 0, 0], { noOutline: true });
    solid(head, "box", 0xffffff, [0.44, 0.05, 0.07], [0, -0.17, 0.41], [0, 0, 0], { noOutline: true });
    solid(head, "dome", purple, [0.96, 0.8, 0.94], [0, 0.1, 0], [-0.2, 0, 0]);
    const hat = [[-0.62, 0.62, 1.15, red], [0, 0.78, 0.0, gold], [0.62, 0.62, -1.15, purple]];
    for (const [x, y, r, color] of hat) {
      solid(head, "cone", color, [0.38, 0.9, 0.38], [x * 0.7, y + 0.2, 0], [0, 0, -r * 0.6]);
      solid(head, "sphere", gold, 0.18, [x * 1.3, y + 0.42 - Math.abs(x) * 0.2, 0]);
    }
    m.head = head;
    // bombes de jonglage
    const bombs = [];
    for (let i = 0; i < 2; i += 1) {
      const bomb = group(b, [0, 2.6, 0]);
      solid(bomb, "sphere", 0x2a2f3d, 0.3);
      solid(bomb, "cyl", 0xd8c8a8, [0.04, 0.14, 0.04], [0, 0.2, 0], [0, 0, 0.3], { noOutline: true });
      emit(bomb, "sphere", 0xffb02a, [0.1, 0.1, 0.1], [0.04, 0.3, 0]);
      bombs.push(bomb);
    }
    m.ticks.push((t) => bombs.forEach((bomb, i) => {
      const a = t * 3 + i * Math.PI;
      bomb.position.set(Math.cos(a) * 0.7, 2.7 + Math.sin(a * 2) * 0.12, 0.2);
    }));
  },

  "boss-chambellan"(m) {
    m.frame = { height: 3.8, center: 1, pitch: 0.3 };
    m.cfg.gait = "float";
    const b = m.body;
    const wine = 0x8a1f3a;
    const gold = 0xe0b24a;
    solid(b, "taper", wine, [1.3, 1.9, 0.9], [0, 1.0, 0]);
    solid(b, "box", gold, [0.22, 1.7, 0.06], [0, 1.0, 0.38], [0, 0, 0], { noOutline: true });
    for (let i = 0; i < 4; i += 1) solid(b, "cyl", gold, [1.3 - i * 0.14, 0.07, 0.92 - i * 0.1], [0, 0.4 + i * 0.4, 0], [0, 0, 0], { noOutline: true });
    solid(b, "cyl", 0x5a1226, [0.96, 0.7, 0.7], [0, 1.5, 0]);
    for (const side of [-1, 1]) {
      solid(b, "sphere", gold, [0.6, 0.38, 0.54], [side * 0.74, 2.0, 0]);
      for (let i = 0; i < 3; i += 1) solid(b, "cone", gold, [0.12, 0.3, 0.12], [side * (0.58 + i * 0.12), 2.2 - i * 0.06, 0], [0, 0, -side * (0.5 + i * 0.4)]);
    }
    solid(b, "cone", 0x5a1226, [0.5, 0.8, 0.2], [0, 2.2, -0.34], [-0.4, 0, 0]);
    addArm(m, -1, -0.82, 1.9, 0.76, 0.28, wine, 0x2a1426, 0.28);
    addArm(m, 1, 0.82, 1.9, 0.76, 0.28, wine, BONE, 0.28);
    const head = group(b, [0, 2.38, 0.04]);
    solid(head, "sphere", BONE, [0.8, 0.74, 0.74], [0, 0, 0]);
    solid(head, "box", BONE, [0.4, 0.22, 0.26], [0, -0.3, 0.14]);
    for (const side of [-1, 1]) emit(head, "sphere", 0xe06bff, [0.18, 0.2, 0.06], [side * 0.16, 0.04, 0.35]);
    for (let i = 0; i < 5; i += 1) solid(head, "box", DARK, [0.04, 0.12, 0.04], [-0.14 + i * 0.07, -0.34, 0.28], [0, 0, 0], { noOutline: true });
    solid(head, "cyl", gold, [0.72, 0.26, 0.72], [0, 0.46, 0]);
    for (let i = 0; i < 6; i += 1) {
      const a = (i / 6) * Math.PI * 2;
      solid(head, "cone", gold, [0.18, 0.36, 0.18], [Math.cos(a) * 0.3, 0.76, Math.sin(a) * 0.3]);
    }
    emit(head, "sphere", 0xe06bff, [0.1, 0.1, 0.1], [0, 0.48, 0.38]);
    m.head = head;
    const staff = group(m.armL, [0, -0.78, 0.04], [0.15, 0, 0]);
    limb(staff, "cyl", 0x6a4a2c, [0, -0.9, 0], [0, 1.4, 0], 0.09);
    solid(staff, "torus", gold, [0.5, 0.5, 0.5], [0, 1.6, 0], [0, 0, 0], { outline: 0.02 });
    emit(staff, "sphere", 0xd23aff, [0.3, 0.3, 0.3], [0, 1.6, 0], [0, 0, 0], 0.9);
    solid(staff, "cone", gold, [0.14, 0.3, 0.14], [0, 1.96, 0]);
    const fire = [];
    for (let i = 0; i < 4; i += 1) fire.push(emit(m.armR, "cone", 0xb056ff, [0.2, 0.46, 0.2], [(i - 1.5) * 0.08, -1.02, 0.1], [0, 0, 0], 0.85));
    m.ticks.push((t) => fire.forEach((f, i) => { f.scale.y = 0.46 + Math.sin(t * 9 + i * 2) * 0.12; f.position.y = -1.0 + Math.sin(t * 7 + i) * 0.03; }));
  },
};

const ART_TO_KEY = {
  citrouille: "citrouille",
  "citrouille-vive": "citrouille-vive",
  "grosse-citrouille": "grosse-citrouille",
};

export function enemyKey(artName) {
  const name = artName.replace(/^.*\//, "");
  return ART_TO_KEY[name] ?? name;
}

export function hasEnemy(artName) {
  return Object.prototype.hasOwnProperty.call(BUILDERS, enemyKey(artName));
}

export function isBossArt(artName) {
  return enemyKey(artName).startsWith("boss-");
}

export function buildEnemy(artName) {
  const key = enemyKey(artName);
  const m = base({ height: 2.4, center: 1.0, pitch: 0.3 });
  BUILDERS[key](m);
  m.setWeapon = () => {};
  m.update = (owner, t, dt) => updateEnemy(m, owner, t, dt);
  return m;
}

const lerp = (a, b, k) => a + (b - a) * k;

function updateEnemy(m, owner, t, dt) {
  const s = m.s;
  const has = (name) => Boolean(owner?.classList.contains(name));
  if (has("enemy-frozen")) dt = 0;
  const k = Math.min(1, dt * 10);

  // détection du déplacement (les ennemis n'ont pas de classe de marche)
  if (owner) {
    const x = parseFloat(owner.style.left) || 0;
    const y = parseFloat(owner.style.top) || 0;
    if (s.prevX !== null && dt > 0) {
      const speed = Math.hypot(x - s.prevX, y - s.prevY) / dt;
      s.move = lerp(s.move, speed > 8 ? 1 : 0, k);
    }
    s.prevX = x;
    s.prevY = y;
  }
  const gait = owner?.dataset.gait ?? m.cfg.gait;
  const moving = s.move;
  const pace = { walk: 6, waddle: 7, skitter: 12, stomp: 4.4, hop: 6.5, float: 2.4 }[gait] ?? 6;
  s.phase += dt * (pace * (0.25 + moving * 0.9));

  const body = m.body;
  const swing = Math.sin(s.phase);
  let bob = 0;
  let roll = 0;
  let pitch = 0;
  let legAmp = 0.6 * moving;
  switch (gait) {
    case "waddle":
      roll = swing * 0.2 * moving;
      bob = Math.abs(Math.sin(s.phase)) * 0.06 * moving;
      break;
    case "skitter":
      bob = Math.abs(Math.sin(s.phase * 1.5)) * 0.04 * moving;
      pitch = 0.18 * moving;
      legAmp = 0.8 * moving;
      break;
    case "stomp":
      bob = Math.abs(Math.sin(s.phase)) * 0.08 * moving;
      roll = swing * 0.07 * moving;
      legAmp = 0.5 * moving;
      break;
    case "hop":
      bob = Math.abs(Math.sin(s.phase)) * (0.2 + 0.2 * moving);
      legAmp = 0.35;
      break;
    case "float":
      bob = 0.14 + Math.sin(t * 2.2) * 0.1;
      legAmp = 0;
      pitch = 0.1 * moving;
      break;
    default:
      bob = Math.abs(Math.sin(s.phase)) * 0.06 * moving;
      roll = swing * 0.03 * moving;
  }
  if (gait !== "float") bob += Math.sin(t * 2.4) * 0.012 * (1 - moving);

  if (m.legs.length >= 2) {
    m.legs[0].rotation.x = swing * legAmp;
    m.legs[1].rotation.x = -swing * legAmp;
  }

  // états d'attaque
  s.wind = lerp(s.wind, has("enemy-winding-up") ? 1 : 0, Math.min(1, dt * 14));
  const attacking = has("enemy-attacking");
  if (attacking && !s.attacking) s.atk = 1;
  s.attacking = attacking;
  s.atk = Math.max(0, s.atk - dt / 0.38);
  const aiming = has("enemy-aiming") || has("enemy-firing");
  const firing = has("enemy-firing");
  if (firing && !s.shooting) s.kick = 1;
  s.shooting = firing;
  s.kick = Math.max(0, s.kick - dt * 6);
  const p = 1 - s.atk;
  const strike = s.atk > 0 ? Math.sin(p * Math.PI) : 0;

  const restL = -swing * 0.5 * moving + 0.1;
  const restR = swing * 0.5 * moving + 0.1;
  let armL = restL;
  let armR = restR;
  if (m.cfg.aimArms) {
    const aim = aiming ? 1 : 0;
    s.aimBlend = lerp(s.aimBlend ?? 0, aim, Math.min(1, dt * 14));
    armL = lerp(restL, -1.5, s.aimBlend);
    armR = lerp(restR, -1.1 - s.kick * 0.3, s.aimBlend);
    if (m.cfg.weapon) m.cfg.weapon.rotation.x = lerp(1.2, 1.55, s.aimBlend);
  } else {
    const raise = -2.4 * s.wind;
    const hit = s.atk > 0 ? lerp(-2.4, 0.7, p * p * (3 - 2 * p)) : 0;
    armL = s.atk > 0 ? hit : lerp(restL, raise, s.wind);
    armR = s.atk > 0 ? hit : lerp(restR, raise, s.wind);
    if (m.cfg.weapon) m.cfg.weapon.rotation.x = lerp(0.95, 0.2, s.wind);
  }
  // posture d'attente : l'outil du boss repose sur son épaule tant qu'il n'attaque pas
  if (m.cfg.rest) {
    const r = m.cfg.rest;
    s.calm = lerp(s.calm ?? 0, s.wind < 0.05 && s.atk <= 0 && !aiming ? 1 : 0, Math.min(1, dt * 6));
    if (r.arm === "L") armL = lerp(armL, r.armX, s.calm);
    else armR = lerp(armR, r.armX, s.calm);
    r.base ??= r.weapon.rotation.x;
    r.weapon.rotation.x = lerp(m.cfg.weapon === r.weapon ? (r.weapon.rotation.x) : r.base, r.weaponX, s.calm);
  }
  if (m.armL) m.armL.rotation.x = armL;
  if (m.armR) m.armR.rotation.x = armR;

  body.position.y = bob;
  body.position.z = strike * 0.3 - s.wind * 0.05;
  body.rotation.z = roll;
  body.rotation.x = pitch - s.wind * 0.2 + strike * 0.28;
  if (m.head) m.head.rotation.x = -pitch * 0.5 + (aiming ? -0.05 : 0);

  // modèle posé dans la carte : il se tourne vers son cap (repère monde) ; sticker 2D : 3/4 fixe
  const turnData = owner?.dataset?.turn;
  if (has("is-world") && turnData !== undefined && turnData !== "") {
    const target = Number(turnData);
    if (s.turn === undefined) s.turn = target;
    s.turn += Math.atan2(Math.sin(target - s.turn), Math.cos(target - s.turn)) * Math.min(1, dt * 8);
    m.root.rotation.y = s.turn;
  } else {
    m.root.rotation.y = 0.3;
    s.turn = undefined;
  }

  const spawn = has("boss-spawning");
  m.root.scale.setScalar(spawn ? 0.9 + Math.sin(t * 20) * 0.02 : 1);

  for (const tick of m.ticks) tick(t, s);
}

export { THREE };

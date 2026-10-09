// Moteur 3D des personnages : modèles procéduraux, ombrage toon, contours, rendu partagé.
// Chaque acteur 3D dessine dans un petit <canvas> 2D inséré à la place de l'ancien sprite,
// ce qui laisse intacts la caméra, les collisions, les ombres et tous les effets du jeu.
import * as THREE from "../vendor/three.module.min.js?v=170";

export { THREE };

export const OUTLINE_COLOR = 0x170b2b;

// ---------- Matériaux et géométries partagés ----------
// Style « figurine de jeu mobile » : volumes très arrondis, matière lisse et brillante,
// contour fin dans une teinte sombre de la couleur de la pièce (pas de noir pur).
const materials = new Map();
// Palette "Brawl" : couleurs plus saturées et plus claires que les artworks d'origine.
const hsl = { h: 0, s: 0, l: 0 };
export function vivid(color) {
  const c = new THREE.Color(color);
  c.getHSL(hsl);
  if (hsl.l < 0.125) return c;                                               // noirs d'encre : inchangés
  if (hsl.s < 0.08) return c.offsetHSL(0, 0, hsl.l < 0.2 ? 0.12 : 0);        // gris/blancs/noirs
  c.setHSL(hsl.h, Math.min(1, hsl.s * 1.22 + 0.06), (hsl.l < 0.2 ? hsl.l : hsl.l < 0.55 ? Math.min(0.62, hsl.l * 1.1 + 0.06) : hsl.l));
  return c;
}

// Rampe cel-shading : 4 aplats nets (ombre, demi-teinte, lumière, pleine lumière).
export const GRADIENT = (() => {
  const data = new Uint8Array([88, 150, 214, 255]);
  const texture = new THREE.DataTexture(data, data.length, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
})();

// Ajoute à chaque matériau : dégradé de hauteur peint (sombre en bas, clair en haut) et liseré de lumière bleutée.
export function stylize(material) {
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying float vWorldY;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvWorldY = (modelMatrix * vec4(transformed, 1.0)).y;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying float vWorldY;")
      .replace("#include <opaque_fragment>", `
        outgoingLight *= mix(0.66, 1.1, smoothstep(0.0, 3.9, vWorldY));
        float rimF = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.4);
        outgoingLight += vec3(0.5, 0.74, 1.0) * rimF * 0.3;
        #include <opaque_fragment>`);
  };
  material.customProgramCacheKey = () => "ov-stylized";
  return material;
}

// Or, acier et argent restent brillants : ce sont les seuls reflets du décor et des monstres.
const METAL_COLORS = new Set([0xf0b323, 0xe0b24a, 0xd4a93a, 0xffcb3d, 0xd9b25a, 0xffd23f, 0xb8bfd0, 0xc9d2de, 0xaab7c8, 0x9aa4b4]);

// Matière mate peinte à la main par défaut ; `gloss` réserve les reflets au métal, aux visières et aux yeux.
export function toon(color, options = {}) {
  const key = `${color}|${options.emissive ?? ""}|${options.opacity ?? 1}|${options.double ? "d" : ""}|${options.gloss ? "g" : ""}|${options.rough ?? ""}|${options.metal ?? ""}`;
  let material = materials.get(key);
  if (!material) {
    const tint = options.raw ? new THREE.Color(color) : vivid(color);
    const common = {
      color: tint,
      emissive: options.emissive ?? tint.clone().multiplyScalar(0.1),
      emissiveIntensity: options.emissiveIntensity ?? 1,
      transparent: (options.opacity ?? 1) < 1,
      opacity: options.opacity ?? 1,
      side: options.double ? THREE.DoubleSide : THREE.FrontSide,
    };
    const shiny = options.gloss || options.metal !== undefined || METAL_COLORS.has(color);
    material = shiny
      ? new THREE.MeshStandardMaterial({ ...common, roughness: options.rough ?? 0.32, metalness: options.metal ?? 0.2 })
      : new THREE.MeshToonMaterial({ ...common, gradientMap: GRADIENT });
    stylize(material);
    materials.set(key, material);
  }
  return material;
}

const basics = new Map();
export function glow(color, opacity = 1) {
  const key = `${color}|${opacity}`;
  let material = basics.get(key);
  if (!material) {
    material = new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: opacity >= 1 });
    basics.set(key, material);
  }
  return material;
}

const INK = new THREE.Color(0x160a2c);
const hulls = new Map();
function hullFor(color) {
  let material = hulls.get(color);
  if (!material) {
    material = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).lerp(INK, 0.74), side: THREE.BackSide });
    hulls.set(color, material);
  }
  return material;
}

// Super-ellipsoïde : n = 2 donne une sphère, n grand un cube aux coins très arrondis.
function superEllipsoid(n, widthSegments = 40, heightSegments = 28) {
  const geometry = new THREE.SphereGeometry(0.5, widthSegments, heightSegments);
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  const v = new THREE.Vector3();
  for (let i = 0; i < position.count; i += 1) {
    v.fromBufferAttribute(position, i);
    const length = v.length();
    if (length < 1e-6) continue;
    v.divideScalar(length);
    const norm = (Math.abs(v.x) ** n + Math.abs(v.y) ** n + Math.abs(v.z) ** n) ** (1 / n);
    v.multiplyScalar(0.5 / norm);
    position.setXYZ(i, v.x, v.y, v.z);
    const nx = Math.sign(v.x) * (Math.abs(v.x) * 2) ** (n - 1);
    const ny = Math.sign(v.y) * (Math.abs(v.y) * 2) ** (n - 1);
    const nz = Math.sign(v.z) * (Math.abs(v.z) * 2) ** (n - 1);
    const nl = Math.hypot(nx, ny, nz) || 1;
    normal.setXYZ(i, nx / nl, ny / nl, nz / nl);
  }
  return geometry;
}

// Cylindre aux bords arrondis (profil super-elliptique), éventuellement conique.
function roundCylinder(m, bottom = 1, top = 1, segments = 32, rings = 22) {
  const positions = [];
  const normals = [];
  const indices = [];
  for (let j = 0; j <= rings; j += 1) {
    const a = -Math.PI / 2 + (Math.PI * j) / rings;
    const c = Math.cos(a);
    const s = Math.sin(a);
    const r0 = Math.abs(c) ** (2 / m);
    const y0 = Math.sign(s) * Math.abs(s) ** (2 / m);
    const nr = r0 ** (m - 1);
    const ny = Math.sign(y0) * Math.abs(y0) ** (m - 1);
    const factor = bottom + (top - bottom) * (y0 * 0.5 + 0.5);
    for (let i = 0; i <= segments; i += 1) {
      const t = (i / segments) * Math.PI * 2;
      const ct = Math.cos(t);
      const st = Math.sin(t);
      positions.push(0.5 * r0 * factor * ct, 0.5 * y0, 0.5 * r0 * factor * st);
      const nl = Math.hypot(nr, ny) || 1;
      normals.push((nr / nl) * ct, ny / nl, (nr / nl) * st);
    }
  }
  for (let j = 0; j < rings; j += 1) {
    for (let i = 0; i < segments; i += 1) {
      const a = j * (segments + 1) + i;
      const b = a + segments + 1;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);
  return geometry;
}


// Profil de révolution lissé (spline) : points [rayon, y] du bas vers le haut, y de -0.5 à 0.5, rayon max 0.5.
function lathe(profile, segments = 36) {
  const curve = new THREE.SplineCurve(profile.map(([r, y]) => new THREE.Vector2(r, y)));
  const points = curve.getPoints(profile.length * 7).map((v) => new THREE.Vector2(Math.max(0, v.x), v.y));
  points[0].x = 0;
  points[points.length - 1].x = 0;
  return new THREE.LatheGeometry(points, segments);
}

// Membre organique : épais à la racine, fin au poignet / à la cheville, bouts arrondis.
const LIMB = [[0, -0.5], [0.16, -0.488], [0.27, -0.44], [0.33, -0.36], [0.35, -0.2], [0.39, 0.05], [0.46, 0.28], [0.5, 0.38], [0.46, 0.46], [0.3, 0.495], [0, 0.5]];
// Buste masculin : poitrail large, taille étroite (silhouette en V).
const TORSO = [[0, -0.5], [0.2, -0.49], [0.33, -0.45], [0.38, -0.36], [0.36, -0.2], [0.34, -0.05], [0.4, 0.12], [0.47, 0.28], [0.5, 0.38], [0.46, 0.46], [0.3, 0.49], [0, 0.5]];
// Buste féminin : épaules fines, taille très marquée, hanches larges.
const TORSO_F = [[0, -0.5], [0.24, -0.49], [0.41, -0.45], [0.5, -0.34], [0.46, -0.2], [0.34, -0.03], [0.32, 0.08], [0.38, 0.24], [0.42, 0.36], [0.4, 0.45], [0.27, 0.49], [0, 0.5]];
// Mollet : galbe du muscle sous le genou, cheville fine.
const CALF = [[0, -0.5], [0.12, -0.49], [0.19, -0.45], [0.22, -0.38], [0.25, -0.25], [0.34, -0.08], [0.45, 0.12], [0.49, 0.24], [0.45, 0.38], [0.38, 0.46], [0.22, 0.495], [0, 0.5]];

const geometries = {
  sphere: new THREE.SphereGeometry(0.5, 40, 28),
  dome: new THREE.SphereGeometry(0.5, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2),
  box: superEllipsoid(5.2),
  cyl: roundCylinder(7),
  cone: new THREE.ConeGeometry(0.5, 1, 28, 1),
  taper: roundCylinder(7, 1, 0.68),
  cap: roundCylinder(2.6),
  torus: new THREE.TorusGeometry(0.5, 0.14, 14, 36),
  arc: new THREE.TorusGeometry(0.5, 0.12, 10, 28, Math.PI),
  plane: new THREE.PlaneGeometry(1, 1),
  limb: lathe(LIMB),
  pyr: (() => { const g = new THREE.ConeGeometry(0.7071, 1, 4, 1); g.rotateY(Math.PI / 4); return g; })(),
  gable: (() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.5, -0.5); shape.lineTo(0.5, -0.5); shape.lineTo(0, 0.5); shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false });
    g.translate(0, 0, -0.5);
    return g;
  })(),
  torsoBody: lathe(TORSO, 40),
  torsoFem: lathe(TORSO_F, 40),
  calf: lathe(CALF),
};

// Versions allégées des formes partagées : le décor, vu de loin, n'a pas besoin de 2 000 triangles par sphère.
let lowShapes = null;
export function lowDetail(geometry) {
  lowShapes ??= new Map([
    [geometries.sphere, new THREE.SphereGeometry(0.5, 16, 11)],
    [geometries.dome, new THREE.SphereGeometry(0.5, 16, 6, 0, Math.PI * 2, 0, Math.PI / 2)],
    [geometries.box, superEllipsoid(5.2, 24, 16)],
    [geometries.cyl, roundCylinder(7, 1, 1, 18, 10)],
    [geometries.taper, roundCylinder(7, 1, 0.68, 18, 10)],
    [geometries.cap, roundCylinder(2.6, 1, 1, 18, 10)],
    [geometries.cone, new THREE.ConeGeometry(0.5, 1, 16, 1)],
    [geometries.torus, new THREE.TorusGeometry(0.5, 0.14, 8, 22)],
    [geometries.arc, new THREE.TorusGeometry(0.5, 0.12, 6, 16, Math.PI)],
  ]);
  return lowShapes.get(geometry) ?? geometry;
}

// Crée un volume à contour : `size` est la taille réelle (x, y, z), le contour est une coque agrandie.
export function solid(parent, kind, color, size, position = [0, 0, 0], rotation = [0, 0, 0], options = {}) {
  const geometry = geometries[kind];
  if (!geometry) throw new Error(`Forme 3D inconnue : ${kind}`);
  const dims = typeof size === "number" ? [size, size, size] : size;
  const material = options.material ?? toon(color, options);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(dims[0], dims[1], dims[2]);
  mesh.position.set(position[0], position[1], position[2]);
  mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  if (!options.noOutline && !options.material?.isMeshBasicMaterial && !(material.opacity < 1)) {
    const w = options.outline ?? 0.03;
    const hull = new THREE.Mesh(geometry, hullFor(material.color.getHex()));
    hull.scale.set((dims[0] + w * 2) / dims[0], (dims[1] + w * 2) / dims[1], (dims[2] + w * 2) / dims[2]);
    mesh.add(hull);
  }
  if (options.name) mesh.name = options.name;
  parent.add(mesh);
  return mesh;
}

export function emit(parent, kind, color, size, position = [0, 0, 0], rotation = [0, 0, 0], opacity = 1) {
  return solid(parent, kind, color, size, position, rotation, { material: glow(color, opacity), noOutline: true });
}

export function group(parent, position = [0, 0, 0], rotation = [0, 0, 0], name = "") {
  const node = new THREE.Group();
  node.position.set(position[0], position[1], position[2]);
  node.rotation.set(rotation[0], rotation[1], rotation[2]);
  if (name) node.name = name;
  parent?.add(node);
  return node;
}

// Cône ou cylindre orienté entre deux points (liane, corde, os, lame…).
export function limb(parent, kind, color, from, to, thickness, options = {}) {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const length = a.distanceTo(b);
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const mesh = solid(parent, kind, color, [thickness, length, thickness], [mid.x, mid.y, mid.z], [0, 0, 0], options);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  return mesh;
}

// ---------- Rendu ----------
const SIZES = { s: [240, 192], w: [300, 225], l: [330, 264] };
const renderers = {};
function getRenderer(sizeKey) {
  if (renderers[sizeKey]) return renderers[sizeKey];
  const [w, h] = SIZES[sizeKey];
  const canvas = document.createElement("canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(1);
  renderer.setSize(w, h, false);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderers[sizeKey] = renderer;
  return renderer;
}

let webglOk = null;
export function webglAvailable() {
  if (webglOk !== null) return webglOk;
  try {
    const probe = document.createElement("canvas");
    webglOk = Boolean(probe.getContext("webgl2") || probe.getContext("webgl"));
  } catch {
    webglOk = false;
  }
  return webglOk;
}

function makeScene() {
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff4e6, 0xa682e6, 2.7));
  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(-2.4, 4.2, 3.6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xbfe0ff, 2.4);
  rim.position.set(2.6, 2.4, -4);
  scene.add(rim);
  return scene;
}

// Ombre ronde et douce sous les pieds (galerie 3D).
let blobTexture;
function makeBlob(size) {
  if (!blobTexture) {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(32, 32, 2, 32, 32, 31);
    grad.addColorStop(0, "rgba(10,4,24,0.62)");
    grad.addColorStop(0.55, "rgba(10,4,24,0.34)");
    grad.addColorStop(1, "rgba(10,4,24,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    blobTexture = new THREE.CanvasTexture(c);
    blobTexture.colorSpace = THREE.SRGBColorSpace;
  }
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: blobTexture, transparent: true, depthWrite: false }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.01;
  mesh.renderOrder = -1;
  return mesh;
}

const registry = new Set();
const byCanvas = new WeakMap();

export class Actor {
  constructor(model, options = {}) {
    this.model = model;
    this.sizeKey = options.size ?? "s";
    const [w, h] = SIZES[this.sizeKey];
    this.width = w;
    this.height = h;
    this.canvas = document.createElement("canvas");
    this.canvas.width = w;
    this.canvas.height = h;
    this.canvas.className = "actor3d-canvas";
    this.canvas.style.aspectRatio = `${w} / ${h}`;
    this.ctx = this.canvas.getContext("2d");
    this.scene = makeScene();
    this.scene.add(model.root);
    if (options.blob ?? globalThis.ACTOR3D_BLOB) this.scene.add(makeBlob(model.blobSize ?? 1.7));
    this.camera = new THREE.PerspectiveCamera(options.fov ?? 26, w / h, 0.1, 60);
    const frame = model.frame ?? { height: 2.2, center: 1.05, pitch: 0.34 };
    const distance = (frame.height / 2) / Math.tan((this.camera.fov * Math.PI) / 360) * 1.08;
    this.camera.position.set(0, frame.center + Math.sin(frame.pitch) * distance, Math.cos(frame.pitch) * distance);
    // Cadrage : les pieds se posent à 4 % du bas du canvas, pour coller au bas de la zone de jeu.
    let center = frame.center;
    const feet = new THREE.Vector3(0, 0, 0);
    for (let i = 0; i < 5; i += 1) {
      this.camera.position.set(0, center + Math.sin(frame.pitch) * distance, Math.cos(frame.pitch) * distance);
      this.camera.lookAt(0, center, 0);
      this.camera.updateMatrixWorld(true);
      const ndc = feet.clone().project(this.camera).y;
      center += (ndc + 0.92) * (frame.height * 0.54);
    }
    this.camera.position.set(0, center + Math.sin(frame.pitch) * distance, Math.cos(frame.pitch) * distance);
    this.camera.lookAt(0, center, 0);
    this.interval = options.interval ?? 33;
    this.animated = options.animated ?? true;
    this.last = 0;
    this.born = performance.now();
    this.seenConnected = false;
    this.visible = true;
    this.visibleCheck = 0;
    this.time = Math.random() * 10;
    this.clock = performance.now();
    this.dirty = true;
    byCanvas.set(this.canvas, this);
    registry.add(this);
  }

  owner() {
    if (this._owner?.isConnected) return this._owner;
    const c = this.canvas;
    this._owner = c.closest(".player") ?? c.closest(".enemy") ?? c.closest(".hero-real") ?? c.closest(".character-preview") ?? null;
    return this._owner;
  }

  setWeapon(id, coating) {
    this.model.setWeapon?.(id, coating);
    this.dirty = true;
    this.worldStale = true;
  }

  // Mode « monde » : le modèle quitte son petit canvas et rejoint la scène de la carte (vraie 3D, occlusion, rotation libre).
  // `hooks.adapt` convertit les matériaux pour la projection de la carte, `hooks.restore` remet les matériaux d'origine.
  enterWorld(scene, hooks) {
    if (this.inWorld) return;
    if (!this.holder) {
      this.holder = new THREE.Group();
      this.holder.add(makeBlob(this.model.blobSize ?? 1.5));
    }
    this.holder.add(this.model.root);
    hooks.adapt(this.holder);
    scene.add(this.holder);
    this.worldScene = scene;
    this.worldHooks = hooks;
    this.worldAdaptedAt = performance.now();
    this.inWorld = true;
    this.canvas.classList.add("in-world");
    this.owner()?.classList.add("is-world");
  }

  leaveWorld() {
    if (!this.inWorld) return;
    this.worldHooks.restore(this.holder);
    this.holder.removeFromParent();
    this.scene.add(this.model.root);
    this.inWorld = false;
    this.worldFlash = false;
    this.dirty = true;
    this.last = 0;
    this.canvas.classList.remove("in-world");
    this._owner?.classList.remove("is-world");
  }

  // Photo à plat de l'état actuel (cadavres, aperçus) : on repasse brièvement par le rendu canvas.
  snapshot() {
    if (!this.inWorld) return;
    const { worldScene, worldHooks } = this;
    this.leaveWorld();
    try {
      this.draw(performance.now());
    } finally {
      this.enterWorld(worldScene, worldHooks);
    }
  }

  // Image de la carte : animation du modèle (le canvas n'est plus dessiné).
  tickWorld(dt) {
    this.time += dt;
    const owner = this.owner();
    if (owner && !owner.classList.contains("is-world")) owner.classList.add("is-world");   // le jeu réécrit parfois les classes du héros
    this.model.update(owner, this.time, dt);
    const now = performance.now();
    if (this.worldStale || now - this.worldAdaptedAt > 500) {
      this.worldStale = false;
      this.worldAdaptedAt = now;
      this.worldHooks.adapt(this.holder);
    }
    const hit = !!owner && (owner.classList.contains("enemy-hit") || owner.classList.contains("player-hurt"));
    if (hit !== this.worldFlash) {
      this.worldFlash = hit;
      this.worldHooks.flash?.(this.holder, hit);
    }
  }

  draw(now) {
    const dt = Math.min(0.1, (now - this.clock) / 1000);
    this.clock = now;
    this.time += dt;
    this.model.update(this.owner(), this.time, dt);
    const renderer = getRenderer(this.sizeKey);
    renderer.render(this.scene, this.camera);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(renderer.domElement, 0, 0);
    this.dirty = false;
  }

  dispose() {
    if (this.inWorld) {
      this.worldHooks.restore(this.holder);
      this.holder.removeFromParent();
      this.inWorld = false;
    }
    registry.delete(this);
    this.scene.traverse((node) => {
      if (node.isMesh) node.geometry = undefined;
    });
    this.scene.clear();
  }
}

export function allActors() {
  return registry;
}

export function actorOf(canvas) {
  return byCanvas.get(canvas);
}

let loopStarted = false;
function loop(now) {
  window.requestAnimationFrame(loop);
  if (document.hidden) return;
  const due = [];
  for (const actor of registry) {
    const canvas = actor.canvas;
    if (canvas.isConnected) {
      if (!actor.seenConnected) {
        actor.seenConnected = true;
        // Seuls le jeu, les ennemis et l'aperçu du menu s'animent ; les vignettes de boutique restent figées.
        actor.animated = Boolean(canvas.closest(".player, .enemy, .loadout-preview"));
        actor.dirty = true;
      }
    } else {
      if ((actor.seenConnected && now - actor.last > 400) || now - actor.born > 8000) actor.dispose();
      continue;
    }
    if (now - actor.visibleCheck > 300) {
      actor.visibleCheck = now;
      const rect = canvas.getBoundingClientRect();
      actor.visible = canvas.offsetParent !== null
        && rect.width > 1 && rect.bottom > -60 && rect.top < window.innerHeight + 60
        && rect.right > -60 && rect.left < window.innerWidth + 60;
    }
    if (actor.inWorld) continue;                       // dessiné par la carte (relief), pas par son canvas
    if (!actor.visible) continue;
    if (!actor.animated && !actor.dirty && actor.last) continue;
    if (now - actor.last < actor.interval) continue;
    due.push(actor);
  }
  if (due.length === 0) return;
  // Les plus anciens d'abord : aucun acteur n'est affamé quand beaucoup d'entre eux sont dus.
  due.sort((a, b) => a.last - b.last);
  const started = performance.now();
  for (let i = 0; i < due.length; i += 1) {
    if (i >= 3 && performance.now() - started > 7) break;
    const actor = due[i];
    actor.last = now;
    try {
      actor.draw(now);
    } catch (error) {
      // Un modèle défaillant ne doit jamais bloquer les autres ni le jeu : on le retire du rendu.
      (window.__actor3dErrors ??= []).push(String(error?.stack ?? error));
      console.warn("Acteur 3D désactivé", error);
      actor.failed = true;
      registry.delete(actor);
      actor.canvas.dataset.failed = "1";
    }
  }
}

export function startLoop() {
  if (loopStarted) return;
  loopStarted = true;
  window.requestAnimationFrame(loop);
}

// Recopie l'image courante d'un acteur dans un canvas cloné (cadavres, aperçus).
export function copyCanvasPixels(from, to) {
  to.width = from.width;
  to.height = from.height;
  to.getContext("2d").drawImage(from, 0, 0);
}

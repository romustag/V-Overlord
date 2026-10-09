// Carte 3D vivante : une scène Three.js rendue en direct par-dessus l'image de fond (sans arbres ni flammes).
// Elle anime : arbres qui se balancent, feuilles qui tombent, lanternes et citrouilles qui vacillent, fumée de
// cheminée, lucioles, brume qui dérive, chauves-souris, fanions, braseros du trône.
// Même caméra que l'image de fond : tout reste parfaitement aligné avec les collisions du jeu.
import { THREE, webglAvailable } from "./core.js?v=53";
import { buildLiveScene, buildReliefScene, makeMapCamera, SCREEN_H } from "./maps.js?v=53";
import { Relief, createReliefHost } from "./relief.js?v=53";

// ?relief=0 : retombe sur la couche animée à plat (image de fond + arbres et flammes animés).
const RELIEF_ON = new URLSearchParams(location.search).get("relief") !== "0";

const WORLD_W = 36;
const WORLD_D = SCREEN_H / Math.sin((52 * Math.PI) / 180);

const SOFT = (() => {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.45)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
})();

const ADDITIVE = {
  transparent: true,
  depthWrite: false,
  depthTest: false,
  blending: THREE.CustomBlending,
  blendEquation: THREE.AddEquation,
  blendSrc: THREE.SrcAlphaFactor,
  blendDst: THREE.OneFactor,
  blendSrcAlpha: THREE.ZeroFactor,
  blendDstAlpha: THREE.OneFactor,
};

// Ambiance par carte : couleurs des lucioles, de la brume, nombre de feuilles.
const MOODS = {
  1: { fire: [0xffd36a, 0xffb84a], mist: 0xb8a8e8, mistAlpha: 0.1, leaves: 36, bats: 3 },
  2: { fire: [0xffb84a, 0xff9a3a], mist: 0xf0d0a0, mistAlpha: 0.09, leaves: 44, bats: 2 },
  3: { fire: [0xd88aff, 0xffd36a], mist: 0xd0a8f0, mistAlpha: 0.12, leaves: 24, bats: 4 },
  5: { fire: [0xd88aff, 0xffd36a], mist: 0xd0a8f0, mistAlpha: 0.12, leaves: 24, bats: 4 },
  4: { fire: [0x8ae8ff, 0xffe27a], mist: 0xa8c0f0, mistAlpha: 0.1, leaves: 30, bats: 3 },
  throne: { fire: [0xff9a3a, 0xffd23a], mist: 0xd8a8f0, mistAlpha: 0.1, leaves: 0, bats: 0, rising: true },
};

function rand(a, b) {
  return a + Math.random() * (b - a);
}

function glowSprite(color, size, opacity) {
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: SOFT, color, opacity, ...ADDITIVE }));
  sprite.scale.set(size, size, 1);
  return sprite;
}

function buildBat() {
  const bat = new THREE.Group();
  const dark = new THREE.MeshBasicMaterial({ color: 0x2a1448 });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), dark);
  body.scale.set(0.8, 0.8, 1.2);
  bat.add(body);
  for (const ear of [-1, 1]) {
    const e = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.18, 4), dark);
    e.position.set(ear * 0.1, 0.2, 0.1);
    bat.add(e);
  }
  const wings = [];
  for (const side of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.12, 0.02, 0);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.03, 0.38), dark);
    wing.position.x = side * 0.42;
    wing.rotation.y = side * 0.25;
    pivot.add(wing);
    pivot.userData.side = side;
    bat.add(pivot);
    wings.push(pivot);
  }
  bat.userData.wings = wings;
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.5, 14), new THREE.MeshBasicMaterial({ color: 0x120824, transparent: true, opacity: 0.28, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.set(1.5, 0.9, 1);
  const holder = new THREE.Group();
  holder.add(bat, shadow);
  holder.userData = { bat, shadow, wings };
  return holder;
}

class LiveMap {
  constructor(arena, world) {
    this.arena = arena;
    this.world = world;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "map-live-canvas";
    this.canvas.setAttribute("aria-hidden", "true");
    world.prepend(this.canvas);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: "default" });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.camera = makeMapCamera();
    this.id = null;
    this.live = null;
    this.parts = null;
    this.running = false;
    this.last = 0;
    this.interval = 1000 / 24;
    this.cost = 0;
    this.frames = 0;
    this.disabled = false;
    this.relief = null;
    this.host = null;
    this.reliefOff = false;
    this.animate = (t, dt) => this.update(t, dt);
    this.resize();
    new ResizeObserver(() => this.resize()).observe(arena);
    // l'élément peut être retiré si le jeu reconstruit le monde : on le remet en place
    new MutationObserver(() => {
      if (!this.canvas.isConnected) this.world.prepend(this.canvas);
    }).observe(world, { childList: true });
    new MutationObserver(() => this.sync()).observe(arena, { attributes: true, attributeFilter: ["data-wave", "class"] });
    this.canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      this.disable("contexte WebGL perdu");
    });
    this.sync();
  }

  resize() {
    const width = Math.min(3000, Math.max(1024, Math.round(this.world.offsetWidth * 1.6 * Math.min(window.devicePixelRatio || 1, 1.5))));
    const height = Math.round((width * SCREEN_H) / WORLD_W);
    if (this.canvas.width === width && this.canvas.height === height) return;
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(width, height, false);
  }

  currentId() {
    if (this.arena.classList.contains("arena-throne-room")) return "throne";
    const wave = Number(this.arena.dataset.wave);
    return wave >= 1 && wave <= 5 ? wave : 1;
  }

  sync() {
    if (this.disabled) return;
    const id = this.currentId();
    if (id === this.id) return;
    this.id = id;
    // le temps de construire la nouvelle scène, l'image complète (avec arbres) reste affichée
    this.arena.classList.remove("map-live");
    this.dropRelief();
    this.live = null;
    clearTimeout(this.buildTimer);
    this.buildTimer = setTimeout(() => this.build(id), 30);
  }

  dropRelief() {
    if (!this.relief) return;
    this.relief.dispose();
    this.relief = null;
    this.arena.classList.remove("map-relief");
  }

  // Carte en vrai relief (cartes 1 à 4) : sol peint + décor en 3D rendus avec la caméra du jeu.
  buildRelief(id) {
    try {
      const built = buildReliefScene(id);
      this.live = built;
      this.parts = this.decorate(built, id);
      this.host ??= createReliefHost(this.arena, this.world, () => this.reliefFailed(this.id, "contexte WebGL perdu"));
      const relief = new Relief(this.host, built, id, {
        shown: () => {
          if (this.relief !== relief) return;
          this.arena.classList.remove("map-live");
          this.arena.classList.add("map-relief");
        },
        failed: (reason) => this.reliefFailed(id, reason),
      });
      this.relief = relief;
      relief.cam = this.lastCam ?? null;
      relief.load(`assets/map-${id}-ground.jpg?v=2`).then(() => this.start()).catch(() => this.reliefFailed(id, "image du sol introuvable"));
    } catch (error) {
      console.warn("Relief indisponible", error);
      this.reliefFailed(id, "erreur de construction");
    }
  }

  reliefFailed(id, reason) {
    console.info("Relief désactivé :", reason);
    this.reliefOff = true;
    this.dropRelief();
    this.host?.destroy();
    this.host = null;
    this.live = null;
    if (id === this.id) this.build(id);
  }

  // Appelé par le jeu à chaque image, juste après le placement de la caméra CSS : le rendu reste synchrone avec les personnages.
  frame(cam) {
    this.lastCam = cam;
    if (!this.relief?.ready || this.disabled) return;
    this.relief.lastExternal = performance.now();
    try {
      this.relief.render(cam, performance.now() / 1000, this.animate);
    } catch (error) {
      // une erreur de rendu ne doit jamais arrêter la boucle du jeu
      console.warn("Erreur de rendu du relief", error);
      window.__reliefError = String(error?.stack ?? error);
      this.reliefFailed(this.id, "erreur de rendu");
    }
  }

  build(id) {
    if (this.disabled || id !== this.id) return;
    if (RELIEF_ON && !this.reliefOff && id !== "throne") {
      this.buildRelief(id);
      return;
    }
    try {
      const built = buildLiveScene(id);
      this.live = built;
      this.parts = this.decorate(built, id);
      this.renderer.render(built.scene, this.camera);
      this.arena.classList.add("map-live");
      this.start();
    } catch (error) {
      console.warn("Carte vivante indisponible", error);
      this.disable("erreur de construction");
    }
  }

  // Ajoute les effets qui ne dépendent pas des obstacles : feuilles, lucioles, brume, chauves-souris, fumée, lueurs.
  decorate({ scene, items }, id) {
    const mood = MOODS[id] ?? MOODS[1];
    const parts = { leaves: null, fires: [], mists: [], bats: [], puffs: [], halos: [] };

    // feuilles qui tombent
    if (mood.leaves > 0) {
      const palette = (this.live.map?.leaf ?? ["#e98a22", "#d6561e", "#f5b22c"]).map((c) => new THREE.Color(c));
      const geometry = new THREE.PlaneGeometry(0.3, 0.2);
      const leaves = new THREE.InstancedMesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }), mood.leaves);
      const state = [];
      for (let i = 0; i < mood.leaves; i += 1) {
        leaves.setColorAt(i, palette[i % palette.length]);
        state.push({ x: rand(-19, 19), y: rand(0, 8), z: rand(-WORLD_D / 2, WORLD_D / 2), phase: rand(0, 6.28), spin: rand(1.5, 4), fall: rand(0.7, 1.3) });
      }
      leaves.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      leaves.frustumCulled = false;
      scene.add(leaves);
      parts.leaves = { mesh: leaves, state };
    }

    // lucioles / braises
    for (let i = 0; i < 26; i += 1) {
      const sprite = glowSprite(mood.fire[i % mood.fire.length], rand(0.45, 0.8), 0.8);
      const base = { x: rand(-17, 17), z: rand(-WORLD_D / 2 + 1, WORLD_D / 2 - 1), y: rand(0.6, 2.4) };
      sprite.position.set(base.x, base.y, base.z);
      scene.add(sprite);
      parts.fires.push({ sprite, base, phase: rand(0, 6.28), speed: rand(0.25, 0.6), rising: Boolean(mood.rising) });
    }

    // brume basse
    for (let i = 0; i < 6; i += 1) {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: SOFT, color: mood.mist, opacity: mood.mistAlpha, transparent: true, depthWrite: false, depthTest: false }));
      const size = rand(12, 20);
      sprite.scale.set(size, size * 0.55, 1);
      sprite.position.set(rand(-18, 18), 0.4, rand(-WORLD_D / 2, WORLD_D / 2));
      scene.add(sprite);
      parts.mists.push({ sprite, speed: rand(0.12, 0.3) * (i % 2 ? 1 : -1), size });
    }

    // chauves-souris
    for (let i = 0; i < mood.bats; i += 1) {
      const holder = buildBat();
      holder.userData.lane = { z: rand(-WORLD_D / 2 + 2, WORLD_D / 2 - 2), speed: rand(2.2, 3.4), offset: rand(0, 60), amp: rand(1, 2.5), height: rand(4.5, 7) };
      scene.add(holder);
      parts.bats.push(holder);
    }

    // lueurs vacillantes (lanternes, citrouilles allumées, braseros)
    for (const marker of items.halos) {
      const { color, size } = marker.userData.halo;
      const sprite = glowSprite(color, size, 0.6);
      marker.add(sprite);
      parts.halos.push({ sprite, base: 0.6, phase: marker.position.x * 3.1 + marker.position.z * 1.7 });
    }

    // fumée de cheminée
    for (const marker of items.smokes) {
      for (let i = 0; i < 5; i += 1) {
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: SOFT, color: 0xc8bcd8, opacity: 0, transparent: true, depthWrite: false, depthTest: false }));
        marker.add(sprite);
        parts.puffs.push({ sprite, life: i / 5, speed: rand(0.22, 0.32) });
      }
    }

    // mémorise les positions de départ des éléments animés
    for (const flame of items.flames) flame.userData.baseScale = flame.scale.clone();
    for (const flag of items.flags) flag.userData.baseY = flag.position.y;
    return parts;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.clock = performance.now();
    const tick = (now) => {
      if (!this.running) return;
      requestAnimationFrame(tick);
      if (document.hidden || this.disabled || !this.live || !this.arena.getClientRects().length) return;
      if (this.relief) {
        // le jeu dessine lui-même chaque image ; s'il est en pause (menu), on continue d'animer la carte
        if (this.relief.ready && this.relief.cam && now - this.relief.lastExternal > 100 && now - this.last > 33) {
          this.last = now;
          this.relief.render(this.relief.cam, now / 1000, this.animate);
        }
        return;
      }
      if (now - this.last < this.interval) return;
      const dt = Math.min(0.1, (now - this.last) / 1000);
      this.last = now;
      const began = performance.now();
      this.update(now / 1000, dt);
      this.renderer.render(this.live.scene, this.camera);
      this.guard(performance.now() - began);
    };
    requestAnimationFrame(tick);
  }

  // Surveille le coût d'une image : on ralentit puis on abandonne l'animation plutôt que de gêner le jeu.
  guard(ms) {
    this.cost = this.cost * 0.9 + ms * 0.1;
    this.frames += 1;
    if (this.frames < 40) return;
    if (this.cost > 40) this.disable("trop lent");
    else if (this.cost > 14) this.interval = 1000 / 12;
    else if (this.cost < 7) this.interval = 1000 / 24;
  }

  disable(reason) {
    if (this.disabled) return;
    this.disabled = true;
    this.running = false;
    this.dropRelief();
    this.host?.destroy();
    this.host = null;
    this.arena.classList.remove("map-live");
    this.canvas.remove();
    console.info("Carte vivante désactivée :", reason);
  }

  update(t, dt) {
    const { items } = this.live;
    const parts = this.parts;
    const gust = 0.75 + 0.5 * Math.sin(t * 0.35) * Math.sin(t * 0.13 + 1);

    // arbres : le feuillage se balance, le tronc bouge à peine
    for (const tree of items.trees) {
      const phase = tree.userData.phase;
      if (tree.userData.dead) {
        tree.rotation.z = Math.sin(t * 0.9 + phase) * 0.018 * gust;
        tree.rotation.x = Math.cos(t * 0.7 + phase) * 0.012 * gust;
        continue;
      }
      tree.traverse((node) => {
        const base = node.userData.sway;
        if (!base) return;
        node.position.x = base.x + Math.sin(t * 1.15 + phase + base.y * 0.5) * 0.065 * base.y * gust;
        node.position.z = base.z + Math.cos(t * 0.9 + phase * 1.3 + base.y * 0.4) * 0.05 * base.y * gust;
        node.position.y = base.y + Math.sin(t * 1.7 + phase + base.x) * 0.025;
      });
    }

    // fanions et flammes
    for (const flag of items.flags) {
      flag.rotation.z = Math.PI + Math.sin(t * 3.2 + flag.userData.k) * 0.3;
      flag.position.y = flag.userData.baseY + Math.sin(t * 2.4 + flag.userData.k) * 0.06;
    }
    for (const flame of items.flames) {
      const k = flame.userData.k;
      const flick = 1 + 0.2 * Math.sin(t * 11 + k) + 0.1 * Math.sin(t * 23 + k * 2);
      const base = flame.userData.baseScale;
      flame.scale.set(base.x * (1 + (flick - 1) * -0.4), base.y * flick, base.z * (1 + (flick - 1) * -0.4));
    }

    // lueurs
    for (const halo of parts.halos) {
      const flick = 0.5 + 0.1 * Math.sin(t * 13 + halo.phase) + 0.12 * Math.sin(t * 7.3 + halo.phase * 2) + 0.08 * Math.sin(t * 31 + halo.phase);
      halo.sprite.material.opacity = Math.max(0.2, flick);
    }

    // feuilles
    if (parts.leaves) {
      const dummy = new THREE.Object3D();
      parts.leaves.state.forEach((leaf, i) => {
        leaf.y -= leaf.fall * dt;
        leaf.x += (0.7 + Math.sin(t * 0.6 + leaf.phase) * 0.6) * gust * dt;
        leaf.z += Math.cos(t * 0.5 + leaf.phase) * 0.25 * dt;
        if (leaf.y < 0.05 || leaf.x > 19) {
          leaf.y = rand(6, 9);
          leaf.x = leaf.x > 19 ? -19 : rand(-19, 19);
          leaf.z = rand(-WORLD_D / 2, WORLD_D / 2);
        }
        dummy.position.set(leaf.x, leaf.y, leaf.z);
        dummy.rotation.set(t * leaf.spin + leaf.phase, t * leaf.spin * 0.7, Math.sin(t + leaf.phase));
        dummy.updateMatrix();
        parts.leaves.mesh.setMatrixAt(i, dummy.matrix);
      });
      parts.leaves.mesh.instanceMatrix.needsUpdate = true;
    }

    // lucioles
    for (const fire of parts.fires) {
      const s = t * fire.speed + fire.phase;
      if (fire.rising) {
        const rise = ((t * 0.5 * fire.speed + fire.phase) % 1);
        fire.sprite.position.set(fire.base.x + Math.sin(s * 2) * 0.5, 0.3 + rise * 5, fire.base.z + Math.cos(s) * 0.4);
        fire.sprite.material.opacity = Math.sin(rise * Math.PI) * 0.9;
      } else {
        fire.sprite.position.set(fire.base.x + Math.sin(s) * 1.6, fire.base.y + Math.sin(s * 1.7) * 0.5, fire.base.z + Math.cos(s * 0.8) * 1.2);
        fire.sprite.material.opacity = 0.25 + 0.65 * (0.5 + 0.5 * Math.sin(t * 2.4 + fire.phase * 3));
      }
    }

    // brume
    for (const mist of parts.mists) {
      mist.sprite.position.x += mist.speed * dt;
      if (mist.sprite.position.x > 18 + mist.size / 2) mist.sprite.position.x = -18 - mist.size / 2;
      if (mist.sprite.position.x < -18 - mist.size / 2) mist.sprite.position.x = 18 + mist.size / 2;
    }

    // fumée
    for (const puff of parts.puffs) {
      puff.life += puff.speed * dt;
      if (puff.life > 1) puff.life -= 1;
      const l = puff.life;
      puff.sprite.position.set(Math.sin(l * 3 + puff.speed * 9) * 0.15 + l * 0.5, l * 2.2, 0);
      const size = 0.35 + l * 1.1;
      puff.sprite.scale.set(size, size, 1);
      puff.sprite.material.opacity = Math.sin(l * Math.PI) * 0.34;
    }

    // chauves-souris : traversent la carte, ailes battantes, ombre au sol
    for (const holder of parts.bats) {
      const lane = holder.userData.lane;
      const span = 48;
      const x = -24 + ((t * lane.speed + lane.offset) % span);
      const z = lane.z + Math.sin(t * 0.7 + lane.offset) * lane.amp * 2;
      const y = lane.height + Math.sin(t * 1.9 + lane.offset) * 0.6;
      holder.position.set(x, 0, z);
      holder.userData.bat.position.y = y;
      holder.userData.bat.rotation.z = Math.sin(t * 1.9 + lane.offset) * 0.15;
      holder.userData.bat.rotation.y = -Math.PI / 2;
      const flap = Math.sin(t * 16 + lane.offset) * 0.85;
      for (const wing of holder.userData.wings) wing.rotation.z = wing.userData.side * flap;
      holder.userData.shadow.position.set(0.8, 0.03, 0.6);
      holder.visible = x > -19 && x < 19;
    }
  }
}

let instance = null;

function start() {
  if (instance || !webglAvailable()) return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  if (new URLSearchParams(location.search).get("live") === "0") return;
  const arena = document.querySelector(".arena");
  const world = arena?.querySelector(".world");
  if (!arena || !world) {
    setTimeout(start, 200);
    return;
  }
  try {
    instance = new LiveMap(arena, world);
  } catch (error) {
    console.warn("Carte vivante impossible", error);
  }
}

window.MapLive = { start, frame: (cam) => instance?.frame(cam), get instance() { return instance; } };
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
else start();

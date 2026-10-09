// Carte en vrai relief : le sol (image) et le décor (maisons, voitures, arbres...) sont rendus par Three.js avec une
// vraie caméra en perspective, strictement équivalente à la caméra CSS du jeu (même centre, même inclinaison, même zoom).
//
// Astuce de cohérence : les personnages sont posés à plat sur le plan de l'image. Chaque objet est donc « cisaillé » dans
// le vertex shader pour que son pied reste dans ce plan (profondeur 0) et que seule sa hauteur sorte vers la caméra :
//   Q = (x, y·cos(52°) − z·sin(52°), y·sin(52°))     (x, y, z = monde ; Q = plan de l'image + profondeur)
// Les empreintes au sol, les collisions et les héros restent alignés ; les toits, eux, bougent en parallaxe.
import { THREE, stylize, GRADIENT, allActors } from "./core.js?v=53";
import { WORLD_W, SCREEN_H } from "./maps.js?v=53";

const PITCH = (52 * Math.PI) / 180;
const RSIN = Math.sin(PITCH).toFixed(8);
const RCOS = Math.cos(PITCH).toFixed(8);
const SIN = Math.sin(PITCH);
const COS = Math.cos(PITCH);

// uniformes partagés par tous les matériaux du relief
// uPlayer : x, y = position du joueur dans la scène (sol), z = force avec laquelle il bouscule le maïs (0 = immobile loin, 1 = en marche)
// uShear : (plan par unité de hauteur, profondeur par unité de hauteur). Vue de dessus d'origine : (cos 52°, sin 52°) ; caméra à la 3e personne : (0, 1) = vraie verticale.
const U = { uTime: { value: 0 }, uGust: { value: 1 }, uPlayer: { value: new THREE.Vector3(0, 0, 0) }, uShear: { value: new THREE.Vector2(COS, SIN) }, uFade: { value: new THREE.Vector2(0, 0) }, uHole: { value: new THREE.Vector4(0, 0, 0, -1) } };

const PROJECT = `
  vec4 mvPosition = vec4( transformed, 1.0 );
  #ifdef USE_INSTANCING
    mvPosition = instanceMatrix * mvPosition;
  #endif
  vec4 reliefWorld = modelMatrix * mvPosition;
  vec3 reliefQ = vec3( reliefWorld.x, reliefWorld.y * uShear.x - reliefWorld.z * ${RSIN}, reliefWorld.y * uShear.y );
  gl_Position = projectionMatrix * viewMatrix * vec4( reliefQ, 1.0 );
  vReliefCam = distance( reliefQ, cameraPosition );
  mvPosition = vec4( -( viewMatrix * vec4( 0.0, ${RSIN}, ${RCOS}, 0.0 ) ).xyz * 80.0, 1.0 );
`;

const SWAY = `
  #ifdef RELIEF_CORN
    // maïs : léger balancement du vent + les tiges s'écartent et frémissent autour du joueur
    vec4 cornWorld = modelMatrix * vec4( transformed, 1.0 );
    float cornH = max( transformed.y, 0.0 );
    vec2 cornAway = cornWorld.xz - uPlayer.xy;
    float cornDist = length( cornAway );
    float cornPush = ( 1.0 - smoothstep( 0.2, 2.7, cornDist ) ) * uPlayer.z;
    vec2 cornDir = cornAway / max( cornDist, 0.001 );
    float cornWind = sin( uTime * 1.5 + cornWorld.x * 1.3 + cornWorld.z * 0.8 ) * 0.045 * cornH * uGust;
    float cornShake = sin( uTime * 17.0 + cornWorld.x * 6.0 + cornWorld.z * 4.0 ) * cornPush * 0.09 * cornH;
    transformed.x += cornWind + cornDir.x * cornPush * cornH * 0.5 + cornShake;
    transformed.z += cornDir.y * cornPush * cornH * 0.5 + cos( uTime * 15.0 + cornWorld.z * 5.0 ) * cornPush * 0.06 * cornH;
    transformed.y -= cornPush * cornH * 0.1;
  #endif
  #ifdef RELIEF_SWAY
    float swayH = max( transformed.y, 0.0 );
    transformed.x += sin( uTime * 1.15 + aPhase + swayH * 0.5 ) * 0.065 * swayH * uGust;
    transformed.z += cos( uTime * 0.9 + aPhase * 1.3 + swayH * 0.4 ) * 0.05 * swayH * uGust;
    transformed.y += sin( uTime * 1.7 + aPhase + transformed.x ) * 0.025;
  #endif
`;

function patchMesh(material, key, { emissiveBoost = false, hole = true } = {}) {
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous?.call(material, shader, renderer);
    shader.uniforms.uTime = U.uTime;
    shader.uniforms.uGust = U.uGust;
    shader.uniforms.uPlayer = U.uPlayer;
    shader.uniforms.uShear = U.uShear;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying float vReliefCam;\nuniform vec2 uShear;\nuniform float uTime;\nuniform float uGust;\nuniform vec3 uPlayer;\n#ifdef RELIEF_SWAY\nattribute float aPhase;\n#endif")
      .replace("#include <begin_vertex>", `#include <begin_vertex>\n${SWAY}`)
      .replace("#include <project_vertex>", PROJECT);
    shader.uniforms.uFade = U.uFade;
    shader.uniforms.uHole = U.uHole;
    // ce qui passe tout près de la caméra (cimes d'arbres, toits) s'efface en trame pour ne pas cacher le joueur
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying float vReliefCam;\nuniform vec2 uFade;\nuniform vec4 uHole;")
      .replace("#include <clipping_planes_fragment>", `#include <clipping_planes_fragment>
        float reliefFade = clamp( ( vReliefCam - uFade.x ) / max( uFade.y - uFade.x, 0.0001 ), 0.0, 1.0 );
        ${hole ? `// ce qui cache le joueur (toit, tronc) s'efface en trame autour de lui
        if ( uHole.w > 0.0 && vReliefCam < uHole.w ) reliefFade = min( reliefFade, smoothstep( uHole.z * 0.55, uHole.z, length( gl_FragCoord.xy - uHole.xy ) ) );` : ""}
        if ( reliefFade < 1.0 && fract( 52.9829189 * fract( dot( gl_FragCoord.xy, vec2( 0.06711056, 0.00583715 ) ) ) ) > reliefFade ) discard;`);
    if (emissiveBoost) {
      shader.fragmentShader = shader.fragmentShader.replace("#include <color_fragment>", "#include <color_fragment>\ntotalEmissiveRadiance += diffuseColor.rgb * 0.1;");
    }
  };
  material.customProgramCacheKey = () => `ov-relief-${key}`;
  material.userData.relief = true;
  return material;
}

function patchSprite(material) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uShear = U.uShear;
    shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nuniform vec2 uShear;").replace(
      "vec4 mvPosition = modelViewMatrix[ 3 ];",
      `vec4 reliefW = modelMatrix[ 3 ];
       vec3 reliefQ = vec3( reliefW.x, reliefW.y * uShear.x - reliefW.z * ${RSIN}, reliefW.y * uShear.y );
       vec4 mvPosition = viewMatrix * vec4( reliefQ, 1.0 );`,
    );
  };
  material.customProgramCacheKey = () => "ov-relief-sprite";
  material.userData.relief = true;
}

const cache = new Map();
function mergedMaterial(kind, sway, opacity, corn = false) {
  const key = `${kind}|${sway ? "s" : ""}${corn ? "c" : ""}|${opacity}`;
  let material = cache.get(key);
  if (material) return material;
  if (kind === "toon" || kind === "toon2") {
    material = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: GRADIENT, side: kind === "toon2" ? THREE.DoubleSide : THREE.FrontSide });
    stylize(material);
    patchMesh(material, key, { emissiveBoost: true });
  } else if (kind === "hull") {
    material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide });
    patchMesh(material, key);
  } else {
    material = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: opacity < 1, opacity, depthWrite: opacity >= 1 });
    patchMesh(material, key);
  }
  if (sway) material.defines = { RELIEF_SWAY: "" };
  if (corn) material.defines = { RELIEF_CORN: "" };
  cache.set(key, material);
  return material;
}

// matériau partagé d'origine -> copie adaptée au relief (on ne touche jamais aux matériaux des personnages)
const clones = new Map();
function looseMaterial(source) {
  if (source.userData.relief) return source;
  let copy = clones.get(source);
  if (copy) return copy;
  copy = source.clone();
  copy.onBeforeCompile = source.onBeforeCompile;
  patchMesh(copy, `loose-${source.type}-${source.side}-${source.uuid}`, { emissiveBoost: false });
  clones.set(source, copy);
  return copy;
}

// ---------- Personnages dans la carte (vue à la 3e personne) ----------
// Les modèles 3D quittent leur petit canvas : ils vivent dans la même scène que le décor (occlusion, vraie rotation).
// Leurs matériaux reçoivent la même projection que le décor ; un programme par type de matériau suffit (la couleur est un uniforme).
const actorClones = new Map();
function actorMaterial(source) {
  if (source.userData.relief) return source;
  let copy = actorClones.get(source);
  if (copy) return copy;
  copy = source.clone();
  copy.onBeforeCompile = source.onBeforeCompile;
  patchMesh(copy, `actor-${source.type}-${source.side}-${source.onBeforeCompile ? "s" : "n"}`, { emissiveBoost: false, hole: false });
  actorClones.set(source, copy);
  return copy;
}

function adaptActor(root) {
  root.traverse((node) => {
    node.frustumCulled = false;
    if (!node.isMesh || node.userData.worldOrig) return;
    node.userData.worldOrig = node.material;
    node.material = Array.isArray(node.material) ? node.material.map(actorMaterial) : actorMaterial(node.material);
  });
}

function restoreActor(root) {
  root.traverse((node) => {
    if (!node.isMesh || !node.userData.worldOrig) return;
    node.material = node.userData.worldOrig;
    delete node.userData.worldOrig;
  });
}

// flash blanc quand un personnage est touché (les matériaux sont partagés : on les échange le temps du flash)
let flashMaterial = null;
function flashActor(root, on) {
  if (on && !flashMaterial) {
    flashMaterial = patchMesh(new THREE.MeshBasicMaterial({ color: 0xfff1e0 }), "actor-flash", { emissiveBoost: false, hole: false });
  }
  root.traverse((node) => {
    if (!node.isMesh || !node.userData.worldOrig) return;
    if (on) {
      if (node.userData.flashPrev || node.userData.worldOrig.side === THREE.BackSide || node.userData.worldOrig.map || node.userData.worldOrig.transparent || Array.isArray(node.material)) return;
      node.userData.flashPrev = node.material;
      node.material = flashMaterial;
    } else if (node.userData.flashPrev) {
      node.material = node.userData.flashPrev;
      delete node.userData.flashPrev;
    }
  });
}

const ACTOR_HOOKS = { adapt: adaptActor, restore: (root) => { flashActor(root, false); restoreActor(root); }, flash: flashActor };
const WORLD_ACTORS = 26;                // au-delà, les plus lointains restent de simples vignettes 2D

function adapt(scene) {
  scene.traverse((node) => {
    node.frustumCulled = false;
    if (node.isSprite) {
      if (!node.material.userData.relief) patchSprite(node.material);
      return;
    }
    if (!node.isMesh) return;
    const kind = node.userData.reliefKind;
    if (kind && kind !== "loose") node.material = mergedMaterial(kind, node.userData.swayShader, node.userData.opacity ?? 1, node.userData.corn);
    else if (Array.isArray(node.material)) node.material = node.material.map(looseMaterial);
    else node.material = looseMaterial(node.material);
  });
}

// Canvas + moteur WebGL partagés entre les cartes : les shaders ne sont compilés qu'une seule fois.
export function createReliefHost(arena, world, onLost) {
  const canvas = document.createElement("canvas");
  canvas.className = "map-relief-canvas";
  canvas.setAttribute("aria-hidden", "true");
  arena.insertBefore(canvas, world);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    onLost();
  });
  return { canvas, renderer, destroy() { canvas.remove(); renderer.dispose(); } };
}

// Reflets de la mer : petits arcs clairs sur une texture qui se répète, dessinée autour de l'île (masque = eau).
let rippleCanvas = null;
function rippleTexture() {
  if (!rippleCanvas) {
    const size = 256;
    rippleCanvas = document.createElement("canvas");
    rippleCanvas.width = size;
    rippleCanvas.height = size;
    const ctx = rippleCanvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, size, size);
    ctx.lineCap = "round";
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 34; i += 1) {
      const x = rnd() * size;
      const y = rnd() * size;
      const len = 10 + rnd() * 22;
      ctx.strokeStyle = `rgba(255,255,255,${0.35 + rnd() * 0.5})`;
      ctx.lineWidth = 1.5 + rnd() * 1.5;
      for (const dx of [-size, 0, size]) {
        for (const dy of [-size, 0, size]) {
          ctx.beginPath();
          ctx.moveTo(x + dx - len, y + dy);
          ctx.quadraticCurveTo(x + dx, y + dy - 4, x + dx + len, y + dy);
          ctx.stroke();
        }
      }
    }
  }
  const texture = new THREE.CanvasTexture(rippleCanvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Bord du sol en fondu : la mer (ou le vide) qui s'étend à l'infini prend le relais sans coupure visible.
function featherTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 72;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 128, 72);
  ctx.filter = "blur(5px)";
  ctx.fillStyle = "#fff";
  ctx.fillRect(10, 8, 108, 56);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  return texture;
}

// Plan immense sous la carte, jusqu'à l'horizon : mer profonde autour d'une île, vide sombre sinon. Il s'efface avec la distance.
function horizonPlane(island) {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uNear: { value: new THREE.Color(island ? 0x24668a : 0x241426) },
      uFar: { value: new THREE.Color(island ? 0x14234a : 0x0e0814) },
      uTime: U.uTime,
    },
    vertexShader: "varying vec2 vXY;\nvoid main() {\n  vXY = position.xy;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
    fragmentShader: `
      varying vec2 vXY;
      uniform vec3 uNear;
      uniform vec3 uFar;
      uniform float uTime;
      void main() {
        float d = length( vXY * vec2( 1.0, 1.6 ) );
        vec3 color = mix( uNear, uFar, smoothstep( 14.0, 110.0, d ) );
        // reflets de vagues très discrets : lignes qui s'étirent avec la distance
        float wave = sin( vXY.y * 1.6 + uTime * 0.7 + sin( vXY.x * 0.35 ) * 2.0 ) * 0.5 + 0.5;
        color += ${island ? "vec3( 0.05, 0.1, 0.12 ) * wave * ( 1.0 - smoothstep( 20.0, 130.0, d ) )" : "vec3( 0.0 )"};
        float alpha = 1.0 - smoothstep( 150.0, 420.0, d );
        gl_FragColor = vec4( color, alpha );
      }`,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), material);
  plane.position.z = -0.05;
  plane.renderOrder = -12;
  plane.frustumCulled = false;
  return plane;
}

export class Relief {
  constructor(host, built, id, hooks) {
    this.host = host;
    this.canvas = host.canvas;
    this.renderer = host.renderer;
    this.built = built;
    this.id = id;
    this.hooks = hooks;
    this.ready = false;
    this.disposed = false;
    this.frames = 0;
    this.cost = 0;
    this.scale = Math.min(window.devicePixelRatio || 1, 1.5);
    this.last = performance.now();
    this.lastExternal = 0;
    this.cam = null;
    this.camera = new THREE.PerspectiveCamera(40, 1, 1, 400);
    adapt(built.scene);
  }

  // Charge l'image du sol (avec les ombres déjà peintes), compile les shaders sans bloquer le jeu, puis affiche la carte.
  load(url) {
    return new Promise((resolve, reject) => {
      new THREE.TextureLoader().load(url, async (texture) => {
        if (this.disposed) return;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
        const ext = this.built.ext ?? 1;
        const island = Boolean(this.built.map && !this.built.map.plain);
        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(WORLD_W * ext, SCREEN_H * ext),
          new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, transparent: island, alphaMap: island ? featherTexture() : null }),
        );
        ground.renderOrder = -10;
        this.built.scene.add(ground);
        this.ground = ground;
        this.horizon = horizonPlane(island);
        this.built.scene.add(this.horizon);
        this.sea = [];
        if (this.built.water) {
          const mask = new THREE.CanvasTexture(this.built.water);
          for (const [repeat, speed] of [[[9, 5], [0.012, 0.006]], [[13, 7], [-0.008, 0.01]]]) {
            const ripple = rippleTexture();
            ripple.repeat.set(repeat[0], repeat[1]);
            const layer = new THREE.Mesh(
              new THREE.PlaneGeometry(WORLD_W * ext, SCREEN_H * ext),
              new THREE.MeshBasicMaterial({ map: ripple, alphaMap: mask, color: 0xbfeaff, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }),
            );
            layer.position.z = 0.02;
            layer.renderOrder = -9;
            this.built.scene.add(layer);
            this.sea.push({ ripple, speed, layer });
          }
        }
        try {
          if (this.cam) this.setCamera(this.cam);
          await this.renderer.compileAsync(this.built.scene, this.camera);
        } catch (error) {
          console.info("Compilation anticipée impossible", error);
        }
        if (this.disposed) return;
        this.ready = true;
        resolve();
      }, undefined, reject);
    });
  }

  setCamera(cam) {
    const pxPerUnit = cam.mapW / WORLD_W;
    const fx = (cam.fx / cam.mapW - 0.5) * WORLD_W;
    const fy = (0.5 - cam.fy / cam.mapH) * SCREEN_H;
    const tilt = (cam.tilt * Math.PI) / 180;
    const distance = cam.persp / (cam.zoom * pxPerUnit);
    const camera = this.camera;
    camera.fov = (2 * Math.atan(cam.viewH / 2 / cam.persp) * 180) / Math.PI;
    camera.aspect = cam.viewW / cam.viewH;
    // en vue à la 3e personne, ce qui passe très près de la caméra (cimes d'arbres) est coupé pour ne pas cacher le joueur
    camera.near = distance * (cam.tps ? 0.2 : 0.15);
    U.uFade.value.set(cam.tps ? distance * 0.42 : 0, cam.tps ? distance * 0.72 : 0);
    camera.far = distance * 3;
    // caméra orbitale : derrière le point suivi (lacet = direction regardée), inclinée de `tilt` par rapport à la verticale
    const yaw = ((cam.yaw ?? 0) * Math.PI) / 180;
    const back = distance * Math.sin(tilt);
    camera.position.set(fx + Math.sin(yaw) * back, fy - Math.cos(yaw) * back, distance * Math.cos(tilt));
    camera.rotation.set(tilt, 0, yaw, "ZXY");
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
  }

  resize(cam) {
    const width = Math.max(2, Math.round(cam.viewW * this.scale));
    const height = Math.max(2, Math.round(cam.viewH * this.scale));
    if (this.canvas.width === width && this.canvas.height === height) return;
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(width, height, false);
  }

  // Place les personnages proches dans la scène (vue 3e personne) ; les autres gardent leur canvas.
  syncActors(cam, dt) {
    this.worldActors ??= new Set();
    if (!cam.tps || cam.px === undefined) {
      this.releaseActors();
      return;
    }
    const pxPerUnit = cam.mapW / WORLD_W;
    const candidates = [];
    for (const actor of allActors()) {
      if (actor.failed || !actor.canvas.isConnected) continue;
      const owner = actor.owner();
      if (!owner || owner.classList.contains("enemy-dying") || !(owner.classList.contains("player") || owner.classList.contains("enemy"))) continue;
      const x = parseFloat(owner.style.left);
      const y = parseFloat(owner.style.top);
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      candidates.push({ actor, owner, x, y, d: Math.hypot(x - cam.px, y - cam.py) - (owner.classList.contains("player") ? 1e6 : 0) });
    }
    candidates.sort((a, b) => a.d - b.d);
    const keep = new Set();
    candidates.forEach((entry, rank) => {
      const { actor } = entry;
      if (rank < WORLD_ACTORS || (actor.inWorld && rank < WORLD_ACTORS + 6)) {
        keep.add(actor);
        this.placeActor(entry, cam, pxPerUnit, dt);
      }
    });
    this.updateHole(cam, pxPerUnit, candidates[0]);
    for (const actor of [...this.worldActors]) {
      if (keep.has(actor)) continue;
      actor.leaveWorld();
      this.worldActors.delete(actor);
    }
  }

  placeActor({ actor, owner, x, y }, cam, pxPerUnit, dt) {
    if (!actor.inWorld) {
      actor.enterWorld(this.built.scene, ACTOR_HOOKS);
      this.worldActors.add(actor);
    }
    const canvasHeight = actor.canvas.offsetHeight || 100;
    const frameHeight = actor.model.frame?.height ?? 2.2;
    const unit = (canvasHeight / (1.08 * frameHeight)) * (cam.actorS ?? 0.72) / pxPerUnit;
    const holder = actor.holder;
    holder.scale.set(unit, unit, unit / SIN);
    holder.position.set((x / cam.mapW - 0.5) * WORLD_W, 0, ((y / cam.mapH - 0.5) * SCREEN_H) / SIN);
    holder.updateMatrixWorld(true);
    // la pastille 2D (barre de vie, noms) est remontée pour se poser sur la tête du modèle
    const lift = Math.round(0.46 * canvasHeight * (cam.actorS ?? 0.72));
    if (actor.lift !== lift) {
      actor.lift = lift;
      owner.style.setProperty("--lift", `${lift}px`);
    }
    actor.tickWorld(dt);
  }

  // Trou en trame autour du joueur : centre et rayon à l'écran (pixels du canvas) + distance du joueur à la caméra.
  updateHole(cam, pxPerUnit, entry) {
    const hole = U.uHole.value;
    hole.w = -1;
    if (!entry?.actor?.inWorld || !entry.owner.classList.contains("player")) return;
    const unit = entry.actor.holder.scale.x;
    const heroH = unit * (entry.actor.model.frame?.height ?? 2.2) * 0.9;
    const qx = (entry.x / cam.mapW - 0.5) * WORLD_W;
    const qy = (0.5 - entry.y / cam.mapH) * SCREEN_H;
    const mid = new THREE.Vector3(qx, qy, heroH * 0.5);
    const foot = new THREE.Vector3(qx, qy, 0);
    const head = new THREE.Vector3(qx, qy, heroH);
    const w = this.canvas.width;
    const h = this.canvas.height;
    const toPx = (v) => {
      const p = v.clone().project(this.camera);
      return [(p.x * 0.5 + 0.5) * w, (p.y * 0.5 + 0.5) * h];
    };
    const [mx, my] = toPx(mid);
    const [fx, fy] = toPx(foot);
    const [hx, hy] = toPx(head);
    hole.set(mx, my, Math.max(40 * this.scale, Math.hypot(hx - fx, hy - fy) * 0.95), this.camera.position.distanceTo(mid) - heroH * 0.7);
  }

  releaseActors() {
    U.uHole.value.w = -1;
    for (const actor of this.worldActors ?? []) actor.leaveWorld();
    this.worldActors?.clear();
  }

  // Une zone n'est dessinée que si sa boîte englobante (cisaillée comme dans le shader) touche l'écran.
  cull() {
    const pv = new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    const corner = new THREE.Vector3();
    const test = (box) => {
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (let i = 0; i < 8; i += 1) {
        const x = i & 1 ? box.max.x : box.min.x;
        const y = i & 2 ? box.max.y : box.min.y;
        const z = i & 4 ? box.max.z : box.min.z;
        corner.set(x, y * U.uShear.value.x - z * SIN, y * U.uShear.value.y).applyMatrix4(pv);
        minX = Math.min(minX, corner.x);
        maxX = Math.max(maxX, corner.x);
        minY = Math.min(minY, corner.y);
        maxY = Math.max(maxY, corner.y);
      }
      return maxX > -1.08 && minX < 1.08 && maxY > -1.08 && minY < 1.08;
    };
    for (const chunk of this.built.items.chunks) chunk.visible = test(chunk.userData.box);
    for (const tree of this.built.items.trees) tree.visible = test(tree.userData.box);
  }

  render(cam, seconds, animate) {
    if (!this.ready || this.disposed) return;
    this.cam = cam;
    U.uShear.value.set(cam.tps ? 0 : COS, cam.tps ? 1 : SIN);
    this.lastExternal = performance.now();
    const began = performance.now();
    const dt = Math.min(0.1, Math.max(0, (began - this.last) / 1000));
    if (dt < 0.002) return;                                   // plusieurs appels dans la même image : on ne redessine pas
    this.last = began;
    U.uTime.value = seconds;
    for (const { ripple, speed } of this.sea ?? []) ripple.offset.set(seconds * speed[0], seconds * speed[1]);
    U.uGust.value = 0.75 + 0.5 * Math.sin(seconds * 0.35) * Math.sin(seconds * 0.13 + 1);
    if (cam.px !== undefined) {
      U.uPlayer.value.set((cam.px / cam.mapW - 0.5) * WORLD_W, ((cam.py / cam.mapH - 0.5) * SCREEN_H) / SIN, cam.rustle ?? 0);
    }
    animate(seconds, dt);
    this.resize(cam);
    this.setCamera(cam);
    this.syncActors(cam, dt);
    this.cull();
    this.renderer.render(this.built.scene, this.camera);
    if (!this.shown) {
      this.shown = true;
      this.hooks.shown();
    }
    this.guard(performance.now() - began);
  }

  // Coût CPU moyen d'une image : on baisse la résolution, puis on abandonne le relief si la machine ne suit pas.
  guard(ms) {
    this.frames += 1;
    if (this.frames < 40) return;
    this.cost = this.cost * 0.92 + ms * 0.08;
    if (this.frames % 60 !== 0) return;
    if (this.cost > 14 && this.scale > 0.7) this.scale = Math.max(0.7, this.scale * 0.8);
    else if (this.cost > 22) this.hooks.failed("trop lent");
  }

  dispose() {
    this.disposed = true;
    this.releaseActors();
    this.ground?.material.map?.dispose();
    this.ground?.material.dispose();
    this.ground?.geometry.dispose();
    this.ground?.material.alphaMap?.dispose();
    this.horizon?.material.dispose();
    this.horizon?.geometry.dispose();
    for (const { ripple, layer } of this.sea ?? []) {
      ripple.dispose();
      layer.material.alphaMap?.dispose();
      layer.material.dispose();
      layer.geometry.dispose();
    }
    this.built.scene.traverse((node) => {
      if (node.isMesh && node.userData.reliefKind) node.geometry.dispose();
    });
  }
}

// Point d'entrée : expose window.Actor3D au script principal (héros, sbires, boss, armes en 3D Three.js).
import { Actor, actorOf, copyCanvasPixels, startLoop, webglAvailable } from "./core.js?v=53";
import { buildHero, hasHero } from "./heroes.js?v=53";
import { buildEnemy, hasEnemy, isBossArt } from "./enemies.js?v=53";
import { hasWeapon } from "./weapons.js?v=53";
import "./maplive.js?v=53";   // carte vivante (arbres, feuilles, lueurs…) par-dessus l'image de fond

const RATIO = 0.8;

function modelFor(artName) {
  if (artName.startsWith("heros/")) {
    const name = artName.slice(6);
    return hasHero(name) ? { model: buildHero(name), size: "w", hero: true } : null;
  }
  if (hasEnemy(artName)) return { model: buildEnemy(artName), size: isBossArt(artName) ? "l" : "s", hero: false };
  return null;
}

const api = {
  ready: false,
  // Remplace les calques 2D du rig par un canvas 3D. Renvoie false pour garder l'ancien rendu.
  mount(rig, artName) {
    if (!webglAvailable()) return false;
    const existing = rig.querySelector(":scope > canvas.actor3d-canvas");
    if (existing && rig.dataset.art === artName) {
      const actor = actorOf(existing);
      if (actor) return true;
      // canvas cloné (cadavre, aperçu) : on le reconstruit
    }
    let built;
    try {
      built = modelFor(artName);
    } catch (error) {
      console.warn("Modèle 3D indisponible", artName, error);
      return false;
    }
    if (!built) return false;
    const live = !built.hero || Boolean(rig.closest(".player"));
    const actor = new Actor(built.model, {
      size: built.size,
      interval: built.hero ? (live ? 16 : 50) : 33,
      animated: true,
    });
    rig.dataset.art = artName;
    rig.dataset.actor3d = built.hero ? "hero" : "enemy";
    rig.style.setProperty("--rig-ratio", String(RATIO));
    rig.classList.add("rig-3d");
    rig.classList.remove("rig-limbs", "rig-wings");
    rig.replaceChildren(actor.canvas);
    return true;
  },
  has(artName) {
    return artName.startsWith("heros/") ? hasHero(artName.slice(6)) : hasEnemy(artName);
  },
  hasWeapon,
  setWeapon(rig, weaponId, coating) {
    const canvas = rig.querySelector(":scope > canvas.actor3d-canvas");
    const actor = canvas && actorOf(canvas);
    if (!actor || !actor.model.setWeapon) return false;
    if (actor.weaponKey === `${weaponId}|${coating}`) return true;
    actor.weaponKey = `${weaponId}|${coating}`;
    actor.setWeapon(hasWeapon(weaponId) ? weaponId : null, coating);
    return true;
  },
  // Copie l'image actuelle (utile pour les cadavres clonés qui jouent leur animation de mort).
  freezeClone(original, clone) {
    const from = original.querySelectorAll("canvas.actor3d-canvas");
    const to = clone.querySelectorAll("canvas.actor3d-canvas");
    from.forEach((canvas) => actorOf(canvas)?.snapshot());   // modèle posé dans la carte : on le repasse un instant dans son canvas
    from.forEach((canvas, index) => {
      if (to[index]) {
        to[index].classList.remove("in-world");
        copyCanvasPixels(canvas, to[index]);
      }
    });
  },
};

window.Actor3D = api;
startLoop();
api.ready = true;
window.dispatchEvent(new Event("actor3d-ready"));

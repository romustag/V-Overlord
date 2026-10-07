const db = firebase.firestore();
const player = document.querySelector("#player");
const arena = document.querySelector(".arena");
const world = document.createElement("div");
world.className = "world";
arena.prepend(world);
world.append(document.querySelector(".throne-room"), player);
const camera = { zoom: 1.6 };
const atmosphereParticles = document.querySelector("#atmosphere-particles");
const damageVignette = document.querySelector("#damage-vignette");
const timerDisplay = document.querySelector("#timer");
const roundMessage = document.querySelector("#round-message");
const waveCountdownDisplay = document.querySelector("#wave-countdown");
const waveCountdownNumber = document.querySelector("#wave-countdown-number");
const waveCountdownLabel = document.querySelector("#wave-countdown-label");
const gameOver = document.querySelector("#game-over");
const gameOverTitle = document.querySelector("#game-over-title");
const retryButton = document.querySelector("#retry-button");
const shopButton = document.querySelector("#shop-button");
const frontMenu = document.querySelector("#front-menu");
const loadoutScreen = document.querySelector("#loadout-screen");
const shopScreen = document.querySelector("#shop-screen");
const menuTitle = document.querySelector("#menu-title");
const menuCoins = document.querySelector("#menu-coins");
const loadoutPreviewContent = document.querySelector("#loadout-preview-content");
const playerNameInput = document.querySelector("#player-name-input");
const playerNameFeedback = document.querySelector("#player-name-feedback");
const startButton = document.querySelector("#start-button");
const backToMenuButton = document.querySelector("#back-to-menu-button");
const openLockerButton = document.querySelector("#open-locker-button");
const lockerScreen = document.querySelector("#locker-screen");
const lockerTabs = [...document.querySelectorAll(".locker-tab")];
const lockerPanels = [...document.querySelectorAll(".locker-panel")];
const lockerSlotsList = document.querySelector("#locker-slots");
const lockerPickerTitle = document.querySelector("#locker-picker-title");
const lockerPickerCount = document.querySelector("#locker-picker-count");
const lockerPickerGrid = document.querySelector("#locker-picker-grid");
const lockerDetails = document.querySelector("#locker-details");
const lockerStageHero = document.querySelector("#locker-stage-hero");
const lockerStageInfo = document.querySelector("#locker-stage-info");
const upgradeWeaponsGrid = document.querySelector("#upgrade-weapons");
const upgradePowersGrid = document.querySelector("#upgrade-powers");
const upgradeBench = document.querySelector("#upgrade-bench");
const lockerItems = document.querySelector("#locker-items");
const lockerCraftingItems = document.querySelector("#locker-crafting-items");
const backFromLockerButton = document.querySelector("#back-from-locker-button");
const shopSummary = document.querySelector("#shop-summary");
const shopItems = document.querySelector("#shop-items");
const shopCatalogItems = document.querySelector("#shop-catalog-items");
const shopTabs = document.querySelector("#shop-tabs");
const shopTabNote = document.querySelector("#shop-tab-note");
const shopHideOwned = document.querySelector("#shop-hide-owned");
const shopSort = document.querySelector("#shop-sort");
const shopRotationCountdown = document.querySelector("#shop-rotation-countdown");
const shopRotationNote = document.querySelector("#shop-rotation-note");
const useBoostButton = document.querySelector("#use-boost-button");
const usePowerButton = document.querySelector("#use-power-button");
const combatPowerName = document.querySelector("#combat-power-name");
const combatPowerDetail = document.querySelector("#combat-power-detail");
const combatPowerIcon = document.querySelector("#combat-power-icon");
const combatWeaponIcon = document.querySelector("#combat-weapon-icon");
const combatWeaponName = document.querySelector("#combat-weapon-name");
const combatWeaponDetail = document.querySelector("#combat-weapon-detail");
const combatBoostIcon = document.querySelector("#combat-boost-icon");
const combatBoostName = document.querySelector("#combat-boost-name");
const combatBoostDetail = document.querySelector("#combat-boost-detail");
const progressionFeedback = document.querySelector("#progression-feedback");
const playerHealthBar = document.querySelector("#player-health");
const playerHearts = [...document.querySelectorAll("#player-hearts .hud-heart")];
const playerHealthValue = document.querySelector("#player-health-value");
const runTimeDisplay = document.querySelector("#run-time");
const combatWeaponArt = document.querySelector("#combat-weapon-art");
const combatWeaponBadge = document.querySelector("#combat-weapon-badge");
const combatRangedSlot = document.querySelector("#combat-ranged-slot");
const combatMeleeSlot = document.querySelector("#combat-melee-slot");
const combatMeleeArt = document.querySelector("#combat-melee-art");
const combatMeleeBadge = document.querySelector("#combat-melee-badge");
const combatMeleeName = document.querySelector("#combat-melee-name");
const combatMeleeDetail = document.querySelector("#combat-melee-detail");
const combatPowerTimer = document.querySelector("#combat-power-timer");
const combatBoostBadge = document.querySelector("#combat-boost-badge");
const combatBoostTimer = document.querySelector("#combat-boost-timer");
const masterSoundToggle = document.querySelector("#master-toggle");
const soundToggle = document.querySelector("#sound-toggle");
const musicToggle = document.querySelector("#music-toggle");
const settingsPanel = document.querySelector("#settings-panel");
const settingsOpenButtons = [...document.querySelectorAll(".settings-open-button")];
const settingsCloseButton = document.querySelector("#settings-close");
const settingsDoneButton = document.querySelector("#settings-done");
const settingsResetButton = document.querySelector("#settings-reset");
const settingsTabs = [...document.querySelectorAll(".settings-tab")];
const settingsSections = [...document.querySelectorAll(".settings-section")];
const settingsGiveTab = document.querySelector("#settings-give-tab");
const settingsGiftForm = document.querySelector("#settings-gift-form");
const settingsGiftPseudo = document.querySelector("#settings-gift-pseudo");
const settingsGiftCoins = document.querySelector("#settings-gift-coins");
const settingsGiftKind = document.querySelector("#settings-gift-kind");
const settingsGiftItem = document.querySelector("#settings-gift-item");
const settingsGiftCount = document.querySelector("#settings-gift-count");
const settingsGiftStatus = document.querySelector("#settings-gift-status");
const adminPanel = document.querySelector("#admin-panel");
const adminPanelClose = document.querySelector("#admin-panel-close");
const adminGiftForm = document.querySelector("#admin-gift-form");
const adminPlayer = document.querySelector("#admin-player");
const adminCoins = document.querySelector("#admin-coins");
const adminItemId = document.querySelector("#admin-item-id");
const adminItemName = document.querySelector("#admin-item-name");
const adminCount = document.querySelector("#admin-count");
const adminStatus = document.querySelector("#admin-status");
const adminGiveCoins = document.querySelector("#admin-give-coins");
const adminGiveItem = document.querySelector("#admin-give-item");
const giftCountableKinds = new Set(["boosts", "relics"]);
let hostGiftCatalog = null;
const settingsKeysList = document.querySelector("#settings-keys");
const volumeSliders = {
  master: document.querySelector("#volume-master"),
  music: document.querySelector("#volume-music"),
  effects: document.querySelector("#volume-effects"),
};
const volumeOutputs = {
  master: document.querySelector("#volume-master-value"),
  music: document.querySelector("#volume-music-value"),
  effects: document.querySelector("#volume-effects-value"),
};
const autoShootToggle = document.querySelector("#auto-shoot-toggle");
const controlsHint = document.querySelector("#controls-hint");
const waveDisplay = document.querySelector("#wave-display");
const playerNameDisplay = document.querySelector("#player-name-display");
const playerNameTag = document.querySelector("#player-name-tag");
const hudCoins = document.querySelector("#hud-coins");
const hudXp = document.querySelector("#hud-xp");
const hudXpFill = document.querySelector("#hud-xp-fill");
const hudXpLevel = document.querySelector("#hud-xp-level");
const bossEtaDisplay = document.querySelector("#boss-eta");
const gameOverXp = document.querySelector("#game-over-xp");
const menuLevel = document.querySelector("#menu-level");
const menuXpFill = document.querySelector("#menu-xp-fill");
const menuXpText = document.querySelector("#menu-xp-text");
const menuCoinsHome = document.querySelector("#menu-coins-home");
const menuNextReward = document.querySelector("#menu-next-reward");
const menuNavButtons = [...document.querySelectorAll(".menu-nav-button")];
const rewardsScreen = document.querySelector("#rewards-screen");
const rewardsTrack = document.querySelector("#rewards-track");
const rewardsSummary = document.querySelector("#rewards-summary");
const backFromRewardsButton = document.querySelector("#back-from-rewards-button");

const keys = new Set();
const settingsStorageKey = "v-overlord-settings";
const keyActions = [
  { id: "up", label: "Avancer", fallback: "arrowup" },
  { id: "down", label: "Reculer", fallback: "arrowdown" },
  { id: "left", label: "Aller à gauche", fallback: "arrowleft" },
  { id: "right", label: "Aller à droite", fallback: "arrowright" },
  { id: "dodge", label: "Esquiver" },
  { id: "shoot", label: "Tirer / frapper" },
  { id: "power", label: "Pouvoir" },
  { id: "boost", label: "Boost" },
  { id: "pickup", label: "Ramasser une arme" },
  { id: "swap", label: "Alterner les armes" },
  { id: "ranged", label: "Arme à distance" },
  { id: "melee", label: "Épée" },
  { id: "portal", label: "Entrer dans le portail" },
];
const defaultSettings = {
  volumes: { master: 100, music: 100, effects: 100 },
  muted: { master: false, music: false, effects: false },
  keys: {
    up: "z", down: "s", left: "q", right: "d", dodge: "shift", shoot: " ", power: "o", boost: "p",
    pickup: "f", swap: "a", ranged: "1", melee: "2", portal: "e",
  },
};
const keyNames = {
  " ": "Espace", shift: "Maj", control: "Ctrl", alt: "Alt", enter: "Entrée", tab: "Tab", backspace: "Retour",
  capslock: "Verr. Maj", arrowup: "↑", arrowdown: "↓", arrowleft: "←", arrowright: "→",
};
let keyCaptureAction = "";
let gameSettings = loadSettings();

function loadSettings() {
  const settings = structuredClone(defaultSettings);
  let saved;
  try {
    saved = JSON.parse(window.localStorage.getItem(settingsStorageKey) ?? "null");
  } catch {
    return settings;
  }
  if (!saved || typeof saved !== "object") return settings;
  for (const channel of Object.keys(settings.volumes)) {
    const volume = saved.volumes?.[channel];
    if (Number.isFinite(volume)) settings.volumes[channel] = Math.max(0, Math.min(100, Math.round(volume)));
    if (typeof saved.muted?.[channel] === "boolean") settings.muted[channel] = saved.muted[channel];
  }
  const used = new Set();
  for (const action of keyActions) {
    const key = saved.keys?.[action.id];
    if (typeof key === "string" && key.length > 0 && key !== "escape" && !used.has(key)) settings.keys[action.id] = key;
    used.add(settings.keys[action.id]);
  }
  if (new Set(Object.values(settings.keys)).size !== keyActions.length) settings.keys = structuredClone(defaultSettings.keys);
  return settings;
}

function saveSettings() {
  try {
    window.localStorage.setItem(settingsStorageKey, JSON.stringify(gameSettings));
  } catch {
    progressionFeedback.textContent = "Les paramètres n'ont pas pu être enregistrés sur cet appareil.";
  }
}

function keyFromEvent(event) {
  if (/^(Digit|Numpad)\d$/.test(event.code)) return event.code.slice(-1);
  return event.key.toLowerCase();
}

function formatKeyName(key) {
  return keyNames[key] ?? (key.length === 1 ? key.toUpperCase() : key[0].toUpperCase() + key.slice(1));
}

function keyLabel(actionId) {
  return formatKeyName(gameSettings.keys[actionId]);
}

function isActionKey(actionId, key) {
  const action = keyActions.find((item) => item.id === actionId);
  return gameSettings.keys[actionId] === key || action?.fallback === key;
}

function isActionHeld(actionId) {
  const action = keyActions.find((item) => item.id === actionId);
  return keys.has(gameSettings.keys[actionId]) || Boolean(action?.fallback && keys.has(action.fallback));
}

function isMovementKey(key) {
  return ["up", "down", "left", "right"].some((actionId) => isActionKey(actionId, key));
}

function updateKeyLabels() {
  const slotKeys = [
    [combatRangedSlot, "ranged", "ARME À DISTANCE"],
    [combatMeleeSlot, "melee", "ÉPÉE"],
    [usePowerButton, "power", "POUVOIR"],
    [useBoostButton, "boost", "BOOST"],
  ];
  for (const [slot, actionId, title] of slotKeys) {
    slot.querySelector(".combat-slot-key").textContent = keyLabel(actionId);
    slot.setAttribute("aria-keyshortcuts", keyLabel(actionId));
    const kicker = slot.querySelector(".combat-slot-kicker");
    kicker.textContent = actionId === "melee"
      ? `${title} · TOUCHE ${keyLabel(actionId)} (${keyLabel("swap")} pour alterner)`
      : `${title} · TOUCHE ${keyLabel(actionId)}`;
  }
  updateAutoShootControl();
}
const speed = 195;
const walkSpeedRatio = 0.72;
const runRampDuration = 0.5;
const roundLength = 90;
const bossWaveLength = 120;
const bossArrivalTimeLeft = 50;
const finalWaveLength = 170;
const finalBossArrivalTimeLeft = 110;
const maxEnemiesOnField = 18;
const finalWaveMaxEnemies = 26;
const waveCountdownLength = 3;
const characterScale = 0.72;
const progressionStorageKey = "blackwood-survivor-progression";
const shopRotationDuration = 45 * 60 * 1000;
const boostOptions = [
  { id: "soin", label: "Potion de sève ensorcelée", description: "Récupère 35 PV.", duration: 0, icon: "🧪", price: 40, rotation: 0 },
  { id: "vitesse", label: "Bottes du fantôme", description: "Déplace-toi 35 % plus vite pendant 25 secondes.", duration: 25, icon: "👻", price: 60, rotation: 1 },
  { id: "bouclier", label: "Bulle de citrouille", description: "Réduit les dégâts de 40 % pendant 20 secondes.", duration: 20, icon: "🎃", price: 70, rotation: 2 },
  { id: "puissance", label: "Braise maudite", description: "Tes tirs infligent 2 dégâts supplémentaires pendant 25 secondes.", duration: 25, icon: "🔥", price: 85, rotation: 2 },
];
const bossRelicCatalog = [
  { id: "medaille-du-gardien", label: "Médaille du Gardien", description: "Un insigne hanté récupéré sur un boss.", icon: "🏅" },
  { id: "dent-du-colosse", label: "Dent du Colosse", description: "Un trophée gravé dans l'os d'un colosse.", icon: "🦷" },
  { id: "cristal-de-minuit", label: "Cristal de minuit", description: "Un éclat rare chargé de magie noire.", icon: "🔮" },
  { id: "coeur-de-citrouille", label: "Cœur de citrouille", description: "Le cœur incandescent du Roi Citrouille.", icon: "🧡" },
  { id: "couronne-des-brumes", label: "Couronne des brumes", description: "Une relique royale qui ne se trouve que dans la nuit maudite.", icon: "👑" },
];
const defaultRelicInventory = Object.fromEntries(bossRelicCatalog.map((relic) => [relic.id, 0]));
const activePowerOptions = [
  { id: "glace", label: "Souffle de givre", description: "Gèle et blesse les monstres proches, puis les ralentit quand la glace fond.", icon: "❄️", cooldown: 12, price: 0, rotation: 0, effect: "ice", tier: "commun", kind: "control" },
  { id: "essaim-spectral", label: "Essaim spectral", description: "Des chauves-souris frappent tous les ennemis proches et te rendent 1 PV par morsure.", icon: "🦇", cooldown: 14, price: 150, rotation: 0, effect: "bats", tier: "peu-commun", kind: "attack" },
  { id: "nuee-toxique", label: "Nuée toxique", description: "Un nuage de poison : empoisonne, ralentit et rend les monstres plus fragiles (+25 % de dégâts subis).", icon: "☠️", cooldown: 15, price: 165, rotation: 2, effect: "poison", tier: "peu-commun", kind: "control" },
  { id: "lumiere-sacree", label: "Lumière sacrée", description: "Un pilier de lumière te soigne, brûle les monstres autour de toi et les aveugle (ralentis).", icon: "✨", cooldown: 20, price: 160, rotation: 1, effect: "holy", tier: "peu-commun", kind: "heal" },
  { id: "citrouille-infernale", label: "Citrouille infernale", description: "Une citrouille explose sur le groupe le plus proche : souffle, recul et brûlure.", icon: "🎃", cooldown: 16, price: 185, rotation: 1, effect: "pumpkin", tier: "rare", kind: "attack" },
  { id: "tempete-foudre", label: "Tempête de foudre", description: "Un éclair rebondit d'ennemi en ennemi, les électrocute et les paralyse.", icon: "⚡", cooldown: 15, price: 235, rotation: 0, effect: "lightning", tier: "rare", kind: "attack" },
  { id: "onde-sismique", label: "Onde sismique", description: "Tu frappes le sol : l'onde de choc blesse, repousse et étourdit tout autour de toi.", icon: "🪨", cooldown: 16, price: 230, rotation: 1, effect: "quake", tier: "rare", kind: "control" },
  { id: "armure-ossements", label: "Armure d'ossements", description: "Des os tournoient autour de toi : ils frappent les monstres au contact et divisent par deux les dégâts reçus.", icon: "🦴", cooldown: 18, price: 220, rotation: 2, effect: "boneshield", tier: "rare", kind: "defense" },
  { id: "tornade-hurlante", label: "Tornade hurlante", description: "Une tornade fonce vers les monstres, les aspire, les fait tournoyer puis les projette au loin.", icon: "🌪️", cooldown: 16, price: 240, rotation: 0, effect: "tornado", tier: "rare", kind: "control" },
  { id: "voile-fantome", label: "Voile du fantôme", description: "Te rend intouchable et 30 % plus rapide pendant un court instant.", icon: "👻", cooldown: 18, price: 210, rotation: 2, effect: "veil", tier: "legendaire", kind: "defense" },
  { id: "vortex-ombre", label: "Vortex d'ombre", description: "Un trou noir aspire les monstres, les broie puis implose en les projetant au loin.", icon: "🌀", cooldown: 20, price: 280, rotation: 2, effect: "vortex", tier: "legendaire", kind: "control" },
  { id: "pluie-meteores", label: "Pluie de météores", description: "Des météores enflammés s'écrasent sur les monstres : explosion, brûlure et étourdissement.", icon: "☄️", cooldown: 19, price: 290, rotation: 1, effect: "meteor", tier: "legendaire", kind: "attack" },
  { id: "meute-spectrale", label: "Meute spectrale", description: "Invoque des loups fantômes qui t'escortent et bondissent sur les monstres proches pour les mordre.", icon: "🐺", cooldown: 22, price: 300, rotation: 0, effect: "wolves", tier: "legendaire", kind: "summon" },
  { id: "flamme-infernale", label: "Flamme infernale", description: "Une explosion de feu maudit brûle et repousse les monstres proches.", icon: "🔥", cooldown: 17, price: 225, rotation: 1, effect: "fire", tier: "divin", kind: "attack" },
  { id: "pacte-vampirique", label: "Pacte vampirique", description: "Aspire le sang des monstres proches : dégâts, saignement et soin pour chaque victime.", icon: "🩸", cooldown: 18, price: 300, rotation: 0, effect: "vampire", tier: "divin", kind: "heal" },
  { id: "arret-du-temps", label: "Arrêt du temps", description: "Le temps se fige : tous les monstres alentour sont immobilisés et subissent 50 % de dégâts en plus.", icon: "⏳", cooldown: 24, price: 320, rotation: 2, effect: "timestop", tier: "divin", kind: "control" },
];
const powerKindLabels = { attack: "Attaque", control: "Contrôle", defense: "Défense", heal: "Soin", summon: "Invocation" };
const skinStyleLabels = { aventure: "Aventure", animal: "Animal", guerrier: "Guerrier", western: "Western", futuriste: "Futuriste", halloween: "Halloween" };
const weaponTypeLabels = {
  fronde: "Fronde", "double-fronde": "Fronde", arbalete: "Arbalète", "arc-long": "Arc",
  "fusil-pompe": "Fusil", "lance-clous": "Lanceur", "lance-bonbons": "Lanceur",
  "faux-spectrale": "Faux", "tir-chauve-souris": "Magie", "lanterne-ames": "Magie", "grimoire-maudit": "Magie", "fouet-ronces": "Fouet",
  "epee-rouillee": "Épée", "epee-chevalier": "Épée", "coutelas-fantome": "Épée", "lame-braise": "Épée", "epee-lune-sanglante": "Épée",
  "hache-bucheron": "Hache", "lance-centurion": "Lance", "marteau-guerre": "Marteau", "dague-assassin": "Dague", "katana-ombre": "Katana",
  "pistolet-silex": "Pistolet", "revolver-sherif": "Pistolet", "pistolet-citrouille": "Pistolet", "pistolet-spectral": "Pistolet", "canon-roi-ombres": "Pistolet",
  "tromblon-pirate": "Fusil", "fusil-precision": "Fusil", "pistolet-givre": "Pistolet", "baguette-foudre": "Magie", "blaster-neon": "Laser",
};
const weaponTypeIcons = { Épée: "🗡️", Hache: "🪓", Lance: "🔱", Marteau: "🔨", Dague: "🔪", Katana: "⚔️", Faux: "🌙", Fouet: "🌿", Pistolet: "🔫", Fusil: "💥", Laser: "🔆", Magie: "🪄", Arc: "🏹", Arbalète: "🏹", Fronde: "🎯", Lanceur: "🔩" };
function getItemTypeLabel(category, item) {
  if (!item) return "";
  if (category === "weapons") return weaponTypeLabels[item.id] || (item.melee ? "Mêlée" : "Distance");
  if (category === "skins") return skinStyleLabels[item.style] || "";
  if (category === "activePowers") return powerKindLabels[item.kind] || "";
  return "";
}
const defaultPowerLevels = Object.fromEntries(activePowerOptions.map((power) => [power.id, 1]));
const loadoutOptions = {
  characters: [
    { id: "survivant", label: "Survivant", description: "Le héros polyvalent.", icon: "🧭" },
    { id: "pisteur", label: "Pisteur", description: "Tenue de camouflage légère.", icon: "🌿" },
    { id: "secouriste", label: "Secouriste", description: "Équipement médical de terrain.", icon: "✚" },
    { id: "sentinelle", label: "Sentinelle", description: "Armure robuste pour tenir la ligne.", icon: "🛡️" },
  ],
  skins: [
    { id: "survivant", label: "Survivant", description: "Tenue de terrain d'origine.", icon: "🧭", tier: "commun", style: "aventure" },
    { id: "feuillage", label: "Feuillage", description: "Camouflage vert de forêt.", icon: "🌿", tier: "commun", style: "aventure" },
    { id: "cendre", label: "Cendre", description: "Tenue sombre de récupérateur.", icon: "🌫️", tier: "commun", style: "aventure" },
    { id: "aventuriere", label: "Aventurière", description: "Personnage féminin avec cheveux longs et tenue d'exploration.", icon: "🧭", tier: "commun", style: "aventure" },
    { id: "renard", label: "Costume de renard", description: "Combinaison rousse avec capuche, oreilles et museau de renard.", icon: "🦊", tier: "peu-commun", style: "animal" },
    { id: "loup", label: "Costume de loup", description: "Combinaison grise avec capuche et oreilles de loup.", icon: "🐺", tier: "peu-commun", style: "animal" },
    { id: "chevalier", label: "Armure de chevalier", description: "Armure métallique avec casque et détails dorés.", icon: "⚔️", tier: "legendaire", style: "guerrier" },
    { id: "nomade", label: "Nomade des ruines", description: "Capuche, foulard et manteau de voyageur.", icon: "🧣", tier: "commun", style: "aventure" },
    { id: "mecanicien", label: "Mécanicien", description: "Casque de chantier, lunettes et combinaison à outils.", icon: "🔧", tier: "peu-commun", style: "aventure" },
    { id: "garde-forestier", label: "Garde forestier", description: "Chapeau large, barbe et tenue de pisteur.", icon: "🌲", tier: "rare", style: "aventure" },
    { id: "sorciere", label: "Sorcière des brumes", description: "Chapeau pointu et manteau ensorcelé.", icon: "🧙", tier: "rare", halloween: true, style: "halloween" },
    { id: "citrouille", label: "Citrouille vivante", description: "Costume orange sculpté aux accents lumineux.", icon: "🎃", tier: "peu-commun", halloween: true, style: "halloween" },
    { id: "vampire", label: "Vampire de minuit", description: "Cape sombre et tenue de noble vampire.", icon: "🧛", tier: "divin", halloween: true, style: "halloween" },
    { id: "momie", label: "Momie des catacombes", description: "Bandages antiques, yeux hantés et amulette de tombeau.", icon: "🧟", tier: "rare", halloween: true, style: "halloween" },
    { id: "epouvantail", label: "Épouvantail maudit", description: "Chapeau rapiécé, paille et coutures ensorcelées.", icon: "🌾", tier: "rare", halloween: true, style: "halloween" },
    { id: "fantome", label: "Fantôme des marais", description: "Linceul spectral translucide et lueur glaciale.", icon: "👻", tier: "legendaire", halloween: true, style: "halloween" },
    { id: "demon", label: "Démon cornu", description: "Cornes rouges, armure infernale et braises ardentes.", icon: "😈", tier: "divin", halloween: true, style: "halloween" },
    { id: "squelette", label: "Squelette de minuit", description: "Masque d'os, côtes apparentes et manteau funèbre.", icon: "💀", tier: "legendaire", halloween: true, style: "halloween" },
    { id: "cowboy", label: "Cowboy des plaines", description: "Chapeau de cuir, foulard rouge et étoile de shérif.", icon: "🤠", tier: "commun", style: "western" },
    { id: "pirate", label: "Pirate fantôme", description: "Tricorne, manteau de capitaine et lueur spectrale.", icon: "🏴‍☠️", tier: "peu-commun", halloween: true, style: "halloween" },
    { id: "zombie", label: "Zombie des marais", description: "Peau verdâtre, vêtements déchirés et regard vide.", icon: "🧟", tier: "peu-commun", halloween: true, style: "halloween" },
    { id: "ninja", label: "Ninja de l'ombre", description: "Tenue noire silencieuse et bandeau rouge.", icon: "🥷", tier: "rare", style: "guerrier" },
    { id: "samourai", label: "Samouraï écarlate", description: "Armure laquée rouge et casque à cornes dorées.", icon: "⛩️", tier: "rare", style: "guerrier" },
    { id: "viking", label: "Viking du nord", description: "Casque de fer, fourrure et barbe tressée.", icon: "🪓", tier: "rare", style: "guerrier" },
    { id: "clown", label: "Clown maléfique", description: "Sourire cruel, collerette et costume rayé.", icon: "🤡", tier: "legendaire", halloween: true, style: "halloween" },
    { id: "chasseur-vampires", label: "Chasseur de vampires", description: "Chapeau large, long manteau et pieux d'argent.", icon: "🗡️", tier: "legendaire", halloween: true, style: "halloween" },
    { id: "astronaute", label: "Astronaute perdu", description: "Combinaison spatiale blanche et visière dorée.", icon: "🧑‍🚀", tier: "legendaire", style: "futuriste" },
    { id: "faucheuse", label: "La Faucheuse", description: "Capuche noire sans visage et aura de mort.", icon: "☠️", tier: "divin", halloween: true, style: "halloween" },
    { id: "cyborg", label: "Cyborg néon", description: "Armure chromée et circuits lumineux.", icon: "🤖", tier: "divin", style: "futuriste" },
  ],
  equipment: [
    { id: "standard", label: "Sac de terrain", description: "Équipement équilibré." },
    { id: "veste", label: "Veste renforcée", description: "Réduit les dégâts reçus de 25 %." },
    { id: "bottes", label: "Bottes légères", description: "Réduit le délai entre les esquives." },
    { id: "sac-renforce", label: "Sac médical", description: "Augmente la vie maximale à 125." },
  ],
  weapons: [
    { id: "fronde", label: "Fronde aux pépins", description: "Arme fiable qui lance des pépins de citrouille.", damage: 1, interval: 0.28, projectiles: 1, icon: "🎃", rarity: "violette", tier: "commun" },
    { id: "arbalete", label: "Arbalète de chasse aux fantômes", description: "Tirs puissants contre les créatures de la nuit, mais plus lents.", damage: 3, interval: 0.48, projectiles: 1, icon: "🏹", rarity: "orange", tier: "rare" },
    { id: "double-fronde", label: "Double fronde aux pépins", description: "Lance deux pépins de citrouille à la fois.", damage: 1, interval: 0.36, projectiles: 2, icon: "🎃", rarity: "violette", tier: "commun" },
    { id: "fusil-pompe", label: "Fusil à citrouilles", description: "Trois projectiles enflammés par tir, à cadence lente.", damage: 2, interval: 0.62, projectiles: 3, icon: "💥", rarity: "orange", tier: "rare" },
    { id: "lance-clous", label: "Lance-clous maudits", description: "Tirs spectraux rapides pour garder les créatures à distance.", damage: 1, interval: 0.22, projectiles: 1, icon: "🔩", rarity: "violette", tier: "commun" },
    { id: "arc-long", label: "Arc du corbeau", description: "L'arme dorée la plus puissante : flèches dévastatrices, mais lentes.", damage: 7, interval: 0.58, projectiles: 1, icon: "🏹", rarity: "doree", tier: "divin" },
    { id: "faux-spectrale", label: "Faux spectrale", description: "Une faux dorée invoque des chauves-souris maudites avec une puissance légendaire.", damage: 8, interval: 0.7, projectiles: 1, icon: "🪓", projectile: "bat", rarity: "doree", tier: "divin" },
    { id: "lance-bonbons", label: "Lance-bonbons", description: "Envoie des bonbons explosifs en rafale.", damage: 2, interval: 0.35, projectiles: 1, icon: "🍬", projectile: "candy", rarity: "violette", tier: "peu-commun" },
    { id: "tir-chauve-souris", label: "Tir de chauve-souris", description: "Projette des chauves-souris spectrales qui frappent fort.", damage: 4, interval: 0.56, projectiles: 1, icon: "🦇", projectile: "bat", rarity: "orange", tier: "rare" },
    { id: "lanterne-ames", label: "Lanterne des âmes", description: "Lance des flammes folles qui brûlent d'un feu spectral.", damage: 3, interval: 0.42, projectiles: 1, icon: "🏮", projectile: "soul", rarity: "orange", tier: "legendaire" },
    { id: "grimoire-maudit", label: "Grimoire maudit", description: "Envoie des runes hantées en rafale, capables de percer les ombres.", damage: 2, interval: 0.3, projectiles: 1, icon: "📖", projectile: "rune", rarity: "violette", tier: "peu-commun" },
    { id: "fouet-ronces", label: "Fouet des ronces", description: "Fouette les ennemis avec une liane épineuse et des éclats maudits.", damage: 4, interval: 0.52, projectiles: 1, icon: "🌿", projectile: "thorn", rarity: "orange", tier: "legendaire" },
    { id: "epee-rouillee", label: "Épée rouillée", description: "Une vieille lame ébréchée qui frappe en arc tous les monstres proches.", damage: 3, interval: 0.5, projectiles: 1, icon: "🗡️", rarity: "violette", tier: "commun", crate: true, melee: { reach: 118, arc: 120, color: "#e2cfb1" } },
    { id: "epee-chevalier", label: "Épée du chevalier", description: "Lame d'acier équilibrée : coups amples et réguliers.", damage: 4, interval: 0.46, projectiles: 1, icon: "⚔️", rarity: "violette", tier: "peu-commun", crate: true, melee: { reach: 128, arc: 130, color: "#e6f1ff" } },
    { id: "coutelas-fantome", label: "Coutelas du pirate fantôme", description: "Lame spectrale très rapide qui tranche les ombres.", damage: 5, interval: 0.36, projectiles: 1, icon: "🏴‍☠️", rarity: "orange", tier: "rare", crate: true, melee: { reach: 124, arc: 140, color: "#8ff3ff" } },
    { id: "lame-braise", label: "Lame de braise", description: "Obsidienne fendue de lave : de grandes entailles enflammées.", damage: 7, interval: 0.44, projectiles: 1, icon: "🔥", rarity: "orange", tier: "legendaire", crate: true, melee: { reach: 138, arc: 150, color: "#ff8a2a" } },
    { id: "epee-lune-sanglante", label: "Épée de la Lune sanglante", description: "Arme divine : un croissant écarlate fauche tout ce qui t'entoure.", damage: 10, interval: 0.42, projectiles: 1, icon: "🌙", rarity: "doree", tier: "divin", crate: true, melee: { reach: 155, arc: 170, color: "#ff3b6b" } },
    { id: "pistolet-silex", label: "Pistolet à silex", description: "Vieux pistolet de corsaire : balles rapides et précises.", damage: 2, interval: 0.4, projectiles: 1, icon: "🔫", rarity: "violette", tier: "commun", crate: true },
    { id: "revolver-sherif", label: "Revolver du shérif", description: "Six coups gravés d'argent, cadence soutenue.", damage: 3, interval: 0.34, projectiles: 1, icon: "🤠", rarity: "violette", tier: "peu-commun", crate: true },
    { id: "pistolet-citrouille", label: "Pistolet à citrouilles", description: "Tire deux balles de citrouille enflammées à la fois.", damage: 3, interval: 0.42, projectiles: 2, icon: "🎃", rarity: "orange", tier: "rare", crate: true },
    { id: "pistolet-spectral", label: "Pistolet spectral", description: "Ectoplasme condensé : des balles fantômes puissantes.", damage: 5, interval: 0.3, projectiles: 1, icon: "👻", rarity: "orange", tier: "legendaire", crate: true },
    { id: "canon-roi-ombres", label: "Canon du Roi des ombres", description: "Arme divine : double salve d'ombre dévastatrice.", damage: 6, interval: 0.28, projectiles: 2, icon: "👑", rarity: "doree", tier: "divin", crate: true },
    { id: "hache-bucheron", label: "Hache du bûcheron", description: "Lourde hache à double tranchant : grosses entailles qui font saigner.", damage: 6, interval: 0.62, projectiles: 1, icon: "🪓", rarity: "violette", tier: "peu-commun", crate: true, melee: { reach: 122, arc: 110, color: "#d9c3a0" } },
    { id: "lance-centurion", label: "Lance du centurion", description: "Très longue portée : transperce les monstres en ligne droite.", damage: 5, interval: 0.5, projectiles: 1, icon: "🔱", rarity: "violette", tier: "peu-commun", crate: true, melee: { reach: 178, arc: 42, color: "#f3e3b0" } },
    { id: "marteau-guerre", label: "Marteau de guerre", description: "Chaque coup fait trembler le sol : onde de choc et étourdissement.", damage: 9, interval: 0.82, projectiles: 1, icon: "🔨", rarity: "orange", tier: "rare", crate: true, melee: { reach: 112, arc: 100, color: "#ffd27a" } },
    { id: "dague-assassin", label: "Dague de l'assassin", description: "Coups éclairs empoisonnés, souvent critiques.", damage: 3, interval: 0.24, projectiles: 1, icon: "🗡️", rarity: "orange", tier: "rare", crate: true, melee: { reach: 92, arc: 90, color: "#9dff6a" } },
    { id: "katana-ombre", label: "Katana de l'ombre", description: "Lame d'ombre : double entaille ultra rapide qui fait saigner.", damage: 8, interval: 0.34, projectiles: 1, icon: "⚔️", rarity: "orange", tier: "legendaire", crate: true, melee: { reach: 142, arc: 150, color: "#c48bff" } },
    { id: "tromblon-pirate", label: "Tromblon du pirate", description: "Cinq plombs en éventail à courte portée : idéal contre les groupes.", damage: 2, interval: 0.7, projectiles: 5, icon: "🏴‍☠️", rarity: "violette", tier: "peu-commun", crate: true },
    { id: "fusil-precision", label: "Fusil de précision", description: "Balle lente mais perforante qui traverse 3 monstres, gros critiques.", damage: 9, interval: 0.9, projectiles: 1, icon: "🎯", rarity: "orange", tier: "rare", crate: true },
    { id: "pistolet-givre", label: "Pistolet de givre", description: "Balles de glace qui ralentissent et peuvent geler sur place.", damage: 3, interval: 0.36, projectiles: 1, icon: "❄️", rarity: "orange", tier: "rare", crate: true },
    { id: "baguette-foudre", label: "Baguette de foudre", description: "Un éclair magique qui rebondit sur les monstres voisins.", damage: 4, interval: 0.5, projectiles: 1, icon: "🪄", rarity: "orange", tier: "legendaire", crate: true },
    { id: "blaster-neon", label: "Blaster néon", description: "Arme divine du futur : rafale laser perforante et explosive.", damage: 4, interval: 0.2, projectiles: 1, icon: "🔆", rarity: "doree", tier: "divin", crate: true },
  ],
  coatings: [
    { id: "aucun", label: "Sans revêtement", description: "La finition d'origine de ton arme.", icon: "⬜", tier: "commun" },
    { id: "rouille", label: "Rouille ancienne", description: "Une patine brune d'arme oubliée au fond d'une crypte.", icon: "🟫", tier: "commun" },
    { id: "encre", label: "Nuit d'encre", description: "Un noir mat qui absorbe la lumière des lanternes.", icon: "⬛", tier: "commun" },
    { id: "jade", label: "Jade des marais", description: "Une pierre verte polie, veinée de reflets profonds.", icon: "🟩", tier: "peu-commun" },
    { id: "sang", label: "Sang séché", description: "Un rouge sombre et inquiétant, parfait pour Halloween.", icon: "🟥", tier: "peu-commun" },
    { id: "givre", label: "Givre éternel", description: "Une couche de glace bleutée qui scintille.", icon: "❄️", tier: "rare" },
    { id: "toxique", label: "Poison toxique", description: "Un vert radioactif qui brille dans le noir.", icon: "☢️", tier: "rare" },
    { id: "or", label: "Or royal", description: "Plaqué or massif, digne du Roi Citrouille.", icon: "🥇", tier: "legendaire" },
    { id: "lave", label: "Cœur de lave", description: "De la roche en fusion qui pulse sur ton arme.", icon: "🌋", tier: "legendaire" },
    { id: "spectre", label: "Spectre violet", description: "Revêtement divin : ton arme devient un fantôme lumineux.", icon: "🔮", tier: "divin" },
    { id: "chroma", label: "Galaxie chroma", description: "Revêtement divin : toutes les couleurs défilent sur ton arme.", icon: "🌈", tier: "divin" },
  ],
  activePowers: activePowerOptions,
};
const shopCatalog = [
  { id: "pisteur", category: "characters", label: "Personnage Pisteur", description: "Une tenue de camouflage verte.", price: 75, icon: "🌲", rotation: 0 },
  { id: "secouriste", category: "characters", label: "Personnage Secouriste", description: "Une tenue claire inspirée des équipes de secours.", price: 95, icon: "✚", rotation: 1 },
  { id: "sentinelle", category: "characters", label: "Personnage Sentinelle", description: "Une apparence blindée pour les expéditions difficiles.", price: 125, icon: "🛡️", rotation: 2 },
  { id: "bottes", category: "equipment", label: "Bottes légères", description: "Esquive plus souvent grâce à un délai réduit.", price: 65, icon: "🥾", rotation: 0 },
  { id: "veste", category: "equipment", label: "Veste renforcée", description: "Réduit les dégâts reçus de 25 %.", price: 95, icon: "🧥", rotation: 1 },
  { id: "sac-renforce", category: "equipment", label: "Sac médical", description: "Augmente la vie maximale à 125.", price: 110, icon: "🎒", rotation: 2 },
  ...boostOptions.map((boost) => ({ ...boost, category: "boosts" })),
];
const shopCategoryQuotas = {
  characters: 1,
  equipment: 1,
  boosts: 3,
};
const pseudoChangeCooldown = 60 * 60 * 1000;
const improvementOptions = [
  { id: "degats-1", category: "improvements", path: "damage", level: 1, label: "Dégâts renforcés I", description: "+1 dégât par projectile, de façon permanente.", price: 75, icon: "🎯", bonus: 1 },
  { id: "degats-2", category: "improvements", path: "damage", level: 2, label: "Dégâts renforcés II", description: "+2 dégâts par projectile supplémentaires, de façon permanente.", price: 165, icon: "💥", bonus: 2 },
  { id: "degats-3", category: "improvements", path: "damage", level: 3, label: "Dégâts renforcés III", description: "+3 dégâts par projectile supplémentaires, de façon permanente.", price: 320, icon: "🔥", bonus: 3 },
  { id: "vitalite-1", category: "improvements", path: "health", level: 1, label: "Vitalité I", description: "+10 PV maximum à chaque partie.", price: 60, icon: "💚", bonus: 10 },
  { id: "vitalite-2", category: "improvements", path: "health", level: 2, label: "Vitalité II", description: "+20 PV maximum supplémentaires à chaque partie.", price: 140, icon: "❤️", bonus: 20 },
  { id: "vitalite-3", category: "improvements", path: "health", level: 3, label: "Vitalité III", description: "+30 PV maximum supplémentaires à chaque partie.", price: 280, icon: "💖", bonus: 30 },
  { id: "armure-1", category: "improvements", path: "defense", level: 1, label: "Protection I", description: "Réduit les dégâts reçus de 5 % à chaque partie.", price: 55, icon: "🛡️", bonus: 0.05 },
  { id: "armure-2", category: "improvements", path: "defense", level: 2, label: "Protection II", description: "Réduit les dégâts reçus de 10 % supplémentaires à chaque partie.", price: 125, icon: "🧥", bonus: 0.1 },
  { id: "armure-3", category: "improvements", path: "defense", level: 3, label: "Protection III", description: "Réduit les dégâts reçus de 15 % supplémentaires à chaque partie.", price: 260, icon: "🏰", bonus: 0.15 },
];
const powerUpgradeDetails = {
  glace: { label: "Givre", icon: "❄️", benefit: "augmente les dégâts et le rayon du gel" },
  "essaim-spectral": { label: "Essaim spectral", icon: "🦇", benefit: "augmente les dégâts des chauves-souris et leur portée" },
  "citrouille-infernale": { label: "Citrouille infernale", icon: "🎃", benefit: "renforce l'explosion et son rayon" },
  "voile-fantome": { label: "Voile du fantôme", icon: "👻", benefit: "prolonge l'invulnérabilité" },
  "flamme-infernale": { label: "Flamme infernale", icon: "🔥", benefit: "augmente les dégâts et la durée de brûlure" },
  "nuee-toxique": { label: "Nuée toxique", icon: "☠️", benefit: "renforce le poison, élargit et prolonge le nuage" },
  "tempete-foudre": { label: "Tempête de foudre", icon: "⚡", benefit: "plus de dégâts, plus de rebonds et une paralysie plus longue" },
  "onde-sismique": { label: "Onde sismique", icon: "🪨", benefit: "élargit l'onde, renforce le choc et l'étourdissement" },
  "vortex-ombre": { label: "Vortex d'ombre", icon: "🌀", benefit: "aspire de plus loin et renforce l'implosion" },
  "pacte-vampirique": { label: "Pacte vampirique", icon: "🩸", benefit: "plus de dégâts, de saignement et de soin" },
  "lumiere-sacree": { label: "Lumière sacrée", icon: "✨", benefit: "plus de soin, de dégâts et un pilier plus large" },
  "armure-ossements": { label: "Armure d'ossements", icon: "🦴", benefit: "prolonge l'armure et renforce les os tournoyants" },
  "tornade-hurlante": { label: "Tornade hurlante", icon: "🌪️", benefit: "tornade plus large, plus longue et plus violente" },
  "pluie-meteores": { label: "Pluie de météores", icon: "☄️", benefit: "plus de météores, plus de dégâts et de brûlure" },
  "meute-spectrale": { label: "Meute spectrale", icon: "🐺", benefit: "plus de loups, des morsures plus fortes et plus longues" },
  "arret-du-temps": { label: "Arrêt du temps", icon: "⏳", benefit: "fige le temps plus longtemps et plus loin" },
};
const powerMaxLevel = 5;
const powerLevelStats = {
  ice: (level) => ({ damage: 5 + (level - 1) * 3, radius: 180 + (level - 1) * 15, slow: 3 + (level - 1) * 0.5 }),
  bats: (level) => ({ damage: 14 + (level - 1) * 5, radius: 235 + (level - 1) * 18, heal: 6 + (level - 1) * 2 }),
  pumpkin: (level) => ({ damage: 28 + (level - 1) * 8, radius: 125 + (level - 1) * 15, burn: 2 + Math.floor((level - 1) / 2), burnDuration: 3, push: 55 }),
  veil: (level) => ({ duration: 1.6 + (level - 1) * 0.6 }),
  fire: (level) => ({ damage: 5 + (level - 1) * 2, radius: 205 + (level - 1) * 15, burn: 2 + (level - 1), burnDuration: 5 + (level - 1) * 2, push: 40 }),
  poison: (level) => ({ radius: 165 + (level - 1) * 12, poison: 2 + (level - 1), cloudDuration: 5 + (level - 1) * 0.5, poisonDuration: 4 }),
  lightning: (level) => ({ damage: 12 + (level - 1) * 4, chains: 4 + level, stun: 1.2 + (level - 1) * 0.3, radius: 240 + (level - 1) * 15 }),
  quake: (level) => ({ damage: 16 + (level - 1) * 5, radius: 240 + (level - 1) * 15, stun: 1 + (level - 1) * 0.25, push: 85 }),
  vortex: (level) => ({ damage: 24 + (level - 1) * 8, radius: 220 + (level - 1) * 15, tick: 2 + (level - 1), duration: 1.7 }),
  vampire: (level) => ({ damage: 9 + (level - 1) * 4, radius: 220 + (level - 1) * 15, heal: 3 + (level - 1), bleed: 1 + Math.floor((level - 1) / 2), bleedDuration: 4 }),
  holy: (level) => ({ heal: 18 + (level - 1) * 6, damage: 10 + (level - 1) * 4, radius: 200 + (level - 1) * 15, slow: 2.5 + (level - 1) * 0.4 }),
  boneshield: (level) => ({ duration: 6 + (level - 1), damage: 6 + (level - 1) * 2, radius: 95 + (level - 1) * 6, reduction: 0.5 }),
  tornado: (level) => ({ damage: 4 + (level - 1) * 2, radius: 120 + (level - 1) * 10, duration: 3.5 + (level - 1) * 0.4, push: 110 }),
  meteor: (level) => ({ count: 4 + level, damage: 20 + (level - 1) * 6, radius: 85 + (level - 1) * 6, burn: 2 + Math.floor((level - 1) / 2), burnDuration: 3, stun: 0.6 }),
  wolves: (level) => ({ count: 2 + Math.floor((level + 1) / 2), damage: 9 + (level - 1) * 3, duration: 7 + (level - 1), bleed: 1 + Math.floor((level - 1) / 2), range: 320 }),
  timestop: (level) => ({ duration: 2.5 + (level - 1) * 0.4, radius: 420 + (level - 1) * 30 }),
};
const weaponMaxLevel = 5;
const weaponUpgradeBaseCosts = { violette: 55, orange: 85, doree: 130 };
const powerUpgradeOptions = activePowerOptions.flatMap((power) => {
  const details = powerUpgradeDetails[power.id];
  return Array.from({ length: powerMaxLevel - 1 }, (_, index) => {
    const level = index + 2;
    return {
      id: `${power.id}-${level}`,
      category: "powers",
      path: power.id,
      level,
      label: `${details.label} · niveau ${level}`,
      description: `Amélioration permanente : ${details.benefit}.`,
      price: Math.round((90 + index * 100) * (power.id === "glace" ? 1.15 : 1)),
      icon: details.icon,
    };
  });
});
const craftingRecipes = [
  { id: "arme-lanterne-ames", type: "weapon", itemId: "lanterne-ames", relicCosts: { "medaille-du-gardien": 3 }, coinCost: 70 },
  { id: "arme-fusil-pompe", type: "weapon", itemId: "fusil-pompe", relicCosts: { "dent-du-colosse": 3 }, coinCost: 95 },
  { id: "arme-arc-long", type: "weapon", itemId: "arc-long", relicCosts: { "couronne-des-brumes": 3 }, coinCost: 160 },
  { id: "potion-soin", type: "potion", itemId: "soin", relicCosts: { "medaille-du-gardien": 2 }, coinCost: 25 },
  { id: "potion-vitesse", type: "potion", itemId: "vitesse", relicCosts: { "cristal-de-minuit": 2 }, coinCost: 40 },
  { id: "potion-bouclier", type: "potion", itemId: "bouclier", relicCosts: { "coeur-de-citrouille": 2 }, coinCost: 65 },
  { id: "potion-puissance", type: "potion", itemId: "puissance", relicCosts: { "coeur-de-citrouille": 2, "couronne-des-brumes": 2 }, coinCost: 110 },
];
const crateTierOrder = ["commun", "peu-commun", "rare", "legendaire", "divin"];
const crateTierLabels = { commun: "Commun", "peu-commun": "Peu commun", rare: "Rare", legendaire: "Légendaire", divin: "Divin" };
const crateTierLockerRarity = { commun: "commun", "peu-commun": "rare", rare: "epique", legendaire: "legendaire", divin: "mythique" };
const standardCrateOdds = { commun: 50, "peu-commun": 28, rare: 14, legendaire: 6, divin: 2 };
const royalCrateOdds = { commun: 0, "peu-commun": 30, rare: 36, legendaire: 24, divin: 10 };
const halloweenCrateOdds = { commun: 0, "peu-commun": 40, rare: 36, legendaire: 18, divin: 6 };
const halloweenRoyalCrateOdds = { commun: 0, "peu-commun": 0, rare: 50, legendaire: 35, divin: 15 };
const shopCrates = [
  { id: "caisse-costumes", category: "skins", label: "Caisse de costumes", description: "Un costume au hasard parmi toutes les tenues, de la plus simple à la plus rare.", price: 110, odds: standardCrateOdds, emblem: "🎭", style: "garde-robe", includes: (item) => item.id !== "survivant" },
  { id: "caisse-halloween", category: "skins", label: "Caisse d'Halloween", description: "Uniquement des costumes d'Halloween : momie, sorcière, fantôme, vampire, démon…", price: 160, odds: halloweenCrateOdds, emblem: "🎃", style: "hantee", includes: (item) => item.halloween },
  { id: "caisse-halloween-royale", category: "skins", label: "Caisse d'Halloween royale", description: "Jamais de costume peu commun : 35 % de chances d'un légendaire et 15 % d'un costume divin.", price: 360, odds: halloweenRoyalCrateOdds, emblem: "🦇", style: "royale", premium: true, includes: (item) => item.halloween },
  { id: "caisse-legendes", category: "skins", label: "Caisse des légendes", description: "Guerriers, cow-boys et héros du futur : ninja, samouraï, viking, astronaute, cyborg…", price: 180, odds: { commun: 30, "peu-commun": 0, rare: 42, legendaire: 20, divin: 8 }, emblem: "🛡️", style: "royale", includes: (item) => ["guerrier", "western", "futuriste"].includes(item.style) },
  { id: "caisse-pouvoirs", category: "activePowers", label: "Caisse de pouvoirs", description: "Un pouvoir au hasard. Un pouvoir que tu possèdes déjà gagne un niveau gratuit.", price: 130, odds: standardCrateOdds, emblem: "✨", style: "grimoire", includes: () => true },
  { id: "caisse-pouvoirs-royale", category: "activePowers", label: "Caisse de pouvoirs royale", description: "Jamais le souffle de givre et 5× plus de chances d'obtenir un pouvoir divin (flamme infernale, pacte vampirique, arrêt du temps).", price: 320, odds: royalCrateOdds, emblem: "🔮", style: "arcane", premium: true, includes: () => true },
  { id: "caisse-epees", category: "weapons", label: "Caisse d'épées", description: "Une arme de mêlée au hasard parmi 10 : épées, hache, lance, marteau, dague et katana.", price: 120, odds: standardCrateOdds, emblem: "⚔️", style: "bois", includes: (item) => item.crate && item.melee },
  { id: "caisse-epees-royale", category: "weapons", label: "Caisse d'épées royale", description: "Jamais d'arme de mêlée commune et 5× plus de chances d'obtenir l'épée divine.", price: 340, odds: royalCrateOdds, emblem: "⚔️", style: "royale", premium: true, includes: (item) => item.crate && item.melee },
  { id: "caisse-pistolets", category: "weapons", label: "Caisse de pistolets", description: "Une arme à distance au hasard parmi 10 : pistolets, tromblon, fusil de précision, baguette et blaster.", price: 120, odds: standardCrateOdds, emblem: "🔫", style: "bois", includes: (item) => item.crate && !item.melee },
  { id: "caisse-pistolets-royale", category: "weapons", label: "Caisse de pistolets royale", description: "Jamais d'arme commune et 5× plus de chances d'obtenir le canon ou le blaster divins.", price: 340, odds: royalCrateOdds, emblem: "🔫", style: "royale", premium: true, includes: (item) => item.crate && !item.melee },
  { id: "caisse-hantee", category: "weapons", label: "Caisse hantée", description: "Les armes de l'avant-poste : frondes, arbalète, grimoire, faux spectrale…", price: 160, odds: standardCrateOdds, emblem: "🎃", style: "hantee", includes: (item) => !item.crate && item.id !== "fronde" },
  { id: "caisse-revetements", category: "coatings", label: "Caisse de revêtements", description: "Une peinture au hasard pour changer la couleur de toutes tes armes.", price: 90, odds: standardCrateOdds, emblem: "🎨", style: "peinture", includes: (item) => item.id !== "aucun" },
  { id: "caisse-revetements-prestige", category: "coatings", label: "Caisse de revêtements prestige", description: "Jamais de revêtement commun et 5× plus de chances d'obtenir un revêtement divin.", price: 260, odds: royalCrateOdds, emblem: "🎨", style: "prestige", premium: true, includes: (item) => item.id !== "aucun" },
];
const packTierValues = { commun: 60, "peu-commun": 110, rare: 180, legendaire: 300, divin: 480 };
const packDiscount = 0.3;
const shopPacks = [
  { id: "pack-far-west", label: "Pack Far West", emblem: "🤠", theme: "western", description: "Le shérif des plaines : revolver gravé, hache de bûcheron et tornade hurlante.", items: [["skins", "cowboy"], ["weapons", "revolver-sherif"], ["weapons", "hache-bucheron"], ["activePowers", "tornade-hurlante"]] },
  { id: "pack-mort-vivant", label: "Pack Mort-vivant", emblem: "🧟", theme: "marais", description: "Sorti du marais avec sa vieille épée, ses citrouilles et sa meute de loups fantômes.", items: [["skins", "zombie"], ["weapons", "pistolet-citrouille"], ["weapons", "epee-rouillee"], ["activePowers", "meute-spectrale"]] },
  { id: "pack-pirate", label: "Pack Pirate fantôme", emblem: "🏴‍☠️", theme: "pirate", description: "Tromblon, coutelas spectral et vortex des abysses pour piller les ombres.", items: [["skins", "pirate"], ["weapons", "tromblon-pirate"], ["weapons", "coutelas-fantome"], ["activePowers", "vortex-ombre"]] },
  { id: "pack-ninja", label: "Pack Ninja", emblem: "🥷", theme: "ninja", description: "Dague empoisonnée, lance-clous et nuée toxique : frappe sans être vu.", items: [["skins", "ninja"], ["weapons", "dague-assassin"], ["weapons", "lance-clous"], ["activePowers", "nuee-toxique"]] },
  { id: "pack-samourai", label: "Pack Samouraï", emblem: "⛩️", theme: "samourai", description: "Katana de l'ombre, arbalète et onde sismique : l'honneur du guerrier écarlate.", items: [["skins", "samourai"], ["weapons", "katana-ombre"], ["weapons", "arbalete"], ["activePowers", "onde-sismique"]] },
  { id: "pack-viking", label: "Pack Viking", emblem: "🪓", theme: "viking", description: "Marteau de guerre, lance du centurion et armure d'ossements pour tenir la ligne.", items: [["skins", "viking"], ["weapons", "marteau-guerre"], ["weapons", "lance-centurion"], ["activePowers", "armure-ossements"]] },
  { id: "pack-chasseur", label: "Pack Chasseur de la nuit", emblem: "🗡️", theme: "chasseur", description: "Fusil de précision, épée du chevalier et lumière sacrée contre les vampires.", items: [["skins", "chasseur-vampires"], ["weapons", "fusil-precision"], ["weapons", "epee-chevalier"], ["activePowers", "lumiere-sacree"]] },
  { id: "pack-cirque", label: "Pack Cirque maudit", emblem: "🤡", theme: "cirque", description: "Lance-bonbons, marteau de foire et citrouille infernale : le spectacle commence.", items: [["skins", "clown"], ["weapons", "lance-bonbons"], ["weapons", "marteau-guerre"], ["activePowers", "citrouille-infernale"]] },
  { id: "pack-galactique", label: "Pack Galactique", emblem: "🧑‍🚀", theme: "galactique", description: "Blaster néon, pistolet de givre et pluie de météores venue de l'espace.", items: [["skins", "astronaute"], ["weapons", "blaster-neon"], ["weapons", "pistolet-givre"], ["activePowers", "pluie-meteores"]] },
  { id: "pack-neon", label: "Pack Cyborg néon", emblem: "🤖", theme: "neon", description: "Blaster, baguette de foudre et tempête électrique : la puissance du futur.", items: [["skins", "cyborg"], ["weapons", "blaster-neon"], ["weapons", "baguette-foudre"], ["activePowers", "tempete-foudre"]] },
  { id: "pack-faucheuse", label: "Pack de la Faucheuse", emblem: "☠️", theme: "faucheuse", description: "Le pack ultime : faux spectrale, pacte vampirique et arrêt du temps.", items: [["skins", "faucheuse"], ["weapons", "faux-spectrale"], ["activePowers", "pacte-vampirique"], ["activePowers", "arret-du-temps"]] },
];
const crateShopTabs = { skins: "skins", activePowers: "activePowers", weapons: "weapons", coatings: "weapons" };
const crateCategoryLabels = {
  skins: "Caisse de costumes",
  activePowers: "Caisse de pouvoirs",
  weapons: "Caisse d'armes",
  coatings: "Caisse de revêtements",
};
const defaultMeleeWeapon = "epee-rouillee";
let activeShopRotation = 0;
let shopRotationElapsed = 0;
let shouldSaveProgression = false;
const waves = [
  { bosses: ["fossoyeur-maudit"], minionPool: ["serviteur-squelette"] },
  { bosses: ["epouvantail-automne"], minionPool: ["gargouille-epineuse"] },
  { bosses: ["maitre-des-cauchemars"], minionPool: ["ombre-rampante"] },
];
const enemyTypes = {
  grunt: { label: "Citrouille", health: 2, damage: 3, speed: 36, size: 28, color: "grunt", equipment: "cap" },
  scout: { label: "Citrouille vive", health: 3, damage: 5, speed: 56, size: 32, color: "scout", equipment: "dagger" },
  brute: { label: "Grosse citrouille", health: 8, damage: 14, speed: 34, size: 42, color: "brute", equipment: "club" },
  "serviteur-squelette": { label: "Serviteur squelette", health: 4, damage: 5, speed: 43, size: 38, color: "minion", equipment: "serviteur-squelette" },
  "gargouille-epineuse": { label: "Gargouille épineuse", health: 6, damage: 7, speed: 49, size: 42, color: "minion", equipment: "gargouille-epineuse" },
  "ombre-rampante": { label: "Ombre rampante", health: 4, damage: 6, speed: 55, size: 38, color: "minion", equipment: "ombre-rampante" },
  "petit-bouffon-frondeur": { label: "Petit bouffon frondeur", health: 5, damage: 6, speed: 51, size: 40, color: "minion", equipment: "petit-bouffon-frondeur" },
  "archer-de-lombre": { label: "Archer de l'ombre", health: 7, damage: 7, speed: 39, size: 44, color: "minion", equipment: "archer-de-lombre" },
  "soldat-de-lombre": { label: "Soldat de l'ombre", health: 12, damage: 10, speed: 33, size: 48, color: "minion", equipment: "soldat-de-lombre" },
  "goule-de-lombre": { label: "Goule de l'ombre", health: 9, damage: 8, speed: 64, size: 46, color: "minion", equipment: "goule-de-lombre" },
};
const bossMinionPools = {
  "fossoyeur-maudit": ["serviteur-squelette"],
  "epouvantail-automne": ["gargouille-epineuse"],
  "maitre-des-cauchemars": ["ombre-rampante"],
  "bouffon-frondeur": ["petit-bouffon-frondeur"],
  "mega-cauchemar": ["archer-de-lombre", "soldat-de-lombre", "goule-de-lombre"],
};
const enemySpawnZones = [
  { name: "forêt", weight: 0.65, bounds: [0.02, 0.18, 0.31, 0.91] },
  { name: "cimetière", weight: 0.35, bounds: [0.65, 0.35, 0.98, 0.94] },
];
const bossTypes = [
  { name: "gardien", label: "GARDIEN", health: 22, damage: 8, speed: 38, size: 56, behavior: "orbit" },
  { name: "chasseur", label: "CHASSEUR", health: 34, damage: 12, speed: 55, size: 60, behavior: "swoop" },
  { name: "colosse", label: "COLOSSE", health: 58, damage: 24, speed: 31, size: 72, behavior: "charge" },
  { name: "fossoyeur-maudit", label: "FOSSOYEUR MAUDIT", health: 32, damage: 9, speed: 38, size: 92, behavior: "orbit" },
  { name: "epouvantail-automne", label: "ÉPOUVANTAIL D'AUTOMNE", health: 42, damage: 12, speed: 34, size: 96, behavior: "charge" },
  { name: "maitre-des-cauchemars", label: "MAÎTRE DES CAUCHEMARS", health: 78, damage: 18, speed: 34, size: 104, behavior: "orbit" },
  { name: "bouffon-frondeur", label: "BOUFFON FRONDEUR", health: 72, damage: 18, speed: 54, size: 92, behavior: "swoop" },
  { name: "mega-cauchemar", label: "CHAMBELLAN SORCIER DU TRÔNE", health: 450, damage: 34, speed: 32, size: 150, behavior: "slam" },
];
const maxPlayerLevel = 200;
const bossXpRewards = [60, 110, 180, 260, 600];

const slowLevelingStart = 50;

function getXpForLevel(level) {
  const base = 20 + 6 * (level - 1) + 0.06 * (level - 1) ** 2;
  const slowdown = level >= slowLevelingStart ? 1.35 + 0.02 * (level - slowLevelingStart) : 1;
  return Math.round(base * slowdown);
}

function getLevelReward(level) {
  const tier = Math.floor(level / 10);
  const reward = { coins: 10 * (tier + 1), boosts: {}, relic: false, milestone: level % 10 === 0 };
  if (reward.milestone) {
    reward.coins += 40 * tier;
    reward.boosts.soin = 1;
    reward.relic = true;
  }
  if (level % 50 === 0) reward.boosts.puissance = 1;
  if (level === maxPlayerLevel) reward.coins += 1000;
  return reward;
}

function describeLevelReward(reward) {
  const parts = [`+${reward.coins} ◉`];
  for (const [boostId, count] of Object.entries(reward.boosts)) {
    const boost = boostOptions.find((item) => item.id === boostId);
    if (!boost) throw new Error(`Boost de récompense inconnu : ${boostId}`);
    parts.push(`${boost.icon} ${boost.label}${count > 1 ? ` ×${count}` : ""}`);
  }
  if (reward.relic) parts.push("🔮 Relique de boss");
  return parts;
}

const defaultProgression = {
  coins: 0,
  level: 1,
  xp: 0,
  playerName: "",
  playerNameChangedAt: 0,
  improvements: { damage: 0, health: 0, defense: 0 },
  powers: structuredClone(defaultPowerLevels),
  weaponLevels: Object.fromEntries(loadoutOptions.weapons.map((weapon) => [weapon.id, 1])),
  boostInventory: Object.fromEntries(boostOptions.map((boost) => [boost.id, 0])),
  equippedBoost: "",
  bossLoot: [],
  relicInventory: structuredClone(defaultRelicInventory),
  shopRotation: {
    index: 0,
    startedAt: Date.now(),
    freeOfferItemId: "",
    freeOfferClaimed: false,
  },
  unlocked: {
    characters: ["survivant"],
    skins: ["survivant"],
    equipment: ["standard"],
    weapons: ["fronde", defaultMeleeWeapon],
    coatings: ["aucun"],
    activePowers: ["glace"],
  },
  equipped: {
    characters: "survivant",
    skins: "survivant",
    equipment: "standard",
    weapons: "fronde",
    melee: defaultMeleeWeapon,
    coatings: "aucun",
    activePowers: "glace",
  },
};
let progression = loadProgression();
activeShopRotation = progression.shopRotation.index;
const position = { x: 0.5, y: 0.52 };
const facing = { x: 1, y: 0 };
const aim = { x: 0.9, y: 0.5 };
const enemies = new Set();
const pickups = new Set();
const bossProjectiles = new Set();
// Seules les structures solides et les véhicules bloquent : chemins, cases de jeu, herbe, maïs,
// tombes, clôtures et petits accessoires restent praticables. Chaque obstacle est un polygone
// [[x, y], ...] (ou un rectangle [gauche, haut, droite, bas]) en coordonnées normalisées de la carte,
// tracé sur toute la silhouette visible pour que les pieds ne montent jamais sur un toit.
const mapObstacles = [
  // Manoir (le perron reste accessible) et maisons du village.
  [[0.64, 0.31], [0.64, 0.17], [0.655, 0.095], [0.705, 0.09], [0.715, 0.04], [0.737, 0.04], [0.747, 0.09], [0.80, 0.085], [0.815, 0.2], [0.828, 0.2], [0.828, 0.31]],
  [[0.35, 0.462], [0.40, 0.362], [0.425, 0.42], [0.418, 0.46], [0.413, 0.53], [0.354, 0.53]],
  [[0.441, 0.348], [0.512, 0.348], [0.508, 0.448], [0.445, 0.448]],
  [[0.566, 0.424], [0.588, 0.43], [0.632, 0.47], [0.632, 0.552], [0.567, 0.552]],
  [0.512, 0.56, 0.614, 0.688],
  [0.356, 0.553, 0.402, 0.664],
  // Cryptes du cimetière.
  [[0.682, 0.6], [0.7, 0.565], [0.723, 0.6], [0.723, 0.655], [0.682, 0.655]],
  [[0.853, 0.49], [0.872, 0.454], [0.892, 0.49], [0.892, 0.552], [0.853, 0.552]],
  [[0.871, 0.625], [0.892, 0.59], [0.912, 0.625], [0.912, 0.69], [0.871, 0.69]],
  // Voitures et épaves.
  [[0.366, 0.243], [0.395, 0.218], [0.42, 0.21], [0.436, 0.225], [0.438, 0.25], [0.4, 0.264], [0.375, 0.278], [0.366, 0.262]],
  [[0.235, 0.355], [0.251, 0.37], [0.251, 0.395], [0.237, 0.43], [0.21, 0.42], [0.209, 0.405]],
  [[0.181, 0.505], [0.205, 0.495], [0.235, 0.515], [0.252, 0.55], [0.243, 0.578], [0.182, 0.54]],
  [[0.24, 0.618], [0.265, 0.622], [0.27, 0.648], [0.222, 0.69], [0.204, 0.67], [0.21, 0.645]],
  [[0.075, 0.7], [0.098, 0.686], [0.138, 0.73], [0.126, 0.762], [0.075, 0.722]],
  [[0.268, 0.737], [0.285, 0.722], [0.31, 0.75], [0.32, 0.78], [0.305, 0.8], [0.27, 0.765]],
  [[0.401, 0.775], [0.42, 0.762], [0.44, 0.765], [0.457, 0.79], [0.452, 0.815], [0.435, 0.825], [0.402, 0.8]],
  [[0.563, 0.765], [0.58, 0.748], [0.6, 0.752], [0.627, 0.79], [0.625, 0.81], [0.6, 0.825], [0.565, 0.79]],
];
const bossMapObstacles = {
  // Le domaine de l'épouvantail d'automne : le champ de citrouilles entoure l'épouvantail
  // (entrée ouverte au sud), puis grange, caravane, tracteurs et voitures.
  2: [
    [[0.35, 0.383], [0.363, 0.348], [0.401, 0.309], [0.436, 0.319], [0.473, 0.353], [0.457, 0.442], [0.471, 0.53], [0.457, 0.619], [0.422, 0.624], [0.374, 0.59], [0.331, 0.501], [0.331, 0.412]],
    [[0.548, 0.353], [0.597, 0.329], [0.645, 0.348], [0.658, 0.398], [0.65, 0.442], [0.675, 0.511], [0.677, 0.55], [0.656, 0.609], [0.624, 0.639], [0.581, 0.634], [0.543, 0.609], [0.548, 0.54], [0.586, 0.501], [0.573, 0.447], [0.559, 0.403]],
    [[0.49, 0.26], [0.535, 0.26], [0.54, 0.38], [0.53, 0.42], [0.5, 0.42], [0.485, 0.38]],
    [[0.312, 0.795], [0.35, 0.715], [0.408, 0.645], [0.45, 0.74], [0.446, 0.82], [0.39, 0.94], [0.318, 0.902]],
    [[0, 0.09], [0.045, 0.04], [0.11, 0.03], [0.118, 0.08], [0.118, 0.165], [0.1, 0.185], [0.03, 0.195], [0, 0.19]],
    [[0.155, 0.18], [0.19, 0.162], [0.215, 0.175], [0.247, 0.205], [0.249, 0.255], [0.225, 0.275], [0.21, 0.27], [0.18, 0.235], [0.158, 0.225]],
    [[0.7, 0.817], [0.742, 0.775], [0.764, 0.772], [0.778, 0.798], [0.794, 0.827], [0.789, 0.86], [0.742, 0.895], [0.73, 0.899], [0.701, 0.873]],
    [[0.087, 0.355], [0.112, 0.339], [0.151, 0.362], [0.18, 0.414], [0.157, 0.45], [0.135, 0.44], [0.087, 0.388]],
    [[0.118, 0.557], [0.144, 0.518], [0.175, 0.499], [0.199, 0.508], [0.207, 0.541], [0.153, 0.596], [0.121, 0.58]],
    [[0.204, 0.687], [0.217, 0.661], [0.235, 0.665], [0.274, 0.726], [0.274, 0.749], [0.256, 0.765], [0.207, 0.71]],
    [[0.758, 0.191], [0.774, 0.168], [0.795, 0.165], [0.822, 0.181], [0.838, 0.207], [0.827, 0.247], [0.809, 0.24], [0.763, 0.217]],
  ],
  // La fête foraine du cauchemar : le grand chapiteau garde son entrée ouverte sur le vortex,
  // puis caisses, stands, tentes et roulotte. Les allées entre les stands restent libres.
  3: [
    [[0.378, 0.31], [0.45, 0.23], [0.512, 0.19], [0.58, 0.225], [0.655, 0.31], [0.675, 0.42], [0.675, 0.56], [0.64, 0.69], [0.595, 0.685], [0.585, 0.585], [0.555, 0.54], [0.465, 0.54], [0.462, 0.585], [0.458, 0.685], [0.375, 0.665], [0.352, 0.6], [0.352, 0.42]],
    [[0.645, 0.565], [0.69, 0.555], [0.71, 0.6], [0.705, 0.67], [0.675, 0.69], [0.645, 0.66]],
    [[0.178, 0.15], [0.23, 0.11], [0.255, 0.087], [0.29, 0.1], [0.295, 0.27], [0.21, 0.32], [0.18, 0.25]],
    [[0.271, 0.06], [0.3, 0], [0.37, 0], [0.372, 0.215], [0.33, 0.228], [0.275, 0.215]],
    [[0.087, 0.27], [0.15, 0.235], [0.175, 0.245], [0.18, 0.36], [0.19, 0.38], [0.19, 0.43], [0.15, 0.47], [0.1, 0.45], [0.088, 0.4]],
    [[0.648, 0.06], [0.69, 0.01], [0.73, 0.02], [0.77, 0.09], [0.775, 0.19], [0.73, 0.25], [0.66, 0.24], [0.648, 0.19]],
    [[0.765, 0.21], [0.85, 0.09], [0.86, 0.08], [0.9, 0.17], [0.92, 0.22], [0.92, 0.36], [0.87, 0.393], [0.849, 0.398], [0.8, 0.33], [0.765, 0.324]],
    [[0.893, 0.425], [0.951, 0.334], [1, 0.36], [1, 0.65], [0.898, 0.637], [0.884, 0.552]],
    [[0, 0.41], [0.06, 0.37], [0.105, 0.39], [0.11, 0.48], [0.125, 0.53], [0.11, 0.6], [0.08, 0.675], [0.05, 0.675], [0.04, 0.62], [0, 0.61]],
    [[0.105, 0.86], [0.12, 0.815], [0.195, 0.755], [0.21, 0.76], [0.275, 0.83], [0.293, 0.87], [0.295, 1], [0.105, 1]],
    [[0.748, 0.88], [0.8, 0.82], [0.835, 0.775], [0.87, 0.82], [0.91, 0.875], [0.915, 1], [0.748, 1]],
  ],
  // Les rues du bouffon frondeur : on monte sur la scène par l'escalier, le chemin de cases
  // colorées reste libre ; maisons, jouets géants, rochers et charrette bloquent.
  4: [
    [[0.413, 0.15], [0.45, 0.11], [0.5, 0.1], [0.56, 0.11], [0.612, 0.15], [0.612, 0.4], [0.57, 0.46], [0.543, 0.46], [0.543, 0.42], [0.585, 0.42], [0.585, 0.33], [0.44, 0.33], [0.44, 0.42], [0.482, 0.42], [0.482, 0.46], [0.442, 0.46], [0.412, 0.4]],
    [[0.198, 0.185], [0.24, 0.052], [0.29, 0.04], [0.31, 0.07], [0.362, 0.175], [0.35, 0.385], [0.272, 0.422], [0.21, 0.395], [0.205, 0.21]],
    [[0.1, 0.24], [0.144, 0.145], [0.19, 0.235], [0.208, 0.3], [0.21, 0.42], [0.235, 0.43], [0.235, 0.5], [0.21, 0.545], [0.15, 0.53], [0.137, 0.5], [0.137, 0.46], [0.095, 0.44], [0.095, 0.31]],
    [[0.068, 0.47], [0.1, 0.445], [0.137, 0.46], [0.135, 0.68], [0.1, 0.69], [0.07, 0.675]],
    [[0, 0.53], [0.03, 0.54], [0.035, 0.63], [0.078, 0.64], [0.078, 0.735], [0.075, 0.795], [0.03, 0.8], [0, 0.79]],
    [[0.28, 0.625], [0.3, 0.605], [0.322, 0.585], [0.352, 0.555], [0.355, 0.49], [0.4, 0.488], [0.42, 0.505], [0.467, 0.565], [0.467, 0.665], [0.432, 0.67], [0.43, 0.73], [0.373, 0.73], [0.37, 0.756], [0.333, 0.756], [0.328, 0.71], [0.285, 0.71]],
    [[0.44, 0.69], [0.455, 0.668], [0.49, 0.67], [0.507, 0.72], [0.505, 0.77], [0.47, 0.77], [0.44, 0.73]],
    [[0.413, 0.75], [0.43, 0.736], [0.462, 0.745], [0.462, 0.82], [0.445, 0.835], [0.415, 0.825]],
    [[0.675, 0.1], [0.69, 0.11], [0.75, 0.07], [0.775, 0.075], [0.79, 0.13], [0.792, 0.2], [0.79, 0.41], [0.745, 0.4], [0.678, 0.37]],
    [[0.793, 0.2], [0.866, 0.137], [0.952, 0.223], [0.945, 0.46], [0.876, 0.53], [0.795, 0.47]],
    [[0.644, 0.45], [0.67, 0.432], [0.742, 0.43], [0.76, 0.48], [0.772, 0.515], [0.772, 0.595], [0.79, 0.6], [0.79, 0.655], [0.755, 0.66], [0.75, 0.69], [0.725, 0.69], [0.705, 0.675], [0.652, 0.677], [0.645, 0.6]],
    [[0.105, 0.79], [0.14, 0.645], [0.17, 0.66], [0.24, 0.735], [0.268, 0.775], [0.265, 1], [0.108, 1]],
    [[0.252, 0.875], [0.29, 0.835], [0.3, 0.808], [0.415, 0.912], [0.415, 1], [0.252, 1]],
    [[0.74, 0.83], [0.772, 0.785], [0.87, 0.69], [0.902, 0.83], [0.902, 1], [0.742, 1]],
    [[0.606, 0.93], [0.627, 0.91], [0.702, 0.83], [0.748, 0.865], [0.748, 1], [0.606, 1]],
    [[0.88, 0.65], [0.91, 0.625], [1, 0.64], [1, 0.76], [0.94, 0.75], [0.9, 0.73], [0.88, 0.7]],
  ],
};
const bossMapNames = {
  2: "LE DOMAINE DE L'ÉPOUVANTAIL D'AUTOMNE",
  3: "LA FÊTE FORAINE DU CAUCHEMAR",
  4: "LES RUES DU BOUFFON FRONDEUR",
};
bossMapObstacles[5] = bossMapObstacles[3];
const vortexPosition = { x: 0.515, y: 0.72 };
const thronePortalPosition = { x: 0.5, y: 0.86 };
const bossSpawnDuration = 1.6;
const bossSpawnPoints = {
  "fossoyeur-maudit": { x: 0.76, y: 0.68, style: "grave" },
  "epouvantail-automne": { x: 0.52, y: 0.47, style: "scarecrow" },
  "maitre-des-cauchemars": { ...vortexPosition, style: "vortex" },
  "bouffon-frondeur": { x: 0.512, y: 0.5, style: "stage" },
  "mega-cauchemar": { x: 0.5, y: 0.3, style: "throne" },
};
const bossSpawnMessages = {
  grave: "sort de sa tombe au cimetière !",
  scarecrow: "se dresse au milieu du domaine !",
  vortex: "surgit du vortex !",
  stage: "bondit de la scène du clown !",
  throne: "se matérialise sur son trône !",
};
const enemyGaits = {
  grunt: "waddle",
  scout: "skitter",
  brute: "stomp",
  "serviteur-squelette": "walk",
  "gargouille-epineuse": "stomp",
  "ombre-rampante": "float",
  "petit-bouffon-frondeur": "hop",
  "archer-de-lombre": "walk",
  "soldat-de-lombre": "stomp",
  "goule-de-lombre": "skitter",
  "fossoyeur-maudit": "walk",
  "epouvantail-automne": "stomp",
  "maitre-des-cauchemars": "float",
  "bouffon-frondeur": "hop",
  "mega-cauchemar": "float",
};
const weaponMotions = {
  fronde: { kind: "sling" },
  "double-fronde": { kind: "sling" },
  "arc-long": { kind: "bow" },
  arbalete: { kind: "crossbow" },
  "fusil-pompe": { kind: "gun" },
  "lance-clous": { kind: "gun" },
  "lance-bonbons": { kind: "gun" },
  "faux-spectrale": { kind: "melee" },
  "fouet-ronces": { kind: "melee" },
  "tir-chauve-souris": { kind: "magic" },
  "lanterne-ames": { kind: "magic" },
  "grimoire-maudit": { kind: "magic" },
  "epee-rouillee": { kind: "melee" },
  "epee-chevalier": { kind: "melee" },
  "coutelas-fantome": { kind: "melee" },
  "lame-braise": { kind: "melee" },
  "epee-lune-sanglante": { kind: "melee" },
  "pistolet-silex": { kind: "gun" },
  "revolver-sherif": { kind: "gun" },
  "pistolet-citrouille": { kind: "gun" },
  "pistolet-spectral": { kind: "gun" },
  "canon-roi-ombres": { kind: "gun" },
  "hache-bucheron": { kind: "melee" },
  "lance-centurion": { kind: "melee" },
  "marteau-guerre": { kind: "melee" },
  "dague-assassin": { kind: "melee" },
  "katana-ombre": { kind: "melee" },
  "tromblon-pirate": { kind: "gun" },
  "fusil-precision": { kind: "gun" },
  "pistolet-givre": { kind: "gun" },
  "baguette-foudre": { kind: "magic" },
  "blaster-neon": { kind: "gun" },
};
// Prise en main : point tenu par la main avant (en % de l'image), rotation qui aligne l'arme sur le bras
// tendu, hauteur relative au héros, proportions de l'image, nombre de mains et distance main → bouche
// (en hauteur d'arme). Les armes longues sont tenues au garde-main : la crosse revient vers l'autre main.
const weaponGrips = {
  fronde: { x: 50, y: 80, rotate: 90, size: 0.3, ratio: 0.594, hands: "two", muzzle: 0.3 },
  "double-fronde": { x: 50, y: 80, rotate: 90, size: 0.32, ratio: 0.609, hands: "two", muzzle: 0.3 },
  "arc-long": { x: 34, y: 50, rotate: -90, size: 0.5, ratio: 0.542, hands: "two", muzzle: 0.2 },
  arbalete: { x: 55, y: 48, rotate: 125, size: 0.42, ratio: 1.223, hands: "two", muzzle: 0.69 },
  "fusil-pompe": { x: 47, y: 47, rotate: 133, size: 0.5, ratio: 1.011, hands: "two", muzzle: 0.57 },
  "lance-clous": { x: 55, y: 30, rotate: 90, size: 0.38, ratio: 1.164, hands: "two", muzzle: 0.5 },
  "lance-bonbons": { x: 20, y: 72, rotate: 133, size: 0.3, ratio: 0.885, hands: "one", muzzle: 0.9 },
  "faux-spectrale": { x: 30, y: 50, rotate: 150, size: 0.62, ratio: 0.984, hands: "two", muzzle: 0.55 },
  "fouet-ronces": { x: 12, y: 85, rotate: 142, size: 0.42, ratio: 1.038, hands: "one", muzzle: 0.8 },
  "tir-chauve-souris": { x: 28, y: 72, rotate: 138, size: 0.55, ratio: 0.943, hands: "one", muzzle: 0.65 },
  "lanterne-ames": { x: 50, y: 6, rotate: 0, size: 0.32, ratio: 0.432, hands: "one", muzzle: 0.3, hang: true },
  "grimoire-maudit": { x: 50, y: 12, rotate: 0, size: 0.28, ratio: 1.049, hands: "two", muzzle: 0.3, hang: true },
  "epee-rouillee": { x: 50, y: 84, rotate: 90, size: 0.5, ratio: 0.25, hands: "one", muzzle: 0.85 },
  "epee-chevalier": { x: 50, y: 84, rotate: 90, size: 0.52, ratio: 0.26, hands: "one", muzzle: 0.85 },
  "coutelas-fantome": { x: 50, y: 82, rotate: 90, size: 0.5, ratio: 0.224, hands: "one", muzzle: 0.85 },
  "lame-braise": { x: 50, y: 84, rotate: 90, size: 0.54, ratio: 0.234, hands: "one", muzzle: 0.85 },
  "epee-lune-sanglante": { x: 50, y: 84, rotate: 90, size: 0.58, ratio: 0.318, hands: "one", muzzle: 0.85 },
  "pistolet-silex": { x: 29, y: 81, rotate: 90, size: 0.25, ratio: 1.811, hands: "one", muzzle: 1.3 },
  "revolver-sherif": { x: 33, y: 78, rotate: 90, size: 0.25, ratio: 1.761, hands: "one", muzzle: 1.2 },
  "pistolet-citrouille": { x: 32, y: 87, rotate: 90, size: 0.27, ratio: 1.655, hands: "one", muzzle: 1.15 },
  "pistolet-spectral": { x: 37, y: 82, rotate: 90, size: 0.29, ratio: 1.401, hands: "one", muzzle: 0.9 },
  "canon-roi-ombres": { x: 32, y: 85, rotate: 90, size: 0.29, ratio: 1.524, hands: "one", muzzle: 1.05 },
  "hache-bucheron": { x: 28, y: 86, rotate: 90, size: 0.48, ratio: 0.266, hands: "one", muzzle: 0.85 },
  "lance-centurion": { x: 50, y: 74, rotate: 90, size: 0.78, ratio: 0.12, hands: "two", muzzle: 0.85 },
  "marteau-guerre": { x: 49, y: 86, rotate: 90, size: 0.5, ratio: 0.37, hands: "two", muzzle: 0.85 },
  "dague-assassin": { x: 48, y: 86, rotate: 90, size: 0.3, ratio: 0.13, hands: "one", muzzle: 0.85 },
  "katana-ombre": { x: 48, y: 88, rotate: 90, size: 0.56, ratio: 0.156, hands: "one", muzzle: 0.85 },
  "tromblon-pirate": { x: 30, y: 80, rotate: 90, size: 0.26, ratio: 1.745, hands: "two", muzzle: 1.22 },
  "fusil-precision": { x: 33, y: 52, rotate: 90, size: 0.2, ratio: 2.743, hands: "two", muzzle: 1.84 },
  "pistolet-givre": { x: 30, y: 80, rotate: 90, size: 0.26, ratio: 1.587, hands: "one", muzzle: 1.11 },
  "baguette-foudre": { x: 10, y: 86, rotate: 128, size: 0.3, ratio: 1.143, hands: "one", muzzle: 1.23 },
  "blaster-neon": { x: 30, y: 80, rotate: 90, size: 0.26, ratio: 1.745, hands: "one", muzzle: 1.22 },
};
const shotKinds = {
  fronde: "seed",
  "double-fronde": "seed",
  arbalete: "bolt",
  "arc-long": "arrow",
  "fusil-pompe": "pellet",
  "lance-clous": "nail",
  "lance-bonbons": "candy",
  "faux-spectrale": "bat",
  "tir-chauve-souris": "bat",
  "lanterne-ames": "soul",
  "grimoire-maudit": "rune",
  "fouet-ronces": "thorn",
  "epee-rouillee": "slash",
  "epee-chevalier": "slash",
  "coutelas-fantome": "slash",
  "lame-braise": "slash",
  "epee-lune-sanglante": "slash",
  "pistolet-silex": "bullet",
  "revolver-sherif": "bullet",
  "pistolet-citrouille": "bullet",
  "pistolet-spectral": "bullet",
  "canon-roi-ombres": "bullet",
  "hache-bucheron": "slash",
  "lance-centurion": "slash",
  "marteau-guerre": "slash",
  "dague-assassin": "slash",
  "katana-ombre": "slash",
  "tromblon-pirate": "pellet",
  "fusil-precision": "bullet",
  "pistolet-givre": "bullet",
  "baguette-foudre": "rune",
  "blaster-neon": "bullet",
};
// Chaque lame et chaque pistolet a sa signature : altération infligée, visuel et durée du geste (ms).
const weaponEffects = {
  "epee-rouillee": { fx: "rust", motion: 340, bleed: 1, bleedDuration: 3 },
  "epee-chevalier": { fx: "knight", motion: 320, knockback: 48 },
  "coutelas-fantome": { fx: "ghost", motion: 300, slow: 1.2, slowFactor: 0.6, echo: 0.5 },
  "lame-braise": { fx: "ember", motion: 400, burn: 2, burnDuration: 3 },
  "epee-lune-sanglante": { fx: "moon", motion: 420, wave: 1.6, waveRatio: 0.6, lifesteal: 1 },
  "pistolet-silex": { fx: "flint", motion: 420, knockback: 28 },
  "revolver-sherif": { fx: "sheriff", motion: 200, critChance: 0.2, critMultiplier: 2 },
  "pistolet-citrouille": { fx: "pumpkin", motion: 320, burn: 1, burnDuration: 2.5 },
  "pistolet-spectral": { fx: "spectral", motion: 300, pierce: 2, slow: 1, slowFactor: 0.6 },
  "canon-roi-ombres": { fx: "shadow", motion: 400, splash: 58, splashRatio: 0.5 },
  "hache-bucheron": { fx: "axe", motion: 460, knockback: 36, bleed: 2, bleedDuration: 3 },
  "lance-centurion": { fx: "spear", motion: 360, knockback: 30, thrust: true },
  "marteau-guerre": { fx: "hammer", motion: 560, knockback: 70, stun: 0.6, shock: 80, shockRatio: 0.5 },
  "dague-assassin": { fx: "poison", motion: 200, poison: 2, poisonDuration: 4, critChance: 0.25, critMultiplier: 2.5 },
  "katana-ombre": { fx: "katana", motion: 260, echo: 0.6, bleed: 2, bleedDuration: 3 },
  "tromblon-pirate": { fx: "blunderbuss", motion: 460, knockback: 34, spread: 9, range: 0.65 },
  "fusil-precision": { fx: "sniper", motion: 520, pierce: 3, critChance: 0.35, critMultiplier: 2.5, knockback: 40 },
  "pistolet-givre": { fx: "frost", motion: 280, slow: 2, slowFactor: 0.45, freezeChance: 0.18, freeze: 1 },
  "baguette-foudre": { fx: "storm", motion: 340, chain: 2, chainRange: 170, stun: 0.4 },
  "blaster-neon": { fx: "neon", motion: 180, pierce: 1, critChance: 0.15, critMultiplier: 2, splash: 40, splashRatio: 0.35 },
};
// Millisecondes de vol par pixel : les balles et clous filent, la magie flotte davantage.
const shotSpeeds = { seed: 1.05, candy: 1.1, arrow: 0.62, bolt: 0.58, pellet: 0.42, nail: 0.48, bat: 1.1, soul: 1, rune: 1, thorn: 0.8, bullet: 0.3 };
const shotSparkCounts = { seed: 6, candy: 8, arrow: 5, bolt: 6, pellet: 9, nail: 7, bat: 7, soul: 8, rune: 8, thorn: 7, bullet: 6, slash: 8 };
const lobbedShots = new Set(["seed", "candy"]);
// Articulations en % de l'image : hanche, épaule, séparation des jambes, bord intérieur des bras, bas des mains.
const rigProfiles = {
  "boss-bouffon": [58.6, 22, 50, 29.1, 78.3, 68.5, 61],
  "boss-chambellan": [75, 18, 50, 26.2, 84.2, 77.1, 78.6],
  "boss-epouvantail": [75, 20.8, 55.1, 37.5, 76.6, 76.8, 79.4],
  "boss-fossoyeur": [64.3, 20.8, 50, 17.2, 76.7, 74.2, 74.2],
  "minion-archer-ombre": [66.8, 17.6, 49.8, 20.9, 76.1, 76.6, 76.6],
  "minion-bouffon": [64.5, 33, 49.7, 22.2, 79, 66, 74.2],
  "minion-gargouille": [69.6, 3, 50, 25.8, 75.4, 79.6, 79.6, 36],
  "minion-goule-ombre": [65.6, 29.3, 50, 26.7, 72, 73.4, 75.4],
  "minion-soldat-ombre": [75, 27, 45.9, 14.8, 60.7, 79.7, 79.7],
  "minion-squelette": [75, 23.8, 50, 39.6, 83.8, 79.7, 75.8],
  "heros/aventuriere": [51.9, 24.4, 50, 21.7, 78.3, 65.9, 61.9],
  "heros/cendre": [57.2, 20, 50, 17.3, 81.6, 67.5, 63.1],
  "heros/chevalier": [70, 23.1, 50, 17.9, 79.6, 71.9, 80],
  "heros/citrouille": [53.1, 20.9, 50, 22.6, 76, 63.1, 63.1],
  "heros/demon": [55.6, 18.4, 50, 25.4, 73.7, 65.6, 65.6],
  "heros/epouvantail": [58.4, 27, 49.8, 26.8, 71.2, 68.4, 68.4],
  "heros/fantome": [60.9, 27, 49.8, 25.1, 72.3, 70.9, 70.9],
  "heros/feuillage": [61.2, 23.4, 49.7, 18.6, 80.3, 70.6, 71.6],
  "heros/garde-forestier": [54.7, 22.2, 50, 18.5, 79.8, 65.3, 65.9],
  "heros/loup": [58.4, 27, 50, 21.6, 76.1, 68.4, 68.4],
  "heros/mecanicien": [53.4, 22.5, 49.7, 17.5, 80.7, 61.6, 65],
  "heros/momie": [62.2, 27, 50, 31.2, 73.5, 72.2, 72.2],
  "heros/nomade": [64.4, 27, 50, 12.8, 84.4, 77.5, 74.4],
  "heros/pisteur": [51.6, 21.6, 50, 20.4, 79.6, 63.1, 65.3],
  "heros/renard": [59.1, 27, 49.7, 21.8, 74.1, 69.1, 69.1],
  "heros/secouriste": [56.2, 26, 50, 17.7, 82.3, 59, 60.6],
  "heros/sentinelle": [66.2, 22.5, 49.8, 24.3, 77.4, 76.2, 76.2],
  "heros/sorciere": [70, 20.9, 49.7, 18.1, 69.9, 80, 80],
  "heros/squelette": [60.3, 27, 49.8, 18, 81.5, 70.3, 70.3],
  "heros/survivant": [57.5, 18, 50, 14.7, 80.1, 60, 65.9],
  "heros/vampire": [69.1, 26, 49.8, 11.7, 87.9, 79.1, 79.1],
  "heros/cowboy": [56.9, 21.6, 49.7, 12.4, 85.7, 66.9, 66.9],
  "heros/pirate": [71.2, 25.6, 49.7, 24, 77.7, 80, 80],
  "heros/zombie": [52.8, 21.9, 50, 21.6, 76.3, 62.8, 62.8],
  "heros/ninja": [66.9, 17.2, 50, 19.3, 62.2, 76.9, 76.9],
  "heros/samourai": [58.8, 23.4, 50, 22.3, 79.5, 68.8, 68.8],
  "heros/viking": [57.2, 16.9, 50, 15.8, 82.9, 58.1, 62.2],
  "heros/clown": [57.5, 27, 49.8, 26.5, 73.5, 67.5, 67.5],
  "heros/chasseur-vampires": [61.6, 27, 50, 16.2, 82.8, 71.6, 71.6],
  "heros/astronaute": [53.1, 21.9, 49.8, 19.5, 79.5, 64.7, 63.1],
  "heros/faucheuse": [75, 27, 50, 20.6, 75.7, 80, 80],
  "heros/cyborg": [46.2, 17.8, 50, 22.9, 74.1, 56.2, 56.2],
};
const rigWingArts = new Set(["minion-gargouille"]);
const rigPartNames = ["leg-l", "leg-r", "torso", "arm-l", "arm-r"];

const rigRatios = {};

function buildRig(rig, artName) {
  if (rigRatios[artName]) rig.style.setProperty("--rig-ratio", rigRatios[artName]);
  if (rig.dataset.art === artName) return;
  rig.dataset.art = artName;
  const profile = rigProfiles[artName];
  const source = `./assets/real/${artName}.png`;
  const parts = (profile ? rigPartNames : ["solo"]).map((name) => {
    const part = document.createElement("img");
    part.className = `rig-part rig-${name}`;
    part.src = source;
    part.alt = "";
    part.draggable = false;
    return part;
  });
  parts[0].addEventListener("load", () => {
    rigRatios[artName] = (parts[0].naturalWidth / parts[0].naturalHeight).toFixed(4);
    if (rig.dataset.art === artName) rig.style.setProperty("--rig-ratio", rigRatios[artName]);
  }, { once: true });
  rig.replaceChildren(...parts);
  rig.classList.toggle("rig-limbs", Boolean(profile));
  rig.classList.toggle("rig-wings", rigWingArts.has(artName));
  if (!profile) return;
  const [hip, shoulder, split, armLeft, armRight, handLeft, handRight, pivot = shoulder + 4] = profile;
  const values = {
    hip, shoulder, split, pivot,
    "arm-l": armLeft,
    "arm-r": armRight,
    "hand-l": Math.max(handLeft, hip + 2),
    "hand-r": Math.max(handRight, hip + 2),
  };
  Object.entries(values).forEach(([name, value]) => rig.style.setProperty(`--rig-${name}`, `${value}%`));
}

function createRigArt(className, artName) {
  const art = document.createElement("span");
  art.className = className;
  art.setAttribute("aria-hidden", "true");
  const rig = document.createElement("span");
  rig.className = "rig";
  art.append(rig);
  buildRig(rig, artName);
  return art;
}

function createAtmosphereParticles(count) {
  const particles = Array.from({ length: count }, () => {
    const particle = document.createElement("span");
    particle.className = "atmosphere-particle";
    const duration = 9 + Math.random() * 10;
    particle.style.setProperty("--x", `${Math.random() * 100}%`);
    particle.style.setProperty("--size", `${7 + Math.random() * 9}px`);
    particle.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
    particle.style.setProperty("--duration", `${duration}s`);
    particle.style.setProperty("--delay", `${-Math.random() * duration}s`);
    return particle;
  });
  atmosphereParticles.replaceChildren(...particles);
}
createAtmosphereParticles(26);
let timeLeft = roundLength;
let shootElapsed = 0;
let shootInterval = 0.28;
let previousTime = 0;
let shooting = false;
let gameActive = false;
let restartLock = 0;
let roundId = 0;
let shootingReset;
let weaponDrawReset;
let playerHealth = 100;
let maxPlayerHealth = 100;
let runCoinsEarned = 0;
let runXpEarned = 0;
let bossWarningShown = false;
let playerDamageCooldown = 0;
let dodgeRemaining = 0;
let dodgeInvulnerabilityRemaining = 0;
let dodgeCooldown = 0;
let activeBoostRemaining = 0;
let activeBoostId = "";
let boostCooldown = 0;
let activePowerCooldown = 0;
let activePowerInvulnerabilityRemaining = 0;
const dodgeDuration = 0.24;
const dodgeInvulnerabilityDuration = 0.32;
const dodgeCooldownDuration = 1.1;
const boostCooldownDuration = 10;
const menuMusicTempo = 390;
const gameMusicTempo = 310;
const playerAttackRange = 420;
const autoShootRange = 250;
const rangedFireInterval = 0.46;
const dodgeSpeed = 650;
const dodgeDirection = { x: 0, y: 0 };
let waveNumber = 1;
let waveCountdown = 0;
let bossSpawnElapsed = 0;
let bossAlive = false;
let bossesRemaining = [];
let stage = "waves";
let minionSpawnElapsed = 0;
let portalElement;
let portalDestination = "";
let portalPoint = { ...vortexPosition };
let portalArmRemaining = 0;
let waveCleared = false;
let runElapsed = 0;
let moveMomentum = 0;
let runDustElapsed = 0;
let aimHoldRemaining = 0;
let aimFacingLeft = false;
let runWeaponId = "";
const runLoadout = { ranged: "", melee: "" };
let activeWeaponSlot = "ranged";
let runPickupBonus = 0;
let nearbyWeaponPickup = null;
let fogRadius = 250;
let weaponLevel = 1;
let weaponDamage = 1;
let projectilesPerShot = 1;
let audioContext;
let effectsMaster;
let musicMaster;
let musicCompressor;
let musicTimer;
let musicTimerTempo = 0;
let musicStep = 0;
let ambienceNodes;
let soundEnabled = !gameSettings.muted.master;
let effectsEnabled = !gameSettings.muted.effects;
let musicEnabled = !gameSettings.muted.music;
let autoShootEnabled = true;
let stepSoundElapsed = 0;

function loadProgression() {
  try {
    const saved = window.localStorage.getItem(progressionStorageKey);
    if (!saved) {
      shouldSaveProgression = true;
      return structuredClone(defaultProgression);
    }
    const parsed = JSON.parse(saved);
    const validIds = Object.fromEntries(
      Object.entries(loadoutOptions).map(([category, options]) => [category, new Set(options.map((option) => option.id))]),
    );
    const loaded = structuredClone(defaultProgression);
    if (Number.isSafeInteger(parsed.coins) && parsed.coins >= 0) loaded.coins = parsed.coins;
    if (Number.isSafeInteger(parsed.level) && parsed.level >= 1 && parsed.level <= maxPlayerLevel) loaded.level = parsed.level;
    if (Number.isSafeInteger(parsed.xp) && parsed.xp >= 0) {
      loaded.xp = loaded.level >= maxPlayerLevel ? 0 : Math.min(parsed.xp, getXpForLevel(loaded.level) - 1);
    }
    const legacyBossLoot = Array.isArray(parsed.bossLoot)
      ? new Set(parsed.bossLoot.filter((id) => bossRelicCatalog.some((item) => item.id === id)))
      : new Set();
    if (!parsed.relicInventory || typeof parsed.relicInventory !== "object" || Array.isArray(parsed.relicInventory)) {
      shouldSaveProgression = true;
    }
    for (const relic of bossRelicCatalog) {
      const count = parsed.relicInventory?.[relic.id];
      loaded.relicInventory[relic.id] = Number.isSafeInteger(count) && count >= 0
        ? count
        : legacyBossLoot.has(relic.id) ? 1 : 0;
      if (count !== undefined && (!Number.isSafeInteger(count) || count < 0)) shouldSaveProgression = true;
    }
    loaded.bossLoot = bossRelicCatalog
      .filter((relic) => loaded.relicInventory[relic.id] > 0)
      .map((relic) => relic.id);
    if (typeof parsed.playerName === "string") loaded.playerName = parsed.playerName.trim().slice(0, 16);
    if (Number.isSafeInteger(parsed.playerNameChangedAt)
      && parsed.playerNameChangedAt >= 0
      && parsed.playerNameChangedAt <= Date.now()) {
      loaded.playerNameChangedAt = parsed.playerNameChangedAt;
    }
    for (const path of Object.keys(loaded.improvements)) {
      const level = parsed.improvements?.[path];
      if (Number.isSafeInteger(level) && level >= 0 && level <= 3) {
        loaded.improvements[path] = level;
      } else if (level !== undefined) {
        shouldSaveProgression = true;
      }
    }
    for (const power of activePowerOptions) {
      const level = parsed.powers?.[power.id];
      if (Number.isSafeInteger(level) && level >= 1 && level <= powerMaxLevel) {
        loaded.powers[power.id] = level;
      } else if (level !== undefined) {
        shouldSaveProgression = true;
      }
    }
    for (const weapon of loadoutOptions.weapons) {
      const level = parsed.weaponLevels?.[weapon.id];
      if (Number.isSafeInteger(level) && level >= 1 && level <= weaponMaxLevel) {
        loaded.weaponLevels[weapon.id] = level;
      } else if (level !== undefined) {
        shouldSaveProgression = true;
      }
    }
    if (Number.isSafeInteger(parsed.shopRotation?.index)
      && parsed.shopRotation.index >= 0
      && Number.isSafeInteger(parsed.shopRotation?.startedAt)
      && parsed.shopRotation.startedAt > 0
      && parsed.shopRotation.startedAt <= Date.now()) {
      loaded.shopRotation = {
        index: parsed.shopRotation.index,
        startedAt: parsed.shopRotation.startedAt,
        freeOfferItemId: [...shopCatalog, ...improvementOptions, ...powerUpgradeOptions].some((item) => item.id === parsed.shopRotation.freeOfferItemId)
          ? parsed.shopRotation.freeOfferItemId
          : "",
        freeOfferClaimed: parsed.shopRotation.freeOfferClaimed === true,
      };
      if (typeof parsed.shopRotation.freeOfferItemId !== "string"
        || typeof parsed.shopRotation.freeOfferClaimed !== "boolean") {
        shouldSaveProgression = true;
      }
    } else {
      shouldSaveProgression = true;
    }
    for (const boost of boostOptions) {
      const count = parsed.boostInventory?.[boost.id];
      if (Number.isSafeInteger(count) && count >= 0) loaded.boostInventory[boost.id] = count;
    }
    if (boostOptions.some((boost) => boost.id === parsed.equippedBoost)
      && loaded.boostInventory[parsed.equippedBoost] > 0) {
      loaded.equippedBoost = parsed.equippedBoost;
    }
    for (const category of Object.keys(loadoutOptions)) {
      if (Array.isArray(parsed.unlocked?.[category])) {
        loaded.unlocked[category] = [...new Set([
          ...loaded.unlocked[category],
          ...parsed.unlocked[category].filter((id) => validIds[category].has(id)),
        ])];
      }
      if (category === "activePowers" && parsed.equipped?.[category] === "") {
        loaded.equipped[category] = "";
      } else if (validIds[category].has(parsed.equipped?.[category])
        && loaded.unlocked[category].includes(parsed.equipped[category])) {
        loaded.equipped[category] = parsed.equipped[category];
      }
    }
    if (isMeleeWeapon(parsed.equipped?.melee) && loaded.unlocked.weapons.includes(parsed.equipped.melee)) {
      loaded.equipped.melee = parsed.equipped.melee;
    } else {
      shouldSaveProgression = true;
    }
    if (isMeleeWeapon(loaded.equipped.weapons)) {
      loaded.equipped.melee = loaded.equipped.weapons;
      loaded.equipped.weapons = defaultProgression.equipped.weapons;
      shouldSaveProgression = true;
    }
    return loaded;
  } catch {
    shouldSaveProgression = false;
    if (progressionFeedback) {
      progressionFeedback.textContent = "La sauvegarde n'a pas pu être lue. La progression repart à zéro.";
    }
    return structuredClone(defaultProgression);
  }
}

function saveProgression(message = "") {
  try {
    window.localStorage.setItem(progressionStorageKey, JSON.stringify(progression));
    if (activeAccount) storeActiveAccountProgression();
    queueServerAccountSave();
    progressionFeedback.textContent = message;
    return true;
  } catch {
    progressionFeedback.textContent = "Sauvegarde indisponible : tes pièces et achats ne seront pas conservés après fermeture.";
    return false;
  }
}

function updateMenuBalance() {
  const label = String(progression.coins);
  if (menuCoins.textContent === label) return;
  menuCoins.textContent = label;
  menuCoinsHome.textContent = label;
  hudCoins.textContent = `${label} ◉`;
  hudCoins.classList.remove("is-bump");
  void hudCoins.offsetWidth;
  hudCoins.classList.add("is-bump");
}

function updatePlayerNameDisplay() {
  const displayName = progression.playerName || "Survivant";
  playerNameDisplay.textContent = displayName;
  playerNameTag.textContent = displayName;
  playerNameTag.setAttribute("aria-hidden", "true");
}

function updatePlayerNameCooldown(now = Date.now()) {
  const remaining = progression.playerName && progression.playerNameChangedAt > 0
    ? Math.max(0, pseudoChangeCooldown - (now - progression.playerNameChangedAt))
    : 0;
  const locked = remaining > 0;
  playerNameInput.readOnly = locked;
  playerNameInput.setAttribute("aria-readonly", String(locked));
  if (!locked) {
    playerNameFeedback.textContent = "Tu pourras modifier ton pseudo une heure après l'avoir enregistré.";
    playerNameFeedback.hidden = false;
    playerNameInput.title = "";
    return;
  }
  const totalSeconds = Math.ceil(remaining / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  playerNameInput.title = `Le pseudo sera modifiable dans ${minutes} min ${seconds} s.`;
  playerNameFeedback.textContent = `Pseudo verrouillé · modification possible dans ${minutes} min ${String(seconds).padStart(2, "0")} s`;
  playerNameFeedback.hidden = false;
}

function isShopItemForSale(item) {
  return item.category !== "skins" || item.halloween === true;
}

function getCurrentShopItems() {
  const offers = [];
  for (const [category, count] of Object.entries(shopCategoryQuotas)) {
    const candidates = shopCatalog.filter((item) => item.category === category
      && isShopItemForSale(item)
      && (category === "boosts" || !isShopItemOwned(item)));
    if (category === "skins") {
      candidates.sort((a, b) => shopItemHash(a.id) - shopItemHash(b.id));
      if (candidates.length === 0) continue;
      const start = (activeShopRotation * count) % candidates.length;
      offers.push(...Array.from({ length: Math.min(count, candidates.length) }, (_, offset) =>
        candidates[(start + offset) % candidates.length]));
      continue;
    }
    candidates.sort((a, b) => rotationRandom(activeShopRotation, shopItemHash(a.id))
      - rotationRandom(activeShopRotation, shopItemHash(b.id)));
    offers.push(...candidates.slice(0, count));
  }
  return offers.map((item) => ({ ...item, basePrice: item.price, price: getRotationPrice(item) }));
}

const shopTabNotes = {
  packs: "Packs complets : un costume, des armes et un pouvoir à prix réduit (-30 %). Tu ne paies que les objets que tu n'as pas encore.",
  skins: "Caisses de costumes : chaque ouverture donne une tenue au hasard. Raretés : Commun, Peu commun, Rare, Légendaire, Divin. Un doublon te rembourse une partie du prix.",
  weapons: "Caisses d'armes : chaque ouverture donne un objet au hasard. Raretés : Commun, Peu commun, Rare, Légendaire, Divin. Un doublon d'arme l'améliore gratuitement d'un niveau.",
  activePowers: "Caisses de pouvoirs (touche O en partie) : un pouvoir au hasard. Un doublon fait monter ton pouvoir d'un niveau gratuitement.",
  characters: "Change l'allure de ton survivant.",
  equipment: "Vêtements et sacs qui modifient tes statistiques.",
  boosts: "Consommables cumulables : chaque achat ajoute une utilisation (touche P).",
  improvements: "Améliorations permanentes : achète les niveaux dans l'ordre. Tes armes et pouvoirs s'améliorent dans le casier, onglet « Améliorations ».",
};

function getShopTabItems(tab) {
  if (tab === "improvements") return improvementOptions;
  const included = loadoutOptions[tab]
    ?.filter((option) => option.price === 0 || !shopCatalog.some((item) => item.id === option.id && item.category === tab))
    .filter((option) => tab !== "skins" || progression.unlocked.skins.includes(option.id))
    .map((option) => ({ ...option, category: tab, price: 0, included: true })) ?? [];
  return [...included, ...shopCatalog.filter((item) => item.category === tab && isShopItemForSale(item))];
}

function findShopItem(itemId, category) {
  const pool = category === "improvements" ? improvementOptions
    : category === "powers" ? powerUpgradeOptions
    : [...shopCatalog, ...getShopTabItems(category)];
  return pool.find((entry) => entry.id === itemId && entry.category === category);
}

function getFeaturedOffer(item) {
  return getCurrentShopItems().find((offer) => offer.id === item.id && offer.category === item.category);
}

function getShopItemPrice(item) {
  return getFeaturedOffer(item)?.price ?? item.price;
}

function getShopItemLockReason(item) {
  if (item.category === "improvements" && progression.improvements[item.path] < item.level - 1) {
    return "Niveau précédent requis";
  }
  if (item.category === "powers") {
    if (!progression.unlocked.activePowers.includes(item.path)) return "Pouvoir à débloquer";
    if (progression.powers[item.path] < item.level - 1) return "Niveau précédent requis";
  }
  return "";
}

function isShopItemEquipped(item) {
  if (item.category === "boosts") return progression.equippedBoost === item.id;
  return isLoadoutEquipped(item.category, item.id);
}

function updateShopRotation(delta = 0) {
  shopRotationElapsed += delta;
  if (shopRotationElapsed < 1) return;
  shopRotationElapsed %= 1;

  const now = Date.now();
  const elapsed = now - progression.shopRotation.startedAt;
  updatePlayerNameCooldown(now);
  if (elapsed >= shopRotationDuration) {
    const completedRotations = Math.floor(elapsed / shopRotationDuration);
    progression.shopRotation.index += completedRotations;
    progression.shopRotation.startedAt += completedRotations * shopRotationDuration;
    activeShopRotation = progression.shopRotation.index;
    assignFreeShopOffer();
    saveProgression("La boutique propose un nouveau stock.");
    renderShop();
    shopRotationNote.textContent = "Nouveau stock pour 45 minutes. Une offre gratuite avait 30 % de chances d'apparaître.";
  }
  const remaining = Math.max(0, shopRotationDuration - (now - progression.shopRotation.startedAt));
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  shopRotationCountdown.textContent = `Prochain stock dans ${minutes} min ${String(seconds).padStart(2, "0")} s`;
  if (!shopRotationNote.textContent) {
    shopRotationNote.textContent = "Le stock change toutes les 45 minutes. Une offre gratuite a 30 % de chances d'apparaître à chaque rotation.";
  }
}

function rotationRandom(index, salt) {
  const value = Math.sin((index + 1) * 127.1 + (salt + 1) * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function shopItemHash(itemId) {
  return [...itemId].reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) % 100_000, 7);
}

function getRotationPrice(item) {
  const priceSteps = [0.6, 0.7, 0.75, 0.8, 0.9];
  const step = (activeShopRotation + shopItemHash(item.id)) % priceSteps.length;
  return Math.max(5, Math.round((item.price * priceSteps[step]) / 5) * 5);
}

function assignFreeShopOffer() {
  progression.shopRotation.freeOfferItemId = "";
  progression.shopRotation.freeOfferClaimed = false;
  if (rotationRandom(progression.shopRotation.index, 0) >= 0.3) return;
  const available = getCurrentShopItems().filter((item) => !isShopItemOwned(item));
  if (available.length === 0) return;
  const selected = Math.floor(rotationRandom(progression.shopRotation.index, 1) * available.length);
  progression.shopRotation.freeOfferItemId = available[selected].id;
}

function createCharacterPreview(
  characterId,
  skinId,
  equipmentId = progression.equipped.equipment,
  weaponId = progression.equipped.weapons,
  coatingId = progression.equipped.coatings,
) {
  const preview = document.createElement("span");
  preview.className = `character-preview character-${characterId} skin-${skinId} equipment-${equipmentId} weapon-${weaponId}`;
  preview.setAttribute("aria-hidden", "true");
  const characterArt = document.querySelector(".hero-real").cloneNode(true);
  characterArt.classList.add("preview-art");
  updateHeroRealArt(characterArt, characterId, skinId, weaponId, coatingId);
  preview.append(characterArt);
  return preview;
}

const heroArtCharacters = ["pisteur", "secouriste", "sentinelle"];

function getHeroArtName(characterId, skinId) {
  const name = skinId === "survivant" && heroArtCharacters.includes(characterId) ? characterId : skinId;
  return `heros/${name}`;
}

function getWeaponArtSource(weaponId) {
  return `./assets/real/armes/${weaponId}.png`;
}

function updateHeroRealArt(container, characterId, skinId, weaponId, coatingId = progression.equipped.coatings) {
  const rig = container.querySelector(".hero-real-body .rig");
  const weapon = container.querySelector(".hero-real-weapon");
  const flash = container.querySelector(".hero-weapon-flash");
  if (rig) buildRig(rig, getHeroArtName(characterId, skinId));
  if (weapon) {
    const weaponSource = getWeaponArtSource(weaponId);
    if (weapon.getAttribute("src") !== weaponSource) weapon.src = weaponSource;
    weapon.hidden = !loadoutOptions.weapons.some((item) => item.id === weaponId);
    weapon.dataset.coating = coatingId;
  }
  const grip = weaponGrips[weaponId] ?? weaponGrips.fronde;
  if (rig && weapon) {
    let mount = rig.querySelector(":scope > .rig-weapon-mount");
    if (!mount) {
      mount = document.createElement("span");
      mount.className = "rig-weapon-mount";
      rig.append(mount);
    }
    if (weapon.parentElement !== mount) mount.append(weapon);
    if (flash && flash.parentElement !== mount) mount.append(flash);
    mount.style.setProperty("--grip-x", `${grip.x}%`);
    mount.style.setProperty("--grip-y", `${grip.y}%`);
    mount.style.setProperty("--hold-rotate", `${grip.rotate}deg`);
    mount.style.setProperty("--hold-size", String(grip.size));
    mount.style.setProperty("--hold-ratio", String(grip.ratio));
    mount.style.setProperty("--muzzle", String(grip.muzzle));
    mount.toggleAttribute("data-hang", Boolean(grip.hang));
  }
  container.dataset.weaponMotion = weaponMotions[weaponId]?.kind ?? "sling";
  container.dataset.weaponHands = grip.hands;
  container.dataset.weaponStyle = weaponEffects[weaponId]?.fx ?? "";
}

function createCoatingArt(coatingId, weaponId = progression.equipped.weapons) {
  const art = document.createElement("img");
  art.className = "shop-item-art";
  art.src = getWeaponArtSource(weaponId);
  art.alt = "";
  art.draggable = false;
  art.dataset.coating = coatingId;
  return art;
}

function createShopPreviewIcon(item) {
  if (item.category !== "weapons") {
    const icon = document.createElement("span");
    icon.className = "shop-item-icon";
    icon.textContent = item.icon;
    return icon;
  }
  const art = document.createElement("img");
  art.className = "shop-item-art";
  art.src = getWeaponArtSource(item.id);
  art.alt = "";
  art.draggable = false;
  if (loadoutOptions.weapons.find((weapon) => weapon.id === item.id)?.melee) art.dataset.shape = "blade";
  return art;
}

function updateLoadoutPreview() {
  const character = loadoutOptions.characters.find((item) => item.id === progression.equipped.characters);
  const skin = loadoutOptions.skins.find((item) => item.id === progression.equipped.skins);
  if (!character || !skin) return;
  const appearance = document.createElement("span");
  appearance.className = "loadout-preview-label";
  const skinName = document.createElement("strong");
  skinName.textContent = skin.label;
  const characterName = document.createElement("span");
  characterName.textContent = character.label;
  appearance.append(skinName, characterName);
  loadoutPreviewContent.replaceChildren(
    createCharacterPreview(character.id, skin.id, progression.equipped.equipment, progression.equipped.weapons),
    appearance,
  );
}

function refreshLoadoutMenu() {
  playerNameInput.value = progression.playerName;
  updatePlayerNameCooldown();
  updatePlayerNameDisplay();
  updateBoostButton();
  updateLoadoutPreview();
  updateMenuBalance();
}

function applyCharacterAppearance(
  element,
  characterId,
  skinId,
  equipmentId = progression.equipped.equipment,
  weaponId = progression.equipped.weapons,
) {
  element.classList.remove(
    ...loadoutOptions.characters.map((item) => `character-${item.id}`),
    ...loadoutOptions.skins.map((item) => `skin-${item.id}`),
    ...loadoutOptions.equipment.map((item) => `equipment-${item.id}`),
    ...loadoutOptions.weapons.map((item) => `weapon-${item.id}`),
  );
  element.classList.add(
    `character-${characterId}`,
    `skin-${skinId}`,
    `equipment-${equipmentId}`,
    `weapon-${weaponId}`,
  );
  updateHeroRealArt(element, characterId, skinId, weaponId);
}

function isShopItemOwned(item) {
  if (item.category === "improvements") return progression.improvements[item.path] >= item.level;
  if (item.category === "powers") return progression.powers[item.path] >= item.level;
  return item.category === "boosts"
    ? progression.boostInventory[item.id] > 0
    : progression.unlocked[item.category].includes(item.id);
}

function getShopCategoryLabel(category) {
  const labels = {
    characters: "Personnage",
    skins: "Tenue et chapeau",
    equipment: "Vêtement et équipement",
    weapons: "Arme",
    melee: "Arme de mêlée",
    coatings: "Revêtement d'arme",
    activePowers: "Pouvoir actif · touche O",
    boosts: "Boost",
    improvements: "Amélioration permanente",
    powers: "Pouvoir permanent",
  };
  return labels[category] ?? "Accessoire";
}

function getPowerLevel(powerId) {
  return progression.powers[powerId] ?? 1;
}

function isMeleeWeapon(weaponId) {
  return Boolean(loadoutOptions.weapons.find((weapon) => weapon.id === weaponId)?.melee);
}

function getEquipSlot(category, itemId) {
  return category === "weapons" && isMeleeWeapon(itemId) ? "melee" : category;
}

function isLoadoutEquipped(category, itemId) {
  return progression.equipped[getEquipSlot(category, itemId)] === itemId;
}

function equipLoadoutItem(category, itemId) {
  progression.equipped[getEquipSlot(category, itemId)] = itemId;
}

function getWeaponLevel(weaponId) {
  return progression.weaponLevels[weaponId] ?? 1;
}

function getWeaponStats(weapon, level = getWeaponLevel(weapon.id)) {
  const steps = level - 1;
  const melee = Boolean(weapon.melee);
  const leveledInterval = weapon.interval * (1 - steps * 0.035);
  return {
    damage: weapon.damage + steps * Math.max(1, Math.round(weapon.damage * 0.25)),
    interval: melee ? Math.max(weapon.interval * 0.78, leveledInterval) : rangedFireInterval,
  };
}

function getPermanentDamageBonus() {
  return improvementOptions
    .filter((item) => item.path === "damage" && item.level <= progression.improvements.damage)
    .reduce((total, item) => total + item.bonus, 0);
}

function createShopCard(item, featured = false) {
  const isOwned = isShopItemOwned(item) || item.included === true;
  const isUpgrade = item.category === "improvements" || item.category === "powers";
  const isConsumable = item.category === "boosts";
  const isEquipped = !isUpgrade && isOwned && isShopItemEquipped(item);
  const lockReason = isOwned ? "" : getShopItemLockReason(item);
  const rarityLabels = { violette: "Violette", orange: "Orange", doree: "Dorée" };
  const rarity = item.category === "weapons" ? item.rarity : "";
  const offer = getFeaturedOffer(item);
  const price = offer?.price ?? item.price;
  const discount = offer ? Math.round((1 - offer.price / item.price) * 100) : 0;
  const isFreeOffer = Boolean(offer)
    && progression.shopRotation.freeOfferItemId === item.id
    && !progression.shopRotation.freeOfferClaimed
    && !isOwned;
  const card = document.createElement("article");
  card.className = [
    "shop-card",
    "store-card",
    featured ? "store-card-featured" : "",
    isOwned && !isConsumable ? "store-card-owned" : "",
    isEquipped ? "store-card-equipped" : "",
    lockReason ? "store-card-locked" : "",
    isUpgrade ? `shop-card-improvement shop-card-tier-${item.level}` : "",
    rarity ? `shop-card-rarity rarity-${rarity}` : "",
  ].filter(Boolean).join(" ");

  const badges = document.createElement("div");
  badges.className = "store-badges";
  const addBadge = (text, kind) => {
    const badge = document.createElement("span");
    badge.className = `store-badge store-badge-${kind}`;
    badge.textContent = text;
    badges.append(badge);
  };
  if (isFreeOffer) addBadge("GRATUIT", "free");
  else if (discount > 0 && !isOwned) addBadge(`-${discount} %`, "promo");
  if (item.halloween) addBadge("HALLOWEEN", "halloween");
  if (isEquipped) addBadge("ÉQUIPÉ", "equipped");
  else if (isOwned && !isConsumable && !isUpgrade) addBadge("POSSÉDÉ", "owned");

  const preview = document.createElement("div");
  preview.className = "shop-preview store-preview";
  preview.setAttribute("aria-hidden", "true");
  if (item.category === "characters" || item.category === "skins" || item.category === "equipment") {
    preview.append(createCharacterPreview(
      item.category === "characters" ? item.id : progression.equipped.characters,
      item.category === "skins" ? item.id : item.category === "characters" ? "survivant" : progression.equipped.skins,
      item.category === "equipment" ? item.id : progression.equipped.equipment,
    ));
  } else {
    preview.append(createShopPreviewIcon(item));
  }

  const category = document.createElement("span");
  category.className = `shop-item-category${rarity ? ` rarity-label rarity-${rarity}` : ""}`;
  const typeLabel = getItemTypeLabel(item.category, item);
  category.textContent = [
    getShopCategoryLabel(item.category),
    typeLabel,
    rarity ? rarityLabels[rarity] : "",
  ].filter(Boolean).join(" · ");
  const title = document.createElement("h3");
  title.textContent = item.label;
  const description = document.createElement("p");
  description.textContent = item.description;

  const stats = document.createElement("dl");
  stats.className = "store-stats";
  const addStat = (label, value) => {
    const term = document.createElement("dt");
    term.textContent = label;
    const detail = document.createElement("dd");
    detail.textContent = value;
    stats.append(term, detail);
  };
  const weaponStats = item.category === "weapons"
    ? loadoutOptions.weapons.find((weapon) => weapon.id === item.id)
    : undefined;
  if (weaponStats) {
    addStat("Dégâts", String(weaponStats.damage));
    addStat("Tirs/s", (1 / weaponStats.interval).toFixed(1));
    addStat("Projectiles", String(weaponStats.projectiles));
  }
  if (item.category === "activePowers") addStat("Recharge", `${item.cooldown} s`);
  if (isConsumable) addStat("En stock", String(progression.boostInventory[item.id]));

  const footer = document.createElement("div");
  footer.className = "shop-card-footer store-card-footer";
  const priceTag = document.createElement("span");
  priceTag.className = "store-price";
  if (item.included) {
    priceTag.textContent = "Inclus";
  } else if (isOwned && !isConsumable) {
    priceTag.textContent = isUpgrade ? "Acquis" : "Débloqué";
  } else if (isFreeOffer) {
    priceTag.textContent = "OFFERT";
  } else {
    if (discount > 0) {
      const oldPrice = document.createElement("s");
      oldPrice.textContent = `${item.price}`;
      priceTag.append(oldPrice, " ");
    }
    const currentPrice = document.createElement("strong");
    currentPrice.textContent = `${price} ◉`;
    priceTag.append(currentPrice);
  }

  const button = document.createElement("button");
  button.type = "button";
  button.dataset.itemId = item.id;
  button.dataset.category = item.category;
  const canEquip = isOwned && !isUpgrade && (!isConsumable || progression.boostInventory[item.id] > 0);
  if (canEquip && !isConsumable) {
    button.className = "shop-buy-button store-equip-button";
    button.dataset.action = "equip";
    button.textContent = isEquipped ? "Équipé" : "Équiper";
    button.disabled = isEquipped;
  } else if (isOwned && isUpgrade) {
    button.className = "shop-buy-button";
    button.textContent = "Acquis";
    button.disabled = true;
  } else {
    button.className = isFreeOffer ? "shop-buy-button shop-buy-free" : "shop-buy-button";
    button.dataset.action = "buy";
    button.textContent = lockReason || (isFreeOffer ? "Réclamer" : progression.coins < price ? "Pas assez de pièces" : "Acheter");
    button.disabled = Boolean(lockReason) || (!isFreeOffer && progression.coins < price);
  }
  footer.append(priceTag, button);
  if (isConsumable && canEquip) {
    const equip = document.createElement("button");
    equip.type = "button";
    equip.className = "shop-buy-button store-equip-button";
    equip.dataset.itemId = item.id;
    equip.dataset.category = item.category;
    equip.dataset.action = "equip";
    equip.textContent = isEquipped ? "Équipé" : "Équiper";
    equip.disabled = isEquipped;
    footer.append(equip);
  }
  card.append(badges, preview, category, title, description, ...(stats.childElementCount > 0 ? [stats] : []), footer);
  return card;
}

function getCratePool(crate) {
  return loadoutOptions[crate.category].filter(crate.includes);
}

function getCrateTierChances(crate) {
  const pool = getCratePool(crate);
  const tiers = crateTierOrder.filter((tier) => crate.odds[tier] > 0 && pool.some((item) => item.tier === tier));
  const total = tiers.reduce((sum, tier) => sum + crate.odds[tier], 0);
  return tiers.map((tier) => ({ tier, chance: crate.odds[tier] / total, items: pool.filter((item) => item.tier === tier) }));
}

function rollCrate(crate) {
  const chances = getCrateTierChances(crate);
  let roll = Math.random();
  const pick = chances.find((entry) => (roll -= entry.chance) < 0) ?? chances.at(-1);
  return pick.items[Math.floor(Math.random() * pick.items.length)];
}

function formatChance(chance) {
  const percent = chance * 100;
  return `${percent >= 10 ? Math.round(percent) : percent.toFixed(1).replace(".", ",")} %`;
}

function createCrateItemArt(crate, item) {
  if (crate.category === "coatings") return createCoatingArt(item.id);
  if (crate.category === "weapons") return createShopPreviewIcon({ ...item, category: "weapons" });
  if (crate.category === "skins") {
    return createCharacterPreview(progression.equipped.characters, item.id, progression.equipped.equipment);
  }
  const icon = document.createElement("span");
  icon.className = "shop-item-icon crate-power-icon";
  icon.textContent = item.icon;
  return icon;
}

function createCrateBox(crate) {
  const box = document.createElement("span");
  box.className = `crate-box crate-style-${crate.style}`;
  box.setAttribute("aria-hidden", "true");
  const lid = document.createElement("span");
  lid.className = "crate-lid";
  const body = document.createElement("span");
  body.className = "crate-body";
  const emblem = document.createElement("span");
  emblem.className = "crate-emblem";
  emblem.textContent = crate.emblem;
  body.append(emblem);
  box.append(lid, body);
  return box;
}

function createCrateCard(crate) {
  const card = document.createElement("article");
  card.className = `shop-card store-card crate-card crate-card-${crate.style}${crate.premium ? " is-premium" : ""}`;
  const badges = document.createElement("div");
  badges.className = "store-badges";
  if (crate.premium) {
    const badge = document.createElement("span");
    badge.className = "store-badge store-badge-premium";
    badge.textContent = "PREMIUM";
    badges.append(badge);
  }
  const preview = document.createElement("div");
  preview.className = "shop-preview store-preview crate-preview";
  preview.append(createCrateBox(crate));
  const category = document.createElement("span");
  category.className = "shop-item-category";
  category.textContent = crateCategoryLabels[crate.category];
  const title = document.createElement("h3");
  title.textContent = crate.label;
  const description = document.createElement("p");
  description.textContent = crate.description;

  const owned = progression.unlocked[crate.category];
  const contents = document.createElement("ul");
  contents.className = "crate-contents";
  contents.setAttribute("aria-label", "Contenu possible de la caisse");
  for (const { tier, chance, items } of getCrateTierChances(crate)) {
    for (const item of items) {
      const entry = document.createElement("li");
      entry.className = `crate-content tier-${tier}${owned.includes(item.id) ? " is-owned" : ""}`;
      const odds = formatChance(chance / items.length);
      const typeLabel = getItemTypeLabel(crate.category, item);
      entry.title = `${item.label}${typeLabel ? ` (${typeLabel})` : ""} · ${crateTierLabels[tier]} · ${odds}${owned.includes(item.id) ? " · possédé" : ""}`;
      const label = document.createElement("span");
      label.textContent = odds;
      entry.append(createCrateItemArt(crate, item), label);
      contents.append(entry);
    }
  }
  const pool = getCrateTierChances(crate).flatMap((entry) => entry.items);
  const progress = document.createElement("span");
  progress.className = "crate-owned";
  progress.textContent = `${pool.filter((item) => owned.includes(item.id)).length}/${pool.length} possédés`;

  const footer = document.createElement("div");
  footer.className = "shop-card-footer store-card-footer";
  const priceTag = document.createElement("span");
  priceTag.className = "store-price";
  const price = document.createElement("strong");
  price.textContent = `${crate.price} ◉`;
  priceTag.append(price);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "shop-buy-button crate-open-button";
  button.dataset.action = "open-crate";
  button.dataset.crateId = crate.id;
  button.disabled = progression.coins < crate.price;
  button.textContent = button.disabled ? "Pas assez de pièces" : "Ouvrir";
  footer.append(priceTag, button);
  card.append(badges, preview, category, title, description, contents, progress, footer);
  return card;
}

const crateReelPitch = 124;
const crateReelWinnerIndex = 44;
let crateOpening = null;

function grantCrateReward(crate, item) {
  const owned = progression.unlocked[crate.category];
  if (!owned.includes(item.id)) {
    owned.push(item.id);
    return "NOUVEAU ! Ajouté à ton casier.";
  }
  if (crate.category === "weapons" && getWeaponLevel(item.id) < weaponMaxLevel) {
    progression.weaponLevels[item.id] = getWeaponLevel(item.id) + 1;
    return `Doublon : amélioration gratuite, ton arme passe au niveau ${progression.weaponLevels[item.id]} !`;
  }
  if (crate.category === "activePowers" && getPowerLevel(item.id) < powerMaxLevel) {
    progression.powers[item.id] = getPowerLevel(item.id) + 1;
    return `Doublon : amélioration gratuite, ton pouvoir passe au niveau ${progression.powers[item.id]} !`;
  }
  const refund = Math.round((crate.price * 0.35) / 5) * 5;
  progression.coins += refund;
  return `Doublon : +${refund} pièces remboursées.`;
}

function openCrate(crateId) {
  const crate = shopCrates.find((entry) => entry.id === crateId);
  if (!crate) throw new Error(`Caisse inconnue : ${crateId}`);
  if (progression.coins < crate.price) {
    progressionFeedback.textContent = "Tu n'as pas assez de pièces pour ouvrir cette caisse.";
    return;
  }
  progression.coins -= crate.price;
  const item = rollCrate(crate);
  const reward = grantCrateReward(crate, item);
  saveProgression(`${crate.label} en cours d'ouverture…`);
  renderShop();
  refreshLoadoutMenu();
  if (!lockerScreen.hidden) renderLocker();
  showCrateOpening(crate, item, reward);
}

function getCrateOverlay() {
  if (crateOpening) return crateOpening;
  const overlay = document.createElement("div");
  overlay.className = "crate-opening";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Ouverture de caisse");
  overlay.innerHTML = `
    <div class="crate-opening-panel">
      <h2 class="crate-opening-title"></h2>
      <div class="crate-reel">
        <div class="crate-reel-strip"></div>
        <span class="crate-reel-marker" aria-hidden="true"></span>
      </div>
      <div class="crate-result" hidden aria-live="polite">
        <div class="crate-result-art" aria-hidden="true"></div>
        <span class="crate-result-tier"></span>
        <strong class="crate-result-name"></strong>
        <p class="crate-result-note"></p>
      </div>
      <div class="crate-opening-actions">
        <button type="button" class="menu-secondary" data-crate-action="skip">Passer</button>
        <button type="button" class="shop-buy-button store-equip-button" data-crate-action="equip" hidden>Équiper</button>
        <button type="button" class="shop-buy-button" data-crate-action="again" hidden></button>
        <button type="button" class="menu-secondary" data-crate-action="close" hidden>Fermer</button>
      </div>
    </div>`;
  document.body.append(overlay);
  crateOpening = { overlay, crate: null, item: null, reward: "", animation: null, tickFrame: 0, revealed: false };
  overlay.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest("[data-crate-action]");
    if (!(button instanceof HTMLButtonElement) || button.disabled) return;
    const action = button.dataset.crateAction;
    if (action === "skip") crateOpening.animation?.finish();
    else if (action === "equip") equipCrateReward();
    else if (action === "again") openCrate(crateOpening.crate.id);
    else if (action === "close") closeCrateOpening();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden && crateOpening.revealed) closeCrateOpening();
  });
  return crateOpening;
}

function setCrateActions(revealed) {
  const { overlay, crate, item } = crateOpening;
  const button = (action) => overlay.querySelector(`[data-crate-action="${action}"]`);
  button("skip").hidden = revealed;
  button("close").hidden = !revealed;
  button("equip").hidden = !revealed || isLoadoutEquipped(crate.category, item.id);
  const again = button("again");
  again.hidden = !revealed;
  again.disabled = progression.coins < crate.price;
  again.textContent = again.disabled ? "Pas assez de pièces" : `Rouvrir · ${crate.price} ◉`;
  (revealed ? button("close") : button("skip")).focus();
}

function showCrateOpening(crate, item, reward) {
  const state = getCrateOverlay();
  cancelAnimationFrame(state.tickFrame);
  state.animation?.cancel();
  Object.assign(state, { crate, item, reward, revealed: false });
  const { overlay } = state;
  overlay.hidden = false;
  overlay.querySelector(".crate-opening-panel").className = `crate-opening-panel crate-style-${crate.style}`;
  overlay.querySelector(".crate-opening-title").textContent = crate.label;
  overlay.querySelector(".crate-result").hidden = true;
  const strip = overlay.querySelector(".crate-reel-strip");
  const reelItems = Array.from({ length: crateReelWinnerIndex + 6 }, (_, index) =>
    index === crateReelWinnerIndex ? item : rollCrate(crate));
  strip.replaceChildren(...reelItems.map((entry, index) => {
    const card = document.createElement("div");
    card.className = `crate-reel-item tier-${entry.tier}`;
    if (index === crateReelWinnerIndex) card.dataset.winner = "";
    const name = document.createElement("span");
    name.textContent = entry.label;
    card.append(createCrateItemArt(crate, entry), name);
    return card;
  }));
  setCrateActions(false);
  const reelWidth = overlay.querySelector(".crate-reel").clientWidth;
  const cardWidth = crateReelPitch - 8;
  const landing = crateReelWinnerIndex * crateReelPitch + cardWidth / 2 + randomBetween(-0.42, 0.42) * cardWidth;
  state.animation = strip.animate(
    [{ transform: "translateX(0px)" }, { transform: `translateX(${reelWidth / 2 - landing}px)` }],
    { duration: 5600, easing: "cubic-bezier(0.08, 0.62, 0.1, 1)", fill: "forwards" },
  );
  let lastIndex = -1;
  const tick = () => {
    const offset = new DOMMatrixReadOnly(getComputedStyle(strip).transform).m41;
    const index = Math.floor((reelWidth / 2 - offset) / crateReelPitch);
    if (index !== lastIndex) {
      lastIndex = index;
      playTone(1250, 0.035, "square", 0.05, 0.7);
    }
    state.tickFrame = requestAnimationFrame(tick);
  };
  state.tickFrame = requestAnimationFrame(tick);
  const animation = state.animation;
  animation.finished.then(() => {
    if (state.animation === animation) revealCrateReward();
  }).catch(() => {});
}

function revealCrateReward() {
  const state = crateOpening;
  if (state.revealed) return;
  state.revealed = true;
  cancelAnimationFrame(state.tickFrame);
  const { overlay, crate, item, reward } = state;
  overlay.querySelector(".crate-reel-item[data-winner]")?.classList.add("is-winner");
  const result = overlay.querySelector(".crate-result");
  result.className = `crate-result tier-${item.tier}`;
  result.hidden = false;
  overlay.querySelector(".crate-result-art").replaceChildren(createCrateItemArt(crate, item));
  overlay.querySelector(".crate-result-tier").textContent = [crateTierLabels[item.tier], getItemTypeLabel(crate.category, item)].filter(Boolean).join(" · ");
  overlay.querySelector(".crate-result-name").textContent = item.label;
  overlay.querySelector(".crate-result-note").textContent = reward;
  progressionFeedback.textContent = `${crate.label} : ${item.label} (${crateTierLabels[item.tier]}). ${reward}`;
  setCrateActions(true);
  const fanfare = {
    commun: [440],
    "peu-commun": [440, 554],
    rare: [440, 554, 659],
    legendaire: [523, 659, 784, 1046],
    divin: [523, 659, 784, 1046, 1318, 1568],
  }[item.tier];
  fanfare.forEach((pitch, index) => window.setTimeout(() => playTone(pitch, 0.24, "triangle", 0.18, 1.02), index * 110));
}

function equipCrateReward() {
  const { crate, item } = crateOpening;
  equipLoadoutItem(crate.category, item.id);
  saveProgression(`${item.label} équipé.`);
  refreshLoadoutMenu();
  updatePlayerLoadoutAppearance();
  renderShop();
  if (!lockerScreen.hidden) renderLocker();
  setCrateActions(true);
}

function closeCrateOpening() {
  if (!crateOpening) return;
  cancelAnimationFrame(crateOpening.tickFrame);
  crateOpening.animation?.cancel();
  crateOpening.overlay.hidden = true;
  if (!crateOpening.revealed) {
    crateOpening.revealed = true;
    progressionFeedback.textContent = `${crateOpening.crate.label} : ${crateOpening.item.label} (${crateTierLabels[crateOpening.item.tier]}). ${crateOpening.reward}`;
  }
}

function getPackEntries(pack) {
  return pack.items.map(([category, id]) => {
    const item = loadoutOptions[category].find((entry) => entry.id === id);
    if (!item) throw new Error(`Objet de pack inconnu : ${category}/${id}`);
    return { category, item, owned: progression.unlocked[category].includes(id) };
  });
}

function getPackPricing(pack) {
  const missing = getPackEntries(pack).filter((entry) => !entry.owned);
  const value = missing.reduce((total, entry) => total + packTierValues[entry.item.tier], 0);
  return { missing, value, price: Math.round((value * (1 - packDiscount)) / 10) * 10 };
}

function createPackItemArt(category, item) {
  if (category === "skins") return createCharacterPreview(progression.equipped.characters, item.id, progression.equipped.equipment);
  if (category === "weapons") return createShopPreviewIcon({ ...item, category: "weapons" });
  const icon = document.createElement("span");
  icon.className = "shop-item-icon crate-power-icon";
  icon.textContent = item.icon;
  return icon;
}

function createPackItemRow({ category, item, owned }) {
  const row = document.createElement("li");
  row.className = `pack-item tier-${item.tier}${owned ? " is-owned" : ""}`;
  const art = document.createElement("span");
  art.className = "pack-item-art";
  art.setAttribute("aria-hidden", "true");
  art.append(createPackItemArt(category, item));
  const text = document.createElement("span");
  text.className = "pack-item-text";
  const name = document.createElement("strong");
  name.textContent = item.label;
  const meta = document.createElement("small");
  const kind = { skins: "Costume", weapons: item.melee ? "Mêlée" : "Distance", activePowers: "Pouvoir" }[category];
  meta.textContent = [kind, getItemTypeLabel(category, item), crateTierLabels[item.tier]].filter(Boolean).join(" · ");
  text.append(name, meta);
  row.append(art, text);
  if (owned) {
    const check = document.createElement("span");
    check.className = "pack-item-owned";
    check.textContent = "✔ Possédé";
    row.append(check);
  }
  return row;
}

function createPackCard(pack) {
  const entries = getPackEntries(pack);
  const { missing, value, price } = getPackPricing(pack);
  const complete = missing.length === 0;
  const topTier = entries.reduce((best, entry) =>
    crateTierOrder.indexOf(entry.item.tier) > crateTierOrder.indexOf(best) ? entry.item.tier : best, "commun");
  const card = document.createElement("article");
  card.className = `shop-card store-card pack-card pack-theme-${pack.theme} tier-${topTier}${complete ? " is-complete" : ""}`;
  const badges = document.createElement("div");
  badges.className = "store-badges";
  const addBadge = (text, kind) => {
    const badge = document.createElement("span");
    badge.className = `store-badge store-badge-${kind}`;
    badge.textContent = text;
    badges.append(badge);
  };
  if (complete) addBadge("COMPLET", "owned");
  else addBadge(`-${Math.round(packDiscount * 100)} %`, "promo");
  addBadge(crateTierLabels[topTier].toUpperCase(), `tier tier-${topTier}`);

  const preview = document.createElement("div");
  preview.className = "shop-preview store-preview pack-preview";
  preview.setAttribute("aria-hidden", "true");
  const skin = entries.find((entry) => entry.category === "skins")?.item;
  const rangedWeapon = entries.find((entry) => entry.category === "weapons")?.item;
  const emblem = document.createElement("span");
  emblem.className = "pack-emblem";
  emblem.textContent = pack.emblem;
  preview.append(emblem);
  if (skin) {
    preview.append(createCharacterPreview(progression.equipped.characters, skin.id, progression.equipped.equipment, rangedWeapon?.id));
  }

  const category = document.createElement("span");
  category.className = "shop-item-category";
  category.textContent = `Pack · ${entries.length} objets`;
  const title = document.createElement("h3");
  title.textContent = pack.label;
  const description = document.createElement("p");
  description.textContent = pack.description;
  const list = document.createElement("ul");
  list.className = "pack-items";
  list.append(...entries.map(createPackItemRow));

  const footer = document.createElement("div");
  footer.className = "shop-card-footer store-card-footer";
  const priceTag = document.createElement("span");
  priceTag.className = "store-price";
  if (complete) {
    priceTag.textContent = "Tout débloqué";
  } else {
    const oldPrice = document.createElement("s");
    oldPrice.textContent = `${value}`;
    const currentPrice = document.createElement("strong");
    currentPrice.textContent = `${price} ◉`;
    priceTag.append(oldPrice, " ", currentPrice);
  }
  const button = document.createElement("button");
  button.type = "button";
  button.className = "shop-buy-button pack-buy-button";
  button.dataset.action = "buy-pack";
  button.dataset.packId = pack.id;
  button.disabled = complete || progression.coins < price;
  button.textContent = complete ? "Pack complet" : progression.coins < price ? "Pas assez de pièces" : "Acheter le pack";
  footer.append(priceTag, button);
  card.append(badges, preview, category, title, description, list, footer);
  return card;
}

let packReveal = null;

function getPackOverlay() {
  if (packReveal) return packReveal;
  const overlay = document.createElement("div");
  overlay.className = "crate-opening pack-opening";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Contenu du pack");
  overlay.innerHTML = `
    <div class="crate-opening-panel pack-opening-panel">
      <span class="pack-opening-emblem" aria-hidden="true"></span>
      <h2 class="crate-opening-title"></h2>
      <p class="pack-opening-note"></p>
      <ul class="pack-items pack-opening-items"></ul>
      <div class="crate-opening-actions">
        <button type="button" class="shop-buy-button store-equip-button" data-pack-action="equip">Tout équiper</button>
        <button type="button" class="menu-secondary" data-pack-action="close">Fermer</button>
      </div>
    </div>`;
  document.body.append(overlay);
  packReveal = { overlay, pack: null };
  overlay.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest("[data-pack-action]");
    if (!(button instanceof HTMLButtonElement) || button.disabled) return;
    if (button.dataset.packAction === "equip") equipPack(packReveal.pack);
    else overlay.hidden = true;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) overlay.hidden = true;
  });
  return packReveal;
}

function equipPack(pack) {
  const filled = new Set();
  for (const [category, id] of pack.items) {
    if (!progression.unlocked[category].includes(id)) continue;
    const slot = getEquipSlot(category, id);
    if (filled.has(slot)) continue;
    filled.add(slot);
    equipLoadoutItem(category, id);
  }
  saveProgression(`${pack.label} équipé !`);
  refreshLoadoutMenu();
  updatePlayerLoadoutAppearance();
  renderShop();
  if (!lockerScreen.hidden) renderLocker();
  const button = packReveal?.overlay.querySelector('[data-pack-action="equip"]');
  if (button) {
    button.disabled = true;
    button.textContent = "Équipé ✔";
  }
}

function purchasePack(packId) {
  const pack = shopPacks.find((entry) => entry.id === packId);
  if (!pack) throw new Error(`Pack inconnu : ${packId}`);
  const { missing, price } = getPackPricing(pack);
  if (missing.length === 0) return;
  if (progression.coins < price) {
    progressionFeedback.textContent = "Tu n'as pas assez de pièces pour ce pack.";
    return;
  }
  progression.coins -= price;
  for (const { category, item } of missing) progression.unlocked[category].push(item.id);
  saveProgression(`${pack.label} acheté : ${missing.map((entry) => entry.item.label).join(", ")} !`);
  renderShop();
  refreshLoadoutMenu();
  if (!lockerScreen.hidden) renderLocker();

  const state = getPackOverlay();
  state.pack = pack;
  const { overlay } = state;
  overlay.querySelector(".pack-opening-panel").className = `crate-opening-panel pack-opening-panel pack-theme-${pack.theme}`;
  overlay.querySelector(".pack-opening-emblem").textContent = pack.emblem;
  overlay.querySelector(".crate-opening-title").textContent = pack.label;
  overlay.querySelector(".pack-opening-note").textContent = `${missing.length} nouvel${missing.length > 1 ? "s" : ""} objet${missing.length > 1 ? "s" : ""} ajouté${missing.length > 1 ? "s" : ""} à ton casier !`;
  const missingIds = new Set(missing.map((entry) => `${entry.category}/${entry.item.id}`));
  overlay.querySelector(".pack-opening-items").replaceChildren(...getPackEntries(pack).map((entry, index) => {
    const row = createPackItemRow({ ...entry, owned: false });
    if (missingIds.has(`${entry.category}/${entry.item.id}`)) row.classList.add("is-new");
    row.style.setProperty("--delay", `${index * 0.14}s`);
    return row;
  }));
  const equipButton = overlay.querySelector('[data-pack-action="equip"]');
  equipButton.disabled = false;
  equipButton.textContent = "Tout équiper";
  overlay.hidden = false;
  equipButton.focus();
  [523, 659, 784, 1046, 1318].forEach((pitch, index) => window.setTimeout(() => playTone(pitch, 0.24, "triangle", 0.18, 1.02), index * 110));
}

let activeShopTab = "skins";

function renderShop() {
  shopItems.replaceChildren(...getCurrentShopItems()
    .map((offer) => findShopItem(offer.id, offer.category) ?? offer)
    .map((item) => createShopCard(item, true)));
  for (const tab of shopTabs.querySelectorAll(".store-tab")) {
    tab.setAttribute("aria-selected", String(tab.dataset.tab === activeShopTab));
  }
  shopTabNote.textContent = shopTabNotes[activeShopTab] ?? "";
  if (activeShopTab === "packs") {
    for (const filter of document.querySelectorAll(".store-filter")) filter.hidden = true;
    shopCatalogItems.replaceChildren(...shopPacks.map(createPackCard));
    updateMenuBalance();
    return;
  }
  const tabCrates = shopCrates.filter((crate) => crateShopTabs[crate.category] === activeShopTab);
  for (const filter of document.querySelectorAll(".store-filter")) filter.hidden = tabCrates.length > 0;
  if (tabCrates.length > 0) {
    shopCatalogItems.replaceChildren(...tabCrates.map(createCrateCard));
    updateMenuBalance();
    return;
  }
  const collator = new Intl.Collator("fr");
  const items = getShopTabItems(activeShopTab)
    .filter((item) => !shopHideOwned.checked || item.category === "boosts"
      || !(isShopItemOwned(item) || item.included))
    .sort((a, b) => {
      if (shopSort.value === "name") return collator.compare(a.label, b.label);
      const difference = getShopItemPrice(a) - getShopItemPrice(b);
      return shopSort.value === "price-desc" ? -difference : difference;
    });
  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "store-empty";
    empty.textContent = "Tu possèdes déjà tout ce rayon !";
    shopCatalogItems.replaceChildren(empty);
  } else {
    shopCatalogItems.replaceChildren(...items.map((item) => createShopCard(item)));
  }
  shopRotationNote.textContent = "Nouvelles promos toutes les 45 minutes, avec parfois un objet offert.";
  const remaining = Math.max(0, shopRotationDuration - (Date.now() - progression.shopRotation.startedAt));
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  shopRotationCountdown.textContent = `Nouvelles promos dans ${minutes} min ${String(seconds).padStart(2, "0")} s`;
  updateMenuBalance();
}

const accountsStorageKey = "blackwood-survivor-accounts";
const accountGate = document.querySelector("#account-gate");
const accountForm = document.querySelector("#account-form");
const accountEmail = document.querySelector("#account-email");
const accountEmailLabel = document.querySelector("#account-email-label");
const accountUsername = document.querySelector("#account-username");
const accountUsernameLabel = document.querySelector("#account-username-label");
const accountPassword = document.querySelector("#account-password");
const accountConfirm = document.querySelector("#account-confirm");
const accountConfirmLabel = document.querySelector("#account-confirm-label");
const accountFeedback = document.querySelector("#account-feedback");
const accountSubmit = document.querySelector("#account-submit");
const accountModeLogin = document.querySelector("#account-mode-login");
const accountModeEmail = document.querySelector("#account-mode-email");
const accountModeCreate = document.querySelector("#account-mode-create");
const devicePcButton = document.querySelector("#device-pc");
const devicePhoneButton = document.querySelector("#device-phone");
const accountDeviceStep = document.querySelector("#account-device-step");
const settingsLogout = document.querySelector("#settings-logout");
const settingsAccountName = document.querySelector("#settings-account-name");
const editTouchControlsButton = document.querySelector("#edit-touch-controls");
const controlEditor = document.querySelector("#control-editor");
const controlSizeInput = document.querySelector("#control-size");
const sessionStorageKey = "blackwood-survivor-session";
let activeAccount = "";
let firebaseUserId = "";
let accountMode = "login";
let chosenDevice = "";
let pendingEntry = null;
const defaultTouchLayout = {
  stick: { x: 4, y: 68, s: 1 },
  dodge: { x: 78, y: 52, s: 1 },
  pickup: { x: 78, y: 70, s: 1 },
  ranged: { x: 2, y: 15, s: 1 },
  melee: { x: 2, y: 26, s: 1 },
  power: { x: 2, y: 37, s: 1 },
  boost: { x: 2, y: 48, s: 1 },
};
const touchControlBaseSize = { stick: 112, dodge: 64, pickup: 64, ranged: 60, melee: 60, power: 60, boost: 60 };
let touchLayout = structuredClone(defaultTouchLayout);
let draftTouchLayout = null;
let selectedControl = "stick";
let controlDrag = null;

function loadAccountRecords() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(accountsStorageKey) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((account) => account
      && typeof account.username === "string"
      && typeof account.salt === "string"
      && typeof account.hash === "string");
  } catch {
    return [];
  }
}

function saveAccountRecords(accounts) {
  window.localStorage.setItem(accountsStorageKey, JSON.stringify(accounts));
}

const serverSessionKey = "blackwood-survivor-server-token";
let serverOnline = false;
let serverToken = window.localStorage.getItem(serverSessionKey) || "";
let serverGiftCursor = 0;
let serverSaveTimer = 0;
let serverSaveInFlight = false;
let serverSaveQueued = false;
let applyingServerState = false;

async function serverRequest(path, body) {
  const headers = { "Content-Type": "application/json" };
  if (serverToken && serverToken !== "firebase") headers.Authorization = `Bearer ${serverToken}`;
  let response;
  try {
    response = await fetch(path, {
      method: body === undefined ? "GET" : "POST",
      headers,
      cache: "no-store",
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    const error = new Error("Le PC qui héberge les comptes ne répond pas.");
    error.status = 0;
    throw error;
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "Le serveur a refusé la demande.");
    error.status = response.status;
    throw error;
  }
  return data;
}

async function detectGameServer() {
  if (serverToken === "firebase") {
    serverToken = "";
    window.localStorage.removeItem(serverSessionKey);
  }
  try {
    const response = await fetch("/api/health", { cache: "no-store" });
    serverOnline = response.ok;
  } catch {
    serverOnline = false;
  }
  const lead = document.querySelector("#account-form .account-lead");
  if (lead) {
    lead.textContent = serverOnline
      ? "Le compte admin se connecte avec son identifiant et son mot de passe. Aucun réglage Firebase n'est nécessaire."
      : "Le compte de cet appareil s'ouvre avec l'identifiant et le mot de passe.";
  }
  return serverOnline;
}

function queueServerAccountSave() {
  if (!serverOnline || !serverToken || !activeAccount || applyingServerState) return;
  window.clearTimeout(serverSaveTimer);
  serverSaveTimer = window.setTimeout(() => {
    serverSaveTimer = 0;
    flushServerAccountSave();
  }, 600);
}

function showServerProgression(saved) {
  applyingServerState = true;
  try {
    adoptAccountProgression(saved);
    refreshLoadoutMenu();
    updateXpDisplays();
    if (frontMenu.dataset.screen === "shop") renderShop();
    if (frontMenu.dataset.screen === "locker") renderLocker();
    window.localStorage.setItem(progressionStorageKey, JSON.stringify(progression));
    if (activeAccount) storeActiveAccountProgression();
  } finally {
    applyingServerState = false;
  }
}

async function flushServerAccountSave() {
  if (!serverToken || serverToken === "firebase" || !activeAccount) return;
  if (serverSaveInFlight) {
    serverSaveQueued = true;
    return;
  }
  serverSaveInFlight = true;
  const snapshotCursor = serverGiftCursor;
  try {
    const data = await serverRequest("/api/save", {
      progression,
      device: chosenDevice,
      touchLayout,
      giftCursor: snapshotCursor,
    });
    serverGiftCursor = Number(data.giftCursor) || snapshotCursor;
    if ((Number(data.giftCursor) || 0) > snapshotCursor && data.progression) showServerProgression(data.progression);
  } catch {
    // La copie locale reste en place si le PC hôte est injoignable.
  } finally {
    serverSaveInFlight = false;
    if (serverSaveQueued) {
      serverSaveQueued = false;
      queueServerAccountSave();
    }
  }
}

async function pullServerAccount() {
  if (!serverToken || serverToken === "firebase" || !activeAccount || gameActive || serverSaveInFlight || serverSaveTimer) return;
  try {
    const data = await serverRequest("/api/me");
    const cursor = Number(data.giftCursor) || 0;
    if (cursor <= serverGiftCursor || !data.progression) return;
    serverGiftCursor = cursor;
    showServerProgression(data.progression);
  } catch {
    // La prochaine sauvegarde réessaiera.
  }
}

function rememberServerSession(data) {
  serverToken = data.token || serverToken;
  if (data.token) window.localStorage.setItem(serverSessionKey, data.token);
  serverGiftCursor = Number(data.giftCursor) || 0;
  if (data.touchLayout) touchLayout = readTouchLayout(data.touchLayout);
}

let serverSyncStarted = false;

function startServerSync() {
  if (serverSyncStarted) return;
  serverSyncStarted = true;
  window.setInterval(pullServerAccount, 4000);
}

async function importActiveLocalAccount() {
  const account = loadAccountRecords().find((item) => item.username.toLowerCase() === activeAccount.toLowerCase());
  if (!account) return;
  try {
    const data = await serverRequest("/api/import", {
      username: account.username,
      salt: account.salt,
      hash: account.hash,
      progression,
      device: chosenDevice,
      touchLayout,
    });
    rememberServerSession(data);
  } catch (error) {
    if (error.status !== 409) return;
  }
}

async function attachServerWhenReady() {
  if (!await detectGameServer()) return;
  if (await restoreServerSession()) {
    startServerSync();
    return;
  }
  if (activeAccount) await importActiveLocalAccount();
  startServerSync();
}

async function restoreServerSession() {
  serverToken = window.localStorage.getItem(serverSessionKey) || "";
  if (!serverToken || serverToken === "firebase") return false;
  try {
    const data = await serverRequest("/api/me");
    rememberServerSession(data);
    const localSession = JSON.parse(window.localStorage.getItem(sessionStorageKey) || "null");
    applyPlayDevice(localSession?.device === "phone" ? "phone" : "pc");
    enterAccount(data.username, data.progression || {});
    return true;
  } catch (error) {
    if (error.status === 401) {
      serverToken = "";
      window.localStorage.removeItem(serverSessionKey);
    }
    return false;
  }
}

function storeActiveAccountProgression() {
  const accounts = loadAccountRecords();
  const account = accounts.find((item) => item.username.toLowerCase() === activeAccount.toLowerCase());
  if (!account) return;
  account.progression = structuredClone(progression);
  account.device = chosenDevice || account.device;
  account.touchLayout = touchLayout;
  saveAccountRecords(accounts);
}

async function hashAccountPassword(password, salt) {
  const encoded = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function randomAccountSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function adoptAccountProgression(saved) {
  const previous = window.localStorage.getItem(progressionStorageKey);
  window.localStorage.setItem(progressionStorageKey, JSON.stringify(saved ?? defaultProgression));
  const loaded = loadProgression();
  if (previous === null) window.localStorage.removeItem(progressionStorageKey);
  else window.localStorage.setItem(progressionStorageKey, previous);
  for (const key of Object.keys(progression)) delete progression[key];
  Object.assign(progression, loaded);
}

function applyPlayDevice(device) {
  chosenDevice = device;
  document.documentElement.dataset.device = device;
  devicePcButton.setAttribute("aria-pressed", String(device === "pc"));
  devicePhoneButton.setAttribute("aria-pressed", String(device === "phone"));
  devicePcButton.classList.toggle("is-active", device === "pc");
  devicePhoneButton.classList.toggle("is-active", device === "phone");
  editTouchControlsButton.hidden = device !== "phone";
  syncPhoneView();
  applyTouchLayout();
  updatePlayer();
}

function clampControlSpot(id, spot) {
  const scale = Math.max(0.7, Math.min(1.5, Number(spot?.s) || 1));
  return {
    x: Math.max(0, Math.min(86, Number(spot?.x) || defaultTouchLayout[id].x)),
    y: Math.max(0, Math.min(86, Number(spot?.y) || defaultTouchLayout[id].y)),
    s: scale,
  };
}

function readTouchLayout(saved) {
  const next = structuredClone(defaultTouchLayout);
  if (!saved || typeof saved !== "object") return next;
  for (const id of Object.keys(defaultTouchLayout)) next[id] = clampControlSpot(id, saved[id]);
  const previousColumn = { ranged: 4, melee: 18, power: 32, boost: 46 };
  const stillDefault = Object.entries(previousColumn).every(([id, y]) => {
    const spot = saved[id];
    return spot && Math.abs(Number(spot.x) - 2) < 0.8 && Math.abs(Number(spot.y) - y) < 0.8 && Math.abs((Number(spot.s) || 1) - 1) < 0.05;
  });
  if (stillDefault) {
    next.ranged.y = defaultTouchLayout.ranged.y;
    next.melee.y = defaultTouchLayout.melee.y;
    next.power.y = defaultTouchLayout.power.y;
    next.boost.y = defaultTouchLayout.boost.y;
  }
  return next;
}

function applyTouchLayout(layout = touchLayout) {
  const placed = chosenDevice === "phone" || isEditingControls();
  for (const [id, spot] of Object.entries(layout)) {
    const element = document.querySelector(`[data-control="${id}"]`);
    if (!element) continue;
    if (!placed) {
      element.style.left = "";
      element.style.top = "";
      element.style.right = "";
      element.style.bottom = "";
      element.style.width = "";
      element.style.height = "";
      element.classList.remove("is-selected");
      continue;
    }
    const size = Math.round(touchControlBaseSize[id] * spot.s);
    element.style.left = `${spot.x}%`;
    element.style.top = `${spot.y}%`;
    element.style.right = "auto";
    element.style.bottom = "auto";
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.classList.toggle("is-selected", id === selectedControl && isEditingControls());
  }
}

function persistAccountExtras() {
  if (!activeAccount) return;
  const accounts = loadAccountRecords();
  const account = accounts.find((item) => item.username.toLowerCase() === activeAccount.toLowerCase());
  if (!account) return;
  account.device = chosenDevice;
  account.touchLayout = touchLayout;
  account.progression = structuredClone(progression);
  saveAccountRecords(accounts);
  window.localStorage.setItem(sessionStorageKey, JSON.stringify({ username: activeAccount, device: chosenDevice }));
  queueServerAccountSave();
}

function isEditingControls() {
  return document.documentElement.hasAttribute("data-editing-controls");
}

function setAccountMode(mode) {
  accountMode = mode;
  const creating = mode === "create";
  const emailLogin = mode === "email";
  for (const button of [accountModeLogin, accountModeEmail, accountModeCreate]) {
    const active = button.dataset.accountMode === mode || button.id === `account-mode-${mode}`;
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("is-active", active);
  }
  accountEmailLabel.hidden = mode === "login";
  accountEmail.required = mode !== "login";
  accountUsernameLabel.hidden = emailLogin;
  accountUsername.required = !emailLogin;
  accountConfirmLabel.hidden = !creating;
  accountConfirm.required = creating;
  accountPassword.autocomplete = creating ? "new-password" : "current-password";
  accountSubmit.textContent = creating ? "S'inscrire" : emailLogin ? "Se connecter avec l'e-mail" : "Se connecter";
  accountFeedback.textContent = "";
}

function showDeviceStep() {
  accountForm.hidden = true;
  accountDeviceStep.hidden = false;
  devicePcButton.setAttribute("aria-pressed", "false");
  devicePhoneButton.setAttribute("aria-pressed", "false");
  devicePcButton.classList.remove("is-active");
  devicePhoneButton.classList.remove("is-active");
}

function showAccountGate() {
  activeAccount = "";
  chosenDevice = "";
  pendingEntry = null;
  window.localStorage.removeItem(sessionStorageKey);
  document.documentElement.dataset.device = "pc";
  syncPhoneView();
  editTouchControlsButton.hidden = true;
  settingsAccountName.textContent = "Aucun compte connecté.";
  accountForm.hidden = false;
  accountDeviceStep.hidden = true;
  devicePcButton.setAttribute("aria-pressed", "false");
  devicePhoneButton.setAttribute("aria-pressed", "false");
  devicePcButton.classList.remove("is-active");
  devicePhoneButton.classList.remove("is-active");
  accountGate.hidden = false;
  frontMenu.hidden = true;
  accountFeedback.textContent = "";
  syncHostGiftAccess();
  syncSoundtrack();
}

function enterAccount(username, savedProgression) {
  pendingEntry = null;
  accountDeviceStep.hidden = true;
  accountForm.hidden = false;
  adoptAccountProgression(savedProgression);
  activeAccount = username;
  if (!progression.playerName) progression.playerName = username.slice(0, 16);
  accountGate.hidden = true;
  playerNameInput.value = progression.playerName;
  updatePlayerNameDisplay();
  updateMenuBalance();
  updatePlayerNameCooldown();
  saveProgression();
  persistAccountExtras();
  settingsAccountName.textContent = `Connecté : ${activeAccount}`;
  syncHostGiftAccess();
  applyTouchLayout();
  showPreparationMenu();
}

function restoreSession() {
  try {
    const session = JSON.parse(window.localStorage.getItem(sessionStorageKey) ?? "null");
    if (!session || typeof session.username !== "string") return false;
    const account = loadAccountRecords().find((item) => item.username.toLowerCase() === session.username.toLowerCase());
    if (!account) return false;
    touchLayout = readTouchLayout(account.touchLayout);
    applyPlayDevice(session.device === "phone" || account.device === "phone" ? "phone" : "pc");
    enterAccount(account.username, account.progression);
    return true;
  } catch {
    return false;
  }
}

function logoutAccount() {
  firebaseUserId = "";
  if (typeof firebase !== "undefined" && typeof firebase.auth === "function" && firebase.auth().currentUser) {
    firebase.auth().signOut().catch(() => {});
  }
  if (activeAccount) {
    try {
      window.localStorage.setItem(progressionStorageKey, JSON.stringify(progression));
      storeActiveAccountProgression();
    } catch {
      // La déconnexion continue même si la copie locale est pleine.
    }
  }
  const token = serverToken && serverToken !== "firebase" ? serverToken : "";
  const body = token && activeAccount
    ? JSON.stringify({ progression, device: chosenDevice, touchLayout, giftCursor: serverGiftCursor })
    : "";
  window.clearTimeout(serverSaveTimer);
  serverSaveTimer = 0;
  serverToken = "";
  serverGiftCursor = 0;
  window.localStorage.removeItem(serverSessionKey);
  if (token && body) {
    fetch("/api/save", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body,
    }).then(() => fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: "{}",
    })).catch(() => {});
  }
  if (isEditingControls()) closeControlEditor(false);
  if (gameActive) {
    gameActive = false;
    arena.classList.remove("is-live");
    stopShooting();
    keys.clear();
    releaseTouchStick();
  }
  closeSettings();
  accountForm.reset();
  setAccountMode("login");
  showAccountGate();
}

function showPreparationMenu() {
  arena.classList.remove("arena-throne-room");
  delete arena.dataset.wave;
  menuTitle.textContent = progression.playerName ? `Prépare-toi, ${progression.playerName}` : "Prépare ta survie";
  setMenuScreen("home");
  waveCountdownDisplay.hidden = true;
  updateTimer();
  refreshLoadoutMenu();
  updateXpDisplays();
  updatePlayerLoadoutAppearance();
  if (audioContext && musicEnabled) updateMusicTimer();
}

function showShop(summary = "Choisis une amélioration pour ta prochaine expédition.") {
  menuTitle.textContent = "Boutique de l'avant-poste";
  shopSummary.textContent = summary;
  setMenuScreen("shop");
  renderShop();
}

function showLocker(tab = activeLockerTab) {
  menuTitle.textContent = `Casier de ${progression.playerName || "Survivant"}`;
  activeLockerTab = tab;
  setMenuScreen("locker");
  renderLocker();
}

const lockerDefaults = { characters: "survivant", skins: "survivant", equipment: "standard", weapons: "fronde", melee: defaultMeleeWeapon, coatings: "aucun", activePowers: "glace" };
const lockerSlotDefinitions = [
  { category: "characters", label: "Personnage" },
  { category: "skins", label: "Tenue" },
  { category: "equipment", label: "Équipement" },
  { category: "weapons", label: "Arme · distance" },
  { category: "melee", label: "Arme · mêlée" },
  { category: "coatings", label: "Revêtement" },
  { category: "activePowers", label: "Pouvoir · O" },
  { category: "boosts", label: "Boost · P" },
];
const lockerRarityLabels = { commun: "Commun", rare: "Rare", epique: "Épique", legendaire: "Légendaire", mythique: "Mythique" };
const lockerPreviewCategories = ["characters", "skins", "equipment", "weapons", "melee", "coatings"];
let activeLockerSlot = "skins";
let activeLockerTab = "loadout";
let lockerPreviewTile = null;
let activeUpgrade = { category: "weapons", id: "fronde" };

function getLockerItemCategory(category) {
  return category === "melee" ? "weapons" : category;
}

function getLockerChoices(category) {
  if (category === "boosts") {
    return [null, ...boostOptions.filter((boost) => progression.boostInventory[boost.id] > 0)];
  }
  const itemCategory = getLockerItemCategory(category);
  const owned = loadoutOptions[itemCategory].filter((item) => progression.unlocked[itemCategory].includes(item.id)
    && (itemCategory !== "weapons" || Boolean(item.melee) === (category === "melee")));
  return category === "activePowers" ? [null, ...owned] : owned;
}

function getLockerEquippedId(category) {
  return category === "boosts" ? progression.equippedBoost : progression.equipped[category];
}

function findLockerItem(category, itemId) {
  const options = category === "boosts" ? boostOptions : loadoutOptions[getLockerItemCategory(category)];
  return options.find((item) => item.id === itemId) ?? null;
}

function getLockerRarity(category, item) {
  if (!item || lockerDefaults[category] === item.id) return "commun";
  if (item.tier) return crateTierLockerRarity[item.tier];
  const price = shopCatalog.find((entry) => entry.id === item.id && entry.category === category)?.price ?? item.price ?? 0;
  if (price < 100) return "rare";
  if (price < 160) return "epique";
  if (price < 190) return "legendaire";
  return "mythique";
}

function createLockerArt(category, item, loadout = progression.equipped) {
  if (item && (category === "characters" || category === "skins")) {
    return createCharacterPreview(
      category === "characters" ? item.id : loadout.characters,
      category === "skins" ? item.id : "survivant",
      loadout.equipment,
      loadout.weapons,
    );
  }
  if (item && getLockerItemCategory(category) === "weapons") return createShopPreviewIcon({ ...item, category: "weapons" });
  if (item && category === "coatings") return createCoatingArt(item.id, loadout.weapons);
  const icon = document.createElement("span");
  icon.className = "locker-tile-icon";
  icon.textContent = item
    ? item.icon ?? shopCatalog.find((entry) => entry.id === item.id && entry.category === category)?.icon ?? "🧰"
    : "⦸";
  return icon;
}

function createLockerTile(category, item, { slotLabel = "", equipped = false, selected = false } = {}) {
  const rarity = getLockerRarity(category, item);
  const tile = document.createElement("button");
  tile.type = "button";
  tile.className = [
    "locker-tile",
    `rarity-${rarity}`,
    slotLabel ? "locker-slot" : "locker-choice",
    equipped ? "is-equipped" : "",
    selected ? "is-selected" : "",
  ].filter(Boolean).join(" ");
  tile.dataset.category = category;
  tile.dataset.itemId = item?.id ?? "";
  const art = document.createElement("span");
  art.className = "locker-tile-art";
  art.setAttribute("aria-hidden", "true");
  art.append(createLockerArt(category, item));
  const name = document.createElement("span");
  name.className = "locker-tile-name";
  name.textContent = item?.label ?? "Aucun";
  tile.append(art, name);
  const typeLabel = item ? getItemTypeLabel(getLockerItemCategory(category), item) : "";
  if (typeLabel && !slotLabel) {
    const type = document.createElement("span");
    type.className = "locker-tile-type";
    type.textContent = typeLabel;
    tile.append(type);
  }
  if (slotLabel) {
    const label = document.createElement("span");
    label.className = "locker-tile-slot";
    label.textContent = slotLabel;
    tile.prepend(label);
  } else if (equipped) {
    const badge = document.createElement("span");
    badge.className = "locker-tile-check";
    badge.textContent = "✔";
    tile.append(badge);
  }
  if (category === "boosts" && item) {
    const count = document.createElement("span");
    count.className = "locker-tile-count";
    count.textContent = `×${progression.boostInventory[item.id]}`;
    tile.append(count);
  }
  if ((category === "weapons" || category === "melee" || category === "activePowers") && item) {
    const level = document.createElement("span");
    level.className = "locker-tile-level";
    level.textContent = `Nv ${getUpgradeLevel(category, item.id)}`;
    tile.append(level);
  }
  tile.setAttribute("aria-label", `${slotLabel ? `${slotLabel} : ` : ""}${item?.label ?? "Aucun"}${equipped && !slotLabel ? " · équipé" : ""}`);
  return tile;
}

function renderLocker() {
  lockerPreviewTile = null;
  updateBoostButton();
  for (const tab of lockerTabs) {
    const isActive = tab.dataset.lockerTab === activeLockerTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  }
  for (const panel of lockerPanels) panel.hidden = panel.dataset.lockerPanel !== activeLockerTab;
  lockerSlotsList.replaceChildren(...lockerSlotDefinitions.map((slot) => createLockerTile(
    slot.category,
    findLockerItem(slot.category, getLockerEquippedId(slot.category)),
    { slotLabel: slot.label, selected: slot.category === activeLockerSlot },
  )));
  const slot = lockerSlotDefinitions.find((entry) => entry.category === activeLockerSlot);
  const choices = getLockerChoices(activeLockerSlot);
  const equippedId = getLockerEquippedId(activeLockerSlot);
  lockerPickerTitle.textContent = slot.label;
  const ownedCount = choices.filter(Boolean).length;
  lockerPickerCount.textContent = `${ownedCount} objet${ownedCount > 1 ? "s" : ""} possédé${ownedCount > 1 ? "s" : ""}`;
  lockerPickerGrid.replaceChildren(...choices.map((item) => createLockerTile(activeLockerSlot, item, {
    equipped: (item?.id ?? "") === equippedId,
  })));
  if (ownedCount === 0 || (activeLockerSlot !== "boosts" && activeLockerSlot !== "activePowers" && ownedCount === 1)) {
    const hint = document.createElement("p");
    hint.className = "locker-picker-hint";
    hint.textContent = "Achète d'autres objets dans la boutique ou fabrique-les à l'atelier pour les retrouver ici.";
    lockerPickerGrid.append(hint);
  }
  renderLockerDetails(activeLockerSlot, findLockerItem(activeLockerSlot, equippedId));
  renderLockerStage();
  renderLockerUpgrades();
  renderLockerWorkshop();
}

function getUpgradeLevel(category, itemId) {
  return getLockerItemCategory(category) === "weapons" ? getWeaponLevel(itemId) : getPowerLevel(itemId);
}

function getUpgradeMaxLevel(category) {
  return category === "weapons" ? weaponMaxLevel : powerMaxLevel;
}

function getUpgradeCost(category, item, level) {
  if (category === "weapons") return weaponUpgradeBaseCosts[item.rarity] * level;
  const option = powerUpgradeOptions.find((entry) => entry.path === item.id && entry.level === level + 1);
  if (!option) throw new Error(`Amélioration de pouvoir inconnue : ${item.id} niveau ${level + 1}`);
  return option.price;
}

function getUpgradeStatRows(category, item, level) {
  if (category === "weapons") {
    const stats = getWeaponStats(item, level);
    return [
      ["Dégâts", stats.damage],
      [item.melee ? "Coups par seconde" : "Tirs par seconde", Math.round(10 / stats.interval) / 10],
      item.melee ? ["Portée", item.melee.reach] : ["Projectiles", item.projectiles],
    ];
  }
  const stats = powerLevelStats[item.effect](level);
  return [
    ["Dégâts", stats.damage],
    ["Brûlure par seconde", stats.burn],
    ["Durée de brûlure", stats.burnDuration && `${stats.burnDuration} s`],
    ["Poison par seconde", stats.poison],
    ["Saignement par seconde", stats.bleed],
    ["Dégâts du broyage", stats.tick && `${stats.tick} / 0,25 s`],
    ["Rebonds", stats.chains],
    ["Paralysie", stats.stun && `${formatDamage(stats.stun)} s`],
    ["Ralentissement", stats.slow && `${formatDamage(stats.slow)} s`],
    ["Soin", stats.heal && (item.effect === "bats" ? `${stats.heal} PV max` : `${stats.heal} PV / victime`)],
    ["Durée du nuage", stats.cloudDuration && `${formatDamage(stats.cloudDuration)} s`],
    ["Rayon", stats.radius],
    [item.effect === "vortex" ? "Durée" : "Invulnérabilité", stats.duration && `${formatDamage(stats.duration)} s`],
    ["Recharge", `${item.cooldown} s`],
  ].filter(([, value]) => value !== undefined);
}

function renderLockerUpgrades() {
  const ownedWeapons = loadoutOptions.weapons.filter((item) => progression.unlocked.weapons.includes(item.id));
  const ownedPowers = activePowerOptions.filter((item) => progression.unlocked.activePowers.includes(item.id));
  const isOwned = (category, id) => (category === "weapons" ? ownedWeapons : ownedPowers).some((item) => item.id === id);
  if (!isOwned(activeUpgrade.category, activeUpgrade.id)) {
    activeUpgrade = { category: "weapons", id: ownedWeapons.some((item) => item.id === progression.equipped.weapons)
      ? progression.equipped.weapons
      : ownedWeapons[0].id };
  }
  const createUpgradeTile = (category, item) => {
    const tile = createLockerTile(category, item, {
      selected: activeUpgrade.category === category && activeUpgrade.id === item.id,
      equipped: isLoadoutEquipped(category, item.id),
    });
    tile.classList.replace("locker-choice", "upgrade-choice");
    if (getUpgradeLevel(category, item.id) >= getUpgradeMaxLevel(category)) tile.classList.add("is-maxed");
    return tile;
  };
  upgradeWeaponsGrid.replaceChildren(...ownedWeapons.map((item) => createUpgradeTile("weapons", item)));
  upgradePowersGrid.replaceChildren(...ownedPowers.map((item) => createUpgradeTile("activePowers", item)));
  if (ownedPowers.length === 0) {
    const empty = document.createElement("p");
    empty.className = "locker-picker-hint";
    empty.textContent = "Aucun pouvoir possédé : achète-en un dans la boutique.";
    upgradePowersGrid.append(empty);
  }
  renderUpgradeBench();
}

function renderUpgradeBench(justUpgraded = false) {
  const { category, id } = activeUpgrade;
  const item = findLockerItem(category, id);
  if (!item) throw new Error(`Objet à améliorer inconnu : ${category}/${id}`);
  const level = getUpgradeLevel(category, id);
  const maxLevel = getUpgradeMaxLevel(category);
  const isMaxed = level >= maxLevel;
  const rarity = getLockerRarity(category, item);
  upgradeBench.className = `upgrade-bench rarity-${rarity}${justUpgraded ? " just-upgraded" : ""}`;

  const art = document.createElement("div");
  art.className = "upgrade-bench-art";
  art.setAttribute("aria-hidden", "true");
  art.append(createLockerArt(category, item));
  const tag = document.createElement("span");
  tag.className = `locker-details-rarity rarity-${rarity}`;
  tag.textContent = `${item.tier ? crateTierLabels[item.tier] : lockerRarityLabels[rarity]} · ${category === "weapons" ? "Arme" : "Pouvoir"}`;
  const title = document.createElement("h3");
  title.className = "upgrade-bench-title";
  title.textContent = item.label;
  const pips = document.createElement("div");
  pips.className = "upgrade-pips";
  pips.setAttribute("aria-label", `Niveau ${level} sur ${maxLevel}`);
  for (let index = 1; index <= maxLevel; index += 1) {
    const pip = document.createElement("span");
    pip.className = index <= level ? "is-filled" : "";
    pips.append(pip);
  }
  const levelLabel = document.createElement("span");
  levelLabel.className = "upgrade-level-label";
  levelLabel.textContent = isMaxed ? `Niveau ${level} · MAX` : `Niveau ${level} → ${level + 1}`;

  const current = getUpgradeStatRows(category, item, level);
  const next = isMaxed ? current : getUpgradeStatRows(category, item, level + 1);
  const stats = document.createElement("ul");
  stats.className = "upgrade-stats";
  current.forEach(([label, value], index) => {
    const row = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = label;
    const now = document.createElement("strong");
    now.textContent = String(value);
    row.append(name, now);
    const nextValue = next[index][1];
    if (!isMaxed && nextValue !== value) {
      const gain = document.createElement("em");
      gain.textContent = `→ ${nextValue}`;
      row.append(gain);
      row.classList.add("is-improved");
    }
    stats.append(row);
  });

  const footer = document.createElement("div");
  footer.className = "upgrade-bench-footer";
  const wallet = document.createElement("span");
  wallet.className = "upgrade-wallet";
  wallet.textContent = `Tes pièces : ${progression.coins} ◉`;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "upgrade-button";
  button.dataset.category = category;
  button.dataset.itemId = id;
  if (isMaxed) {
    button.disabled = true;
    button.textContent = "Niveau maximum atteint";
  } else {
    const cost = getUpgradeCost(category, item, level);
    button.disabled = progression.coins < cost;
    button.textContent = `Améliorer · ${cost} ◉`;
    if (button.disabled) button.title = `Il te manque ${cost - progression.coins} pièces.`;
  }
  footer.append(wallet, button);
  upgradeBench.replaceChildren(art, tag, title, pips, levelLabel, stats, footer);
}

function upgradeLockerItem(category, itemId) {
  const item = findLockerItem(category, itemId);
  if (!item || (category !== "weapons" && category !== "activePowers")) {
    throw new Error(`Objet à améliorer inconnu : ${category}/${itemId}`);
  }
  if (!progression.unlocked[category].includes(item.id)) throw new Error(`Objet non possédé : ${item.id}`);
  const level = getUpgradeLevel(category, item.id);
  if (level >= getUpgradeMaxLevel(category)) return;
  const cost = getUpgradeCost(category, item, level);
  if (progression.coins < cost) {
    progressionFeedback.textContent = "Tu n'as pas assez de pièces pour cette amélioration.";
    return;
  }
  progression.coins -= cost;
  if (category === "weapons") progression.weaponLevels[item.id] = level + 1;
  else progression.powers[item.id] = level + 1;
  saveProgression(`${item.label} passe au niveau ${level + 1} !`);
  refreshLoadoutMenu();
  updateCombatLoadout();
  playSound("upgrade");
  renderLocker();
  renderUpgradeBench(true);
}

function renderLockerDetails(category, item) {
  const rarity = getLockerRarity(category, item);
  const tag = document.createElement("span");
  tag.className = `locker-details-rarity rarity-${rarity}`;
  tag.textContent = `${item?.tier ? crateTierLabels[item.tier] : lockerRarityLabels[rarity]} · ${getShopCategoryLabel(category)}`;
  const title = document.createElement("strong");
  title.textContent = item?.label ?? "Aucun";
  const description = document.createElement("p");
  description.textContent = item?.description
    ?? (category === "boosts" ? "Aucun boost ne sera emporté dans la partie." : "Aucun pouvoir actif pendant la partie.");
  if (category === "characters" && progression.equipped.skins !== "survivant") {
    description.textContent += " Son apparence s'affiche avec la tenue Survivant.";
  }
  if (category === "activePowers" && item) description.textContent += ` Niveau ${getPowerLevel(item.id)}.`;
  lockerDetails.replaceChildren(tag, title, description);
}

function renderLockerStage(preview = {}) {
  const loadout = { ...progression.equipped, ...preview };
  const hero = createCharacterPreview(loadout.characters, loadout.skins, loadout.equipment, loadout.weapons, loadout.coatings);
  hero.classList.add("locker-stage-character");
  lockerStageHero.replaceChildren(hero);
  const rows = [
    ["Tenue", findLockerItem("skins", loadout.skins)],
    ["Personnage", findLockerItem("characters", loadout.characters)],
    ["Équipement", findLockerItem("equipment", loadout.equipment)],
    ["Arme à distance", findLockerItem("weapons", loadout.weapons)],
    ["Épée", findLockerItem("melee", loadout.melee)],
    ["Revêtement", findLockerItem("coatings", loadout.coatings)],
    ["Pouvoir", findLockerItem("activePowers", loadout.activePowers)],
    ["Boost", findLockerItem("boosts", progression.equippedBoost)],
  ];
  lockerStageInfo.replaceChildren(...rows.map(([label, item]) => {
    const row = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = label;
    const value = document.createElement("strong");
    value.textContent = item?.label ?? "Aucun";
    row.append(name, value);
    return row;
  }));
}

function previewLockerChoice(tile) {
  if (tile === lockerPreviewTile) return;
  lockerPreviewTile = tile;
  if (!tile) {
    renderLockerDetails(activeLockerSlot, findLockerItem(activeLockerSlot, getLockerEquippedId(activeLockerSlot)));
    renderLockerStage();
    return;
  }
  const { category, itemId } = tile.dataset;
  renderLockerDetails(category, findLockerItem(category, itemId));
  if (lockerPreviewCategories.includes(category)) renderLockerStage({ [getLockerItemCategory(category)]: itemId });
}

function equipLockerChoice(category, itemId) {
  const item = itemId ? findLockerItem(category, itemId) : null;
  if (itemId && !item) throw new Error(`Objet de casier inconnu : ${category}/${itemId}`);
  if (category === "boosts") {
    if (item && !(progression.boostInventory[item.id] > 0)) throw new Error(`Boost non possédé : ${item.id}`);
    progression.equippedBoost = item?.id ?? "";
  } else {
    if (!item && category !== "activePowers") throw new Error(`Emplacement obligatoire : ${category}`);
    if (item && !progression.unlocked[getLockerItemCategory(category)].includes(item.id)) {
      throw new Error(`Objet non possédé : ${item.id}`);
    }
    if (item && category === "melee" && !item.melee) throw new Error(`Arme de mêlée attendue : ${item.id}`);
    progression.equipped[category] = item?.id ?? "";
  }
  const message = item ? `${item.label} équipé depuis ton casier.` : "Emplacement vidé depuis ton casier.";
  saveProgression(message);
  refreshLoadoutMenu();
  updatePlayerLoadoutAppearance();
  updateCombatLoadout();
  renderLocker();
}

function renderLockerWorkshop() {
  lockerItems.replaceChildren();
  lockerCraftingItems.replaceChildren();
  const ownedRelics = bossRelicCatalog.filter((relic) => progression.relicInventory[relic.id] > 0);
  if (ownedRelics.length > 0) {
    const lootHeading = document.createElement("p");
    lootHeading.className = "locker-inventory-count";
    lootHeading.textContent = "Reliques de boss · matériaux de fabrication";
    lockerItems.append(lootHeading);
    for (const relic of ownedRelics) {
      const relicCard = document.createElement("article");
      relicCard.className = "shop-card locker-relic-card";
      const icon = document.createElement("span");
      icon.className = "shop-item-icon";
      icon.textContent = relic.icon;
      const category = document.createElement("span");
      category.className = "shop-item-category";
      category.textContent = `Matériau de craft · ×${progression.relicInventory[relic.id]}`;
      const title = document.createElement("h3");
      title.textContent = relic.label;
      const description = document.createElement("p");
      description.textContent = relic.description;
      relicCard.append(icon, category, title, description);
      lockerItems.append(relicCard);
    }
  } else {
    const emptyRelics = document.createElement("p");
    emptyRelics.className = "locker-empty";
    emptyRelics.textContent = "Aucune relique en stock. Les boss peuvent en laisser tomber : ramasse-les pour fabriquer des objets.";
    lockerItems.append(emptyRelics);
  }

  renderCraftingRecipes();
}

function renderCraftingRecipes() {
  for (const recipe of craftingRecipes) {
    const item = recipe.type === "weapon"
      ? loadoutOptions.weapons.find((weapon) => weapon.id === recipe.itemId)
      : boostOptions.find((boost) => boost.id === recipe.itemId);
    if (!item) throw new Error(`Objet de fabrication inconnu : ${recipe.itemId}`);
    const isOwnedWeapon = recipe.type === "weapon" && progression.unlocked.weapons.includes(item.id);
    const hasRelics = Object.entries(recipe.relicCosts).every(([relicId, count]) =>
      progression.relicInventory[relicId] >= count);
    const hasCoins = progression.coins >= recipe.coinCost;
    const card = document.createElement("article");
    card.className = "shop-card locker-recipe-card";
    const icon = document.createElement("span");
    icon.className = "shop-item-icon";
    icon.textContent = item.icon;
    const category = document.createElement("span");
    category.className = "shop-item-category";
    category.textContent = recipe.type === "weapon" ? "Fusion · arme permanente" : "Fusion · consommable · touche P";
    const title = document.createElement("h3");
    title.textContent = item.label;
    const description = document.createElement("p");
    description.textContent = item.description;
    const cost = document.createElement("p");
    cost.className = "craft-recipe-cost";
    const relicCosts = Object.entries(recipe.relicCosts).map(([relicId, count]) => {
      const relic = bossRelicCatalog.find((entry) => entry.id === relicId);
      if (!relic) throw new Error(`Relique de fabrication inconnue : ${relicId}`);
      return `${relic.icon} ${relic.label} ×${count} · stock ${progression.relicInventory[relicId]}`;
    });
    cost.textContent = `${relicCosts.join(" + ")} · ${recipe.coinCost} pièces`;
    const button = document.createElement("button");
    button.className = "locker-equip-button";
    button.type = "button";
    button.dataset.recipeId = recipe.id;
    button.disabled = isOwnedWeapon || !hasRelics || !hasCoins;
    button.textContent = isOwnedWeapon
      ? "Déjà fabriquée"
      : `Fusionner · ${recipe.coinCost} ◉`;
    card.append(icon, category, title, description, cost, button);
    lockerCraftingItems.append(card);
  }
}

function craftItem(recipeId) {
  const recipe = craftingRecipes.find((entry) => entry.id === recipeId);
  if (!recipe) throw new Error(`Recette inconnue : ${recipeId}`);
  const item = recipe.type === "weapon"
    ? loadoutOptions.weapons.find((weapon) => weapon.id === recipe.itemId)
    : boostOptions.find((boost) => boost.id === recipe.itemId);
  if (!item) throw new Error(`Objet de fabrication inconnu : ${recipe.itemId}`);
  if (recipe.type === "weapon" && progression.unlocked.weapons.includes(item.id)) {
    progressionFeedback.textContent = `${item.label} est déjà fabriquée et conservée dans ton casier.`;
    return;
  }
  if (progression.coins < recipe.coinCost
    || Object.entries(recipe.relicCosts).some(([relicId, count]) => progression.relicInventory[relicId] < count)) {
    progressionFeedback.textContent = "Il te manque des pièces ou des reliques pour cette fabrication.";
    return;
  }

  progression.coins -= recipe.coinCost;
  for (const [relicId, count] of Object.entries(recipe.relicCosts)) {
    progression.relicInventory[relicId] -= count;
  }
  progression.bossLoot = bossRelicCatalog
    .filter((relic) => progression.relicInventory[relic.id] > 0)
    .map((relic) => relic.id);
  if (recipe.type === "weapon") {
    progression.unlocked.weapons.push(item.id);
    equipLoadoutItem("weapons", item.id);
  } else {
    progression.boostInventory[item.id] += 1;
    if (!progression.equippedBoost || progression.boostInventory[progression.equippedBoost] === 0) {
      progression.equippedBoost = item.id;
    }
  }
  const saved = saveProgression(`${item.label} fusionné.`);
  refreshLoadoutMenu();
  updatePlayerLoadoutAppearance();
  renderLocker();
  progressionFeedback.textContent = saved
    ? `${item.label} fusionné avec les reliques et pièces requises.`
    : `${item.label} fusionné pour cette partie, mais la sauvegarde a échoué.`;
}

function purchaseShopItem(itemId, category) {
  const item = findShopItem(itemId, category);
  if (!item || item.included) throw new Error(`Article de boutique inconnu : ${itemId}`);
  if (!isShopItemForSale(item)) {
    progressionFeedback.textContent = "Ce skin n'est plus vendu : la boutique ne propose que des skins Halloween.";
    return;
  }
  const lockReason = getShopItemLockReason(item);
  if (lockReason) {
    progressionFeedback.textContent = `${item.label} : ${lockReason.toLowerCase()}.`;
    return;
  }
  if (item.category !== "boosts" && isShopItemOwned(item)) return;
  const price = getShopItemPrice(item);
  const isFreeOffer = Boolean(getFeaturedOffer(item))
    && progression.shopRotation.freeOfferItemId === item.id
    && !progression.shopRotation.freeOfferClaimed
    && !isShopItemOwned(item);
  if (!isFreeOffer && progression.coins < price) {
    progressionFeedback.textContent = "Tu n'as pas assez de pièces pour cet achat.";
    return;
  }
  if (!isFreeOffer) progression.coins -= price;
  else progression.shopRotation.freeOfferClaimed = true;
  if (item.category === "improvements") {
    progression.improvements[item.path] = item.level;
  } else if (item.category === "powers") {
    progression.powers[item.path] = item.level;
  } else if (item.category === "boosts") {
    progression.boostInventory[item.id] += 1;
    if (!progression.equippedBoost) progression.equippedBoost = item.id;
  } else {
    progression.unlocked[item.category].push(item.id);
  }
  saveProgression(item.category === "improvements"
    ? `${item.label} achetée ! Son effet sera actif dès ta prochaine partie.`
    : isFreeOffer
    ? `${item.label} récupéré gratuitement ! Il est ajouté à ton casier.`
    : `${item.label} acheté ! Clique sur « Équiper » pour l'utiliser.`);
  renderShop();
  refreshLoadoutMenu();
  updateCombatLoadout();
  if (!lockerScreen.hidden) renderLocker();
}

function equipShopItem(itemId, category) {
  const item = findShopItem(itemId, category);
  if (!item) throw new Error(`Article de boutique inconnu : ${itemId}`);
  if (!(isShopItemOwned(item) || item.included)) return;
  if (category === "boosts") {
    progression.equippedBoost = item.id;
  } else {
    equipLoadoutItem(category, item.id);
  }
  saveProgression(`${item.label} équipé.`);
  refreshLoadoutMenu();
  updatePlayerLoadoutAppearance();
  renderShop();
}

function updatePlayerLoadoutAppearance() {
  applyCharacterAppearance(
    player,
    progression.equipped.characters,
    progression.equipped.skins,
    progression.equipped.equipment,
    progression.equipped.weapons,
  );
  updateCombatLoadout();
}

function updateCombatLoadout() {
  const inRun = gameActive && Boolean(runLoadout.ranged);
  const weaponSlots = [
    ["ranged", "weapons", combatRangedSlot, combatWeaponArt, combatWeaponBadge, combatWeaponName, combatWeaponDetail],
    ["melee", "melee", combatMeleeSlot, combatMeleeArt, combatMeleeBadge, combatMeleeName, combatMeleeDetail],
  ];
  for (const [slot, equippedKey, button, art, badge, name, detail] of weaponSlots) {
    const weaponId = inRun ? runLoadout[slot] : progression.equipped[equippedKey];
    const weapon = loadoutOptions.weapons.find((item) => item.id === weaponId);
    if (!weapon) throw new Error(`Arme équipée inconnue : ${weaponId}`);
    const weaponArtSource = getWeaponArtSource(weapon.id);
    if (art.getAttribute("src") !== weaponArtSource) art.src = weaponArtSource;
    art.dataset.coating = progression.equipped.coatings;
    badge.textContent = `Nv ${inRun ? weaponLevel : 1}`;
    name.textContent = weapon.label;
    const baseDamage = inRun ? getRunWeaponDamage(weapon, slot) : getWeaponStats(weapon).damage + getPermanentDamageBonus();
    detail.textContent = weapon.melee
      ? `Mêlée · portée ${weapon.melee.reach} · dégâts ${formatDamage(baseDamage)}`
      : `${weapon.projectiles} projectile${weapon.projectiles === 1 ? "" : "s"} · dégâts ${formatDamage(baseDamage)}`;
    const isActive = slot === (inRun ? activeWeaponSlot : "ranged");
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.setAttribute(
      "aria-label",
      `${slot === "ranged" ? "Arme à distance" : "Épée"} : ${weapon.label}${isActive ? ", en main" : ", cliquer pour la prendre en main"}`,
    );
    if (isActive) {
      combatWeaponIcon.textContent = weapon.icon;
      player.classList.remove(...loadoutOptions.weapons.map((item) => `equipped-weapon-${item.id}`));
      player.classList.add(`equipped-weapon-${weapon.id}`);
    }
  }
  const power = loadoutOptions.activePowers.find((item) => item.id === progression.equipped.activePowers);
  if (!power && progression.equipped.activePowers !== "") {
    throw new Error(`Pouvoir actif équipé inconnu : ${progression.equipped.activePowers}`);
  }
  combatPowerIcon.textContent = power?.icon ?? "＋";
  combatPowerName.textContent = power?.label ?? "Aucun pouvoir";
  const cooldownLabel = activePowerCooldown > 0 ? `${Math.ceil(activePowerCooldown)} s` : "prêt";
  combatPowerDetail.textContent = !power
    ? "Aucun pouvoir équipé"
    : `Niveau ${getPowerLevel(power.id)} · recharge ${power.cooldown} s · ${cooldownLabel}`;
  usePowerButton.disabled = !power || !gameActive || waveCountdown > 0 || activePowerCooldown > 0;
  usePowerButton.classList.toggle("is-recharging", Boolean(power) && activePowerCooldown > 0);
  usePowerButton.classList.toggle("is-empty", !power);
  combatPowerTimer.textContent = power && activePowerCooldown > 0 ? String(Math.ceil(activePowerCooldown)) : "";
  updatePowerCooldownProgress(power);
  usePowerButton.setAttribute(
    "aria-label",
    power ? `${power.label}, ${power.description} ${cooldownLabel}` : "Aucun pouvoir actif équipé",
  );
  updateBoostButton();
}

function shakeArena(strength = "") {
  arena.classList.remove("arena-quake", "arena-quake-light");
  void arena.offsetWidth;
  const className = strength === "light" ? "arena-quake-light" : "arena-quake";
  arena.classList.add(className);
  window.setTimeout(() => arena.classList.remove(className), 420);
}

let liveFxLayers = 0;

function createFxLayer(className, x, y, lifetime, parent = world) {
  if (liveFxLayers >= 24) return { append() {} };
  const layer = document.createElement("span");
  layer.className = `fx-layer ${className}`;
  layer.setAttribute("aria-hidden", "true");
  layer.style.left = `${x}px`;
  layer.style.top = `${y}px`;
  parent.append(layer);
  liveFxLayers += 1;
  window.setTimeout(() => {
    layer.remove();
    liveFxLayers = Math.max(0, liveFxLayers - 1);
  }, lifetime);
  return layer;
}

function addFxParts(layer, className, count = 1, setup = () => {}) {
  for (let index = 0; index < count; index += 1) {
    const part = document.createElement("span");
    part.className = className;
    setup(part.style, index);
    layer.append(part);
  }
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function scatterFx(style, index, count, distanceMin, distanceMax, extra = {}) {
  style.setProperty("--a", `${(index * 360) / count + randomBetween(-12, 12)}deg`);
  style.setProperty("--d", `${randomBetween(distanceMin, distanceMax).toFixed(1)}px`);
  style.setProperty("--s", randomBetween(extra.scaleMin ?? 0.7, extra.scaleMax ?? 1.3).toFixed(2));
  style.setProperty("--t", `${randomBetween(0, extra.delay ?? 0.08).toFixed(3)}s`);
  style.setProperty("--spin", `${randomBetween(-1, 1) * (extra.spin ?? 0)}deg`);
}

function createPowerEffect(effect, x, y, radius, from = null) {
  const r = Math.round(radius);
  if (effect === "ice") {
    const layer = createFxLayer("pfx pfx-ice", x, y, 1700);
    layer.style.setProperty("--r", `${r}px`);
    addFxParts(layer, "pfx-frost");
    addFxParts(layer, "pfx-mist");
    addFxParts(layer, "pfx-ring");
    addFxParts(layer, "pfx-shard", 16, (style, index) => scatterFx(style, index, 16, r * 0.45, r * 0.95, { delay: 0.1 }));
    addFxParts(layer, "pfx-snow", 18, (style, index) => scatterFx(style, index, 18, r * 0.2, r * 0.9, { delay: 0.35, scaleMin: 0.4, scaleMax: 1 }));
    addFxParts(layer, "pfx-flash");
  } else if (effect === "bats") {
    const layer = createFxLayer("pfx pfx-bats", x, y, 1500);
    layer.style.setProperty("--r", `${r}px`);
    addFxParts(layer, "pfx-ring");
    addFxParts(layer, "pfx-mist");
    addFxParts(layer, "pfx-bat", 18, (style, index) => scatterFx(style, index, 18, r * 0.55, r * 1.05, { delay: 0.3, spin: 70, scaleMin: 0.6, scaleMax: 1.25 }));
  } else if (effect === "pumpkin") {
    const lob = 200;
    if (from) {
      const pumpkin = createFxLayer("pfx-thrown-pumpkin", from.x, from.y, lob + 20);
      const dx = x - from.x;
      const dy = y - from.y;
      const arc = Math.min(90, Math.hypot(dx, dy) * 0.35);
      pumpkin.animate([
        { transform: "translate(0, 0) rotate(0deg) scale(0.7)" },
        { transform: `translate(${dx / 2}px, ${dy / 2 - arc}px) rotate(200deg) scale(1.1)` },
        { transform: `translate(${dx}px, ${dy}px) rotate(400deg) scale(0.9)` },
      ], { duration: lob, easing: "linear" });
    }
    window.setTimeout(() => {
      const layer = createFxLayer("pfx pfx-pumpkin", x, y, 1900);
      layer.style.setProperty("--r", `${r}px`);
      addFxParts(layer, "pfx-scorch");
      addFxParts(layer, "pfx-smoke", 7, (style, index) => scatterFx(style, index, 7, r * 0.15, r * 0.5, { delay: 0.15, scaleMin: 0.8, scaleMax: 1.5 }));
      addFxParts(layer, "pfx-fireball");
      addFxParts(layer, "pfx-ring");
      addFxParts(layer, "pfx-debris", 14, (style, index) => scatterFx(style, index, 14, r * 0.6, r * 1.15, { spin: 540, scaleMin: 0.6, scaleMax: 1.4 }));
      addFxParts(layer, "pfx-ember", 12, (style, index) => scatterFx(style, index, 12, r * 0.3, r * 0.9, { delay: 0.2, scaleMin: 0.5, scaleMax: 1.1 }));
      addFxParts(layer, "pfx-flash");
      shakeArena();
    }, from ? lob : 0);
  } else if (effect === "fire") {
    const layer = createFxLayer("pfx pfx-fire", x, y, 1900);
    layer.style.setProperty("--r", `${r}px`);
    addFxParts(layer, "pfx-scorch");
    addFxParts(layer, "pfx-heat");
    addFxParts(layer, "pfx-ring");
    addFxParts(layer, "pfx-flame", 22, (style, index) => scatterFx(style, index, 22, r * 0.7, r * 0.98, { delay: 0.12, scaleMin: 0.7, scaleMax: 1.35 }));
    addFxParts(layer, "pfx-ember", 16, (style, index) => scatterFx(style, index, 16, r * 0.2, r * 0.95, { delay: 0.4, scaleMin: 0.5, scaleMax: 1.1 }));
    addFxParts(layer, "pfx-flash");
    shakeArena("light");
  } else if (effect === "poison") {
    const layer = createFxLayer("pfx pfx-poison", x, y, 900);
    layer.style.setProperty("--r", `${r}px`);
    addFxParts(layer, "pfx-ring");
    addFxParts(layer, "pfx-splash", 14, (style, index) => scatterFx(style, index, 14, r * 0.3, r * 0.85, { delay: 0.1, scaleMin: 0.6, scaleMax: 1.3 }));
    addFxParts(layer, "pfx-flash");
  } else if (effect === "quake") {
    const layer = createFxLayer("pfx pfx-quake", x, y, 1800);
    layer.style.setProperty("--r", `${r}px`);
    addFxParts(layer, "pfx-crater");
    addFxParts(layer, "pfx-crack", 9, (style, index) => {
      style.setProperty("--a", `${(index * 360) / 9 + randomBetween(-14, 14)}deg`);
      style.setProperty("--d", `${randomBetween(r * 0.45, r * 0.95).toFixed(1)}px`);
      style.setProperty("--t", `${randomBetween(0, 0.08).toFixed(3)}s`);
    });
    addFxParts(layer, "pfx-shockwave");
    addFxParts(layer, "pfx-shockwave pfx-shockwave-late");
    addFxParts(layer, "pfx-dust", 14, (style, index) => scatterFx(style, index, 14, r * 0.5, r * 1.05, { delay: 0.25, scaleMin: 0.8, scaleMax: 1.8 }));
    addFxParts(layer, "pfx-rock", 12, (style, index) => scatterFx(style, index, 12, r * 0.3, r * 0.8, { delay: 0.1, spin: 420, scaleMin: 0.5, scaleMax: 1.3 }));
    shakeArena();
  } else if (effect === "vampire") {
    const layer = createFxLayer("pfx pfx-vampire", x, y, 1500);
    layer.style.setProperty("--r", `${r}px`);
    addFxParts(layer, "pfx-blood-moon");
    addFxParts(layer, "pfx-ring");
    addFxParts(layer, "pfx-mist");
    addFxParts(layer, "pfx-drop", 16, (style, index) => scatterFx(style, index, 16, r * 0.55, r * 0.95, { delay: 0.2, scaleMin: 0.6, scaleMax: 1.2 }));
  }
}

// Éclair fourchu : un tracé brisé aléatoire, un halo et des ramifications, redessiné à chaque rebond.
function createLightningBolt(from, to, delay = 0) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  if (length < 2) return;
  window.setTimeout(() => {
    const layer = createFxLayer("pfx-bolt", from.x, from.y, 520);
    layer.style.width = `${length}px`;
    layer.style.rotate = `${Math.atan2(dy, dx)}rad`;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 -30 ${length.toFixed(1)} 60`);
    svg.setAttribute("preserveAspectRatio", "none");
    const segments = Math.max(4, Math.round(length / 22));
    const points = [[0, 0]];
    for (let index = 1; index < segments; index += 1) {
      points.push([(index / segments) * length, randomBetween(-13, 13)]);
    }
    points.push([length, 0]);
    const toPath = (list) => list.map(([px, py], index) => `${index ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
    const main = toPath(points);
    const branches = [];
    for (let index = 1; index < points.length - 1; index += 2) {
      if (Math.random() > 0.55) continue;
      const [bx, by] = points[index];
      const branchLength = randomBetween(14, 34);
      const side = Math.random() < 0.5 ? -1 : 1;
      branches.push(toPath([[bx, by], [bx + branchLength * 0.5, by + side * randomBetween(6, 12)], [bx + branchLength, by + side * randomBetween(12, 22)]]));
    }
    svg.innerHTML = `
      <path class="pfx-bolt-glow" d="${main}" />
      ${branches.map((d) => `<path class="pfx-bolt-branch" d="${d}" />`).join("")}
      <path class="pfx-bolt-core" d="${main}" />`;
    layer.append(svg);
    const spark = createFxLayer("pfx pfx-zap", to.x, to.y, 600);
    spark.style.setProperty("--r", "34px");
    addFxParts(spark, "pfx-flash");
    addFxParts(spark, "pfx-spark", 8, (style, index) => scatterFx(style, index, 8, 14, 34, { scaleMin: 0.6, scaleMax: 1.2 }));
  }, delay);
}

function createVortexField(x, y, radius, duration) {
  const layer = createFxLayer("pfx pfx-vortex", x, y, duration + 900);
  layer.style.setProperty("--r", `${Math.round(radius)}px`);
  layer.style.setProperty("--life", `${duration}ms`);
  addFxParts(layer, "pfx-vortex-pull");
  addFxParts(layer, "pfx-vortex-disc");
  addFxParts(layer, "pfx-vortex-ring");
  addFxParts(layer, "pfx-vortex-core");
  addFxParts(layer, "pfx-vortex-mote", 22, (style, index) => {
    style.setProperty("--a", `${(index * 360) / 22}deg`);
    style.setProperty("--d", `${randomBetween(radius * 0.4, radius * 1.05).toFixed(1)}px`);
    style.setProperty("--t", `${randomBetween(0, 0.9).toFixed(2)}s`);
    style.setProperty("--s", randomBetween(0.5, 1.3).toFixed(2));
  });
  window.setTimeout(() => {
    if (!layer.isConnected) return;
    layer.classList.add("is-imploding");
    const burst = createFxLayer("pfx pfx-implosion", x, y, 1100);
    burst.style.setProperty("--r", `${Math.round(radius)}px`);
    addFxParts(burst, "pfx-flash");
    addFxParts(burst, "pfx-ring");
    addFxParts(burst, "pfx-shard", 14, (style, index) => scatterFx(style, index, 14, radius * 0.5, radius * 1.05, { spin: 300 }));
    shakeArena();
  }, duration);
}

function createHolyPillar(x, y, radius) {
  const layer = createFxLayer("pfx pfx-holy", x, y, 1700);
  layer.style.setProperty("--r", `${Math.round(radius)}px`);
  addFxParts(layer, "pfx-holy-glow");
  addFxParts(layer, "pfx-holy-pillar");
  addFxParts(layer, "pfx-ring");
  addFxParts(layer, "pfx-holy-rune");
  addFxParts(layer, "pfx-feather", 12, (style, index) => scatterFx(style, index, 12, radius * 0.3, radius * 0.95, { delay: 0.35, spin: 160, scaleMin: 0.6, scaleMax: 1.2 }));
  addFxParts(layer, "pfx-mote", 16, (style, index) => scatterFx(style, index, 16, radius * 0.1, radius * 0.8, { delay: 0.6, scaleMin: 0.4, scaleMax: 1 }));
  addFxParts(layer, "pfx-flash");
}

function createBoneShield(x, y, radius, duration) {
  const layer = createFxLayer("pfx pfx-boneshield", x, y, duration + 600);
  layer.style.setProperty("--r", `${Math.round(radius)}px`);
  addFxParts(layer, "pfx-bone-aura");
  const orbit = document.createElement("span");
  orbit.className = "pfx-bone-orbit";
  addFxParts(orbit, "pfx-bone", 6, (style, index) => style.setProperty("--a", `${index * 60}deg`));
  layer.append(orbit);
  const burst = createFxLayer("pfx pfx-bone-burst", x, y, 900);
  burst.style.setProperty("--r", `${Math.round(radius)}px`);
  addFxParts(burst, "pfx-ring");
  addFxParts(burst, "pfx-bone-chip", 10, (style, index) => scatterFx(style, index, 10, radius * 0.5, radius * 1.1, { spin: 360, scaleMin: 0.6, scaleMax: 1.1 }));
  return layer;
}

function createTornado(x, y, radius, duration) {
  const layer = createFxLayer("pfx pfx-tornado", x, y, duration + 600);
  layer.style.setProperty("--r", `${Math.round(radius)}px`);
  addFxParts(layer, "pfx-tornado-base");
  const funnel = document.createElement("span");
  funnel.className = "pfx-tornado-funnel";
  addFxParts(funnel, "pfx-tornado-band", 6, (style, index) => {
    style.setProperty("--i", String(index));
    style.setProperty("--t", `${(-index * 0.11).toFixed(2)}s`);
  });
  layer.append(funnel);
  addFxParts(layer, "pfx-tornado-debris", 10, (style, index) => {
    style.setProperty("--a", `${index * 36}deg`);
    style.setProperty("--h", `${randomBetween(10, 90).toFixed(0)}%`);
    style.setProperty("--t", `${randomBetween(-1, 0).toFixed(2)}s`);
    style.setProperty("--s", randomBetween(0.6, 1.3).toFixed(2));
  });
  return layer;
}

function createMeteor(x, y, radius, delay) {
  window.setTimeout(() => {
    if (!gameActive) return;
    const marker = createFxLayer("pfx pfx-meteor-mark", x, y, 520);
    marker.style.setProperty("--r", `${Math.round(radius)}px`);
    const fall = createFxLayer("pfx-meteor-fall", x, y, 460);
    fall.animate([
      { transform: "translate(160px, -420px) rotate(-35deg) scale(0.7)", opacity: 0.4 },
      { transform: "translate(0, 0) rotate(-35deg) scale(1.1)", opacity: 1 },
    ], { duration: 420, easing: "cubic-bezier(0.55, 0, 1, 0.6)", fill: "forwards" });
    window.setTimeout(() => {
      const layer = createFxLayer("pfx pfx-meteor", x, y, 1700);
      layer.style.setProperty("--r", `${Math.round(radius)}px`);
      addFxParts(layer, "pfx-scorch");
      addFxParts(layer, "pfx-crater");
      addFxParts(layer, "pfx-fireball");
      addFxParts(layer, "pfx-shockwave");
      addFxParts(layer, "pfx-rock", 9, (style, index) => scatterFx(style, index, 9, radius * 0.4, radius * 1.1, { spin: 420, scaleMin: 0.5, scaleMax: 1.2 }));
      addFxParts(layer, "pfx-ember", 10, (style, index) => scatterFx(style, index, 10, radius * 0.3, radius * 0.9, { delay: 0.15, scaleMin: 0.5, scaleMax: 1.1 }));
      addFxParts(layer, "pfx-flash");
      shakeArena("light");
    }, 420);
  }, delay);
}

function createWolfPack(x, y, count, duration) {
  const layer = createFxLayer("pfx-wolf-pack", x, y, duration + 600);
  addFxParts(layer, "pfx-wolf", count, (style, index) => {
    style.setProperty("--a", `${(index * 360) / count}deg`);
    style.setProperty("--t", `${(-index * 0.35).toFixed(2)}s`);
  });
  const howl = createFxLayer("pfx pfx-howl", x, y, 1000);
  howl.style.setProperty("--r", "110px");
  addFxParts(howl, "pfx-ring");
  addFxParts(howl, "pfx-ghost", 6, (style, index) => scatterFx(style, index, 6, 50, 110, { delay: 0.1, scaleMin: 0.7, scaleMax: 1.1 }));
  return layer;
}

function createPoisonCloud(x, y, radius, duration) {
  const layer = createFxLayer("pfx pfx-poison-cloud", x, y, duration + 800);
  layer.style.setProperty("--r", `${Math.round(radius)}px`);
  layer.style.setProperty("--life", `${duration}ms`);
  addFxParts(layer, "pfx-toxic-pool");
  addFxParts(layer, "pfx-toxic-puff", 9, (style, index) => {
    style.setProperty("--a", `${(index * 360) / 9 + randomBetween(-15, 15)}deg`);
    style.setProperty("--d", `${randomBetween(radius * 0.1, radius * 0.6).toFixed(1)}px`);
    style.setProperty("--s", randomBetween(0.8, 1.5).toFixed(2));
    style.setProperty("--t", `${randomBetween(-3, 0).toFixed(2)}s`);
  });
  addFxParts(layer, "pfx-bubble", 12, (style) => {
    style.setProperty("--x", `${randomBetween(-radius * 0.7, radius * 0.7).toFixed(1)}px`);
    style.setProperty("--y", `${randomBetween(-radius * 0.45, radius * 0.45).toFixed(1)}px`);
    style.setProperty("--t", `${randomBetween(0, 1.6).toFixed(2)}s`);
    style.setProperty("--s", randomBetween(0.5, 1.2).toFixed(2));
  });
  return layer;
}

function createBloodStream(from, to, delay = 0) {
  for (let index = 0; index < 6; index += 1) {
    window.setTimeout(() => {
      const drop = createFxLayer("pfx-blood-drop", from.x, from.y, 560);
      const bend = randomBetween(-40, 40);
      drop.animate([
        { transform: "translate(0, 0) scale(0.6)", opacity: 0 },
        { transform: `translate(${(to.x - from.x) * 0.5 + bend}px, ${(to.y - from.y) * 0.5 - 30}px) scale(1.1)`, opacity: 1, offset: 0.45 },
        { transform: `translate(${to.x - from.x}px, ${to.y - from.y - 10}px) scale(0.4)`, opacity: 0.2 },
      ], { duration: 520, easing: "cubic-bezier(0.4, 0, 0.6, 1)" });
    }, delay + index * 55);
  }
}

function showHealNumber(amount) {
  const center = playerCenter();
  const number = document.createElement("span");
  number.className = "heal-num";
  number.setAttribute("aria-hidden", "true");
  number.textContent = `+${Math.round(amount)} PV`;
  number.style.left = `${center.x}px`;
  number.style.top = `${center.y - 46 * scaleActor()}px`;
  world.append(number);
  window.setTimeout(() => number.remove(), 900);
}

function healPlayer(amount) {
  const healed = Math.min(amount, maxPlayerHealth - playerHealth);
  if (healed <= 0) return 0;
  playerHealth += healed;
  updatePlayerHealth();
  showHealNumber(healed);
  player.classList.remove("player-healed");
  void player.offsetWidth;
  player.classList.add("player-healed");
  return healed;
}

function setEnemyStatus(enemy, kind, active) {
  enemy.element.classList.toggle(`enemy-${kind}`, active);
  const existing = enemy.element.querySelector(`:scope > .enemy-fx-${kind}`);
  if (active && !existing) {
    const fx = document.createElement("span");
    fx.className = `enemy-fx enemy-fx-${kind}`;
    fx.setAttribute("aria-hidden", "true");
    for (let index = 0; index < 4; index += 1) fx.append(document.createElement("i"));
    enemy.element.append(fx);
  } else if (!active) {
    existing?.remove();
  }
}

function isMegaBoss(enemy) {
  return enemy.typeName === "boss" && enemy.profileName === "mega-cauchemar";
}

function stunEnemy(enemy, duration) {
  if (!enemies.has(enemy) || isMegaBoss(enemy)) return;
  enemy.stunRemaining = Math.max(enemy.stunRemaining ?? 0, enemy.typeName === "boss" ? duration * 0.4 : duration);
  setEnemyStatus(enemy, "stunned", true);
}

function slowEnemy(enemy, duration, factor) {
  if (!enemies.has(enemy)) return;
  enemy.slowFactor = enemy.slowRemaining > 0 ? Math.min(enemy.slowFactor ?? 1, factor) : factor;
  enemy.slowRemaining = Math.max(enemy.slowRemaining ?? 0, duration);
  setEnemyStatus(enemy, "slowed", true);
}

function applyDamageOverTime(enemy, kind, damagePerSecond, duration) {
  if (!enemies.has(enemy)) return;
  enemy[`${kind}Remaining`] = Math.max(enemy[`${kind}Remaining`] ?? 0, duration);
  enemy[`${kind}Damage`] = Math.max(enemy[`${kind}Damage`] ?? 0, damagePerSecond);
  setEnemyStatus(enemy, kind, true);
}

function igniteEnemy(enemy, damagePerSecond, duration) {
  if (!enemies.has(enemy)) return;
  enemy.burnRemaining = Math.max(enemy.burnRemaining ?? 0, duration);
  enemy.burnDamage = Math.max(enemy.burnDamage ?? 0, damagePerSecond);
  enemy.burnTickElapsed = enemy.burnTickElapsed ?? 0;
  enemy.element.classList.add("enemy-burning");
  if (!enemy.element.querySelector(".enemy-burn-flames")) enemy.element.append(createBurnFlames());
}

const powerFields = new Set();

function clearPowerFields() {
  powerFields.clear();
  player.classList.remove("power-boneshield-active");
  arena.classList.remove("arena-timestop");
  world.querySelectorAll(".pfx-vortex, .pfx-poison-cloud, .pfx-boneshield, .pfx-tornado, .pfx-wolf-pack, .pfx-wolf-lunge, .pfx-timestop, .pfx-meteor-fall")
    .forEach((layer) => layer.remove());
}

function hasPowerField(kind) {
  for (const field of powerFields) if (field.kind === kind && field.round === roundId) return true;
  return false;
}

function moveFieldLayer(field) {
  if (!field.layer) return;
  field.layer.style.left = `${field.x}px`;
  field.layer.style.top = `${field.y}px`;
}

function endPowerField(field) {
  powerFields.delete(field);
  if (field.kind === "boneshield" && !hasPowerField("boneshield")) player.classList.remove("power-boneshield-active");
  if (field.kind === "timestop") arena.classList.remove("arena-timestop");
  if (field.layer) {
    field.layer.classList.add("is-ending");
    const layer = field.layer;
    window.setTimeout(() => layer.remove(), 420);
  }
  if (field.kind === "tornado") {
    for (const enemy of enemiesWithin(field.x, field.y, field.radius)) {
      damageEnemy(enemy, field.damage * 2, { knockback: false });
      if (enemies.has(enemy)) applyEnemyKnockback(enemy, field, isMegaBoss(enemy) ? 0 : field.push);
    }
  }
}

function launchWolf(field, enemy) {
  const from = { x: field.x + randomBetween(-30, 30), y: field.y + randomBetween(-20, 20) };
  const wolf = createFxLayer("pfx-wolf-lunge", from.x, from.y, 520);
  const dx = enemy.x - from.x;
  const dy = enemy.y - from.y;
  wolf.classList.toggle("is-left", dx < 0);
  wolf.animate([
    { transform: "translate(0, 0) scale(0.6)", opacity: 0 },
    { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 34}px) scale(1.05)`, opacity: 1, offset: 0.55 },
    { transform: `translate(${dx}px, ${dy}px) scale(0.9)`, opacity: 0.9 },
  ], { duration: 380, easing: "cubic-bezier(0.3, 0, 0.5, 1)", fill: "forwards" });
  const castRound = roundId;
  window.setTimeout(() => {
    if (castRound !== roundId || !enemies.has(enemy)) return;
    const bite = createFxLayer("pfx pfx-bite", enemy.x, enemy.y, 600);
    bite.style.setProperty("--r", "36px");
    addFxParts(bite, "pfx-bite-jaw");
    addFxParts(bite, "pfx-drop", 6, (style, index) => scatterFx(style, index, 6, 12, 34, { scaleMin: 0.5, scaleMax: 1 }));
    damageEnemy(enemy, field.damage, { knockback: false });
    applyDamageOverTime(enemy, "bleed", field.bleed, 3);
    playSound("power", "wolf-bite");
  }, 360);
}

function updatePowerFields(delta) {
  for (const field of powerFields) {
    if (field.round !== roundId) {
      powerFields.delete(field);
      continue;
    }
    field.remaining -= delta;
    field.tickElapsed += delta;
    const tick = field.tickElapsed >= field.tickInterval;
    if (tick) field.tickElapsed -= field.tickInterval;
    if (field.follow) {
      const center = playerCenter();
      field.x = center.x;
      field.y = center.y;
      moveFieldLayer(field);
    }
    if (field.kind === "tornado") {
      const target = nearestEnemy();
      if (target) {
        const dx = target.x - field.x;
        const dy = target.y - field.y;
        const length = Math.hypot(dx, dy);
        const step = Math.min(length, field.speed * delta * motionScale());
        if (length > 1) {
          field.x += dx / length * step;
          field.y += dy / length * step;
        }
      }
      field.x = Math.max(20, Math.min(playWorldWidth() - 20, field.x));
      field.y = Math.max(20, Math.min(playWorldHeight() - 20, field.y));
      moveFieldLayer(field);
    }
    if (field.kind === "wolves") {
      if (tick) {
        const targets = enemiesWithin(field.x, field.y, field.range)
          .filter((enemy) => enemy.spawnRemaining <= 0)
          .sort((a, b) => Math.hypot(a.x - field.x, a.y - field.y) - Math.hypot(b.x - field.x, b.y - field.y))
          .slice(0, field.count);
        targets.forEach((enemy, index) => window.setTimeout(() => {
          if (field.round === roundId && powerFields.has(field) && enemies.has(enemy)) launchWolf(field, enemy);
        }, index * 120));
      }
      if (field.remaining <= 0) endPowerField(field);
      continue;
    }
    if (field.kind === "timestop") {
      if (field.remaining <= 0) endPowerField(field);
      continue;
    }
    for (const enemy of [...enemies]) {
      if (enemy.spawnRemaining > 0) continue;
      const offsetX = field.x - enemy.x;
      const offsetY = field.y - enemy.y;
      const distance = Math.hypot(offsetX, offsetY);
      if (distance > field.radius) continue;
      if (field.kind === "vortex") {
        const strength = isMegaBoss(enemy) ? 0 : enemy.typeName === "boss" ? 0.3 : 1;
        const step = Math.min(distance - 6, field.pull * strength * delta * (1.3 - distance / field.radius));
        if (step > 0) {
          const radius = getEnemyMoveRadius(enemy);
          const swirl = 0.45;
          const nextX = enemy.x + (offsetX / distance) * step - (offsetY / distance) * step * swirl;
          const nextY = enemy.y + (offsetY / distance) * step + (offsetX / distance) * step * swirl;
          if (canOccupy(nextX, nextY, radius)) {
            enemy.x = nextX;
            enemy.y = nextY;
            enemy.element.style.left = `${enemy.x}px`;
            enemy.element.style.top = `${enemy.y}px`;
          }
        }
        if (tick) damageEnemy(enemy, field.tick, { knockback: false });
      } else if (field.kind === "poison") {
        applyDamageOverTime(enemy, "poison", field.poison, field.poisonDuration);
        slowEnemy(enemy, 0.6, 0.55);
      } else if (field.kind === "boneshield") {
        if (tick && distance <= field.radius + getEnemyHitRadius(enemy) * 0.5) {
          damageEnemy(enemy, field.damage, { knockback: false });
          if (enemies.has(enemy)) applyEnemyKnockback(enemy, field, isMegaBoss(enemy) ? 0 : 26);
          playSound("power", "bone-hit");
        }
      } else if (field.kind === "tornado") {
        const strength = isMegaBoss(enemy) ? 0 : enemy.typeName === "boss" ? 0.25 : 1;
        const step = Math.min(Math.max(0, distance - 10), field.pull * strength * delta);
        const swirl = 1.1;
        const nx = distance > 0.5 ? offsetX / distance : 0;
        const ny = distance > 0.5 ? offsetY / distance : 0;
        const nextX = enemy.x + nx * step - ny * field.pull * strength * delta * swirl * 0.6;
        const nextY = enemy.y + ny * step + nx * field.pull * strength * delta * swirl * 0.6;
        if (canOccupy(nextX, nextY, getEnemyMoveRadius(enemy))) {
          enemy.x = nextX;
          enemy.y = nextY;
          enemy.element.style.left = `${enemy.x}px`;
          enemy.element.style.top = `${enemy.y}px`;
        }
        if (tick) {
          damageEnemy(enemy, field.tick, { knockback: false });
          slowEnemy(enemy, 0.5, 0.4);
        }
      }
    }
    if (field.kind === "boneshield" || field.kind === "tornado") {
      if (field.remaining <= 0) endPowerField(field);
      continue;
    }
    if (field.remaining <= 0) {
      powerFields.delete(field);
      if (field.kind === "vortex") {
        for (const enemy of [...enemies]) {
          const distance = Math.hypot(enemy.x - field.x, enemy.y - field.y);
          if (distance > field.radius * 0.8) continue;
          damageEnemy(enemy, field.damage, { knockback: false });
          if (enemies.has(enemy)) applyEnemyKnockback(enemy, field, isMegaBoss(enemy) ? 0 : 120);
        }
      }
    }
  }
}

function createVeilEffect(x, y, duration) {
  player.querySelector(".pfx-veil-bubble")?.remove();
  const bubble = document.createElement("span");
  bubble.className = "pfx-veil-bubble";
  bubble.setAttribute("aria-hidden", "true");
  bubble.style.setProperty("--veil-duration", `${duration}ms`);
  addFxParts(bubble, "pfx-wisp", 5, (style, index) => {
    style.setProperty("--a", `${index * 72}deg`);
    style.setProperty("--t", `${(-index * 0.28).toFixed(2)}s`);
  });
  player.append(bubble);
  window.setTimeout(() => bubble.remove(), duration);
  const burst = createFxLayer("pfx pfx-veil", x, y, 1100);
  burst.style.setProperty("--r", "90px");
  addFxParts(burst, "pfx-ring");
  addFxParts(burst, "pfx-ghost", 8, (style, index) => scatterFx(style, index, 8, 50, 95, { delay: 0.12, scaleMin: 0.7, scaleMax: 1.1 }));
}

function createBurnFlames() {
  const flames = document.createElement("span");
  flames.className = "enemy-burn-flames";
  flames.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 3; index += 1) flames.append(document.createElement("i"));
  return flames;
}

function enemiesWithin(x, y, radius) {
  return [...enemies].filter((enemy) => Math.hypot(enemy.x - x, enemy.y - y) <= radius + getEnemyHitRadius(enemy) * 0.5);
}

function castPlayerPose(className, duration) {
  player.classList.remove(className);
  void player.offsetWidth;
  player.classList.add(className);
  window.setTimeout(() => player.classList.remove(className), duration);
}

function findPowerTarget(scale) {
  const center = playerCenter();
  const target = nearestEnemy();
  return target
    ? { x: target.x, y: target.y }
    : { x: center.x + facing.x * 145 * scale, y: center.y + facing.y * 145 * scale };
}

function useActivePower() {
  if (!gameActive || waveCountdown > 0 || activePowerCooldown > 0) return;
  const center = playerCenter();
  const power = loadoutOptions.activePowers.find((item) => item.id === progression.equipped.activePowers);
  if (!power && progression.equipped.activePowers !== "") {
    throw new Error(`Pouvoir actif équipé inconnu : ${progression.equipped.activePowers}`);
  }
  if (!power) return;
  const scale = Math.max(0.48, Math.min(1, playWorldWidth() / 1160));
  const level = getPowerLevel(power.id);
  const stats = powerLevelStats[power.effect](level);
  const radius = (stats.radius ?? 0) * scale;

  if (power.effect === "ice") {
    createPowerEffect("ice", center.x, center.y, radius);
    for (const enemy of enemiesWithin(center.x, center.y, radius)) {
      enemy.frozenRemaining = Math.max(enemy.frozenRemaining ?? 0, 15);
      enemy.element.classList.add("enemy-frozen");
      slowEnemy(enemy, 15 + stats.slow, 0.6);
      damageEnemy(enemy, stats.damage);
    }
    castPlayerPose("power-ice-casting", 560);
  } else if (power.effect === "bats") {
    createPowerEffect("bats", center.x, center.y, radius);
    let healed = 0;
    for (const enemy of enemiesWithin(center.x, center.y, radius)) {
      damageEnemy(enemy, stats.damage);
      if (healed < stats.heal) healed += 1;
    }
    if (healed > 0) window.setTimeout(() => healPlayer(healed), 380);
    castPlayerPose("power-cast-generic", 600);
  } else if (power.effect === "pumpkin") {
    const target = findPowerTarget(scale);
    createPowerEffect("pumpkin", target.x, target.y, radius, center);
    const castRound = roundId;
    window.setTimeout(() => {
      if (castRound !== roundId) return;
      for (const enemy of enemiesWithin(target.x, target.y, radius)) {
        damageEnemy(enemy, stats.damage, { knockback: false });
        igniteEnemy(enemy, stats.burn, stats.burnDuration);
        if (enemies.has(enemy)) applyEnemyKnockback(enemy, target, stats.push * scale);
      }
    }, 200);
    castPlayerPose("power-throw-casting", 520);
  } else if (power.effect === "veil") {
    activePowerInvulnerabilityRemaining = stats.duration;
    player.classList.add("power-veil-active");
    createVeilEffect(center.x, center.y, activePowerInvulnerabilityRemaining * 1000);
  } else if (power.effect === "fire") {
    createPowerEffect("fire", center.x, center.y, radius);
    castPlayerPose("power-fire-casting", 750);
    for (const enemy of enemiesWithin(center.x, center.y, radius)) {
      igniteEnemy(enemy, stats.burn, stats.burnDuration);
      damageEnemy(enemy, stats.damage, { knockback: false });
      if (enemies.has(enemy)) applyEnemyKnockback(enemy, center, stats.push * scale);
    }
  } else if (power.effect === "poison") {
    const duration = stats.cloudDuration * 1000;
    createPowerEffect("poison", center.x, center.y, radius);
    createPoisonCloud(center.x, center.y, radius, duration);
    powerFields.add({
      kind: "poison", x: center.x, y: center.y, radius, remaining: stats.cloudDuration, round: roundId,
      tickElapsed: 0, tickInterval: 0.5, poison: stats.poison, poisonDuration: stats.poisonDuration,
    });
    castPlayerPose("power-cast-generic", 600);
  } else if (power.effect === "lightning") {
    const hopRange = 175 * scale;
    const struck = [];
    let from = { x: center.x, y: center.y - 14 * scale };
    let candidates = enemiesWithin(center.x, center.y, radius);
    for (let hop = 0; hop < stats.chains && candidates.length > 0; hop += 1) {
      const origin = from;
      candidates.sort((a, b) => Math.hypot(a.x - origin.x, a.y - origin.y) - Math.hypot(b.x - origin.x, b.y - origin.y));
      const target = candidates[0];
      struck.push(target);
      createLightningBolt(from, { x: target.x, y: target.y - 10 * scale }, hop * 70);
      from = { x: target.x, y: target.y - 10 * scale };
      candidates = [...enemies].filter((enemy) => !struck.includes(enemy)
        && Math.hypot(enemy.x - target.x, enemy.y - target.y) <= hopRange);
    }
    if (struck.length === 0) {
      const aim = findPowerTarget(scale);
      createLightningBolt({ x: center.x, y: center.y - 14 * scale }, aim);
    }
    const castRound = roundId;
    struck.forEach((enemy, hop) => {
      window.setTimeout(() => {
        if (castRound !== roundId || !enemies.has(enemy)) return;
        damageEnemy(enemy, stats.damage * Math.max(0.55, 1 - hop * 0.08), { knockback: false });
        stunEnemy(enemy, stats.stun);
      }, hop * 70);
    });
    arena.classList.remove("arena-lightning");
    void arena.offsetWidth;
    arena.classList.add("arena-lightning");
    window.setTimeout(() => arena.classList.remove("arena-lightning"), 450);
    castPlayerPose("power-cast-generic", 600);
  } else if (power.effect === "quake") {
    createPowerEffect("quake", center.x, center.y, radius);
    const castRound = roundId;
    for (const enemy of enemiesWithin(center.x, center.y, radius)) {
      const distance = Math.hypot(enemy.x - center.x, enemy.y - center.y);
      window.setTimeout(() => {
        if (castRound !== roundId || !enemies.has(enemy)) return;
        damageEnemy(enemy, stats.damage, { knockback: false });
        if (!enemies.has(enemy)) return;
        applyEnemyKnockback(enemy, center, isMegaBoss(enemy) ? 0 : stats.push * scale * (enemy.typeName === "boss" ? 0.4 : 1));
        stunEnemy(enemy, stats.stun);
      }, (distance / Math.max(radius, 1)) * 320);
    }
    castPlayerPose("power-slam-casting", 640);
  } else if (power.effect === "vortex") {
    const target = findPowerTarget(scale);
    const duration = stats.duration;
    createVortexField(target.x, target.y, radius, duration * 1000);
    powerFields.add({
      kind: "vortex", x: target.x, y: target.y, radius, remaining: duration, round: roundId,
      tickElapsed: 0, tickInterval: 0.25, tick: stats.tick, damage: stats.damage, pull: 170 * scale,
    });
    castPlayerPose("power-cast-generic", 600);
  } else if (power.effect === "vampire") {
    createPowerEffect("vampire", center.x, center.y, radius);
    let totalHeal = 0;
    for (const enemy of enemiesWithin(center.x, center.y, radius)) {
      createBloodStream({ x: enemy.x, y: enemy.y }, center, Math.random() * 120);
      damageEnemy(enemy, stats.damage, { knockback: false });
      applyDamageOverTime(enemy, "bleed", stats.bleed, stats.bleedDuration);
      totalHeal += stats.heal;
    }
    if (totalHeal > 0) window.setTimeout(() => healPlayer(Math.min(totalHeal, 30 + level * 5)), 450);
    castPlayerPose("power-cast-generic", 700);
  } else if (power.effect === "holy") {
    createHolyPillar(center.x, center.y, radius);
    window.setTimeout(() => healPlayer(stats.heal), 260);
    const castRound = roundId;
    window.setTimeout(() => {
      if (castRound !== roundId) return;
      for (const enemy of enemiesWithin(center.x, center.y, radius)) {
        damageEnemy(enemy, stats.damage, { knockback: false });
        if (!enemies.has(enemy)) continue;
        slowEnemy(enemy, stats.slow, 0.45);
        applyEnemyKnockback(enemy, center, isMegaBoss(enemy) ? 0 : 40 * scale);
      }
    }, 180);
    castPlayerPose("power-holy-casting", 800);
  } else if (power.effect === "boneshield") {
    for (const field of [...powerFields]) if (field.kind === "boneshield") endPowerField(field);
    const layer = createBoneShield(center.x, center.y, radius, stats.duration * 1000);
    powerFields.add({
      kind: "boneshield", x: center.x, y: center.y, radius, remaining: stats.duration, round: roundId, follow: true,
      tickElapsed: 0, tickInterval: 0.45, damage: stats.damage, reduction: stats.reduction, layer,
    });
    player.classList.add("power-boneshield-active");
    castPlayerPose("power-cast-generic", 600);
  } else if (power.effect === "tornado") {
    const target = findPowerTarget(scale);
    const start = { x: center.x + (target.x - center.x) * 0.35, y: center.y + (target.y - center.y) * 0.35 };
    const layer = createTornado(start.x, start.y, radius, stats.duration * 1000);
    powerFields.add({
      kind: "tornado", x: start.x, y: start.y, radius, remaining: stats.duration, round: roundId,
      tickElapsed: 0, tickInterval: 0.3, tick: stats.damage, damage: stats.damage, pull: 150 * scale,
      speed: 120 * scale, push: stats.push * scale, layer,
    });
    castPlayerPose("power-cast-generic", 600);
  } else if (power.effect === "meteor") {
    const targets = [...enemies]
      .filter((enemy) => enemy.spawnRemaining <= 0)
      .sort((a, b) => Math.hypot(a.x - center.x, a.y - center.y) - Math.hypot(b.x - center.x, b.y - center.y))
      .slice(0, stats.count)
      .map((enemy) => ({ x: enemy.x, y: enemy.y }));
    while (targets.length < stats.count) {
      const angle = Math.random() * Math.PI * 2;
      const distance = randomBetween(90, 260) * scale;
      targets.push({
        x: Math.max(30, Math.min(playWorldWidth() - 30, center.x + Math.cos(angle) * distance)),
        y: Math.max(30, Math.min(playWorldHeight() - 30, center.y + Math.sin(angle) * distance)),
      });
    }
    const castRound = roundId;
    targets.forEach((target, index) => {
      const delay = index * 170;
      createMeteor(target.x, target.y, radius, delay);
      window.setTimeout(() => {
        if (castRound !== roundId) return;
        for (const enemy of enemiesWithin(target.x, target.y, radius)) {
          damageEnemy(enemy, stats.damage, { knockback: false });
          if (!enemies.has(enemy)) continue;
          igniteEnemy(enemy, stats.burn, stats.burnDuration);
          stunEnemy(enemy, stats.stun);
          applyEnemyKnockback(enemy, target, isMegaBoss(enemy) ? 0 : 36 * scale);
        }
        playSound("power", "meteor-impact");
      }, delay + 420);
    });
    castPlayerPose("power-cast-generic", 700);
  } else if (power.effect === "wolves") {
    for (const field of [...powerFields]) if (field.kind === "wolves") endPowerField(field);
    const layer = createWolfPack(center.x, center.y, stats.count, stats.duration * 1000);
    powerFields.add({
      kind: "wolves", x: center.x, y: center.y, radius: 0, remaining: stats.duration, round: roundId, follow: true,
      tickElapsed: 0.6, tickInterval: 1.1, count: stats.count, damage: stats.damage, bleed: stats.bleed,
      range: stats.range * scale, layer,
    });
    castPlayerPose("power-cast-generic", 650);
  } else if (power.effect === "timestop") {
    const layer = createFxLayer("pfx pfx-timestop", center.x, center.y, stats.duration * 1000 + 600);
    layer.style.setProperty("--r", `${Math.round(radius)}px`);
    layer.style.setProperty("--life", `${stats.duration * 1000}ms`);
    addFxParts(layer, "pfx-flash");
    addFxParts(layer, "pfx-clock");
    addFxParts(layer, "pfx-clock-hand");
    addFxParts(layer, "pfx-clock-hand pfx-clock-hand-long");
    addFxParts(layer, "pfx-ring");
    addFxParts(layer, "pfx-sand", 14, (style, index) => scatterFx(style, index, 14, radius * 0.2, radius * 0.9, { delay: 0.5, scaleMin: 0.5, scaleMax: 1.1 }));
    arena.classList.add("arena-timestop");
    const until = performance.now() + stats.duration * 1000;
    for (const enemy of enemiesWithin(center.x, center.y, radius)) {
      stunEnemy(enemy, stats.duration);
      enemy.timeStoppedUntil = isMegaBoss(enemy) ? 0 : until;
    }
    powerFields.add({
      kind: "timestop", x: center.x, y: center.y, radius, remaining: stats.duration, round: roundId,
      tickElapsed: 0, tickInterval: 1, layer,
    });
    castPlayerPose("power-cast-generic", 700);
  }

  playSound("power", power.effect);
  activePowerCooldown = power.cooldown;
  updateCombatLoadout();
  roundMessage.textContent = `${power.label} !`;
  roundMessage.hidden = false;
  window.setTimeout(() => { roundMessage.hidden = true; }, 1100);
}

function formatDamage(value) {
  return value.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
}

function updateBoostButton() {
  const boost = boostOptions.find((item) => item.id === progression.equippedBoost);
  const count = boost ? progression.boostInventory[boost.id] : 0;
  combatBoostIcon.textContent = boost?.icon ?? "＋";
  combatBoostName.textContent = boost && count > 0 ? boost.label : "Aucun boost";
  if (boostCooldown > 0) {
    combatBoostDetail.textContent = `Recharge : ${Math.ceil(boostCooldown)} s · ×${count}`;
  } else if (activeBoostRemaining > 0) {
    combatBoostDetail.textContent = `Effet actif : ${Math.ceil(activeBoostRemaining)} s · ×${count}`;
  } else {
    combatBoostDetail.textContent = boost && count > 0
      ? `Disponible · ×${count}`
      : "Équipe un boost au menu";
  }
  useBoostButton.disabled = !gameActive || waveCountdown > 0 || boostCooldown > 0 || (!boost || count === 0);
  useBoostButton.classList.toggle("is-recharging", boostCooldown > 0);
  useBoostButton.classList.toggle("is-empty", !boost || count === 0);
  useBoostButton.classList.toggle("is-active", activeBoostRemaining > 0);
  combatBoostBadge.textContent = boost && count > 0 ? `×${count}` : "";
  combatBoostTimer.textContent = boostCooldown > 0 ? String(Math.ceil(boostCooldown))
    : activeBoostRemaining > 0 ? String(Math.ceil(activeBoostRemaining)) : "";
  useBoostButton.style.setProperty(
    "--boost-cooldown-progress",
    String(boostCooldown > 0 ? 1 - boostCooldown / boostCooldownDuration : 1),
  );
  useBoostButton.setAttribute(
    "aria-label",
    boost && count > 0
      ? `${boost.label}, ${count} restant${count === 1 ? "" : "s"}${boostCooldown > 0 ? `, recharge ${Math.ceil(boostCooldown)} secondes` : ""}`
      : activeBoostRemaining > 0 ? `Boost actif encore ${Math.ceil(activeBoostRemaining)} secondes` : "Aucun boost équipé",
  );
}

function useEquippedBoost() {
  if (!gameActive || waveCountdown > 0 || boostCooldown > 0) return;
  const boost = boostOptions.find((item) => item.id === progression.equippedBoost);
  if (!boost || progression.boostInventory[boost.id] < 1) {
    progressionFeedback.textContent = "Choisis un boost possédé dans ton casier avant de partir.";
    return;
  }

  progression.boostInventory[boost.id] -= 1;
  if (boost.id === "soin") {
    const healed = Math.min(35, maxPlayerHealth - playerHealth);
    if (healed === 0) {
      progression.boostInventory[boost.id] += 1;
      progressionFeedback.textContent = "Ta vie est déjà au maximum : le boost de soin est conservé.";
      return;
    }
    playerHealth += healed;
    updatePlayerHealth();
    roundMessage.textContent = `Boost de soin : +${healed} PV`;
  } else {
    activeBoostId = boost.id;
    activeBoostRemaining = boost.duration;
    player.classList.add(`boost-${boost.id}`);
    roundMessage.textContent = `${boost.label} activé !`;
  }
  if (progression.boostInventory[boost.id] === 0) progression.equippedBoost = "";
  boostCooldown = boostCooldownDuration;
  saveProgression(`${boost.label} utilisé.`);
  updateBoostButton();
  roundMessage.hidden = false;
  window.setTimeout(() => { roundMessage.hidden = true; }, 1200);
}

function updateActiveBoost(delta) {
  if (activeBoostRemaining <= 0) return;
  activeBoostRemaining = Math.max(0, activeBoostRemaining - delta);
  if (activeBoostRemaining === 0) {
    player.classList.remove(`boost-${activeBoostId}`);
    activeBoostId = "";
  }
  updateBoostButton();
}

function updateBoostCooldown(delta) {
  if (boostCooldown <= 0) return;
  boostCooldown = Math.max(0, boostCooldown - delta);
  updateBoostButton();
}

function updatePowerCooldownProgress(power) {
  usePowerButton.style.setProperty(
    "--boost-cooldown-progress",
    String(power && activePowerCooldown > 0 ? 1 - activePowerCooldown / power.cooldown : 1),
  );
}

function updatePowerCooldown(delta) {
  if (activePowerInvulnerabilityRemaining > 0) {
    activePowerInvulnerabilityRemaining = Math.max(0, activePowerInvulnerabilityRemaining - delta);
    if (activePowerInvulnerabilityRemaining === 0) player.classList.remove("power-veil-active");
  }
  if (activePowerCooldown > 0) {
    const previousDisplayed = Math.ceil(activePowerCooldown);
    activePowerCooldown = Math.max(0, activePowerCooldown - delta);
    if (Math.ceil(activePowerCooldown) !== previousDisplayed) updateCombatLoadout();
    else updatePowerCooldownProgress(loadoutOptions.activePowers.find((item) => item.id === progression.equipped.activePowers));
  }
}

function initializeAudio() {
  if (!effectsEnabled && !musicEnabled && !audioContext) return;
  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
  if (!AudioContextClass) {
    effectsEnabled = false;
    musicEnabled = false;
    soundToggle.textContent = "♫ Son indisponible";
    musicToggle.textContent = "♪ Musique indisponible";
    soundToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-pressed", "false");
    return;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
    effectsMaster = audioContext.createGain();
    musicMaster = audioContext.createGain();
    musicCompressor = audioContext.createDynamicsCompressor();
    musicCompressor.threshold.value = -19;
    musicCompressor.knee.value = 12;
    musicCompressor.ratio.value = 8;
    musicCompressor.attack.value = 0.006;
    musicCompressor.release.value = 0.24;
    effectsMaster.gain.value = 0.7;
    musicMaster.gain.value = 0.4;
    effectsMaster.connect(audioContext.destination);
    musicMaster.connect(musicCompressor);
    musicCompressor.connect(audioContext.destination);
  }

  if (audioContext.state === "suspended") void audioContext.resume();
  const { master, music, effects } = gameSettings.volumes;
  const effectsGain = soundEnabled && effectsEnabled ? 0.7 * (master / 100) * (effects / 100) : 0;
  const musicGain = soundEnabled && musicEnabled ? 0.4 * (master / 100) * (music / 100) : 0;
  effectsMaster.gain.setTargetAtTime(effectsGain, audioContext.currentTime, 0.04);
  musicMaster.gain.setTargetAtTime(musicGain, audioContext.currentTime, 0.04);
  updateMusicTimer();
}

const themeMusicUrl = "./assets/spooky-scary-skeletons.mp3";
let themeMusic;
let themeMusicSource;

function ensureThemeMusic() {
  if (!audioContext || !musicMaster) return;
  if (!themeMusic) {
    themeMusic = new Audio(themeMusicUrl);
    themeMusic.loop = true;
    themeMusic.preload = "auto";
    themeMusicSource = audioContext.createMediaElementSource(themeMusic);
    themeMusicSource.connect(musicMaster);
  }
  if (!gameActive && soundEnabled && musicEnabled) {
    const playback = themeMusic.play();
    if (playback) playback.catch(() => {});
  } else {
    themeMusic.pause();
  }
}

const waveMusicUrl = "./assets/magnific-footsteps-in-the-dark.mp3";
let waveMusic;
let waveMusicSource;

function ensureWaveMusic() {
  if (!audioContext || !musicMaster) return;
  if (!waveMusic) {
    waveMusic = new Audio(waveMusicUrl);
    waveMusic.loop = true;
    waveMusic.preload = "auto";
    waveMusicSource = audioContext.createMediaElementSource(waveMusic);
    waveMusicSource.connect(musicMaster);
  }
  if (gameActive && soundEnabled && musicEnabled) {
    const playback = waveMusic.play();
    if (playback) playback.catch(() => {});
  } else {
    waveMusic.pause();
  }
}

function updateMusicTimer() {
  if (musicTimer) window.clearInterval(musicTimer);
  musicTimer = undefined;
  musicTimerTempo = 0;
  syncSoundtrack();
}

function playTone(frequency, duration, type = "sine", volume = 0.15, slide = 1, bus = "effects") {
  if (!audioContext) return;
  const destination = bus === "music" ? musicMaster : effectsMaster;
  if (!destination || !soundEnabled || (bus === "music" ? !musicEnabled : !effectsEnabled)) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, frequency * slide), now + duration);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + Math.min(0.025, duration / 4));
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  oscillator.connect(gain);
  gain.connect(destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function playMusicTone(frequency, duration, volume, type = "triangle") {
  if (!audioContext || !musicMaster || !musicEnabled) return;
  const now = audioContext.currentTime;
  const filter = audioContext.createBiquadFilter();
  const envelope = audioContext.createGain();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(type === "sawtooth" ? 1150 : 2300, now);
  filter.Q.setValueAtTime(0.8, now);
  envelope.gain.setValueAtTime(0.001, now);
  envelope.gain.linearRampToValueAtTime(volume, now + 0.035);
  envelope.gain.setTargetAtTime(volume * 0.72, now + 0.045, 0.14);
  envelope.gain.setTargetAtTime(0.001, now + Math.max(0.07, duration - 0.09), 0.045);
  filter.connect(envelope);
  envelope.connect(musicMaster);

  const oscillator = audioContext.createOscillator();
  const undertone = audioContext.createOscillator();
  const undertoneGain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  undertone.type = "triangle";
  undertone.frequency.setValueAtTime(frequency * 2, now);
  undertone.detune.setValueAtTime(-5, now);
  undertoneGain.gain.setValueAtTime(0.19, now);
  oscillator.connect(filter);
  undertone.connect(undertoneGain);
  undertoneGain.connect(filter);
  oscillator.start(now);
  undertone.start(now);
  oscillator.stop(now + duration);
  undertone.stop(now + duration);
}

function playMusicChord(frequencies, duration, volume) {
  if (!audioContext || !musicMaster || !musicEnabled) return;
  const now = audioContext.currentTime;
  const filter = audioContext.createBiquadFilter();
  const envelope = audioContext.createGain();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(520, now);
  filter.frequency.exponentialRampToValueAtTime(260, now + duration);
  envelope.gain.setValueAtTime(0.001, now);
  envelope.gain.linearRampToValueAtTime(volume, now + 0.18);
  envelope.gain.setTargetAtTime(0.001, now + duration * 0.68, Math.max(0.08, duration * 0.12));
  filter.connect(envelope);
  envelope.connect(musicMaster);

  for (const frequency of frequencies) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.detune.setValueAtTime(Math.random() * 8 - 4, now);
    oscillator.connect(filter);
    oscillator.start(now);
    oscillator.stop(now + duration);
  }
}

function playMusicBell(frequency, volume = 0.045) {
  if (!audioContext || !musicMaster || !musicEnabled) return;
  const now = audioContext.currentTime;
  const bell = audioContext.createOscillator();
  const shimmer = audioContext.createOscillator();
  const envelope = audioContext.createGain();
  bell.type = "sine";
  bell.frequency.setValueAtTime(frequency, now);
  shimmer.type = "sine";
  shimmer.frequency.setValueAtTime(frequency * 2.76, now);
  envelope.gain.setValueAtTime(0.001, now);
  envelope.gain.linearRampToValueAtTime(volume, now + 0.012);
  envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.62);
  bell.connect(envelope);
  shimmer.connect(envelope);
  envelope.connect(musicMaster);
  bell.start(now);
  shimmer.start(now);
  bell.stop(now + 0.62);
  shimmer.stop(now + 0.62);
}

function playMusicKick(volume = 0.11) {
  if (!audioContext || !musicMaster || !musicEnabled) return;
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const envelope = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(105, now);
  oscillator.frequency.exponentialRampToValueAtTime(42, now + 0.16);
  envelope.gain.setValueAtTime(volume, now);
  envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  oscillator.connect(envelope);
  envelope.connect(musicMaster);
  oscillator.start(now);
  oscillator.stop(now + 0.2);
}

function playMusicTick(volume = 0.014) {
  if (!audioContext || !musicMaster || !musicEnabled) return;
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const filter = audioContext.createBiquadFilter();
  const envelope = audioContext.createGain();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(2100, now);
  oscillator.frequency.exponentialRampToValueAtTime(750, now + 0.035);
  filter.type = "highpass";
  filter.frequency.value = 1200;
  envelope.gain.setValueAtTime(volume, now);
  envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
  oscillator.connect(filter);
  filter.connect(envelope);
  envelope.connect(musicMaster);
  oscillator.start(now);
  oscillator.stop(now + 0.05);
}

function playHauntedStinger() {
  if (!audioContext || !musicMaster || !musicEnabled) return;
  const now = audioContext.currentTime;
  const voice = audioContext.createOscillator();
  const undertone = audioContext.createOscillator();
  const ghostVoice = audioContext.createOscillator();
  const filter = audioContext.createBiquadFilter();
  const envelope = audioContext.createGain();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(920, now);
  filter.frequency.exponentialRampToValueAtTime(260, now + 1.8);
  filter.Q.setValueAtTime(3.2, now);
  voice.type = "sawtooth";
  voice.frequency.setValueAtTime(587.33, now);
  voice.frequency.exponentialRampToValueAtTime(146.83, now + 1.65);
  undertone.type = "sine";
  undertone.frequency.setValueAtTime(293.66, now);
  undertone.frequency.exponentialRampToValueAtTime(73.42, now + 1.8);
  ghostVoice.type = "triangle";
  ghostVoice.frequency.setValueAtTime(880, now);
  ghostVoice.frequency.exponentialRampToValueAtTime(110, now + 1.6);
  ghostVoice.detune.setValueAtTime(-18, now);
  envelope.gain.setValueAtTime(0.001, now);
  envelope.gain.linearRampToValueAtTime(0.065, now + 0.22);
  envelope.gain.setTargetAtTime(0.001, now + 1.15, 0.34);
  voice.connect(filter);
  undertone.connect(filter);
  ghostVoice.connect(filter);
  filter.connect(envelope);
  envelope.connect(musicMaster);
  voice.start(now);
  undertone.start(now);
  ghostVoice.start(now);
  voice.stop(now + 2);
  undertone.stop(now + 2);
  ghostVoice.stop(now + 2);
}

let waveAmbience;

function playAmbienceNoise(options) {
  playNoise({ ...options, bus: "music" });
}

function playAmbiencePitch(options) {
  playPitch({ ...options, bus: "music" });
}

function stopWaveAmbience() {
  if (!waveAmbience) return;
  window.clearInterval(waveAmbience.timer);
  for (const source of waveAmbience.sources) {
    try { source.stop(); } catch { /* déjà arrêté */ }
  }
  waveAmbience = undefined;
}

let ambienceStep = 0;

function playHorrorBones() {
  for (let index = 0; index < 8; index += 1) {
    playAmbienceNoise({
      type: "bandpass", frequency: 1600 + Math.random() * 1800, q: 10,
      duration: 0.035, volume: 0.16, delay: index * 0.06,
    });
  }
}

function playHorrorMoan(pitch, pitchEnd, duration = 1.1) {
  playAmbiencePitch({
    frequency: pitch, frequencyEnd: pitchEnd, duration, type: "sawtooth",
    volume: 0.07, attack: 0.12, vibrato: 0.045, vibratoRate: 4.5,
  });
  playAmbienceNoise({
    type: "bandpass", frequency: pitch * 3, frequencyEnd: pitchEnd * 2, q: 1.6,
    duration, volume: 0.08, attack: duration * 0.25,
  });
}

function playHorrorCrow() {
  playAmbiencePitch({ frequency: 860, frequencyEnd: 390, duration: 0.18, type: "square", volume: 0.08 });
  playAmbiencePitch({ frequency: 740, frequencyEnd: 340, duration: 0.2, type: "square", volume: 0.07, delay: 0.2 });
  playAmbienceNoise({ type: "bandpass", frequency: 1500, frequencyEnd: 600, q: 1.4, duration: 0.4, volume: 0.1 });
}

function playHorrorMusicBox() {
  const phrases = [
    [523.25, 493.88, 369.99],
    [622.25, 415.3, 311.13],
    [440, 466.16, 277.18],
  ];
  const phrase = phrases[ambienceStep % phrases.length];
  phrase.forEach((note, index) => {
    playAmbiencePitch({ frequency: note, duration: 0.5, volume: 0.08, delay: index * 0.32, attack: 0.008 });
    playAmbiencePitch({ frequency: note * 2.03, duration: 0.28, volume: 0.03, delay: index * 0.32 });
  });
}

function playHorrorLaugh() {
  for (let index = 0; index < 6; index += 1) {
    const pitch = 480 + (index % 2) * 90 - index * 22;
    playAmbiencePitch({
      frequency: pitch * 1.2, frequencyEnd: pitch, duration: 0.11, type: "triangle",
      volume: 0.1, delay: index * 0.13, attack: 0.008,
    });
    playAmbienceNoise({ type: "highpass", frequency: 2200, duration: 0.04, volume: 0.06, delay: index * 0.13 });
  }
}

function playHorrorThunder() {
  playAmbienceNoise({ type: "highpass", frequency: 2400, duration: 0.06, volume: 0.22 });
  playAmbienceNoise({ type: "lowpass", frequency: 280, frequencyEnd: 36, duration: 1.5, volume: 0.24, attack: 0.015 });
  playAmbiencePitch({ frequency: 58, frequencyEnd: 26, duration: 1.2, volume: 0.16, attack: 0.02 });
}

function playWaveAccent(wave) {
  const step = ambienceStep % 4;
  ambienceStep += 1;
  if (wave === 1) {
    if (step === 0) playHorrorMoan(130, 62, 1.25);
    else if (step === 1) playHorrorBones();
    else if (step === 2) {
      playAmbiencePitch({ frequency: 820, frequencyEnd: 480, duration: 0.5, volume: 0.07, vibrato: 0.04, vibratoRate: 7 });
      playAmbienceNoise({ type: "lowpass", frequency: 500, frequencyEnd: 90, duration: 0.7, volume: 0.1, attack: 0.08 });
    } else playHorrorMoan(90, 48, 1.4);
    return;
  }
  if (wave === 2) {
    if (step === 0 || step === 3) playHorrorCrow();
    else if (step === 1) {
      playAmbienceNoise({ type: "bandpass", frequency: 1200, frequencyEnd: 2800, q: 0.7, duration: 0.55, volume: 0.12, attack: 0.06 });
      playAmbienceNoise({ type: "highpass", frequency: 3400, duration: 0.08, volume: 0.08, delay: 0.12 });
      playAmbienceNoise({ type: "highpass", frequency: 2800, duration: 0.06, volume: 0.07, delay: 0.28 });
    } else {
      playAmbiencePitch({ frequency: 210, frequencyEnd: 80, duration: 0.9, type: "sine", volume: 0.08, attack: 0.2 });
      playAmbienceNoise({ type: "bandpass", frequency: 700, frequencyEnd: 180, q: 1.2, duration: 0.8, volume: 0.09, attack: 0.15 });
    }
    return;
  }
  if (wave === 3) {
    if (step === 0 || step === 2) playHorrorMusicBox();
    else if (step === 1) {
      playAmbienceNoise({ type: "bandpass", frequency: 2600, frequencyEnd: 700, q: 4, duration: 1.1, volume: 0.09, attack: 0.35 });
      playAmbiencePitch({ frequency: 180, frequencyEnd: 90, duration: 1, type: "triangle", volume: 0.05, attack: 0.3, vibrato: 0.03 });
    } else {
      playAmbiencePitch({ frequency: 196, frequencyEnd: 155, duration: 0.7, type: "sawtooth", volume: 0.05 });
      playAmbiencePitch({ frequency: 247, frequencyEnd: 185, duration: 0.7, type: "sawtooth", volume: 0.04, delay: 0.08 });
      playAmbienceNoise({ type: "lowpass", frequency: 400, frequencyEnd: 80, duration: 0.8, volume: 0.1 });
    }
    return;
  }
  if (wave === 4) {
    if (step === 0 || step === 2) playHorrorLaugh();
    else if (step === 1) {
      [1318, 1568, 2093, 1174].forEach((frequency, index) => {
        playAmbiencePitch({ frequency, duration: 0.28, volume: 0.07, delay: index * 0.11 });
      });
    } else {
      playAmbiencePitch({ frequency: 2400, frequencyEnd: 700, duration: 0.16, type: "square", volume: 0.05 });
      playAmbienceNoise({ type: "bandpass", frequency: 1800, q: 6, duration: 0.08, volume: 0.12, delay: 0.05 });
      playHorrorLaugh();
    }
    return;
  }
  if (step === 0) playHorrorThunder();
  else if (step === 1) {
    playAmbiencePitch({ frequency: 72, frequencyEnd: 38, duration: 0.12, volume: 0.2 });
    playAmbienceNoise({ type: "lowpass", frequency: 160, frequencyEnd: 50, duration: 0.1, volume: 0.16 });
    playAmbiencePitch({ frequency: 60, frequencyEnd: 32, duration: 0.16, volume: 0.16, delay: 0.24 });
  } else if (step === 2) {
    playHorrorMoan(98, 40, 1.6);
    playHorrorMoan(146, 55, 1.5);
  } else {
    playAmbienceNoise({ type: "bandpass", frequency: 1800, frequencyEnd: 400, q: 3, duration: 1.3, volume: 0.1, attack: 0.4 });
    playAmbiencePitch({ frequency: 42, frequencyEnd: 24, duration: 1.1, volume: 0.18, attack: 0.05 });
  }
}

function startWaveAmbience(wave) {
  stopWaveAmbience();
  if (!audioContext || !musicMaster) return;
  ambienceStep = 0;
  const gap = [2400, 1700, 2600, 1500, 3000][wave - 1] ?? 2000;
  const timer = window.setInterval(() => {
    if (!gameActive || !musicEnabled) return;
    playWaveAccent(wave);
  }, gap);
  waveAmbience = { wave, sources: [], timer };
  playWaveAccent(wave);
}

function soundtrackWave() {
  if (stage === "ultimate" || stage === "portal") return 5;
  if (stage === "boss-wave") return 4;
  return Math.min(3, Math.max(1, waveNumber));
}

function syncSoundtrack() {
  ensureThemeMusic();
  ensureWaveMusic();
  if (!gameActive || !soundEnabled || !musicEnabled || !audioContext) {
    stopWaveAmbience();
    if (!gameActive) {
      try { window.speechSynthesis?.cancel(); } catch { /* navigateur sans synthèse vocale */ }
    }
    return;
  }
  const wave = soundtrackWave();
  if (waveAmbience?.wave === wave) return;
  startWaveAmbience(wave);
}

function playMusicNote() {
  if (!musicEnabled || !audioContext) return;
  if (!gameActive && frontMenu.hidden) return;
  const beat = musicStep % 16;
  const notes = [293.66, null, 349.23, null, 311.13, null, 233.08, null, 293.66, null, 349.23, 392, 415.3, null, 311.13, null];
  const melody = notes[beat];
  const inBossRoom = stage === "ultimate";
  const transpose = inBossRoom ? 0.75 : waveNumber >= 4 ? 0.84 : waveNumber === 3 ? 0.9 : 1;
  const threat = bossAlive ? 1.2 : enemies.size > 8 ? 1.08 : 1;
  const urgency = playerHealth <= 30 ? 1.12 : 1;
  const volume = (gameActive ? 0.16 : 0.15) * threat * urgency;

  if (melody) {
    const noteLength = beat % 4 === 0 ? 0.42 : 0.29;
    const timbre = beat % 4 === 0 ? "triangle" : "sine";
    playMusicTone(melody * transpose, noteLength, volume, timbre);
  }

  if ([0, 4, 8, 12].includes(beat)) {
    const bassNotes = [73.42, 69.3, 65.41, 77.78];
    const bassFrequency = bassNotes[(Math.floor(beat / 4) + Math.max(0, waveNumber - 1)) % bassNotes.length];
    playMusicTone(bassFrequency * (inBossRoom ? 0.72 : 1), 0.66, 0.15 * threat, "sawtooth");
  }

  if ([0, 2, 8, 10].includes(beat)) {
    playMusicKick((beat === 0 || beat === 8 ? 0.18 : 0.12) * threat);
  } else if ([3, 7, 11, 15].includes(beat)) {
    playMusicTick(0.008);
  }

  if (beat === 0 || beat === 8) {
    const chord = inBossRoom
      ? [36.71, 55, 69.3, 73.42]
      : beat === 0 ? [55, 82.41, 110, 138.59] : [51.91, 77.78, 103.83, 130.81];
    playMusicChord(chord, 2.6, inBossRoom ? 0.055 : 0.042);
  }

  if (beat === 6 || beat === 14) {
    const bell = beat === 6 ? 622.25 : 587.33;
    playMusicBell(bell * transpose, beat === 14 ? 0.078 : 0.062);
  }
  if (beat === 7 || beat === 15) {
    playMusicBell((beat === 7 ? 466.16 : 415.3) * transpose, 0.036);
  }
  if (beat === 15) playHauntedStinger();
  if (inBossRoom && (beat === 0 || beat === 8)) {
    playMusicTone(36.71, 0.72, 0.12, "sawtooth");
  }
  musicStep += 1;
}

let noiseBuffer;
const driveCurves = new Map();

function canPlayEffects() {
  return Boolean(audioContext && effectsMaster && soundEnabled && effectsEnabled);
}

function getNoiseBuffer() {
  if (noiseBuffer) return noiseBuffer;
  const length = audioContext.sampleRate * 2;
  noiseBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let index = 0; index < length; index += 1) data[index] = Math.random() * 2 - 1;
  return noiseBuffer;
}

function getDriveCurve(amount) {
  const key = Math.round(amount * 20);
  if (driveCurves.has(key)) return driveCurves.get(key);
  const curve = new Float32Array(1024);
  const k = 2 + key * 4;
  for (let index = 0; index < curve.length; index += 1) {
    const x = (index / (curve.length - 1)) * 2 - 1;
    curve[index] = ((1 + k) * x) / (1 + k * Math.abs(x));
  }
  driveCurves.set(key, curve);
  return curve;
}

// Souffle, détonation, crépitement : un bruit blanc filtré dont la fréquence glisse.
function playNoise({
  duration = 0.2, volume = 0.2, type = "bandpass", frequency = 1000, frequencyEnd = frequency,
  q = 1, attack = 0.004, delay = 0, bus = "effects",
} = {}) {
  const destination = bus === "music" ? musicMaster : effectsMaster;
  if (bus === "music") {
    if (!audioContext || !musicMaster || !soundEnabled || !musicEnabled) return;
  } else if (!canPlayEffects()) return;
  const start = audioContext.currentTime + delay;
  const source = audioContext.createBufferSource();
  source.buffer = getNoiseBuffer();
  const filter = audioContext.createBiquadFilter();
  filter.type = type;
  filter.frequency.setValueAtTime(frequency, start);
  filter.frequency.exponentialRampToValueAtTime(Math.max(20, frequencyEnd), start + duration);
  filter.Q.value = q;
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(volume, start + Math.min(attack, duration / 2));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  source.start(start, Math.random() * 1.4, duration + 0.05);
}

function playPitch({
  frequency, frequencyEnd = frequency, duration = 0.2, type = "sine", volume = 0.15, delay = 0,
  attack = 0.005, vibrato = 0, vibratoRate = 6, bus = "effects",
}) {
  const destination = bus === "music" ? musicMaster : effectsMaster;
  if (bus === "music") {
    if (!audioContext || !musicMaster || !soundEnabled || !musicEnabled) return;
  } else if (!canPlayEffects()) return;
  const start = audioContext.currentTime + delay;
  const oscillator = audioContext.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, frequencyEnd), start + duration);
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(volume, start + Math.min(attack, duration / 2));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(destination);
  if (vibrato > 0) {
    const lfo = audioContext.createOscillator();
    const depth = audioContext.createGain();
    lfo.frequency.value = vibratoRate;
    depth.gain.value = frequency * vibrato;
    lfo.connect(depth);
    depth.connect(oscillator.frequency);
    lfo.start(start);
    lfo.stop(start + duration + 0.05);
  }
  oscillator.start(start);
  oscillator.stop(start + duration + 0.05);
}

const vowelFormants = {
  a: [[800, 7], [1150, 9], [2500, 12]],
  e: [[420, 6], [1950, 10], [2550, 12]],
  i: [[300, 7], [2250, 12], [3000, 14]],
  o: [[450, 6], [800, 8], [2830, 12]],
  u: [[330, 6], [700, 8], [2500, 12]],
};

// Voix de créature : une corde vocale (dent de scie) passée dans les formants d'une voyelle,
// avec vibrato, raclement de gorge (modulation d'amplitude) et saturation.
function playVoice({
  pitch, pitchEnd = pitch, duration = 0.5, volume = 0.2, vowel = "a", vibrato = 0, vibratoRate = 6,
  growl = 0, growlRate = 40, drive = 0, delay = 0, attack = 0.04,
}) {
  if (!canPlayEffects()) return;
  const start = audioContext.currentTime + delay;
  const end = start + duration;
  const oscillator = audioContext.createOscillator();
  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(pitch, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, pitchEnd), end);
  const nodes = [oscillator];
  if (vibrato > 0) {
    const lfo = audioContext.createOscillator();
    const depth = audioContext.createGain();
    lfo.frequency.value = vibratoRate;
    depth.gain.value = pitch * vibrato;
    lfo.connect(depth);
    depth.connect(oscillator.frequency);
    nodes.push(lfo);
  }
  let source = oscillator;
  if (drive > 0) {
    const shaper = audioContext.createWaveShaper();
    shaper.curve = getDriveCurve(drive);
    oscillator.connect(shaper);
    source = shaper;
  }
  const mix = audioContext.createGain();
  mix.gain.value = 1;
  for (const [frequency, q] of vowelFormants[vowel] ?? vowelFormants.a) {
    const formant = audioContext.createBiquadFilter();
    formant.type = "bandpass";
    formant.frequency.value = frequency;
    formant.Q.value = q;
    const formantGain = audioContext.createGain();
    formantGain.gain.value = 2.6;
    source.connect(formant);
    formant.connect(formantGain);
    formantGain.connect(mix);
  }
  const body = audioContext.createBiquadFilter();
  body.type = "lowpass";
  body.frequency.value = 520;
  const bodyGain = audioContext.createGain();
  bodyGain.gain.value = 0.35;
  source.connect(body);
  body.connect(bodyGain);
  bodyGain.connect(mix);

  const amp = audioContext.createGain();
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.linearRampToValueAtTime(volume, start + Math.min(attack, duration / 3));
  amp.gain.setValueAtTime(volume, start + duration * 0.6);
  amp.gain.exponentialRampToValueAtTime(0.0001, end);
  mix.connect(amp);
  if (growl > 0) {
    const roughness = audioContext.createGain();
    roughness.gain.value = 1 - growl * 0.5;
    const growlLfo = audioContext.createOscillator();
    growlLfo.type = "square";
    growlLfo.frequency.value = growlRate;
    const growlDepth = audioContext.createGain();
    growlDepth.gain.value = growl * 0.5;
    growlLfo.connect(growlDepth);
    growlDepth.connect(roughness.gain);
    amp.connect(roughness);
    roughness.connect(effectsMaster);
    nodes.push(growlLfo);
  } else {
    amp.connect(effectsMaster);
  }
  for (const node of nodes) {
    node.start(start);
    node.stop(end + 0.05);
  }
}

// Chaque créature a sa propre voix ; l'humeur (apparition, attaque, mort) module la hauteur et la durée.
const creatureVoices = {
  "fossoyeur-maudit": { pitch: 88, vowel: "o", duration: 1.15, volume: 0.34, growl: 0.65, growlRate: 31, drive: 0.5, extra: "dirt" },
  "epouvantail-automne": { pitch: 205, vowel: "a", duration: 1, volume: 0.28, growl: 0.5, growlRate: 23, drive: 0.35, vibrato: 0.04, extra: "straw" },
  "maitre-des-cauchemars": { pitch: 68, vowel: "u", duration: 1.4, volume: 0.32, growl: 0.4, growlRate: 47, drive: 0.6, layers: [1.5, 0.5], extra: "whisper" },
  "bouffon-frondeur": { pitch: 340, vowel: "a", duration: 0.95, volume: 0.27, laugh: 6, vibrato: 0.03, extra: "bells" },
  "mega-cauchemar": { pitch: 52, vowel: "o", duration: 1.7, volume: 0.38, growl: 0.7, growlRate: 28, drive: 0.85, layers: [1.5, 2.02], extra: "roar" },
  gardien: { pitch: 120, vowel: "o", duration: 0.9, volume: 0.3, growl: 0.4, growlRate: 36, drive: 0.4 },
  chasseur: { pitch: 260, vowel: "i", duration: 0.7, volume: 0.26, growl: 0.3, growlRate: 44, vibrato: 0.05 },
  colosse: { pitch: 62, vowel: "u", duration: 1.2, volume: 0.34, growl: 0.6, growlRate: 26, drive: 0.7 },
  grunt: { pitch: 175, vowel: "u", duration: 0.32, volume: 0.16, growl: 0.3, growlRate: 38 },
  scout: { pitch: 620, vowel: "i", duration: 0.26, volume: 0.13, vibrato: 0.08, vibratoRate: 18 },
  brute: { pitch: 105, vowel: "o", duration: 0.5, volume: 0.2, growl: 0.5, growlRate: 30, drive: 0.4 },
  "serviteur-squelette": { pitch: 250, vowel: "o", duration: 0.55, volume: 0.15, vibrato: 0.06, vibratoRate: 5, extra: "bones" },
  "gargouille-epineuse": { pitch: 470, vowel: "i", duration: 0.5, volume: 0.17, growl: 0.45, growlRate: 52, drive: 0.5, extra: "stone" },
  "ombre-rampante": { pitch: 520, vowel: "u", duration: 0.75, volume: 0.12, vibrato: 0.09, vibratoRate: 4, extra: "hiss" },
  "petit-bouffon-frondeur": { pitch: 540, vowel: "i", duration: 0.45, volume: 0.15, laugh: 3, extra: "bells" },
  "archer-de-lombre": { pitch: 210, vowel: "e", duration: 0.35, volume: 0.15, growl: 0.25, growlRate: 40, extra: "hiss" },
  "soldat-de-lombre": { pitch: 140, vowel: "a", duration: 0.48, volume: 0.19, growl: 0.45, growlRate: 34, drive: 0.4, extra: "armor" },
  "goule-de-lombre": { pitch: 165, vowel: "e", duration: 0.55, volume: 0.18, growl: 0.7, growlRate: 55, drive: 0.55, extra: "wet" },
};
const crySoundTimes = new Map();

function playCreatureExtra(extra, duration, volume) {
  if (extra === "dirt") {
    playNoise({ type: "lowpass", frequency: 500, frequencyEnd: 120, duration: duration * 0.8, volume: volume * 0.6, attack: 0.1 });
  } else if (extra === "straw") {
    for (let index = 0; index < 6; index += 1) {
      playNoise({ type: "highpass", frequency: 3200, duration: 0.07, volume: volume * 0.35, delay: index * duration / 7 });
    }
  } else if (extra === "whisper") {
    playNoise({ type: "bandpass", frequency: 2600, frequencyEnd: 900, q: 4, duration, volume: volume * 0.5, attack: duration * 0.4 });
  } else if (extra === "bells") {
    for (let index = 0; index < 3; index += 1) {
      playPitch({ frequency: 1760 + index * 330, duration: 0.35, volume: volume * 0.2, delay: index * 0.09 });
    }
  } else if (extra === "roar") {
    playNoise({ type: "lowpass", frequency: 900, frequencyEnd: 180, duration, volume: volume * 0.75, attack: 0.15 });
    playPitch({ frequency: 46, frequencyEnd: 30, duration, volume: volume * 0.8, attack: 0.1 });
  } else if (extra === "bones") {
    for (let index = 0; index < 7; index += 1) {
      playNoise({ type: "bandpass", frequency: 2200 + Math.random() * 1600, q: 8, duration: 0.03, volume: volume * 1.4, delay: index * 0.055 });
    }
  } else if (extra === "stone") {
    playNoise({ type: "bandpass", frequency: 400, frequencyEnd: 220, q: 2, duration: duration * 0.9, volume: volume * 0.8, attack: 0.05 });
  } else if (extra === "hiss") {
    playNoise({ type: "highpass", frequency: 4200, frequencyEnd: 2600, duration: duration * 0.9, volume: volume * 0.55, attack: duration * 0.3 });
  } else if (extra === "armor") {
    playNoise({ type: "bandpass", frequency: 3400, q: 6, duration: 0.12, volume: volume * 0.8 });
    playNoise({ type: "bandpass", frequency: 2600, q: 6, duration: 0.1, volume: volume * 0.6, delay: 0.09 });
  } else if (extra === "wet") {
    playNoise({ type: "lowpass", frequency: 700, frequencyEnd: 260, q: 3, duration: duration * 0.8, volume: volume * 0.7 });
  }
}

function playCreatureCry(name, mood = "spawn") {
  const voice = creatureVoices[name];
  if (!voice || !canPlayEffects()) return;
  const isBoss = voice.duration >= 0.9;
  const now = audioContext.currentTime;
  const throttleKey = isBoss ? `${name}|${mood}` : `minion|${mood}`;
  const minimumGap = isBoss ? 0.7 : mood === "attack" ? 0.45 : 0.3;
  if (now - (crySoundTimes.get(throttleKey) ?? -10) < minimumGap) return;
  if (!isBoss && mood === "attack" && Math.random() > 0.45) return;
  crySoundTimes.set(throttleKey, now);

  const variation = 0.92 + Math.random() * 0.16;
  const settingsByMood = {
    spawn: { start: 1.12, end: 0.82, length: 1, loudness: 1, vibrato: 1 },
    attack: { start: 1.25, end: 1.02, length: 0.5, loudness: 0.85, vibrato: 0.6 },
    death: { start: 1.05, end: 0.42, length: 1.25, loudness: 1, vibrato: 2.2 },
  };
  const shape = settingsByMood[mood] ?? settingsByMood.spawn;
  const pitch = voice.pitch * variation;
  const duration = voice.duration * shape.length;
  const volume = voice.volume * shape.loudness;
  const base = {
    vowel: mood === "death" && voice.vowel === "i" ? "e" : voice.vowel,
    vibrato: (voice.vibrato ?? 0.015) * shape.vibrato,
    vibratoRate: voice.vibratoRate ?? 6,
    growl: voice.growl ?? 0,
    growlRate: voice.growlRate ?? 40,
    drive: voice.drive ?? 0,
  };
  if (voice.laugh) {
    const syllables = mood === "attack" ? Math.ceil(voice.laugh / 2) : voice.laugh;
    const step = duration / syllables;
    for (let index = 0; index < syllables; index += 1) {
      const fall = mood === "death" ? 1 - index / syllables * 0.55 : 1 - index * 0.04;
      playVoice({ ...base, pitch: pitch * 1.18 * fall, pitchEnd: pitch * fall, duration: step * 0.8, volume, delay: index * step, attack: 0.01 });
      playNoise({ type: "highpass", frequency: 2500, duration: 0.04, volume: volume * 0.25, delay: index * step });
    }
  } else {
    playVoice({ ...base, pitch: pitch * shape.start, pitchEnd: pitch * shape.end, duration, volume });
    for (const ratio of voice.layers ?? []) {
      playVoice({ ...base, pitch: pitch * shape.start * ratio, pitchEnd: pitch * shape.end * ratio, duration, volume: volume * 0.45, drive: base.drive * 0.6 });
    }
  }
  if (voice.extra) playCreatureExtra(voice.extra, duration, volume);
}

// Armes à feu : claquement supersonique, détonation grave, souffle des gaz puis écho de la scène.
const gunSounds = {
  "pistolet-silex": { crack: 2600, body: 650, thump: 95, tail: 0.75, volume: 0.42, flint: true },
  "revolver-sherif": { crack: 3600, body: 900, thump: 120, tail: 0.5, volume: 0.4, hammer: true },
  "pistolet-citrouille": { crack: 3000, body: 760, thump: 105, tail: 0.45, volume: 0.36, fire: true, double: true },
  "pistolet-spectral": { crack: 2200, body: 520, thump: 85, tail: 0.6, volume: 0.3, ghost: true },
  "canon-roi-ombres": { crack: 1700, body: 380, thump: 62, tail: 1, volume: 0.46, shadow: true, double: true },
  "tromblon-pirate": { crack: 1500, body: 420, thump: 70, tail: 1.1, volume: 0.48, flint: true, scatter: true },
  "fusil-precision": { crack: 4200, body: 1100, thump: 80, tail: 1.4, volume: 0.46, bolt: true },
  "pistolet-givre": { crack: 3800, body: 1200, thump: 140, tail: 0.4, volume: 0.3, frost: true },
  "baguette-foudre": { crack: 2400, body: 900, thump: 60, tail: 0.5, volume: 0.22, zap: true },
  "blaster-neon": { crack: 2000, body: 1400, thump: 180, tail: 0.25, volume: 0.2, laser: true },
};

function playGunshot(weaponId) {
  const gun = gunSounds[weaponId];
  if (!gun || !canPlayEffects()) return;
  const fire = (delay, scale) => {
    playNoise({ type: "highpass", frequency: gun.crack, duration: 0.05, volume: gun.volume * scale, delay });
    playNoise({ type: "lowpass", frequency: gun.body * 1.6, frequencyEnd: gun.body * 0.3, duration: 0.2, volume: gun.volume * 0.9 * scale, delay });
    playPitch({ frequency: gun.thump, frequencyEnd: gun.thump * 0.4, duration: 0.14, volume: gun.volume * 0.9 * scale, delay });
    playNoise({ type: "lowpass", frequency: 700, frequencyEnd: 160, duration: gun.tail, volume: gun.volume * 0.22 * scale, attack: 0.03, delay: delay + 0.02 });
  };
  let delay = 0;
  if (gun.flint) {
    playNoise({ type: "bandpass", frequency: 4200, q: 3, duration: 0.025, volume: 0.25 });
    playNoise({ type: "highpass", frequency: 5200, duration: 0.06, volume: 0.12, delay: 0.01 });
    delay = 0.045;
  }
  fire(delay, 1);
  if (gun.double) fire(delay + 0.07, 0.75);
  if (gun.hammer) playNoise({ type: "bandpass", frequency: 3000, q: 10, duration: 0.02, volume: 0.2, delay: 0.2 });
  if (gun.fire) playNoise({ type: "bandpass", frequency: 900, frequencyEnd: 400, q: 1.2, duration: 0.3, volume: 0.15, attack: 0.03 });
  if (gun.ghost) {
    playPitch({ frequency: 980, frequencyEnd: 420, duration: 0.45, volume: 0.09, vibrato: 0.04, vibratoRate: 9, attack: 0.02 });
    playNoise({ type: "bandpass", frequency: 1800, frequencyEnd: 700, q: 5, duration: 0.4, volume: 0.1, attack: 0.15 });
  }
  if (gun.shadow) playPitch({ frequency: 44, frequencyEnd: 28, duration: 0.6, volume: 0.32 });
  if (gun.scatter) {
    for (let index = 0; index < 6; index += 1) {
      playNoise({ type: "bandpass", frequency: 1800 + Math.random() * 2400, q: 6, duration: 0.03, volume: 0.08, delay: 0.12 + Math.random() * 0.25 });
    }
  }
  if (gun.bolt) {
    playNoise({ type: "bandpass", frequency: 2400, q: 8, duration: 0.04, volume: 0.16, delay: 0.42 });
    playNoise({ type: "bandpass", frequency: 1700, q: 8, duration: 0.05, volume: 0.14, delay: 0.55 });
  }
  if (gun.frost) {
    playNoise({ type: "highpass", frequency: 5200, frequencyEnd: 3000, duration: 0.3, volume: 0.1, attack: 0.02 });
    playPitch({ frequency: 3100, frequencyEnd: 2600, duration: 0.2, volume: 0.04, delay: 0.03 });
  }
  if (gun.zap) {
    playPitch({ frequency: 90, duration: 0.25, type: "sawtooth", volume: 0.08, vibrato: 0.3, vibratoRate: 45 });
    playNoise({ type: "highpass", frequency: 3500, duration: 0.12, volume: 0.14, delay: 0.02 });
  }
  if (gun.laser) {
    playPitch({ frequency: 1800, frequencyEnd: 260, duration: 0.16, type: "square", volume: 0.06 });
    playPitch({ frequency: 2400, frequencyEnd: 400, duration: 0.12, type: "sawtooth", volume: 0.03 });
  }
  if (!gun.hammer && !gun.flint && !gun.laser && !gun.zap) {
    playPitch({ frequency: 4200, frequencyEnd: 3900, duration: 0.06, volume: 0.04, delay: 0.28 });
    playPitch({ frequency: 5100, frequencyEnd: 4800, duration: 0.05, volume: 0.03, delay: 0.36 });
  }
}

// Épées : sifflement de la lame qui fend l'air, plus la signature de chaque lame.
const bladeSounds = {
  "epee-rouillee": { low: 320, high: 1500, length: 0.26, volume: 0.24, extra: "rust" },
  "epee-chevalier": { low: 420, high: 2400, length: 0.24, volume: 0.24, extra: "ring" },
  "coutelas-fantome": { low: 700, high: 3200, length: 0.17, volume: 0.2, extra: "ghost" },
  "lame-braise": { low: 300, high: 1800, length: 0.3, volume: 0.26, extra: "fire" },
  "epee-lune-sanglante": { low: 260, high: 2000, length: 0.34, volume: 0.28, extra: "moon" },
  "hache-bucheron": { low: 200, high: 1100, length: 0.34, volume: 0.28, extra: "heavy" },
  "lance-centurion": { low: 500, high: 2600, length: 0.2, volume: 0.22, extra: "thrust" },
  "marteau-guerre": { low: 140, high: 800, length: 0.42, volume: 0.3, extra: "heavy" },
  "dague-assassin": { low: 900, high: 4200, length: 0.12, volume: 0.16, extra: "venom" },
  "katana-ombre": { low: 600, high: 3800, length: 0.18, volume: 0.22, extra: "ring" },
};

function playBladeSwing(weaponId) {
  const blade = bladeSounds[weaponId] ?? bladeSounds["epee-rouillee"];
  if (!canPlayEffects()) return;
  playNoise({ type: "bandpass", frequency: blade.low, frequencyEnd: blade.high, q: 2.4, duration: blade.length * 0.55, volume: blade.volume, attack: blade.length * 0.35 });
  playNoise({ type: "bandpass", frequency: blade.high, frequencyEnd: blade.low, q: 2.4, duration: blade.length * 0.5, volume: blade.volume * 0.7, delay: blade.length * 0.45 });
  if (blade.extra === "ring") {
    playPitch({ frequency: 2350, duration: 0.5, volume: 0.035, delay: 0.05 });
    playPitch({ frequency: 3520, duration: 0.4, volume: 0.025, delay: 0.05 });
  } else if (blade.extra === "rust") {
    playNoise({ type: "bandpass", frequency: 1200, q: 6, duration: 0.08, volume: 0.07, delay: 0.1 });
  } else if (blade.extra === "ghost") {
    playPitch({ frequency: 1400, frequencyEnd: 700, duration: 0.3, volume: 0.05, vibrato: 0.05, vibratoRate: 11 });
  } else if (blade.extra === "fire") {
    playNoise({ type: "lowpass", frequency: 1300, frequencyEnd: 300, duration: 0.42, volume: 0.16, attack: 0.05 });
    for (let index = 0; index < 4; index += 1) {
      playNoise({ type: "highpass", frequency: 3000, duration: 0.02, volume: 0.09, delay: 0.08 + Math.random() * 0.3 });
    }
  } else if (blade.extra === "heavy") {
    playNoise({ type: "lowpass", frequency: 500, frequencyEnd: 160, duration: blade.length, volume: 0.14, attack: blade.length * 0.4 });
  } else if (blade.extra === "thrust") {
    playNoise({ type: "highpass", frequency: 2500, frequencyEnd: 4500, duration: 0.12, volume: 0.1, attack: 0.03 });
  } else if (blade.extra === "venom") {
    playNoise({ type: "highpass", frequency: 4000, frequencyEnd: 2200, duration: 0.18, volume: 0.06, attack: 0.04, delay: 0.05 });
  } else if (blade.extra === "moon") {
    playVoice({ pitch: 220, duration: 0.5, volume: 0.06, vowel: "a", vibrato: 0.02, attack: 0.1 });
    playVoice({ pitch: 330, duration: 0.5, volume: 0.04, vowel: "o", vibrato: 0.02, attack: 0.1 });
    playPitch({ frequency: 70, frequencyEnd: 45, duration: 0.3, volume: 0.15 });
  }
}

function playBladeHit(weaponId) {
  if (!canPlayEffects()) return;
  playNoise({ type: "lowpass", frequency: 600, frequencyEnd: 150, duration: 0.1, volume: 0.22 });
  playPitch({ frequency: 140, frequencyEnd: 70, duration: 0.08, volume: 0.15 });
  if (weaponId === "epee-chevalier" || weaponId === "epee-rouillee" || weaponId === "katana-ombre") {
    playNoise({ type: "bandpass", frequency: 2800, q: 9, duration: 0.05, volume: 0.08 });
  }
  if (weaponId === "marteau-guerre" || weaponId === "hache-bucheron") {
    playPitch({ frequency: 70, frequencyEnd: 34, duration: 0.25, volume: 0.28 });
    playNoise({ type: "lowpass", frequency: 400, frequencyEnd: 90, duration: 0.3, volume: 0.25 });
  }
}

function playPowerSound(effect) {
  if (!canPlayEffects()) return;
  if (effect !== "bone-hit" && effect !== "wolf-bite" && effect !== "meteor-impact") {
    playNoise({ type: "bandpass", frequency: 280, frequencyEnd: 1600, q: 1.2, duration: 0.16, volume: 0.2, attack: 0.008 });
  }
  if (effect === "ice") {
    playNoise({ type: "highpass", frequency: 5000, frequencyEnd: 2500, duration: 0.6, volume: 0.16, attack: 0.02 });
    for (let index = 0; index < 8; index += 1) {
      playPitch({ frequency: 2000 + Math.random() * 3000, duration: 0.18, volume: 0.05, delay: index * 0.05 });
      playNoise({ type: "bandpass", frequency: 3500 + Math.random() * 2500, q: 10, duration: 0.03, volume: 0.12, delay: 0.1 + index * 0.06 });
    }
    playNoise({ type: "lowpass", frequency: 400, frequencyEnd: 120, duration: 0.5, volume: 0.15 });
  } else if (effect === "bats") {
    for (let index = 0; index < 10; index += 1) {
      playNoise({ type: "bandpass", frequency: 500 + Math.random() * 300, q: 3, duration: 0.05, volume: 0.12, delay: index * 0.035 });
      if (index % 3 === 0) playPitch({ frequency: 6200, frequencyEnd: 5200, duration: 0.05, volume: 0.04, delay: index * 0.035 });
    }
  } else if (effect === "pumpkin" || effect === "meteor-impact") {
    playNoise({ type: "lowpass", frequency: 1500, frequencyEnd: 90, duration: 0.9, volume: 0.42, attack: 0.005 });
    playPitch({ frequency: 90, frequencyEnd: 30, duration: 0.6, volume: 0.4 });
    playNoise({ type: "highpass", frequency: 2500, duration: 0.08, volume: 0.25 });
    for (let index = 0; index < 6; index += 1) {
      playNoise({ type: "bandpass", frequency: 1500 + Math.random() * 1500, q: 4, duration: 0.04, volume: 0.07, delay: 0.25 + Math.random() * 0.5 });
    }
  } else if (effect === "veil") {
    playPitch({ frequency: 660, frequencyEnd: 990, duration: 0.6, volume: 0.1, vibrato: 0.02, attack: 0.15 });
    playPitch({ frequency: 440, frequencyEnd: 330, duration: 0.7, volume: 0.08, attack: 0.2 });
    playNoise({ type: "bandpass", frequency: 1200, frequencyEnd: 3600, q: 3, duration: 0.6, volume: 0.1, attack: 0.3 });
  } else if (effect === "fire") {
    playNoise({ type: "lowpass", frequency: 300, frequencyEnd: 2200, duration: 0.25, volume: 0.3, attack: 0.18 });
    playNoise({ type: "lowpass", frequency: 1800, frequencyEnd: 250, duration: 0.9, volume: 0.28, delay: 0.2 });
    for (let index = 0; index < 10; index += 1) {
      playNoise({ type: "highpass", frequency: 2600, duration: 0.02, volume: 0.1, delay: 0.25 + Math.random() * 0.8 });
    }
  } else if (effect === "lightning") {
    playNoise({ type: "highpass", frequency: 1800, duration: 0.12, volume: 0.42 });
    playPitch({ frequency: 62, duration: 0.5, type: "sawtooth", volume: 0.1, vibrato: 0.3, vibratoRate: 50 });
    playNoise({ type: "lowpass", frequency: 500, frequencyEnd: 60, duration: 1.6, volume: 0.32, attack: 0.08, delay: 0.12 });
    for (let index = 0; index < 5; index += 1) {
      playNoise({ type: "highpass", frequency: 3000, duration: 0.03, volume: 0.22, delay: 0.04 + index * 0.06 });
    }
  } else if (effect === "vortex") {
    playNoise({ type: "bandpass", frequency: 200, frequencyEnd: 1800, q: 2, duration: 1.6, volume: 0.22, attack: 1.1 });
    playPitch({ frequency: 55, frequencyEnd: 110, duration: 1.7, type: "sawtooth", volume: 0.08, attack: 0.6 });
    playPitch({ frequency: 70, frequencyEnd: 28, duration: 0.7, volume: 0.35, delay: 1.7 });
    playNoise({ type: "lowpass", frequency: 1200, frequencyEnd: 80, duration: 0.8, volume: 0.32, delay: 1.7 });
  } else if (effect === "poison") {
    playNoise({ type: "highpass", frequency: 2600, frequencyEnd: 1500, duration: 0.9, volume: 0.12, attack: 0.1 });
    for (let index = 0; index < 14; index += 1) {
      const pitch = 180 + Math.random() * 420;
      playPitch({ frequency: pitch, frequencyEnd: pitch * 2.2, duration: 0.06, volume: 0.07, delay: index * 0.07 + Math.random() * 0.04 });
    }
  } else if (effect === "quake") {
    playPitch({ frequency: 48, frequencyEnd: 26, duration: 1.2, volume: 0.45, attack: 0.02 });
    playNoise({ type: "lowpass", frequency: 260, frequencyEnd: 50, duration: 1.4, volume: 0.45, attack: 0.02 });
    playNoise({ type: "bandpass", frequency: 900, q: 1.5, duration: 0.18, volume: 0.3 });
    for (let index = 0; index < 8; index += 1) {
      playNoise({ type: "bandpass", frequency: 600 + Math.random() * 900, q: 3, duration: 0.06, volume: 0.1, delay: 0.2 + Math.random() * 0.9 });
    }
  } else if (effect === "vampire") {
    playPitch({ frequency: 62, frequencyEnd: 45, duration: 0.14, volume: 0.4 });
    playPitch({ frequency: 58, frequencyEnd: 42, duration: 0.14, volume: 0.32, delay: 0.22 });
    playVoice({ pitch: 196, pitchEnd: 147, duration: 0.9, volume: 0.06, vowel: "u", vibrato: 0.03, attack: 0.3, delay: 0.1 });
    playNoise({ type: "bandpass", frequency: 500, frequencyEnd: 1500, q: 3, duration: 0.6, volume: 0.12, attack: 0.3, delay: 0.2 });
  } else if (effect === "meteor") {
    for (let index = 0; index < 3; index += 1) {
      playNoise({ type: "bandpass", frequency: 3000, frequencyEnd: 400, q: 1.5, duration: 0.45, volume: 0.12, attack: 0.1, delay: index * 0.17 });
    }
  } else if (effect === "holy") {
    [523, 659, 784, 1046].forEach((frequency, index) => {
      playPitch({ frequency, duration: 1.1, volume: 0.05, attack: 0.15, delay: index * 0.07, vibrato: 0.01 });
    });
    playVoice({ pitch: 392, duration: 1.1, volume: 0.05, vowel: "a", attack: 0.3, vibrato: 0.015 });
    playNoise({ type: "highpass", frequency: 3000, frequencyEnd: 6000, duration: 0.9, volume: 0.08, attack: 0.4 });
  } else if (effect === "boneshield") {
    for (let index = 0; index < 10; index += 1) {
      playNoise({ type: "bandpass", frequency: 1800 + Math.random() * 1800, q: 8, duration: 0.03, volume: 0.16, delay: index * 0.04 });
    }
    playPitch({ frequency: 110, frequencyEnd: 70, duration: 0.4, volume: 0.15 });
  } else if (effect === "bone-hit" || effect === "wolf-bite") {
    const now = audioContext.currentTime;
    if (now - (powerHitSoundTimes.get(effect) ?? -10) < 0.18) return;
    powerHitSoundTimes.set(effect, now);
    if (effect === "bone-hit") {
      playNoise({ type: "bandpass", frequency: 2600, q: 7, duration: 0.04, volume: 0.12 });
    } else {
      playVoice({ pitch: 180, pitchEnd: 120, duration: 0.18, volume: 0.07, vowel: "a", growl: 0.6, growlRate: 50, drive: 0.4 });
      playNoise({ type: "bandpass", frequency: 1500, q: 4, duration: 0.05, volume: 0.12, delay: 0.05 });
    }
  } else if (effect === "tornado") {
    playNoise({ type: "bandpass", frequency: 300, frequencyEnd: 900, q: 1.2, duration: 2.4, volume: 0.2, attack: 0.5 });
    playNoise({ type: "highpass", frequency: 1500, frequencyEnd: 3200, duration: 2.2, volume: 0.07, attack: 0.8 });
  } else if (effect === "wolves") {
    playVoice({ pitch: 330, pitchEnd: 520, duration: 1.3, volume: 0.08, vowel: "u", vibrato: 0.02, attack: 0.25 });
    playVoice({ pitch: 280, pitchEnd: 440, duration: 1.2, volume: 0.05, vowel: "o", vibrato: 0.03, attack: 0.3, delay: 0.25 });
  } else if (effect === "timestop") {
    playPitch({ frequency: 880, frequencyEnd: 110, duration: 0.9, volume: 0.1, attack: 0.02 });
    for (let index = 0; index < 6; index += 1) {
      playNoise({ type: "bandpass", frequency: 3200, q: 12, duration: 0.03, volume: 0.14, delay: 0.2 + index * 0.33 });
    }
    playNoise({ type: "lowpass", frequency: 800, frequencyEnd: 120, duration: 1.2, volume: 0.15, attack: 0.05 });
  }
}
const powerHitSoundTimes = new Map();

const specialShotSounds = {
  fronde: () => {
    playPitch({ frequency: 180, frequencyEnd: 90, duration: 0.08, volume: 0.16 });
    playNoise({ type: "bandpass", frequency: 420, frequencyEnd: 1800, q: 2, duration: 0.12, volume: 0.22, attack: 0.02 });
    playNoise({ type: "highpass", frequency: 2400, duration: 0.04, volume: 0.1, delay: 0.06 });
  },
  "double-fronde": () => {
    specialShotSounds.fronde();
    playNoise({ type: "bandpass", frequency: 500, frequencyEnd: 2000, q: 2, duration: 0.1, volume: 0.16, delay: 0.05 });
  },
  arbalete: () => {
    playNoise({ type: "bandpass", frequency: 220, frequencyEnd: 90, q: 1, duration: 0.08, volume: 0.28 });
    playNoise({ type: "highpass", frequency: 1800, frequencyEnd: 4200, duration: 0.16, volume: 0.16, attack: 0.01 });
    playPitch({ frequency: 1400, frequencyEnd: 700, duration: 0.12, volume: 0.06, delay: 0.02 });
  },
  "arc-long": () => {
    playNoise({ type: "bandpass", frequency: 160, frequencyEnd: 70, duration: 0.14, volume: 0.3 });
    playNoise({ type: "bandpass", frequency: 900, frequencyEnd: 3200, q: 2, duration: 0.22, volume: 0.18, attack: 0.03 });
    playPitch({ frequency: 880, frequencyEnd: 320, duration: 0.2, volume: 0.07 });
  },
  "fusil-pompe": () => {
    playNoise({ type: "lowpass", frequency: 900, frequencyEnd: 80, duration: 0.28, volume: 0.42 });
    playPitch({ frequency: 90, frequencyEnd: 40, duration: 0.2, volume: 0.32 });
    for (let index = 0; index < 4; index += 1) {
      playNoise({ type: "bandpass", frequency: 1200 + index * 400, q: 3, duration: 0.04, volume: 0.1, delay: 0.02 + index * 0.02 });
    }
  },
  "lance-clous": () => {
    playNoise({ type: "highpass", frequency: 1800, duration: 0.04, volume: 0.22 });
    playNoise({ type: "bandpass", frequency: 900, frequencyEnd: 2400, q: 4, duration: 0.06, volume: 0.2 });
    playPitch({ frequency: 240, frequencyEnd: 120, duration: 0.05, volume: 0.12 });
  },
  "faux-spectrale": () => {
    playNoise({ type: "bandpass", frequency: 240, frequencyEnd: 1600, q: 1.6, duration: 0.28, volume: 0.24, attack: 0.06 });
    playPitch({ frequency: 2200, frequencyEnd: 900, duration: 0.16, volume: 0.06, delay: 0.05 });
    playPitch({ frequency: 3100, frequencyEnd: 1400, duration: 0.12, volume: 0.04, delay: 0.1 });
  },
  "lance-bonbons": () => {
    playNoise({ type: "bandpass", frequency: 600, frequencyEnd: 1800, q: 2, duration: 0.08, volume: 0.2 });
    playPitch({ frequency: 880, frequencyEnd: 1320, duration: 0.08, volume: 0.08 });
    playNoise({ type: "highpass", frequency: 3000, duration: 0.05, volume: 0.08, delay: 0.06 });
  },
  "tir-chauve-souris": () => {
    for (let index = 0; index < 5; index += 1) {
      playNoise({ type: "bandpass", frequency: 500 + Math.random() * 250, q: 3, duration: 0.04, volume: 0.14, delay: index * 0.03 });
    }
    playPitch({ frequency: 2400, frequencyEnd: 1800, duration: 0.08, volume: 0.05 });
  },
  "lanterne-ames": () => {
    playNoise({ type: "lowpass", frequency: 400, frequencyEnd: 1600, duration: 0.2, volume: 0.22, attack: 0.04 });
    playNoise({ type: "bandpass", frequency: 900, frequencyEnd: 300, q: 1, duration: 0.35, volume: 0.16 });
    playPitch({ frequency: 520, frequencyEnd: 260, duration: 0.3, volume: 0.06, vibrato: 0.04, vibratoRate: 9 });
  },
  "grimoire-maudit": () => {
    playPitch({ frequency: 330, frequencyEnd: 660, duration: 0.18, type: "triangle", volume: 0.1 });
    playPitch({ frequency: 494, frequencyEnd: 247, duration: 0.28, volume: 0.08, delay: 0.05, vibrato: 0.03 });
    playNoise({ type: "bandpass", frequency: 1800, frequencyEnd: 600, q: 3, duration: 0.3, volume: 0.12, attack: 0.04 });
  },
  "fouet-ronces": () => {
    playNoise({ type: "bandpass", frequency: 300, frequencyEnd: 2200, q: 1.5, duration: 0.08, volume: 0.28, attack: 0.01 });
    playNoise({ type: "highpass", frequency: 2500, duration: 0.03, volume: 0.22, delay: 0.07 });
    playPitch({ frequency: 140, frequencyEnd: 70, duration: 0.08, volume: 0.12, delay: 0.07 });
  },
};

function playSpecialShot(weaponId) {
  const shot = specialShotSounds[weaponId];
  if (shot) shot();
  else playNoise({ type: "bandpass", frequency: 500, frequencyEnd: 1400, q: 2, duration: 0.1, volume: 0.2 });
}

const bossLines = {
  gardien: { text: "Turn back. This gate is mine.", pitch: 0.62, rate: 0.84 },
  chasseur: { text: "Run. I already see you.", pitch: 0.9, rate: 1.02 },
  colosse: { text: "Too small. I will break you.", pitch: 0.42, rate: 0.76 },
  "fossoyeur-maudit": { text: "Dig deeper. The dead are not finished.", pitch: 0.5, rate: 0.8 },
  "epouvantail-automne": { text: "Stay in my field. The crows are hungry.", pitch: 0.72, rate: 0.86 },
  "maitre-des-cauchemars": { text: "Close your eyes. I live in the dark.", pitch: 0.46, rate: 0.78 },
  "bouffon-frondeur": { text: "Smile wider. The crowd wants blood.", pitch: 1.25, rate: 1.08 },
  "mega-cauchemar": { text: "Bow to the throne. Your night ends here.", pitch: 0.38, rate: 0.72 },
};

function playBossBoom(name) {
  const heavy = name === "mega-cauchemar" || name === "colosse";
  playNoise({ type: "lowpass", frequency: heavy ? 700 : 420, frequencyEnd: 40, duration: heavy ? 1.3 : 0.8, volume: heavy ? 0.55 : 0.4, attack: 0.01 });
  playPitch({ frequency: heavy ? 55 : 80, frequencyEnd: 28, duration: heavy ? 0.9 : 0.5, volume: heavy ? 0.5 : 0.32 });
  if (name === "epouvantail-automne") {
    playNoise({ type: "highpass", frequency: 2800, duration: 0.2, volume: 0.16 });
    playPitch({ frequency: 720, frequencyEnd: 380, duration: 0.3, type: "square", volume: 0.08 });
  } else if (name === "bouffon-frondeur") {
    for (let index = 0; index < 5; index += 1) playPitch({ frequency: 1200 + index * 180, duration: 0.2, volume: 0.07, delay: index * 0.06 });
  } else if (name === "fossoyeur-maudit") {
    playNoise({ type: "lowpass", frequency: 500, frequencyEnd: 90, duration: 0.7, volume: 0.28, attack: 0.08 });
  } else if (name === "maitre-des-cauchemars" || name === "mega-cauchemar") {
    playNoise({ type: "bandpass", frequency: 2400, frequencyEnd: 600, q: 3, duration: 1.1, volume: 0.14, attack: 0.3 });
  } else if (name === "gardien") {
    playNoise({ type: "bandpass", frequency: 1800, q: 6, duration: 0.2, volume: 0.22 });
  } else if (name === "chasseur") {
    playPitch({ frequency: 1400, frequencyEnd: 500, duration: 0.35, volume: 0.1, vibrato: 0.05 });
  }
}

function speakBossLine(name) {
  const line = bossLines[name];
  if (!line || !window.speechSynthesis || !soundEnabled || !effectsEnabled) return;
  const { master, effects } = gameSettings.volumes;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(line.text);
  utterance.lang = "en-US";
  utterance.pitch = line.pitch;
  utterance.rate = line.rate;
  utterance.volume = Math.max(0.15, (master / 100) * (effects / 100));
  const voice = window.speechSynthesis.getVoices().find((item) => item.lang?.toLowerCase().startsWith("en"));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function playSound(name, type) {
  if (name === "creature-cry") {
    playCreatureCry(type?.name, type?.mood);
    return;
  }
  if (name === "power") {
    playPowerSound(type);
    return;
  }
  if (name === "blade-hit") {
    playBladeHit(type);
    return;
  }
  if (name === "shoot" && gunSounds[type]) {
    playGunshot(type);
    return;
  }
  if (name === "shoot" && bladeSounds[type]) {
    playBladeSwing(type);
    return;
  }
  if (name === "shoot") {
    playSpecialShot(type);
    return;
  }
  if (name === "weapon-swap") {
    if (type === "melee") {
      playTone(1400, 0.16, "sawtooth", 0.06, 0.5);
      playTone(2100, 0.22, "sine", 0.05, 0.8);
    } else {
      playTone(320, 0.05, "square", 0.12, 0.7);
      window.setTimeout(() => playTone(560, 0.05, "square", 0.1, 0.9), 70);
    }
  }
  if (name === "boss-warning") {
    playTone(110, 0.5, "sawtooth", 0.22, 0.8);
    playTone(82, 0.7, "square", 0.16, 0.9);
  }
  if (name === "hurt") playTone(180, 0.3, "sawtooth", 0.25, 0.45);
  if (name === "dodge") {
    playTone(420, 0.14, "triangle", 0.16, 0.38);
    playTone(170, 0.12, "sine", 0.12, 0.62);
  }
  if (name === "step") playTone(95, 0.07, "sine", 0.1, 0.6);
  if (name === "enemy-spawn" && type !== "boss") playCreatureCry(type, "spawn");
  if (name === "enemy-attack") {
    playCreatureCry(type, "attack");
    playNoise({ type: "bandpass", frequency: 700, frequencyEnd: 1600, q: 2, duration: 0.14, volume: 0.06, attack: 0.05 });
  }
  if (name === "enemy-projectile") {
    playTone(310, 0.22, "sawtooth", 0.16, 0.48);
    playTone(620, 0.16, "sine", 0.1, 0.55);
  }
  if (name === "enemy-attack-hit") {
    const pitch = type === "colosse" || type === "brute" ? 82 : type === "scout" || type === "chasseur" ? 260 : 165;
    playTone(pitch, 0.12, "square", 0.16, 0.5);
  }
  if (name === "enemy-hit") {
    const pitch = type === "gardien" ? 210 : type === "chasseur" ? 315 : type === "colosse" || type === "mega-cauchemar" ? 70
      : type === "brute" ? 145 : type === "scout" ? 390 : 270;
    playTone(pitch, 0.12, "triangle", 0.2, 0.65);
  }
  if (name === "enemy-down") {
    const isBoss = ["gardien", "chasseur", "colosse", "mega-cauchemar", "boss"].includes(type);
    const pitch = type === "gardien" ? 185 : type === "chasseur" ? 245 : type === "colosse" || type === "mega-cauchemar" ? 58
      : type === "brute" ? 120 : type === "scout" ? 250 : 190;
    playTone(pitch, isBoss ? 0.4 : 0.16, "sawtooth", isBoss ? 0.12 : 0.08, 0.4);
    playCreatureCry(type, "death");
  }
  if (name === "boss-arrive") {
    playBossBoom(type);
    playCreatureCry(type, "spawn");
    speakBossLine(type);
  }
  if (name === "boss-down") {
    const pitch = type === "gardien" ? 240 : type === "chasseur" ? 300 : 125;
    playTone(pitch, 0.5, "triangle", 0.25, 2.2);
    playTone(pitch * 1.33, 0.65, "sine", 0.2, 1.7);
  }
  if (name === "portal-open") {
    playTone(180, 0.7, "sine", 0.22, 3.2);
    playTone(360, 0.55, "triangle", 0.14, 2.4);
  }
  if (name === "boss-transition") {
    playTone(72, 0.9, "sawtooth", 0.2, 0.48);
    playCreatureCry(type, "spawn");
  }
  if (name === "mega-attack") {
    playTone(65, 0.72, "sawtooth", 0.2, 0.42);
    playCreatureCry(type, "attack");
  }
  if (name === "upgrade") {
    playTone(520, 0.16, "triangle", 0.22, 1.5);
    playTone(780, 0.22, "sine", 0.2, 1.25);
  }
}

function updateMusicToggleControls() {
  masterSoundToggle.textContent = soundEnabled ? "🔊 Son : ON" : "🔇 Son : OFF";
  masterSoundToggle.setAttribute("aria-pressed", String(soundEnabled));
  musicToggle.textContent = musicEnabled ? "♪ Musique : ON" : "♪ Musique : OFF";
  musicToggle.setAttribute("aria-pressed", String(musicEnabled));
  soundToggle.textContent = effectsEnabled ? "♫ Effets : ON" : "♫ Effets : OFF";
  soundToggle.setAttribute("aria-pressed", String(effectsEnabled));
  settingsPanel.classList.toggle("is-muted", !soundEnabled);
  for (const [channel, slider] of Object.entries(volumeSliders)) {
    slider.value = String(gameSettings.volumes[channel]);
    volumeOutputs[channel].textContent = `${gameSettings.volumes[channel]} %`;
  }
}

function applySoundSettings() {
  gameSettings.muted = { master: !soundEnabled, music: !musicEnabled, effects: !effectsEnabled };
  saveSettings();
  updateMusicToggleControls();
  initializeAudio();
}

masterSoundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  applySoundSettings();
});
musicToggle.addEventListener("click", () => {
  musicEnabled = !musicEnabled;
  applySoundSettings();
});
soundToggle.addEventListener("click", () => {
  effectsEnabled = !effectsEnabled;
  applySoundSettings();
});

let volumePreviewTimer;
for (const [channel, slider] of Object.entries(volumeSliders)) {
  slider.addEventListener("input", () => {
    gameSettings.volumes[channel] = Math.max(0, Math.min(100, Math.round(Number(slider.value))));
    volumeOutputs[channel].textContent = `${gameSettings.volumes[channel]} %`;
    saveSettings();
    initializeAudio();
    if (channel === "music") return;
    window.clearTimeout(volumePreviewTimer);
    volumePreviewTimer = window.setTimeout(() => playSound("upgrade"), 120);
  });
}

function renderKeyBindings() {
  settingsKeysList.replaceChildren(...keyActions.map((action) => {
    const row = document.createElement("div");
    row.className = "settings-key-row";
    const label = document.createElement("span");
    label.className = "settings-key-label";
    label.textContent = action.label;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "settings-key-button";
    button.dataset.action = action.id;
    const listening = keyCaptureAction === action.id;
    button.classList.toggle("is-listening", listening);
    button.textContent = listening ? "Appuie sur une touche…" : formatKeyName(gameSettings.keys[action.id]);
    button.setAttribute("aria-label", `${action.label} : ${listening ? "en attente d'une touche" : formatKeyName(gameSettings.keys[action.id])}`);
    row.append(label, button);
    return row;
  }));
}

function bindKey(actionId, key) {
  const previousKey = gameSettings.keys[actionId];
  const conflict = keyActions.find((action) => action.id !== actionId && gameSettings.keys[action.id] === key);
  if (conflict) gameSettings.keys[conflict.id] = previousKey;
  gameSettings.keys[actionId] = key;
  saveSettings();
  updateKeyLabels();
}

function isHostAccount() {
  return activeAccount.toLowerCase() === "admin";
}

function fillGiftChoices(kindSelect, itemSelect, countInput) {
  const items = hostGiftCatalog?.[kindSelect.value] || [];
  itemSelect.replaceChildren();
  for (const item of items) {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = `${item.icon} ${item.label}`;
    itemSelect.append(option);
  }
  const locked = !kindSelect.value;
  itemSelect.disabled = locked;
  countInput.disabled = locked || !giftCountableKinds.has(kindSelect.value);
  if (countInput.disabled) countInput.value = "1";
}

function fillHostGiftItems() {
  fillGiftChoices(settingsGiftKind, settingsGiftItem, settingsGiftCount);
}

async function loadHostGiftCatalog() {
  if (!hostGiftCatalog) {
    const response = await fetch("/api/catalog", { cache: "no-store" });
    if (!response.ok) throw new Error("La liste des objets n'a pas pu être lue.");
    hostGiftCatalog = await response.json();
  }
  fillHostGiftItems();
}

async function giveToPlayer({ pseudo, coins = 0, kind = "", itemId = "", count = 1, status }) {
  if (!isHostAccount()) return false;
  if (!serverToken || serverToken === "firebase") {
    status.textContent = "Reconnecte-toi pour donner des objets.";
    return false;
  }
  status.textContent = "Enregistrement…";
  try {
    const data = await serverRequest("/api/give", { pseudo, coins, kind, itemId, count });
    status.textContent = `Don enregistré pour ${data.username}. Ce sac a ${data.coins} pièces.`;
    if (data.username.toLowerCase() === activeAccount.toLowerCase()) pullServerAccount();
    return true;
  } catch (error) {
    status.textContent = error.message || "Le don n'a pas pu être enregistré.";
    return false;
  }
}

function showAdminStatus(message, ok) {
  adminStatus.textContent = message;
  adminStatus.classList.toggle("is-ok", ok === true);
  adminStatus.classList.toggle("is-error", ok === false);
}

function firestoreGiftMessage(error) {
  if (error?.code === "permission-denied") return "Firebase a refusé l'écriture. Publie des règles qui autorisent players et inventory.";
  if (error?.code === "not-found") return "Ce joueur n'existe pas encore dans Firebase.";
  return error?.message || "Le don n'a pas pu être enregistré sur Firebase.";
}

function openAdminPanel() {
  if (!isHostAccount()) return;
  adminPanel.hidden = false;
  adminPlayer.focus();
}

function closeAdminPanel() {
  adminPanel.hidden = true;
}

function toggleAdminPanel() {
  if (adminPanel.hidden) openAdminPanel();
  else closeAdminPanel();
}

function syncHostGiftAccess() {
  const allowed = isHostAccount();
  settingsGiveTab.hidden = !allowed;
  if (!allowed && settingsGiveTab.classList.contains("is-active")) setSettingsTab("account");
}

function setSettingsTab(tab) {
  for (const button of settingsTabs) {
    const active = button.dataset.settingsTab === tab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  }
  for (const section of settingsSections) section.hidden = section.dataset.settingsSection !== tab;
  if (tab === "give" && isHostAccount()) {
    loadHostGiftCatalog().catch((error) => {
      settingsGiftStatus.textContent = error.message;
    });
  }
}

function openSettings() {
  if (!settingsPanel.hidden) return;
  keys.clear();
  stopShooting();
  keyCaptureAction = "";
  updateMusicToggleControls();
  renderKeyBindings();
  syncHostGiftAccess();
  settingsPanel.hidden = false;
  arena.classList.add("settings-open");
  settingsCloseButton.focus();
}

function closeSettings() {
  if (settingsPanel.hidden) return;
  keyCaptureAction = "";
  settingsPanel.hidden = true;
  arena.classList.remove("settings-open");
  previousTime = 0;
}

for (const button of settingsOpenButtons) {
  button.addEventListener("click", () => {
    initializeAudio();
    openSettings();
    button.blur();
  });
}
settingsGiftKind.addEventListener("change", fillHostGiftItems);
settingsGiftForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const given = await giveToPlayer({
    pseudo: settingsGiftPseudo.value.trim(),
    coins: Number(settingsGiftCoins.value) || 0,
    kind: settingsGiftKind.value,
    itemId: settingsGiftKind.value ? settingsGiftItem.value : "",
    count: Number(settingsGiftCount.value) || 1,
    status: settingsGiftStatus,
  });
  if (given) settingsGiftCoins.value = "0";
});
adminGiftForm.addEventListener("submit", (event) => event.preventDefault());
adminPanelClose.addEventListener("click", closeAdminPanel);
adminPanel.addEventListener("click", (event) => {
  if (event.target === adminPanel) closeAdminPanel();
});
adminGiveCoins.addEventListener("click", async () => {
  if (!isHostAccount()) return;
  const joueurId = adminPlayer.value.trim();
  const nouvellesPieces = Number(adminCoins.value);
  if (!joueurId) {
    showAdminStatus("Écris l'identifiant du joueur.", false);
    return;
  }
  if (!Number.isFinite(nouvellesPieces) || nouvellesPieces < 0) {
    showAdminStatus("Indique un nombre de pièces.", false);
    return;
  }
  showAdminStatus("Enregistrement sur Firebase…", undefined);
  try {
    await donnerPieces(joueurId, nouvellesPieces);
    showAdminStatus(`Pièces mises à jour : ${joueurId} a ${nouvellesPieces} pièces.`, true);
  } catch (error) {
    showAdminStatus(firestoreGiftMessage(error), false);
  }
});
adminGiveItem.addEventListener("click", async () => {
  if (!isHostAccount()) return;
  const joueurId = adminPlayer.value.trim();
  const idObjet = adminItemId.value.trim();
  const nomObjet = adminItemName.value.trim();
  const quantite = Number(adminCount.value);
  if (!joueurId) {
    showAdminStatus("Écris l'identifiant du joueur.", false);
    return;
  }
  if (!idObjet || !nomObjet) {
    showAdminStatus("Écris l'identifiant et le nom de l'objet.", false);
    return;
  }
  if (!Number.isInteger(quantite) || quantite < 1) {
    showAdminStatus("La quantité doit être au moins 1.", false);
    return;
  }
  showAdminStatus("Enregistrement sur Firebase…", undefined);
  try {
    await donnerObjet(joueurId, idObjet, nomObjet, quantite);
    showAdminStatus(`Objet ajouté : ${nomObjet} ×${quantite} pour ${joueurId}.`, true);
  } catch (error) {
    showAdminStatus(firestoreGiftMessage(error), false);
  }
});
window.addEventListener("keydown", (event) => {
  if (!event.ctrlKey || !event.shiftKey || event.key.toLowerCase() !== "a") return;
  if (!isHostAccount()) return;
  event.preventDefault();
  event.stopPropagation();
  toggleAdminPanel();
}, true);
settingsCloseButton.addEventListener("click", closeSettings);
settingsDoneButton.addEventListener("click", closeSettings);
settingsResetButton.addEventListener("click", () => {
  gameSettings = structuredClone(defaultSettings);
  soundEnabled = true;
  musicEnabled = true;
  effectsEnabled = true;
  keyCaptureAction = "";
  saveSettings();
  updateMusicToggleControls();
  updateKeyLabels();
  renderKeyBindings();
  initializeAudio();
});
settingsPanel.addEventListener("click", (event) => {
  if (event.target === settingsPanel) {
    closeSettings();
    return;
  }
  if (!(event.target instanceof Element)) return;
  const tab = event.target.closest(".settings-tab");
  if (tab instanceof HTMLButtonElement) {
    setSettingsTab(tab.dataset.settingsTab);
    return;
  }
  const keyButton = event.target.closest(".settings-key-button");
  if (keyButton instanceof HTMLButtonElement) {
    keyCaptureAction = keyCaptureAction === keyButton.dataset.action ? "" : keyButton.dataset.action;
    renderKeyBindings();
    settingsKeysList.querySelector(`[data-action="${keyCaptureAction || keyButton.dataset.action}"]`)?.focus();
  }
});

function updateAutoShootControl() {
  autoShootToggle.textContent = `Tir auto : ${autoShootEnabled ? "ON" : "OFF"}`;
  autoShootToggle.setAttribute("aria-pressed", String(autoShootEnabled));
  const move = ["up", "left", "down", "right"].map(keyLabel).join("");
  const shootKey = keyLabel("shoot").toLowerCase();
  controlsHint.textContent = `${move} / flèches · ${keyLabel("dodge")} esquive · ${keyLabel("ranged")}/${keyLabel("melee")} ou ${keyLabel("swap")} changer d'arme · ${keyLabel("pickup")} ramasser · ${keyLabel("power")} pouvoir · ${keyLabel("boost")} boost · ${autoShootEnabled
    ? `Tir auto (clic ou ${shootKey} pour viser)`
    : `Clic ou ${shootKey} pour tirer`} · Échap paramètres`;
  const character = loadoutOptions.characters.find((item) => item.id === progression.equipped.characters);
  player.setAttribute(
    "aria-label",
    `${progression.playerName || "Survivant"}, ${character?.label ?? "personnage"} pixel art avec équipement et arme personnalisés. ${autoShootEnabled ? "Tir automatique activé." : "Tir automatique désactivé."}`,
  );
}

autoShootToggle.addEventListener("click", () => {
  autoShootEnabled = !autoShootEnabled;
  if (!autoShootEnabled) stopShooting();
  updateAutoShootControl();
});

function updatePlayerHealth() {
  playerHealthBar.setAttribute("aria-valuenow", String(playerHealth));
  playerHealthBar.setAttribute("aria-valuemax", String(maxPlayerHealth));
  const heartsValue = (playerHealth / maxPlayerHealth) * playerHearts.length;
  playerHearts.forEach((heart, index) => {
    const fill = Math.max(0, Math.min(1, heartsValue - index));
    const previousFill = Number(heart.dataset.fill ?? 1);
    heart.dataset.fill = String(fill);
    heart.style.setProperty("--fill", fill.toFixed(3));
    heart.classList.toggle("is-empty", fill === 0);
    if (fill < previousFill - 0.001) {
      heart.classList.remove("is-hit");
      void heart.offsetWidth;
      heart.classList.add("is-hit");
    }
  });
  playerHealthBar.classList.toggle("is-critical", heartsValue <= 1 && playerHealth > 0);
  playerHealthValue.textContent = `${Math.ceil(playerHealth)} / ${maxPlayerHealth} PV`;
  const headHealthFill = document.querySelector(".health-fill");
  headHealthFill.style.width = `${(playerHealth / maxPlayerHealth) * 100}%`;
  headHealthFill.style.background = playerHealth <= 30 ? "#e34e4e" : playerHealth <= 60 ? "#f2b83f" : "";
}

function playFootsteps(delta, running = false) {
  if (!effectsEnabled || !soundEnabled) return;
  stepSoundElapsed += delta;
  if (stepSoundElapsed >= (running ? 0.27 : 0.42)) {
    stepSoundElapsed = 0;
    playSound("step");
  }
}

function createRunDust() {
  const center = playerCenter();
  const scale = scaleActor();
  const dust = document.createElement("span");
  dust.className = "run-dust";
  dust.setAttribute("aria-hidden", "true");
  dust.style.left = `${center.x - facing.x * 16 * scale + (Math.random() - 0.5) * 10}px`;
  dust.style.top = `${center.y + 30 * scale * characterScale}px`;
  dust.style.setProperty("--drift-x", `${-facing.x * 18}px`);
  world.append(dust);
  window.setTimeout(() => dust.remove(), 600);
}

function formatClock(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function getBossArrivalTime() {
  if (stage === "waves" || stage === "boss-wave") return bossArrivalTimeLeft;
  if (stage === "portal" || stage === "ultimate") return finalBossArrivalTimeLeft;
  return Infinity;
}

function getEnemyCap() {
  if (stage === "portal" || stage === "ultimate") return finalWaveMaxEnemies;
  if (stage === "boss-wave" || waveNumber >= 3) return maxEnemiesOnField + 8;
  return maxEnemiesOnField;
}

function getMinionSpawnPlan() {
  if (stage === "portal" || stage === "ultimate") return { interval: 1.5, count: 4 };
  if (stage === "boss-wave") return { interval: 1.3, count: 5 };
  if (waveNumber >= 3) return { interval: 1.6, count: 4 };
  return { interval: 2.5, count: 3 };
}

/* Le texte du chrono ne change qu'une fois par seconde : on évite de réécrire
   le DOM à chaque image. */
const timerView = { clock: "", run: "", eta: "", urgent: false, showEta: false, close: false };

function updateTimer() {
  const seconds = Math.ceil(waveCountdown > 0 ? waveCountdown : timeLeft);
  const clock = formatClock(seconds);
  const urgent = waveCountdown === 0 && seconds <= 10 && !waveCleared;
  const run = `Partie ${formatClock(runElapsed)}`;
  const bossEta = Math.ceil(timeLeft - getBossArrivalTime());
  const showEta = bossesRemaining.length > 0 && bossEta > 0;
  const eta = showEta ? `BOSS dans ${formatClock(bossEta)}` : "";
  const close = showEta && waveCountdown === 0 && bossEta <= 10;
  if (clock !== timerView.clock) {
    timerDisplay.textContent = clock;
    timerView.clock = clock;
  }
  if (urgent !== timerView.urgent) {
    timerDisplay.classList.toggle("timer-urgent", urgent);
    timerView.urgent = urgent;
  }
  if (run !== timerView.run) {
    runTimeDisplay.textContent = run;
    timerView.run = run;
  }
  if (showEta !== timerView.showEta) {
    bossEtaDisplay.hidden = !showEta;
    timerView.showEta = showEta;
  }
  if (showEta && eta !== timerView.eta) {
    bossEtaDisplay.textContent = eta;
    timerView.eta = eta;
  }
  if (close !== timerView.close) {
    bossEtaDisplay.classList.toggle("is-close", close);
    timerView.close = close;
  }
}

// Le décor est vu de trois quarts : seuls les pieds entrent en collision avec les structures,
// le haut du corps peut passer devant un mur sans que le personnage monte sur le toit.
const footDropRatio = 0.9;
const footRadiusRatio = 0.7;

function getPlayerBody() {
  const scale = Math.max(0.48, Math.min(1, playWorldWidth() / 1160));
  return {
    radius: 20 * scale * characterScale,
    footDrop: 25 * scale * characterScale,
    footRadius: 14 * scale * characterScale,
    edgeX: playWorldWidth() * 0.018 + 34 * scale * characterScale,
    edgeY: playWorldHeight() * 0.025 + 41 * scale * characterScale,
  };
}

const obstacleShapeCache = { key: "", shapes: [] };

function getObstacleShapes() {
  if (stage === "ultimate") return [];
  const width = playWorldWidth();
  const height = playWorldHeight();
  const key = `${arena.dataset.wave}|${width}x${height}`;
  if (obstacleShapeCache.key === key) return obstacleShapeCache.shapes;
  obstacleShapeCache.key = key;
  obstacleShapeCache.shapes = currentMapObstacles().map((obstacle) => {
    const corners = typeof obstacle[0] === "number"
      ? [[obstacle[0], obstacle[1]], [obstacle[2], obstacle[1]], [obstacle[2], obstacle[3]], [obstacle[0], obstacle[3]]]
      : obstacle;
    const points = corners.map(([x, y]) => [x * width, y * height]);
    const xs = points.map((point) => point[0]);
    const ys = points.map((point) => point[1]);
    return {
      points,
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
      centerX: xs.reduce((total, value) => total + value, 0) / xs.length,
      centerY: ys.reduce((total, value) => total + value, 0) / ys.length,
    };
  });
  return obstacleShapeCache.shapes;
}

function isInsideShape(x, y, shape) {
  if (x < shape.minX || x > shape.maxX || y < shape.minY || y > shape.maxY) return false;
  const { points } = shape;
  let inside = false;
  for (let index = 0, previous = points.length - 1; index < points.length; previous = index, index += 1) {
    const [ax, ay] = points[index];
    const [bx, by] = points[previous];
    if ((ay > y) !== (by > y) && x < (bx - ax) * (y - ay) / (by - ay) + ax) inside = !inside;
  }
  return inside;
}

function nearestPointOnSegment(x, y, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  const t = lengthSquared > 0 ? Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / lengthSquared)) : 0;
  return [ax + dx * t, ay + dy * t];
}

function distanceToSegment(x, y, ax, ay, bx, by) {
  const [nearestX, nearestY] = nearestPointOnSegment(x, y, ax, ay, bx, by);
  return Math.hypot(x - nearestX, y - nearestY);
}

function nearestPointOnShape(x, y, shape) {
  const { points } = shape;
  let best = null;
  let bestDistance = Infinity;
  for (let index = 0, previous = points.length - 1; index < points.length; previous = index, index += 1) {
    const point = nearestPointOnSegment(x, y, ...points[previous], ...points[index]);
    const distance = Math.hypot(x - point[0], y - point[1]);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = point;
    }
  }
  return { x: best[0], y: best[1], distance: bestDistance };
}

function circleTouchesShape(x, y, radius, shape) {
  if (x < shape.minX - radius || x > shape.maxX + radius || y < shape.minY - radius || y > shape.maxY + radius) return false;
  return isInsideShape(x, y, shape) || nearestPointOnShape(x, y, shape).distance < radius;
}

// Déplacement minimal qui sort le cercle de la forme : contre un mur il glisse,
// contre un coin il contourne au lieu de rester accroché.
function getCirclePush(x, y, radius, shape) {
  if (x < shape.minX - radius || x > shape.maxX + radius || y < shape.minY - radius || y > shape.maxY + radius) return null;
  const inside = isInsideShape(x, y, shape);
  const nearest = nearestPointOnShape(x, y, shape);
  if (!inside && nearest.distance >= radius) return null;
  let directionX = inside ? nearest.x - x : x - nearest.x;
  let directionY = inside ? nearest.y - y : y - nearest.y;
  let length = Math.hypot(directionX, directionY);
  if (length < 0.001) {
    directionX = x - shape.centerX;
    directionY = y - shape.centerY;
    length = Math.hypot(directionX, directionY) || 1;
  }
  const push = (inside ? nearest.distance + radius : radius - nearest.distance) + 0.05;
  return { x: directionX / length * push, y: directionY / length * push };
}

function segmentsIntersection(ax, ay, bx, by, cx, cy, dx, dy) {
  const rx = bx - ax;
  const ry = by - ay;
  const sx = dx - cx;
  const sy = dy - cy;
  const denominator = rx * sy - ry * sx;
  if (Math.abs(denominator) < 1e-9) return null;
  const t = ((cx - ax) * sy - (cy - ay) * sx) / denominator;
  const u = ((cx - ax) * ry - (cy - ay) * rx) / denominator;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? t : null;
}

function segmentTouchesShape(ax, ay, bx, by, radius, shape) {
  if (Math.max(ax, bx) < shape.minX - radius || Math.min(ax, bx) > shape.maxX + radius
    || Math.max(ay, by) < shape.minY - radius || Math.min(ay, by) > shape.maxY + radius) return false;
  if (isInsideShape(ax, ay, shape) || isInsideShape(bx, by, shape)) return true;
  const { points } = shape;
  for (let index = 0, previous = points.length - 1; index < points.length; previous = index, index += 1) {
    const [cx, cy] = points[previous];
    const [dx, dy] = points[index];
    if (segmentsIntersection(ax, ay, bx, by, cx, cy, dx, dy) !== null) return true;
    if (radius <= 0) continue;
    const toEdge = Math.min(
      distanceToSegment(ax, ay, cx, cy, dx, dy),
      distanceToSegment(bx, by, cx, cy, dx, dy),
      distanceToSegment(cx, cy, ax, ay, bx, by),
      distanceToSegment(dx, dy, ax, ay, bx, by),
    );
    if (toEdge < radius) return true;
  }
  return false;
}

function resolvePlayerCollisions(x, y, body) {
  const width = playWorldWidth();
  const height = playWorldHeight();
  const { edgeX, edgeY, footDrop, footRadius } = body;
  for (let pass = 0; pass < 4; pass += 1) {
    x = Math.max(edgeX, Math.min(width - edgeX, x));
    y = Math.max(edgeY, Math.min(height - edgeY, y));
    let moved = false;
    for (const shape of getObstacleShapes()) {
      const push = getCirclePush(x, y + footDrop, footRadius, shape);
      if (!push) continue;
      x += push.x;
      y += push.y;
      moved = true;
    }
    if (!moved) break;
  }
  return { x, y };
}

function canPlayerOccupy(x, y, body) {
  return canOccupy(x, y, body.radius, body.footDrop, body.footRadius);
}

function updatePlayer() {
  const body = getPlayerBody();
  let { x, y } = playerCenter();
  x = Math.max(body.edgeX, Math.min(playWorldWidth() - body.edgeX, x));
  y = Math.max(body.edgeY, Math.min(playWorldHeight() - body.edgeY, y));
  if (!canPlayerOccupy(x, y, body)) {
    ({ x, y } = resolvePlayerCollisions(x, y, body));
    if (!canPlayerOccupy(x, y, body)) ({ x, y } = findFreeSpot(x, y, body.radius, body.footDrop, body.footRadius));
  }
  position.x = x / playWorldWidth();
  position.y = y / playWorldHeight();

  player.style.left = `${x}px`;
  player.style.top = `${y}px`;
  player.style.setProperty("--hero-angle", `${Math.atan2(facing.y, facing.x) + Math.PI / 2}rad`);
  if (aimHoldRemaining > 0) player.classList.toggle("is-facing-left", aimFacingLeft);
  else if (Math.abs(facing.x) > 0.2) player.classList.toggle("is-facing-left", facing.x < 0);
  updateFog();
}

function playerCenter() {
  return {
    x: position.x * playWorldWidth(),
    y: position.y * playWorldHeight(),
  };
}

function currentMapObstacles() {
  return bossMapObstacles[arena.dataset.wave] ?? mapObstacles;
}

function findFreeSpot(x, y, radius, footDrop = radius * footDropRatio, footRadius = radius * footRadiusRatio) {
  const isFree = (candidateX, candidateY) => canOccupy(candidateX, candidateY, radius, footDrop, footRadius)
    && isInMainArea(candidateX, candidateY, radius);
  if (isFree(x, y)) return { x, y };
  const step = Math.max(6, radius / 2);
  for (let ring = 1; ring < 120; ring += 1) {
    const samples = ring * 8;
    for (let index = 0; index < samples; index += 1) {
      const angle = (index / samples) * Math.PI * 2;
      const candidateX = x + Math.cos(angle) * ring * step;
      const candidateY = y + Math.sin(angle) * ring * step;
      if (isFree(candidateX, candidateY)) return { x: candidateX, y: candidateY };
    }
  }
  throw new Error("Aucun emplacement libre sur la carte");
}

function settleOnCurrentMap() {
  const scale = Math.max(0.48, Math.min(1, playWorldWidth() / 1160));
  const center = playerCenter();
  const body = getPlayerBody();
  const spot = findFreeSpot(center.x, center.y, body.radius, body.footDrop, body.footRadius);
  position.x = spot.x / playWorldWidth();
  position.y = spot.y / playWorldHeight();
  updatePlayer();
  for (const pickup of pickups) {
    const pickupSpot = findFreeSpot(pickup.x, pickup.y, 12 * scale);
    pickup.x = pickupSpot.x;
    pickup.y = pickupSpot.y;
    pickup.element.style.left = `${pickup.x}px`;
    pickup.element.style.top = `${pickup.y}px`;
  }
}

function canOccupy(x, y, radius, footDrop = radius * footDropRatio, footRadius = radius * footRadiusRatio) {
  const minX = playWorldWidth() * 0.018 + radius;
  const minY = playWorldHeight() * 0.025 + radius;
  if (x < minX || y < minY || x > playWorldWidth() - minX || y > playWorldHeight() - minY) return false;
  return !getObstacleShapes().some((shape) => circleTouchesShape(x, y + footDrop, footRadius, shape));
}

function movePlayerBy(dx, dy) {
  const body = getPlayerBody();
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / (body.footRadius * 0.5)));
  let { x, y } = playerCenter();

  for (let step = 0; step < steps; step += 1) {
    const next = resolvePlayerCollisions(x + dx / steps, y + dy / steps, body);
    if (!canPlayerOccupy(next.x, next.y, body)) break;
    x = next.x;
    y = next.y;
  }
  position.x = x / playWorldWidth();
  position.y = y / playWorldHeight();
  updatePlayer();
}

function startDodge() {
  if (!gameActive || waveCountdown > 0 || restartLock > 0 || dodgeCooldown > 0 || dodgeRemaining > 0) return;

  let dx = 0;
  let dy = 0;
  if (isActionHeld("left")) dx -= 1;
  if (isActionHeld("right")) dx += 1;
  if (isActionHeld("up")) dy -= 1;
  if (isActionHeld("down")) dy += 1;
  const length = Math.hypot(dx, dy);
  dodgeDirection.x = length > 0 ? dx / length : facing.x;
  dodgeDirection.y = length > 0 ? dy / length : facing.y;
  facing.x = dodgeDirection.x;
  facing.y = dodgeDirection.y;
  dodgeRemaining = dodgeDuration;
  dodgeInvulnerabilityRemaining = dodgeInvulnerabilityDuration;
  dodgeCooldown = progression.equipped.equipment === "bottes"
    ? dodgeCooldownDuration * 0.68
    : dodgeCooldownDuration;
  player.classList.remove("is-moving");
  player.classList.remove("is-dodging");
  void player.offsetWidth;
  player.classList.add("is-dodging");
  player.classList.add("is-invulnerable");
  playSound("dodge");
}

const navCellSize = 20;
const navWalkableCache = new Map();
const navFieldCache = new Map();

function getNavWalkable(radius) {
  const cols = Math.ceil(playWorldWidth() / navCellSize);
  const rows = Math.ceil(playWorldHeight() / navCellSize);
  const key = `${arena.dataset.wave}|${stage === "ultimate"}|${cols}x${rows}|${radius}`;
  let entry = navWalkableCache.get(key);
  if (!entry) {
    const walkable = new Uint8Array(cols * rows);
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        walkable[row * cols + col] = canOccupy((col + 0.5) * navCellSize, (row + 0.5) * navCellSize, radius) ? 1 : 0;
      }
    }
    entry = { key, cols, rows, walkable };
    if (navWalkableCache.size > 24) navWalkableCache.clear();
    navWalkableCache.set(key, entry);
  }
  return entry;
}

function getNavField(radius, goalX, goalY) {
  const grid = getNavWalkable(radius);
  const { cols, rows, walkable } = grid;
  const goalCol = Math.max(0, Math.min(cols - 1, Math.floor(goalX / navCellSize)));
  const goalRow = Math.max(0, Math.min(rows - 1, Math.floor(goalY / navCellSize)));
  const cached = navFieldCache.get(radius);
  if (cached && cached.grid === grid && cached.goal === goalRow * cols + goalCol) return cached;

  const distances = new Int32Array(cols * rows).fill(-1);
  const queue = new Int32Array(cols * rows);
  let head = 0;
  let tail = 0;
  distances[goalRow * cols + goalCol] = 0;
  queue[tail++] = goalRow * cols + goalCol;
  while (head < tail) {
    const index = queue[head++];
    const col = index % cols;
    const row = (index - col) / cols;
    const neighbors = [
      col > 0 ? index - 1 : -1,
      col < cols - 1 ? index + 1 : -1,
      row > 0 ? index - cols : -1,
      row < rows - 1 ? index + cols : -1,
    ];
    for (const next of neighbors) {
      if (next < 0 || distances[next] !== -1 || !walkable[next]) continue;
      distances[next] = distances[index] + 1;
      queue[tail++] = next;
    }
  }
  const field = { grid, goal: goalRow * cols + goalCol, distances };
  navFieldCache.set(radius, field);
  return field;
}

// Certains coins de carte sont enfermés derrière des tentes ou des maisons : rien ne doit y apparaître.
function getMainArea(grid) {
  if (grid.mainArea) return grid.mainArea;
  const { cols, rows, walkable } = grid;
  const labels = new Int32Array(cols * rows).fill(-1);
  const queue = new Int32Array(cols * rows);
  let bestLabel = -1;
  let bestSize = 0;
  for (let start = 0, label = 0; start < walkable.length; start += 1) {
    if (!walkable[start] || labels[start] !== -1) continue;
    let head = 0;
    let tail = 0;
    labels[start] = label;
    queue[tail++] = start;
    while (head < tail) {
      const index = queue[head++];
      const col = index % cols;
      const neighbors = [
        col > 0 ? index - 1 : -1,
        col < cols - 1 ? index + 1 : -1,
        index >= cols ? index - cols : -1,
        index + cols < walkable.length ? index + cols : -1,
      ];
      for (const next of neighbors) {
        if (next < 0 || !walkable[next] || labels[next] !== -1) continue;
        labels[next] = label;
        queue[tail++] = next;
      }
    }
    if (tail > bestSize) {
      bestSize = tail;
      bestLabel = label;
    }
    label += 1;
  }
  grid.mainArea = labels.map((value) => (value === bestLabel ? 1 : 0));
  return grid.mainArea;
}

function isInMainArea(x, y, radius) {
  const grid = getNavWalkable(radius);
  const mainArea = getMainArea(grid);
  const col = Math.floor(x / navCellSize);
  const row = Math.floor(y / navCellSize);
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      const c = col + dc;
      const r = row + dr;
      if (c >= 0 && r >= 0 && c < grid.cols && r < grid.rows && mainArea[r * grid.cols + c]) return true;
    }
  }
  return false;
}

function isPathClear(startX, startY, endX, endY, radius) {
  const footDrop = radius * footDropRatio;
  const footRadius = radius * footRadiusRatio;
  return !getObstacleShapes().some((shape) =>
    segmentTouchesShape(startX, startY + footDrop, endX, endY + footDrop, footRadius, shape));
}

function getNavWaypoint(enemy, goalX, goalY) {
  const radius = Math.ceil(getEnemyMoveRadius(enemy) / 2) * 2;
  if (isPathClear(enemy.x, enemy.y, goalX, goalY, radius)) return null;
  const { grid, distances } = getNavField(radius, goalX, goalY);
  const { cols, rows, walkable } = grid;
  const col = Math.max(0, Math.min(cols - 1, Math.floor(enemy.x / navCellSize)));
  const row = Math.max(0, Math.min(rows - 1, Math.floor(enemy.y / navCellSize)));
  const at = (c, r) => (c < 0 || r < 0 || c >= cols || r >= rows ? -1 : distances[r * cols + c]);
  const open = (c, r) => c >= 0 && r >= 0 && c < cols && r < rows && walkable[r * cols + c] === 1;
  let best = null;
  let bestDistance = at(col, row) >= 0 ? at(col, row) : Infinity;
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (!dc && !dr) continue;
      if (dc && dr && !(open(col + dc, row) && open(col, row + dr))) continue;
      const value = at(col + dc, row + dr);
      if (value >= 0 && value < bestDistance) {
        bestDistance = value;
        best = { x: (col + dc + 0.5) * navCellSize, y: (row + dr + 0.5) * navCellSize };
      }
    }
  }
  return best;
}

function getEnemyMoveRadius(enemy) {
  const scale = Math.max(0.48, Math.min(1, playWorldWidth() / 1160));
  return enemy.element.offsetWidth * scale * characterScale * 0.38;
}

function moveEnemyToward(enemy, targetX, targetY, distance, delta) {
  const radius = getEnemyMoveRadius(enemy);
  const enrageBoost = enemy.element.classList.contains("boss-enraged") ? 1.3 : 1;
  const step = Math.min(distance, enemy.speed * enrageBoost * delta);
  const baseAngle = Math.atan2(targetY - enemy.y, targetX - enemy.x);
  const offsets = [0, 0.55, -0.55, 1.05, -1.05, 1.57, -1.57, Math.PI];
  if (Math.abs(targetX - enemy.x) > 6) {
    enemy.element.classList.toggle("enemy-facing-left", targetX < enemy.x);
  }

  for (const offset of offsets) {
    const angle = baseAngle + offset;
    const nextX = enemy.x + Math.cos(angle) * step;
    const nextY = enemy.y + Math.sin(angle) * step;
    if (stage === "ultimate" && enemy.profileName === "mega-cauchemar"
      && (nextX < playWorldWidth() * 0.16 || nextX > playWorldWidth() * 0.84
        || nextY < playWorldHeight() * 0.14 || nextY > playWorldHeight() * 0.4)) continue;
    if (!canOccupy(nextX, nextY, radius)) continue;
    enemy.x = nextX;
    enemy.y = nextY;
    enemy.element.style.left = `${enemy.x}px`;
    enemy.element.style.top = `${enemy.y}px`;
    return;
  }
}

const mapWidth = 1405;
const mapHeight = 768;

function playWorldWidth() {
  return chosenDevice === "phone" ? mapWidth : arena.clientWidth;
}

function playWorldHeight() {
  return chosenDevice === "phone" ? mapHeight : arena.clientHeight;
}

function phoneViewport() {
  const view = window.visualViewport;
  return {
    width: Math.max(1, Math.round(view?.width || window.innerWidth)),
    height: Math.max(1, Math.round(view?.height || window.innerHeight)),
    left: Math.round(view?.offsetLeft || 0),
    top: Math.round(view?.offsetTop || 0),
  };
}

function clearPhoneFit() {
  for (const prop of ["position", "left", "top", "right", "bottom", "width", "height", "max-width", "max-height", "margin", "aspect-ratio"]) {
    arena.style.removeProperty(prop);
  }
}

function syncPhoneView() {
  if (chosenDevice !== "phone") {
    camera.zoom = 1.6;
    world.style.width = "";
    world.style.height = "";
    clearPhoneFit();
    return;
  }
  const view = phoneViewport();
  arena.style.setProperty("position", "fixed", "important");
  arena.style.setProperty("left", `${view.left}px`, "important");
  arena.style.setProperty("top", `${view.top}px`, "important");
  arena.style.setProperty("right", "auto", "important");
  arena.style.setProperty("bottom", "auto", "important");
  arena.style.setProperty("width", `${view.width}px`, "important");
  arena.style.setProperty("height", `${view.height}px`, "important");
  arena.style.setProperty("max-width", "none", "important");
  arena.style.setProperty("max-height", "none", "important");
  arena.style.setProperty("margin", "0", "important");
  arena.style.setProperty("aspect-ratio", "auto", "important");
  world.style.width = `${mapWidth}px`;
  world.style.height = `${mapHeight}px`;
  const cover = Math.max(view.width / mapWidth, view.height / mapHeight);
  const desktopSlice = 1400 / 1.6;
  camera.zoom = Math.max(cover, view.width / desktopSlice);
}

function motionScale() {
  if (chosenDevice !== "phone") return 1;
  const visible = arena.clientWidth / Math.max(camera.zoom, 0.2);
  return Math.max(0.32, Math.min(1, visible / (1400 / 1.6)));
}

function updateFog() {
  syncPhoneView();
  const center = playerCenter();
  const scale = scaleActor();
  arena.style.setProperty("--world-scale", String(scale));
  arena.style.setProperty("--actor-scale", String(scale * characterScale));
  const focus = cameraFocus();
  const viewW = arena.clientWidth;
  const viewH = arena.clientHeight;
  arena.style.setProperty("--cam-x", `${viewW / 2 - focus.x * camera.zoom}px`);
  arena.style.setProperty("--cam-y", `${viewH / 2 - focus.y * camera.zoom}px`);
  arena.style.setProperty("--cam-zoom", String(camera.zoom));
  arena.style.setProperty("--fog-x", `${50 + (center.x - focus.x) * camera.zoom / viewW * 100}%`);
  arena.style.setProperty("--fog-y", `${50 + (center.y - focus.y) * camera.zoom / viewH * 100}%`);
  const fogScreen = chosenDevice === "phone"
    ? Math.min(viewW, viewH) * 0.46
    : fogRadius * scale * camera.zoom;
  arena.style.setProperty("--fog-radius", `${fogScreen}px`);
}

function cameraFocus() {
  const center = playerCenter();
  const halfWidth = arena.clientWidth / (2 * camera.zoom);
  const halfHeight = arena.clientHeight / (2 * camera.zoom);
  const worldW = playWorldWidth();
  const worldH = playWorldHeight();
  return {
    x: Math.max(halfWidth, Math.min(worldW - halfWidth, center.x)),
    y: Math.max(halfHeight, Math.min(worldH - halfHeight, center.y)),
  };
}

function screenToWorld(clientX, clientY) {
  const bounds = arena.getBoundingClientRect();
  const focus = cameraFocus();
  return {
    x: focus.x + (clientX - bounds.left - bounds.width / 2) / camera.zoom,
    y: focus.y + (clientY - bounds.top - bounds.height / 2) / camera.zoom,
  };
}

function createMuzzleFlash(x, y, angle, kind, variant = "") {
  const layer = createFxLayer(`muzzle-fx muzzle-${kind}${variant ? ` muzzle-fx-${variant}` : ""}`, x, y, 280);
  layer.style.setProperty("--dir", `${angle}deg`);
  addFxParts(layer, "muzzle-flash");
  addFxParts(layer, "muzzle-smoke");
  if (variant === "flint") {
    const cloud = createFxLayer("gun-smoke-fx", x, y, 1500);
    cloud.style.setProperty("--dir", `${angle}deg`);
    addFxParts(cloud, "gun-smoke-puff", 5, (style, index) => {
      style.setProperty("--d", `${(8 + index * 9).toFixed(1)}px`);
      style.setProperty("--s", randomBetween(0.8, 1.4).toFixed(2));
      style.setProperty("--t", `${(index * 0.03).toFixed(2)}s`);
      style.setProperty("--dx", `${randomBetween(-6, 6).toFixed(1)}px`);
    });
    addFxParts(cloud, "gun-pan-flash");
  } else if (variant === "pumpkin") {
    const seeds = createFxLayer("gun-eject-fx", x, y, 700);
    addFxParts(seeds, "gun-seed", 3, (style) => {
      style.setProperty("--a", `${(angle + 180 + randomBetween(-50, 50)).toFixed(1)}deg`);
      style.setProperty("--d", `${randomBetween(16, 30).toFixed(1)}px`);
      style.setProperty("--spin", `${randomBetween(-400, 400).toFixed(0)}deg`);
    });
  }
}

function showCritText(x, y) {
  const text = document.createElement("span");
  text.className = "crit-num";
  text.setAttribute("aria-hidden", "true");
  text.textContent = "CRITIQUE !";
  text.style.left = `${x}px`;
  text.style.top = `${y - 34 * scaleActor()}px`;
  world.append(text);
  window.setTimeout(() => text.remove(), 800);
}

function createImpact(x, y, kind = "seed", angle = 0, hitTarget = true, variant = "") {
  const layer = createFxLayer(`hit-fx hit-${kind}${hitTarget ? " hit-target" : ""}${variant ? ` hit-fx-${variant}` : ""}`, x, y, 750);
  addFxParts(layer, "hit-smoke", 2, (style) => {
    style.setProperty("--dx", `${randomBetween(-10, 10).toFixed(1)}px`);
    style.setProperty("--s", randomBetween(0.8, 1.3).toFixed(2));
  });
  addFxParts(layer, "hit-flash");
  addFxParts(layer, "hit-ring");
  addFxParts(layer, "hit-spark", shotSparkCounts[kind] ?? 6, (style) => {
    style.setProperty("--a", `${(angle + 180 + randomBetween(-80, 80)).toFixed(1)}deg`);
    style.setProperty("--d", `${randomBetween(14, 36).toFixed(1)}px`);
    style.setProperty("--s", randomBetween(0.6, 1.25).toFixed(2));
    style.setProperty("--t", `${randomBetween(0, 0.05).toFixed(3)}s`);
  });
}

function aimWeaponToward(directionX, directionY) {
  if (Math.abs(directionX) > 4) aimFacingLeft = directionX < 0;
  const angle = Math.atan2(directionY, Math.abs(directionX)) * 180 / Math.PI;
  const armAim = Math.max(-70, Math.min(70, angle)) - 90;
  player.style.setProperty("--arm-aim", `${armAim.toFixed(1)}deg`);
  player.classList.toggle("is-facing-left", aimFacingLeft);
  player.classList.add("is-aiming");
  aimHoldRemaining = 0.45;
}

function animateShot() {
  const motionKind = player.dataset.weaponMotion;
  const motion = weaponEffects[runWeaponId]?.motion ?? 240;
  const duration = motionKind === "melee"
    ? Math.round(Math.min(shootInterval * 1000 * 0.92, Math.max(300, motion)))
    : motionKind === "gun"
      ? Math.round(Math.min(170, Math.max(90, shootInterval * 1000 * 0.42)))
      : motion;
  player.style.setProperty("--shot-time", `${duration}ms`);
  player.classList.remove("is-shooting");
  void player.offsetWidth;
  player.classList.add("is-shooting");
  window.clearTimeout(shootingReset);
  shootingReset = window.setTimeout(() => {
    player.classList.remove("is-shooting");
  }, duration);
}

function playWeaponDraw() {
  player.classList.remove("is-drawing");
  void player.offsetWidth;
  player.classList.add("is-drawing");
  window.clearTimeout(weaponDrawReset);
  weaponDrawReset = window.setTimeout(() => player.classList.remove("is-drawing"), 750);
}

function getRunWeaponDamage(weapon, slot) {
  return getWeaponStats(weapon).damage + getPermanentDamageBonus() + weaponLevel - 1
    + (slot === "ranged" ? runPickupBonus : 0);
}

function applyRunWeapon() {
  const weapon = loadoutOptions.weapons.find((item) => item.id === runLoadout[activeWeaponSlot]);
  if (!weapon) throw new Error(`Arme de partie inconnue : ${runLoadout[activeWeaponSlot]}`);
  runWeaponId = weapon.id;
  weaponDamage = getRunWeaponDamage(weapon, activeWeaponSlot);
  shootInterval = getWeaponStats(weapon).interval;
  projectilesPerShot = weapon.projectiles;
  shootElapsed = Math.min(shootElapsed, shootInterval);
  applyCharacterAppearance(
    player,
    progression.equipped.characters,
    progression.equipped.skins,
    progression.equipped.equipment,
    runWeaponId,
  );
  updateCombatLoadout();
}

function selectWeaponSlot(slot) {
  if (!gameActive || slot === activeWeaponSlot || !runLoadout[slot]) return;
  activeWeaponSlot = slot;
  applyRunWeapon();
  playWeaponDraw();
  playSound("weapon-swap", slot);
}

// Quand le tireur se tient devant une façade, son buste chevauche la silhouette : le tir est
// alors testé au niveau de ses pieds, il bute sur le mur s'il part vers lui et passe sinon.
function getShotBlockProgress(startX, startY, endX, endY) {
  let closestProgress = Infinity;
  for (const shape of getObstacleShapes()) {
    const lift = isInsideShape(startX, startY, shape) ? getPlayerBody().footDrop : 0;
    const fromY = startY + lift;
    const toY = endY + lift;
    if (Math.max(startX, endX) < shape.minX || Math.min(startX, endX) > shape.maxX
      || Math.max(fromY, toY) < shape.minY || Math.min(fromY, toY) > shape.maxY) continue;
    if (lift && isInsideShape(startX, fromY, shape)) continue;
    const { points } = shape;
    for (let index = 0, previous = points.length - 1; index < points.length; previous = index, index += 1) {
      const progress = segmentsIntersection(startX, fromY, endX, toY, ...points[previous], ...points[index]);
      if (progress !== null && progress < closestProgress) closestProgress = progress;
    }
  }
  return closestProgress;
}

function findHitsOnPath(startX, startY, endX, endY) {
  const pathX = endX - startX;
  const pathY = endY - startY;
  const pathLengthSquared = pathX * pathX + pathY * pathY;
  const center = playerCenter();
  const maximumTargetDistance = playerAttackRange * scaleActor();
  const blockProgress = getShotBlockProgress(startX, startY, endX, endY);
  const hits = [];

  for (const enemy of enemies) {
    if (Math.hypot(enemy.x - center.x, enemy.y - center.y) > maximumTargetDistance) continue;
    const offsetX = enemy.x - startX;
    const offsetY = enemy.y - startY;
    const progress = Math.max(0, Math.min(1, (offsetX * pathX + offsetY * pathY) / pathLengthSquared));
    const nearestX = startX + progress * pathX;
    const nearestY = startY + progress * pathY;
    const distance = Math.hypot(enemy.x - nearestX, enemy.y - nearestY);

    const projectileRadius = 8 * Math.max(0.48, Math.min(1, playWorldWidth() / 1160));
    const reach = getEnemyHitRadius(enemy) + projectileRadius;
    if (distance > reach) continue;
    const contactProgress = Math.max(0, progress - Math.sqrt(reach * reach - distance * distance) / Math.sqrt(pathLengthSquared));
    if (contactProgress <= blockProgress) hits.push({ enemy, progress: contactProgress });
  }

  return hits.sort((a, b) => a.progress - b.progress);
}

function hasClearShot(enemy) {
  const center = playerCenter();
  const length = Math.hypot(enemy.x - center.x, enemy.y - center.y);
  if (length < 1) return true;
  const reach = getEnemyHitRadius(enemy) / length;
  return getShotBlockProgress(center.x, center.y, enemy.x, enemy.y) >= 1 - reach;
}

function fireStone(targetX, targetY, volley = true, withSound = true) {
  if (!gameActive) return;

  const center = playerCenter();
  const scale = scaleActor();
  const directionX = targetX - center.x;
  const directionY = targetY - center.y;
  const directionLength = Math.hypot(directionX, directionY);
  if (directionLength < 1) return;
  const runWeapon = loadoutOptions.weapons.find((item) => item.id === runWeaponId);
  if (runWeapon?.melee) {
    swingBlade(directionX, directionY, runWeapon);
    return;
  }
  const volleyEffect = weaponEffects[runWeaponId] ?? {};
  if (volley && projectilesPerShot > 1 && volleyEffect.spread) {
    const baseAngle = Math.atan2(directionY, directionX);
    for (let index = 0; index < projectilesPerShot; index += 1) {
      const spreadAngle = baseAngle + (index - (projectilesPerShot - 1) / 2) * volleyEffect.spread * Math.PI / 180;
      fireStone(center.x + Math.cos(spreadAngle) * directionLength, center.y + Math.sin(spreadAngle) * directionLength, false, index === 0);
    }
    return;
  }
  if (volley && projectilesPerShot > 1) {
    const perpendicularX = -directionY / directionLength;
    const perpendicularY = directionX / directionLength;
    for (let index = 0; index < projectilesPerShot; index += 1) {
      const offset = (index - (projectilesPerShot - 1) / 2) * 18;
      fireStone(targetX + perpendicularX * offset, targetY + perpendicularY * offset, false, index === 0 || projectilesPerShot <= 3);
    }
    return;
  }
  const muzzleOffset = 18;
  const startX = center.x + directionX / directionLength * muzzleOffset;
  const startY = center.y + directionY / directionLength * muzzleOffset;
  const aimX = targetX - startX;
  const aimY = targetY - startY;
  const aimDistance = Math.hypot(aimX, aimY);
  if (aimDistance < 1) return;
  const rangeFactor = weaponEffects[runWeaponId]?.range ?? 1;
  const shotDistance = Math.min(aimDistance, Math.max(0, playerAttackRange * rangeFactor * scale - muzzleOffset));
  const shotEndX = startX + aimX / aimDistance * shotDistance;
  const shotEndY = startY + aimY / aimDistance * shotDistance;
  const blockProgress = getShotBlockProgress(startX, startY, shotEndX, shotEndY);
  const unclippedEndX = startX + (shotEndX - startX) * Math.min(blockProgress, 1);
  const unclippedEndY = startY + (shotEndY - startY) * Math.min(blockProgress, 1);
  const effect = weaponEffects[runWeaponId] ?? {};
  const pathHits = findHitsOnPath(startX, startY, unclippedEndX, unclippedEndY).map((hit) => hit.enemy);
  const hitEnemies = pathHits.slice(0, 1 + (effect.pierce ?? 0));
  const hitEnemy = hitEnemies[0] ?? null;
  const lastHit = effect.pierce ? null : hitEnemy;
  const boundedEndX = lastHit?.x ?? unclippedEndX;
  const boundedEndY = lastHit?.y ?? unclippedEndY;
  const distanceX = boundedEndX - startX;
  const distanceY = boundedEndY - startY;
  const distance = Math.hypot(distanceX, distanceY);

  if (distance < 1) return;

  const weapon = loadoutOptions.weapons.find((item) => item.id === runWeaponId);
  if (!weapon) throw new Error(`Arme de partie inconnue : ${runWeaponId}`);
  if (withSound) playSound("shoot", weapon.id);
  aimWeaponToward(directionX, directionY);
  animateShot();
  const shotRound = roundId;
  const kind = shotKinds[weapon.id] ?? "seed";
  const angle = Math.atan2(distanceY, distanceX) * 180 / Math.PI;
  createMuzzleFlash(startX, startY, angle, kind, effect.fx);
  const stone = document.createElement("span");
  stone.className = `stone shot shot-${kind}${effect.fx ? ` shot-fx-${effect.fx}` : ""}`;
  stone.setAttribute("aria-hidden", "true");
  stone.style.left = `${startX}px`;
  stone.style.top = `${startY}px`;
  const trail = document.createElement("span");
  trail.className = "shot-trail";
  const core = document.createElement("span");
  core.className = "shot-core";
  if (kind === "rune") core.textContent = "ᚱ";
  stone.append(trail, core);
  world.append(stone);

  const arc = lobbedShots.has(kind) ? Math.min(26, distance * 0.12) : 0;
  const frames = [{ transform: `translate(0px, 0px) rotate(${angle}deg)` }];
  if (arc) frames.push({ transform: `translate(${distanceX / 2}px, ${distanceY / 2 - arc}px) rotate(${angle}deg)` });
  frames.push({ transform: `translate(${distanceX}px, ${distanceY}px) rotate(${angle}deg)` });
  const flight = stone.animate(frames, {
    duration: Math.min(800 / motionScale(), Math.max(90, distance * shotSpeeds[kind] / motionScale())),
    easing: "linear",
  });

  flight.addEventListener("finish", () => {
    stone.remove();
    if (shotRound !== roundId || !gameActive) return;
    const bonusDamage = activeBoostId === "puissance" && activeBoostRemaining > 0 ? 2 : 0;
    const baseDamage = weaponDamage + bonusDamage;
    hitEnemies.forEach((enemy, index) => {
      if (!enemies.has(enemy)) return;
      const impactX = enemy.x;
      const impactY = enemy.y;
      applyGunHit(enemy, effect, baseDamage * (index === 0 ? 1 : 0.7), angle);
      if (effect.pierce) createImpact(impactX, impactY, kind, angle, true, effect.fx);
    });
    if (!effect.pierce || hitEnemies.length === 0) {
      createImpact(boundedEndX, boundedEndY, kind, angle, Boolean(hitEnemy), effect.fx);
    }
    if (effect.chain && hitEnemy) chainWeaponLightning(hitEnemy, effect, baseDamage, scale);
    if (effect.splash) {
      createShadowBlast(boundedEndX, boundedEndY, effect.splash * scale);
      for (const enemy of [...enemies]) {
        if (enemy === hitEnemy) continue;
        if (Math.hypot(enemy.x - boundedEndX, enemy.y - boundedEndY) > effect.splash * scale + getEnemyHitRadius(enemy) * 0.5) continue;
        damageEnemy(enemy, baseDamage * effect.splashRatio, { knockback: false });
        if (enemies.has(enemy)) applyEnemyKnockback(enemy, { x: boundedEndX, y: boundedEndY }, 14 * scale);
      }
    }
  }, { once: true });
}

function applyGunHit(enemy, effect, rawDamage, angle) {
  let damage = rawDamage;
  if (effect.critChance && Math.random() < effect.critChance) {
    damage *= effect.critMultiplier;
    showCritText(enemy.x, enemy.y);
  }
  damageEnemy(enemy, damage, { knockback: !effect.knockback });
  if (!enemies.has(enemy)) return;
  if (effect.knockback) {
    const radians = angle * Math.PI / 180;
    const strength = enemy.typeName === "boss" ? 0.35 : 1;
    applyEnemyKnockback(enemy, { x: enemy.x - Math.cos(radians), y: enemy.y - Math.sin(radians) }, effect.knockback * scaleActor() * strength);
  }
  if (effect.burn) igniteEnemy(enemy, effect.burn, effect.burnDuration);
  if (effect.slow) slowEnemy(enemy, effect.slow, effect.slowFactor);
  if (effect.stun) stunEnemy(enemy, effect.stun);
  if (effect.freezeChance && Math.random() < effect.freezeChance) freezeEnemyBriefly(enemy, effect.freeze);
}

function freezeEnemyBriefly(enemy, duration) {
  if (!enemies.has(enemy) || isMegaBoss(enemy)) return;
  stunEnemy(enemy, duration);
  enemy.element.classList.add("enemy-frozen");
  const frozenRound = roundId;
  window.setTimeout(() => {
    if (frozenRound === roundId && enemies.has(enemy) && !(enemy.frozenRemaining > 0)) enemy.element.classList.remove("enemy-frozen");
  }, duration * 1000);
  const shards = createFxLayer("pfx pfx-ice", enemy.x, enemy.y, 900);
  shards.style.setProperty("--r", "44px");
  addFxParts(shards, "pfx-shard", 7, (style, index) => scatterFx(style, index, 7, 18, 44));
  addFxParts(shards, "pfx-flash");
}

function chainWeaponLightning(firstEnemy, effect, baseDamage, scale) {
  const struck = [firstEnemy];
  let from = { x: firstEnemy.x, y: firstEnemy.y - 10 * scale };
  const castRound = roundId;
  for (let hop = 0; hop < effect.chain; hop += 1) {
    const origin = from;
    const next = [...enemies]
      .filter((enemy) => !struck.includes(enemy) && enemy.spawnRemaining <= 0
        && Math.hypot(enemy.x - origin.x, enemy.y - origin.y) <= effect.chainRange * scale)
      .sort((a, b) => Math.hypot(a.x - origin.x, a.y - origin.y) - Math.hypot(b.x - origin.x, b.y - origin.y))[0];
    if (!next) break;
    struck.push(next);
    const to = { x: next.x, y: next.y - 10 * scale };
    createLightningBolt(from, to, hop * 60);
    window.setTimeout(() => {
      if (castRound !== roundId || !enemies.has(next)) return;
      damageEnemy(next, baseDamage * 0.6, { knockback: false });
      if (effect.stun) stunEnemy(next, effect.stun);
    }, hop * 60);
    from = to;
  }
}

function createShadowBlast(x, y, radius) {
  const layer = createFxLayer("pfx pfx-shadow-blast", x, y, 800);
  layer.style.setProperty("--r", `${Math.round(radius)}px`);
  addFxParts(layer, "pfx-flash");
  addFxParts(layer, "pfx-ring");
  addFxParts(layer, "pfx-shadow-orb");
  addFxParts(layer, "pfx-shadow-wisp", 8, (style, index) => scatterFx(style, index, 8, radius * 0.5, radius * 1.1, { scaleMin: 0.6, scaleMax: 1.2 }));
}

function createSlashFx(center, angle, reach, weapon, effect, mirrored = false) {
  const slash = createFxLayer(`slash-fx${effect.fx ? ` slash-${effect.fx}` : ""}${mirrored ? " is-mirrored" : ""}`, center.x, center.y, 520);
  slash.style.setProperty("--angle", `${angle * 180 / Math.PI}deg`);
  slash.style.setProperty("--reach", `${reach}px`);
  slash.style.setProperty("--arc", `${weapon.melee.arc}deg`);
  slash.style.setProperty("--slash-color", weapon.melee.color);
  addFxParts(slash, "slash-arc");
  addFxParts(slash, "slash-edge");
  const particle = {
    rust: "slash-flake", ember: "slash-ember", ghost: "slash-wisp",
    axe: "slash-chip", hammer: "slash-dust", poison: "slash-venom", katana: "slash-petal",
  }[effect.fx];
  if (particle) {
    addFxParts(slash, particle, 7, (style) => {
      const spread = weapon.melee.arc / 2;
      style.setProperty("--a", `${(angle * 180 / Math.PI + randomBetween(-spread, spread) + 90).toFixed(1)}deg`);
      style.setProperty("--d", `${(reach * randomBetween(0.7, 1.05)).toFixed(1)}px`);
      style.setProperty("--t", `${randomBetween(0.02, 0.14).toFixed(3)}s`);
      style.setProperty("--s", randomBetween(0.6, 1.3).toFixed(2));
    });
  }
  if (effect.fx === "knight" || effect.fx === "spear") addFxParts(slash, "slash-glint");
  if (effect.thrust) addFxParts(slash, "slash-thrust");
  if (effect.wave) {
    slash.style.setProperty("--wave", String(effect.wave));
    addFxParts(slash, "slash-crescent");
  }
}

function bladeHitsInArc(center, angle, reach, halfArc, minimumReach = 0) {
  return [...enemies].filter((enemy) => {
    const offsetX = enemy.x - center.x;
    const offsetY = enemy.y - center.y;
    const distance = Math.hypot(offsetX, offsetY);
    const hitRadius = getEnemyHitRadius(enemy);
    if (distance - hitRadius > reach || distance + hitRadius < minimumReach) return false;
    let angleGap = Math.abs(Math.atan2(offsetY, offsetX) - angle);
    if (angleGap > Math.PI) angleGap = 2 * Math.PI - angleGap;
    if (angleGap > halfArc + Math.atan2(hitRadius, Math.max(distance, 1))) return false;
    return hasClearShot(enemy);
  });
}

let bladeLifestealCooldown = 0;

function applyBladeHit(enemy, effect, damage, center, angle) {
  let finalDamage = damage;
  if (effect.critChance && Math.random() < effect.critChance) {
    finalDamage *= effect.critMultiplier;
    showCritText(enemy.x, enemy.y);
  }
  damageEnemy(enemy, finalDamage, { knockback: !effect.knockback });
  createImpact(enemy.x, enemy.y, "slash", angle * 180 / Math.PI, true, effect.fx);
  if (!enemies.has(enemy)) return;
  if (effect.knockback) {
    applyEnemyKnockback(enemy, center, effect.knockback * scaleActor() * (enemy.typeName === "boss" ? 0.3 : 1));
  }
  if (effect.bleed) applyDamageOverTime(enemy, "bleed", effect.bleed, effect.bleedDuration);
  if (effect.poison) applyDamageOverTime(enemy, "poison", effect.poison, effect.poisonDuration);
  if (effect.burn) igniteEnemy(enemy, effect.burn, effect.burnDuration);
  if (effect.slow) slowEnemy(enemy, effect.slow, effect.slowFactor);
  if (effect.stun) stunEnemy(enemy, effect.stun);
}

function createHammerShock(x, y, radius) {
  const layer = createFxLayer("pfx pfx-quake pfx-hammer-shock", x, y, 1000);
  layer.style.setProperty("--r", `${Math.round(radius)}px`);
  addFxParts(layer, "pfx-crater");
  addFxParts(layer, "pfx-shockwave");
  addFxParts(layer, "pfx-crack", 6, (style, index) => {
    style.setProperty("--a", `${(index * 60) + randomBetween(-15, 15)}deg`);
    style.setProperty("--d", `${randomBetween(radius * 0.5, radius).toFixed(1)}px`);
    style.setProperty("--t", "0s");
  });
  addFxParts(layer, "pfx-dust", 7, (style, index) => scatterFx(style, index, 7, radius * 0.4, radius, { scaleMin: 0.6, scaleMax: 1.3 }));
  shakeArena("light");
}

function swingBlade(directionX, directionY, weapon) {
  const center = playerCenter();
  const reach = weapon.melee.reach * scaleActor();
  const halfArc = weapon.melee.arc * Math.PI / 360;
  const angle = Math.atan2(directionY, directionX);
  const effect = weaponEffects[weapon.id] ?? {};
  playSound("shoot", weapon.id);
  aimWeaponToward(directionX, directionY);
  animateShot();
  createSlashFx(center, angle, reach, weapon, effect);
  const damage = weaponDamage + (activeBoostId === "puissance" && activeBoostRemaining > 0 ? 2 : 0);
  const hits = bladeHitsInArc(center, angle, reach, halfArc);
  for (const enemy of hits) applyBladeHit(enemy, effect, damage, center, angle);
  if (effect.wave) {
    for (const enemy of bladeHitsInArc(center, angle, reach * effect.wave, halfArc, reach)) {
      if (!hits.includes(enemy)) applyBladeHit(enemy, effect, damage * effect.waveRatio, center, angle);
    }
  }
  if (effect.shock) {
    const impact = { x: center.x + Math.cos(angle) * reach * 0.7, y: center.y + Math.sin(angle) * reach * 0.7 };
    const shockRadius = effect.shock * scaleActor();
    const swingRound = roundId;
    window.setTimeout(() => {
      if (swingRound !== roundId || !gameActive) return;
      createHammerShock(impact.x, impact.y, shockRadius);
      for (const enemy of enemiesWithin(impact.x, impact.y, shockRadius)) {
        if (hits.includes(enemy)) continue;
        damageEnemy(enemy, damage * effect.shockRatio, { knockback: false });
        if (enemies.has(enemy)) applyEnemyKnockback(enemy, impact, isMegaBoss(enemy) ? 0 : 30 * scaleActor());
      }
    }, effect.motion * 0.45);
  }
  if (hits.length > 0) playSound("blade-hit", weapon.id);
  if (effect.lifesteal && hits.length > 0 && performance.now() >= bladeLifestealCooldown) {
    bladeLifestealCooldown = performance.now() + 900;
    healPlayer(effect.lifesteal);
  }
  if (effect.echo) {
    const swingRound = roundId;
    window.setTimeout(() => {
      if (swingRound !== roundId || !gameActive) return;
      const echoCenter = playerCenter();
      createSlashFx(echoCenter, angle, reach, weapon, effect, true);
      playSound("shoot", weapon.id);
      const echoHits = bladeHitsInArc(echoCenter, angle, reach, halfArc);
      for (const enemy of echoHits) applyBladeHit(enemy, effect, damage * effect.echo, echoCenter, angle);
      if (echoHits.length > 0) playSound("blade-hit", weapon.id);
    }, 130);
  }
}

function isTargetInWeaponReach(target) {
  const weapon = loadoutOptions.weapons.find((item) => item.id === runWeaponId);
  if (!weapon?.melee) return true;
  const center = playerCenter();
  const hitRadius = target.element ? getEnemyHitRadius(target) : 0;
  return Math.hypot(target.x - center.x, target.y - center.y) - hitRadius <= weapon.melee.reach * scaleActor() * 1.1;
}

function currentAim() {
  if (shootingWithPointer) return aim;
  const origin = playerCenter();
  const distances = [
    facing.x > 0 ? (playWorldWidth() - origin.x) / facing.x : facing.x < 0 ? -origin.x / facing.x : Infinity,
    facing.y > 0 ? (playWorldHeight() - origin.y) / facing.y : facing.y < 0 ? -origin.y / facing.y : Infinity,
  ];
  const distance = Math.min(...distances);
  return { x: origin.x + facing.x * distance, y: origin.y + facing.y * distance };
}

let shootingWithPointer = false;

function nearestEnemy() {
  const center = playerCenter();
  let nearest = null;
  let nearestDistance = Infinity;
  let nearestVisible = null;
  let nearestVisibleDistance = Infinity;

  for (const enemy of enemies) {
    const distance = Math.hypot(enemy.x - center.x, enemy.y - center.y);
    const targetRange = (enemy.typeName === "boss" ? playerAttackRange : autoShootRange) * scaleActor();
    if (distance > targetRange) continue;
    if (distance < nearestDistance) {
      nearest = enemy;
      nearestDistance = distance;
    }
    if (distance < nearestVisibleDistance && hasClearShot(enemy)) {
      nearestVisible = enemy;
      nearestVisibleDistance = distance;
    }
  }
  return nearestVisible ?? nearest;
}

function startShooting(usePointer) {
  if (!gameActive || waveCountdown > 0) return;
  shooting = true;
  shootingWithPointer = usePointer;
  shootElapsed = 0;
  const target = currentAim();
  fireStone(target.x, target.y);
}

function stopShooting() {
  shooting = false;
  shootingWithPointer = false;
}

function spawnBossMinion(bossName, count = 1) {
  if (!Number.isSafeInteger(count) || count < 1 || count > 8) throw new Error(`Nombre de sbires invalide : ${count}`);
  if (bossName && !bossMinionPools[bossName]) throw new Error(`Boss sans famille de sbires : ${bossName}`);
  const currentBossName = bossName ?? (stage === "boss-wave"
    ? "bouffon-frondeur"
    : stage === "portal" || stage === "ultimate" ? "mega-cauchemar" : waves[waveNumber - 1]?.bosses[0]);
  const availableTypes = currentBossName ? bossMinionPools[currentBossName] : undefined;
  if (!availableTypes) throw new Error(`Aucune famille de sbires pour la vague ${waveNumber}.`);
  const firstType = Math.floor(Math.random() * availableTypes.length);
  for (let index = 0; index < count && enemies.size < getEnemyCap(); index += 1) {
    const minionType = availableTypes[(firstType + index) % availableTypes.length];
    const spawnSide = stage === "ultimate" ? index % 2 === 0 ? "left" : "right" : true;
    createEnemy(minionType, true, spawnSide);
  }
}

function currentShotDamage() {
  const ids = [runLoadout.ranged, runLoadout.melee, progression.equipped.weapons, progression.equipped.melee];
  let best = 2;
  for (const id of ids) {
    if (!id) continue;
    const weapon = loadoutOptions.weapons.find((item) => item.id === id);
    if (!weapon) continue;
    best = Math.max(best, getWeaponStats(weapon).damage + getPermanentDamageBonus());
  }
  return best;
}

function threatHealth(baseHealth, hits) {
  return Math.max(Math.ceil(baseHealth), Math.round(currentShotDamage() * hits));
}

function createEnemy(typeName, isMinion = false, spawnFromEdge = false) {
  const base = enemyTypes[typeName];
  const waveProgress = Math.max(0, Math.min(4, waveNumber - 1));
  const lateWave = waveNumber >= 3 && stage !== "ultimate";
  const healthScaling = (1 + waveProgress * 0.32) * (lateWave ? 1.2 : 1);
  const damageScaling = (1 + waveProgress * 0.28) * (lateWave ? 1.18 : 1);
  const minionScale = isMinion ? 0.9 : 1;
  const hits = isMinion ? 4 + Math.floor(waveProgress) : 5 + waveProgress * 2;
  const enemy = createCharacter(typeName, {
    ...base,
    health: threatHealth(base.health * healthScaling * minionScale, hits),
    damage: Math.ceil(base.damage * damageScaling * minionScale * 1.35),
    speed: base.speed + Math.min(22, waveProgress * 3) + (lateWave ? 5 : 0),
    size: Math.round(base.size * (isMinion ? 0.9 : 1)),
  }, isMinion ? "enemy-minion" : "", spawnFromEdge);
  enemy.isMinion = isMinion;
  return enemy;
}

function getBossTier() {
  if (stage === "ultimate") return 4;
  if (stage === "boss-wave") return 3;
  return Math.max(0, Math.min(2, waveNumber - 1));
}

function createBoss(profileName) {
  const profile = bossTypes.find((boss) => boss.name === profileName);
  if (!profile) throw new Error(`Type de boss inconnu : ${profileName}`);
  const tier = getBossTier();
  const lateBoss = profile.name !== "mega-cauchemar" && (stage === "boss-wave" || waveNumber >= 3);
  const type = {
    ...profile,
    label: `${profile.label} ${"★".repeat(tier + 1)}`,
    health: threatHealth(profile.health * (1 + tier * 0.6) * (lateBoss ? 1.22 : 1), profile.name === "mega-cauchemar" ? 48 : 18 + tier * 8),
    damage: Math.round(profile.damage * (1 + tier * 0.38) * (lateBoss ? 1.32 : 1.15)),
    speed: profile.speed + tier * 4 + (lateBoss ? 5 : 0),
    size: profile.size + tier * 3,
    color: "boss",
    equipment: profile.name,
  };
  const boss = createCharacter("boss", type, `enemy-boss enemy-boss-${profile.name}`);
  boss.bossTier = tier;
  boss.element.dataset.bossTier = String(tier + 1);
  const spawn = bossSpawnPoints[profile.name] ?? { x: boss.x / playWorldWidth(), y: boss.y / playWorldHeight(), style: "throne" };
  const scale = Math.max(0.48, Math.min(1, playWorldWidth() / 1160));
  const spot = findFreeSpot(
    playWorldWidth() * spawn.x,
    playWorldHeight() * spawn.y,
    type.size * scale * characterScale * 0.38,
  );
  boss.x = spot.x;
  boss.y = spot.y;
  boss.element.style.left = `${boss.x}px`;
  boss.element.style.top = `${boss.y}px`;
  boss.spawnPoint = { x: boss.x / playWorldWidth(), y: boss.y / playWorldHeight() };
  boss.spawnRemaining = bossSpawnDuration;
  boss.element.classList.add("boss-spawning", `boss-spawn-${spawn.style}`);
  createBossSpawnEffect(boss.x, boss.y, spawn.style);
  const spawnRound = roundId;
  window.setTimeout(() => {
    if (spawnRound === roundId) boss.element.classList.remove("boss-spawning", `boss-spawn-${spawn.style}`);
  }, bossSpawnDuration * 1000);
  boss.behavior = profile.behavior;
  boss.phase = Math.random() * Math.PI * 2;
  boss.profileName = profile.name;
  if (profile.name === "mega-cauchemar") {
    boss.bossPhase = 1;
    boss.attackIndex = 0;
    boss.attackCooldown = 1.6;
    boss.attackWindup = 0;
    setBossAnimationState(boss, "appearing", 0.95);
    boss.element.dataset.phase = "1";
  }
  bossAlive = true;
  if (bossMinionPools[profile.name]) {
    spawnBossMinion(profile.name, Math.min(8, 3 + tier));
  }
  roundMessage.textContent = `${profile.label} ${bossSpawnMessages[spawn.style] ?? `— vague ${waveNumber}`} Danger ${"★".repeat(tier + 1)}`;
  roundMessage.hidden = false;
  window.setTimeout(() => {
    roundMessage.hidden = true;
  }, 1400);
  playSound("boss-arrive", profile.name);
  return boss;
}

function createBossSpawnEffect(x, y, style) {
  const effect = document.createElement("span");
  effect.className = `boss-spawn-fx boss-spawn-fx-${style}`;
  effect.setAttribute("aria-hidden", "true");
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;
  const ring = document.createElement("span");
  ring.className = "boss-spawn-ring";
  const glow = document.createElement("span");
  glow.className = "boss-spawn-glow";
  effect.append(glow, ring);
  const particleSymbols = { scarecrow: ["🍂", "🍁", "🌾"], stage: ["", "", "★"] };
  for (let index = 0; index < 14; index += 1) {
    const particle = document.createElement("span");
    particle.className = "boss-spawn-particle";
    const symbols = particleSymbols[style];
    if (symbols) particle.textContent = symbols[index % symbols.length];
    particle.style.setProperty("--angle", `${(index / 14) * 360 + Math.random() * 18}deg`);
    particle.style.setProperty("--distance", `${70 + Math.random() * 70}px`);
    particle.style.setProperty("--hue", `${Math.round(Math.random() * 360)}`);
    particle.style.setProperty("--delay", `${(Math.random() * 0.35).toFixed(2)}s`);
    effect.append(particle);
  }
  world.append(effect);
  if (style === "grave" || style === "stage" || style === "scarecrow") {
    window.setTimeout(() => shakeArena(), style === "grave" ? 250 : 1050);
  }
  window.setTimeout(() => effect.remove(), 2200);
}

function createCharacter(typeName, type, extraClass = "", spawnFromEdge = false) {
  const scale = Math.max(0.48, Math.min(1, playWorldWidth() / 1160));
  const radius = type.size * scale * characterScale * 0.38;
  const { x, y } = findEnemySpawnPoint(radius, 180 * scale, spawnFromEdge);

  const element = document.createElement("span");
  element.className = `enemy enemy-${type.color} ${extraClass}`.trim();
  element.setAttribute("role", "img");
  element.setAttribute("aria-label", `${type.label}, ${type.health} points de vie`);
  element.style.width = `${type.size}px`;
  element.style.height = `${type.size}px`;
  const makePart = (className) => {
    const part = document.createElement("span");
    part.className = className;
    part.setAttribute("aria-hidden", "true");
    return part;
  };
  const shadow = makePart("enemy-shadow");
  const cape = makePart("enemy-cape");
  const leftLeg = makePart("enemy-limb enemy-leg enemy-leg-left");
  const rightLeg = makePart("enemy-limb enemy-leg enemy-leg-right");
  const leftArm = makePart("enemy-limb enemy-arm enemy-arm-left");
  const rightArm = makePart("enemy-limb enemy-arm enemy-arm-right");
  const torso = makePart("enemy-torso");
  const head = makePart("enemy-head");
  const healthBar = document.createElement("span");
  healthBar.className = "enemy-health";
  const healthFill = document.createElement("span");
  healthFill.className = "enemy-health-fill";
  healthFill.style.width = "100%";
  healthBar.append(healthFill);
  const eyes = document.createElement("span");
  eyes.className = "enemy-eye";
  const mouth = document.createElement("span");
  mouth.className = "enemy-mouth";
  const armor = document.createElement("span");
  armor.className = `enemy-armor enemy-armor-${type.equipment}`;
  armor.setAttribute("aria-hidden", "true");
  const scar = document.createElement("span");
  scar.className = "enemy-scar";
  scar.setAttribute("aria-hidden", "true");
  const hat = document.createElement("span");
  hat.className = `enemy-hat enemy-hat-${type.equipment}`;
  hat.setAttribute("aria-hidden", "true");
  const weapon = document.createElement("span");
  weapon.className = `enemy-weapon enemy-weapon-${type.equipment}`;
  weapon.setAttribute("aria-hidden", "true");
  const bossArtFiles = {
    "fossoyeur-maudit": "boss-fossoyeur.png",
    "epouvantail-automne": "boss-epouvantail.png",
    "maitre-des-cauchemars": "boss-cauchemars.png",
    "bouffon-frondeur": "boss-bouffon.png",
    "mega-cauchemar": "boss-chambellan.png",
  };
  const bossArtFile = typeName === "boss" ? bossArtFiles[type.equipment] : undefined;
  const bossArt = bossArtFile ? createRigArt("enemy-boss-art", bossArtFile.replace(".png", "")) : undefined;
  const minionArtFiles = {
    grunt: "citrouille.png",
    scout: "citrouille-vive.png",
    brute: "grosse-citrouille.png",
    "serviteur-squelette": "minion-squelette.png",
    "gargouille-epineuse": "minion-gargouille.png",
    "ombre-rampante": "minion-ombre.png",
    "petit-bouffon-frondeur": "minion-bouffon.png",
    "archer-de-lombre": "minion-archer-ombre.png",
    "soldat-de-lombre": "minion-soldat-ombre.png",
    "goule-de-lombre": "minion-goule-ombre.png",
  };
  const minionArtFile = minionArtFiles[typeName];
  const minionArt = minionArtFile
    ? createRigArt(`enemy-minion-art enemy-minion-art-${typeName}`, minionArtFile.replace(".png", ""))
    : undefined;
  if (bossArt || minionArt) element.classList.add("enemy-realistic");
  element.dataset.gait = enemyGaits[typeName === "boss" ? type.equipment : typeName] ?? "walk";
  element.style.setProperty("--gait-delay", `${-Math.random().toFixed(2)}s`);
  element.append(
    shadow, cape, leftLeg, rightLeg, leftArm, rightArm, torso, head,
    healthBar, hat, weapon, armor, scar, eyes, mouth,
    ...(bossArt ? [bossArt] : []), ...(minionArt ? [minionArt] : []),
  );
  world.append(element);
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  const character = {
    element,
    x,
    y,
    typeName,
    health: type.health,
    maxHealth: type.health,
    damage: type.damage,
    speed: type.speed,
    attackCooldown: 0.55 + Math.random() * 0.8,
    attackWindup: 0,
    healthFill,
    label: type.label,
    alerted: false,
    patrolIndex: 0,
    patrolPoints: createPatrolPoints(x, y),
  };
  enemies.add(character);
  if (typeName !== "boss") {
    element.classList.add("enemy-spawn-pop");
    window.setTimeout(() => element.classList.remove("enemy-spawn-pop"), 420);
    const dust = createFxLayer("spawn-fx", x, y + type.size * scale * characterScale * 0.4, 600);
    addFxParts(dust, "spawn-ring");
    addFxParts(dust, "spawn-dust", 5, (style, index) => scatterFx(style, index, 5, 8, 20, { delay: 0.05 }));
  }
  playSound("enemy-spawn", typeName);
  return character;
}

function createPatrolPoints(x, y) {
  const start = Math.random() * Math.PI * 2;
  return [0, 1, 2].map((index) => {
    const angle = start + index * (Math.PI * 2 / 3);
    const reach = 78 + Math.random() * 64;
    return {
      x: Math.max(36, Math.min(playWorldWidth() - 36, x + Math.cos(angle) * reach)),
      y: Math.max(36, Math.min(playWorldHeight() - 36, y + Math.sin(angle) * reach * 0.72)),
    };
  });
}

function findEnemySpawnPoint(radius, minPlayerDistance, spawnFromEdge = false) {
  const bounds = {
    left: playWorldWidth() * 0.018 + radius,
    right: playWorldWidth() * 0.982 - radius,
    top: playWorldHeight() * 0.025 + radius,
    bottom: playWorldHeight() * 0.975 - radius,
  };
  const chooseZone = () => {
    if (spawnFromEdge) {
      const edge = spawnFromEdge === "left" ? 3
        : spawnFromEdge === "right" ? 1
          : Math.floor(Math.random() * 4);
      const inset = Math.min(0.1, 48 / Math.min(playWorldWidth(), playWorldHeight()));
      if (edge === 1) return { name: "bord droit", bounds: [0.98 - inset, 0.025, 0.98, 0.975] };
      if (edge === 3) return { name: "bord gauche", bounds: [0.02, 0.025, 0.02 + inset, 0.975] };
      if (edge === 0) return { name: "bord supérieur", bounds: [0.02, 0.025, 0.98, 0.025 + inset] };
      if (edge === 2) return { name: "bord inférieur", bounds: [0.02, 0.975 - inset, 0.98, 0.975] };
      throw new Error(`Côté d'apparition invalide : ${spawnFromEdge}`);
    }
    if (stage === "ultimate") {
      return { name: "salle du trône", weight: 1, bounds: [0.08, 0.12, 0.92, 0.82] };
    }
    const totalWeight = enemySpawnZones.reduce((total, zone) => total + zone.weight, 0);
    let selection = Math.random() * totalWeight;
    return enemySpawnZones.find((zone) => {
      selection -= zone.weight;
      return selection < 0;
    }) ?? enemySpawnZones[0];
  };
  const isValid = (x, y) => {
    const center = playerCenter();
    const insideArena = x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
    return insideArena && Math.hypot(x - center.x, y - center.y) >= minPlayerDistance && canOccupy(x, y, radius)
      && isInMainArea(x, y, radius);
  };

  for (let attempt = 0; attempt < 120; attempt += 1) {
    const [left, top, right, bottom] = chooseZone().bounds;
    const x = (left + Math.random() * (right - left)) * playWorldWidth();
    const y = (top + Math.random() * (bottom - top)) * playWorldHeight();
    if (isValid(x, y)) return { x, y };
  }

  // Si le bord demandé est fermé par des bâtiments, on apparaît dans la colonne accessible la plus proche.
  const fallbackZones = spawnFromEdge === "left"
    ? [{ name: "bord gauche", bounds: [0.02, 0.025, 0.45, 0.975] }]
    : spawnFromEdge === "right"
      ? [{ name: "bord droit", bounds: [0.55, 0.025, 0.98, 0.975] }]
      : spawnFromEdge
        ? [{ name: "terrain", bounds: [0.02, 0.025, 0.98, 0.975] }]
        : enemySpawnZones;
  for (const zone of fallbackZones) {
    const [left, top, right, bottom] = zone.bounds;
    const columns = [];
    for (let x = left; x <= right; x += 0.025) columns.push(x);
    if (spawnFromEdge === "right") columns.reverse();
    for (const x of columns) {
      const candidates = [];
      for (let y = top; y <= bottom; y += 0.025) {
        const candidateX = x * playWorldWidth();
        const candidateY = y * playWorldHeight();
        if (isValid(candidateX, candidateY)) candidates.push({ x: candidateX, y: candidateY });
      }
      if (candidates.length) return candidates[Math.floor(Math.random() * candidates.length)];
    }
  }

  throw new Error(spawnFromEdge
    ? "Aucun point de spawn libre sur les bords de l'arène."
    : "Aucun point de spawn libre dans la forêt ou le cimetière.");
}

function damageEnemy(enemy, rawDamage, { knockback = true } = {}) {
  if (!enemies.has(enemy) || enemy.spawnRemaining > 0) return;
  enemy.alerted = true;
  const damage = rawDamage * (enemy.poisonRemaining > 0 ? 1.25 : 1)
    * (enemy.timeStoppedUntil > performance.now() ? 1.5 : 1);
  enemy.health = Math.max(0, enemy.health - damage);
  enemy.healthFill.style.width = `${(enemy.health / enemy.maxHealth) * 100}%`;
  enemy.element.setAttribute("aria-label", `${enemy.label}, ${Math.ceil(enemy.health)} points de vie`);
  showDamageNumber(enemy, damage);
  if (knockback) applyEnemyKnockback(enemy, playerCenter(), enemy.typeName === "boss" ? 12 : 30);
  playSound("enemy-hit", enemy.typeName === "boss" ? enemy.profileName : enemy.typeName);

  if (enemy.health === 0) {
    let goldenWeaponName = "";
    playSound("enemy-down", enemy.typeName === "boss" ? enemy.profileName : enemy.typeName);
    if (enemy.typeName === "boss") {
      bossAlive = false;
      bossSpawnElapsed = 0;
      const isMegaBoss = enemy.profileName === "mega-cauchemar";
      const isWaveFourBoss = stage === "boss-wave";
      const bossXp = bossXpRewards[enemy.bossTier ?? 0];
      if (isMegaBoss) {
        gainXp(bossXp);
      } else {
        createXpBurst(enemy.x, enemy.y, bossXp, 10);
      }
      showXpGainText(enemy.x, enemy.y - 40, bossXp);
      if (isMegaBoss) {
        progression.coins += 55;
        runCoinsEarned += 55;
        updateMenuBalance();
        saveProgression("Butin du Chambellan : +55 pièces et une arme dorée !");
        const goldenWeapon = chooseWeaponDrop("doree");
        unlockGoldenBossWeapon(goldenWeapon);
        goldenWeaponName = goldenWeapon.label;
      } else {
        const rarity = isWaveFourBoss ? "orange" : "violette";
        const coins = isWaveFourBoss ? 25 : 5;
        const healingPercent = isWaveFourBoss ? 0.25 : 0.05;
        createWeaponPickup(enemy.x, enemy.y, rarity, chooseWeaponDrop(rarity));
        roundMessage.textContent = `Le boss a lâché son arme : approche-toi et appuie sur ${keyLabel("pickup")} pour la ramasser.`;
        roundMessage.hidden = false;
        window.setTimeout(() => { roundMessage.hidden = true; }, 2600);
        createCoinPickup(enemy.x - 16, enemy.y, coins);
        createHealthPickup(enemy.x + 18, enemy.y, Math.max(1, Math.ceil(maxPlayerHealth * healingPercent)));
      }
      const relic = chooseBossRelic();
      if (relic) {
        if (isMegaBoss) {
          collectBossRelic(relic.id);
        } else {
          createBossRelicPickup(enemy.x + 30, enemy.y - 20, relic);
        }
      }
      playSound("boss-down", enemy.profileName);
    } else {
      createCoinPickup(enemy.x, enemy.y, 1 + (Math.random() < 0.25 ? 1 : 0));
      createXpPickup(enemy.x + randomBetween(-14, 14), enemy.y + randomBetween(-10, 12), getEnemyXp(enemy));
      if (enemy.isMinion && Math.random() < 0.5) {
        createHealthPickup(enemy.x + 14, enemy.y + 8, Math.max(1, Math.ceil(maxPlayerHealth * 0.5)));
      }
    }
    if (enemy.typeName === "boss" && enemy.profileName === "mega-cauchemar") {
      enemies.delete(enemy);
      setBossAnimationState(enemy, "defeated");
      for (const projectile of bossProjectiles) projectile.element.remove();
      bossProjectiles.clear();
      window.setTimeout(() => enemy.element.remove(), 650);
      showGameOver(`Victoire ! Le Chambellan sorcier est vaincu : +55 pièces et l'arme dorée « ${goldenWeaponName} » conservée dans ton casier.`, true);
    } else {
      createEnemyDeathEffect(enemy);
      removeEnemy(enemy);
      if (enemy.typeName === "boss") {
        bossAlive = [...enemies].some((remainingEnemy) => remainingEnemy.typeName === "boss");
        if ((stage === "waves" || stage === "boss-wave") && bossesRemaining.length === 0 && !bossAlive) {
          clearWaveAfterBoss(enemy);
        }
      }
    }
  } else {
    enemy.element.classList.remove("enemy-hit");
    void enemy.element.offsetWidth;
    enemy.element.classList.add("enemy-hit");
    window.clearTimeout(enemy.hitTimer);
    enemy.hitTimer = window.setTimeout(() => enemy.element.classList.remove("enemy-hit"), 200);
  }
}

let liveDamageNumbers = 0;

function showDamageNumber(enemy, damage) {
  if (liveDamageNumbers >= 36) return;
  const value = Math.max(1, Math.round(damage));
  const height = parseFloat(enemy.element.style.height) * scaleActor() * characterScale;
  const number = document.createElement("span");
  number.className = `dmg-num${value >= 10 ? " is-big" : ""}`;
  number.setAttribute("aria-hidden", "true");
  number.textContent = String(value);
  number.style.left = `${enemy.x + randomBetween(-8, 8)}px`;
  number.style.top = `${enemy.y - height * 0.45}px`;
  number.style.setProperty("--dx", `${randomBetween(-20, 20).toFixed(1)}px`);
  world.append(number);
  liveDamageNumbers += 1;
  window.setTimeout(() => {
    number.remove();
    liveDamageNumbers -= 1;
  }, 720);
}

function chooseBossRelic() {
  const pendingRelics = new Set([...pickups].filter((pickup) => pickup.kind === "relic").map((pickup) => pickup.relicId));
  const available = bossRelicCatalog.filter((item) => !pendingRelics.has(item.id));
  if (available.length === 0) return undefined;
  return available[Math.floor(Math.random() * available.length)];
}

function createBossRelicPickup(x, y, relic) {
  const element = document.createElement("span");
  element.className = "loot-pickup loot-relic";
  element.setAttribute("role", "img");
  element.setAttribute("aria-label", `${relic.label} à ramasser`);
  element.textContent = relic.icon;
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  world.append(element);
  pickups.add({ element, x, y, kind: "relic", relicId: relic.id });
}

function collectBossRelic(relicId) {
  const relic = bossRelicCatalog.find((item) => item.id === relicId);
  if (!relic) throw new Error(`Relique de boss inconnue : ${relicId}`);
  progression.relicInventory[relicId] += 1;
  if (!progression.bossLoot.includes(relicId)) progression.bossLoot.push(relicId);
  saveProgression(`${relic.label} récupérée · stock ×${progression.relicInventory[relicId]}.`);
  if (!lockerScreen.hidden) renderLocker();
}

function chooseWeaponDrop(rarity) {
  const matchingWeapons = loadoutOptions.weapons.filter((weapon) => weapon.rarity === rarity && !weapon.crate);
  const unownedWeapons = rarity === "doree"
    ? matchingWeapons.filter((weapon) => !progression.unlocked.weapons.includes(weapon.id))
    : matchingWeapons;
  const weapons = unownedWeapons.length > 0 ? unownedWeapons : matchingWeapons;
  if (weapons.length === 0) throw new Error(`Aucune arme de rareté ${rarity}.`);
  return weapons[Math.floor(Math.random() * weapons.length)];
}

function unlockGoldenBossWeapon(weapon) {
  if (weapon.rarity !== "doree") throw new Error(`L'arme ${weapon.id} n'est pas dorée.`);
  const alreadyOwned = progression.unlocked.weapons.includes(weapon.id);
  if (!alreadyOwned) {
    progression.unlocked.weapons.push(weapon.id);
    saveProgression(`${weapon.label} doré ajouté au casier et sauvegardé définitivement !`);
  } else {
    saveProgression(`Le boss a rapporté 55 pièces ; ${weapon.label} est déjà dans ton casier.`);
  }
  if (!lockerScreen.hidden) renderLocker();
}

function startPortalWave() {
  restoreHealthForNextWave();
  for (const enemy of enemies) enemy.element.remove();
  enemies.clear();
  clearPowerFields();
  arena.querySelectorAll(".stone, .impact-burst, .hit-fx, .muzzle-fx, .mega-shockwave").forEach((effect) => effect.remove());
  waveCleared = false;
  stage = "portal";
  waveNumber = 5;
  bossesRemaining = ["mega-cauchemar"];
  bossSpawnElapsed = 99;
  bossWarningShown = false;
  bossAlive = false;
  minionSpawnElapsed = 0;
  timeLeft = finalWaveLength;
  fogRadius = 145;
  arena.dataset.wave = "5";
  const portalCenterX = playWorldWidth() * thronePortalPosition.x;
  const portalCenterY = playWorldHeight() * thronePortalPosition.y;
  const playerStart = playerCenter();
  if (Math.hypot(playerStart.x - portalCenterX, playerStart.y - portalCenterY) < 160) {
    position.x = 0.5;
    position.y = 0.46;
  }
  settleOnCurrentMap();
  waveDisplay.textContent = "Vague 5 · Portail du trône";
  waveCountdown = waveCountdownLength;
  waveCountdownNumber.textContent = String(waveCountdownLength);
  waveCountdownLabel.textContent = "VAGUE 5 — LE PORTAIL S'OUVRE";
  waveCountdownDisplay.setAttribute("aria-label", `La vague 5 commence dans ${waveCountdownLength} secondes`);
  waveCountdownDisplay.hidden = false;
  updateTimer();
  updateFog();
  updateCombatLoadout();
  spawnBossPortal();
  syncSoundtrack();
}

function spawnBossPortal() {
  if (portalElement) return;
  spawnPortal("throne", thronePortalPosition);
  roundMessage.textContent = `Vague 5 : le portail du trône est ouvert. Le Chambellan arrive à 1:50 — entre avant (${keyLabel("portal")}) ou tu y seras aspiré !`;
  roundMessage.hidden = false;
  window.setTimeout(() => { roundMessage.hidden = true; }, 3800);
}

function spawnPortal(destination, point) {
  removePortal();
  portalDestination = destination;
  portalPoint = { x: point.x, y: point.y };
  portalArmRemaining = destination === "throne" ? 0 : 1.2;
  portalElement = document.createElement("button");
  portalElement.className = `boss-portal boss-portal-${destination}`;
  portalElement.type = "button";
  const nextLabel = stage === "boss-wave" ? "Vague 5" : `Vague ${waveNumber + 1}`;
  portalElement.setAttribute(
    "aria-label",
    destination === "throne"
      ? "Entrer dans la salle du trône et affronter le Chambellan sorcier"
      : `Entrer dans le portail vers la ${nextLabel.toLowerCase()}`,
  );
  const part = (className, parent) => {
    const element = document.createElement("span");
    element.className = className;
    element.setAttribute("aria-hidden", "true");
    parent.append(element);
    return element;
  };
  const ground = part("portal-ground", portalElement);
  part("portal-runes", ground);
  part("portal-runes portal-runes-inner", ground);
  const gate = part("portal-gate", portalElement);
  const vortex = part("portal-vortex", gate);
  part("portal-depth", vortex);
  part("portal-swirl", vortex);
  part("portal-swirl portal-swirl-reverse", vortex);
  part("portal-core", vortex);
  part("portal-arch", gate);
  part("portal-plinth portal-plinth-left", gate);
  part("portal-plinth portal-plinth-right", gate);
  const sparks = part("portal-sparks", gate);
  for (let index = 0; index < 10; index += 1) {
    const spark = part("portal-spark", sparks);
    spark.style.setProperty("--x", `${randomBetween(18, 82).toFixed(1)}%`);
    spark.style.setProperty("--drift", `${randomBetween(-14, 14).toFixed(1)}px`);
    spark.style.setProperty("--delay", `${(-Math.random() * 2.4).toFixed(2)}s`);
    spark.style.setProperty("--life", `${randomBetween(1.6, 2.6).toFixed(2)}s`);
  }
  const caption = part("portal-caption", gate);
  caption.textContent = destination === "throne" ? "SALLE DU TRÔNE · E" : `${nextLabel.toUpperCase()} · E`;
  portalElement.style.left = `${playWorldWidth() * portalPoint.x}px`;
  portalElement.style.top = `${playWorldHeight() * portalPoint.y}px`;
  world.append(portalElement);
  portalElement.addEventListener("click", enterPortal);
  playSound("portal-open");
}

function removePortal() {
  portalElement?.remove();
  portalElement = undefined;
  portalDestination = "";
  portalArmRemaining = 0;
}

function enterPortal() {
  if (!gameActive || !portalElement) return;
  if (portalDestination === "throne" && stage !== "portal") return;
  const center = playerCenter();
  if (Math.hypot(center.x - playWorldWidth() * portalPoint.x, center.y - playWorldHeight() * portalPoint.y) > 115) {
    roundMessage.textContent = "Approche-toi du portail pour entrer.";
    roundMessage.hidden = false;
    window.setTimeout(() => { roundMessage.hidden = true; }, 1200);
    return;
  }
  if (portalDestination === "throne") {
    startUltimateBossStage();
    return;
  }
  if (portalArmRemaining > 0) return;
  removePortal();
  waveCleared = false;
  collectRemainingPickups();
  if (stage === "boss-wave") startPortalWave();
  else advanceWave();
}

function collectRemainingPickups() {
  for (const pickup of [...pickups]) {
    if (pickup.kind !== "weapon") {
      collectPickup(pickup);
      continue;
    }
    pickups.delete(pickup);
    pickup.element.remove();
  }
  nearbyWeaponPickup = null;
}

function clearWaveAfterBoss(boss) {
  waveCleared = true;
  const clearedRound = roundId;
  banishMinions();
  for (const projectile of bossProjectiles) projectile.element.remove();
  bossProjectiles.clear();
  arena.querySelectorAll(".boss-attack-warning, .enemy-attack-warning, .enemy-attack-slash, .enemy-attack-slam, .mega-shockwave")
    .forEach((effect) => effect.remove());
  waveDisplay.textContent = `Vague ${waveNumber} · Boss vaincu`;
  roundMessage.textContent = "BOSS VAINCU ! Ses sbires s'évaporent… un portail s'ouvre là où il est apparu.";
  roundMessage.hidden = false;
  window.setTimeout(() => {
    if (clearedRound === roundId && gameActive) magnetizeLoot();
  }, 650);
  window.setTimeout(() => {
    if (clearedRound !== roundId || !gameActive || !waveCleared) return;
    spawnPortal("next-wave", boss.spawnPoint ?? { x: boss.x / playWorldWidth(), y: boss.y / playWorldHeight() });
    roundMessage.textContent = `Le portail est ouvert : entre dedans (ou appuie sur ${keyLabel("portal")}) pour la vague suivante.`;
    roundMessage.hidden = false;
    window.setTimeout(() => { if (clearedRound === roundId) roundMessage.hidden = true; }, 3200);
  }, 900);
}

function banishMinions() {
  for (const minion of [...enemies]) {
    enemies.delete(minion);
    const element = minion.element;
    element.style.setProperty("--banish-delay", `${(Math.random() * 0.35).toFixed(2)}s`);
    element.classList.add("enemy-banished");
    window.setTimeout(() => element.remove(), 1100);
  }
}

function createEnemyDeathEffect(enemy) {
  const corpse = enemy.element.cloneNode(true);
  corpse.classList.remove("enemy-hit", "enemy-attacking", "enemy-winding-up", "enemy-aiming", "enemy-firing", "enemy-burning", "enemy-frozen");
  corpse.classList.add("enemy-dying");
  corpse.removeAttribute("role");
  corpse.setAttribute("aria-hidden", "true");
  corpse.querySelectorAll(".enemy-health, .enemy-label, .enemy-burn-flames, .enemy-fx").forEach((part) => part.remove());
  world.append(corpse);
  window.setTimeout(() => corpse.remove(), 700);
  const size = parseFloat(enemy.element.style.width) * scaleActor() * characterScale;
  const puff = createFxLayer(`death-fx${enemy.typeName === "boss" ? " death-boss" : ""}`, enemy.x, enemy.y, 750);
  puff.style.setProperty("--size", `${Math.round(size)}px`);
  addFxParts(puff, "death-flash");
  addFxParts(puff, "death-ring");
  addFxParts(puff, "death-smoke", 6, (style, index) => scatterFx(style, index, 6, size * 0.12, size * 0.42, { delay: 0.06 }));
  addFxParts(puff, "death-bit", 7, (style, index) => scatterFx(style, index, 7, size * 0.45, size * 0.95, { spin: 420 }));
}

function startUltimateBossStage(forced = false) {
  if (!gameActive || stage !== "portal" || (!forced && !portalElement)) return;
  removePortal();
  for (const enemy of enemies) enemy.element.remove();
  enemies.clear();
  clearPowerFields();
  absorbXpPickups();
  for (const pickup of pickups) pickup.element.remove();
  pickups.clear();
  stage = "ultimate";
  arena.classList.add("arena-throne-room");
  position.x = 0.5;
  position.y = 0.77;
  facing.x = 0;
  facing.y = -1;
  updateAutoShootControl();
  updatePlayer();
  bossesRemaining = ["mega-cauchemar"];
  bossSpawnElapsed = 99;
  minionSpawnElapsed = 0;
  fogRadius = 350;
  arena.dataset.wave = "boss";
  waveDisplay.textContent = "SALLE DU TRÔNE · CHAMBELLAN SORCIER";
  roundMessage.textContent = forced
    ? "Le portail t'aspire dans la salle du trône : le Chambellan arrive !"
    : "Salle du trône : tiens bon face à la horde, le Chambellan arrive à 1:50.";
  roundMessage.hidden = false;
  window.setTimeout(() => { if (stage === "ultimate") roundMessage.hidden = true; }, 2600);
  updateTimer();
  updateFog();
  updateCombatLoadout();
  syncSoundtrack();
}

function removeEnemy(enemy) {
  enemies.delete(enemy);
  enemy.element.remove();
}

function createWeaponPickup(x, y, rarity, weapon) {
  const pickupX = Math.max(25, Math.min(playWorldWidth() - 25, x));
  const pickupY = Math.max(25, Math.min(playWorldHeight() - 25, y));
  const element = document.createElement("span");
  element.className = `weapon-pickup weapon-pickup-rarity-${rarity}`;
  element.setAttribute("role", "img");
  element.setAttribute("aria-label", `${weapon.label}, rareté ${rarity}, à ramasser`);
  const art = document.createElement("img");
  art.className = "weapon-pickup-art";
  art.src = getWeaponArtSource(weapon.id);
  art.alt = "";
  art.draggable = false;
  const prompt = document.createElement("span");
  prompt.className = "weapon-pickup-prompt";
  prompt.textContent = `F · Ramasser ${weapon.label}`;
  element.append(art, prompt);
  element.style.left = `${pickupX}px`;
  element.style.top = `${pickupY}px`;
  world.append(element);
  const pickup = { element, x: pickupX, y: pickupY, kind: "weapon", rarity, weaponId: weapon.id };
  element.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    if (!gameActive) return;
    if (pickup === nearbyWeaponPickup) collectWeaponPickup(pickup);
    else showPickupHint();
  });
  pickups.add(pickup);
}

function createCoinPickup(x, y, value) {
  const element = document.createElement("span");
  element.className = "loot-pickup loot-coin";
  element.setAttribute("role", "img");
  element.setAttribute("aria-label", `${value} pièce${value === 1 ? "" : "s"} à ramasser`);
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  world.append(element);
  pickups.add({ element, x, y, kind: "coin", value });
}

function getEnemyXp(enemy) {
  const waveBonus = stage === "boss-wave" ? 3 : stage === "ultimate" ? 4 : Math.max(0, waveNumber - 1);
  return 2 + Math.ceil(enemy.maxHealth * 0.6) + waveBonus + (enemy.isMinion ? 1 : 0);
}

function createXpPickup(x, y, value) {
  const pickupX = Math.max(12, Math.min(playWorldWidth() - 12, x));
  const pickupY = Math.max(12, Math.min(playWorldHeight() - 12, y));
  const element = document.createElement("span");
  element.className = `loot-pickup loot-xp${value >= 20 ? " is-large" : ""}`;
  element.setAttribute("role", "img");
  element.setAttribute("aria-label", `${value} XP à ramasser`);
  element.style.left = `${pickupX}px`;
  element.style.top = `${pickupY}px`;
  world.append(element);
  pickups.add({ element, x: pickupX, y: pickupY, kind: "xp", value });
}

function createXpBurst(x, y, total, count) {
  const base = Math.floor(total / count);
  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2 + randomBetween(-0.3, 0.3);
    const distance = randomBetween(30, 85) * scaleActor();
    const value = base + (index < total - base * count ? 1 : 0);
    createXpPickup(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance, value);
  }
}

function magnetizeLoot() {
  for (const pickup of pickups) {
    if (pickup.kind !== "coin" && pickup.kind !== "xp") continue;
    pickup.forceMagnet = true;
  }
}

function absorbXpPickups() {
  for (const pickup of [...pickups]) {
    if (pickup.kind !== "xp") continue;
    pickups.delete(pickup);
    pickup.element.remove();
    gainXp(pickup.value);
  }
}

function showXpGainText(x, y, amount) {
  const label = document.createElement("span");
  label.className = "xp-gain-text";
  label.textContent = `+${amount} XP`;
  label.style.left = `${x}px`;
  label.style.top = `${y}px`;
  world.append(label);
  window.setTimeout(() => label.remove(), 1400);
}

function grantLevelReward(level) {
  const reward = getLevelReward(level);
  progression.coins += reward.coins;
  for (const [boostId, count] of Object.entries(reward.boosts)) {
    progression.boostInventory[boostId] += count;
    if (!progression.equippedBoost) progression.equippedBoost = boostId;
  }
  if (reward.relic) {
    const relic = bossRelicCatalog[Math.floor(Math.random() * bossRelicCatalog.length)];
    progression.relicInventory[relic.id] += 1;
    if (!progression.bossLoot.includes(relic.id)) progression.bossLoot.push(relic.id);
  }
  return reward;
}

function gainXp(amount) {
  if (progression.level >= maxPlayerLevel) return;
  runXpEarned += amount;
  progression.xp += amount;
  const rewards = [];
  while (progression.level < maxPlayerLevel && progression.xp >= getXpForLevel(progression.level)) {
    progression.xp -= getXpForLevel(progression.level);
    progression.level += 1;
    rewards.push({ level: progression.level, reward: grantLevelReward(progression.level) });
  }
  if (progression.level >= maxPlayerLevel) progression.xp = 0;
  if (rewards.length > 0) {
    const last = rewards[rewards.length - 1];
    saveProgression(`Niveau ${last.level} atteint ! Récompense : ${describeLevelReward(last.reward).join(" · ")}`);
    updateMenuBalance();
    updateBoostButton();
    if (!lockerScreen.hidden) renderLocker();
    celebrateLevelUp(rewards);
  } else {
    saveProgression(`+${amount} XP`);
  }
  updateXpDisplays();
}

function updateXpDisplays() {
  const atMax = progression.level >= maxPlayerLevel;
  const needed = getXpForLevel(progression.level);
  const percent = atMax ? 100 : (progression.xp / needed) * 100;
  hudXp.setAttribute("aria-valuenow", String(Math.round(percent)));
  hudXp.setAttribute("aria-valuetext", atMax ? "Niveau maximum" : `${progression.xp} sur ${needed} XP`);
  hudXpFill.style.width = `${percent}%`;
  hudXpLevel.textContent = `Nv ${progression.level}`;
  menuLevel.textContent = String(progression.level);
  menuXpFill.style.width = `${percent}%`;
  menuXpText.textContent = atMax ? "NIVEAU MAX" : `${progression.xp} / ${needed} XP`;
  if (atMax) {
    menuNextReward.textContent = "🏆 Niveau 200 atteint : toutes les récompenses sont débloquées !";
  } else {
    const nextLevel = progression.level + 1;
    const milestone = Math.min(maxPlayerLevel, Math.ceil(nextLevel / 10) * 10);
    const nextText = `🎁 Niveau ${nextLevel} : ${describeLevelReward(getLevelReward(nextLevel)).join(" · ")}`;
    menuNextReward.textContent = milestone === nextLevel
      ? nextText
      : `${nextText}  ·  ⭐ Palier ${milestone} : ${describeLevelReward(getLevelReward(milestone)).join(" · ")}`;
  }
  if (!rewardsScreen.hidden) renderRewards();
}

function renderRewards() {
  const nextMilestone = Math.min(maxPlayerLevel, Math.floor(progression.level / 10) * 10 + 10);
  rewardsSummary.textContent = progression.level >= maxPlayerLevel
    ? "Niveau 200 atteint : tu as tout débloqué !"
    : `Niveau ${progression.level} · chaque niveau rapporte une récompense, et elle grossit tous les 10 niveaux. Prochain palier : niveau ${nextMilestone}. À partir du niveau ${slowLevelingStart}, chaque niveau demande beaucoup plus d'XP.`;
  const nodes = [];
  for (let level = 2; level <= maxPlayerLevel; level += 1) {
    const reward = getLevelReward(level);
    const node = document.createElement("li");
    node.className = "reward-node";
    node.classList.toggle("is-claimed", level <= progression.level);
    node.classList.toggle("is-next", level === progression.level + 1);
    node.classList.toggle("is-milestone", reward.milestone);
    node.classList.toggle("is-major", level % 50 === 0);
    node.dataset.level = String(level);
    const badge = document.createElement("span");
    badge.className = "reward-level";
    badge.textContent = String(level);
    const content = document.createElement("span");
    content.className = "reward-content";
    for (const part of describeLevelReward(reward)) {
      const chip = document.createElement("span");
      chip.className = "reward-chip";
      chip.textContent = part;
      content.append(chip);
    }
    const state = document.createElement("span");
    state.className = "reward-state";
    state.textContent = level <= progression.level ? "✔ Reçu" : level === progression.level + 1 ? "Prochain" : "🔒";
    node.append(badge, content, state);
    nodes.push(node);
  }
  rewardsTrack.replaceChildren(...nodes);
}

function showRewards() {
  menuTitle.textContent = "Récompenses de niveau";
  setMenuScreen("rewards");
  renderRewards();
  const target = rewardsTrack.querySelector(".is-next") ?? rewardsTrack.lastElementChild;
  if (target instanceof HTMLElement) {
    rewardsTrack.scrollTop = target.offsetTop - rewardsTrack.clientHeight / 2 + target.offsetHeight / 2;
  }
}

function setMenuScreen(name) {
  loadoutScreen.hidden = name !== "home";
  shopScreen.hidden = name !== "shop";
  lockerScreen.hidden = name !== "locker";
  rewardsScreen.hidden = name !== "rewards";
  gameOver.hidden = true;
  frontMenu.hidden = false;
  frontMenu.dataset.screen = name;
  syncSoundtrack();
  const activeNav = name === "locker" && activeLockerTab === "upgrades" ? "upgrades" : name;
  for (const button of menuNavButtons) {
    const isActive = button.dataset.nav === activeNav;
    button.classList.toggle("is-active", isActive);
    if (isActive) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  }
}

function celebrateLevelUp(rewards) {
  playSound("upgrade");
  if (!gameActive) return;
  const last = rewards[rewards.length - 1];
  const center = playerCenter();
  const levelUp = createFxLayer("levelup-fx levelup-doree", center.x, center.y, 1200);
  addFxParts(levelUp, "levelup-pillar");
  addFxParts(levelUp, "levelup-ring");
  addFxParts(levelUp, "levelup-spark", 14, (style, index) => scatterFx(style, index, 14, 26, 64, { delay: 0.2 }));
  arena.querySelectorAll(".levelup-banner").forEach((banner) => banner.remove());
  const banner = document.createElement("div");
  banner.className = `levelup-banner${last.reward.milestone ? " is-milestone" : ""}`;
  banner.setAttribute("role", "status");
  const title = document.createElement("strong");
  title.textContent = rewards.length > 1 ? `NIVEAU ${last.level} ! (+${rewards.length})` : `NIVEAU ${last.level} !`;
  const rewardLine = document.createElement("span");
  rewardLine.textContent = rewards.flatMap((entry) => describeLevelReward(entry.reward)).join(" · ");
  banner.append(title, rewardLine);
  arena.append(banner);
  window.setTimeout(() => banner.remove(), 2600);
}

function createHealthPickup(x, y, amount) {
  const element = document.createElement("span");
  element.className = "loot-pickup loot-health";
  element.setAttribute("role", "img");
  element.setAttribute("aria-label", `Soin de ${amount} points à ramasser`);
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  world.append(element);
  pickups.add({ element, x, y, kind: "health", amount });
}

function collectWeaponPickup(pickup) {
  pickups.delete(pickup);
  pickup.element.remove();
  const center = playerCenter();
  const levelUp = createFxLayer(`levelup-fx levelup-${pickup.rarity}`, center.x, center.y, 1200);
  addFxParts(levelUp, "levelup-pillar");
  addFxParts(levelUp, "levelup-ring");
  addFxParts(levelUp, "levelup-spark", 12, (style, index) => scatterFx(style, index, 12, 24, 58, { delay: 0.25 }));
  weaponLevel += 1;
  const weapon = loadoutOptions.weapons.find((item) => item.id === pickup.weaponId);
  if (!weapon) throw new Error(`Arme de butin inconnue : ${pickup.weaponId}`);
  const slot = weapon.melee ? "melee" : "ranged";
  runLoadout[slot] = weapon.id;
  if (slot === "ranged") runPickupBonus = pickup.rarity === "orange" ? 1 : 0;
  activeWeaponSlot = slot;
  applyRunWeapon();
  playWeaponDraw();
  roundMessage.textContent = `${weapon.label} ramassé : il remplace ton ${slot === "melee" ? "épée" : "arme à distance"} jusqu'à la fin de la partie.`;
  waveDisplay.textContent = `Vague ${waveNumber}/5 · Arme ${weaponLevel}`;
  roundMessage.hidden = false;
  window.setTimeout(() => {
    roundMessage.hidden = true;
  }, 1400);
  playSound("upgrade");
}

function showPickupHint() {
  roundMessage.textContent = `Approche-toi de l'arme puis appuie sur ${keyLabel("pickup")} pour la ramasser.`;
  roundMessage.hidden = false;
  window.setTimeout(() => { roundMessage.hidden = true; }, 1400);
}

function pickUpNearbyWeapon() {
  if (!gameActive) return;
  if (nearbyWeaponPickup && pickups.has(nearbyWeaponPickup)) collectWeaponPickup(nearbyWeaponPickup);
  else if ([...pickups].some((pickup) => pickup.kind === "weapon")) showPickupHint();
}

function updatePickups(delta) {
  const center = playerCenter();
  let closestWeapon = null;
  let closestWeaponDistance = Infinity;
  for (const pickup of pickups) {
    let distance = Math.hypot(pickup.x - center.x, pickup.y - center.y);
    const scale = scaleActor();
    if (pickup.kind === "weapon") {
      const isNear = distance < 72 * scale;
      pickup.element.classList.toggle("is-near", isNear);
      if (isNear && distance < closestWeaponDistance) {
        closestWeapon = pickup;
        closestWeaponDistance = distance;
      }
      continue;
    }
    const magnetRadius = (pickup.kind === "xp" ? 165 : 145) * scale;
    if ((pickup.kind === "coin" || pickup.kind === "xp")
      && (pickup.magnet || pickup.forceMagnet || distance <= magnetRadius)) {
      if (!pickup.magnet) {
        pickup.magnet = true;
        pickup.pull = 140;
        pickup.element.classList.add("is-magnet");
      }
      pickup.pull = Math.min(1500, pickup.pull + 2200 * delta);
      const travelDistance = Math.min(distance, pickup.pull * scale * delta);
      const directionX = (center.x - pickup.x) / (distance || 1);
      const directionY = (center.y - pickup.y) / (distance || 1);
      pickup.x += directionX * travelDistance;
      pickup.y += directionY * travelDistance;
      pickup.element.style.left = `${pickup.x}px`;
      pickup.element.style.top = `${pickup.y}px`;
      distance = Math.hypot(pickup.x - center.x, pickup.y - center.y);
    }

    if (distance < 38 * scale) collectPickup(pickup);
  }
  if (nearbyWeaponPickup && nearbyWeaponPickup !== closestWeapon) nearbyWeaponPickup.element.classList.remove("is-nearest");
  nearbyWeaponPickup = closestWeapon;
  closestWeapon?.element.classList.add("is-nearest");
}

function collectPickup(pickup) {
  if (pickup.kind === "coin") {
    pickups.delete(pickup);
    pickup.element.remove();
    const center = playerCenter();
    const sparkle = createFxLayer("collect-fx", center.x, center.y - 8, 450);
    addFxParts(sparkle, "collect-spark", 5, (style, index) => scatterFx(style, index, 5, 10, 22));
    progression.coins += pickup.value;
    runCoinsEarned += pickup.value;
    saveProgression(`+${pickup.value} pièce${pickup.value === 1 ? "" : "s"} ramassée${pickup.value === 1 ? "" : "s"} !`);
    updateMenuBalance();
    roundMessage.textContent = `+${pickup.value} pièce${pickup.value === 1 ? "" : "s"} ◉`;
    roundMessage.hidden = false;
    window.setTimeout(() => { roundMessage.hidden = true; }, 800);
  } else if (pickup.kind === "xp") {
    pickups.delete(pickup);
    pickup.element.remove();
    const center = playerCenter();
    const sparkle = createFxLayer("collect-fx collect-xp", center.x, center.y - 8, 450);
    addFxParts(sparkle, "collect-spark", 4, (style, index) => scatterFx(style, index, 4, 8, 20));
    gainXp(pickup.value);
  } else if (pickup.kind === "health") {
    pickups.delete(pickup);
    pickup.element.remove();
    const healed = Math.min(pickup.amount, maxPlayerHealth - playerHealth);
    playerHealth += healed;
    updatePlayerHealth();
    roundMessage.textContent = healed > 0 ? `Soin ramassé : +${healed} PV` : "Vie déjà au maximum";
    roundMessage.hidden = false;
    window.setTimeout(() => { roundMessage.hidden = true; }, 1200);
    playSound("upgrade");
  } else if (pickup.kind === "relic") {
    pickups.delete(pickup);
    pickup.element.remove();
    collectBossRelic(pickup.relicId);
    roundMessage.textContent = "Relique de boss récupérée et sauvegardée dans le casier !";
    roundMessage.hidden = false;
    window.setTimeout(() => { roundMessage.hidden = true; }, 1700);
  } else {
    collectWeaponPickup(pickup);
  }
}

function startWave(number) {
  removePortal();
  waveCleared = false;
  stage = "waves";
  waveNumber = number;
  const wave = waves[number - 1];
  bossesRemaining = [...wave.bosses];
  bossSpawnElapsed = 99;
  bossWarningShown = false;
  bossAlive = false;
  minionSpawnElapsed = 0;
  waveCountdown = waveCountdownLength;
  timeLeft = roundLength;
  fogRadius = [285, 225, 175][number - 1];
  arena.dataset.wave = String(number);
  if (number === 3) {
    const start = playerCenter();
    const vortexX = playWorldWidth() * vortexPosition.x;
    const vortexY = playWorldHeight() * vortexPosition.y;
    if (Math.hypot(start.x - vortexX, start.y - vortexY) < 260) {
      position.x = 0.24;
      position.y = 0.6;
    }
  }
  settleOnCurrentMap();
  waveDisplay.textContent = `Vague ${number}/5 · Arme ${weaponLevel}`;
  updateTimer();
  updateFog();
  waveCountdownNumber.textContent = String(waveCountdownLength);
  waveCountdownLabel.textContent = `VAGUE ${number} — ${bossMapNames[number] ?? "PRÉPARE-TOI"}`;
  waveCountdownDisplay.setAttribute("aria-label", `La vague ${number} commence dans ${waveCountdownLength} secondes`);
  waveCountdownDisplay.hidden = false;
  updateCombatLoadout();
  syncSoundtrack();
}

function restoreHealthForNextWave() {
  const recovered = Math.min(Math.ceil(maxPlayerHealth * 0.5), maxPlayerHealth - playerHealth);
  if (recovered <= 0) return;
  playerHealth += recovered;
  updatePlayerHealth();
  roundMessage.textContent = `Nouvelle vague : +${recovered} PV`;
  roundMessage.hidden = false;
  window.setTimeout(() => { roundMessage.hidden = true; }, 1500);
  playSound("upgrade");
}

function startBossWave() {
  for (const enemy of enemies) enemy.element.remove();
  enemies.clear();
  clearPowerFields();
  removePortal();
  waveCleared = false;
  stage = "boss-wave";
  waveNumber = 4;
  bossesRemaining = ["bouffon-frondeur"];
  bossSpawnElapsed = 99;
  bossWarningShown = false;
  bossAlive = false;
  minionSpawnElapsed = 0;
  timeLeft = bossWaveLength;
  fogRadius = 155;
  arena.dataset.wave = "4";
  settleOnCurrentMap();
  waveDisplay.textContent = `Vague 4 · BOSS · Arme ${weaponLevel}`;
  waveCountdown = waveCountdownLength;
  waveCountdownNumber.textContent = String(waveCountdownLength);
  waveCountdownLabel.textContent = `VAGUE 4 — ${bossMapNames[4]}`;
  waveCountdownDisplay.setAttribute("aria-label", `La vague de boss commence dans ${waveCountdownLength} secondes`);
  waveCountdownDisplay.hidden = false;
  updateTimer();
  updateFog();
  updateCombatLoadout();
  syncSoundtrack();
}

function advanceWave() {
  restoreHealthForNextWave();
  if (waveNumber >= waves.length) {
    startBossWave();
    return;
  }
  for (const enemy of enemies) enemy.element.remove();
  enemies.clear();
  clearPowerFields();
  arena.querySelectorAll(".stone, .impact-burst, .hit-fx, .muzzle-fx").forEach((effect) => effect.remove());
  startWave(waveNumber + 1);
}

function showGameOver(message, won = false) {
  if (!gameActive) return;
  gameActive = false;
  arena.classList.remove("is-live");
  stopShooting();
  keys.clear();
  releaseTouchStick();
  player.classList.remove("is-moving", "is-walking", "is-running", "is-dodging");
  dodgeRemaining = 0;
  dodgeInvulnerabilityRemaining = 0;
  activePowerInvulnerabilityRemaining = 0;
  player.classList.remove("power-veil-active");
  player.classList.remove("is-invulnerable");
  for (const projectile of bossProjectiles) projectile.element.remove();
  bossProjectiles.clear();
  arena.querySelectorAll(".boss-attack-warning, .enemy-attack-warning, .enemy-attack-slash, .enemy-attack-slam")
    .forEach((effect) => effect.remove());
  absorbXpPickups();
  const completionBonus = won ? 20 : 5;
  progression.coins += completionBonus;
  runCoinsEarned += completionBonus;
  updateMenuBalance();
  saveProgression(`${won ? "Victoire" : "Défaite"} : +${completionBonus} pièces. Ton solde est sauvegardé.`);
  gameOverTitle.textContent = message;
  const coinsLabel = `+${runCoinsEarned} pièce${runCoinsEarned === 1 ? "" : "s"}`;
  gameOverXp.textContent = progression.level >= maxPlayerLevel
    ? `${coinsLabel} · +${runXpEarned} XP · Niveau MAX ${maxPlayerLevel} atteint`
    : `${coinsLabel} · +${runXpEarned} XP · Niveau ${progression.level} (${progression.xp}/${getXpForLevel(progression.level)} XP)`;
  gameOver.hidden = false;
  frontMenu.hidden = true;
  if (!won) progressionFeedback.textContent = `Défaite : +${completionBonus} pièces. Elles sont conservées pour tes prochains achats.`;
  syncSoundtrack();
}

function restartRound() {
  roundId += 1;
  for (const enemy of enemies) enemy.element.remove();
  enemies.clear();
  clearPowerFields();
  for (const pickup of pickups) pickup.element.remove();
  pickups.clear();
  arena.querySelectorAll([
    ".stone", ".impact-burst", ".hit-fx", ".muzzle-fx", ".fx-layer", ".pfx-veil-bubble", ".mega-shockwave",
    ".boss-spawn-fx", ".enemy-dying", ".enemy-banished", ".run-dust", ".dmg-num", ".xp-gain-text", ".levelup-banner",
    ".enemy-aim-line",
  ].join(", ")).forEach((effect) => effect.remove());
  runXpEarned = 0;
  for (const projectile of bossProjectiles) projectile.element.remove();
  bossProjectiles.clear();
  arena.querySelectorAll(".boss-attack-warning, .enemy-attack-warning, .enemy-attack-slash, .enemy-attack-slam")
    .forEach((effect) => effect.remove());
  keys.clear();
  stopShooting();
  player.classList.remove("is-moving", "is-shooting");
  player.classList.remove("is-dodging");
  player.classList.remove("is-invulnerable");
  position.x = 0.5;
  position.y = 0.52;
  facing.x = 1;
  facing.y = 0;
  timeLeft = roundLength;
  waveCountdown = 0;
  playerHealth = 100;
  maxPlayerHealth = (progression.equipped.equipment === "sac-renforce" ? 125 : 100)
    + improvementOptions
      .filter((item) => item.path === "health" && item.level <= progression.improvements.health)
      .reduce((total, item) => total + item.bonus, 0);
  playerHealth = maxPlayerHealth;
  playerDamageCooldown = 0;
  dodgeRemaining = 0;
  dodgeInvulnerabilityRemaining = 0;
  dodgeCooldown = 0;
  boostCooldown = 0;
  shootElapsed = 0;
  runLoadout.ranged = progression.equipped.weapons;
  runLoadout.melee = progression.equipped.melee;
  activeWeaponSlot = "ranged";
  runPickupBonus = 0;
  bossSpawnElapsed = 0;
  bossesRemaining = [];
  weaponLevel = 1;
  applyRunWeapon();
  activeBoostId = "";
  activeBoostRemaining = 0;
  player.classList.remove("boost-vitesse", "boost-bouclier", "boost-puissance");
  restartLock = 0;
  runCoinsEarned = 0;
  stage = "waves";
  updateAutoShootControl();
  arena.classList.remove("arena-throne-room");
  removePortal();
  waveCleared = false;
  runElapsed = 0;
  moveMomentum = 0;
  aimHoldRemaining = 0;
  player.classList.remove("is-walking", "is-running", "is-aiming");
  activePowerCooldown = 0;
  activePowerInvulnerabilityRemaining = 0;
  player.classList.remove("power-veil-active");
  minionSpawnElapsed = 0;
  gameActive = true;
  arena.classList.add("is-live");
  gameOver.hidden = true;
  frontMenu.hidden = true;
  roundMessage.hidden = true;
  timeLeft = roundLength;
  updateTimer();
  updatePlayerHealth();
  updatePlayer();
  startWave(1);
  initializeAudio();
}

function damagePlayer(amount, source) {
  if (!gameActive || dodgeInvulnerabilityRemaining > 0 || activePowerInvulnerabilityRemaining > 0
    || playerDamageCooldown > 0) return;
  const equipmentReduction = (progression.equipped.equipment === "veste" ? 0.25 : 0)
    + improvementOptions
      .filter((item) => item.path === "defense" && item.level <= progression.improvements.defense)
      .reduce((total, item) => total + item.bonus, 0);
  const shieldReduction = activeBoostId === "bouclier" && activeBoostRemaining > 0 ? 0.6 : 1;
  const boneReduction = hasPowerField("boneshield") ? 0.5 : 1;
  const damageReduction = Math.max(0.15, (1 - equipmentReduction) * shieldReduction * boneReduction);
  playerHealth = Math.max(0, playerHealth - Math.max(1, Math.ceil(amount * damageReduction)));
  playerDamageCooldown = 0.5;
  if (source) {
    const center = playerCenter();
    const dx = center.x - source.x;
    const dy = center.y - source.y;
    const length = Math.hypot(dx, dy) || 1;
    const scale = Math.max(0.48, Math.min(1, playWorldWidth() / 1160));
    movePlayerBy(dx / length * 34 * scale, dy / length * 34 * scale);
  }
  updatePlayerHealth();
  playSound("hurt");
  player.classList.remove("player-hurt");
  damageVignette.classList.remove("is-active");
  arena.classList.remove("is-shaking");
  void player.offsetWidth;
  player.classList.add("player-hurt");
  damageVignette.classList.add("is-active");
  arena.classList.add("is-shaking");
  if (playerHealth === 0) showGameOver("Tu as été touché !");
}

function updateEnemies(delta) {
  const center = playerCenter();
  playerDamageCooldown = Math.max(0, playerDamageCooldown - delta);

  for (const enemy of enemies) {
    if (enemy.spawnRemaining > 0) {
      enemy.spawnRemaining = Math.max(0, enemy.spawnRemaining - delta);
      continue;
    }
    if (enemy.burnRemaining > 0) {
      enemy.burnRemaining = Math.max(0, enemy.burnRemaining - delta);
      if (enemy.burnRemaining > 0) {
        enemy.burnTickElapsed = (enemy.burnTickElapsed ?? 0) + delta;
        while (enemy.burnTickElapsed >= 1 && enemies.has(enemy)) {
          enemy.burnTickElapsed -= 1;
          damageEnemy(enemy, enemy.burnDamage ?? 2, { knockback: false });
        }
      } else {
        enemy.burnTickElapsed = 0;
        enemy.element.classList.remove("enemy-burning");
        enemy.element.querySelector(".enemy-burn-flames")?.remove();
      }
      if (!enemies.has(enemy)) continue;
    }
    for (const kind of ["poison", "bleed"]) {
      if (!(enemy[`${kind}Remaining`] > 0)) continue;
      enemy[`${kind}Remaining`] = Math.max(0, enemy[`${kind}Remaining`] - delta);
      enemy[`${kind}Tick`] = (enemy[`${kind}Tick`] ?? 0) + delta;
      while (enemy[`${kind}Tick`] >= 1 && enemies.has(enemy)) {
        enemy[`${kind}Tick`] -= 1;
        damageEnemy(enemy, enemy[`${kind}Damage`], { knockback: false });
      }
      if (enemy[`${kind}Remaining`] === 0) {
        enemy[`${kind}Tick`] = 0;
        enemy[`${kind}Damage`] = 0;
        if (enemies.has(enemy)) setEnemyStatus(enemy, kind, false);
      }
    }
    if (!enemies.has(enemy)) continue;
    if (enemy.slowRemaining > 0) {
      enemy.slowRemaining = Math.max(0, enemy.slowRemaining - delta);
      if (enemy.slowRemaining === 0) {
        enemy.slowFactor = 1;
        setEnemyStatus(enemy, "slowed", false);
      }
    }
    if (enemy.frozenRemaining > 0) {
      enemy.frozenRemaining = Math.max(0, enemy.frozenRemaining - delta);
      if (enemy.frozenRemaining === 0) enemy.element.classList.remove("enemy-frozen");
      else continue;
    }
    if (enemy.stunRemaining > 0) {
      enemy.stunRemaining = Math.max(0, enemy.stunRemaining - delta);
      if (enemy.stunRemaining === 0) setEnemyStatus(enemy, "stunned", false);
      else continue;
    }
    const isMegaBoss = enemy.typeName === "boss" && enemy.profileName === "mega-cauchemar";
    if (!isMegaBoss) enemy.attackCooldown = Math.max(0, enemy.attackCooldown - delta);
    if (!isMegaBoss && enemy.attackWindup > 0 && !(enemy.frozenRemaining > 0)) {
      enemy.attackWindup = Math.max(0, enemy.attackWindup - delta);
      if (enemy.attackWindup === 0) resolveEnemyAttack(enemy);
      if (!gameActive) return;
      continue;
    }

    let targetX = center.x;
    let targetY = center.y;
    let movementSpeed = enemy.speed;
    if (enemy.frozenRemaining > 0) movementSpeed *= 0.35;
    if (enemy.slowRemaining > 0) movementSpeed *= enemy.slowFactor ?? 1;

    if (enemy.typeName === "boss") {
      if (enemy.profileName === "mega-cauchemar") {
        const phase = enemy.health / enemy.maxHealth <= 0.3 ? 3 : enemy.health / enemy.maxHealth <= 0.65 ? 2 : 1;
        if (phase !== enemy.bossPhase) {
          enemy.bossPhase = phase;
          enemy.element.dataset.phase = String(phase);
          enemy.element.classList.remove("enemy-boss-phase-transition");
          void enemy.element.offsetWidth;
          enemy.element.classList.add("enemy-boss-phase-transition");
          setBossAnimationState(enemy, "transition", 1.05);
          enemy.attackCooldown = 1.25;
          roundMessage.textContent = `Le Chambellan entre en phase ${phase} !`;
          roundMessage.hidden = false;
          window.setTimeout(() => { roundMessage.hidden = true; }, 1500);
          playSound("boss-transition", enemy.profileName);
        }

        if (enemy.bossState === "appearing") {
          enemy.stateTimer -= delta;
          if (enemy.stateTimer <= 0) setBossAnimationState(enemy, "idle");
        } else if (enemy.bossState === "transition") {
          enemy.stateTimer -= delta;
          if (enemy.stateTimer <= 0) setBossAnimationState(enemy, "idle");
        } else if (enemy.attackWindup > 0) {
          enemy.attackWindup -= delta;
          if (enemy.attackWindup <= 0) resolveMegaBossAttack(enemy);
        } else if (enemy.dashRemaining > 0) {
          const dashStep = Math.min(delta, enemy.dashRemaining);
          moveEnemyToward(
            enemy,
            enemy.x + enemy.dashX * 250,
            enemy.y + enemy.dashY * 250,
            250,
            dashStep * 2.8 * motionScale(),
          );
          enemy.dashRemaining -= dashStep;
          const meleeRadius = getEnemyHitRadius(enemy) + getPlayerHitRadius();
          if (!enemy.dashHitPlayer && circlesOverlap(enemy.x, enemy.y, meleeRadius, center.x, center.y, 0)) {
            damagePlayer(enemy.attackDamage, enemy);
            enemy.dashHitPlayer = true;
          }
          if (enemy.dashRemaining <= 0) {
            enemy.attackCooldown = phase === 3 ? 0.55 : phase === 2 ? 0.85 : 1.2;
            setBossAnimationState(enemy, "idle");
          }
        } else {
          enemy.attackCooldown = Math.max(0, enemy.attackCooldown - delta);
          if (enemy.attackCooldown === 0) beginMegaBossAttack(enemy, center);
          else {
            movementSpeed *= phase === 3 ? 1.35 : phase === 2 ? 1.15 : 0.82;
            moveEnemyToward(
              enemy,
              center.x,
              playWorldHeight() * 0.36,
              Math.hypot(center.x - enemy.x, playWorldHeight() * 0.36 - enemy.y),
              delta * movementSpeed / enemy.speed * motionScale(),
            );
          }
        }
        continue;
      }
      if (enemy.behavior === "orbit") {
        enemy.phase += delta * 0.9;
        targetX += Math.cos(enemy.phase) * 110;
        targetY += Math.sin(enemy.phase) * 85;
      }
    }

    const playerDistance = Math.hypot(center.x - enemy.x, center.y - enemy.y);
    const contactRadius = getEnemyHitRadius(enemy) + getPlayerHitRadius();
    const attackProfile = getEnemyAttackProfile(enemy);
    const attackRange = Math.max(attackProfile.range * scaleActor(), contactRadius + 12);
    const detection = Math.max(attackRange * 1.25, 340 * scaleActor());
    if (enemy.typeName === "boss" || playerDistance <= detection) enemy.alerted = true;
    else if (playerDistance > detection * 1.45) enemy.alerted = false;

    if (!enemy.alerted) {
      enemy.element.dataset.ai = "patrol";
      const points = enemy.patrolPoints;
      if (points?.length) {
        let point = points[enemy.patrolIndex] ?? points[0];
        if (Math.hypot(point.x - enemy.x, point.y - enemy.y) < 22) {
          enemy.patrolIndex = (enemy.patrolIndex + 1) % points.length;
          const drift = 72;
          const span = playerDistance || 1;
          point = {
            x: Math.max(36, Math.min(playWorldWidth() - 36, enemy.x + ((center.x - enemy.x) / span) * drift)),
            y: Math.max(36, Math.min(playWorldHeight() - 36, enemy.y + ((center.y - enemy.y) / span) * drift)),
          };
          points[enemy.patrolIndex] = point;
        }
        movementSpeed *= 0.5;
        moveEnemyToward(
          enemy,
          point.x,
          point.y,
          Math.hypot(point.x - enemy.x, point.y - enemy.y) || 1,
          delta * movementSpeed / enemy.speed * motionScale(),
        );
      }
      continue;
    }

    if (playerDistance <= attackRange) {
      enemy.element.dataset.ai = "attack";
      if (Math.abs(center.x - enemy.x) > 6) {
        enemy.element.classList.toggle("enemy-facing-left", center.x < enemy.x);
      }
      if (!(enemy.frozenRemaining > 0) && enemy.attackCooldown === 0) beginEnemyAttack(enemy, attackProfile);
      continue;
    }

    enemy.element.dataset.ai = "chase";
    const waypoint = getNavWaypoint(enemy, center.x, center.y);
    if (waypoint) {
      targetX = waypoint.x;
      targetY = waypoint.y;
    }
    const dx = targetX - enemy.x;
    const dy = targetY - enemy.y;
    const distance = waypoint ? Infinity : Math.hypot(dx, dy) || 1;
    moveEnemyToward(enemy, targetX, targetY, distance, delta * movementSpeed / enemy.speed * motionScale());

    const contactDistance = Math.hypot(center.x - enemy.x, center.y - enemy.y);
    if (!(enemy.frozenRemaining > 0) && enemy.attackCooldown === 0 && contactDistance <= attackRange) {
      beginEnemyAttack(enemy, attackProfile);
    }
  }
}

function scaleActor() {
  return Math.max(0.48, Math.min(1, playWorldWidth() / 1160));
}

function getEnemyAttackProfile(enemy) {
  const waveProgress = Math.max(0, Math.min(4, waveNumber - 1));
  const cooldownScale = Math.max(0.62, 1 - waveProgress * 0.09);
  const profiles = {
    grunt: { kind: "bite", windup: 0.42, cooldown: 1.55, range: 44, radius: 34, damage: 1 },
    scout: { kind: "lunge", windup: 0.38, cooldown: 1.65, range: 128, radius: 42, damage: 1.15 },
    brute: { kind: "slam", windup: 0.76, cooldown: 2.45, range: 118, radius: 88, damage: 1.35 },
    gardien: { kind: "projectile", windup: 0.82, cooldown: 3.2, range: 300, radius: 0, damage: 1 },
    chasseur: { kind: "lunge", windup: 0.56, cooldown: 2.25, range: 148, radius: 52, damage: 1.25 },
    colosse: { kind: "slam", windup: 0.95, cooldown: 3.4, range: 142, radius: 124, damage: 1.45 },
    "fossoyeur-maudit": { kind: "lunge", windup: 0.62, cooldown: 2.65, range: 155, radius: 54, damage: 1.1 },
    "epouvantail-automne": { kind: "slam", windup: 0.8, cooldown: 3.1, range: 165, radius: 105, damage: 1.2 },
    "maitre-des-cauchemars": { kind: "projectile", windup: 0.72, cooldown: 2.8, range: 340, radius: 0, damage: 1.15 },
    "bouffon-frondeur": { kind: "projectile", windup: 0.5, cooldown: 2.05, range: 350, radius: 0, damage: 0.9 },
    "serviteur-squelette": { kind: "lunge", windup: 0.44, cooldown: 1.9, range: 100, radius: 40, damage: 0.8 },
    "gargouille-epineuse": { kind: "lunge", windup: 0.48, cooldown: 1.9, range: 120, radius: 45, damage: 0.9 },
    "ombre-rampante": { kind: "bite", windup: 0.4, cooldown: 1.75, range: 95, radius: 40, damage: 0.85 },
    "petit-bouffon-frondeur": { kind: "projectile", windup: 0.55, cooldown: 2.1, range: 260, radius: 0, damage: 0.75 },
    "archer-de-lombre": { kind: "projectile", windup: 0.72, cooldown: 2.7, range: 330, radius: 0, damage: 0.9 },
    "soldat-de-lombre": { kind: "slam", windup: 0.68, cooldown: 2.5, range: 100, radius: 52, damage: 1 },
    "goule-de-lombre": { kind: "lunge", windup: 0.38, cooldown: 1.65, range: 125, radius: 44, damage: 0.95 },
  };
  const profileName = enemy.typeName === "boss" ? enemy.profileName : enemy.typeName;
  const profile = profiles[profileName];
  if (!profile) throw new Error(`Profil d'attaque inconnu : ${profileName}`);
  if (enemy.typeName === "boss") {
    const tier = enemy.bossTier ?? 0;
    const enraged = tier >= 1 && enemy.health <= enemy.maxHealth / 2;
    enemy.element.classList.toggle("boss-enraged", enraged);
    const volley = tier >= 3 ? 3 : tier >= 1 ? 2 : 1;
    return {
      ...profile,
      cooldown: profile.cooldown * Math.max(0.6, 1 - tier * 0.1) * (enraged ? 0.75 : 1),
      windup: profile.windup * Math.max(0.75, 1 - tier * 0.06),
      radius: profile.radius * (1 + tier * 0.08) * (enraged ? 1.15 : 1),
      volley: enraged ? Math.min(4, volley + 1) : volley,
    };
  }
  return { ...profile, cooldown: profile.cooldown * cooldownScale };
}

function beginEnemyAttack(enemy, attack) {
  const center = playerCenter();
  enemy.attackWindup = attack.windup;
  enemy.attackKind = attack.kind;
  enemy.attackVolley = attack.volley ?? 1;
  enemy.attackDamage = enemy.damage * attack.damage;
  enemy.attackRadius = attack.radius * scaleActor();
  enemy.attackTargetX = center.x;
  enemy.attackTargetY = center.y;
  enemy.attackCooldown = attack.cooldown;
  enemy.element.classList.add("enemy-winding-up");
  enemy.element.classList.remove("enemy-attacking");
  void enemy.element.offsetWidth;
  enemy.element.classList.add("enemy-attacking");

  const warningRadius = attack.kind === "slam" ? enemy.attackRadius : attack.kind === "lunge" ? 38 * scaleActor() : 22 * scaleActor();
  const warningX = attack.kind === "slam" ? enemy.x : enemy.attackTargetX;
  const warningY = attack.kind === "slam" ? enemy.y : enemy.attackTargetY;
  createEnemyAttackWarning(warningX, warningY, warningRadius, attack.kind);
  if (attack.kind === "projectile") {
    enemy.element.style.setProperty("--aim-windup", `${attack.windup}s`);
    enemy.element.classList.add("enemy-aiming");
    createEnemyAimLine(enemy, enemy.attackTargetX, enemy.attackTargetY, attack.windup);
  }
  playSound("enemy-attack", enemy.typeName === "boss" ? enemy.profileName : enemy.typeName);
}

function createEnemyAttackWarning(x, y, radius, attackKind) {
  const warning = document.createElement("span");
  warning.className = `enemy-attack-warning enemy-attack-warning-${attackKind}`;
  warning.setAttribute("aria-hidden", "true");
  warning.style.left = `${x}px`;
  warning.style.top = `${y}px`;
  warning.style.width = `${radius * 2}px`;
  warning.style.height = `${radius * 2}px`;
  world.append(warning);
  window.setTimeout(() => warning.remove(), 1100);
}

function resolveEnemyAttack(enemy) {
  enemy.element.classList.remove("enemy-winding-up", "enemy-aiming");
  enemy.element.classList.remove("enemy-attacking");
  void enemy.element.offsetWidth;
  enemy.element.classList.add("enemy-attacking");
  const center = playerCenter();
  const scale = scaleActor();
  const attackRadius = enemy.attackRadius ?? 0;
  let hit = false;

  if (enemy.attackKind === "projectile") {
    const angle = Math.atan2(center.y - enemy.y, center.x - enemy.x);
    const volley = enemy.attackVolley ?? 1;
    const offsets = Array.from({ length: volley }, (_, index) => (index - (volley - 1) / 2) * 0.24);
    fireEnemyVolley(enemy, angle, offsets, enemy.attackDamage, 90);
    playSound("enemy-projectile", enemy.typeName === "boss" ? enemy.profileName : enemy.typeName);
    return;
  }

  if (enemy.attackKind === "lunge") {
    const slash = document.createElement("span");
    slash.className = "enemy-attack-slash";
    slash.setAttribute("aria-hidden", "true");
    slash.style.left = `${enemy.attackTargetX}px`;
    slash.style.top = `${enemy.attackTargetY}px`;
    world.append(slash);
    window.setTimeout(() => slash.remove(), 420);
    const distanceToTarget = Math.hypot(enemy.attackTargetX - enemy.x, enemy.attackTargetY - enemy.y);
    moveEnemyToward(
      enemy,
      enemy.attackTargetX,
      enemy.attackTargetY,
      distanceToTarget,
      Math.min(65 * scale, distanceToTarget) / Math.max(enemy.speed, 1),
    );
    hit = circlesOverlap(
      enemy.x,
      enemy.y,
      getEnemyHitRadius(enemy) + attackRadius,
      center.x,
      center.y,
      getPlayerHitRadius(),
    );
  } else if (enemy.attackKind === "slam") {
    const shockwave = document.createElement("span");
    shockwave.className = "enemy-attack-slam";
    shockwave.style.left = `${enemy.x}px`;
    shockwave.style.top = `${enemy.y}px`;
    shockwave.style.width = `${attackRadius * 2}px`;
    shockwave.style.height = `${attackRadius * 2}px`;
    shockwave.setAttribute("aria-hidden", "true");
    world.append(shockwave);
    window.setTimeout(() => shockwave.remove(), 520);
    hit = circlesOverlap(enemy.x, enemy.y, attackRadius, center.x, center.y, getPlayerHitRadius());
  } else {
    hit = circlesOverlap(
      enemy.x,
      enemy.y,
      attackRadius || 34 * scale,
      center.x,
      center.y,
      getPlayerHitRadius(),
    );
  }

  if (hit) {
    damagePlayer(enemy.attackDamage, enemy);
    playSound("enemy-attack-hit", enemy.typeName === "boss" ? enemy.profileName : enemy.typeName);
  }
}

function setBossAnimationState(boss, state, duration = 0) {
    boss.bossState = state;
    boss.stateTimer = duration;
    for (const name of ["appearing", "idle", "attacking-light", "attacking-heavy", "transition", "defeated"]) {
      boss.element.classList.toggle(`boss-state-${name}`, state === name);
    }
  }

function getPlayerHitRadius() {
    return 20 * Math.max(0.48, Math.min(1, playWorldWidth() / 1160)) * characterScale;
  }

function getEnemyHitRadius(enemy) {
    return enemy.element.offsetWidth * Math.max(0.48, Math.min(1, playWorldWidth() / 1160)) * characterScale * 0.42;
  }

function circlesOverlap(x1, y1, radius1, x2, y2, radius2) {
    return Math.hypot(x1 - x2, y1 - y2) <= radius1 + radius2;
  }

function applyEnemyKnockback(enemy, source, distance) {
    const dx = enemy.x - source.x;
    const dy = enemy.y - source.y;
    const length = Math.hypot(dx, dy) || 1;
    const radius = getEnemyHitRadius(enemy);
    const steps = Math.max(1, Math.ceil(distance / 6));
    for (let index = 0; index < steps; index += 1) {
      const nextX = enemy.x + dx / length * distance / steps;
      const nextY = enemy.y + dy / length * distance / steps;
      if (!canOccupy(nextX, nextY, radius)) break;
      enemy.x = nextX;
      enemy.y = nextY;
    }
    enemy.element.style.left = `${enemy.x}px`;
    enemy.element.style.top = `${enemy.y}px`;
  }

function beginMegaBossAttack(boss, target) {
    const phase = boss.bossPhase ?? 1;
    const patterns = phase === 3 ? ["slam", "projectile", "melee"] : phase === 2
      ? ["projectile", "melee", "slam"] : ["melee", "projectile"];
    boss.attackPattern = patterns[boss.attackIndex % patterns.length];
    boss.attackIndex += 1;
    boss.attackTargetX = target.x;
    boss.attackTargetY = target.y;
    boss.attackWindup = boss.attackPattern === "slam" ? 0.9 : 0.68;
    setBossAnimationState(boss, boss.attackPattern === "slam" ? "attacking-heavy" : "attacking-light");
    if (boss.attackPattern === "slam") createBossWarning(target.x, target.y, 138);
    else if (boss.attackPattern === "melee" && stage === "ultimate") {
      createBossWarning(target.x, target.y, 86);
    } else createBossWarning(boss.x, boss.y, boss.attackPattern === "melee" ? 92 : 58);
    if (boss.attackPattern === "projectile") createEnemyAimLine(boss, target.x, target.y, boss.attackWindup);
  }

function createBossWarning(x, y, radius) {
    const warning = document.createElement("span");
    warning.className = "boss-attack-warning";
    warning.setAttribute("aria-hidden", "true");
    warning.style.left = `${x}px`;
    warning.style.top = `${y}px`;
    warning.style.width = `${radius * 2}px`;
    warning.style.height = `${radius * 2}px`;
    world.append(warning);
    window.setTimeout(() => warning.remove(), 1200);
  }

function resolveMegaBossAttack(boss) {
    if (boss.attackPattern === "melee") {
      if (stage === "ultimate") {
        const x = boss.attackTargetX;
        const y = boss.attackTargetY;
        const radius = 86 * Math.max(0.48, Math.min(1, playWorldWidth() / 1160));
        const slash = document.createElement("span");
        slash.className = "mega-shockwave throne-sweep";
        slash.setAttribute("aria-hidden", "true");
        slash.style.left = `${x}px`;
        slash.style.top = `${y}px`;
        world.append(slash);
        window.setTimeout(() => slash.remove(), 900);
        if (circlesOverlap(x, y, radius, playerCenter().x, playerCenter().y, getPlayerHitRadius())) {
          damagePlayer(boss.damage * (boss.bossPhase === 3 ? 1.3 : boss.bossPhase === 2 ? 1.12 : 1), boss);
        }
        boss.attackCooldown = boss.bossPhase === 3 ? 0.55 : 0.8;
        setBossAnimationState(boss, "idle");
        playSound("mega-attack", boss.profileName);
        return;
      }
      const dx = boss.attackTargetX - boss.x;
      const dy = boss.attackTargetY - boss.y;
      const length = Math.hypot(dx, dy) || 1;
      boss.dashX = dx / length;
      boss.dashY = dy / length;
      boss.dashRemaining = 0.34;
      boss.dashHitPlayer = false;
      boss.attackDamage = boss.damage * (boss.bossPhase === 3 ? 1.3 : boss.bossPhase === 2 ? 1.12 : 1);
      setBossAnimationState(boss, "attacking-heavy");
      playSound("mega-attack", boss.profileName);
    } else if (boss.attackPattern === "projectile") {
      const centerX = playerCenter().x;
      const centerY = playerCenter().y;
      const baseAngle = Math.atan2(centerY - boss.y, centerX - boss.x);
      const spread = boss.bossPhase === 3 ? [-0.45, -0.22, 0, 0.22, 0.45] : [-0.24, 0, 0.24];
      const damage = boss.damage * (boss.bossPhase === 3 ? 1.3 : boss.bossPhase === 2 ? 1.12 : 1);
      fireEnemyVolley(boss, baseAngle, spread, damage, 70);
      boss.attackCooldown = boss.bossPhase === 3 ? 0.72 : 1.1;
      setBossAnimationState(boss, "idle");
      playSound("mega-attack", boss.profileName);
    } else {
      const x = boss.attackTargetX;
      const y = boss.attackTargetY;
      const radius = 138 * Math.max(0.48, Math.min(1, playWorldWidth() / 1160));
      const shockwave = document.createElement("span");
      shockwave.className = "mega-shockwave";
      shockwave.setAttribute("aria-hidden", "true");
      shockwave.style.left = `${x}px`;
      shockwave.style.top = `${y}px`;
      world.append(shockwave);
      window.setTimeout(() => shockwave.remove(), 900);
      if (circlesOverlap(x, y, radius, playerCenter().x, playerCenter().y, getPlayerHitRadius())) {
        damagePlayer(boss.damage * (boss.bossPhase === 3 ? 1.3 : boss.bossPhase === 2 ? 1.12 : 1), { x, y });
      }
      boss.attackCooldown = boss.bossPhase === 3 ? 0.6 : 0.95;
      setBossAnimationState(boss, "idle");
      playSound("mega-attack", boss.profileName);
    }
  }

const enemyShotStyles = {
  "archer-de-lombre": "arrow",
  "petit-bouffon-frondeur": "stone",
  "bouffon-frondeur": "stone",
  gardien: "spirit",
  "maitre-des-cauchemars": "nightmare",
  "mega-cauchemar": "hellfire",
};
const enemyShotProfiles = {
  arrow: { speed: 430, radius: 9, muzzle: 30 },
  stone: { speed: 340, radius: 10, muzzle: 26 },
  spirit: { speed: 250, radius: 12, muzzle: 22 },
  nightmare: { speed: 270, radius: 13, muzzle: 34 },
  hellfire: { speed: 300, radius: 14, muzzle: 48 },
};

function getEnemyShotStyle(enemy) {
  const name = enemy.typeName === "boss" ? enemy.profileName : enemy.typeName;
  const style = enemyShotStyles[name];
  if (!style) throw new Error(`Aucun style de tir pour : ${name}`);
  return style;
}

function createEnemyAimLine(enemy, targetX, targetY, windup) {
  const style = getEnemyShotStyle(enemy);
  const length = Math.hypot(targetX - enemy.x, targetY - enemy.y);
  const line = document.createElement("span");
  line.className = `enemy-aim-line enemy-aim-${style}`;
  line.setAttribute("aria-hidden", "true");
  line.style.left = `${enemy.x}px`;
  line.style.top = `${enemy.y}px`;
  line.style.width = `${length}px`;
  line.style.setProperty("--angle", `${Math.atan2(targetY - enemy.y, targetX - enemy.x)}rad`);
  line.style.setProperty("--windup", `${windup}s`);
  world.append(line);
  window.setTimeout(() => line.remove(), windup * 1000 + 60);
  const charge = createFxLayer(`enemy-charge-fx enemy-charge-${style}`, enemy.x, enemy.y, windup * 1000 + 60);
  charge.style.setProperty("--windup", `${windup}s`);
  addFxParts(charge, "enemy-charge-core");
  addFxParts(charge, "enemy-charge-mote", 5, (partStyle, index) => scatterFx(partStyle, index, 5, 14, 26));
}

function fireEnemyShot(shooter, angle, damage) {
  const style = getEnemyShotStyle(shooter);
  const profile = enemyShotProfiles[style];
  const scale = scaleActor();
  const muzzleX = shooter.x + Math.cos(angle) * profile.muzzle * scale;
  const muzzleY = shooter.y + Math.sin(angle) * profile.muzzle * scale;
  const flash = createFxLayer(`enemy-muzzle-fx enemy-muzzle-${style}`, muzzleX, muzzleY, 420);
  flash.style.setProperty("--angle", `${angle}rad`);
  addFxParts(flash, "enemy-muzzle-flash");
  addFxParts(flash, "enemy-muzzle-smoke", 4, (partStyle, index) => scatterFx(partStyle, index, 4, 8, 20, { delay: 0.04 }));
  shooter.element.style.setProperty("--recoil-x", `${(-Math.cos(angle) * 7).toFixed(1)}px`);
  shooter.element.style.setProperty("--recoil-y", `${(-Math.sin(angle) * 7).toFixed(1)}px`);
  shooter.element.classList.remove("enemy-firing");
  void shooter.element.offsetWidth;
  shooter.element.classList.add("enemy-firing");
  window.clearTimeout(shooter.firingTimer);
  shooter.firingTimer = window.setTimeout(() => shooter.element.classList.remove("enemy-firing"), 260);
  createBossProjectile(muzzleX, muzzleY, angle, damage, style);
}

function fireEnemyVolley(shooter, baseAngle, offsets, damage, interval) {
  const volleyRound = roundId;
  offsets.forEach((offset, index) => {
    const fire = () => {
      if (volleyRound !== roundId || !gameActive || !enemies.has(shooter)) return;
      fireEnemyShot(shooter, baseAngle + offset, damage);
    };
    if (index === 0) fire();
    else window.setTimeout(fire, index * interval);
  });
}

function createEnemyShotImpact(x, y, style, big) {
  const impact = createFxLayer(`enemy-shot-impact enemy-impact-${style}${big ? " is-big" : ""}`, x, y, 480);
  addFxParts(impact, "enemy-impact-flash");
  addFxParts(impact, "enemy-impact-spark", big ? 8 : 5, (partStyle, index) => (
    scatterFx(partStyle, index, big ? 8 : 5, 10, big ? 34 : 22, { spin: 200 })
  ));
}

function createBossProjectile(x, y, angle, damage, style) {
    const profile = enemyShotProfiles[style];
    if (!profile) throw new Error(`Style de projectile inconnu : ${style}`);
    const element = document.createElement("span");
    element.className = `boss-projectile enemy-shot enemy-shot-${style}`;
    element.setAttribute("aria-hidden", "true");
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.setProperty("--angle", `${angle}rad`);
    world.append(element);
    bossProjectiles.add({
      element,
      x,
      y,
      style,
      velocityX: Math.cos(angle) * profile.speed,
      velocityY: Math.sin(angle) * profile.speed,
      damage,
      radius: profile.radius,
    });
  }

function updateBossProjectiles(delta) {
    const center = playerCenter();
    for (const projectile of bossProjectiles) {
      projectile.x += projectile.velocityX * delta * motionScale();
      projectile.y += projectile.velocityY * delta * motionScale();
      projectile.element.style.left = `${projectile.x}px`;
      projectile.element.style.top = `${projectile.y}px`;
      if (circlesOverlap(projectile.x, projectile.y, projectile.radius, center.x, center.y, getPlayerHitRadius())) {
        createEnemyShotImpact(projectile.x, projectile.y, projectile.style, true);
        if (dodgeInvulnerabilityRemaining === 0) damagePlayer(projectile.damage, { x: projectile.x, y: projectile.y });
        projectile.element.remove();
        bossProjectiles.delete(projectile);
        if (!gameActive) return;
      } else if ((projectile.style === "arrow" || projectile.style === "stone") && !canOccupy(projectile.x, projectile.y, 2)) {
        createEnemyShotImpact(projectile.x, projectile.y, projectile.style, false);
        projectile.element.remove();
        bossProjectiles.delete(projectile);
      } else if (projectile.x < -30 || projectile.y < -30
        || projectile.x > playWorldWidth() + 30 || projectile.y > playWorldHeight() + 30) {
        projectile.element.remove();
        bossProjectiles.delete(projectile);
      }
    }
  }

function updateGame(delta) {
  if (!gameActive) return;

  dodgeCooldown = Math.max(0, dodgeCooldown - delta);
  if (restartLock > 0) {
    restartLock = Math.max(0, restartLock - delta);
    return;
  }

  if (waveCountdown > 0) {
    waveCountdown = Math.max(0, waveCountdown - delta);
    if (waveCountdown === 0) {
      waveCountdownDisplay.hidden = true;
      playWeaponDraw();
      updateTimer();
      updateCombatLoadout();
    } else {
      const countdownNumber = Math.ceil(waveCountdown);
      waveCountdownNumber.textContent = String(countdownNumber);
      waveCountdownLabel.textContent = stage === "ultimate"
        ? "LE CHAMBELLAN APPROCHE"
        : stage === "portal" ? "VAGUE 5 — LA SALLE DU TRÔNE"
        : `VAGUE ${waveNumber} — ${bossMapNames[waveNumber] ?? "PRÉPARE-TOI"}`;
      waveCountdownDisplay.setAttribute("aria-label", `Début dans ${countdownNumber} secondes`);
      updateTimer();
    }
    return;
  }

  dodgeInvulnerabilityRemaining = Math.max(0, dodgeInvulnerabilityRemaining - delta);
  if (dodgeInvulnerabilityRemaining === 0) player.classList.remove("is-invulnerable");
  updateActiveBoost(delta);
  updateBoostCooldown(delta);
  updatePowerCooldown(delta);
  runElapsed += delta;
  if (!waveCleared) timeLeft = Math.max(0, timeLeft - delta);
  updateTimer();
  if (timeLeft === 0) {
    if (stage === "waves") {
      advanceWave();
    } else {
      showGameOver(stage === "ultimate"
        ? "Le Chambellan sorcier t'a vaincu."
        : stage === "portal" ? "Le portail s'est refermé avant ton entrée."
        : "La vague de boss est terminée.", false);
    }
    return;
  }

  const bossArrivalTime = getBossArrivalTime();
  if (!bossWarningShown && bossesRemaining.length > 0 && timeLeft <= bossArrivalTime + 5) {
    bossWarningShown = true;
    const warnedRound = roundId;
    roundMessage.textContent = stage === "portal" || stage === "ultimate"
      ? "⚠ LE CHAMBELLAN ARRIVE DANS 5 SECONDES !"
      : "⚠ LE BOSS ARRIVE DANS 5 SECONDES !";
    roundMessage.hidden = false;
    arena.classList.add("boss-incoming");
    window.setTimeout(() => {
      arena.classList.remove("boss-incoming");
      if (warnedRound === roundId && roundMessage.textContent.startsWith("⚠")) roundMessage.hidden = true;
    }, 2400);
    playSound("boss-warning");
  }
  if (stage === "portal" && timeLeft <= bossArrivalTime) {
    startUltimateBossStage(true);
  }
  if (stage !== "portal" && bossesRemaining.length > 0 && timeLeft <= bossArrivalTime && (stage === "boss-wave" || !bossAlive)) {
    bossSpawnElapsed += delta;
    const bossSpawnInterval = stage === "boss-wave" ? 1.4 : waveNumber === 2 ? 0.5 : 2.5;
    if (bossSpawnElapsed >= bossSpawnInterval) {
      createBoss(bossesRemaining.shift());
      bossSpawnElapsed = 0;
    }
  }

  const isFinalWave = stage === "portal" || stage === "ultimate";
  const minionsCanSpawn = isFinalWave || ((stage === "waves" || stage === "boss-wave") && !waveCleared);
  if (minionsCanSpawn && enemies.size < getEnemyCap()) {
    minionSpawnElapsed += delta;
    const minionSpawn = getMinionSpawnPlan();
    if (minionSpawnElapsed >= minionSpawn.interval) {
      minionSpawnElapsed = 0;
      spawnBossMinion(undefined, minionSpawn.count);
    }
  } else {
    minionSpawnElapsed = 0;
  }

  shootElapsed += delta;
  const firingInterval = shootInterval;
  if ((autoShootEnabled || shooting) && shootElapsed >= firingInterval) {
    const target = shootingWithPointer ? aim : nearestEnemy();
    if (target && (shootingWithPointer || isTargetInWeaponReach(target))) {
      shootElapsed %= firingInterval;
      fireStone(target.x, target.y);
    } else {
      shootElapsed = firingInterval;
    }
  } else if (!autoShootEnabled && !shooting) {
    shootElapsed = 0;
  }

  updatePowerFields(delta);
  updateEnemies(delta);
  updateBossProjectiles(delta);
  updatePickups(delta);
  if (portalElement) {
    portalArmRemaining = Math.max(0, portalArmRemaining - delta);
    portalElement.classList.toggle("is-armed", portalArmRemaining === 0);
    const center = playerCenter();
    if (portalArmRemaining === 0
      && Math.hypot(center.x - playWorldWidth() * portalPoint.x, center.y - playWorldHeight() * portalPoint.y) < 78) {
      enterPortal();
    }
  }
}

arena.addEventListener("pointerdown", (event) => {
  if (event.target instanceof Element
    && event.target.closest(".game-hud, .combat-loadout, .hud-timer, .hud-hearts, .hud-sound, .game-over, .boss-portal, .weapon-pickup, .front-menu, .settings-panel, .touch-hud, .account-gate, .control-editor")) return;
  if (event.button !== 0) return;
  event.preventDefault();
  initializeAudio();
  Object.assign(aim, screenToWorld(event.clientX, event.clientY));
  startShooting(true);
});

arena.addEventListener("pointermove", (event) => {
  if (!shootingWithPointer) return;
  Object.assign(aim, screenToWorld(event.clientX, event.clientY));
});

window.addEventListener("pointerup", stopShooting);
window.addEventListener("pointercancel", stopShooting);
window.addEventListener("pointerdown", initializeAudio, { once: true });
window.addEventListener("keydown", initializeAudio, { once: true });

window.addEventListener("keydown", (event) => {
  const key = keyFromEvent(event);
  if (keyCaptureAction) {
    event.preventDefault();
    event.stopPropagation();
    if (key !== "escape") bindKey(keyCaptureAction, key);
    keyCaptureAction = "";
    renderKeyBindings();
    return;
  }
  if (key === "escape" && !event.repeat) {
    if (!adminPanel.hidden) {
      event.preventDefault();
      closeAdminPanel();
      return;
    }
    if (!settingsPanel.hidden) {
      event.preventDefault();
      closeSettings();
      return;
    }
    if (gameActive && gameOver.hidden && !document.querySelector(".crate-opening:not([hidden])")) {
      event.preventDefault();
      openSettings();
      return;
    }
  }
  if (!adminPanel.hidden || !settingsPanel.hidden) return;
  if (event.target instanceof HTMLElement
    && event.target.closest("input, textarea, select, [contenteditable='true']")) return;
  if (isMovementKey(key) || isActionKey("shoot", key) || isActionKey("dodge", key)) initializeAudio();
  if (isActionKey("boost", key) && !event.repeat) {
    event.preventDefault();
    useEquippedBoost();
  }
  if (isActionKey("power", key) && !event.repeat) {
    event.preventDefault();
    useActivePower();
  }
  if (isActionKey("pickup", key) && !event.repeat) {
    event.preventDefault();
    pickUpNearbyWeapon();
  }
  if (!event.repeat && (isActionKey("swap", key) || isActionKey("ranged", key) || isActionKey("melee", key))) {
    event.preventDefault();
    selectWeaponSlot(isActionKey("ranged", key) ? "ranged"
      : isActionKey("melee", key) ? "melee"
      : activeWeaponSlot === "ranged" ? "melee" : "ranged");
  }
  if (isActionKey("portal", key) && !event.repeat && portalElement) {
    event.preventDefault();
    enterPortal();
  }
  if (isMovementKey(key)) {
    event.preventDefault();
    keys.add(key);
  } else if (isActionKey("dodge", key)) {
    event.preventDefault();
    if (!event.repeat) startDodge();
  } else if (isActionKey("shoot", key) && !event.repeat) {
    event.preventDefault();
    startShooting(false);
  }
});

window.addEventListener("keyup", (event) => {
  if (event.target instanceof HTMLElement
    && event.target.closest("input, textarea, select, [contenteditable='true']")) return;
  const key = keyFromEvent(event);
  keys.delete(key);
  if (isActionKey("shoot", key)) stopShooting();
});

window.addEventListener("blur", () => {
  keys.clear();
  stopShooting();
});
window.addEventListener("resize", updatePlayer);
window.addEventListener("orientationchange", () => {
  updatePlayer();
  window.setTimeout(updatePlayer, 60);
  window.setTimeout(updatePlayer, 180);
  window.setTimeout(updatePlayer, 400);
});
window.visualViewport?.addEventListener("resize", updatePlayer);
startButton.addEventListener("click", () => {
  restartRound();
});
retryButton.addEventListener("click", () => {
  restartRound();
  initializeAudio();
});
frontMenu.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const navButton = event.target.closest("[data-nav]");
  if (!(navButton instanceof HTMLButtonElement)) return;
  initializeAudio();
  const destination = navButton.dataset.nav;
  if (destination === "shop") showShop();
  else if (destination === "locker") showLocker("loadout");
  else if (destination === "upgrades") showLocker("upgrades");
  else if (destination === "rewards") showRewards();
  else if (destination === "home") showPreparationMenu();
  else throw new Error(`Destination de menu inconnue : ${destination}`);
});
backToMenuButton.addEventListener("click", showPreparationMenu);
shopButton.addEventListener("click", showPreparationMenu);
openLockerButton.addEventListener("click", () => showLocker());
backFromLockerButton.addEventListener("click", showPreparationMenu);
backFromRewardsButton.addEventListener("click", showPreparationMenu);
useBoostButton.addEventListener("click", useEquippedBoost);
usePowerButton.addEventListener("click", useActivePower);
for (const slotButton of [combatRangedSlot, combatMeleeSlot]) {
  slotButton.addEventListener("click", () => {
    selectWeaponSlot(slotButton.dataset.weaponSlot);
    slotButton.blur();
  });
}
backToMenuButton.addEventListener("click", initializeAudio);
shopButton.addEventListener("click", initializeAudio);
openLockerButton.addEventListener("click", initializeAudio);
backFromLockerButton.addEventListener("click", initializeAudio);
playerNameInput.addEventListener("change", () => {
  const nextName = playerNameInput.value.trim().slice(0, 16);
  const remaining = progression.playerName && progression.playerNameChangedAt > 0
    ? pseudoChangeCooldown - (Date.now() - progression.playerNameChangedAt)
    : 0;
  if (remaining > 0 && nextName !== progression.playerName) {
    playerNameInput.value = progression.playerName;
    updatePlayerNameCooldown();
    return;
  }
  if (nextName !== progression.playerName) {
    progression.playerName = nextName;
    progression.playerNameChangedAt = Date.now();
  }
  playerNameInput.value = nextName;
  updatePlayerNameDisplay();
  saveProgression("Pseudo enregistré. Tu pourras le modifier dans une heure.");
  updatePlayerNameCooldown();
  if (!frontMenu.hidden && !loadoutScreen.hidden) {
    menuTitle.textContent = progression.playerName ? `Prépare-toi, ${progression.playerName}` : "Prépare ta survie";
  }
  if (!frontMenu.hidden && !lockerScreen.hidden) showLocker();
});
playerNameInput.addEventListener("input", () => {
  if (playerNameInput.readOnly) {
    playerNameInput.value = progression.playerName;
    return;
  }
  const draftName = playerNameInput.value.trim().slice(0, 16);
  if (!frontMenu.hidden && !loadoutScreen.hidden) {
    menuTitle.textContent = draftName ? `Prépare-toi, ${draftName}` : "Prépare ta survie";
  }
});
function handleShopClick(event) {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest(".shop-buy-button");
  if (!(button instanceof HTMLButtonElement) || button.disabled) return;
  if (button.dataset.action === "equip") equipShopItem(button.dataset.itemId, button.dataset.category);
  else if (button.dataset.action === "buy") purchaseShopItem(button.dataset.itemId, button.dataset.category);
  else if (button.dataset.action === "open-crate") openCrate(button.dataset.crateId);
  else if (button.dataset.action === "buy-pack") purchasePack(button.dataset.packId);
}
shopItems.addEventListener("click", handleShopClick);
shopCatalogItems.addEventListener("click", handleShopClick);
shopTabs.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const tab = event.target.closest(".store-tab");
  if (!(tab instanceof HTMLButtonElement)) return;
  activeShopTab = tab.dataset.tab;
  renderShop();
});
shopHideOwned.addEventListener("change", renderShop);
shopSort.addEventListener("change", renderShop);
lockerScreen.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const tab = event.target.closest(".locker-tab");
  if (tab instanceof HTMLButtonElement) {
    activeLockerTab = tab.dataset.lockerTab;
    setMenuScreen("locker");
    renderLocker();
    return;
  }
  const slot = event.target.closest(".locker-slot");
  if (slot instanceof HTMLButtonElement) {
    activeLockerSlot = slot.dataset.category;
    renderLocker();
    return;
  }
  const upgradeChoice = event.target.closest(".upgrade-choice");
  if (upgradeChoice instanceof HTMLButtonElement) {
    activeUpgrade = { category: upgradeChoice.dataset.category, id: upgradeChoice.dataset.itemId };
    renderLockerUpgrades();
    return;
  }
  const upgradeButton = event.target.closest(".upgrade-button");
  if (upgradeButton instanceof HTMLButtonElement) {
    if (!upgradeButton.disabled) upgradeLockerItem(upgradeButton.dataset.category, upgradeButton.dataset.itemId);
    return;
  }
  const choice = event.target.closest(".locker-choice");
  if (choice instanceof HTMLButtonElement) equipLockerChoice(choice.dataset.category, choice.dataset.itemId);
});
lockerPickerGrid.addEventListener("pointerover", (event) => {
  if (!(event.target instanceof Element)) return;
  const choice = event.target.closest(".locker-choice");
  if (choice) previewLockerChoice(choice);
});
lockerPickerGrid.addEventListener("focusin", (event) => {
  if (event.target instanceof Element) previewLockerChoice(event.target.closest(".locker-choice"));
});
lockerPickerGrid.addEventListener("pointerleave", () => previewLockerChoice(null));
lockerCraftingItems.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest(".locker-equip-button[data-recipe-id]");
  if (!(button instanceof HTMLButtonElement) || button.disabled) return;
  craftItem(button.dataset.recipeId);
});
const touchStick = document.querySelector("#touch-stick");
const touchKnob = document.querySelector("#touch-stick-knob");
const touchDodge = document.querySelector("#touch-dodge");
const touchPickup = document.querySelector("#touch-pickup");
const touchMove = { x: 0, y: 0 };
let touchPointerId = null;

function placeTouchKnob(clientX, clientY) {
  const rect = touchStick.getBoundingClientRect();
  const dx = clientX - (rect.left + rect.width / 2);
  const dy = clientY - (rect.top + rect.height / 2);
  const max = rect.width * 0.32;
  const length = Math.hypot(dx, dy) || 1;
  const clamped = Math.min(max, length);
  const nx = dx / length;
  const ny = dy / length;
  touchKnob.style.transform = `translate(${nx * clamped}px, ${ny * clamped}px)`;
  const power = clamped / max;
  touchMove.x = power < 0.16 ? 0 : nx * Math.min(1, power);
  touchMove.y = power < 0.16 ? 0 : ny * Math.min(1, power);
}

function releaseTouchStick() {
  touchPointerId = null;
  touchMove.x = 0;
  touchMove.y = 0;
  touchKnob.style.transform = "translate(0, 0)";
}

touchStick.addEventListener("pointerdown", (event) => {
  if (isEditingControls()) return;
  event.preventDefault();
  event.stopPropagation();
  initializeAudio();
  touchPointerId = event.pointerId;
  touchStick.setPointerCapture(event.pointerId);
  placeTouchKnob(event.clientX, event.clientY);
});
touchStick.addEventListener("pointermove", (event) => {
  if (event.pointerId !== touchPointerId) return;
  event.preventDefault();
  placeTouchKnob(event.clientX, event.clientY);
});
touchStick.addEventListener("pointerup", (event) => {
  if (event.pointerId !== touchPointerId) return;
  releaseTouchStick();
});
touchStick.addEventListener("pointercancel", releaseTouchStick);
touchDodge.addEventListener("pointerdown", (event) => {
  if (isEditingControls()) return;
  event.preventDefault();
  event.stopPropagation();
  initializeAudio();
  startDodge();
});
touchPickup.addEventListener("pointerdown", (event) => {
  if (isEditingControls()) return;
  event.preventDefault();
  event.stopPropagation();
  initializeAudio();
  pickUpNearbyWeapon();
});

function selectEditedControl(id) {
  selectedControl = id;
  const spot = (draftTouchLayout ?? touchLayout)[id];
  controlSizeInput.value = String(Math.round(spot.s * 100));
  applyTouchLayout(draftTouchLayout ?? touchLayout);
}

function openControlEditor() {
  if (chosenDevice !== "phone") return;
  closeSettings();
  draftTouchLayout = structuredClone(touchLayout);
  controlEditor.dataset.returnMenu = String(!gameActive && !frontMenu.hidden);
  if (!gameActive) frontMenu.hidden = true;
  document.documentElement.setAttribute("data-editing-controls", "");
  arena.classList.add("is-editing-controls");
  usePowerButton.disabled = false;
  useBoostButton.disabled = false;
  controlEditor.hidden = false;
  selectEditedControl(selectedControl);
}

function closeControlEditor(save) {
  if (!isEditingControls()) return;
  if (save && draftTouchLayout) {
    touchLayout = draftTouchLayout;
    persistAccountExtras();
  }
  draftTouchLayout = null;
  document.documentElement.removeAttribute("data-editing-controls");
  arena.classList.remove("is-editing-controls");
  controlEditor.hidden = true;
  applyTouchLayout();
  updateCombatLoadout();
  if (controlEditor.dataset.returnMenu === "true" && !gameActive) frontMenu.hidden = false;
}

function beginControlDrag(event) {
  const element = event.currentTarget;
  if (!(element instanceof HTMLElement) || !element.dataset.control || !draftTouchLayout) return;
  event.preventDefault();
  event.stopPropagation();
  const id = element.dataset.control;
  selectEditedControl(id);
  const bounds = arena.getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  controlDrag = {
    id,
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    bounds,
  };
  element.setPointerCapture(event.pointerId);
}

function moveControlDrag(event) {
  if (!controlDrag || event.pointerId !== controlDrag.pointerId || !draftTouchLayout) return;
  const { bounds, offsetX, offsetY, id } = controlDrag;
  const element = document.querySelector(`[data-control="${id}"]`);
  const width = element.getBoundingClientRect().width;
  const height = element.getBoundingClientRect().height;
  const x = (event.clientX - offsetX - bounds.left) / bounds.width * 100;
  const y = (event.clientY - offsetY - bounds.top) / bounds.height * 100;
  draftTouchLayout[id] = clampControlSpot(id, {
    x: Math.min(x, 100 - width / bounds.width * 100),
    y: Math.min(y, 100 - height / bounds.height * 100),
    s: draftTouchLayout[id].s,
  });
  applyTouchLayout(draftTouchLayout);
}

function endControlDrag(event) {
  if (!controlDrag || event.pointerId !== controlDrag.pointerId) return;
  controlDrag = null;
}

for (const element of document.querySelectorAll("[data-control]")) {
  element.addEventListener("pointerdown", (event) => {
    if (!isEditingControls()) return;
    beginControlDrag(event);
  });
  element.addEventListener("pointermove", moveControlDrag);
  element.addEventListener("pointerup", endControlDrag);
  element.addEventListener("pointercancel", endControlDrag);
  element.addEventListener("click", (event) => {
    if (!isEditingControls()) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);
}
editTouchControlsButton.addEventListener("click", openControlEditor);
controlSizeInput.addEventListener("input", () => {
  if (!draftTouchLayout || !draftTouchLayout[selectedControl]) return;
  draftTouchLayout[selectedControl].s = Number(controlSizeInput.value) / 100;
  applyTouchLayout(draftTouchLayout);
});
document.querySelector("#control-save").addEventListener("click", () => closeControlEditor(true));
document.querySelector("#control-cancel").addEventListener("click", () => closeControlEditor(false));
document.querySelector("#control-reset").addEventListener("click", () => {
  draftTouchLayout = structuredClone(defaultTouchLayout);
  selectEditedControl("stick");
});

/* Boucle du jeu : une frame à la fois, avec le temps réel entre deux images.
   Si l'onglet passe en arrière-plan, on fige la partie pour ne pas rattraper
   d'un coup tout le temps perdu au retour. */
function gameLoop(time) {
  if (document.hidden) {
    previousTime = 0;
    requestAnimationFrame(gameLoop);
    return;
  }
  const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
  previousTime = time;
  updateShopRotation(delta);
  if (!settingsPanel.hidden && gameActive) {
    requestAnimationFrame(gameLoop);
    return;
  }

  if (gameActive && restartLock === 0 && waveCountdown === 0) {
    let dx = 0;
    let dy = 0;
    if (isActionHeld("left")) dx -= 1;
    if (isActionHeld("right")) dx += 1;
    if (isActionHeld("up")) dy -= 1;
    if (isActionHeld("down")) dy += 1;
    dx += touchMove.x;
    dy += touchMove.y;

    if (dodgeRemaining > 0) {
      const dashTime = Math.min(delta, dodgeRemaining);
      movePlayerBy(dodgeDirection.x * dodgeSpeed * dashTime * motionScale(), dodgeDirection.y * dodgeSpeed * dashTime * motionScale());
      dodgeRemaining = Math.max(0, dodgeRemaining - delta);
      if (dodgeRemaining === 0) player.classList.remove("is-dodging");
    } else if (dx !== 0 || dy !== 0) {
      moveMomentum = Math.min(1, moveMomentum + delta / runRampDuration);
      const running = moveMomentum === 1;
      player.classList.add("is-moving");
      player.classList.toggle("is-walking", !running);
      player.classList.toggle("is-running", running);
      const length = Math.hypot(dx, dy);
      facing.x = dx / length;
      facing.y = dy / length;
      const motionKind = player.dataset.weaponMotion;
      const attackSlow = player.classList.contains("is-shooting")
        ? motionKind === "melee" ? 0.55 : motionKind === "gun" ? 0.88 : 1
        : 1;
      const boostSpeed = (activeBoostId === "vitesse" && activeBoostRemaining > 0 ? 1.35 : 1)
        * (activePowerInvulnerabilityRemaining > 0 ? 1.3 : 1)
        * attackSlow;
      const gaitSpeed = speed * boostSpeed * (walkSpeedRatio + (1 - walkSpeedRatio) * moveMomentum) * motionScale();
      movePlayerBy((dx / length) * gaitSpeed * delta, (dy / length) * gaitSpeed * delta);
      playFootsteps(delta, running);
      if (running) {
        runDustElapsed += delta;
        if (runDustElapsed >= 0.2) {
          runDustElapsed = 0;
          createRunDust();
        }
      }
    } else {
      moveMomentum = Math.max(0, moveMomentum - delta * 4);
      player.classList.remove("is-moving", "is-walking", "is-running");
      stepSoundElapsed = 0;
      runDustElapsed = 0;
    }
  }
  if (aimHoldRemaining > 0) {
    aimHoldRemaining = Math.max(0, aimHoldRemaining - delta);
    if (aimHoldRemaining === 0) player.classList.remove("is-aiming");
  }

  updateGame(delta);
  requestAnimationFrame(gameLoop);
}

updateTimer();
updatePlayer();
updateMenuBalance();
playerNameInput.value = progression.playerName;
updateKeyLabels();
updatePlayerLoadoutAppearance();
updateMusicToggleControls();
updateShopRotation(1);
if (shouldSaveProgression) {
  assignFreeShopOffer();
  saveProgression();
  renderShop();
}
accountModeLogin.addEventListener("click", () => setAccountMode("login"));
accountModeEmail.addEventListener("click", () => setAccountMode("email"));
accountModeCreate.addEventListener("click", () => setAccountMode("create"));
function choosePlayDevice(device) {
  if (!pendingEntry) return;
  applyPlayDevice(device);
  enterAccount(pendingEntry.username, pendingEntry.progression);
}

devicePcButton.addEventListener("click", () => choosePlayDevice("pc"));
devicePhoneButton.addEventListener("click", () => choosePlayDevice("phone"));
settingsLogout.addEventListener("click", logoutAccount);
function openPendingAccount(username, savedProgression) {
  pendingEntry = { username, progression: savedProgression || {} };
  showDeviceStep();
}

async function submitAccountLocally(username, password) {
  const accounts = loadAccountRecords();
  const existing = accounts.find((account) => account.username.toLowerCase() === username.toLowerCase());
  if (accountMode === "create") {
    if (accountConfirm.value !== password) {
      accountFeedback.textContent = "Les deux mots de passe ne correspondent pas.";
      return;
    }
    if (existing) {
      accountFeedback.textContent = "Ce compte existe déjà. Connecte-toi.";
      return;
    }
    const salt = randomAccountSalt();
    const hash = await hashAccountPassword(password, salt);
    const progressionSeed = accounts.length === 0
      ? structuredClone(progression)
      : structuredClone(defaultProgression);
    if (!progressionSeed.playerName) progressionSeed.playerName = username.slice(0, 16);
    accounts.push({ username, salt, hash, progression: progressionSeed });
    saveAccountRecords(accounts);
    openPendingAccount(username, progressionSeed);
    return;
  }
  if (!existing) {
    accountFeedback.textContent = "Identifiant ou mot de passe incorrect.";
    return;
  }
  const hash = await hashAccountPassword(password, existing.salt);
  if (hash !== existing.hash) {
    accountFeedback.textContent = "Identifiant ou mot de passe incorrect.";
    return;
  }
  openPendingAccount(existing.username, existing.progression);
}

async function submitAccountOnServer(username, password) {
  const accounts = loadAccountRecords();
  const existing = accounts.find((account) => account.username.toLowerCase() === username.toLowerCase());
  if (accountMode === "create") {
    if (accountConfirm.value !== password) {
      accountFeedback.textContent = "Les deux mots de passe ne correspondent pas.";
      return;
    }
    let progressionSeed = null;
    if (existing) {
      const hash = await hashAccountPassword(password, existing.salt);
      if (hash !== existing.hash) {
        accountFeedback.textContent = "Ce compte existe déjà sur cet appareil.";
        return;
      }
      progressionSeed = existing.progression;
    } else if (accounts.length === 0) {
      progressionSeed = structuredClone(progression);
    }
    const data = await serverRequest("/api/register", { username, password, progression: progressionSeed });
    rememberServerSession(data);
    await mirrorServerAccount(data.username, password, data.progression || progressionSeed || structuredClone(defaultProgression));
    openPendingAccount(data.username, data.progression);
    return;
  }
  try {
    const data = await serverRequest("/api/login", { username, password });
    rememberServerSession(data);
    await mirrorServerAccount(data.username, password, data.progression || {});
    openPendingAccount(data.username, data.progression);
  } catch (error) {
    if (error.status !== 401 || !existing) throw error;
    const hash = await hashAccountPassword(password, existing.salt);
    if (hash !== existing.hash) throw error;
    try {
      const data = await serverRequest("/api/register", {
        username,
        password,
        progression: existing.progression,
      });
      rememberServerSession(data);
      await mirrorServerAccount(data.username, password, data.progression || existing.progression);
      openPendingAccount(data.username, data.progression || existing.progression);
    } catch (registerError) {
      if (registerError.status === 409) throw error;
      throw registerError;
    }
  }
}

async function mirrorServerAccount(username, password, savedProgression) {
  const accounts = loadAccountRecords();
  let account = accounts.find((item) => item.username.toLowerCase() === username.toLowerCase());
  if (!account) {
    const salt = randomAccountSalt();
    account = { username, salt, hash: await hashAccountPassword(password, salt), progression: savedProgression };
    accounts.push(account);
  } else {
    account.username = username;
    account.hash = await hashAccountPassword(password, account.salt);
    account.progression = savedProgression;
  }
  saveAccountRecords(accounts);
}

accountForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = accountEmail.value.trim();
  const username = accountUsername.value.trim();
  const password = accountPassword.value;
  const emailAccount = accountMode === "email" || accountMode === "create";
  if (emailAccount && !email.includes("@")) {
    accountFeedback.textContent = "Écris un e-mail valide.";
    return;
  }
  if (accountMode !== "email" && !/^[A-Za-z0-9À-ÿ_-]{3,16}$/.test(username)) {
    accountFeedback.textContent = "L'identifiant doit faire 3 à 16 caractères, sans espace.";
    return;
  }
  if (password.length < (emailAccount ? 6 : 4) || password.length > 32) {
    accountFeedback.textContent = emailAccount
      ? "Le mot de passe Firebase doit faire au moins 6 caractères."
      : "Le mot de passe doit faire entre 4 et 32 caractères.";
    return;
  }
  accountFeedback.textContent = "Vérification…";
  try {
    if (emailAccount) {
      await submitAccountOnFirebase(email, password, username);
      return;
    }
    if (!serverOnline) await detectGameServer();
    if (serverOnline) await submitAccountOnServer(username, password);
    else await submitAccountLocally(username, password);
  } catch (error) {
    accountFeedback.textContent = email
      ? firebaseAuthMessage(error)
      : (error.message || "La connexion n'a pas pu être vérifiée.");
  }
});

window.addEventListener("pagehide", () => {
  if (!serverToken || serverToken === "firebase" || !activeAccount) return;
  fetch("/api/save", {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${serverToken}` },
    body: JSON.stringify({ progression, device: chosenDevice, touchLayout, giftCursor: serverGiftCursor }),
  }).catch(() => {});
});

setAccountMode("login");
if (!restoreSession()) showAccountGate();
attachServerWhenReady();
requestAnimationFrame(gameLoop);

function firebaseUsername(email, username) {
  const raw = (username || email.split("@")[0] || "joueur").trim();
  const cleaned = raw.replace(/[^A-Za-z0-9À-ÿ_-]/g, "").slice(0, 16);
  return cleaned.length >= 3 ? cleaned : "joueur";
}

function firebaseAuthMessage(error) {
  const code = error?.code || "";
  if (code === "auth/email-already-in-use") return "Cet e-mail a déjà un compte. Connecte-toi.";
  if (code === "auth/invalid-email") return "Cet e-mail n'est pas valide.";
  if (code === "auth/weak-password" || code === "auth/password-does-not-meet-requirements") return "Le mot de passe Firebase doit faire au moins 6 caractères.";
  if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") return "E-mail ou mot de passe incorrect.";
  if (code === "auth/operation-not-allowed") return "Active E-mail/Mot de passe dans Firebase Authentication.";
  if (code === "permission-denied") return "Firebase a refusé l'enregistrement du profil.";
  return error?.message || "La connexion Firebase n'a pas abouti.";
}

function applyInventoryCounts(target, inventory) {
  for (const [id, item] of Object.entries(inventory)) {
    const quantity = Number(item?.quantity);
    if (!Number.isFinite(quantity) || quantity < 0) continue;
    if (target.boostInventory && Object.prototype.hasOwnProperty.call(target.boostInventory, id)) {
      target.boostInventory[id] = Math.floor(quantity);
    }
  }
}

function applyFirestoreProfile(joueurId, data, inventory) {
  const username = firebaseUsername(data.email || "", data.username || "");
  const coins = Number(data.coins);
  firebaseUserId = joueurId;
  if (!activeAccount) {
    const saved = structuredClone(defaultProgression);
    if (Number.isFinite(coins)) saved.coins = coins;
    saved.playerName = username;
    saved.firebaseInventory = inventory;
    applyInventoryCounts(saved, inventory);
    openPendingAccount(username, saved);
    accountFeedback.textContent = `Profil Firebase chargé : ${Number.isFinite(coins) ? coins : 0} pièces.`;
    return;
  }
  if (activeAccount.toLowerCase() !== username.toLowerCase()) return;
  if (Number.isFinite(coins)) progression.coins = coins;
  progression.firebaseInventory = inventory;
  applyInventoryCounts(progression, inventory);
  updateMenuBalance();
  saveProgression();
  persistAccountExtras();
}

async function submitAccountOnFirebase(email, password, username) {
  if (!email.includes("@")) {
    accountFeedback.textContent = "Écris un e-mail valide.";
    return;
  }
  if (password.length < 6) {
    accountFeedback.textContent = "Le mot de passe Firebase doit faire au moins 6 caractères.";
    return;
  }
  if (accountMode === "create" && accountConfirm.value !== password) {
    accountFeedback.textContent = "Les deux mots de passe ne correspondent pas.";
    return;
  }
  accountFeedback.textContent = "Connexion Firebase…";
  const displayName = firebaseUsername(email, username);
  if (accountMode === "create") {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await db.collection("players").doc(userCredential.user.uid).set({
      username: displayName,
      email,
      coins: 0,
    });
    accountFeedback.textContent = "Compte créé. Chargement du profil…";
    return;
  }
  await firebase.auth().signInWithEmailAndPassword(email, password);
  accountFeedback.textContent = "Connecté. Chargement du profil…";
}

// Fonction pour charger les données du joueur depuis Firebase
function chargerJoueur(joueurId) {
  return db.collection("players").doc(joueurId).get().then((doc) => {
    if (!doc.exists) {
      console.log("Joueur introuvable !");
      return null;
    }
    const data = doc.data();
    console.log("Joueur trouvé :", data.username);
    console.log("Pièces :", data.coins);
    return db.collection("players").doc(joueurId).collection("inventory").get().then((snapshot) => {
      const inventory = {};
      snapshot.forEach((item) => {
        inventory[item.id] = item.data();
      });
      applyFirestoreProfile(joueurId, data, inventory);
      return data;
    });
  }).catch((error) => {
    console.error("Erreur lors de la récupération :", error);
    if (!accountGate.hidden) accountFeedback.textContent = firebaseAuthMessage(error);
  });
}

// Fonction pour modifier les pièces du joueur sur Firebase
function donnerPieces(joueurId, nouvellesPieces) {
  return db.collection("players").doc(joueurId).update({
    coins: nouvellesPieces
  })
  .then(() => {
    console.log("Pièces mises à jour sur Firebase !");
  });
}

// Fonction pour ajouter un objet dans l'inventaire du joueur
function donnerObjet(joueurId, idObjet, nomObjet, quantite) {
  return db.collection("players").doc(joueurId).collection("inventory").doc(idObjet).set({
    name: nomObjet,
    quantity: quantite
  })
  .then(() => {
    console.log("Objet ajouté à l'inventaire !");
  });
}

function creerCompteFirebase(email, motDePasse) {
  return firebase.auth().createUserWithEmailAndPassword(email, motDePasse);
}

if (typeof firebase !== "undefined" && typeof firebase.auth === "function") {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      chargerJoueur(user.uid);
      return;
    }
    if (!activeAccount) showAccountGate();
  });
}

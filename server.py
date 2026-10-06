#!/usr/bin/env python3
"""Sert le jeu et enregistre les comptes dans data/players.db (SQLite)."""

import hashlib
import json
import re
import secrets
import sqlite3
import threading
import traceback
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
DATABASE_PATH = DATA_DIR / "players.db"
ADMIN_KEY_PATH = DATA_DIR / "admin.key"
HOST = "0.0.0.0"
PORT = 8765
MAX_BODY = 200_000
USERNAME_PATTERN = re.compile(r"^[A-Za-z0-9À-ÿ_-]{3,16}$")

CATALOG = {
    "boosts": [
        {"id": "soin", "label": "Potion de sève ensorcelée", "icon": "🧪"},
        {"id": "vitesse", "label": "Bottes du fantôme", "icon": "👻"},
        {"id": "bouclier", "label": "Bulle de citrouille", "icon": "🎃"},
        {"id": "puissance", "label": "Braise maudite", "icon": "🔥"},
    ],
    "relics": [
        {"id": "medaille-du-gardien", "label": "Médaille du Gardien", "icon": "🏅"},
        {"id": "dent-du-colosse", "label": "Dent du Colosse", "icon": "🦷"},
        {"id": "cristal-de-minuit", "label": "Cristal de minuit", "icon": "🔮"},
        {"id": "coeur-de-citrouille", "label": "Cœur de citrouille", "icon": "🧡"},
        {"id": "couronne-des-brumes", "label": "Couronne des brumes", "icon": "👑"},
    ],
    "characters": [
        {"id": "survivant", "label": "Survivant", "icon": "🧭"},
        {"id": "pisteur", "label": "Pisteur", "icon": "🌿"},
        {"id": "secouriste", "label": "Secouriste", "icon": "✚"},
        {"id": "sentinelle", "label": "Sentinelle", "icon": "🛡️"},
    ],
    "skins": [
        {"id": "survivant", "label": "Survivant", "icon": "🧭"},
        {"id": "feuillage", "label": "Feuillage", "icon": "🌿"},
        {"id": "cendre", "label": "Cendre", "icon": "🌫️"},
        {"id": "aventuriere", "label": "Aventurière", "icon": "🧭"},
        {"id": "renard", "label": "Costume de renard", "icon": "🦊"},
        {"id": "loup", "label": "Costume de loup", "icon": "🐺"},
        {"id": "chevalier", "label": "Armure de chevalier", "icon": "⚔️"},
        {"id": "nomade", "label": "Nomade des ruines", "icon": "🧣"},
        {"id": "mecanicien", "label": "Mécanicien", "icon": "🔧"},
        {"id": "garde-forestier", "label": "Garde forestier", "icon": "🌲"},
        {"id": "sorciere", "label": "Sorcière des brumes", "icon": "🧙"},
        {"id": "citrouille", "label": "Citrouille vivante", "icon": "🎃"},
        {"id": "vampire", "label": "Vampire de minuit", "icon": "🧛"},
        {"id": "momie", "label": "Momie des catacombes", "icon": "🧟"},
        {"id": "epouvantail", "label": "Épouvantail maudit", "icon": "🌾"},
        {"id": "fantome", "label": "Fantôme des marais", "icon": "👻"},
        {"id": "demon", "label": "Démon cornu", "icon": "😈"},
        {"id": "squelette", "label": "Squelette de minuit", "icon": "💀"},
        {"id": "cowboy", "label": "Cowboy des plaines", "icon": "🤠"},
        {"id": "pirate", "label": "Pirate fantôme", "icon": "🏴‍☠️"},
        {"id": "zombie", "label": "Zombie des marais", "icon": "🧟"},
        {"id": "ninja", "label": "Ninja de l'ombre", "icon": "🥷"},
        {"id": "samourai", "label": "Samouraï écarlate", "icon": "⛩️"},
        {"id": "viking", "label": "Viking du nord", "icon": "🪓"},
        {"id": "clown", "label": "Clown maléfique", "icon": "🤡"},
        {"id": "chasseur-vampires", "label": "Chasseur de vampires", "icon": "🗡️"},
        {"id": "astronaute", "label": "Astronaute perdu", "icon": "🧑‍🚀"},
        {"id": "faucheuse", "label": "La Faucheuse", "icon": "☠️"},
        {"id": "cyborg", "label": "Cyborg néon", "icon": "🤖"},
    ],
    "equipment": [
        {"id": "standard", "label": "Sac de terrain", "icon": "🎒"},
        {"id": "veste", "label": "Veste renforcée", "icon": "🧥"},
        {"id": "bottes", "label": "Bottes légères", "icon": "🥾"},
        {"id": "sac-renforce", "label": "Sac médical", "icon": "🎒"},
    ],
    "weapons": [
        {"id": "fronde", "label": "Fronde aux pépins", "icon": "🎃"},
        {"id": "arbalete", "label": "Arbalète de chasse aux fantômes", "icon": "🏹"},
        {"id": "double-fronde", "label": "Double fronde aux pépins", "icon": "🎃"},
        {"id": "fusil-pompe", "label": "Fusil à citrouilles", "icon": "💥"},
        {"id": "lance-clous", "label": "Lance-clous maudits", "icon": "🔩"},
        {"id": "arc-long", "label": "Arc du corbeau", "icon": "🏹"},
        {"id": "faux-spectrale", "label": "Faux spectrale", "icon": "🪓"},
        {"id": "lance-bonbons", "label": "Lance-bonbons", "icon": "🍬"},
        {"id": "tir-chauve-souris", "label": "Tir de chauve-souris", "icon": "🦇"},
        {"id": "lanterne-ames", "label": "Lanterne des âmes", "icon": "🏮"},
        {"id": "grimoire-maudit", "label": "Grimoire maudit", "icon": "📖"},
        {"id": "fouet-ronces", "label": "Fouet des ronces", "icon": "🌿"},
        {"id": "epee-rouillee", "label": "Épée rouillée", "icon": "🗡️"},
        {"id": "epee-chevalier", "label": "Épée du chevalier", "icon": "⚔️"},
        {"id": "coutelas-fantome", "label": "Coutelas du pirate fantôme", "icon": "🏴‍☠️"},
        {"id": "lame-braise", "label": "Lame de braise", "icon": "🔥"},
        {"id": "epee-lune-sanglante", "label": "Épée de la Lune sanglante", "icon": "🌙"},
        {"id": "pistolet-silex", "label": "Pistolet à silex", "icon": "🔫"},
        {"id": "revolver-sherif", "label": "Revolver du shérif", "icon": "🤠"},
        {"id": "pistolet-citrouille", "label": "Pistolet à citrouilles", "icon": "🎃"},
        {"id": "pistolet-spectral", "label": "Pistolet spectral", "icon": "👻"},
        {"id": "canon-roi-ombres", "label": "Canon du Roi des ombres", "icon": "👑"},
        {"id": "hache-bucheron", "label": "Hache du bûcheron", "icon": "🪓"},
        {"id": "lance-centurion", "label": "Lance du centurion", "icon": "🔱"},
        {"id": "marteau-guerre", "label": "Marteau de guerre", "icon": "🔨"},
        {"id": "dague-assassin", "label": "Dague de l'assassin", "icon": "🗡️"},
        {"id": "katana-ombre", "label": "Katana de l'ombre", "icon": "⚔️"},
        {"id": "tromblon-pirate", "label": "Tromblon du pirate", "icon": "🏴‍☠️"},
        {"id": "fusil-precision", "label": "Fusil de précision", "icon": "🎯"},
        {"id": "pistolet-givre", "label": "Pistolet de givre", "icon": "❄️"},
        {"id": "baguette-foudre", "label": "Baguette de foudre", "icon": "🪄"},
        {"id": "blaster-neon", "label": "Blaster néon", "icon": "🔆"},
    ],
    "coatings": [
        {"id": "aucun", "label": "Sans revêtement", "icon": "⬜"},
        {"id": "rouille", "label": "Rouille ancienne", "icon": "🟫"},
        {"id": "encre", "label": "Nuit d'encre", "icon": "⬛"},
        {"id": "jade", "label": "Jade des marais", "icon": "🟩"},
        {"id": "sang", "label": "Sang séché", "icon": "🟥"},
        {"id": "givre", "label": "Givre éternel", "icon": "❄️"},
        {"id": "toxique", "label": "Poison toxique", "icon": "☢️"},
        {"id": "or", "label": "Or royal", "icon": "🥇"},
        {"id": "lave", "label": "Cœur de lave", "icon": "🌋"},
        {"id": "spectre", "label": "Spectre violet", "icon": "🔮"},
        {"id": "chroma", "label": "Galaxie chroma", "icon": "🌈"},
    ],
    "activePowers": [
        {"id": "glace", "label": "Souffle de givre", "icon": "❄️"},
        {"id": "essaim-spectral", "label": "Essaim spectral", "icon": "🦇"},
        {"id": "nuee-toxique", "label": "Nuée toxique", "icon": "☠️"},
        {"id": "lumiere-sacree", "label": "Lumière sacrée", "icon": "✨"},
        {"id": "citrouille-infernale", "label": "Citrouille infernale", "icon": "🎃"},
        {"id": "tempete-foudre", "label": "Tempête de foudre", "icon": "⚡"},
        {"id": "onde-sismique", "label": "Onde sismique", "icon": "🪨"},
        {"id": "armure-ossements", "label": "Armure d'ossements", "icon": "🦴"},
        {"id": "tornade-hurlante", "label": "Tornade hurlante", "icon": "🌪️"},
        {"id": "voile-fantome", "label": "Voile du fantôme", "icon": "👻"},
        {"id": "vortex-ombre", "label": "Vortex d'ombre", "icon": "🌀"},
        {"id": "pluie-meteores", "label": "Pluie de météores", "icon": "☄️"},
        {"id": "meute-spectrale", "label": "Meute spectrale", "icon": "🐺"},
        {"id": "flamme-infernale", "label": "Flamme infernale", "icon": "🔥"},
        {"id": "pacte-vampirique", "label": "Pacte vampirique", "icon": "🩸"},
        {"id": "arret-du-temps", "label": "Arrêt du temps", "icon": "⏳"},
    ],
}
UNLOCK_CATEGORIES = {"characters", "skins", "equipment", "weapons", "coatings", "activePowers"}
db_lock = threading.Lock()
database = None


class ApiError(Exception):
    def __init__(self, status, message):
        super().__init__(message)
        self.status = status


def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def hash_password(password, salt):
    return hashlib.sha256(f"{salt}:{password}".encode("utf-8")).hexdigest()


def load_admin_key():
    DATA_DIR.mkdir(exist_ok=True)
    if ADMIN_KEY_PATH.exists():
        key = ADMIN_KEY_PATH.read_text(encoding="utf-8").strip()
        if key:
            return key
    key = secrets.token_urlsafe(18)
    ADMIN_KEY_PATH.write_text(key + "\n", encoding="utf-8")
    return key


def connect_database():
    DATA_DIR.mkdir(exist_ok=True)
    connection = sqlite3.connect(DATABASE_PATH, check_same_thread=False)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA journal_mode=WAL")
    connection.execute("PRAGMA foreign_keys=ON")
    connection.executescript(
        """
        CREATE TABLE IF NOT EXISTS accounts (
          username TEXT PRIMARY KEY COLLATE NOCASE,
          salt TEXT NOT NULL,
          hash TEXT NOT NULL,
          progression TEXT NOT NULL,
          device TEXT NOT NULL DEFAULT '',
          touch_layout TEXT,
          gift_cursor INTEGER NOT NULL DEFAULT 0,
          updated_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS sessions (
          token TEXT PRIMARY KEY,
          username TEXT NOT NULL,
          created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS gifts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          payload TEXT NOT NULL,
          created_at TEXT NOT NULL
        );
        """
    )
    connection.commit()
    return connection


def clean_username(value):
    if not isinstance(value, str) or not USERNAME_PATTERN.fullmatch(value.strip()):
        raise ApiError(400, "L'identifiant doit faire 3 à 16 caractères, sans espace.")
    return value.strip()


def read_progression(raw):
    if raw is None:
        return {}
    if isinstance(raw, str):
        parsed = json.loads(raw)
    else:
        parsed = raw
    if not isinstance(parsed, dict):
        raise ApiError(400, "La progression du joueur est illisible.")
    return parsed


def progression_summary(progression):
    coins = progression.get("coins")
    level = progression.get("level")
    return {
        "coins": coins if isinstance(coins, int) and coins >= 0 else 0,
        "level": level if isinstance(level, int) and level >= 1 else 1,
    }


def known_ids(category):
    return {item["id"] for item in CATALOG.get(category, [])}


def apply_gift(progression, gift):
    coins = progression.get("coins")
    if not isinstance(coins, int) or coins < 0:
        coins = 0
    progression["coins"] = min(coins + int(gift.get("coins") or 0), 1_000_000_000)
    boosts = progression.get("boostInventory")
    if not isinstance(boosts, dict):
        boosts = {}
        progression["boostInventory"] = boosts
    for boost_id, count in (gift.get("boosts") or {}).items():
        current = boosts.get(boost_id)
        boosts[boost_id] = min((current if isinstance(current, int) and current >= 0 else 0) + count, 9999)
    relics = progression.get("relicInventory")
    if not isinstance(relics, dict):
        relics = {}
        progression["relicInventory"] = relics
    for relic_id, count in (gift.get("relics") or {}).items():
        current = relics.get(relic_id)
        relics[relic_id] = min((current if isinstance(current, int) and current >= 0 else 0) + count, 9999)
    unlocked = progression.get("unlocked")
    if not isinstance(unlocked, dict):
        unlocked = {}
        progression["unlocked"] = unlocked
    for category, item_ids in (gift.get("unlock") or {}).items():
        owned = unlocked.get(category)
        if not isinstance(owned, list):
            owned = []
        for item_id in item_ids:
            if item_id not in owned:
                owned.append(item_id)
        unlocked[category] = owned
    return progression


def find_player_by_pseudo(pseudo):
    name = pseudo.strip() if isinstance(pseudo, str) else ""
    if not name or len(name) > 16:
        raise ApiError(400, "Indique le pseudo du joueur.")
    if USERNAME_PATTERN.fullmatch(name):
        account = account_by_name(name)
        if account is not None:
            return account
    matches = []
    for account in database.execute("SELECT * FROM accounts"):
        label = read_progression(account["progression"]).get("playerName")
        if isinstance(label, str) and label.strip().lower() == name.lower():
            matches.append(account)
    if len(matches) == 1:
        return matches[0]
    if len(matches) > 1:
        raise ApiError(400, "Plusieurs joueurs ont ce pseudo. Indique l'identifiant du compte.")
    raise ApiError(404, "Aucun joueur avec ce pseudo.")


def require_host_account(header):
    row = require_session(header)
    if row["username"].lower() != "admin":
        raise ApiError(403, "Seul le compte admin peut donner des objets.")
    return row


def parse_gift(body):
    username = clean_username(body.get("username"))
    coins = body.get("coins") or 0
    if isinstance(coins, bool) or not isinstance(coins, int) or coins < 0 or coins > 1_000_000:
        raise ApiError(400, "Le nombre de pièces doit être entre 0 et 1 000 000.")
    boosts = {}
    relics = {}
    unlock = {}
    kind = body.get("kind") or ""
    item_id = body.get("itemId") or ""
    count = body.get("count") if body.get("count") is not None else 1
    if kind:
        if isinstance(count, bool) or not isinstance(count, int) or count < 1 or count > 99:
            raise ApiError(400, "La quantité doit être entre 1 et 99.")
        if not isinstance(item_id, str) or item_id not in known_ids(kind):
            raise ApiError(400, "Choisis un objet de la liste.")
        if kind == "boosts":
            boosts[item_id] = count
        elif kind == "relics":
            relics[item_id] = count
        elif kind in UNLOCK_CATEGORIES:
            unlock[kind] = [item_id]
        else:
            raise ApiError(400, "Ce type d'objet n'existe pas.")
    if coins == 0 and not boosts and not relics and not unlock:
        raise ApiError(400, "Indique des pièces ou un objet à donner.")
    return username, {"coins": coins, "boosts": boosts, "relics": relics, "unlock": unlock}


def account_by_name(username):
    return database.execute("SELECT * FROM accounts WHERE username = ? COLLATE NOCASE", (username,)).fetchone()


def latest_gift_id(username):
    row = database.execute("SELECT MAX(id) AS max_id FROM gifts WHERE username = ? COLLATE NOCASE", (username,)).fetchone()
    return int(row["max_id"] or 0)


def pending_gifts(username, cursor):
    rows = database.execute(
        "SELECT id, payload FROM gifts WHERE username = ? COLLATE NOCASE AND id > ? ORDER BY id",
        (username, cursor),
    ).fetchall()
    gifts = []
    for row in rows:
        gifts.append((row["id"], json.loads(row["payload"])))
    return gifts


def acknowledge_gifts(username, cursor):
    newest = latest_gift_id(username)
    target = max(int(cursor or 0), newest)
    database.execute(
        "UPDATE accounts SET gift_cursor = ? WHERE username = ? COLLATE NOCASE",
        (target, username),
    )
    return target


def create_session(username):
    token = secrets.token_urlsafe(32)
    database.execute(
        "INSERT INTO sessions (token, username, created_at) VALUES (?, ?, ?)",
        (token, username, now_iso()),
    )
    return token


def account_payload(row, token=None):
    progression = read_progression(row["progression"])
    touch_layout = None
    if row["touch_layout"]:
        try:
            parsed = json.loads(row["touch_layout"])
            if isinstance(parsed, dict):
                touch_layout = parsed
        except json.JSONDecodeError:
            touch_layout = None
    payload = {
        "username": row["username"],
        "progression": progression,
        "device": row["device"] if row["device"] in ("pc", "phone") else "",
        "touchLayout": touch_layout,
        "giftCursor": acknowledge_gifts(row["username"], row["gift_cursor"]),
    }
    if token:
        payload["token"] = token
    return payload


def insert_account(username, salt, password_hash, progression, device="", touch_layout=None):
    encoded_layout = json.dumps(touch_layout) if isinstance(touch_layout, dict) else None
    database.execute(
        """
        INSERT INTO accounts (username, salt, hash, progression, device, touch_layout, gift_cursor, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, 0, ?)
        """,
        (
            username,
            salt,
            password_hash,
            json.dumps(progression),
            device if device in ("pc", "phone") else "",
            encoded_layout,
            now_iso(),
        ),
    )
    return account_by_name(username)


def require_session(header):
    if not header or not header.startswith("Bearer "):
        raise ApiError(401, "Connecte-toi pour enregistrer la partie.")
    token = header[7:].strip()
    row = database.execute(
        """
        SELECT accounts.* FROM sessions
        JOIN accounts ON accounts.username = sessions.username COLLATE NOCASE
        WHERE sessions.token = ?
        """,
        (token,),
    ).fetchone()
    if row is None:
        raise ApiError(401, "Cette connexion a expiré. Reconnecte-toi.")
    return row


def save_account_state(row, progression, device, touch_layout, gift_cursor):
    merged = read_progression(progression)
    for gift_id, gift in pending_gifts(row["username"], gift_cursor):
        apply_gift(merged, gift)
        gift_cursor = gift_id
    gift_cursor = max(int(gift_cursor or 0), latest_gift_id(row["username"]))
    encoded_layout = json.dumps(touch_layout) if isinstance(touch_layout, dict) else row["touch_layout"]
    database.execute(
        """
        UPDATE accounts
        SET progression = ?, device = ?, touch_layout = ?, gift_cursor = ?, updated_at = ?
        WHERE username = ? COLLATE NOCASE
        """,
        (
            json.dumps(merged),
            device if device in ("pc", "phone") else row["device"],
            encoded_layout,
            gift_cursor,
            now_iso(),
            row["username"],
        ),
    )
    updated = account_by_name(row["username"])
    return {"progression": read_progression(updated["progression"]), "giftCursor": updated["gift_cursor"]}


class GameHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, format, *args):
        print("[%s] %s" % (self.log_date_time_string(), format % args))

    def do_GET(self):
        path = urlparse(self.path).path
        if path.startswith("/api/"):
            self.handle_get(path)
            return
        if path.startswith("/data/"):
            self.send_api_error(404, "Introuvable.")
            return
        super().do_GET()

    def do_POST(self):
        path = urlparse(self.path).path
        if not path.startswith("/api/"):
            self.send_api_error(404, "Introuvable.")
            return
        try:
            body = self.read_body()
            with db_lock:
                database.execute("BEGIN IMMEDIATE")
                try:
                    payload, status = self.handle_post(path, body)
                    database.commit()
                except Exception:
                    database.rollback()
                    raise
            self.send_json(payload, status)
        except ApiError as error:
            self.send_api_error(error.status, str(error))
        except json.JSONDecodeError:
            self.send_api_error(400, "Le message reçu est illisible.")
        except sqlite3.IntegrityError:
            self.send_api_error(409, "Ce compte existe déjà. Connecte-toi.")
        except Exception:
            traceback.print_exc()
            self.send_api_error(500, "Le serveur n'a pas pu enregistrer la demande.")

    def handle_get(self, path):
        try:
            if path == "/api/health":
                self.send_json({"ok": True})
                return
            if path == "/api/catalog":
                self.send_json(CATALOG)
                return
            with db_lock:
                database.execute("BEGIN IMMEDIATE")
                try:
                    if path == "/api/me":
                        row = require_session(self.headers.get("Authorization"))
                        payload = account_payload(row)
                    elif path == "/api/admin/players":
                        self.require_admin()
                        players = []
                        for row in database.execute("SELECT username, progression, updated_at FROM accounts ORDER BY username COLLATE NOCASE"):
                            summary = progression_summary(read_progression(row["progression"]))
                            players.append({
                                "username": row["username"],
                                "coins": summary["coins"],
                                "level": summary["level"],
                                "updatedAt": row["updated_at"],
                            })
                        payload = {"players": players}
                    else:
                        raise ApiError(404, "Introuvable.")
                    database.commit()
                except Exception:
                    database.rollback()
                    raise
            self.send_json(payload)
        except ApiError as error:
            self.send_api_error(error.status, str(error))
        except Exception:
            traceback.print_exc()
            self.send_api_error(500, "Le serveur n'a pas pu lire les comptes.")

    def handle_post(self, path, body):
        if path == "/api/register":
            return self.register_account(body), 201
        if path == "/api/import":
            return self.import_account(body), 201
        if path == "/api/login":
            return self.login_account(body), 200
        if path == "/api/save":
            row = require_session(self.headers.get("Authorization"))
            cursor = body.get("giftCursor") or 0
            if isinstance(cursor, bool) or not isinstance(cursor, int) or cursor < 0:
                cursor = 0
            return save_account_state(
                row,
                body.get("progression"),
                body.get("device"),
                body.get("touchLayout"),
                cursor,
            ), 200
        if path == "/api/logout":
            token = (self.headers.get("Authorization") or "")[7:].strip()
            if token:
                database.execute("DELETE FROM sessions WHERE token = ?", (token,))
            return {"ok": True}, 200
        if path == "/api/admin/give":
            self.require_admin()
            return self.give_items(body), 200
        if path == "/api/give":
            require_host_account(self.headers.get("Authorization"))
            target = find_player_by_pseudo(body.get("pseudo"))
            payload = dict(body)
            payload["username"] = target["username"]
            _, gift = parse_gift(payload)
            return self.store_gift(target, gift), 200
        raise ApiError(404, "Introuvable.")

    def register_account(self, body):
        username = clean_username(body.get("username"))
        password = body.get("password")
        if not isinstance(password, str) or not 4 <= len(password) <= 32:
            raise ApiError(400, "Le mot de passe doit faire au moins 4 caractères.")
        if account_by_name(username) is not None:
            raise ApiError(409, "Ce compte existe déjà. Connecte-toi.")
        progression = read_progression(body.get("progression"))
        salt = secrets.token_hex(16)
        row = insert_account(username, salt, hash_password(password, salt), progression)
        return account_payload(row, create_session(row["username"]))

    def import_account(self, body):
        username = clean_username(body.get("username"))
        salt = body.get("salt")
        password_hash = body.get("hash")
        if not isinstance(salt, str) or not re.fullmatch(r"[0-9a-f]{32}", salt):
            raise ApiError(400, "Le compte local est illisible.")
        if not isinstance(password_hash, str) or not re.fullmatch(r"[0-9a-f]{64}", password_hash):
            raise ApiError(400, "Le compte local est illisible.")
        if account_by_name(username) is not None:
            raise ApiError(409, "Ce compte existe déjà. Connecte-toi.")
        row = insert_account(
            username,
            salt,
            password_hash,
            read_progression(body.get("progression")),
            body.get("device") or "",
            body.get("touchLayout"),
        )
        return account_payload(row, create_session(row["username"]))

    def login_account(self, body):
        username = clean_username(body.get("username")) if isinstance(body.get("username"), str) else ""
        password = body.get("password")
        row = account_by_name(username) if username else None
        if row is None or not isinstance(password, str):
            raise ApiError(401, "Identifiant ou mot de passe incorrect.")
        digest = hash_password(password, row["salt"])
        if not secrets.compare_digest(digest, row["hash"]):
            raise ApiError(401, "Identifiant ou mot de passe incorrect.")
        return account_payload(row, create_session(row["username"]))

    def give_items(self, body):
        username, gift = parse_gift(body)
        row = account_by_name(username)
        if row is None:
            raise ApiError(404, "Ce joueur n'a pas encore de compte.")
        return self.store_gift(row, gift)

    def store_gift(self, row, gift):
        progression = apply_gift(read_progression(row["progression"]), gift)
        database.execute(
            "UPDATE accounts SET progression = ?, updated_at = ? WHERE username = ? COLLATE NOCASE",
            (json.dumps(progression), now_iso(), row["username"]),
        )
        database.execute(
            "INSERT INTO gifts (username, payload, created_at) VALUES (?, ?, ?)",
            (row["username"], json.dumps(gift), now_iso()),
        )
        summary = progression_summary(progression)
        return {"ok": True, "username": row["username"], "coins": summary["coins"], "level": summary["level"]}

    def require_admin(self):
        provided = self.headers.get("X-Admin-Key") or ""
        if len(provided) != len(ADMIN_KEY) or not secrets.compare_digest(provided, ADMIN_KEY):
            raise ApiError(403, "Clé incorrecte. Elle est dans data/admin.key sur ce PC.")

    def read_body(self):
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0 or length > MAX_BODY:
            raise ApiError(400, "Le message reçu est trop gros ou vide.")
        return json.loads(self.rfile.read(length).decode("utf-8"))

    def send_json(self, payload, status=200):
        raw = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(raw)

    def send_api_error(self, status, message):
        if status == 404 and not urlparse(self.path).path.startswith("/api/"):
            self.send_error(status)
            return
        try:
            self.send_json({"error": message}, status)
        except Exception:
            pass


def lan_address():
    import socket
    probe = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        probe.connect(("192.0.2.1", 1))
        return probe.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        probe.close()


def main():
    global database, ADMIN_KEY
    ADMIN_KEY = load_admin_key()
    database = connect_database()
    server = ThreadingHTTPServer((HOST, PORT), GameHandler)
    server.allow_reuse_address = True
    print(f"Jeu : http://127.0.0.1:{PORT}", flush=True)
    print(f"Autres appareils : http://{lan_address()}:{PORT}", flush=True)
    print(f"Donner des objets : http://127.0.0.1:{PORT}/admin.html", flush=True)
    print(f"Base : {DATABASE_PATH}", flush=True)
    print(f"Clé : {ADMIN_KEY}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nArrêt.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()

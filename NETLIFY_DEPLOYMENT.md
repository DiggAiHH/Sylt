# 🚀 BLUM Sylt - Netlify Deployment Guide

## Übersicht

9 separate Netlify-Sites werden aus diesem Monorepo deployed:

| # | Projekt | Typ | Netlify URL |
|---|---------|-----|-------------|
| 1 | **Hub** | Next.js (API) | `https://sylt-hub.netlify.app` |
| 2 | **Sylt Rooms** | Next.js | `https://sylt-rooms.netlify.app` |
| 3 | **Privat Homes** | Next.js | `https://sylt-privathomes.netlify.app` |
| 4 | **Long Island House** | Next.js | `https://sylt-longisland.netlify.app` |
| 5 | **Auster Appartements** | Next.js | `https://sylt-auster.netlify.app` |
| 6 | **Beach Home** | Next.js | `https://sylt-beachhome.netlify.app` |
| 7 | **Website** | Statisch | `https://sylt-website.netlify.app` |
| 8 | **Kochbuch** | Statisch | `https://sylt-kochbuch.netlify.app` |

---

## 📋 Schritt-für-Schritt Anleitung

### 1. Netlify Account & GitHub verbinden

1. Gehe zu [netlify.com](https://netlify.com)
2. "Sign up" → "Continue with GitHub"
3. Autorisiere Netlify für dein GitHub-Konto

### 2. Hub deployen (ZUERST!)

Der Hub muss zuerst deployed werden, da alle Satellites die Hub-URL benötigen.

1. **Neue Site erstellen:**
   - Klick "Add new site" → "Import an existing project"
   - Wähle "Deploy with GitHub"
   - Repository auswählen: `DiggAiHH/Sylt`

2. **Build-Einstellungen:**
   ```
   Base directory:     (leer lassen - Root)
   Build command:      npm install && npm run build:hub
   Publish directory:  apps/hub/.next
   ```

3. **Environment Variables setzen:**
   - Site Settings → Environment Variables → Add variable
   ```
   NEXT_PUBLIC_HUB_URL = https://sylt-hub.netlify.app
   STRIPE_SECRET_KEY = sk_test_... (oder sk_live_...)
   STRIPE_WEBHOOK_SECRET = whsec_...
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY = pk_test_... (oder pk_live_...)
   ```

4. **Deploy!**
   - Klick "Deploy site"
   - Warte bis Build abgeschlossen (ca. 3-5 Min)

5. **Site umbenennen:**
   - Site Settings → Site name → Change site name
   - Neuer Name: `sylt-hub`

---

### 3. Satellites deployen

Wiederhole für jeden Satellite:

#### Sylt Rooms
```
Site Name:          sylt-rooms
Build command:      npm install && npm run build:syltrooms
Publish directory:  apps/satellites/syltrooms/.next
Environment:        NEXT_PUBLIC_HUB_URL = https://sylt-hub.netlify.app
```

#### Privat Homes
```
Site Name:          sylt-privathomes
Build command:      npm install && npm run build:privathomes
Publish directory:  apps/satellites/privathomes/.next
Environment:        NEXT_PUBLIC_HUB_URL = https://sylt-hub.netlify.app
```

#### Long Island House
```
Site Name:          sylt-longisland
Build command:      npm install && npm run build:longislandhouse
Publish directory:  apps/satellites/longislandhouse/.next
Environment:        NEXT_PUBLIC_HUB_URL = https://sylt-hub.netlify.app
```

#### Auster Appartements
```
Site Name:          sylt-auster
Build command:      npm install && npm run build:auster
Publish directory:  apps/satellites/auster-appartements/.next
Environment:        NEXT_PUBLIC_HUB_URL = https://sylt-hub.netlify.app
```

#### Beach Home
```
Site Name:          sylt-beachhome
Build command:      npm install && npm run build:beachhome
Publish directory:  apps/satellites/beach-home/.next
Environment:        NEXT_PUBLIC_HUB_URL = https://sylt-hub.netlify.app
```

---

### 4. Statische Sites deployen

#### Website
```
Site Name:          sylt-website
Base directory:     website
Build command:      (leer lassen)
Publish directory:  website
```

#### Kochbuch
```
Site Name:          sylt-kochbuch
Base directory:     kochbuch
Build command:      (leer lassen)
Publish directory:  kochbuch
```

---

## 🔗 Finale URLs nach Deployment

Nach erfolgreichem Deployment sind alle Sites unter diesen URLs erreichbar:

### Next.js Apps
| Site | Netlify URL | Custom Domain (optional) |
|------|-------------|--------------------------|
| Hub | https://sylt-hub.netlify.app | booking.blumsylthotels.de |
| Sylt Rooms | https://sylt-rooms.netlify.app | syltrooms.de |
| Privat Homes | https://sylt-privathomes.netlify.app | privathomes-sylt.de |
| Long Island | https://sylt-longisland.netlify.app | longislandhouse-sylt.de |
| Auster | https://sylt-auster.netlify.app | auster-appartements.de |
| Beach Home | https://sylt-beachhome.netlify.app | beach-home-sylt.de |

### Statische Sites
| Site | Netlify URL | Custom Domain (optional) |
|------|-------------|--------------------------|
| Website | https://sylt-website.netlify.app | blum-fisch-sylt.de |
| Kochbuch | https://sylt-kochbuch.netlify.app | kochbuch.blum-fisch-sylt.de |

---

## ⚙️ Custom Domain einrichten (optional)

1. Site Settings → Domain management → Add custom domain
2. Domain eingeben (z.B. `syltrooms.de`)
3. DNS-Einträge beim Domain-Provider konfigurieren:
   ```
   Type: CNAME
   Name: @ (oder www)
   Value: sylt-rooms.netlify.app
   ```
4. Netlify generiert automatisch SSL-Zertifikat

---

## 🔄 Automatische Deployments

Nach dem Setup werden alle Sites automatisch deployed bei:
- Push auf `main` Branch
- Merge eines Pull Requests

**Tipp:** Netlify erkennt Änderungen und baut nur betroffene Sites neu.

---

## 🐛 Troubleshooting

### Build schlägt fehl?
1. Prüfe Build-Logs in Netlify
2. Stelle sicher dass Node 18.17.0 verwendet wird
3. Führe lokal `npm install && npm run build:hub` aus

### API-Calls funktionieren nicht?
1. Prüfe ob Hub deployed und erreichbar ist
2. Prüfe `NEXT_PUBLIC_HUB_URL` in Satellite-Einstellungen
3. Prüfe CORS-Headers im Hub

### 404-Fehler?
1. Prüfe Publish-Directory
2. Für Next.js: `@netlify/plugin-nextjs` muss aktiv sein

---

## 📊 Geschätzte Build-Zeiten

| Site | Erster Build | Folgende Builds |
|------|--------------|-----------------|
| Hub | ~4-5 Min | ~2-3 Min |
| Satellites | ~3-4 Min | ~1-2 Min |
| Statische Sites | <30 Sek | <30 Sek |

---

## ✅ Deployment Checklist

- [ ] Hub deployed und erreichbar
- [ ] Alle 5 Satellites deployed
- [ ] Website deployed
- [ ] Kochbuch deployed
- [ ] Environment Variables gesetzt
- [ ] Stripe Webhook URL in Stripe Dashboard aktualisiert
- [ ] Custom Domains konfiguriert (optional)
- [ ] SSL-Zertifikate aktiv

---

*Erstellt: 10. Januar 2026*

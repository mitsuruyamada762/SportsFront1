# WebSocket Addresses Verification

## 🔍 Current WebSocket Addresses in Project

### 1. Main WebSocket (Theme1 & Theme2)

**Location:** 
- `src/theme1/contexts/WebSocketContext.tsx` (Line 135)
- `src/theme2/contexts/WebSocketContext.tsx` (Line 64)

**Code:**
```typescript
const wsUrl = import.meta.env.VITE_WEBSOCKET_URL || "wss://localhost:7275/ws/sports";
socket.current = new WebSocket(wsUrl);
```

**Current Value:**
- `import.meta.env.VITE_WEBSOCKET_URL` = **`undefined`** (not set in `.env`)
- **Fallback used:** `"wss://localhost:7275/ws/sports"`

**Status:** ✅ Using fallback address

---

### 2. Animation WebSocket (Theme1 Only)

**Location:** 
- `src/theme1/contexts/WebSocketContext.tsx` (Line 284)

**Code:**
```typescript
const animationUrl = "wss://animation.ml.bcua.io/animation_json_v2?partner_id=1329&site_ref=https://webspor.betcolabs.com/";
animationSocket.current = new WebSocket(animationUrl);
```

**Current Value:**
- **Hardcoded:** `"wss://animation.ml.bcua.io/animation_json_v2?partner_id=1329&site_ref=https://webspor.betcolabs.com/"`

**Status:** ✅ Hardcoded address

---

## 📊 Summary Table

| WebSocket Type | Location | Current Address | Source |
|---------------|----------|----------------|--------|
| **Main WS** (Theme1) | Line 135 | `wss://localhost:7275/ws/sports` | Fallback (env not set) |
| **Main WS** (Theme2) | Line 64 | `wss://localhost:7275/ws/sports` | Fallback (env not set) |
| **Animation WS** (Theme1) | Line 284 | `wss://animation.ml.bcua.io/animation_json_v2?...` | Hardcoded |

---

## 🔧 Configuration Status

### `.env` File Status:
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=Game
VITE_APP_VERSION=1.0.0
# VITE_WEBSOCKET_URL is MISSING
```

### `env.example` File:
```env
VITE_WEBSOCKET_URL=wss://localhost:7275/ws/sports
```

---

## ✅ Verification Results

### Main WebSocket Address:
- **Expected:** Configurable via `VITE_WEBSOCKET_URL`
- **Actual:** Using fallback `wss://localhost:7275/ws/sports`
- **Status:** ⚠️ Environment variable not set, using fallback

### Animation WebSocket Address:
- **Expected:** Hardcoded in code
- **Actual:** `wss://animation.ml.bcua.io/animation_json_v2?...`
- **Status:** ✅ Correctly configured

---

## 🎯 Recommendations

### To Use Custom WebSocket URL:

1. **Add to `.env` file:**
```env
VITE_WEBSOCKET_URL=wss://eu-swarm-ws-re.betcoswarm.com/
```

2. **Or use original server:**
```env
VITE_WEBSOCKET_URL=wss://eu-swarm-ws-re.betcoswarm.com/
```

3. **Restart dev server** after changing `.env`

---

## 📝 Current Behavior

When the app runs:
1. Checks `import.meta.env.VITE_WEBSOCKET_URL`
2. Finds it's `undefined` (not in `.env`)
3. Uses fallback: `"wss://localhost:7275/ws/sports"`
4. Connects to: `wss://localhost:7275/ws/sports`

**Note:** If you want to use the original server (`wss://eu-swarm-ws-re.betcoswarm.com/`), you need to add it to `.env` file.

# WebSocket Architecture

## 🏗️ Current Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React App)                     │
│                                                             │
│  Theme1/Theme2 WebSocketContext                            │
│  Connects to: Backend WebSocket                            │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                           │
│                                                             │
│  WebSocket Proxy/Gateway                                    │
│  Receives from: Frontend                                    │
│  Connects to: wss://eu-swarm-ws-re.betcoswarm.com/         │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│              ORIGINAL WEBSOCKET SERVER                       │
│                                                             │
│  wss://eu-swarm-ws-re.betcoswarm.com/                      │
│  Provides: Sports betting data                             │
└─────────────────────────────────────────────────────────────┘
```

## 📍 Current Configuration

### Frontend → Backend Connection

**Code Location:**
- `src/theme1/contexts/WebSocketContext.tsx` (Line 135)
- `src/theme2/contexts/WebSocketContext.tsx` (Line 64)

**Current Address:**
```typescript
const wsUrl = import.meta.env.VITE_WEBSOCKET_URL || "wss://localhost:7275/ws/sports";
socket.current = new WebSocket(wsUrl);
```

**Current Value:**
- Using fallback: `wss://localhost:7275/ws/sports` (backend address)

### Backend → Original Server Connection

**Backend connects to:**
```
wss://eu-swarm-ws-re.betcoswarm.com/
```

**This is handled by your backend server, not the frontend.**

## ✅ Verification

### Frontend Configuration:
- ✅ Connects to backend: `wss://localhost:7275/ws/sports`
- ✅ Code comment confirms: "Connect to backend WebSocket proxy instead of original server"

### Backend Configuration:
- ✅ Backend connects to: `wss://eu-swarm-ws-re.betcoswarm.com/`
- ✅ Backend acts as proxy/gateway

## 🎯 Data Flow

1. **Frontend** sends request → **Backend WebSocket** (`localhost:7275`)
2. **Backend** forwards request → **Original Server** (`eu-swarm-ws-re.betcoswarm.com`)
3. **Original Server** sends response → **Backend**
4. **Backend** forwards response → **Frontend**

## 📝 Summary

- **Frontend connects to:** Backend WebSocket (`wss://localhost:7275/ws/sports`)
- **Backend connects to:** Original server (`wss://eu-swarm-ws-re.betcoswarm.com/`)
- **Architecture:** Frontend → Backend Proxy → Original Server

This setup is correct! The frontend doesn't connect directly to the original server - it goes through your backend proxy.

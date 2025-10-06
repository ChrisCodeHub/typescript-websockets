
initialise and setup tooling

```bash
npm init -y

npm install express
npm install lodash
npm install ws
npm install -D typescript @types/node @types/express @types/ws @types/lodash ts-node nodemon


```


transpile and run
```bash
npm run build
node ./dist/server.js
```

`index.html` was written by Claude.ai  


```txt
What this makes....

Frontend (Browser)                Backend (Server)
==================                ================

chatWs ─────────┐
                ├──────────────► wss (ONE WebSocket Server)
notifWs ────────┤                  │
                │                  ├─► connection event (ws1, req) → path='/chat'
gameWs ─────────┘                  ├─► connection event (ws2, req) → path='/notifications'
                                   └─► connection event (ws3, req) → path='/game/room123'

3 client                          1 server
connections                       3 separate ws objects
```

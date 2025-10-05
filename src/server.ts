import express from 'express'
import http from 'http'
import { WebSocketServer } from 'ws'


const app = express();
const server = http.createServer(app);
app.use(express.static('public'))

const wss = new WebSocketServer({server});

wss.on("connection", (ws)=> {
    console.log(` websocket connected `);
    
    // Send a welcome message
    ws.send('Welcome to the WebSocket server!');

    // setup message handler, gets called whenever a message arrives
    ws.on("message", (data) => {
        console.log(` message ${data}`);
        
        // echo
        ws.send(`Server received: ${data}`);
    });

    // setup on-close handler, gets called whenever socket closes
    ws.on("close", () => {
        console.log(` closed the websocket`);
    });

});


// Start server
const PORT=3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
import express from 'express'
import http from 'http'
import WebSocket, { WebSocketServer } from 'ws'



const app = express();
const server = http.createServer(app);
app.use(express.static('public'))

const wss = new WebSocketServer({server});

// send the request as well so that we can pick up the specific patjs
wss.on("connection", (ws, req)=> {
    console.log(` websocket connected `);


    const path = req.url; // Get the path from the request

    if (path === '/chat'){
        openChatWebsocket(ws);
    } else if (path === 'notifications'){
        openNotificationsWebsocket(ws);
    }else if (path?.startsWith('/game/')) {
        const roomId = path.split('/')[2]; // Extract 'room123'
        handleGame(ws, roomId);
    } else {
        console.log(` Did not recognise the URL ${path}, closing socket `)
        ws.close;
    }

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

function openChatWebsocket(ws:WebSocket){
    console.log(" opened the openChatWebsocket ");
    
    // Send a welcome message
    ws.send('Welcome to the WebSocket chatroom');

    // messages get data, in this case we will just echo back and add a note
    ws.on("message", (data) => {
        ws.send(`Server received: ${data}`);
    });
    
    ws.on("close", () => {
        console.log(` closed the websocket`);
    });
}


function openNotificationsWebsocket(ws:WebSocket){

    const notifloop = setInterval( () => {        
        ws.send(`Notification at ${new Date().toLocaleTimeString()}`);
    }, 5000);

    ws.on("close", ()=>{
        clearInterval(notifloop);
        console.log("closed notifications socket");
    })
}

function handleGame(ws : WebSocket, roomId : string){

}


// Start server
const PORT=3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
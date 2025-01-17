import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "@repo/backend-common/config";
const wss  =  new WebSocketServer({ port : 3002})

wss.on("connection" , (ws ,  request) =>{
    const url = request.url;
    if(!url){
        return;

    }
    const queryparams = new URLSearchParams(url);
    const token = queryparams.get("token") || "";
    const decoded = jwt.verify(token , "JWT_SECRET");


    if(typeof decoded == "string"){
        ws.close();
        return;
    }
    if(!decoded || !decoded.userId){
        ws.close(4001 , "Invalid token");
        return;
    }

    ws.on("message" , (message) =>{
        ws.send("Ping")
    })    
})



import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const wss  =  new WebSocketServer({ port : 3002})

interface User {
    socket : WebSocket,
    roomId :String
}

const allSocket : User[] = []


wss.on("connection" , (ws : WebSocket ,  request) =>{
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
        try {
            const data = JSON.parse(message.toString());
            if(data.type =="join"){
                if(data.type.roomId == ""){
                    return;
                }else{
                    allSocket.push({
                        socket: ws,
                        roomId:data.type.roomId,
                    })
                    console.log("User joined the room ->" + data.type.roomId)
                }
            }

            if(data.type =="chat"){
                const currentUser =allSocket.find((x) => x.socket ==ws)


                allSocket.map((e) => {
                    if(e.roomId == currentUser?.roomId){
                        e.socket.send(JSON.stringify({
                            name: data.type.name,
                            message :data.type.message  
                        }))
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    })   
     
})



import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
const wss  =  new WebSocketServer({ port : 3002})

interface User {
    ws : WebSocket,
    rooms :String[],
    userId : String
}

const users : User[] = []

function checkUser(token : string) : string | null {
    try {
        const decoded = jwt.verify(token, "JWT_SECRET");
        if (typeof decoded == "string") {
          return null;
        }
        if (!decoded || !decoded.userId) {
          return null;
        }

        return decoded.userId;
    } catch (error) {
        return null;
        console.log(error)
    }
    return null;
}

wss.on("connection" , (ws : WebSocket ,  request) =>{
    const url = request.url;
    if(!url){
        return;

    }
    const queryparams = new URLSearchParams(url.split('?')[1]);
    const token = queryparams.get("token") || "";
    
    const userId = checkUser(token);

    if(userId == null ){
        ws.close();
        return null;
    }
    ws.on("message" , async (message) =>{
        try {
            const parsedData = JSON.parse(message as unknown as string);
            
            if(parsedData.type == "join"){
                const user = users.find( (x) => x.ws=== ws)
                if(!user){
                    return;
                }
                user.rooms.push(parsedData.roomId);
            }

            if(parsedData.type ==="leave"){
                const user = users.find((x) => x.ws == ws)
                if(!user){
                    return;
                }
                user.rooms = user?.rooms.filter((x) => x === parsedData.room)
            }


            if(parsedData.type === "chat"){
                const roomId = parsedData.roomId;
                const message = parsedData.message;

                await prismaClient.chat.create({
                    data:{
                        roomId,
                        userId,
                        message
                    }
                })

                users.forEach((user) => {
                    if(user.rooms.includes(roomId)){
                        user.ws.send(JSON.stringify({
                            type :"chat",
                            message : message,
                            roomId
                        }))
                    }
                }) 

            }
        } catch (error) {
            console.log(error)
        }
    })   
     
})



import express, { Request, response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcryptjs"

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log(parsedData.error);
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
   try {
    const parsedData = CreateUserSchema.safeParse(req.body);

    if(!parsedData.success){
        res.json({
            message: "Invalid Data"
        })
        return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password , 6)

    const user = await prismaClient.user.create({
        data : {
            email : parsedData.data.email,
            password : hashedPassword,
            name: parsedData.data.name
        }
    })

    res.json({
        userId : user.id
    })
   } catch (error) {
    res.status(403).json({
        message : "User Already Exist"
    })
   }
});

app.post("/signin", async (req, res) => {

  const parsedData = SigninSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid Credentials",
      errors: parsedData.error.issues, 
    });
    return;
  }

  try {

    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!user) {
      res.status(401).json({
        message: "User doesn't exist",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid password",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Signin successful",
      token,
    });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({
      message: "An error occurred during signin",
    });
  }
});


app.post("/room", middleware, async (req:Request, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  //@ts-ignore
  const userId = req.userId;

  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "Room already exists with this name",
    });
  }
});


app.get("/chats/:roomId" , async(req, res)=>{
    try {
        const roomId = Number(req.params.roomId);

        const messages = await prismaClient.chat.findFirst({
            where: {
                roomId : roomId
            },
            orderBy:{
                id: "desc"
            },
            take:50
        })

        res.json({
            messages : []
        })
    } catch (error) {
        res.status(403).json({
            message : 'Error in get chats messages'
        })
    }
})


app.get("/room/:slug" , )

app.listen(3001);

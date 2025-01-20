"use client"
import { useRef } from "react";
import { Button } from "./ui/button"
import axios from "axios"

const BACKEND_URL = "http://localhost:3000";
export const IsAuthenticated = ( { isSignin } : { isSignin : boolean}) =>{
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const handleAuth = async  () => {
        const response = await axios.post(`${BACKEND_URL}/signin`);
        const data = response.data;
    }
    return (
      <div className="flex flex-col p-4 justify-center items-center mt-40">
        <div className=" text-2xl font-bold pb-4">Welcome to Excalidraw</div>
        <div className="flex flex-col justify-center items-center border-2 border-black rounded-xl p-5 space-y-6 ">
          <input
            className="border border-black p-2 w-full rounded-xl "
            type="text"
            placeholder="Email"
          />
          <input
            className="border border-black p-2 w-full  rounded-xl"
            type="password"
            placeholder="Password"
            // ref={passwordRef}
          />
          <p>
            {isSignin
              ? `Don't have a account ? ` +
                <span className="hover:underline">Signup</span>
              : `Already have an Account ? ` +
                <span className="hover:underline">Signup</span>}
          </p>
          <div className="mt-5 ">
            <Button onClick={handleAuth} size={"default"}>{isSignin ? "Signin" : "Signup"}</Button>
          </div>
        </div>
      </div>
    );
}
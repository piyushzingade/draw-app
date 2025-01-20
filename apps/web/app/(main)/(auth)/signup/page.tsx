import { IsAuthenticated } from "@/components/IsAuthenticated"


export const Signup = () =>{
    return <IsAuthenticated isSignin={false} />
}
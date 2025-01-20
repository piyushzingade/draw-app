import { IsAuthenticated } from "@/components/IsAuthenticated"


export const Signin = () =>{
    return <IsAuthenticated isSignin={true}/>
}
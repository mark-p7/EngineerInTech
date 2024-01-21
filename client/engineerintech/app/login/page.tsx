"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ABVUuA4n0uz
 */
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation"
import { UserContext } from "../context/userContext"
import { useContext, useState } from "react"

export default function Component() {

    const userContext = useContext(UserContext);
    const {login} = userContext;
    const router = useRouter();
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");

    const onClickSignUp = () => {
        router.push('/signup')
    }
    
    const onClickLogin = async () => {
      console.log(emailInput);
      console.log(passwordInput);
        // CALL THE FUNCTION TO LOGIN
        const loggedIn = await login(emailInput, passwordInput)
        // check if the user is logged in through the context
        if(!loggedIn){
          // keep them on this page
          console.log("keep user on this page")
        }
        else{
          // direct them to the main page
          console.log("direct to next page")
          router.push("/editBio")
        }
    }

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat bg-gradient-to-tr from-gray-950 to-purple-900">
      <header className="flex-col p-4 transparent justify-center items-center">
        <Link className="flex flex-col gap-2 justify-center items-center mt-20" href="#"> 
          <img src='./logos/EngineerIn-White-BG-Removed.png' className="w-[25%] justify-center"/>
        </Link>
      </header>
      <main className="flex flex-col items-center flex-1 p-4">
        <div className="mx-auto w-full max-w-sm space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Login</h1>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-100">Email</Label>
              <Input id="email" placeholder="user@example.com" required type="email" value={emailInput} onChange={(e) => setEmailInput(e.currentTarget.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-100">Password</Label>
              <Input id="password" required type="password" value={passwordInput} onChange={(e)=>{setPasswordInput(e.currentTarget.value)}}/>
            </div>
            <Button className="w-full bg-gray-800 text-white" onClick={() => onClickLogin()}>
              Login
            </Button>
          </div>
          <div className="mt-4 mr-4 text-center text-sm text-gray-100">
            <span className="mr-2">Don't have an account?</span>
            <span className="underline text-gray-100" onClick={onClickSignUp}>
              Sign up
            </span>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center py-4 bg-opacity-50 transparent">
        <p className="text-xs text-gray-500 dark:text-gray-300">© 2024 EngineerIn.tech</p>
      </footer>
    </div>
  )
}
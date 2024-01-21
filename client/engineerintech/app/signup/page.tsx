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
    const router = useRouter();
    const userContext = useContext(UserContext);
    const {register} = userContext;

    // state to store password values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function isValidEmail(email:string) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    }

    const onClickLogin = () => {
      router.push('/login');
    }

    const onClickSignUp = async() => {
      // TODO: make sure that the email is valid before the user is allowed to click sign up!
      // handle the signup logic
      if(password !== confirmPassword){
        return
      }
      if(!isValidEmail(email)){
        console.error('email invalid!');
        return
      }
      const registered = await register(email, password);
      if(!registered){
        // keep the user on this page
      }
      else{
        // direct them to the edit profile page
        router.push('/editBio');
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
            <h1 className="text-3xl font-bold text-white">Sign Up</h1>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-100">Email</Label>
              <Input id="email" placeholder="user@example.com" required type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-100">Password</Label>
              <Input id="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmpassword" className="text-gray-100">Confirm Password</Label>
              <Input id="confirmpassword" required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            {(password != confirmPassword) && <p className="text-red-400">Passwords do not match!</p>}
            <Button className="w-full bg-gray-800 text-white" type="submit" disabled={password != confirmPassword} onClick={() => onClickSignUp()}>
              Sign Up
            </Button>
            <div className="mt-4 mr-4 text-center text-sm text-gray-100">
            <span className="mr-2">Have an account?</span>
            <span className="underline text-gray-100" onClick={onClickLogin}>
              Log In
            </span>
          </div>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center py-4 bg-opacity-50 transparent">
        <p className="text-xs text-gray-500 dark:text-gray-300">© 2024 EngineerIn.tech</p>
      </footer>
    </div>
  )
}
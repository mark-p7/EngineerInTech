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
import { useState } from "react"

export default function Component() {
    const router = useRouter();

    // state to store password values
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onClickSignUp = () => {
        // TODO: make sure that the email is valid before the user is allowed to click sign up!
        // handle the signup logic

        // direct them to the next page
        // router.push('/signup')
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
              <Input id="email" placeholder="user@example.com" required type="email" />
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
            <Button className="w-full bg-gray-800 text-white" type="submit" disabled={password != confirmPassword}>
              Sign Up
            </Button>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center py-4 bg-opacity-50 transparent">
        <p className="text-xs text-gray-500 dark:text-gray-300">© 2024 EngineerIn.tech</p>
      </footer>
    </div>
  )
}
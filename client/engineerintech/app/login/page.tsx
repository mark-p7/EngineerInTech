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

export default function Component() {
    const router = useRouter();

    const onClickSignUp = () => {
        router.push('/signup')
    }
    
    const onClickLogin = () => {
        // handleLogin
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
              <Input id="email" placeholder="user@example.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-100">Password</Label>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full bg-gray-800 text-white" type="submit">
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
"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rMZMoDh3QhH
 */

// Boilerplate code taken from above website
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { JSX, SVGProps } from "react"
import { useRouter } from "next/navigation";


export default function Component() {
  const router = useRouter();

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Find Your Perfect Match
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl/relaxed">
                Join our community and meet thousands of lonely hearts from various parts of the world.
              </p>
            </div>
            <Button className="w-full max-w-sm">Sign Up</Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="w-full max-w-md mx-auto space-y-4">
            <form className="flex flex-col space-y-2">
              <Input placeholder="Name" required type="text" />
              <Input placeholder="Email" required type="email" />
              <Input placeholder="Password" required type="password" />
              <Input placeholder="Date of Birth" required type="date" />
              <select className="w-full h-10 rounded-md" required>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
              <Button className="w-full max-w-sm" onClick={() => router.push("/swipe")} >Swipe</Button>

            </form>
          </div>
        </div>
      </section>
      <footer className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="space-y-2">
              <Link className="underline text-sm" href="#">
                Terms of Service
              </Link>
              <Link className="underline text-sm" href="#">
                Privacy Policy
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link className="text-lg" href="#">
                <FacebookIcon className="h-6 w-6" />
              </Link>
              <Link className="text-lg" href="#">
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link className="text-lg" href="#">
                <InstagramIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

function FacebookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

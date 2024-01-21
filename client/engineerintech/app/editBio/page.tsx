"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/h5DmTeSuWB1
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { HoverCardTrigger, HoverCardContent, HoverCard } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation";
import ImageUpload from "./imageUpload"

export default function Component() {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-tr from-gray-950 to-purple-900">
      <Card className="w-full bg-gradient from-gray-950 to-purple-900 border-none">
        <button onTouchStart={() => router.push("/")}>
            <img className="ml-[10.5px] mt-[10.5px] color-white" src="./logos/Expand_left.svg" alt="" />
        </button>
        <CardHeader>
          <CardTitle className="text-gray-100">Edit Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <div className="flex items-center justify-center space-x-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar className="h-24 w-24">
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className="p-4">
                <Button>Edit Profile Picture</Button>
              </HoverCardContent>
            </HoverCard>
          </div> */}
                    <div>
            <ImageUpload></ImageUpload>
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="occupation">Occupation</Label>
            <Input id="occupation" placeholder="Enter your occupation" />
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input className="text-gray-500" id="dob" placeholder="Enter your date of birth" type="date" />
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" placeholder="Enter your gender" />
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="pronouns">Pronouns</Label>
            <Input id="pronouns" placeholder="Enter your pronouns" />
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="skills">Skills</Label>
            <Input id="skills" placeholder="Enter your skills" />
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter your location" />
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="bio">Bio</Label>
            <Textarea className="min-h-[100px]" id="bio" placeholder="Enter your bio" />
            <p className="text-sm text-gray-500">Max 200 words</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto bg-gray-900">Save</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
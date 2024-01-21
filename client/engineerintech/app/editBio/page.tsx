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
import {UserContext} from "../context/userContext";
import {useEffect,useContext, useState} from "react"
import { Divide } from "lucide-react";
import { editBio } from "@/lib/api";


export default function Component() {

       const [base64, setBase64] = useState<string>('');




  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result as string;
        setBase64(result);
        
        setFormData((prevData) => ({ ...prevData, ['profileImage']: result}));
        console.log(formData.profileImage == result)
      };
      
      reader.readAsDataURL(file);
    }
  };

  const router = useRouter();
    const userContext = useContext(UserContext);
    const { user,reloadUser } = userContext; // Access 'user' from the context

    

    interface IProfile {
            name: string,
            occupation: string,
            dob: string,
            profileImage: string, 
            skills: string, 
            bio: string, 
            gender: string, 
            location: string,
            pronouns: string
}

    const [formData, setFormData] = useState<IProfile>({
        name: user.name,
        occupation: user.occupation,
        dob: user.dateOfBirth,
        profileImage: user.profileImage, 
        skills: user.skillCanTeach, 
        bio: user.bio, 
        gender: user.sex, 
        location: user.location,
        pronouns: user.pronouns
    });

    
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit= async() => {
    console.log(formData)
    await editBio(user.tokens[user.tokens.length-1],formData.name,formData.occupation,formData.dob,formData.gender,formData.pronouns,formData.skills,formData.location,formData.bio,formData.profileImage);
    await reloadUser();

  }


  useEffect(() => {
    if (user != undefined && !user._id) router.push("/signup");
  }, [user]);
  
  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-tr from-gray-950 to-purple-900">
      <Card className="w-full bg-gradient from-gray-950 to-purple-900 border-none">
        <button onTouchStart={() => router.push("/profile")}>
          <img className="ml-[10.5px] mt-[10.5px] color-white" src="./logos/Expand_left.svg" alt="" />
        </button>
        <CardHeader>
          <CardTitle className="text-gray-100">Edit Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
            <div>
               <div className="flex flex-col justify-center items-center">
        {/* {formData.profileImage!="" && base64 ==""?
                <Avatar className="h-40 w-40 mb-5">
            <AvatarImage alt="@shadcn" src={formData.profileImage} />
            <AvatarFallback>JP</AvatarFallback>
        </Avatar> : null
        } */}
              {formData.profileImage? 

        <Avatar className="h-40 w-40 mb-5">
            <AvatarImage alt="@shadcn" src={formData.profileImage} />
            <AvatarFallback>JP</AvatarFallback>
        </Avatar>:null}
      <input className="text-sm text-gray-100 mb-5
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
  hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "type="file" accept="image/*" name="profileImage" onChange={handleFileChange
} />
    </div>
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="name">Name</Label>
            <Input id="name" className="text-gray-900" name="name" placeholder={formData.name==""? "Enter your name": formData.name} onChange={handleInputChange} />
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="email">Email</Label>

            <Input id="email" className="text-gray-900" name="email" placeholder={user.email} type="email" readOnly/>
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="occupation">Occupation</Label>
            <Input id="occupation" className="text-gray-900" name="occupation" placeholder={formData.occupation==""? "Enter your occupation": formData.occupation} onChange={handleInputChange}/>
          </div>
          {/* <div className="space-y-2 text-gray-100">
            <Label htmlFor="dob">Date of Birth</Label>
            {formData.dob==""? ( <Input className="text-gray-900" id="dob" name="dob" type="date"/>):
            (            <Input className="text-gray-900" id="dob" name="dob" placeholder={formData.dob} type="string" readOnly/>)   
        }
          </div> */}
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" className="text-gray-900" name="gender" placeholder={formData.gender==""? "Enter your gender": formData.gender} onChange={handleInputChange}/>
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="pronouns">Pronouns</Label>
            <Input id="pronouns" className="text-gray-900" name="pronouns" placeholder={formData.pronouns==""? "Enter your pronouns": formData.pronouns} onChange={handleInputChange}/>
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="skills">Skills</Label>
            <Input id="skills" className="text-gray-900" name="skills" placeholder={formData.skills==""? "Enter your skills": formData.skills} onChange={handleInputChange}/>
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="location">Location</Label>
            <Input id="location" className="text-gray-900" name="location" placeholder={formData.location==""? "Enter your location": formData.location} onChange={handleInputChange}/>
          </div>
          <div className="space-y-2 text-gray-100">
            <Label htmlFor="bio">Bio</Label>
            <Input className="min-h-[100px] text-gray-900" name="bio" placeholder={formData.bio=="" ? "Enter your bio" : formData.bio } onChange={handleInputChange}/>
            <p className="text-sm text-gray-500">Max 200 words</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto bg-gray-900" onClick={handleSubmit}>Save</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

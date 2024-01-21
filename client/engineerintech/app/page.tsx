"use client";
import React, { useEffect, useContext } from "react";
import { UserContext } from "./context/userContext";
import { useRouter } from "next/navigation";
// import Header from "./components/header";
import {generateProfilesMain} from './generateProfiles'
import { Button } from "@/components/ui/button";

/**
 * Home Page
 */
export default function Home() {

  const userContext = useContext(UserContext);
  const { user } = userContext
  const router = useRouter();

  // COMMENT OUT USE_EFFECT TO GENERATEPROFILES

  // useEffect(() => {
  //   if (user != undefined && user._id == "") router.push("/signup");
  //   else if (user != undefined && user._id != "") router.push("/swipe");
  // }, [user]);

  return (
    <>
      {/* <Header /> */}
      <div className="h-[calc(100vh-67px)] w-screen flex justify-center items-center">
        <h1>THIS WILL BE THE SWIPING PAGE</h1>

        {/* call the function for creating all the users here */}
        <Button onClick={generateProfilesMain}></Button>


      </div>
    </>
  );
}

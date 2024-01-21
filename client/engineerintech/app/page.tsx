"use client";
import React, { useEffect, useContext } from "react";
import { UserContext } from "./context/userContext";
import { useRouter } from "next/navigation";
// import Header from "./components/header";

/**
 * Home Page
 */
export default function Home() {

  const userContext = useContext(UserContext);
  const { user } = userContext
  const router = useRouter();

  useEffect(() => {
    if (user != undefined && user._id == "") router.push("/signup");
    else if (user != undefined && user._id != "") router.push("/swipe");
  }, [user]);

  return (
    <>
      {/* <Header /> */}
      <div className="h-[calc(100vh-67px)] w-screen flex justify-center items-center">
        <h1>THIS WILL BE THE SWIPING PAGE</h1>
      </div>
    </>
  );
}

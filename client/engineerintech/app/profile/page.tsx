"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import { UserContext } from "../context/userContext";

// static data to test with
const person =
{
  name: 'John Smith',
  age: '26',
  url: './img/richard.jpg',
  location: 'Vancouver, B.C',
  shortDesc: 'I can teach you Spanish.',
  longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
};


function Profile() {
  const router = useRouter()
  const { user } = useContext(UserContext);

  useEffect(() =>{




  },[user])



  useEffect(() => {
    if (user != undefined && !user._id) router.push("/signup");
  }, [user]);

  // for read more/less
  const [isReadMoreShown, setReadMoreShown] = useState(false)
  const toggleBtn = () => {
    setReadMoreShown(prevState => !prevState)
  }

  const openEditProfilePage = () => {
    router.push("/editBio")
  }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <div className=" overflow-x-hidden overflow-y-hidden">
        <button className="absolute" onClick={() => console.log("herro")}>swipe page</button>
        <div className='w-[120vw] max-w-[430px] h-[500px]'>
          <div
            // ref={childRefs[index]}
            className='absolute'
            key={person.name}
          // onSwipe={(dir) => swiped(dir, character.name, index)}
          // onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + user.profileImage + ')' }}
              className='relative bg-white w-[120vw] max-w-[430px] h-lvh shadow-[0_0_60px_0_rgba(0,0,0,0.30)] bg-cover bg-center'
            >
              <div className="flex flex-row top-[4%] absolute ml-[0.001%]">
                <button onTouchStart={() => router.push("/")}>
                  <img className="ml-[10.5px] mt-[10.5px] color-white" src="./logos/Expand_left.svg" alt="" />
                </button>
                {/* <img className="ml-[69vw] mt-[10.5px] color-white" src="./logos/Meatballs_menu.svg" alt="" /> */}
              </div>

              {/* Bottom section */}
              <div className="bottom-[6%] absolute ml-[4%]">
                <div className="flex flex-col">

                  {/* Name age location */}
                  <div className="flex flex-row">
                    <h3 className=" text-white text-[32px] font-bold font-[Work Sans]" >{user.name},&nbsp;</h3>
                    <h3 className=" text-white text-[32px] font-bold font-[Work Sans]"> {user.age}</h3>
                    <img className="ml-2 w-[25px]" src="./logos/Check_fill.svg" alt="" />
                  </div>
                  <div className="flex flex-row">
                    <img className="w-[32px]" src="./logos/Pin.svg" alt="" />
                    <h3 className="text-white text-[20px] font-[Work Sans]" >{user.location}</h3>
                  </div>
                  {isReadMoreShown ?

                    // Show Less
                    (
                      <div className="flex flex-col justify-between w-[90vw] h-[25vh] bg-stone-900 bg-opacity-90 rounded-[10px] mt-[1%]">
                        <div className="flex flex-col mb-auto ml-4 mt-5 mr-3">
                          <h1 className="text-white text-2xl font-bold font-[Work Sans] m-2">{"I can teach you " + user.skillCanTeach}</h1>
                          <h1 className="text-white text-md font-[Work Sans] mt-[5%] m-2">{user.bio}</h1>
                        </div>

                        <div className="flex flex-col items-end m-3">
                          <button className="" onTouchStart={toggleBtn}>
                            <h3 className="text-white text-xs font-[Work Sans] ">Show less</h3>
                          </button>
                        </div>
                      </div>
                    ) :

                    // Show More
                    (
                      <div className="flex flex-col justify-between w-[90vw] h-[10vh] bg-stone-900 bg-opacity-70 rounded-[10px] mt-[1%]">
                        <div className="flex flex-col mt-auto ml-4">
                          <h1 className="text-white text-xl font-bold font-[Work Sans]">{"I can teach you " + user.skillCanTeach}</h1>
                        </div>
                        <div className="flex flex-col items-end m-3">
                          <button className="" onTouchStart={toggleBtn}>
                            <h3 className="text-white text-xs font-[Work Sans] ">Show more</h3>
                          </button>
                        </div>
                      </div>
                    )}
                  {/* Icons */}
                  <div className="flex flex-row justify-evenly mt-[5%]">
                    <div className="w-[52px] h-[52px] bg-black bg-opacity-90 rounded-full flex justify-center">
                      {/* <button onTouchStart={() => swipeLeft(character.name) }>
                            <img className="w-[30px] invert" src="./logos/x-thin.svg" alt="" />
                          </button>
                        </div>
                        <div className="w-[165px] h-[47px] bg-white rounded-[10px] flex justify-center items-center">
                          <button>
                            <h1 className="text-black text-[15px] font-[Work Sans] font-bold" onTouchStart={()=> console.log(character.name)}>Send Message</h1>
                          </button>
                        </div>
                        <div className="w-[52px] h-[52px] bg-white bg-opacity-70 rounded-full flex justify-center">
                          <button onTouchStart={() => swipeRight(character.name)}>
                            <img className="w-[32px]" src="./logos/Favorite_fill.svg" alt="" />
                          </button> */}

                      <Button size={"lg"} onClick={openEditProfilePage}>Edit Profile</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile
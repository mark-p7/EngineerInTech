"use client";

import { useRouter } from "next/navigation";
import {useState} from "react"
import Lottie from "lottie-react";
import heart from "./heart.json"
import cross from "./cross.json"



//TODO:
// Find a way to grab own token
// Add a default page for when there are no more recommended users
// Make it so that automatically swiping left or right also sends api for update interest and skip list
// Connect swipe right and swipe left api to update interest and skip list
// Make the getNextProfile automatically update
// Add vercel link instead of localhost


// static data to test with
var pfpImage = ['./img/richard.jpg','./img/erlich.jpg','./img/monica.jpg','./img/jared.jpg','./img/dinesh.jpg']

var db = [
  {
    name: 'John Smith',
    age:'26',
    url: './img/richard.jpg',
    location: 'Vancouver, B.C',
    shortDesc: 'I can teach you Spanish.',
    longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
  },
  {
    name: 'Erlich Bachman',
    age:'26',
    url: './img/erlich.jpg',
    location: 'Vancouver, B.C',
    shortDesc: 'I can teach you Spanish.',
    longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
  },
  {
    name: 'Monica Hall',
    age:'26',
    url: './img/monica.jpg',
    location: 'Vancouver, B.C',
    shortDesc: 'I can teach you Spanish.',
    longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
  },
  {
    name: 'Jared Dunn',
    age:'26',
    url: './img/jared.jpg',
    location: 'Vancouver, B.C',
    shortDesc: 'I can teach you Spanish.',
    longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
  },
  {
    name: 'Dinesh Chugtai',
    age:'26',
    url: './img/dinesh.jpg',
    location: 'Vancouver, B.C',
    shortDesc: 'I can teach you Spanish.',
    longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
  }
]



function Swipe () {
  const router = useRouter()

  // keeps track of deck of cards
  const [manualUpdatedList, setManualUpdatedList] = useState(db);

  const handleUpdateClick = () => {
    // getNextProfile()

    setManualUpdatedList([ ...manualUpdatedList,{
      name: (Math.random() %100).toFixed(3),
      age:'26',
      url: pfpImage[Math.floor(Math.random() * (4 - 0 + 1) + 0)],
      location: 'Vancouver, B.C',
      shortDesc: 'I can teach you Spanish.',
      longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
    }])

    
  };


  // for read more/less
  const [isReadMoreShown, setReadMoreShown] = useState(false)
  const toggleBtn = () => {
    setReadMoreShown(prevState => !prevState)
  }

  // for heart emoji
  const [isLiked, setLiked] = useState(false)
  const isLikedBtn = () => {
    setLiked(prevState => !prevState)
    setTimeout(function() {
      setLiked(prevState => !prevState)
      
      
    }, 1000);
  }

  // for cross emoji
  const [isUnliked, setUnliked] = useState(false)
  const isUnlikedBtn = () => {
    setUnliked(prevState => !prevState)
    setTimeout(function() {
      setUnliked(prevState => !prevState)
      
    }, 1500);
  }

  // swipeRight
  const swipeRight = (name: string) => {
    isLikedBtn();
    console.log(name)
    setTimeout(function() {
      handleUpdateClick();
      
    }, 1000);
    
  }

  // swipeLeft
  const swipeLeft = (name: string) => {
    isUnlikedBtn();
    console.log(name)
    setTimeout(function() {
      handleUpdateClick();
      
    }, 1000);
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
            {manualUpdatedList.map((character, index) => (
            <div
                // ref={childRefs[index]}
                className='absolute'
                key={character.name}
                // onSwipe={(dir) => swiped(dir, character.name, index)}
                // onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
                <div
                  style={{ backgroundImage: 'url(' + character.url + ')' }}
                  className='relative bg-white w-[120vw] max-w-[430px] h-lvh shadow-[0_0_60px_0_rgba(0,0,0,0.30)] bg-cover bg-center'
                  >
                  <div className="flex flex-row top-[4%] absolute ml-[0.001%]">
                    <button onTouchStart={() => router.push("/")}>
                        <img className="ml-[10.5px] mt-[10.5px] color-white" src="./logos/Expand_left.svg" alt="" />
                    </button>
                    <img className="ml-[69vw] mt-[10.5px] color-white" src="./logos/Meatballs_menu.svg" alt="" />
                  </div>

                  {/* Bottom section */}
                  <div className="bottom-[6%] absolute ml-[4%]">
                    <div className="flex flex-col">

                    {/* Heart animartion */}
                    {isLiked? (
                      <div className="flex flex-row justify-center">
                        <Lottie className="w-44" animationData={heart} />
                      </div>
                    ) : 
                    (<div className="flex flex-col justify-center">
                      <Lottie animationData={undefined}  />
                    </div>)}

                    {/* X animation */}
                    {isUnliked? (
                    <div className="flex flex-row justify-center">
                      <Lottie className="w-20"  animationData={cross} />
                    </div>
                    ) : 
                    (<div className="flex flex-col justify-center">
                      <Lottie animationData={undefined}  />
                    </div>)}

                    {/* Name age location */}
                      <div className="flex flex-row">
                        <h3 className=" text-white text-[32px] font-bold font-[Work Sans]" >{character.name},&nbsp;</h3>
                        <h3 className=" text-white text-[32px] font-bold font-[Work Sans]"> {character.age}</h3>
                        <img className="ml-2 w-[25px]" src="./logos/Check_fill.svg" alt="" />
                      </div>
                      <div className="flex flex-row">
                        <img className="w-[32px]" src="./logos/Pin.svg" alt="" />
                        <h3 className="text-white text-[20px] font-[Work Sans]" >{character.location}</h3>
                      </div>
                      {isReadMoreShown ? 

                      // Show Less
                      (
                      <div className="flex flex-col justify-between w-[90vw] h-[25vh] bg-stone-900 bg-opacity-90 rounded-[10px] mt-[1%]">
                        <div className="flex flex-col mb-auto ml-4 mt-5 mr-3">
                          <h1 className="text-white text-2xl font-bold font-[Work Sans] m-2">{character.shortDesc}</h1>
                          <h1 className="text-white text-md font-[Work Sans] mt-[5%] m-2">{character.longDesc}</h1>
                        </div>

                        <div className="flex flex-col items-end m-3">
                            <button className="" onTouchStart={toggleBtn}>
                              <h3 className="text-white text-xs font-[Work Sans] ">Show less</h3>
                            </button>
                        </div>
                      </div>
                      ):
                      
                      // Show More
                      (
                      <div className="flex flex-col justify-between w-[90vw] h-[10vh] bg-stone-900 bg-opacity-70 rounded-[10px] mt-[1%]">
                        <div className="flex flex-col mt-auto ml-4">
                          <h1 className="text-white text-xl font-bold font-[Work Sans]">{character.shortDesc}</h1>
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
                          <button onTouchStart={() => swipeLeft(character.name) }>
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
                          </button>
                        </div>
                      </div>
                  </div>
                </div>
                </div>
            </div>
            ))}
        </div>              
      </div>
    </div>
  )
}

export default Swipe
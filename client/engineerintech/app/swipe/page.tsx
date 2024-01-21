"use client";
import { useRouter } from "next/navigation";
import {useState, useEffect, useContext} from "react"
import heart from "./heart.json"
import cross from "./cross.json"
import match from "./match.json"
import { UserContext } from "../context/userContext";
import { IUser } from "../context/userContext";
import {getNextProfile, getNextProfileApi, getProfile, getProfileApi, swipeRightRoute }from "./swipe-apis";
import dynamic from "next/dynamic";

const Lottie = dynamic(
  () => import("lottie-react"),
  { ssr: false }
);

//TODO:
// Find a way to grab own token
// Add a default page for when there are no more recommended users
// Make it so that automatically swiping left or right also sends api for update interest and skip list
// Connect swipe right and swipe left api to update interest and skip list
// Make the getNextProfile automatically update
// Add vercel link instead of localhost

// static data to test with
// var pfpImage = ['./img/richard.jpg','./img/erlich.jpg','./img/monica.jpg','./img/jared.jpg','./img/dinesh.jpg']

// var db = [
//   {
//     name: 'John Smith',
//     age:'26',
//     url: './img/richard.jpg',
//     location: 'Vancouver, B.C',
//     shortDesc: 'I can teach you Spanish.',
//     longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
//   },
//   {
//     name: 'Erlich Bachman',
//     age:'26',
//     url: './img/erlich.jpg',
//     location: 'Vancouver, B.C',
//     shortDesc: 'I can teach you Spanish.',
//     longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
//   },
//   {
//     name: 'Monica Hall',
//     age:'26',
//     url: './img/monica.jpg',
//     location: 'Vancouver, B.C',
//     shortDesc: 'I can teach you Spanish.',
//     longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
//   },
//   {
//     name: 'Jared Dunn',
//     age:'26',
//     url: './img/jared.jpg',
//     location: 'Vancouver, B.C',
//     shortDesc: 'I can teach you Spanish.',
//     longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
//   },
//   {
//     name: 'Dinesh Chugtai',
//     age:'26',
//     url: './img/dinesh.jpg',
//     location: 'Vancouver, B.C',
//     shortDesc: 'I can teach you Spanish.',
//     longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
//   }
// ]




export default function Swipe () {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const [prospect, setProspect] = useState<getNextProfileApi | null>();
  // const [prospect, setProspect] = useState<getProfileApi>();

  const currentToken = user.tokens[user.tokens.length - 1];

  const updateNextProfile = async () => {
    try{
      console.log(currentToken);
      const nextProfile = await getNextProfile(currentToken);
      setProspect(nextProfile);
    } catch(e){
      console.error(e);
      setProspect(null)
    }
  }

  // TEMPORARILY COMMENTED
  useEffect(()=>{
    // call the getProfile api
    updateNextProfile();
  }, []);


  
  // FOR TESTING ONLY
  // useEffect(()=>{
  //   // call the getProfile api
  //   const currentToken = user.tokens[user.tokens.length - 1];

  //   const updateNextProfile = async () => {
  //     console.log(currentToken);
  //     const nextProfile = await getNextProfile(currentToken, '65acc00113511d3bed509482');
  //     setProspect(nextProfile);
  //   }
  //   updateNextProfile();
  // }, []);

  const handleUpdateClick = () => {
    updateNextProfile()
    // setManualUpdatedList([ ...manualUpdatedList,{
    //   name: (Math.random() %100).toFixed(3),
    //   age:'26',
    //   url: pfpImage[Math.floor(Math.random() * (4 - 0 + 1) + 0)],
    //   location: 'Vancouver, B.C',
    //   shortDesc: 'I can teach you Spanish.',
    //   longDesc: 'Hi my name is Alphonsus and I love playing soccer My favourite past times is to go to the park and enjoy the sun.',
    // }])

    
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
    setTimeout(function () {
      setLiked(prevState => !prevState)


    }, 1000);
  }

  // for cross emoji
  const [isUnliked, setUnliked] = useState(false)
  const isUnlikedBtn = () => {
    setUnliked(prevState => !prevState)
    setTimeout(function () {
      setUnliked(prevState => !prevState)

    }, 1500);
  }

  // for match animation
  const [isMatched, setMatched] = useState(false)

  // swipeRight
  const swipeRight = (name: string) => {



    isLikedBtn();
    console.log(name)
    setTimeout(async function () {
      handleUpdateClick();
      // need to pass the userID to the swipe right route as well
      const boo = await swipeRightRoute(currentToken, prospect?.nextUserId)
      if(boo.isMatched === true){
        setMatched(prevState => !prevState)
        setTimeout(function () {
          setMatched(prevState => !prevState)

        }, 1500);
      }
      
    }, 1000);

  }

  // swipeLeft
  const swipeLeft = (name: string) => {
    isUnlikedBtn();
    console.log(name)
    setTimeout(function () {
      handleUpdateClick();

    }, 1000);
    console.log("PRINTING PROSPECT" + prospect);
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
      {/* <button className="absolute" onClick={() => console.log("herro")}>No more people to show!</button> */}
      {!prospect && ( <div>
          <div className="flex flex-row top-[4%] absolute">
          <button onTouchStart={() => router.push("/")}>
            <img className="ml-[10.5px] mt-[10.5px] w-16 invert" src="./logos/chat.svg" alt="" />
          </button>
          <button onTouchStart={() => router.push("/profile")}>
            <img className="ml-[65vw] mt-[10.5px] w-14 invert" src="./logos/edit-profile2.svg" alt="" />
          </button>
          
        </div>

        <div className="h-screen flex items-center justify-center bg-gray-900">
          
          <p className="items-center justify-center text-gray-100">Stay tuned for more profiles...</p>
        </div> </div>
        
      )}
          {prospect && (
            <div
                // ref={childRefs[index]}
                className='absolute'
                key={prospect.nextUserName}
                // onSwipe={(dir) => swiped(dir, character.name, index)}
                // onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
                <div
                  style={{ backgroundImage: 'url(' + prospect.nextUserProfileImage + ')' }}
                  className='relative bg-white w-[120vw] max-w-[430px] h-lvh shadow-[0_0_60px_0_rgba(0,0,0,0.30)] bg-cover bg-center'
                  >
                <div className="flex flex-col">
                  <div className="flex flex-row top-[4%] absolute">
                    <button onTouchStart={() => router.push("/chat")}>
                      <img className="ml-[10.5px] mt-[10.5px] w-16 invert" src="./logos/chat.svg" alt="" />
                    </button>
                    
                

                      {user.skillCanTeach!=""? (                      
                        <button onTouchStart={() => router.push("/profile")}>
                        <img className="ml-[65vw] mt-[10.5px] w-14 invert" src="./logos/edit-profile2.svg" alt="" />
                      </button>):                      <button onTouchStart={() => router.push("/profile")}>
                        <img className="ml-[65vw] mt-[10.5px] w-14 fill-yellow-900 border-4 border-red-600 p-1 bg-yellow-500" src="./logos/edit-profile2.svg" alt="" />
                      </button>}
                
                    
 
                  </div>
                  {user.skillCanTeach==""?(<div className="text-3xl absolute top-[30%] border-4 bg-gray-900 text-gray-100">Please fill out personal information before proceeding.</div>):null}
                    

                </div>


                {/* Bottom section */}
                <div className="bottom-[6%] absolute ml-[4%]">
                  <div className="flex flex-col">

                    {/* Heart animartion */}
                    {typeof window !== "undefined" && typeof document !== "undefined" && <>
                      {isLiked ? (
                        <div className="flex flex-row justify-center">
                          <Lottie className="w-44" animationData={heart} />
                        </div>
                      ) :
                        (<div className="flex flex-col justify-center">
                          <Lottie animationData={undefined} />
                        </div>)}

                      {/* X animation */}
                      {isUnliked ? (
                        <div className="flex flex-row justify-center">
                          <Lottie className="w-20" animationData={cross} />
                        </div>
                      ) :
                        (<div className="flex flex-col justify-center">
                          <Lottie animationData={undefined} />
                        </div>)}
                    </>}

                    {/* Match animation */}
                    {isMatched ? (
                        <div className="flex flex-row justify-center">
                          <Lottie className="w-30" animationData={match} />
                        </div>
                      ) :
                        (<div className="flex flex-col justify-center">
                          <Lottie animationData={undefined} />
                        </div>)}

                    {/* Name age location */}
                      <div className="flex flex-row">
                        <h3 className=" text-white text-[32px] font-bold font-[Work Sans]" >{prospect.nextUserName},&nbsp;</h3>
                        <h3 className=" text-white text-[32px] font-bold font-[Work Sans]"> {"temp"}</h3>
                        <img className="ml-2 w-[25px]" src="./logos/Check_fill.svg" alt="" />
                      </div>
                      <div className="flex flex-row">
                        <img className="w-[32px]" src="./logos/Pin.svg" alt="" />
                        <h3 className="text-white text-[20px] font-[Work Sans]" >{prospect.nextUserLocation}</h3>
                      </div>
                      {isReadMoreShown ? 

                      // Show Less
                      (
                      <div className="flex flex-col justify-between w-[90vw] h-[25vh] bg-stone-900 bg-opacity-90 rounded-[10px] mt-[1%]">
                        <div className="flex flex-col mb-auto ml-4 mt-5 mr-3">
                          <h1 className="text-white text-2xl font-bold font-[Work Sans] m-2">{prospect.nextUserSkills}</h1>
                          <h1 className="text-white text-md font-[Work Sans] mt-[5%] m-2">{prospect.nextUserBio}</h1>
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
                          <h1 className="text-white text-xl font-bold font-[Work Sans]">{prospect.nextUserSkills}</h1>
                        </div>
                        <div className="flex flex-col items-end m-3">
                            <button className="" onTouchStart={toggleBtn}>
                              <h3 className="text-white text-xs font-[Work Sans] ">Show more</h3>
                            </button>
                        </div>
                      </div> 
                       )}
                       {/* Icons */}
                       {user.skillCanTeach!="" ?(                      <div className="flex flex-row justify-evenly mt-[5%]">
                        <div className="w-[52px] h-[52px] bg-black bg-opacity-90 rounded-full flex justify-center">
                          <button onTouchStart={() => swipeLeft(prospect.nextUserName) }>
                            <img className="w-[30px] invert" src="./logos/x-thin.svg" alt="" />
                          </button>
                        </div>
                        <div className="w-[52px] h-[52px] bg-white bg-opacity-70 rounded-full flex justify-center">
                          <button onTouchStart={() => swipeRight(prospect.nextUserName)}>
                            <img className="w-[32px]" src="./logos/Favorite_fill.svg" alt="" />
                          </button>
                        </div>
                      </div>):null}

                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

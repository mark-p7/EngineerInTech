"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/a9fDF3yMTzm
 */
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { useContext, useEffect, useState } from "react"
import customAxios from "@/lib/axios"
import { useRouter } from "next/navigation"
import { UserContext } from "@/app/context/userContext"

export default function Component() {

    const router = useRouter()
    const { user } = useContext(UserContext);
    const [chats, setChats] = useState<any[]>([]);

    useEffect(() => {
        async function fetchChats() {
            const res = await customAxios.post("/allChats", { token: user.tokens[0] });
            console.log(res.data)
            setChats(res.data)
        }
        if (user != undefined && !user._id) router.push("/signup");
        if (user != undefined && user.tokens[0] != undefined) {
            fetchChats();
        }
    }, [user])

    return (
        <div key="1" className="flex flex-col h-screen">
            <header className="flex items-center justify-between p-4 border-b">
                <Button variant="outline" onClick={() => router.push("/swipe")}>Back</Button>
                <h1 className="text-xl font-bold">Chats</h1>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-4">
                    <div className="divide-y dark:divide-gray-800">
                        {chats && chats.map((chat) => (
                            <div key={chat._id} className="group flex items-center gap-4 p-4" onClick={() => router.push("/chat/" + chat.chatId)}>
                                <Avatar className="h-10 w-10">
                                    <AvatarImage alt="@johndoe" src={chat.profileImage} />
                                    <AvatarFallback>{chat?.name?.toUpperCase() || "A"}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-medium truncate">{chat.name}</h2>
                                        <time className="text-xs text-gray-500 dark:text-gray-400">{chat.timestamp}</time>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {chat.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}


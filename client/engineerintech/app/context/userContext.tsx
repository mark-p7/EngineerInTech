"use client"
import React, { useState, createContext, useEffect } from "react";
import customAxios from "@/lib/axios";

export const defaultUser: IUser = {
    "email": "",
    "password": "",
    "name": "",
    "occupation": "",
    "sex": "",
    "pronouns": "",
    "location": "",
    "profileImage": "",
    "skillCanTeach": "",
    "bio": "",
    "incomingInterestList": [],
    "skipList": [],
    "matchList": [],
    "chats": [],
    "tokens": [],
    "_id": "1",
    "dateOfBirth": "",
    "__v": 0
}

export interface IUser {
    "email": string,
    "password": string,
    "name": string,
    "occupation": string,
    "sex": string,
    "pronouns": string,
    "location": string,
    "profileImage": string,
    "skillCanTeach": string,
    "bio": string,
    "incomingInterestList": string[],
    "skipList": string[],
    "matchList": string[],
    "chats": string[],
    "tokens": string[],
    "_id": string,
    "dateOfBirth": string,
    "__v": number,
    "age"?: number
}

export interface IUserContext {
    user: IUser;
    register: (email: string, password: string) => void | Promise<boolean>;
    login: (email: string, password: string) => void | Promise<boolean>;
    logout: () => void;
    reloadUser: () => void;
}

export const defaultUserContext: IUserContext = {
    user: defaultUser,
    register: () => { },
    login: () => { },
    logout: () => { },
    reloadUser: () => {}
};

export const UserContext = createContext(defaultUserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(defaultUser);
    
    useEffect(() => {
        if (typeof window === "undefined") return;
        const token = localStorage.getItem("token");
        if (!token) {
            setUser({...defaultUser, "_id": ""});
            return;
        }
        customAxios.post("/token/validate", { token: token }).then((res) => {
            const newUser = {
                ...res.data,
                age: calculateAge(res.data.dateOfBirth)
            }
            res.data._id != "" ? setUser(newUser) : setUser({ ...defaultUser, "_id": "" });
        }).catch((err: any) => {
            setUser({ ...defaultUser, "_id": "" });
        });
    }, []);

    const reloadUser = async() => {
        if (typeof window === "undefined") return;
        const token = localStorage.getItem("token");
        if (!token) {
            setUser({...defaultUser, "_id": ""});
            return;
        }
        customAxios.post("/token/validate", { token: token }).then((res) => {
            const newUser = {
                ...res.data,
                age: calculateAge(res.data.dateOfBirth)
            }
            res.data._id != "" ? setUser(newUser) : setUser({ ...defaultUser, "_id": "" });
        }).catch((err: any) => {
            setUser({ ...defaultUser, "_id": "" });
        });
    }

    function calculateAge(dob:string){
        // Get the current date
        const currentDate = new Date();
        var birthDate = new Date(dob)

        // Calculate the difference in years
        let age = currentDate.getFullYear() - birthDate.getFullYear();

        // Check if the birthday has occurred this year
        if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    }

    const register = async (email: string, password: string): Promise<boolean> => {
        try {
            const result = await customAxios.post("/register", { email: email, password: password });
            const newUser: IUser = {...result.data, age: calculateAge(result.data.dateOfBirth)};
            if (typeof window !== "undefined") localStorage.setItem("token", newUser.tokens[0]);
            setUser(newUser);
            return true;
        } catch (err) {
            console.log(err)
        }
        return false;
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const result = await customAxios.post("/login", { email: email, password: password })
            const newUser: IUser = {...result.data, age: calculateAge(result.data.dateOfBirth)};
            if (typeof window !== "undefined") localStorage.setItem("token", newUser.tokens[0]);
            setUser(newUser);
            return true;
        } catch (err) {
            console.log(err)
        }
        return false;
    };

    const logout = () => {
        try {
            if (typeof window === "undefined") return;
            const token = localStorage.getItem("token");
            if (!token) return;
            customAxios.post("/logout", { token: token }).then((res: { data: { isLoggedOut: any; }; }) => {
                if (res.data.isLoggedOut) {
                    localStorage.removeItem("token");
                    setUser({...defaultUser, "_id": ""});
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <UserContext.Provider value={{ user, register, login, logout,reloadUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

import React, { useState, createContext, useEffect } from "react";
import customAxios from "../lib/axios";

export interface IUser {
    bio: string;
    _id: string;
    email: string;
    password: string;
    name: string;
    occupation: string;
    images: string[];
    sex: string;
    location: string;
    profileImage: string;
    skillCanTeach: string;
    userDesc: string;
    incomingInterestList: string[];
    skipList: string[];
    matchList: string[];
    chats: string[];
    tokens: string[];
    dateOfBirth: string;
    __v: number;
}

export const defaultUser: IUser = {
    _id: "",
    bio: "",
    email: "",
    password: "",
    name: "",
    occupation: "",
    images: [],
    sex: "",
    location: "",
    profileImage: "",
    skillCanTeach: "",
    userDesc: "",
    incomingInterestList: [],
    skipList: [],
    matchList: [],
    chats: [],
    tokens: [],
    dateOfBirth: "",
    __v: 0,
};

export interface IUserContext {
    user: IUser;
    register: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const defaultUserContext: IUserContext = {
    user: defaultUser,
    register: () => { },
    login: () => { },
    logout: () => { },
};

export const UserContext = createContext(defaultUserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(defaultUser);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const token = localStorage.getItem("token");
        if (!token) return;

        customAxios.post("/token/validate").then((res) => {
            res.data._id ? setUser(res.data.user) : setUser(defaultUser);
        }).catch((err) => {
            setUser(defaultUser);
        });
    }, []);

    const register = (email: string, password: string) => {
        customAxios.post("/register", { email: email, password: password }).then((res) => {
            const newUser: IUser = res.data;
            if (typeof window !== "undefined") localStorage.setItem("token", newUser.tokens[0]);
            setUser(newUser);
        }).catch((err) => {
            console.log(err);
        });
    };

    const login = (email: string, password: string) => {
        customAxios.post("/login", { email: email, password: password }).then((res) => {
            const newUser: IUser = res.data;
            if (typeof window !== "undefined") localStorage.setItem("token", newUser.tokens[0]);
            setUser(newUser);
        }).catch((err) => {
            console.log(err);
        });
    };

    const logout = () => {
        try {
            if (typeof window === "undefined") return;
            const token = localStorage.getItem("token");
            if (!token) return;
            customAxios.post("/logout", { token: token }).then((res) => {
                if (res.data.isLoggedOut) {
                    localStorage.removeItem("token");
                    setUser(defaultUser);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <UserContext.Provider value={{ user, register, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

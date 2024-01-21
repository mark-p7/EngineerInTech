import customAxios from "@/lib/axios";
import { IUser } from "../context/userContext";

export interface getNextProfileApi { 
    nextUserId: string;
    nextUserName: string;
    nextUserOccupation: string;
    nextUserDob: Date;
    nextUserProfileImage: string;
    nextUserSkills: string;
    nextUserBio: string;
    nextUserGender: string;
    nextUserLocation: string;
    nextUserPronouns: string;
}

export interface getProfileApi {
    name: string;
    occupation: string;
    dob: Date;
    profileImage: string;
    skills: string;
    bio: string;
    gender: string;
    location: string;
    pronouns: string;
}


export const getNextProfile = async(token: string): Promise<getNextProfileApi> => {
    console.log('token received in api' + token);
    const response = await customAxios.post("/nextProfile", {token: token});
    return response.data;
}


export const getProfile = async(token: string, userId: string): Promise<getProfileApi> => {
    console.log('token received in api' + token);
    const response = await customAxios.post("/profile", {token: token, userId: userId});
    return response.data;
}

export const swipeRightRoute = async(token:string) => {
    const response = await customAxios.post("/swipeRight", {token: token});
    return response.data;
}

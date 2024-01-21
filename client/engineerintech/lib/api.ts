import  customAxios from "./axios";


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



export const editBio = async (token: string, name: string,occupation: string, dob: string,gender: string, pronouns: string, skills: string, location: string,bio: string, profileImage: string): Promise<{}> => {

    


    const response = await customAxios.put("/modifyAccountDetails", { token: token || "", name:name || "" , occupation:occupation || "", dob:dob || "",gender:gender || "",skills:skills || "",location:location || "",bio:bio || "",profileImage:profileImage || ""});
    return response.data;
};
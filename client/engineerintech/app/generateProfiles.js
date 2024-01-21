import customAxios from "@/lib/axios";

// call the register


export const swipeRightRoute = async(token, userId) => {
    const response = await customAxios.put("/swipeRight", {token: token, userId: userId});
    return response.data;
}

const register = async(email, password) => {
    const response = await customAxios.post("/register", {email: email, password: password});
    return response.data;
}

const modifyAccountDetails = async(token, name, pronouns, skills, bio, profileImage, location) => {
    const response = await customAxios.put("/modifyAccountDetails", {token: token, name: name, pronouns: pronouns, skills: skills, bio: bio, profileImage: profileImage, location: location});
    return response.data;
}


const names = ["David", "Sandra", "Tyler", "Eric", "Andrew", "Paul", "Laura", "Jason", "Steven", "Thompson"];
const pronouns = ["he/him", "she/her", "they/them","he/him", "she/her", "they/them","he/him", "she/her", "they/them", "he/him"];
const skills = ["electrical engineering", "software development", "civil engineering", "mechanical engineering", "software engineering", "devops engineer", "Site Reliability Engineer","Tech Lead", "Project Manager", "Product Manager"];
const bio = "I like hackathons! I would love to show you what it's like!";
const locations = ['Vancouver', 'Burnaby', 'Coquitlam', 'Port Moody', 'Surrey', 'Hope', 'Whistler', 'Victoria', 'Langford', 'Tofino'];
const password = "test1234";


export const generateProfilesMain = async() => {

    for(let i = 0; i < 200; i++){
        try{
            // REGISTER THE USER
            const email = names[i%10] + i.toString() + "@gmail.com";
            const createdUser = await register(email, password);
            const currentToken = createdUser.tokens[0];
            console.log(currentToken);
            const profileImageUrl = 'https://thispersondoesnotexist.com/?' + (Math.floor(Math.random() * 100000)).toString();
            console.log(profileImageUrl);
            // update their inforation
            await modifyAccountDetails(currentToken, names[i%10], pronouns[i%10], skills[i%10], bio, profileImageUrl, locations[i%10]);
        }
        catch{
            console.error('COULD NOT CREATE USER!');
        }
    }
}
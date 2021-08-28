import { User } from "../@types/common";

const ENDPOINT_URL = 'https://randomuser.me/api/?results=20';

const convertRawData = (data: any[]): User[] => {
    const result = data.map((item) => {
        return {
            name: item.name.first + " " + item.name.last,
            email: item.email,
            username: item.login.username,
            password: item.login.password,
            photo_url: item.picture.medium
        }
    })
    return result
}

export const getUsers = async () => {
    const response = await fetch(ENDPOINT_URL);
    const responseData = await response.json();
    const result  = convertRawData(responseData.results);
    return result;
}
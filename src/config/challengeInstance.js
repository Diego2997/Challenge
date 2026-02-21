import axios from "axios";

export const challengeInstance = axios.create({
    baseURL: "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net",
    timeout: 12000,
    headers: {
        "Content-Type": "application/json",
    },
});
const clientID = "1jVSpnZP5dTjIA7ti3ysbA";
const secret = "3v1UOMczExCBTdoZ_Qz_g-oI5vVhww";
const baseURL = "https://www.reddit.com/api/v1";
const redirectURI = 'http://localhost:3000/'
let stateRandom;

let accessToken

//getAccessToken doesn't work right now. Come back and work on this later.
//retrieve user data doesn't work right now because getAccessToken doesn't work.

export const Reddit = {
    async fetchPosts () {
        const response = await fetch('https://www.reddit.com/.json');
        const jsonResponse = await response.json();
        const articlesArray = await jsonResponse.data.children;
        return articlesArray;
    },


    getAccessToken (scope) {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //Clears the access token after expiration date, to allow for the ability to grab a new access token
            window.setTimeout(() => { accessToken = ''}, expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }

        else {
            stateRandom = Math.floor(Math.random() * 1000000);
            const accessUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientID}&response_type=${'code'}&state=${stateRandom}&redirect_uri=${redirectURI}&duration=permanent&scope=${scope}`;
            console.log(accessUrl)
            //window.location = accessUrl;
        }
    },

    async retrieveUserData () {
        const accessToken = await Reddit.getAccessToken('identity');
        
        try {
            const response = await fetch(`${baseURL}/me`);
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(await jsonResponse);
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
    },

}
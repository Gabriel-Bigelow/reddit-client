import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from 'react-redux';
import { encode as base64_encode } from 'base-64';

const clientID = "1jVSpnZP5dTjIA7ti3ysbA";
const secret = "3v1UOMczExCBTdoZ_Qz_g-oI5vVhww";
const baseURL = "https://www.reddit.com/api/v1";
const redirectURI = 'http://localhost:3000/'

const duration = "temporary"


let state;
let accessToken;

export const getUserID = createAsyncThunk(
    'reddit/getUserID',
    async (state) => {
        window.location = `https://www.reddit.com/api/v1/authorize?client_id=${clientID}&response_type=code&state=${state}&redirect_uri=${redirectURI}&duration=${duration}&scope=identity`
    }
)



export const redditSlice = createSlice({
    name: 'reddit',
    initialState: {
        auth: {
            code: null,
            scope: null,
            state: null,
            duration: null
        },
        sendRequest: false,
        request: null,
        accessToken: null
    },
    reducers: {
        setCode: (state, {payload}) => {
            state.auth.code = payload;
        },
        randomState: (state, {payload}) => {
            const random = Math.floor(Math.random() * 10000000).toString();
            state.auth.state = random;
        },
        setScope: (state, {payload}) => {
            state.auth.scope = payload;
        },
        setDuration: (state, {payload}) => {
            state.auth.duration = payload;
        },
        setSendRequest: (state, action) => {
            state.sendRequest = action.payload;
        },
        setRequest: (state, action) => {
            state.request = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        }
    },
});


export const { setCode, randomState, setScope, setDuration, setSendRequest, setRequest, setAccessToken } = redditSlice.actions;

export const selectAuth = (state) => state.reddit.auth;
export const selectSendRequest = (state) => state.reddit.sendRequest;
export const selectRequest = (state) => state.reddit.request;
export const selectAccessToken = (state) => state.reddit.accessToken;

/*
export const selectCode = (state) => state.reddit.auth.code;
export const selectState = (state) => state.reddit.auth.state;
export const selectScope = (state) => state.reddit.auth.scope;
export const selectDuration = (state) => state.reddit.auth.duration;*/


const headers = (token) => {
    return { Authorization: `bearer ${token}` }
}

export const Reddit = {
    authorize (code, state, duration, scope) {
        window.location = `https://www.reddit.com/api/v1/authorize?client_id=${clientID}&response_type=${code}&state=${state}&redirect_uri=${redirectURI}&duration=${duration}&scope=${scope}`
    },
    
    async postAccessToken (code) {
        const userpass = base64_encode(clientID + ":" + secret);
        const headers = { 
            'Authorization': `Basic ${userpass}`, 
            'User_Agent': "Lurker 0.1.0 by /u/Bonechiller0",
            'Content-Type': "application/x-www-form-urlencoded"        
        };
        const params = {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectURI
        }
        let formBody = [];
        
        
        for (let property in params) {
            //let encodedKey = property;
            //let encodedValue = params[property];
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        
        formBody = formBody.join('&');
        console.log(formBody);
        console.log(code);

        


        
        let form = new FormData();
        form.append('code', code);
        form.append('grant_type', 'authorization_code');
        form.append('redirect_uri', redirectURI);


        const options = {
            method: "POST",
            body: formBody,
            headers: headers
        }
        

        const response = await fetch(`/access_token`, options);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return await jsonResponse;
    }
}

export default redditSlice.reducer;
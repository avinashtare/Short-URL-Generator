import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCookie, setCookie } from "@/utils/cookies";

const Server_Url = import.meta.env.VITE_Server_URL

// signup user 
export const signUpUser = createAsyncThunk("signUpUser", async ({ fullName, email, password }) => {
    const requestBody = {
        email: email,
        password: password,
        full_name: fullName
    }

    let signUpUserResponse = await fetch(`${Server_Url}/user/signup`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    let signUpUserData = await signUpUserResponse.json();

    let token = signUpUserData?.data?.token;

    if (!signUpUserData?.error && token) {
        setCookie("token", token)
        return { isSignUp: true }
    }
    else {
        // if email exist 
        if (signUpUserData.status == "email exist") return { isSignUp: false, emailExist: true }
        // if other error 
        return { isSignUp: false }
    }
})

// sign in user 
export const signInUser = createAsyncThunk("signInUser", async ({ email, password }) => {
    const requestBody = {
        email: email,
        password: password
    }

    let signInUserResponse = await fetch(`${Server_Url}/user/signin`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    let signInUserData = await signInUserResponse.json();

    let token = signInUserData?.data?.token;

    if (!signInUserData?.error && token) {
        setCookie("token", token)
        return { isSignIn: true }
    }
    else {
        return { isSignIn: false }

    }
})

// check user valid or not 
export const validUser = createAsyncThunk("validUserAPI", async () => {
    let token = getCookie("token");

    if (!token) {
        return { isValid: false }
    }

    let validUserResponse = await fetch(`${Server_Url}/user/is-valid-user`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "token": token
        },
    });
    validUserResponse = await validUserResponse.json();

    if (validUserResponse?.data?.isValidUser) {
        const { fullName, email } = validUserResponse.data;
        const moreInfo = { fullName, email };
        return { isValid: true, info: moreInfo };
    }
    return { isValid: false };
});
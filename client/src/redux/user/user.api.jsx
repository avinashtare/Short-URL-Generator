import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCookie, setCookie } from "@/utils/cookies";

const Server_Url = import.meta.env.VITE_Server_URL

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
        return true
    }
    else {
        throw Error();
    }
    return false
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
        return { isValid: true };
    }
    return { isValid: false };
});
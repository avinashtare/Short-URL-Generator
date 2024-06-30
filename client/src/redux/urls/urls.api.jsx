import { createAsyncThunk } from "@reduxjs/toolkit";
const Server_Url = import.meta.env.VITE_Server_URL
import { getCookie } from "@/utils/cookies";

export const createUrl = createAsyncThunk("createUrl", async ({ url }) => {
    let token = getCookie("token");

    if (!token) {
        return { isValid: false }
    }

    let createUrlResponse = await fetch(`${Server_Url}/links/create-short-url`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
        body: JSON.stringify({ url: url }),
    });

    let createUrlData = await createUrlResponse.json();

    if (createUrlData?.status == "url") {
        return { isValidUrl: false };
    }
    else if ((createUrlData?.data?.isValidUser) == false) {
        return { isValidUser: false };
    }
    else if (!createUrlData?.error && createUrlData?.data?.shortedURL) {
        return createUrlData;
    }
    else {
        throw new Error();
    }
})

export const getLinks = createAsyncThunk("getLinks", async () => {
    let token = getCookie("token");

    if (!token) {
        return { isValid: false }
    }

    let getUrlResponse = await fetch(`${Server_Url}/links/get-links`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });

    let getUrlResponseData = await getUrlResponse.json();

    // first check user valid or not 
    if (getUrlResponseData?.data?.isValidUser) return { isValid: false }

    if (getUrlResponseData.status == "success" && getUrlResponseData?.data?.isLinks) {
        return { links: getUrlResponseData?.data?.links }
    }
    else {
        throw new Error();
    }
})
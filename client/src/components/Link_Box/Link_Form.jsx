import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast, useToast } from "react-toastify"
import { createUrl } from "@/redux/urls"
import CopyLinkBox from './CopyLinkBox'


function Link_Form() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // urls state 
    const urlsState = useSelector((state) => state.urls.createUrl)
    // check user valid state
    const isValidUser = useSelector(state => state.user.isValidUser);

    // all the created urls 
    const [shortUrls, setShortUrls] = useState([]);

    // crate url box 
    const [CreateUrl, setCreateUrl] = useState("")

    const handleCreateURL = async (e) => {
        e.preventDefault()
        if (!isValidUser) {
            navigate("/sign_up")
            return null;
        }
        let UrlResponse = await dispatch(createUrl({ url: CreateUrl.trim() }))
        let UrlResponseData = UrlResponse.payload;
        if (UrlResponseData?.isValidUrl == false) {
            toast.warning("Invalid Url")
        }
        else if (UrlResponseData?.isValidUser == false) {
            navigate("/sign_out")
        }
        else if (UrlResponseData?.status == "success") {
            // get data from api
            let shortedURL = UrlResponseData.data.shortedURL;
            let originalURL = UrlResponseData.data.originalUrl;
            // append in url list 
            setShortUrls([...shortUrls, { ShortURL: shortedURL, LongURL: originalURL }]);
            // show toast 
            toast.success("Short URL created");
            // clear input 
            setCreateUrl("");
        }
    }

    // handle server error  while creating a link
    useEffect(() => {
        if (urlsState.isError) {
            toast.error("Internal Server Error!");
        }
    }, [urlsState.isError]);


    // copy user url 
    useEffect(() => {
        try {
            navigator.clipboard.readText().then((text) => {
                text.startsWith("http")?setCreateUrl(text):null;
            })
        } catch (error) {}
    }, [])
    return (
        <>
            <div className='container drop-shadow-md my-2 mb-10 flex flex-col items-center justify-center m-auto'>
                <h1 className="mb-4 text-3xl font-extrabold  text-center text-gray-900 dark:text-white md:text-5xl lg:text-6xl my-5"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400 box">Short URL</span></h1>

                <div className='p-10 rounded-lg my-2' style={{ boxShadow: "0 0 10px 2px gray" }}>
                    <h1 className='text-4xl font-bold dark:text-white text-center my-2'>Paste the URL to be shortened</h1>

                    <form className="max-w-lg mx-auto my-5" onSubmit={handleCreateURL}>
                        <div className="flex">
                            <div className="relative w-full">
                                <input type="url" value={CreateUrl} onChange={((e) => setCreateUrl(e.target.value))} className="block p-3 w-full z-20 text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 text-base" placeholder="Enter the link here.." required />

                                <button type="submit" className="absolute color-white top-0 end-0 p-2.5 text-base font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled" disabled={urlsState.isLoading}>
                                    <span>{urlsState.isLoading ? "Generating.." : "Shorten URL"}</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse">
                            {/* copy url  */}
                            {shortUrls.map(({ ShortURL, LongURL }, index) => (
                                <CopyLinkBox
                                    key={index}
                                    ShortURL={ShortURL}
                                    LongURL={LongURL}
                                />
                            ))}

                        </div>
                    </form>

                    <div className='text-lg text-gray-50'>
                        <span>ShortURL is a free tool to shorten URLs and generate short links</span>
                        <br />
                        <span>URL shortener allows to create a shortened link making it easy to share</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Link_Form;
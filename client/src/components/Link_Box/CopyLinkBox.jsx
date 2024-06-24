import React, { useState } from 'react'

const CopyLinkBox = (props) => {
    const { ShortURL, LongURL } = props;
    const [CopyText, setCopyText] = useState("Copy")

    const copyUrl = () => {
        navigator.clipboard.writeText(ShortURL)
        setCopyText("Copyed")
        setTimeout(() => {
            setCopyText("Copy")
        }, 1000);
    }
    return (
        <div>
            <div className="relative w-full mt-5">
                <input type="url" value={ShortURL} className="block p-3 w-full z-20 text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 text-base" readOnly />

                <button type="button" className="absolute top-0 end-0 p-2.5 text-base font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={copyUrl}>
                    <span>{CopyText}</span>
                </button>
            </div>
            <p className="px-2 text-white">Long URL: <a className="text-blue-400" href={LongURL}>{LongURL}</a></p>
        </div>
    )
}

export default CopyLinkBox
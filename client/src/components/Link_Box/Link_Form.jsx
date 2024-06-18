import React from 'react'

function Link_Form() {
    return (
        <>
            <div className='container drop-shadow-md my-2 mb-10 flex flex-col items-center justify-center m-auto'>
                <h1 className="mb-4 text-3xl font-extrabold  text-center text-gray-900 dark:text-white md:text-5xl lg:text-6xl my-5"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400 box">Short URL</span></h1>

                <div className='p-10 rounded-lg my-2' style={{boxShadow: "0 0 10px 2px gray"}}>
                    <h1 className='text-4xl font-bold dark:text-white text-center my-2'>Paste the URL to be shortened</h1>

                    <form className="max-w-lg mx-auto my-5 ">
                        <div className="flex">
                            <div className="relative w-full">
                                <input type="url" className="block p-3 w-full z-20 text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 text-base" placeholder="Enter the link here.." required />

                                <button type="submit" className="absolute color-white top-0 end-0 p-2.5 text-base font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <span>Shorten ULR</span>
                                </button>
                            </div>
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

export default Link_Form
import React, { useEffect, useState } from 'react'
import Logo from "@/assets/logo.png";
import { Navlinks } from "@/constants.jsx";
import { Link } from 'react-router-dom';

function Fotter() {
    const [ThisYear, setThisYear] = useState("")
    useEffect(() => {
      let year = new Date().getFullYear();
      setThisYear(year)
    }, [])
    
    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 w-full mt-[50vh]">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={Logo} className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Url Shorter</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        {
                            Navlinks.map(({ name, href }, index) => (
                                <li key={index}>
                                    <Link to={href} className="hover:underline me-4 md:me-6">{name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">©  <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>.{ThisYear} All Rights Reserved.</span>
            </div>
        </footer>


    )
}

export default Fotter
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Sign_Up() {
    const [ShowPassword, setShowPassword] = useState(false);
    

    const ToggleShowPassword = () => {
        ShowPassword ? setShowPassword(false) : setShowPassword(true)
    }
    return (
        <div className='mt-20 m-auto w-[550px]'>
            <form className="max-w-full p-10 mx-auto my-2 mt-24 bg-gray-800 rounded-xl">
                <h1 className='text-center pb-3 text-4xl text-gray-200 font-bold'>Sign Up</h1>

                <div className="mb-5">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Enter email</label>
                    <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
                </div>
                <div className="mb-2">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Enter password</label>
                    <input type={ShowPassword ? "text" : "password"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Password' required />
                </div>
                <div className="mb-2">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type={ShowPassword ? "text" : "password"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Password' required />
                </div>
                <div className="flex items-center justify-between mb-3">
                    <div className='flex items-start'>
                        <div className="flex items-center h-5">
                            <input type="checkbox" id='showpassworld' onChange={ToggleShowPassword} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 " />
                        </div>
                        <label htmlFor="showpassworld" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 selection:select-none">Show Password</label>
                    </div>
                    <div>
                        <span className="ms-2 text-sm font-medium mr-2 text-gray-100">Already have Account? <Link to="/sign_in" className='underline text-blue-300'>Sign In</Link></span>
                    </div>
                </div>
                <button type="submit" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create account</button>
            </form>
        </div>
    )
}

export default Sign_Up
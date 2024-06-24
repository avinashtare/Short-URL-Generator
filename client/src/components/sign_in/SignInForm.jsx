import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInUser } from '@/redux/user';
import { toast } from 'react-toastify';

const SignInForm = () => {
    const [Email, setEmail] = useState("avinashtare545@gmail.com");
    const [Password, setPassword] = useState("avinash123");

    const [ShowPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user.signIn);

    const checkInvalidFields = () => {
        let valid = { email: false, password: false };
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) valid.email = true;
        if (Password.length >= 8) valid.password = true;
        return valid;
    }

    const signInHandler = async (e) => {
        e.preventDefault();
        let checkFields = checkInvalidFields();
        if (!checkFields.password) {
            toast.warning("Invalid Password.")
        }
        if (!userState.Loading && checkFields.email && checkFields.password) {
            let signInRequest = await dispatch(signInUser({ email: Email, password: Password }))

            // if get sign success 
            if (signInRequest.payload?.isSignIn) {
                toast.success("Sign In Successfully")
                // navigate user home page
                setTimeout(() => {
                    navigate("/");
                }, 100);
            }
            // if not sign in 
            else {
                setPassword("");
                toast.error("Invalid email & password!");
            }
        }
    }

    const ToggleShowPassword = () => {
        ShowPassword ? setShowPassword(false) : setShowPassword(true);
    }

    // handle server error 
    useEffect(() => {
        // after form submiting getting errpr response 
        if (userState.Error) {
            setPassword("");
            toast.error("Internal Server Error!");
        }
    }, [userState.Error])


    return (

        <form className="max-w-full p-10 mx-auto my-2 mt-24 bg-gray-800 rounded-xl" onSubmit={signInHandler}>
            <h1 className='text-center pb-3 text-4xl text-gray-200 font-bold'>Sign In</h1>

            <div className="mb-5">
                <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" value={Email} onChange={e => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
            </div>
            <div className="mb-2">
                <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Your password</label>
                <input type={ShowPassword ? "text" : "password"} value={Password} onChange={e => setPassword(e.target.value)} autoComplete='on' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Password' required />
            </div>
            <div className="flex items-center justify-between mb-3">
                <div className='flex items-start'>
                    <div className="flex items-center h-5">
                        <input type="checkbox" id='showpassworld' onChange={ToggleShowPassword} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 " />
                    </div>
                    <label htmlFor="showpassworld" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 selection:select-none">Show Password</label>
                </div>
                <div>
                    <Link to="/sign_up" className="ms-2 text-sm font-medium  mr-2 underline text-blue-300">Sign Up now</Link>
                </div>
            </div>
            <button type="submit" className={`mt-2 text-white ${userState.Loading ? "bg-blue-300" : "bg-blue-700"} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} disabled={userState.Loading}>{userState.Loading ? "Signing in..." : "Sign in"}</button>
        </form>
    )
}

export default SignInForm
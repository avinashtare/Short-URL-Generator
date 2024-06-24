import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signUpUser } from '@/redux/user';



function SignUpForm() {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user.signUp);
    const navigate = useNavigate();

    // states 
    const [FullName, setFullName] = useState("")
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [ShowPassword, setShowPassword] = useState(false);

    // refs 
    const FullNameInput = useRef(null);
    const EmailInput = useRef(null);
    const PasswordInput = useRef(null);
    const ConfirmPasswordInput = useRef(null);


    const checkInvalidFields = () => {
        // Full Name validation
        if (/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(FullName)) { FullNameInput.current.style.borderColor = "gray" } else { FullNameInput.current.style.borderColor = "red"; return false }

        // Email validation
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) { EmailInput.current.style.borderColor = "gray" } else { EmailInput.current.style.borderColor = "red"; return false }

        // Password validation
        if (Password.length >= 8) { PasswordInput.current.style.borderColor = "gray" } else { PasswordInput.current.style.borderColor = "red"; return false }

        // Confirm Password validation
        if (Password.length >= 8 && Password === ConfirmPassword) { ConfirmPasswordInput.current.style.borderColor = "gray" } else { ConfirmPasswordInput.current.style.borderColor = "red"; return false }

        return true;
    }

    // handle submit form 
    const signUpHandler = async (e) => {
        e.preventDefault();
        let checkFields = checkInvalidFields();
        if (!checkFields) {
            toast.warning("Invalid Fields.")
            return;
        }

        // if all fields valid 
        if (!userState.Loading) {

            let signUpRequest = await dispatch(signUpUser({ fullName: FullName, email: Email, password: Password }))

            let isSignUp = signUpRequest?.payload?.isSignUp
            let emailExist = signUpRequest?.payload?.emailExist
            if (isSignUp) {
                toast.success("Sign Up Successful");
                // navigate user home page
                setTimeout(() => {
                    navigate("/");
                }, 100);
            }
            else if (emailExist) {
                toast.warning("Email Alrady Exist");
                EmailInput.current.style.borderColor = "red";
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
            toast.error("Internal Server Error!");
        }
    }, [userState.Error])

    return (
        <>
            <form className="max-w-full p-10 mx-auto my-2 mt-24 bg-gray-800 rounded-xl" onSubmit={signUpHandler}>
                <h1 className='text-center pb-3 text-4xl text-gray-200 font-bold'>Sign Up</h1>

                <div className="mb-5">
                    {/* fullname  */}
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Full Name</label>
                    <input type="text" value={FullName} onChange={e => setFullName(e.target.value)} ref={FullNameInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johan doe" required />
                </div>
                {/* email */}
                <div className="mb-5">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" value={Email} onChange={e => setEmail(e.target.value)} ref={EmailInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
                </div>
                {/* password  */}
                <div className="mb-2">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Password</label>
                    <input type={ShowPassword ? "text" : "password"} value={Password} onChange={e => setPassword(e.target.value)} ref={PasswordInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Password' autoComplete='on' required />
                </div>
                {/* confirm password  */}
                <div className="mb-2">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type={ShowPassword ? "text" : "password"} value={ConfirmPassword} onChange={e => setConfirmPassword(e.target.value)} ref={ConfirmPasswordInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Password' autoComplete='on' required />
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
                <button type="submit" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={userState.Loading}>{userState.Loading ? "Signing up..." : "Sign up"}</button>
            </form>
        </>
    )
}

export default SignUpForm
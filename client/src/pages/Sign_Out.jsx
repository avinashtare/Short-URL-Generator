import React, { useEffect } from 'react'
import { clearCookie } from '@/utils/cookies'
import { useDispatch } from 'react-redux'
import { validUser } from "@/redux/user/"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Sign_Out = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    // ones request server to check user valid or not 
    useEffect(() => {
        return async () => {
            clearCookie("token");
            await dispatch(validUser())
            setTimeout(() => {
                navigate("/sign_in")
                toast.success("sign out")
            }, 500);
        }
    }, [])

    return (
        <></>
    )
}

export default Sign_Out
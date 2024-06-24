import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCookie } from '@/utils/cookies';
import { validUser } from '@/redux/user/';

const Sign_Out = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hasSignedOut = useRef(false); // Use ref to track if sign-out has been done

    useEffect(() => {
        const userSignOut = async () => {
            if (!hasSignedOut.current) { // Check if sign-out has already been performed
                hasSignedOut.current = true; // Mark sign-out as performed
                clearCookie('token');
                await dispatch(validUser());
                setTimeout(() => {
                    navigate('/sign_in');
                    toast.success('Sign out successful');
                }, 500);
            }
        };

        userSignOut();
    }, []);

    return null;
};

export default Sign_Out;

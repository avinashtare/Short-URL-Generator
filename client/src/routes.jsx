import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import Fotter from '@/components/Fotter';
import Toastify from '@/components/Toastify';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Sign_In from '@/pages/Sign_In';
import Sign_Up from '@/pages/Sign_Up';
import Sign_Out from '@/pages/Sign_Out';


function routes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign_in" element={<Sign_In />} />
                <Route path="/sign_up" element={<Sign_Up />} />
                <Route path="/sign_out" element={<Sign_Out />} />
            </Routes>
            <Toastify />
            <Fotter />
        </>
    )
}

export default routes
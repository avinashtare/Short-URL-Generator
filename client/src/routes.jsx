import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Sign_In from '@/pages/Sign_In';
import Sign_Up from '@/pages/Sign_Up';
import Fotter from '@/components/Fotter';


function routes() {
    return (
        <>
            {/* Navbar */}
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign_In" element={<Sign_In />} />
                <Route path="/Sign_up" element={<Sign_Up />} />
            </Routes>
            {/* Fotter */}
            <Fotter />
        </>
    )
}

export default routes
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import { Navlinks } from "@/constants.jsx";
import Home from '@/pages/Home';
import About from '@/pages/About';


function routes() {
    return (
        <>
            {/* Navbar */}
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    )
}

export default routes
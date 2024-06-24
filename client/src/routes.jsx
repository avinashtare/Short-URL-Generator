import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Sign_In from '@/pages/Sign_In';
import Sign_Up from '@/pages/Sign_Up';
import Sign_Out from '@/pages/Sign_Out';
import Not_Found from './components/404/Not_Found';


function routes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign_in" element={<Sign_In />} />
                <Route path="/sign_up" element={<Sign_Up />} />
                <Route path="/sign_out" element={<Sign_Out />} />
                <Route path="*" element={<Not_Found />}/>
            </Routes>

        </>
    )
}

export default routes
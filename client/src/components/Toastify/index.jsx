import React, { useEffect } from 'react'
import { Bounce, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const Toastify = () => {
    return (
        <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />
    )
}

export default Toastify
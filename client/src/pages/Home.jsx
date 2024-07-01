import React, { useEffect, useRef } from 'react'
import Link_Form from '@/components/Link_Box/Link_Form'
import { validUser } from "@/redux/user/"
import { useDispatch } from 'react-redux'

function Home() {
  const dispatch = useDispatch();

  // check page render or not
  const isPageLoad = useRef(false);
  
  useEffect(() => {
    if (!isPageLoad.current) {
      isPageLoad.current = true;

      // ones request server to check user valid or not 
      dispatch(validUser());
    }
  }, [isPageLoad]);

  return (
    <>
      <Link_Form></Link_Form>
    </>
  )
}

export default Home
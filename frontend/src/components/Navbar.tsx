import React, { useEffect, useState } from 'react'
import navbar from '../img/logo/default-monochrome.svg'
import Button from './Button'
import { useNavigate } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa';

export default function Navbar() {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1024);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const navigate = useNavigate();
    return (

        <nav className='w-full bg-black/[.1] flex backdrop-blur'>
            <div className='lg:px-[20%] w-screen flex items-center justify-between px-8 lg:justify-between py-4 gap-4'>
                <img src={navbar} alt='logo' className='max-w-[50%] md:max-w-[25%] lg:max-w-[25%]' />
                {isLargeScreen
                    ? <> <ul className='flex justify-content font-semibold gap-5 text-body-1' >
                        <li className='inline text-body-1'><p className='text-body'>HOME</p></li>
                        <li className='inline'>EXPLORE</li>
                        <li className='inline'>ABOUT</li>
                    </ul>
                        <Button text='JOIN' variant='outline' onClick={() => navigate("/login")} />
                    </>
                    : <span className='text-md md:text-2xl' onClick={() => { console.log("Open menu"); return 0; }}><FaAlignJustify /></span>}

            </div>
        </nav>

    )
}

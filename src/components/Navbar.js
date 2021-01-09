import React, { useState, useEffect } from 'react';
import "./Navbar.css";

function Navbar() {

    // create a state for the navbar scroll function 
    const [show, handleShow] = useState(false);

    // add a scroll listener to display the navbar background color
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>            {/* String Concatenation - if show state is true past 100px, we append the navblack class styling */}
            <img   
                className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
            />

            <img 
                className="nav__avatar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
                alt="Netflix avatar"
            />
        </div>
    )
}

export default Navbar

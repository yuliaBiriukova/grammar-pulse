import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Navbar.css';
import {testHref} from "../../common/constants";

export const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='d-flex-start-center'>
                <div className='cursor-pointer d-flex-start-center'>
                    <img className='logo' src={logo} alt='logo' />
                    <Link to="/" className='logo-title'>GrammarPulse</Link>
                </div>
                <div className='nav-link-container'>
                    <Link to="/" className='nav-link'>Grammar catalog</Link>
                </div>
            </div>
            <div className='d-flex-end-center'>
                <a href={testHref} className='button-secondary' >
                    Test&nbsp;your&nbsp;English
                </a>
                <div className='nav-link ml-4 cursor-pointer'>Log out</div>
            </div>
        </nav>
    )
}
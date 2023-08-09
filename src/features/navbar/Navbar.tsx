import React from "react";
import {Link} from "react-router-dom";
import {testHref} from "../../common/constants";
import {useAppSelector} from "../../app/hooks";
import {selectIsAuthorized} from "../auth/authSlice";
import logo from '../../images/logo.svg';
import './Navbar.css';

export const Navbar = () => {
    const isAuthorized = useAppSelector(selectIsAuthorized);

    const onLogoutClick = async () => {
        if(!isAuthorized) {
            console.log(Error, 'User is not authorized!');
            return;
        }
        localStorage.removeItem('userToken');
        document.location.reload();
    }

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
                {!isAuthorized && (
                    <div>
                        <Link to="/signup" className='nav-link ml-4'>Sign up</Link>
                        <Link to="/login" className='nav-link ml-3'>Log in</Link>
                    </div>
                )}
                {isAuthorized && (
                    <div className='nav-link ml-4 cursor-pointer' onClick={onLogoutClick}>Log out</div>
                )}
            </div>
        </nav>
    )
}
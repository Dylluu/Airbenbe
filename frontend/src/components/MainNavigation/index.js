import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './MainNavigation.css';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage/LoginFormPage';
import logo from '../../assets/airLogo.png';
import SignupFormPage from '../SignupFormPage/SignupFormPage';
import useModalContext from '../../context/ShowModalContext';

function MainNavigation({ isLoaded }) {
    const {showModal, setShowModal, showSUModal, setShowSUModal} = useModalContext();
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <div onClick={openMenu} className='menu-user'>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '2px'}}>
                    <i style={{paddingRight: '5px'}} className="fa-solid fa-bars"></i>
                    <div className='user-icon-div'>
                    <i style={{color: 'white'}} className="fa-solid fa-user"></i>
                    </div>
                    </div>
                {showMenu && (
                    <div className='profile-dropdown'
                    style={{marginRight: '5rem', width: '150px'}}
                    >
                        <div id='login-div' onClick={() => setShowModal(true)} className='profile-dropdown-text-divs'>
                            Login
                        </div>
                        <div id='sign-up-div' onClick={() => setShowSUModal(true)} className='profile-dropdown-text-divs'>
                            Sign Up
                        </div>
                    </div>
                )
                }
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginFormPage />
                    </Modal>
                )}
                {showSUModal && (
                    <Modal onClose={() => setShowSUModal(false)}>
                        <SignupFormPage />
                    </Modal>
                )}
            </>
        );
    }

    return (
        <div className='navMain-container'>
            <div className='main-form-div-inner'>
            <div className='home-container'>
                <NavLink exact to="/"
                style={{display: 'flex'}}
                >
                    <img alt='logo' className='logo' src={logo} />
                </NavLink>
            </div>
            {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default MainNavigation;

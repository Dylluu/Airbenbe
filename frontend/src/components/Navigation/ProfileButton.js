import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div className="host-and-menu-user">
        <NavLink className='host-spot-div' to='/host-spot'>
          <div>
            <span>Host a new spot</span>
          </div>
        </NavLink>
        <div onClick={openMenu} className='menu-user'>
          <i style={{ paddingRight: '5px' }} className="fa-solid fa-bars"></i>
          <div className='user-icon-div' style={{ marginRight: '2px' }}>
            <i style={{ color: 'white' }} className="fa-solid fa-user"></i>
          </div>
        </div>
        {showMenu && (
          <div className="profile-dropdown" id='profile-dropdown-LO' style={{ height: '185px', justifyContent: 'center' }}>
            <div className="user-info">
              <div className="user-info-text" style={{ fontWeight: '200', height: '35px', overflow: 'hidden', marginTop: '1px', marginBottom: '-5px' }}>{user.firstName} {user.lastName}</div>
              <div className="user-info-text" style={{ fontWeight: '200', height: '35px', overflow: 'hidden' }}>{user.username}</div>
            </div>
            <div className="user-info" id="listings-and-account-div">
              <NavLink to='/manage' className="profile-dropdown-text-divs" id="listings-and-account">Manage Listings</NavLink>
              <NavLink to='/trips' className="profile-dropdown-text-divs" id="listings-and-account">Trips</NavLink>
            </div>
            <div id='logout-div'
              style={{ borderRadius: '5px' }}
              className='profile-dropdown-text-divs' onClick={logout}>Log Out</div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;

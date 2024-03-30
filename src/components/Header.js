import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  const user = useSelector(store => store.user);

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black flex justify-between '>
      <img
        className='w-44'
        alt='logo'
        src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
      />
      {user && <div className='flex content-center flex-wrap'>
        <img
          className='w-12 h-12 mx-2'
          // className='w-12 h-12 mt-[50%] -translate-y-[25%]'
          alt='user-icon'
          src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg'
        />
        <button
          className='font-bold text-white text-lg shadow-sm'
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>}
    </div>
  )
}

export default Header
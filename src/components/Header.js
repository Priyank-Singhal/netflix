import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, displayName, email} = user;
        dispatch(addUser({uid: uid, name: displayName, email: email}));
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
        // ...
      }
    });
  }, []);

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
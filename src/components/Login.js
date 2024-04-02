import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isAlreadyUser, setIsAlreadyUser] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsAlreadyUser(prev => !prev)
  }

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const validationCheck = checkValidData(email.current.value, password.current.value);
    setValidationError(validationCheck);
    if (validationCheck) return;


    if (isAlreadyUser) {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          // const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          setValidationError(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          // const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
          })
            .then(() => {
              // Profile updated!
              const { uid, displayName, email } = auth.currentUser;
              dispatch(addUser({ uid: uid, name: displayName, email: email }));
            })
            .catch((error) => {
              // An error occurred
              setValidationError(error.message);
              // ...
            });
          // ...
        })
      .catch((error) => {
        const errorMessage = error.message;
        setValidationError(errorMessage);
        // ..
      });
    }
  }

  return (
    <div>
      <Header />
      <form
        className='bg-black absolute w-3/12 mx-auto left-0 right-0 p-12 my-36 text-white bg-opacity-80'
        onSubmit={e => e.preventDefault()}
      >
        <h1 className='font-bold text-3xl py-4'>{isAlreadyUser ? "Sign In" : "Sign Up"}</h1>
        {!isAlreadyUser && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 bg-gray-700 w-full' />}
        <input ref={email} type='text' placeholder='Email' className='p-4 my-4 bg-gray-700 w-full' />
        <input ref={password} type='password' placeholder='Password' className='p-4 my-4 bg-gray-700 w-full' />
        <p className='text-red-500 font-bold text-lg py-2'>{validationError}</p>
        <button
          className='p-4 my-6 bg-red-700 rounded-md w-full'
          onClick={handleButtonClick}
        >
          {isAlreadyUser ? "Sign In" : "Sign Up"}
        </button>
        <p className='py-4 cursor-pointer px-2' onClick={toggleSignInForm}>
          {isAlreadyUser ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"}
        </p>
      </form>
      <div className=''>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt='background-img'
        />
      </div>
    </div>
  )
}

export default Login
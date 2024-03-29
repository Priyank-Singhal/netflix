import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isAlreadyUser, setIsAlreadyUser] = useState(false);
  const toggleSignInForm = () => {
    setIsAlreadyUser(prev => !prev)
  }

  return (
    <div>
      <Header />
      <form
        className='bg-black absolute w-3/12 mx-auto left-0 right-0 p-12 my-36 text-white bg-opacity-80'
      >
        <h1 className='font-bold text-3xl py-4'>{isAlreadyUser ? "Sign In" : "Sign Up"}</h1>
        {!isAlreadyUser && <input type='text' placeholder='Full Name' className='p-4 my-4 bg-gray-700 w-full' />}
        <input type='text' placeholder='Email' className='p-4 my-4 bg-gray-700 w-full' />
        <input type='password' placeholder='Password' className='p-4 my-4 bg-gray-700 w-full' />
        <button className='p-4 my-6 bg-red-700 rounded-md w-full'>{isAlreadyUser ? "Sign In" : "Sign Up"}</button>
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
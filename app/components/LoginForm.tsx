'use client';

import Link from 'next/link';
import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='bg-white rounded-md p-6 w-[350px]'>
      <h2 className='font-bold text-2xl'>Login</h2>
      <div className='relative mt-4 border rounded-lg'>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type='text'
          id='username'
          className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          placeholder=' '
        />
        <label
          htmlFor='username'
          className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
        >
          Username
        </label>
      </div>
      <div className='relative mt-4 border rounded-lg'>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          id='password'
          className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          placeholder=' '
        />
        <label
          htmlFor='password'
          className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
        >
          Password
        </label>
      </div>
      <button className='mt-4 w-full rounded-md bg-purple-600 hover:bg-purple-700 py-2 font-bold text-white'>
        Login
      </button>
      <p className='mt-4 text-gray-400 text-center'>
        Doesn&apos;t have an account?{' '}
        <Link href='/enter' className='font-bold text-purple-600'>
          Sign up!
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;

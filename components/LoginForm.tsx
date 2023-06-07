'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import Spinner from './Spinner';
import { useRouter } from 'next/navigation';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loginHandler() {
    setLoading(true);
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (!result?.error) {
      setLoading(false);
      return;
    }
    setError(result?.error!);
    setLoading(false);
  }

  return (
    <div className='bg-white rounded-md p-6 w-[350px]'>
      <h2 className='font-bold text-2xl'>Login</h2>
      <div className='relative mt-4 border rounded-lg'>
        <input
          onChange={(e) => (setUsername(e.target.value), setError(''))}
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
          onChange={(e) => (setPassword(e.target.value), setError(''))}
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
      <button
        onClick={loginHandler}
        className='mt-4 w-full rounded-md bg-purple-600 hover:bg-purple-700 py-2 font-bold text-white'
      >
        {loading ? <Spinner size='default' /> : 'Login'}
      </button>
      <p className='text-pink-600 text-center mt-4'>{error}</p>
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

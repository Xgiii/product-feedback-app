'use client';

import { addUser } from '../app/actions';
import Link from 'next/link';

import Spinner from './Spinner';
import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const router = useRouter();

  return (
    <div className='bg-white rounded-md p-6 w-[350px]'>
      <h2 className='font-bold text-2xl'>Sign Up</h2>
      <form
        action={async (formData) => {
          setTimeout(() => setLoading(true), 100);
          setLoading(false);
          try {
            await addUser(formData);
            setLoading(false);
          } catch (error: Error | any) {
            if (error.message === 'NEXT_REDIRECT') {
              router.replace('/');
              return;
            }
            setError(error);
            setLoading(false);
          }
        }}
      >
        <div className='relative mt-4 border rounded-lg'>
          <input
            type='text'
            id='username'
            name='username'
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
            type='password'
            id='password'
            name='password'
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
          type='submit'
          className='mt-4 w-full rounded-md bg-purple-600 hover:bg-purple-700 py-2 font-bold text-white'
        >
          {loading ? <Spinner size='default' /> : 'Sign Up'}
        </button>
        <p className='text-pink-600 text-center mt-4'>{error?.message}</p>
        <p className='mt-4 text-gray-400 text-center'>
          Already have an account?{' '}
          <Link href='/' className='font-bold text-purple-600'>
            Login!
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;

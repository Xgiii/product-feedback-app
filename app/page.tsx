'use client';

import LoginForm from '@/components/LoginForm';
import Spinner from '@/components/Spinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { status } = useSession();
  if (status === 'authenticated') {
    redirect('/home');
  }
  return (
    <div className='relative h-screen w-screen bg-gradient-to-br from-purple-500 to-blue-600'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {status === 'loading' && <Spinner size='big' />}
        {status === 'unauthenticated' && <LoginForm />}
      </div>
    </div>
  );
}

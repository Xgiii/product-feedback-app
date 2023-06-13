'use client';

import { useSession } from 'next-auth/react';
import Spinner from './Spinner';
import { redirect } from 'next/navigation';

function AuthCheck({ children }: { children: React.ReactNode }) {
  const { status, data: session } = useSession();

  console.log(session?.user);
  

  if (status === 'unauthenticated') {
    redirect('/');
  }

  return (
    <>
      {status === 'loading' && (
        <div className='relative h-screen w-screen bg-gradient-to-br from-purple-500 to-blue-600'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Spinner size='big' />
          </div>
        </div>
      )}
      {status === 'authenticated' && <>{children}</>}
    </>
  );
}

export default AuthCheck;

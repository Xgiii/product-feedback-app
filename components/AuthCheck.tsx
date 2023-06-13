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
      {status === 'authenticated' && <>{children}</>}
    </>
  );
}

export default AuthCheck;

'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function AuthCheck({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/');
  }

  return <>{status === 'authenticated' && <>{children}</>}</>;
}

export default AuthCheck;

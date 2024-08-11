import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CircleSpinner } from "react-spinners-kit";

export const useProtectedRoute = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== 'loading') {
      router.push('/');
    }
  }, [session, status, router]);

  const renderLoader = () => {
    if (status === 'loading') {
      return (
        <div className='h-cover flex items-center justify-center'>
          <CircleSpinner size={40} color="#d90f0f" />
        </div>
      );
    }
    return null;
  };

  return { session, status, renderLoader };
};

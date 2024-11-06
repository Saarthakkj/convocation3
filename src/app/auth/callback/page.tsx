'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Parse the hash fragment
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
      // Store the token securely
      localStorage.setItem('access_token', accessToken);
      // Redirect to the desired page
      router.push('/dashboard');
    } else {
      // Handle error
      router.push('/signin?error=auth_failed');
    }
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Completing sign in...</p>
      </div>
    </div>
  );
} 
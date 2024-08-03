"use client"
import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.location.href = '/dashboard';
  }, []);

  return (
    <div>
      Redirecting Securely ...
    </div>
  );
}

import React, { useEffect } from 'react';

function NotAuthorized() {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className='emptypage'>
      <h1 className='textcenter'>Not Authorized, Please Login</h1>
      <h2 className='textcenter'>Redirecting to Login Page</h2>
    </div>
  )
}

export default NotAuthorized

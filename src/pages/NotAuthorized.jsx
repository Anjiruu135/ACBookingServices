import React, { useEffect } from 'react';

function NotAuthorized() {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Redirect to the login page after 3 seconds (adjust the time as needed)
      window.location.href = '/login';
    }, 3000);

    // Clear the timeout if the component is unmounted before the timeout finishes
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <h1>Not Authorized, Please Login</h1>
      <h2>Redirecting to Login Page</h2>
    </div>
  )
}

export default NotAuthorized

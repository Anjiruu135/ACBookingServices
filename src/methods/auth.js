import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const useAuthentication = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.username);
          console.log(res.data.username);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          console.log(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:3001/logout')
      .then(res => {
        window.location.href = '/login';
      })
      .catch(err => console.log(err));
  };

  return { auth, message, name, handleLogout };
};

export default useAuthentication;
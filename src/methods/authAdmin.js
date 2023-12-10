import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const useAuthenticationAdmin = () => {
  const [authAdmin, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.username);
          setUser_id(res.data.user_id);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          console.log(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/admin/logout")
      .then((res) => {
        window.location.href = "/login";
      })
      .catch((err) => console.log(err));
  };

  return { authAdmin, message, name, user_id, handleLogout };
};

export default useAuthenticationAdmin;

import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  axios.defaults.withCredentials = true;

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/login`,
        loginData,
        {
          withCredentials: true, // Include this line to send and receive cookies
        }
      );
  
      if (response.status === 200) {
        const { usertype, message } = response.data;
  
        if (message === "Login successful for user") {
          alert('Login successful for user');
          window.location.href = '/home';
        } else if (message === "Login successful for admin") {
          alert('Login successful for admin');
          window.location.href = '/admindashboard';
        } else {
          alert('Invalid usertype');
        }
      } else {
        alert('Invalid email or password');
      }
  
    } catch (error) {
      alert(error.response.data);
      console.error('Error during login:', error.message);
    }
  };
  
  return (
    <>
      <div className="hero_area">
        <section className="position-relative py-4 py-xl-5">
          <div className="container">
            <div
              className="row d-flex justify-content-center responsivestart"
              style={{background: 'url("src/assets/images/slider-img.png") top right no-repeat, url("src/assets/images/professional-img.png") top left / contain no-repeat'}}
            >
              <div className="col-md-6 col-xl-4 col-xxl-4">
                <div className="card mb-5">
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{paddingTop: '110px',paddingBottom: '160px'}}
                  >
                    <span style={{marginTop: '-35px' , fontWeight: "bold"}}> AIRCON LOGIN</span>
                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="bi bi-person"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                      </svg>
                    </div>
                    <form className="text-center" method="post" onSubmit={handleLoginSubmit}>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                        />
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-primary d-block w-100"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <p className="text-muted"><a href="/register">Don't have an account yet?</a></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', formData);
      alert(response.data);
      console.log(response.data);
      alert('Register successful');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <>
      <div className="hero_area">
        <section className="position-relative py-4 py-xl-5">
          <div className="container">
            <div
              className="row d-flex justify-content-center"
              style={{background: 'url("src/assets/images/slider-img.png") top right no-repeat, url("src/assets/images/professional-img.png") top left / contain no-repeat'}}
            >
              <div className="col-md-6 col-xl-4 col-xxl-4">
                <div className="card mb-5">
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{paddingTop: '110px',paddingBottom: '160px'}}
                  >
                    <span style={{marginTop: '-35px',paddingBottom: '20px'}}>
                      {" "}
                      AIRCON REGISTER
                    </span>
                    <form className="text-center" method="post" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          type="text"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          type="password"
                          name="onfirmpassword"
                          placeholder="Confirm Password"
                        />
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-primary d-block w-100"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                      <p className="text-muted"><a href="/login">Already have an account?</a></p>
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

export default Register;

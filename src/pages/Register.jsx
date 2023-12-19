import React, { useState } from "react";
import axios from "axios";
import { registerSchema } from "../validations/validations.js";
import * as yup from "yup";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInputFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/register`,
        formData
      );
      alert(response.data);
      console.log(response.data);
      window.location.href = "/login";
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error registering user:", error.message);
      }
    }
  };

  return (
    <>
      <div className="hero_area">
        <section className="position-relative py-4 py-xl-5">
          <div className="container">
            <div
              className="row d-flex justify-content-center responsivestart"
              style={{
                background:
                  'url("src/assets/images/slider-img.png") top right / contain no-repeat, url("src/assets/images/professional-img.png") top left no-repeat',
              }}
            >
              <div className="col-md-6 col-xl-4 col-xxl-4">
                <div className="card mb-5">
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ paddingTop: "110px", paddingBottom: "160px" }}
                  >
                    <span
                      style={{
                        marginTop: "-35px",
                        paddingBottom: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      AIRCON REGISTER
                    </span>
                    <form
                      className="text-center"
                      method="post"
                      onSubmit={handleSubmit}
                    >
                      <div
                        className="mb-3"
                        style={{
                          width: "225px",
                          height: "60px",
                          marginTop: "35px",
                        }}
                      >
                        <input
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleInputFocus("email")}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                      <div
                        className="mb-3"
                        style={{ width: "225px", height: "60px" }}
                      >
                        <input
                          className={`form-control ${
                            errors.username ? "is-invalid" : ""
                          }`}
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleChange}
                          onFocus={() => handleInputFocus("username")}
                        />
                        {errors.username && (
                          <div className="invalid-feedback">
                            {errors.username}
                          </div>
                        )}
                      </div>
                      <div
                        className="mb-3"
                        style={{ width: "225px", height: "60px" }}
                      >
                        <input
                          className={`form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          type="text"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => handleInputFocus("phone")}
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>
                      <div
                        className="mb-3"
                        style={{ width: "225px", height: "60px" }}
                      >
                        <input
                          className={`form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          onFocus={() => handleInputFocus("password")}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div
                        className="mb-3"
                        style={{ width: "225px", height: "60px" }}
                      >
                        <input
                          className={`form-control ${
                            errors.confirmpassword ? "is-invalid" : ""
                          }`}
                          type="password"
                          name="confirmpassword"
                          placeholder="Confirm Password"
                          value={formData.confirmpassword}
                          onChange={handleChange}
                          onFocus={() => handleInputFocus("confirmpassword")}
                        />
                        {errors.confirmpassword && (
                          <div className="invalid-feedback">
                            {errors.confirmpassword}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-primary d-block w-100"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                      <p className="text-muted">
                        <a href="/login">Already have an account?</a>
                      </p>
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

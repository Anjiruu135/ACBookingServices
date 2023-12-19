import React, { useEffect, useState } from "react";
import useAuthentication from "../methods/auth";
import NotAuthorized from "./NotAuthorized";
import axios from "axios";
import { contactSchema } from "../validations/validations.js";
import * as yup from "yup";

function Contact() {
  const { auth, message, name, user_id, handleLogout } = useAuthentication();
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactSchema.validate(formData, { abortEarly: false });
      const formDataWithAuth = {
        ...formData,
        user_id: user_id,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/inquire`,
        formDataWithAuth
      );
      console.log(response);
      alert("Submission successful");
      window.location.href = "/home";
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error submission:", error.message);
      }
    }
  };
  return (
    <>
      {auth ? (
        <div>
          <section
            className="contact_section layout_padding"
            style={{ paddingTop: "0" }}
          >
            <div
              className="banner-background-color border rounded border-0 p-4 p-md-5"
              style={{
                height: "200px",
                marginBottom: "100px",
              }}
            >
              <h2
                className="fw-bold mb-3"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "45px",
                  marginTop: "15px",
                  height: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  background:
                    'url("src/assets/images/professional-img.png") 250px 0px / contain no-repeat',
                  color: "rgba(3, 85, 204, 1)",
                }}
              >
                Give Us A Call
              </h2>
            </div>
            <div className="container" style={{ paddingTop: "50px" }}>
              <div className="heading_container">
                <h2> Contact Us </h2>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <form method="post" onSubmit={handleSubmit}>
                    <div>
                      <input
                        className={`form-control ${
                          errors.fullname ? "is-invalid" : ""
                        }`}
                        type="text"
                        placeholder="Full Name"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        onFocus={() => handleInputFocus("fullname")}
                      />
                    </div>
                    <div>
                      <input
                        className={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        type="text"
                        placeholder="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => handleInputFocus("phone")}
                      />
                    </div>
                    <div>
                      <input
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleInputFocus("email")}
                      />
                    </div>
                    <div>
                      <input
                        className={`form-control ${
                          errors.location ? "is-invalid" : ""
                        }`}
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        onFocus={() => handleInputFocus("location")}
                      />
                    </div>
                    <div>
                      <textarea
                        className={`form-control ${
                          errors.message ? "is-invalid" : ""
                        }`}
                        type="text"
                        style={{ height: "150px" }}
                        placeholder="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleInputFocus("message")}
                      />
                    </div>
                    <div className="d-flex">
                      <button type="submit"> SEND </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <div
                    className="map_container"
                    style={{ transform: "translate(70px)" }}
                  >
                    <div
                      className="map"
                      style={{ transform: "translate(-20px)" }}
                    >
                      <img
                        className="picvisible"
                        style={{
                          width: "80%",
                          height: "150%",
                          marginTop: "-75px",
                        }}
                        src="src/assets/images/team-2.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <NotAuthorized />
        </div>
      )}
    </>
  );
}

export default Contact;

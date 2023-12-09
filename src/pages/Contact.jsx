import React, { useEffect, useState } from "react";
import useAuthentication from "../methods/auth";
import NotAuthorized from "./NotAuthorized";
import axios from "axios";

function Contact() {
  const { auth, message, name, user_id, handleLogout } = useAuthentication();
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithAuth = {
        ...formData,
        user_id: user_id,
      };
      const response = await axios.post(
        "http://localhost:3001/inquire",
        formDataWithAuth
      );
      console.log(response);
      alert("Submission successful");
      window.location.href = "/home";
    } catch (error) {
      console.error("Error submission:", error.message);
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
              className="text-white bg-dark border rounded border-0 p-4 p-md-5"
              style={{
                background: "var(--bs-emphasis-color)",
                height: "250px",
                opacity: "1",
                filter: "brightness(100%)",
                marginBottom: "100px",
              }}
            >
              <h2
                className="fw-bold text-white mb-3"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "45px",
                  marginTop: "45px",
                  color: "rgb(0,0,0)",
                }}
              >
                GIVE US A CALL
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
                        className="form-control"
                        type="text"
                        placeholder="Full Name"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        className="form-control"
                        type="text"
                        style={{ height: "150px" }}
                        placeholder="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
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

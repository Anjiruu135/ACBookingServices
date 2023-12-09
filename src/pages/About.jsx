import React from "react";
import useAuthentication from "../methods/auth";
import NotAuthorized from "./NotAuthorized";

function About() {
  const { auth, message, name, handleLogout } = useAuthentication();
  return (
    <>
      {auth ? (
        <div>
          <section
            className="about_section layout_padding"
            style={{ paddingTop: "0" }}
          >
            <div
              className="text-white bg-dark border rounded border-0 p-4 p-md-5"
              style={{
                background: "var(--bs-emphasis-color)",
                height: "250px",
                opacity: "1",
                filter: "brightness(100%)",
                borderStyle: "solid",
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
                GET TO KNOW MORE ABOUT US
              </h2>
            </div>
            <div className="container" style={{ margintop: "50px" }}>
              <div className="row">
                <div className="col-md-6 col-lg-5">
                  <div className="detail-box">
                    <h2> About us </h2>
                    <p>
                      {" "}
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomisedThere are many
                      variations of passages of Lorem Ipsum available, but the
                      majority have suffered alteration in some form, by
                      injected humour, or randomised{" "}
                    </p>
                    <a href=""> Read More </a>
                  </div>
                </div>
                <div className="col-md-6 col-lg-7">
                  <div className="img-box">
                    <img src="src/assets/images/service-3.jpg" alt="" />
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

export default About;

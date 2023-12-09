import React from "react";
import useAuthentication from "../methods/auth";
import NotAuthorized from "./NotAuthorized";

function Services() {
  const { auth, message, name, handleLogout } = useAuthentication();
  return (
    <>
      {auth ? (
        <div>
          <section
            className="service_section layout_padding"
            style={{ paddingTop: 0 }}
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
                WHAT WE DO
              </h2>
            </div>
            <div className="container" style={{ margintop: "75px" }}>
              <div className="heading_container heading_center">
                <h2> Our Services </h2>
              </div>
              <div className="row">
                <div className="col-sm-6 col-md-4 mx-auto">
                  <div className="box">
                    <div className="img-box">
                      <img src="src/assets/images/s1.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5> Maintenance </h5>
                      <p>
                        {" "}
                        when looking at its layout. The point of using Lorem
                        Ipsum is that it has a more-or-less normal{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 mx-auto">
                  <div className="box">
                    <div className="img-box">
                      <img src="src/assets/images/s2.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5> Electrical </h5>
                      <p>
                        {" "}
                        when looking at its layout. The point of using Lorem
                        Ipsum is that it has a more-or-less normal{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 mx-auto">
                  <div className="box">
                    <div className="img-box">
                      <img src="src/assets/images/s3.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5> Plumbing </h5>
                      <p>
                        {" "}
                        when looking at its layout. The point of using Lorem
                        Ipsum is that it has a more-or-less normal{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-box">
                <a href=""> View More </a>
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

export default Services;

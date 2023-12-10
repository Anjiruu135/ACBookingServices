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
                  color: "rgba(3, 85, 204, 1)",
                  height: "100%",
                  marginLeft: "200px",
                  marginRight: "200px",
                  background: 'url("src/assets/images/professional-img.png") top left / contain no-repeat'
                }}
              >
                Get to Know More About Us
              </h2>
            </div>
            <div className="container" style={{ margintop: "50px" }}>
              <div className="row">
                <div className="col-md-6 col-lg-5">
                  <div className="detail-box">
                    <h2> About us </h2>
                    <p className="black-text">
                      {" "}
                      Welcome to AIRCON, your go-to destination for
                      top-tier air conditioning repair and maintenance services.
                      Our certified technicians bring expertise to ensure your
                      cooling systems run seamlessly, providing prompt,
                      reliable, and cost-effective solutions. From routine
                      maintenance to emergency repairs, we offer a comprehensive
                      suite of services designed for your comfort. With a
                      customer-centric approach, transparent communication, and
                      a passion for quality, AIRCON is your trusted
                      partner in maintaining optimal indoor comfort. Choose us
                      for reliability, affordability, and satisfaction—your
                      comfort is our priority.{" "}
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

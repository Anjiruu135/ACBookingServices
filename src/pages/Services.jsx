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
                  marginLeft: "350px",
                  marginRight: "350px",
                  background:
                    'url("src/assets/images/professional-img.png") top left / contain no-repeat',
                  color: "rgba(3, 85, 204, 1)",
                }}
              >
                What We Do
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
                      <img src="src/assets/images/icon-01-primary.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Diagnostic Services</h5>
                      <p>
                        {" "}
                        Identify and troubleshoot issues with air conditioning
                        units to determine the root cause of malfunctions.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 mx-auto">
                  <div className="box">
                    <div className="img-box">
                      <img src="src/assets/images/icon-02-primary.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Regular Maintenance Checks</h5>
                      <p>
                        {" "}
                        Conduct routine inspections to ensure the proper
                        functioning of the air conditioning system.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 mx-auto">
                  <div className="box">
                    <div className="img-box">
                      <img src="src/assets/images/icon-03-primary.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Refrigerant Recharge</h5>
                      <p>
                        {" "}
                        Recharge or top up refrigerant levels to ensure the
                        cooling system operates at peak performance.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 mx-auto">
                  <div className="box">
                    <div className="img-box">
                      <img src="src/assets/images/icon-04-primary.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Cleaning and Filter Replacement</h5>
                      <p>
                        {" "}
                        Remove dust, debris, and contaminants from the unit, and
                        replace or clean filters to ensure optimal performance
                        and air quality.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 mx-auto">
                  <div className="box">
                    <div className="img-box">
                      <img src="src/assets/images/icon-05-primary.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Fan Motor Maintenance</h5>
                      <p>
                        {" "}
                        Lubricate and inspect fan motors to ensure proper
                        functioning, extending the lifespan of components.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 mx-auto">
                  <div className="box">
                    <div className="img-box">
                      <img src="src/assets/images/icon-06-primary.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Comprehensive System Checkup</h5>
                      <p>
                        {" "}
                        Conduct a thorough examination of the entire air
                        conditioning system, insulation, connections, and
                        overall functionality.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="btn-box">
                  <a href="/contact">And More...</a>
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

export default Services;

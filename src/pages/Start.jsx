import React from "react";

function Start() {
  return (
    <>
      <div className="hero_area">
        <section className="slider_section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="detail-box">
                  <h1 style={{ marginTop: "-114px" }}>
                    AIRCON
                    <br />
                    Repair and <br /> Maintenance <br /> Services{" "}
                  </h1>
                  <p>
                    {" "}
                    AIRCON repair and maintenance services
                    are vital for preserving the functionality and efficiency of
                    air conditioning systems in residential and commercial
                    spaces. Repair services address specific issues, while
                    maintenance involves regular upkeep measures such as
                    cleaning and inspections to prevent breakdowns and enhance
                    overall system performance, contributing to energy
                    efficiency and cost savings.{" "}
                  </p>
                  <a href="/login">LOGIN</a>
                  <a href="/register" style={{ marginLeft: "20px" }}>
                    REGISTER
                  </a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="img-box">
                  <img src="images/slider-img.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Start;

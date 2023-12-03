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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                    harum voluptatem adipisci. Quos molestiae saepe dicta nobis
                    pariatur, tempora iusto, ad possimus soluta hic praesentium
                    mollitia consequatur beatae, aspernatur culpa.{" "}
                  </p>
                  <a href="/login">LOGIN</a>
                  <a href="/register" style={{ marginLeft: "20px" }}>
                    RESGISTER
                  </a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="img-box">
                  <img src="src/assets/images/slider-img.png" alt="" />
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

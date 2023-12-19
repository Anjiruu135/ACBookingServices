import React, { useState } from "react";
import useAuthenticationAdmin from "../methods/authAdmin";
import NotAuthorized from "../pages/NotAuthorized";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

function AdminAddEmployee() {
  const { authAdmin, message, name, handleLogout } = useAuthenticationAdmin();
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/addemployee`,
        formData
      );
      alert(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error submission:", error.message);
    }
  };
  return (
    <>
      {authAdmin ? (
        <body id="page-top">
          <div id="wrapper">
            <nav
              className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark"
              style={{ height: "850px", marginBottom: "-50px" }}
            >
              <div className="container-fluid p-0">
                <a
                  className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
                  href="#"
                >
                  <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                  </div>
                  <div className="sidebar-brand-text mx-3">
                    <span>AIRCON</span>
                  </div>
                </a>
                <hr className="sidebar-divider my-0" />
                <ul className="navbar-nav text-light" id="accordionSidebar">
                  <li className="nav-item">
                    <a className="nav-link" href="/admindashboard">
                      <i className="fas fa-tachometer-alt"></i>
                      <span>Dashboard</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/adminaddemployee">
                      <i className="fas fa-user"></i>
                      <span>Add Employee</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/adminusers">
                      <i className="fas fa-user"></i>
                      <span>Users</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/adminemployees">
                      <i className="fas fa-user"></i>
                      <span>Employees</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/adminreservations">
                      <i className="fas fa-table"></i>
                      <span>Pending Reservations</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/adminjoborders">
                      <i className="fas fa-table"></i>
                      <span>Job Orders</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/adminreservationrecords">
                      <i className="fas fa-table"></i>
                      <span>Reservations Record</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="d-flex flex-column" id="content-wrapper">
              <div id="content">
                <nav className="bg-white navbar navbar-expand shadow mb-4 topbar static-top navbar-light">
                  <div className="container-fluid">
                    <ul className="navbar-nav flex-nowrap ms-auto">
                      <div className="d-none d-sm-block topbar-divider"></div>
                      <li className="nav-item dropdown no-arrow">
                        <div className="nav-item dropdown no-arrow">
                          <a
                            className="dropdown-toggle nav-link"
                            aria-expanded="false"
                            data-bs-toggle="dropdown"
                            href="#"
                          >
                            <span className="d-none d-lg-inline me-2 text-gray-600 small">
                              ADMIN
                            </span>
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="container-fluid">
                  <h3 className="text-dark mb-4">Add Employee</h3>
                  <div className="row mb-3">
                    <div className="col-xxl-12">
                      <div className="card shadow mb-3">
                        <div className="card-header py-3">
                          <p className="fw-bold text-primary m-0">
                            Employee Details
                          </p>
                        </div>
                        <div className="card-body">
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col">
                                <div className="mb-3">
                                  <label className="form-label form-label">
                                    <strong>Fullname</strong>
                                  </label>
                                  <input
                                    className="form-control form-control"
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="mb-3">
                                  <label className="form-label form-label">
                                    <strong>Phone Number</strong>
                                  </label>
                                  <input
                                    className="form-control form-control"
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Number"
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="mb-3">
                                  <label className="form-label form-label">
                                    <strong>Email Address</strong>
                                  </label>
                                  <input
                                    className="form-control form-control"
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <button
                                className="btn btn-primary btn-sm"
                                type="submit"
                              >
                                Add Employee
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="bg-white sticky-footer">
                <div className="container my-auto">
                  <div className="text-center my-auto copyright">
                    <span>Copyright © Brand 2023</span>
                  </div>
                </div>
              </footer>
            </div>
            <a
              className="d-inline border rounded scroll-to-top"
              href="#page-top"
            >
              <i className="fas fa-angle-up"></i>
            </a>
          </div>
        </body>
      ) : (
        <div>
          <NotAuthorized />
        </div>
      )}
      ;
    </>
  );
}

export default AdminAddEmployee;

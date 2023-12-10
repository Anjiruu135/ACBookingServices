import React from "react";
import useAuthenticationAdmin from "../methods/authAdmin";
import NotAuthorized from "../pages/NotAuthorized";

function AdminAddEmployee() {
  const { authAdmin, message, name, handleLogout } = useAuthenticationAdmin();
  return (
    <>
      {authAdmin ? (
        <body id="page-top">
          <div id="wrapper">
            <nav
              className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark"
              style={{ height: "850px" }}
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
                    <a className="nav-link" href="/adminemployees">
                      <i className="fas fa-table"></i>
                      <span>Employee List</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/adminreservations">
                      <i className="fas fa-table"></i>
                      <span>Reservation List</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/adminjoborders">
                      <i className="fas fa-table"></i>
                      <span>Job Order List</span>
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
                    <button
                      className="btn btn-link d-md-none rounded-circle me-3"
                      id="sidebarToggleTop"
                      type="button"
                    >
                      <i className="fas fa-bars"></i>
                    </button>
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
                          <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                            <a className="dropdown-item" href="#">
                              <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                              &nbsp;Profile
                            </a>
                            <a className="dropdown-item" href="#">
                              <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>
                              &nbsp;Settings
                            </a>
                            <a className="dropdown-item" href="#">
                              <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>
                              &nbsp;Activity log
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                              <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                              &nbsp;Logout
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="container-fluid">
                  <h3 className="text-dark mb-4">Profile</h3>
                  <div className="row mb-3">
                    <div className="col-xxl-12">
                      <div className="card shadow mb-3">
                        <div className="card-header py-3">
                          <p className="fw-bold text-primary m-0">
                            User Settings
                          </p>
                        </div>
                        <div className="card-body">
                          <form>
                            <div className="row">
                              <div className="col">
                                <div className="mb-3">
                                  <label
                                    className="form-label form-label"
                                    for="username"
                                  >
                                    <strong>Fullname</strong>
                                  </label>
                                  <input
                                    className="form-control form-control"
                                    type="text"
                                    id="fullname"
                                    name=""
                                    placeholder="Full Name"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="mb-3">
                                  <label
                                    className="form-label form-label"
                                    for="first_name"
                                  >
                                    <strong>Phone Number</strong>
                                  </label>
                                  <input
                                    className="form-control form-control"
                                    type="text"
                                    id="phone"
                                    name=""
                                    placeholder="Number"
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="mb-3">
                                  <label
                                    className="form-label form-label"
                                    for="last_name"
                                  >
                                    <strong>Email Address</strong>
                                  </label>
                                  <input
                                    className="form-control form-control"
                                    type="text"
                                    id="email"
                                    name=""
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
                                Save Settings
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="card shadow">
                        <div className="card-header py-3"></div>
                        <div className="card-body">
                          <form>
                            <div className="mb-3"></div>
                            <div className="mb-3"></div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="row d-none mb-3">
                        <div className="col">
                          <div className="card text-white bg-primary shadow">
                            <div className="card-body">
                              <div className="row mb-2">
                                <div className="col">
                                  <p className="m-0">Peformance</p>
                                  <p className="m-0">
                                    <strong>65.2%</strong>
                                  </p>
                                </div>
                                <div className="col-auto">
                                  <i className="fas fa-rocket fa-2x"></i>
                                </div>
                              </div>
                              <p className="text-white-50 small m-0">
                                <i className="fas fa-arrow-up"></i>&nbsp;5%
                                since last month
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card text-white bg-success shadow">
                            <div className="card-body">
                              <div className="row mb-2">
                                <div className="col">
                                  <p className="m-0">Peformance</p>
                                  <p className="m-0">
                                    <strong>65.2%</strong>
                                  </p>
                                </div>
                                <div className="col-auto">
                                  <i className="fas fa-rocket fa-2x"></i>
                                </div>
                              </div>
                              <p className="text-white-50 small m-0">
                                <i className="fas fa-arrow-up"></i>&nbsp;5%
                                since last month
                              </p>
                            </div>
                          </div>
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

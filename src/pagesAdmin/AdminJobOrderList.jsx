import React from "react";
import useAuthenticationAdmin from "../methods/authAdmin";
import NotAuthorized from "../pages/NotAuthorized";

function AdminJobOrderList() {
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
                    <a className="nav-link" href="/adminaddemployee">
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
                    <a className="nav-link active" href="/adminjoborders">
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
                <div className="text-center d-none d-md-inline"></div>
              </div>
            </nav>
            <div className="d-flex flex-column" id="content-wrapper">
              <div id="content">
                <nav className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
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
                  <h3 className="text-dark mb-4">Employee List</h3>
                  <div className="card shadow">
                    <div className="card-header py-3">
                      <p className="fw-bold text-primary m-0">Employee Info</p>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 text-nowrap">
                          <div
                            id="dataTable_length"
                            className="dataTables_length"
                            aria-controls="dataTable"
                          ></div>
                        </div>
                        <div className="col-md-6">
                          <div
                            className="text-md-end dataTables_filter"
                            id="dataTable_filter"
                          >
                            <label className="form-label form-label">
                              <input
                                className="form-control-sm form-control"
                                type="search"
                                aria-controls="dataTable"
                                placeholder="Search"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div
                        className="table-responsive table mt-2"
                        id="dataTable"
                        role="grid"
                        aria-describedby="dataTable_info"
                      >
                        <table className="table my-0" id="dataTable">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Position</th>
                              <th>Office</th>
                              <th>Age</th>
                              <th>Start date</th>
                              <th>Salary</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Cedric Kelly</td>
                              <td>Senior JavaScript Developer</td>
                              <td>Edinburgh</td>
                              <td>22</td>
                              <td>
                                2012/03/29
                                <br />
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary btn-sm"
                                  style={{
                                    background: "rgb(223,182,78)",
                                    borderStyle: "none",
                                  }}
                                  type="submit"
                                >
                                  Done
                                </button>
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td>
                                <strong>Name</strong>
                              </td>
                              <td>
                                <strong>Position</strong>
                              </td>
                              <td>
                                <strong>Office</strong>
                              </td>
                              <td>
                                <strong>Age</strong>
                              </td>
                              <td>
                                <strong>Start date</strong>
                              </td>
                              <td>
                                <strong>Salary</strong>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
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

export default AdminJobOrderList;

import React, { useEffect, useState } from "react";
import useAuthenticationAdmin from "../methods/authAdmin";
import NotAuthorized from "../pages/NotAuthorized";
import axios from "axios";

function AdminDashboard() {
  const { authAdmin, message, name, handleLogout } = useAuthenticationAdmin();
  const [userData, setUserData] = useState(0);
  const [employeeData, setEmployeeData] = useState(0);
  const [pendingReservations, setPendingReservations] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCountResponse = await axios.get('http://localhost:3001/api/usercount');
        const employeeCountResponse = await axios.get('http://localhost:3001/api/employeecount');
        const pendingReservationsResponse = await axios.get('http://localhost:3001/api/pendingreservations');
        const totalReservationsResponse = await axios.get('http://localhost:3001/api/totalreservations');

        setUserData(userCountResponse.data.usercount);
        setEmployeeData(employeeCountResponse.data.employeecount);
        setPendingReservations(pendingReservationsResponse.data.pendingreservations);
        setTotalReservations(totalReservationsResponse.data.totalreservations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {authAdmin ? (
        <body id="page-top">
          <div id="wrapper">
            <nav
              className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark"
              style={{ height: "850px", marginBottom: "-50px"}}
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
                    <a className="nav-link active" href="/admindashboard">
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
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="container-fluid">
                  <div className="d-sm-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-dark mb-0">Dashboard</h3>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-xl-3 mb-4">
                      <div className="card shadow border-start-primary py-2">
                        <div className="card-body">
                          <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                              <div className="text-uppercase fw-bold text-primary text-xs mb-1">
                                <span>Number of Users: </span>
                              </div>
                              <div className="fw-bold text-dark h5 mb-0">
                                <span>{userData}</span>
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                      <div className="card shadow border-start-success py-2">
                        <div className="card-body">
                          <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                              <div className="text-uppercase fw-bold text-success text-xs mb-1">
                                <span>Number of Employees:</span>
                              </div>
                              <div className="fw-bold text-dark h5 mb-0">
                                <span>{employeeData}</span>
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                      <div className="card shadow border-start-info py-2">
                        <div className="card-body">
                          <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                              <div className="text-uppercase fw-bold text-info text-xs mb-1">
                                <span>Pending Reservations: </span>
                              </div>
                              <div className="row g-0 align-items-center">
                                <div className="col-auto">
                                  <div className="fw-bold text-dark h5 mb-0 me-3">
                                    <span>{pendingReservations}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                      <div className="card shadow border-start-warning py-2">
                        <div className="card-body">
                          <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                              <div className="text-uppercase fw-bold text-warning text-xs mb-1">
                                <span>Total Reservations: </span>
                              </div>
                              <div className="fw-bold text-dark h5 mb-0">
                                <span>{totalReservations}</span>
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-comments fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col-lg-6 mb-4">
                          <div className="card text-white bg-primary shadow">
                            <div className="card-body">
                              <p className="m-0">Data 1</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card text-white bg-success shadow">
                            <div className="card-body">
                              <p className="m-0">Data 2</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card text-white bg-info shadow">
                            <div className="card-body">
                              <p className="m-0">Data 3</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card text-white bg-warning shadow">
                            <div className="card-body">
                              <p className="m-0">Data 4</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card text-white bg-danger shadow">
                            <div className="card-body">
                              <p className="m-0">Data 5</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card text-white bg-secondary shadow">
                            <div className="card-body">
                              <p className="m-0">Data 6</p>
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

export default AdminDashboard;

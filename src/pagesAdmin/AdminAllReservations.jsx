import React, { useEffect, useState } from "react";
import useAuthenticationAdmin from "../methods/authAdmin";
import NotAuthorized from "../pages/NotAuthorized";
import axios from "axios";

function AdminAllReservations() {
  const { authAdmin, message, name, handleLogout } = useAuthenticationAdmin();
  const [reservationData, setReservationData] = useState([]);

  const getReservationData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/reservation/data`); 
      setReservationData(response.data);
      console.log('Reservation Data:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getReservationData();
  }, []);

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
                    <a className="nav-link active" href="/adminreservationrecords">
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
                <nav className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
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
                  <h3 className="text-dark mb-4">All Reservations</h3>
                  <div className="card shadow">
                    <div className="card-header py-3">
                      <p className="fw-bold text-primary m-0">
                        Reservation Info
                      </p>
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
                              <th>Reservation ID</th>
                              <th>User ID</th>
                              <th>Fullname </th>
                              <th>Phone Number</th>
                              <th>Email</th>
                              <th>Location</th>
                              <th>Message</th>
                              <th>Date Inquired</th>
                              <th>Status</th>
                              <th>Date Updated</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reservationData.map((reservation) => (
                              <tr key={reservation.reservation_id}>
                                <td>{reservation.reservation_id}</td>
                                <td>{reservation.user_id}</td>
                                <td>{reservation.fullname}</td>
                                <td>{reservation.phone_number}</td>
                                <td>{reservation.email}</td>
                                <td>{reservation.location}</td>
                                <td>{reservation.message}</td>
                                <td>{reservation.date_inquired}</td>
                                <td>{reservation.status}</td>
                                <td>{reservation.date_updated}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>Reservation ID</th>
                              <th>User ID</th>
                              <th>Fullname </th>
                              <th>Phone Number</th>
                              <th>Email</th>
                              <th>Location</th>
                              <th>Message</th>
                              <th>Date Inquired</th>
                              <th>Status</th>
                              <th>Date Updated</th>
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
  )
}

export default AdminAllReservations

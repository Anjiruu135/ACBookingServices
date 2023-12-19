import express from "express";
import { verifyUser, verifyAdmin } from "../middlewares/auth.js";
import { db } from "../../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Verifies and gets User info for username display
router.get("/api", verifyUser, (req, res) => {
  return res.json({
    Status: "Success",
    username: req.username,
    user_id: req.user_id,
  });
});

// Verifies and gets Admin info for username display
router.get("/api/admin", verifyAdmin, (req, res) => {
  return res.json({
    Status: "Success",
    username: req.username,
    user_id: req.user_id,
  });
});

// Register User
router.post("/api/register", (req, res) => {
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log(connErr);
      res.status(500).send("Error establishing database connection");
      return;
    }

    const { email, username, phone, password } = req.body;

    // Check if the email already exists
    connection.query(
      "SELECT COUNT(*) as emailCount FROM tb_users WHERE email = ?",
      [email],
      (emailCheckErr, emailCheckResult) => {
        if (emailCheckErr) {
          console.log(emailCheckErr);
          connection.release();
          res.status(500).send("Error checking email existence");
        } else {
          const emailCount = emailCheckResult[0].emailCount;

          if (emailCount > 0) {
            // Email already exists, send alert
            connection.release();
            res.status(400).send("Email already exists. Please choose a different email.");
          } else {
            // Email doesn't exist, proceed with user registration
            connection.query(
              "SELECT COUNT(*) as userCount FROM tb_users",
              (countErr, countResult) => {
                if (countErr) {
                  console.log(countErr);
                  connection.release();
                  res.status(500).send("Error fetching user count");
                } else {
                  const userCount = countResult[0].userCount;

                  connection.query(
                    "INSERT INTO tb_users (user_id, email, username, phone_number, password, usertype) VALUES (?, ?, ?, ?, ?, ?)",
                    [
                      `${new Date().getFullYear()}-${userCount + 1}`,
                      email,
                      username,
                      phone,
                      password,
                      `user`,
                    ],
                    (insertErr, insertResult) => {
                      connection.release();

                      if (insertErr) {
                        console.log(insertErr);
                        res.status(500).send("Error registering user");
                      } else {
                        res
                          .status(200)
                          .send(`User registered successfully with ID: ${userCount + 1}`);
                      }
                    }
                  );
                }
              }
            );
          }
        }
      }
    );
  });
});

// Login as User or Admin
router.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Get a connection from the pool
  db.getConnection((err, connection) => {
    if (err) {
      console.log("Error getting database connection:", err);
      res.status(500).send("Error during login");
      return;
    }

    // Use the connection for querying
    connection.query(
      "SELECT * FROM tb_users WHERE email = ? AND password = ?",
      [email, password],
      (queryErr, result) => {
        // Release the connection back to the pool
        connection.release();

        if (queryErr) {
          console.log("Error during query:", queryErr);
          res.status(500).send("Error during login");
        } else {
          if (result.length > 0) {
            const { user_id, username, usertype } = result[0];
            if (usertype === "user") {
              const token = jwt.sign(
                { user_id, username, usertype },
                "jwt-secret-key",
                {
                  expiresIn: "1d",
                }
              );
              res.cookie("token", token, { sameSite: 'None', secure: true });
              console.log(username);
              console.log(usertype);
              res.status(200).send({
                usertype: usertype,
                message: "Login successful for user",
              });
            } else if (usertype === "admin") {
              const admintoken = jwt.sign(
                { user_id, username, usertype },
                "jwt-secret-key-admin",
                {
                  expiresIn: "1d",
                }
              );
              res.cookie("admintoken", admintoken, { sameSite: 'None', secure: true });
              console.log(username);
              console.log(usertype);
              res.status(200).send({
                usertype: usertype,
                message: "Login successful for admin",
              });
            } else {
              res.status(401).send("Invalid usertype");
            }
          } else {
            res.status(401).send("Invalid email or password");
          }
        }
      }
    );
  });
});

// Inquire or Book for Reservations
router.post("/api/inquire", (req, res) => {
  const { fullname, phone, email, location, message, user_id } = req.body;

  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).send("Error during inquiry");
      return;
    }

    // Use the connection for querying
    connection.query(
      "SELECT COUNT(*) as reservationCount FROM tb_reservations",
      (countErr, countResult) => {
        if (countErr) {
          console.log(countErr);
          // Release the connection back to the pool in case of an error
          connection.release();
          res.status(500).send("Error fetching user count");
        } else {
          const reservationCount = countResult[0].reservationCount;
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth() + 1;

          // Execute the insert query
          connection.query(
            "INSERT INTO tb_reservations (reservation_id, user_id, fullname, phone_number, email, location, message, date_inquired, status) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)",
            [
              `R-${currentYear}-${currentMonth}:${reservationCount + 1}`,
              user_id,
              fullname,
              phone,
              email,
              location,
              message,
              "Pending",
            ],
            (insertErr, insertResult) => {
              // Release the connection back to the pool after the insert query
              connection.release();

              if (insertErr) {
                console.log(insertErr);
                res.status(500).send("Error submission");
              } else {
                res
                  .status(200)
                  .send(
                    `Submission successful with ID: ${currentYear}-${currentMonth}-${
                      reservationCount + 1
                    }`
                  );
              }
            }
          );
        }
      }
    );
  });
});

// Add Employee
router.post("/api/addemployee", (req, res) => {
  const { fullname, phone, email } = req.body;

  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).send("Error during employee addition");
      return;
    }

    // Use the connection for querying
    connection.query(
      "SELECT COUNT(*) as employeeCount FROM tb_employee",
      (countErr, countResult) => {
        if (countErr) {
          console.log(countErr);
          // Release the connection back to the pool in case of an error
          connection.release();
          res.status(500).send("Error fetching user count");
        } else {
          const employeeCount = countResult[0].employeeCount;
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth() + 1;

          // Execute the insert query
          connection.query(
            "INSERT INTO tb_employee (employee_id, fullname, email, phone_number, status) VALUES (?, ?, ?, ?, ?)",
            [
              `E-${currentYear}-${currentMonth}:${employeeCount + 1}`,
              fullname,
              email,
              phone,
              "available",
            ],
            (insertErr, insertResult) => {
              // Release the connection back to the pool after the insert query
              connection.release();

              if (insertErr) {
                console.log(insertErr);
                res.status(500).send("Error submission");
              } else {
                res
                  .status(200)
                  .send(
                    `Submission successful with ID: E-${currentYear}-${currentMonth}-${
                      employeeCount + 1
                    }`
                  );
              }
            }
          );
        }
      }
    );
  });
});

// Gets all Employee from database
router.get("/api/employee/data", (req, res) => {
  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).send("Error fetching employee data");
      return;
    }

    // Use the connection for querying
    connection.query("SELECT * FROM tb_employee", (error, results) => {
      // Release the connection back to the pool
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).send("Error fetching employee data");
      } else {
        res.json(results);
      }
    });
  });
});

// Delete selected User
router.delete("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;

  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).json({ error: "Error deleting user from database" });
      return;
    }

    // Use the connection for querying
    connection.query(
      "DELETE FROM tb_users WHERE user_id = ?",
      [userId],
      (error, results, fields) => {
        // Release the connection back to the pool
        connection.release();

        if (error) {
          console.log(error);
          res.status(500).json({ error: "Error deleting user from database" });
        } else {
          res.status(200).json({ message: "User deleted successfully" });
        }
      }
    );
  });
});

// Delete selected Employee
router.delete("/api/employee/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;

  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).json({ error: "Error deleting employee from database" });
      return;
    }

    // Use the connection for querying
    connection.query(
      "DELETE FROM tb_employee WHERE employee_id = ?",
      [employeeId],
      (error, results, fields) => {
        // Release the connection back to the pool
        connection.release();

        if (error) {
          console.log(error);
          res
            .status(500)
            .json({ error: "Error deleting employee from database" });
        } else {
          res.status(200).json({ message: "Employee deleted successfully" });
        }
      }
    );
  });
});

// Get all Users from Database
router.get("/api/user/data", (req, res) => {
  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).send("Error fetching user data");
      return;
    }

    // Use the connection for querying
    connection.query(
      "SELECT * FROM tb_users WHERE usertype='user'",
      (error, results) => {
        // Release the connection back to the pool
        connection.release();

        if (error) {
          console.log(error);
          res.status(500).send("Error fetching user data");
        } else {
          res.json(results);
        }
      }
    );
  });
});

// Get all Reservations from Database
router.get("/api/reservation/data", (req, res) => {
  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).send("Error fetching reservation data");
      return;
    }

    // Use the connection for querying
    connection.query(
      "SELECT * FROM tb_reservations ORDER BY reservation_id DESC",
      (error, results) => {
        // Release the connection back to the pool
        connection.release();

        if (error) {
          console.log(error);
          res.status(500).send("Error fetching reservation data");
        } else {
          res.json(results);
        }
      }
    );
  });
});

// Get all Pending Reservations from Database
router.get("/api/reservation/data/pending", (req, res) => {
  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).send("Error fetching pending reservation data");
      return;
    }

    // Use the connection for querying
    connection.query(
      "SELECT * FROM tb_reservations WHERE status='Pending'",
      (error, results) => {
        // Release the connection back to the pool
        connection.release();

        if (error) {
          console.log(error);
          res.status(500).send("Error fetching pending reservation data");
        } else {
          res.json(results);
        }
      }
    );
  });
});

// Get all Job Orders from Database
router.get("/api/joborder/data", (req, res) => {
  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).send("Error fetching job order data");
      return;
    }

    // Use the connection for querying
    connection.query(
      "SELECT * FROM tb_joborder INNER JOIN tb_employee ON tb_employee.employee_id=tb_joborder.employee_id ORDER BY order_id DESC",
      (error, results) => {
        // Release the connection back to the pool
        connection.release();

        if (error) {
          console.log(error);
          res.status(500).send("Error fetching job order data");
        } else {
          res.json(results);
        }
      }
    );
  });
});

// Update Job Order if Done
router.post("/api/joborder/update", (req, res) => {
  const orderId = req.body.orderId;

  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Use the connection for updating
    connection.query(
      "UPDATE tb_joborder SET status = 'Done', Date_updated = NOW() WHERE order_id = ?",
      [orderId],
      (error, results) => {
        // Release the connection back to the pool
        connection.release();

        if (error) {
          console.error("Error updating status:", error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("Status updated successfully");
          res.status(200).json({ success: true });
        }
      }
    );
  });
});

// Update Reservation if Approved or Denied and add a Job Order if Approved
router.post("/api/reservation/data/update", (req, res) => {
  const updatedData = req.body.updatedData;
  let successfulUpdates = 0;

  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Use the connection for counting rows in tb_joborder
    connection.query(
      "SELECT COUNT(*) AS orderCount FROM tb_joborder",
      (err, countResult) => {
        if (err) {
          console.error("Error counting rows in tb_joborder:", err);
          // Release the connection back to the pool in case of an error
          connection.release();
          res.status(500).send("Internal Server Error");
          return;
        }

        // Release the connection back to the pool after counting rows
        connection.release();

        const orderCount = countResult[0].orderCount;

        // Get a new connection from the pool for updating reservations
        db.getConnection((updateConnErr, updateConnection) => {
          if (updateConnErr) {
            console.log("Error getting database connection:", updateConnErr);
            res.status(500).send("Internal Server Error");
            return;
          }

          updatedData.forEach((reservation) => {
            const { reservation_id, status } = reservation;
            const order_id = orderCount + 1;
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1;
            const query =
              "UPDATE tb_reservations SET status = ?, date_updated = NOW() WHERE reservation_id = ?";

            // Use the connection for updating reservations
            updateConnection.query(
              query,
              [status, reservation_id],
              (err, result) => {
                if (err) {
                  console.error("Error updating reservation in MySQL:", err);
                } else {
                  console.log("Reservation updated successfully");
                  successfulUpdates++;

                  if (status === "Approved") {
                    // Get a new connection from the pool for inserting approval data
                    db.getConnection((approvalConnErr, approvalConnection) => {
                      if (approvalConnErr) {
                        console.log(
                          "Error getting database connection:",
                          approvalConnErr
                        );
                      } else {
                        approvalConnection.query(
                          "INSERT INTO tb_joborder (order_id, employee_id, reservation_id, date_issued, status) VALUES (?, (SELECT employee_id FROM tb_employee ORDER BY RAND() LIMIT 1), ?, NOW(), 'Ongoing')",
                          [
                            `JO-${currentYear}-${currentMonth}-${order_id}`,
                            reservation_id,
                          ],
                          (err, result) => {
                            if (err) {
                              console.error(
                                "Error inserting approval data in MySQL:",
                                err
                              );
                            } else {
                              console.log(
                                "Approval data inserted successfully"
                              );
                            }

                            // Release the connection back to the pool after inserting approval data
                            approvalConnection.release();
                          }
                        );
                      }
                    });
                  }
                }

                if (successfulUpdates === updatedData.length) {
                  // Release the connection back to the pool after updating all reservations
                  updateConnection.release();
                  res.status(200).send("All reservations updated successfully");
                }
              }
            );
          });
        });
      }
    );
  });
});

// Logout and remove User token
router.get("/api/logout", (req, res) => {
  res.clearCookie("token", { sameSite: 'None', secure: true });
  return res.json({ Status: "Success" });
});

// Logout and remove Admin token
router.get("/api/admin/logout", (req, res) => {
  res.clearCookie("admintoken", { sameSite: 'None', secure: true });
  return res.json({ Status: "Success" });
});

// Count all Users from Database
router.get("/api/usercount", (req, res) => {
  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Use the connection for querying
    const query = "SELECT COUNT(*) AS usercount FROM tb_users";
    connection.query(query, (error, results) => {
      // Release the connection back to the pool
      connection.release();

      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ usercount: results[0].usercount });
      }
    });
  });
});

// Count all Employees from Database
router.get("/api/employeecount", (req, res) => {
  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Use the connection for querying
    const query = "SELECT COUNT(*) AS employeecount FROM tb_employee";
    connection.query(query, (error, results) => {
      // Release the connection back to the pool
      connection.release();

      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ employeecount: results[0].employeecount });
      }
    });
  });
});

// Count all Pending Reservations from Database
router.get("/api/pendingreservations", (req, res) => {
  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Use the connection for querying
    const query =
      'SELECT COUNT(*) AS pendingreservations FROM tb_reservations WHERE status="Pending"';
    connection.query(query, (error, results) => {
      // Release the connection back to the pool
      connection.release();

      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ pendingreservations: results[0].pendingreservations });
      }
    });
  });
});

// Count the Total of Reservations from Database
router.get("/api/totalreservations", (req, res) => {
  // Get a connection from the pool
  db.getConnection((connErr, connection) => {
    if (connErr) {
      console.log("Error getting database connection:", connErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Use the connection for querying
    const query = "SELECT COUNT(*) AS totalreservations FROM tb_reservations";
    connection.query(query, (error, results) => {
      // Release the connection back to the pool
      connection.release();

      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ totalreservations: results[0].totalreservations });
      }
    });
  });
});

export default router;

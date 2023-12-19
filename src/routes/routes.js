import express from "express";
import { verifyUser, verifyAdmin } from "../middlewares/auth.js";
import { db } from "../../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api", verifyUser, (req, res) => {
  return res.json({
    Status: "Success",
    username: req.username,
    user_id: req.user_id,
  });
});

router.get("/api/admin", verifyAdmin, (req, res) => {
  return res.json({
    Status: "Success",
    username: req.username,
    user_id: req.user_id,
  });
});

router.post("/api/register", (req, res) => {
  const { email, username, phone, password } = req.body;
  db.query(
    "SELECT COUNT(*) as userCount FROM tb_users",
    (countErr, countResult) => {
      if (countErr) {
        console.log(countErr);
        res.status(500).send("Error fetching user count");
      } else {
        const userCount = countResult[0].userCount;
        db.query(
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
});

router.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM tb_users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
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
            res.cookie("token", token);
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
            res.cookie("admintoken", admintoken);
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

router.post("/api/inquire", (req, res) => {
  const { fullname, phone, email, location, message, user_id } = req.body;
  db.query(
    "SELECT COUNT(*) as reservationCount FROM tb_reservations",
    (countErr, countResult) => {
      if (countErr) {
        console.log(countErr);
        res.status(500).send("Error fetching user count");
      } else {
        const reservationCount = countResult[0].reservationCount;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        db.query(
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

router.post("/api/addemployee", (req, res) => {
  const { fullname, phone, email } = req.body;
  db.query(
    "SELECT COUNT(*) as employeeCount FROM tb_employee",
    (countErr, countResult) => {
      if (countErr) {
        console.log(countErr);
        res.status(500).send("Error fetching user count");
      } else {
        const employeeCount = countResult[0].employeeCount;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        db.query(
          "INSERT INTO tb_employee (employee_id, fullname, email, phone_number, status) VALUES (?, ?, ?, ?, ?)",
          [
            `E-${currentYear}-${currentMonth}:${employeeCount + 1}`,
            fullname,
            email,
            phone,
            "available",
          ],
          (insertErr, insertResult) => {
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

router.get("/api/employee/data", (req, res) => {
  db.query("SELECT * FROM tb_employee", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router.delete("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    "DELETE FROM tb_users WHERE user_id = ?",
    [userId],
    (error, results, fields) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error deleting user from database" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    }
  );
});

router.delete("/api/employee/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;

  db.query(
    "DELETE FROM tb_employee WHERE employee_id = ?",
    [employeeId],
    (error, results, fields) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error deleting user from database" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    }
  );
});

router.get("/api/user/data", (req, res) => {
  db.query("SELECT * FROM tb_users WHERE usertype='user'", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router.get("/api/reservation/data", (req, res) => {
  db.query(
    "SELECT * FROM tb_reservations ORDER BY reservation_id DESC",
    (error, results) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

router.get("/api/reservation/data/pending", (req, res) => {
  db.query(
    "SELECT * FROM tb_reservations WHERE status='Pending'",
    (error, results) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

router.get("/api/joborder/data", (req, res) => {
  db.query(
    "SELECT * FROM tb_joborder INNER JOIN tb_employee on tb_employee.employee_id=tb_joborder.employee_id ORDER BY order_id DESC",
    (error, results) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

router.post('/api/joborder/update', (req, res) => {
  const orderId = req.body.orderId;
  db.query(`UPDATE tb_joborder SET status = 'Done', Date_updated = NOW() WHERE order_id = ?`, [orderId], (error, results) => {
    if (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Status updated successfully');
      res.status(200).json({ success: true });
    }
  });
});

router.post("/api/reservation/data/update", (req, res) => {
  const updatedData = req.body.updatedData;
  let successfulUpdates = 0;
  db.query(
    "SELECT COUNT(*) AS orderCount FROM tb_joborder",
    (err, countResult) => {
      if (err) {
        console.error("Error counting rows in tb_joborder:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const orderCount = countResult[0].orderCount;

      updatedData.forEach((reservation) => {
        const { reservation_id, status } = reservation;
        const order_id = orderCount + 1;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const query = `UPDATE tb_reservations SET status = ?, date_updated = NOW() WHERE reservation_id = ?`;
        db.query(query, [status, reservation_id], (err, result) => {
          if (err) {
            console.error("Error updating reservation in MySQL:", err);
          } else {
            console.log("Reservation updated successfully");
            successfulUpdates++;

            if (status === "Approved") {
              db.query(
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
                    console.log("Approval data inserted successfully");
                  }
                }
              );
            }
          }

          if (successfulUpdates === updatedData.length) {
            res.status(200).send("All reservations updated successfully");
          }
        });
      });
    }
  );
});

router.get("/api/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

router.get("/api/admin/logout", (req, res) => {
  res.clearCookie("admintoken");
  return res.json({ Status: "Success" });
});

router.get('/api/usercount', (req, res) => {
  const query = 'SELECT COUNT(*) AS usercount FROM tb_users';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ usercount: results[0].usercount });
    }
  });
});

router.get('/api/employeecount', (req, res) => {
  const query = 'SELECT COUNT(*) AS employeecount FROM tb_employee';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ employeecount: results[0].employeecount });
    }
  });
});

router.get('/api/pendingreservations', (req, res) => {
  const query = 'SELECT COUNT(*) AS pendingreservations FROM tb_reservations WHERE status="Pending"';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ pendingreservations: results[0].pendingreservations });
    }
  });
});

router.get('/api/totalreservations', (req, res) => {
  const query = 'SELECT COUNT(*) AS totalreservations FROM tb_reservations';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ totalreservations: results[0].totalreservations });
    }
  });
});

export default router;

import express from "express";
import { verifyUser, verifyAdmin } from "../middlewares/auth.js";
import { db } from "../../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", verifyUser, (req, res) => {
  return res.json({
    Status: "Success",
    username: req.username,
    user_id: req.user_id,
  });
});

router.get("/admin", verifyAdmin, (req, res) => {
  return res.json({
    Status: "Success",
    username: req.username,
    user_id: req.user_id,
  });
});

router.post("/register", (req, res) => {
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

router.post("/login", (req, res) => {
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
            res
              .status(200)
              .send({
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
            res
              .status(200)
              .send({
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

router.post("/inquire", (req, res) => {
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
            "pending",
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

router.post("/addemployee", (req, res) => {
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

router.get('/employee/data', (req, res) => {
  db.query("SELECT * FROM tb_employee", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/reservation/data', (req, res) => {
  db.query("SELECT * FROM tb_reservations", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router.post('/reservation/data/update', (req, res) => {
  const updatedData = req.body.updatedData;
  updatedData.forEach(reservation => {
    const { reservation_id, status } = reservation;
    const query = `UPDATE tb_reservations SET status = ?, date_updated = NOW() WHERE reservation_id = ?`;

    db.query(query, [status, reservation_id], (err, result) => {
      if (err) {
        console.error('Error updating reservation in MySQL:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Reservation updated successfully');
        res.status(200).send('Reservation updated successfully');
      }
    });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

router.get("/admin/logout", (req, res) => {
  res.clearCookie("admintoken");
  return res.json({ Status: "Success" });
});

export default router;

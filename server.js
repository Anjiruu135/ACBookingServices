import express, { json } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { createConnection } from "mysql";

const app = express();
const port = 3001;

app.use(json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

const db = createConnection({
  host: "btvsp1vf7ewwxtm90gyx-mysql.services.clever-cloud.com",
  user: "us5wlnp185143gxo",
  password: "gBIHbll7aYCeFne8ps33",
  database: "btvsp1vf7ewwxtm90gyx",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the MySQL database");
  }
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authorized" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Invalid Token" });
      } else {
        req.username = decoded.username;
        req.user_id = decoded.user_id;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({
    Status: "Success",
    username: req.username,
    user_id: req.user_id,
  });
});

app.post("/register", (req, res) => {
  const { email, username, phone, password } = req.body;

  // Step 1: Fetch the count of existing users
  db.query(
    "SELECT COUNT(*) as userCount FROM tb_users",
    (countErr, countResult) => {
      if (countErr) {
        console.log(countErr);
        res.status(500).send("Error fetching user count");
      } else {
        const userCount = countResult[0].userCount;

        // Step 2: Use the user count as the ID for the new user
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

app.post("/login", (req, res) => {
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
          const { user_id, username } = result[0];
          const token = jwt.sign({ user_id, username }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          console.log(username);
          res.status(200).send("Login successful");
        } else {
          res.status(401).send("Invalid email or password");
        }
      }
    }
  );
});

app.post("/inquire", (req, res) => {
  const { fullname, phone, email, location, message, user_id } = req.body;

  // Step 1: Fetch the count of existing users
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

        // Step 2: Use the user count as the ID for the new user
        db.query(
          "INSERT INTO tb_reservations (reservation_id, user_id, fullname, phone_number, email, location, message, date_inquired, status) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)",
          [
            `${currentYear}-${currentMonth}:${reservationCount + 1}`,
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

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

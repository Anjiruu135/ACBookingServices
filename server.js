import express, { json } from "express";
import cors from "cors";
import { createConnection } from "mysql";

const app = express();
const port = 3001;

app.use(json());
app.use(cors());


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
          "INSERT INTO tb_users (id, email, username, phone, password) VALUES (?, ?, ?, ?, ?)",
          [
            `${new Date().getFullYear()}-${userCount + 1}`,
            email,
            username,
            phone,
            password,
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
          res.status(200).send("Login successful");
        } else {
          res.status(401).send("Invalid email or password");
        }
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
import { createPool } from "mysql";

export const db = createPool({
  connectionLimit: 10,
  host: "btvsp1vf7ewwxtm90gyx-mysql.services.clever-cloud.com",
  user: "us5wlnp185143gxo",
  password: "gBIHbll7aYCeFne8ps33",
  database: "btvsp1vf7ewwxtm90gyx",
});

// Handle pool errors
db.on("error", (err) => {
  console.log("Database error:", err);
});

// You can also listen for the connection event to know when a new connection is made
db.on("connection", (connection) => {
  console.log("New database connection established");
});

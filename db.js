import { createConnection } from "mysql";

export const db = createConnection({
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

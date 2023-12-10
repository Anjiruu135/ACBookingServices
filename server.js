import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./src/routes/routes.js";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

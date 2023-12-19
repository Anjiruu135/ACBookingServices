import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./src/routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
    secure: process.env.NODE_ENV === "production",
  })
);

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

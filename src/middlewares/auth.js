import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
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

export const verifyAdmin = (req, res, next) => {
    const admintoken = req.cookies.admintoken;
    if (!admintoken) {
      return res.json({ Error: "You are not authorized" });
    } else {
      jwt.verify(admintoken, "jwt-secret-key-admin", (err, decoded) => {
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

import * as yup from "yup";

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().min(4).max(15).required(),
  phone: yup.string().min(5).max(15).required(),
  password: yup.string().min(4).max(15).required(),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required(),
});

const contactSchema = yup.object().shape({
    fullname: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().email().required(),
    location: yup.string().required(),
    message: yup.string().required(),
});

export { registerSchema, contactSchema };

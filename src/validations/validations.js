import yup from "yup";

const registerSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(4).max(15).required(),
    phone: yup.string().min(5).max(15).required(),
    password: yup.string().min(4).max(15).required(),
});
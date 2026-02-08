// ================================
// User Validation Schemas (Yup)
// ================================
/**
 * 📌 Validation schema for user registration
 * This checks:
 * - name: required
 * - email: required + must be valid email format
 * - password: required + minimum 6 characters
 * - role: must be either "admin" or "member"
 */
import * as Yup from "yup";

export const registerSchema = Yup.object({
  body: Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
    role: Yup.string().oneOf(["admin", "member"]).required("Role is required")
  })
});
/**
 * 📌 Validation schema for user login
 * This checks:
 * - email: required + valid format
 * - password: required
 */
export const loginSchema = Yup.object({
  body: Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required"),
  })
});
/*
 **Here first check all the option is correct format or filled all the details. if cann't fil all the details properly then show me the validation error**
 */

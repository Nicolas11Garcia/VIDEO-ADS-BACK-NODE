import { check } from "express-validator";
import validateRequest from "../helpers/handleValidator.js";

export const registerValidator = [
  check("name").trim().exists().notEmpty().trim(),
  check("lastname").trim().exists().notEmpty(),
  check("email").trim().exists().notEmpty().isEmail(),
  check("password").trim().exists().notEmpty().isLength({ min: 6 }),
  check("role").trim().exists().notEmpty().isIn(["user", "admin"]),
  (req, res, next) => {
    return validateRequest(req, res, next);
  },
];

export const loginValidator = [
  check("email").trim().exists().notEmpty().isEmail(),
  check("password").trim().exists().notEmpty().isLength({ min: 6 }),
  (req, res, next) => {
    return validateRequest(req, res, next);
  },
];

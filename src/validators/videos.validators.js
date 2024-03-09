import { check } from "express-validator";
import validateRequest from "../helpers/handleValidator.js";

export const createVideoValidator = [
  check("titulo").trim().exists(),
  check("descripcion").trim().exists(),
  check("ruta_video"),
  (req, res, next) => {
    return validateRequest(req, res, next);
  },
];

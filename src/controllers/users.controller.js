import { matchedData } from "express-validator";
import UserModel from "../schemas/user.schema.js";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const updateUser = async (req, res) => {
  console.log("update");
};

export const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UserModel.findById(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    usuario.set({
      reset_password_token_expiration: undefined,
      reset_password_token: undefined,
      password: undefined,
      remember_token: undefined,
      updated_at: undefined,
    });

    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Se produjo un error interno en el servidor" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const data = await UserModel.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: "Se produjo un error interno en el servidor" });
  }
};

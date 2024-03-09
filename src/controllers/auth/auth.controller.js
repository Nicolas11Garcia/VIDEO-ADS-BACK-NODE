import { matchedData } from "express-validator";
import UserModel from "../../schemas/user.schema.js";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  try {
    const body = matchedData(req);
    const { name, lastname, email, password, role } = body;

    const existingUserByEmail = await UserModel.findOne({ email }).exec();
    if (existingUserByEmail)
      return res.status(409).send({ error: "Email ya registrado" });

    const hashedPassword = await hash(password, 12);
    const _id = uuidv4();

    const user = new UserModel({
      _id,
      name,
      lastname,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    return res.status(201).send({ msg: "Usuario creado exitosamente" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: "Se produjo un error interno en el servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const body = matchedData(req);
    const { email, password } = body;

    const existingUserByEmail = await UserModel.findOne({ email }).exec();
    if (!existingUserByEmail)
      return res.status(401).send({ msg: "Credenciales Incorrectas" });

    const validatePassword = await compare(
      password,
      existingUserByEmail.password
    );
    if (!validatePassword)
      return res.status(401).send({ msg: "Credenciales Incorrectas" });

    //TODO OK - GENERAR TOKEN
    const { _id } = existingUserByEmail;
    const token = jwt.sign(
      {
        _id,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
      },
      process.env.JWT_SECRET
    );
    return res.send({ usuario: _id, token });

  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: "Se produjo un error interno en el servidor" });
  }
};

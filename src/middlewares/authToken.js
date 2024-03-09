import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).send({ msg: "Token no encontrado" });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ msg: "Token no encontrado" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (Date.now() > payload.exp) {
      return res.status(401).send({ error: "Token expirado" });
    }

    // Agrega el payload del token a la solicitud para que otros middlewares o controladores puedan acceder a él
    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).send({ error: "Token inválido" });
  }
};

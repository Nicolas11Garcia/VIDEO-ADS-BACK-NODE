import { matchedData } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import VideoModel from "../schemas/video.schema.js";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadMiddleware = multer({ storage });

export const uploadVideoMiddleware = (req, res, next) => {
  uploadMiddleware.single("ruta_video")(req, res, function (err) {
    if (!req.file) {
      return res.status(400).json({ error: "Por favor, sube un archivo" });
    }
    next();
  });
};

export const uploadOptionalVideoMiddleware = (req, res, next) => {
  uploadMiddleware.single("ruta_video")(req, res, function (err) {
    next();
  });
};

export const createVideo = async (req, res) => {
  try {
    const body = matchedData(req);
    const { titulo, descripcion } = body;
    const ruta_video = req.file.filename;

    const _id = uuidv4();
    const video = new VideoModel({
      _id,
      titulo,
      descripcion,
      ruta_video,
    });

    await video.save();

    return res.status(201).send({ msg: "Video creado exitosamente" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: "Se produjo un error interno en el servidor" });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await VideoModel.find({});

    return res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Se produjo un error interno en el servidor" });
  }
};

export const getVideoId = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "No se encontró el video." });
    }

    return res.status(200).json(video);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Se produjo un error interno en el servidor" });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const videoID = req.params.id;
    const updatedFields = {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
    };

    const video = await VideoModel.findById(videoID);

    if (!video) {
      return res.status(404).json({ message: "No se encontró el video." });
    }

    if (req.file) {
      const filePath = `uploads/videos/${video.ruta_video}`;
      fs.unlinkSync(filePath); // Eliminar el archivo del sistema de archivos

      updatedFields.ruta_video = req.file.filename;
    }

    await VideoModel.findByIdAndUpdate(videoID, updatedFields);

    return res.status(200).json({ message: "Video actualizado exitosamente." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Se produjo un error interno en el servidor" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const videoID = req.params.id;

    // Buscar el video por su ID
    const video = await VideoModel.findById(videoID);

    if (!video) {
      return res.status(404).json({ message: "No se encontró el video." });
    }

    // Eliminar el archivo del sistema de archivos si existe
    const filePath = `uploads/videos/${video.ruta_video}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Eliminar el archivo del sistema de archivos
    }

    // Eliminar el video de la base de datos
    await VideoModel.findByIdAndDelete(videoID);

    return res.status(200).json({ message: "Video eliminado exitosamente." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Se produjo un error interno en el servidor" });
  }
};

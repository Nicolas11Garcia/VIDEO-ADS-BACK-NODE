import mongoose from "mongoose";

const { Schema } = mongoose;

const VideoSchema = new Schema(
  {
    _id: { type: String, _id: false },
    titulo: { type: String },
    descripcion: { type: String },
    ruta_video: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const VideoModel = mongoose.model("Video", VideoSchema);

export default VideoModel;

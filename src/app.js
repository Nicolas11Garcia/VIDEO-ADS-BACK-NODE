import cors from "cors";
import { config } from "dotenv";
import express from "express";
import connectToDataBase from "./config/mongodb.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

//Routes
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import videosRoutes from "./routes/videos.routes.js";

config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

//API Routes
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/videos", videosRoutes);

 const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
app.use("/public", express.static(join(CURRENT_DIR, "../uploads"))); 

app.listen(PORT, async () => {
  await connectToDataBase();
  console.log(`APP LEVANTADA EN PUERTO ${PORT}`);
});

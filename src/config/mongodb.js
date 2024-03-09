import mongoose from "mongoose";

const connectToDataBase = async () => {
  try {
    const DB_URI = process.env.DB_URI;

    await mongoose.connect(DB_URI);
    console.log("CONECTADO A LA BD");
  } catch (error) {
    throw error;
  }
};

export default connectToDataBase;

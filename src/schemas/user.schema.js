import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    _id: { type: String, _id: false },
    name: { type: String, required: true, minLength: 2 },
    lastname: { type: String, required: true, minLength: 2 },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

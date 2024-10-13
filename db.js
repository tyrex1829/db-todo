import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  email: String,
  password: { type: String, unique: true },
  name: String,
});

const Todo = new Schema({
  title: String,
  done: Boolean,
  userId: ObjectId,
});

export const UserModel = mongoose.model("users", User);
export const TodoModel = mongoose.model("todos", Todo);

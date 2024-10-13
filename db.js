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

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

module.exports = {
  UserModel: UserModel,
  TodoModel: TodoModel,
};

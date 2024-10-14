import express from "express";
import env from "dotenv";
env.config();
import { UserModel, TodoModel } from "./db.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { auth, JWT_SECRET } from "./auth.js";

mongoose.connect(process.env.MONGO_URL + "todo-tyrex");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);

app.get("/", (req, res) => {
  res.send("Landing Page");
});

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email: email,
    password: password,
    name: name,
  });

  res.json({
    message: "You are logged in!",
  });
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
    password: password,
  });

  console.log(user);

  if (user) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

app.post("/todo", auth, async (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;

  await TodoModel.create({
    userId,
    title,
    done,
  });

  res.json({
    message: "Todo created",
  });
});

app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;

  const todos = await TodoModel.find({
    userId,
  });

  res.json({
    todos,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

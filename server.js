import express from "express";
import jwt from "jsonwebtoken";
import usuarios from "./usuarios.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const usuario = usuarios.find();
});

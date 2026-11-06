import express from "express";
import jwt from "jsonwebtoken";
import usuarios from "./usuarios.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

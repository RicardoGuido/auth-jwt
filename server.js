import express from "express";
import jwt from "jsonwebtoken";
import usuarios from "./usuarios.js";
import "dotenv/config";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
const SECRET_KEY = process.env.SECRET_KEY;

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const usuario = usuarios.find(
    (user) => user.username === username && user.password === password,
  );

  if (usuario) {
    const token = jwt.sign(
      { id: usuario.id, username: usuario.username, role: usuario.role },
      SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.status(201).json({ message: token });
  } else {
    res.status(401).json({ message: "Usuário ou senha inválidos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

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

//Middleware é uma função que tem acesso ao obeto de requisição (req), ao objeto de resposta(res)
//e à próxima função de middleware no ciclo de requisição-resposta da aplicação
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token não fornecido" });
  }
  //401 = Não autorizado
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    //403 = Proibido

    req.user = user;
    console.log(`Usuário autenticado: ${user}`);
    next();
  });
};

app.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Acesso concedido a rota protegida" });
});

app.get("/admin", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") {
    res.status(403).json({ message: "Acesso negado" });
  }
  res.status(200).json({ message: "Área do administrador" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const academiasRoutes = require("./routes/academias");

const app = express();

app.use(cors());
app.use(express.json());

// Rota raiz - saúde da API
app.get("/", (req, res) => {
  res.json({ status: "online", mensagem: "API de Academias funcionando" });
});

app.use("/api/academias", academiasRoutes);

// Conexão com MongoDB (reaproveitada entre invocações na Vercel)
let conectado = false;
async function conectarMongo() {
  if (conectado) return;
  await mongoose.connect(process.env.MONGODB_URI);
  conectado = true;
  console.log("Conectado ao MongoDB");
}

// Middleware para garantir conexão antes de cada request (necessário em serverless)
app.use(async (req, res, next) => {
  try {
    await conectarMongo();
    next();
  } catch (err) {
    res.status(500).json({ erro: "Erro ao conectar ao banco", detalhes: err.message });
  }
});

const PORT = process.env.PORT || 3000;

// Só sobe o listen localmente; na Vercel o app é exportado como função serverless
if (require.main === module) {
  conectarMongo().then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  });
}

module.exports = app;

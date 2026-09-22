const express = require("express");
const router = express.Router();
const Academia = require("../models/Academia");

// GET /api/academias - listar todas
router.get("/", async (req, res) => {
  try {
    const academias = await Academia.find().sort({ createdAt: -1 });
    res.json(academias);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar academias", detalhes: err.message });
  }
});

// GET /api/academias/:id - buscar uma
router.get("/:id", async (req, res) => {
  try {
    const academia = await Academia.findById(req.params.id);
    if (!academia) return res.status(404).json({ erro: "Academia não encontrada" });
    res.json(academia);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar academia", detalhes: err.message });
  }
});

// POST /api/academias - criar
router.post("/", async (req, res) => {
  try {
    const { nome, endereco, precoMensalidade, foto } = req.body;
    const novaAcademia = new Academia({ nome, endereco, precoMensalidade, foto });
    const salva = await novaAcademia.save();
    res.status(201).json(salva);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao criar academia", detalhes: err.message });
  }
});

// PUT /api/academias/:id - atualizar
router.put("/:id", async (req, res) => {
  try {
    const { nome, endereco, precoMensalidade, foto } = req.body;
    const atualizada = await Academia.findByIdAndUpdate(
      req.params.id,
      { nome, endereco, precoMensalidade, foto },
      { new: true, runValidators: true }
    );
    if (!atualizada) return res.status(404).json({ erro: "Academia não encontrada" });
    res.json(atualizada);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar academia", detalhes: err.message });
  }
});

// DELETE /api/academias/:id - remover
router.delete("/:id", async (req, res) => {
  try {
    const removida = await Academia.findByIdAndDelete(req.params.id);
    if (!removida) return res.status(404).json({ erro: "Academia não encontrada" });
    res.json({ mensagem: "Academia removida com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao remover academia", detalhes: err.message });
  }
});

module.exports = router;

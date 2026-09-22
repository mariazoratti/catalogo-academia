const mongoose = require("mongoose");

const AcademiaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório"],
      trim: true,
    },
    endereco: {
      type: String,
      required: [true, "O endereço é obrigatório"],
      trim: true,
    },
    precoMensalidade: {
      type: Number,
      required: [true, "O preço da mensalidade é obrigatório"],
      min: [0, "O preço não pode ser negativo"],
    },
    foto: {
      type: String, // URL da imagem
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Academia", AcademiaSchema);

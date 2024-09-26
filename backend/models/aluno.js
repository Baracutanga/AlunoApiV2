const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
    email: {type:Mixed, required:true },
    nome: { type: String, required: true },
    senha: { type: Mixed, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });

  module.exports = mongoose.model('Aluno', AlunoSchema);
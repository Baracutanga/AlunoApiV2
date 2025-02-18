const Turma = require("../models/turmaModel");
const Disciplina = require("../models/disciplinaModel");
const mongoose = require('mongoose');

///////////////////////////////////////////////////////////

exports.createTurma = async (req, res) => {
  try {
    const { nome, disciplinas, turno } = req.body;

    // checar se as disciplinas sao por id ou nome
    const disciplinasExistentes = await Disciplina.find({
      $or: [
        { _id: { $in: disciplinas } }, // Buscar por ID
        { nome: { $in: disciplinas } }  // Buscar por nome
      ]
    });

    
    if (disciplinasExistentes.length !== disciplinas.length) {
      return res.status(404).json({ message: 'Uma ou mais disciplinas não foram encontradas.' });
    }

    
    const novaTurma = new Turma({
      nome,
      disciplinas: disciplinasExistentes.map(disciplina => disciplina._id),
      turno
    });

    await novaTurma.save();

    await Disciplina.updateMany(
      { _id: { $in: disciplinasExistentes.map(d => d._id) } },
      { $addToSet: { turmas: novaTurma._id } } // Adicionar o ID da turma ao array turmas
    );

    res.status(201).json({ message: 'Turma criada com sucesso!', turma: novaTurma });
  } catch (err) {
    console.error('Erro ao criar turma:', err);
    res.status(500).json({ message: 'Erro ao criar turma', err });
  }
};

//CRIAR TURMA.. ENTRADA DE DADOS DA DISCIPLINA(NOME OU ID)
// exports.createTurma = async (req, res) => {
//     const { nome, disciplinas, turno } = req.body;

//     try {
        
//         const turmaExistente = await Turma.findOne({ nome });

//         if (turmaExistente) {
//             return res.status(400).json({ message: "Turma já existe." });
//         }

//         // Array para armazenar os IDs das disciplinas
//         let disciplinaIds = [];

//         // Processa cada disciplina no array de disciplinas
//         for (let disciplina of disciplinas) {
//             let disciplinaId;

            
//             if (mongoose.Types.ObjectId.isValid(disciplina)) {
//                 disciplinaId = disciplina;
//             } else {
               
//                 const disciplinaQuery = await Disciplina.findOne({ nome: disciplina });

                
//                 if (!disciplinaQuery) {
//                     return res.status(404).json({
//                         status: "fail",
//                         message: `Disciplina não encontrada: ${disciplina}`
//                     });
//                 }

                
//                 disciplinaId = disciplinaQuery._id;
//             }

            
//             disciplinaIds.push(disciplinaId);
//         }

        
//         const novaTurma = new Turma({
//             nome,
//             disciplinas: disciplinaIds, 
//             turno
//         });

        
//         const turmaSalva = await novaTurma.save();

        
//         res.status(201).json({
//             status: "success",
//             message: "Turma criada com sucesso!",
//             data: { turma: turmaSalva }
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             status: "Internal Server Error",
//             message: "Erro ao cadastrar Turma. Tente novamente.",
//             error: err.message
//         });
//     }
// };

// ///////////////////////////////////////////////////////////

// exports.getAllTurmas = async (req, res) => {
//     try {
//         const turmas = await Turma.find().populate("disciplinas");
//         res.status(200).json({
//             status: "success",
//             data: {
//                 turmas
//             }
//         });
//     } catch (err) {
//         res.status(400).json({ 
//             status: "fail",
//             message: err.message 
//         });
//     }
// };

// ///////////////////////////////////////////////////////////

// exports.deleteTurma = async (req, res) => {
//     const { id } = req.params;
//     const { nome } = req.body;

//     try {
//         if(id) {
//             const turmaDeletada = await Turma.findByIdAndDelete(id);
            
//             if (!turmaDeletada) {
//                 return res.status(404).json({ message: "Turma não encontrada pelo ID." });
//             }

//             return res.status(200).json({status: "sucess", message: "Turma deletada com sucesso"})

//         } else if (nome) {
//             const turmaDeletada = await Turma.findOneAndDelete({ nome });

//             if (!turmaDeletada) {
//                 return res.status(404).json({status: "sucess", message: "Turma não encontrada pelo nome." });
//             }

//             return res.status(200).json({ message: "Turma deletada com sucesso"})

            
//         } else {
//             return res.status(400).json({ message: "Por favor, forneça um ID ou um nome para deletar." });
//         }
        
        
//     } catch (err) {
//         res.status(400).json({ 
//             status: "fail",
//             message: err.message 
//         });
//     }
// };

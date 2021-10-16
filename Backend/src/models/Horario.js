const mongoose = require('mongoose');

const Horario = mongoose.model(
    "Horario", 
    new mongoose.Schema({ 
        fecha: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Horario',
          },
          hora_sal: {
            type: String,
          },
          precio_hora: {
            type: Number,
   
          },
    })
);

module.exports = Horario;
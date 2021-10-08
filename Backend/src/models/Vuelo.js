const mongoose = require('mongoose');

const Reserva = mongoose.model(
    "Reserva", 
    new mongoose.Schema({ 
        avion_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Avion',
          },
          ruta_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ruta',
          },
          hora_sal: {
            type: String,
          },
          hora_lleg: {
            type: String,
          },
    })
);

module.exports = Reserva;
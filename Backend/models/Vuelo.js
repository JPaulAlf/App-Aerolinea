const mongoose = require('mongoose');

const Vuelo = mongoose.model(
    "Vuelo", 
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

module.exports = Vuelo;
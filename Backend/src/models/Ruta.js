const mongoose = require('mongoose');

const Ruta = mongoose.model(
    "Ruta", 
    new mongoose.Schema({ 
        horario_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Horario',
          }],
          lon_in: {
            type: String,
          },
          lat_in: {
            type: String,
          },
          lon_fin: {
            type: String,
          },
          lat_fin: {
            type: String,
          },
          duracion: {
            type: Number,
          },
          estado: {
            type: Number,
          }
    })
);

module.exports = Ruta;
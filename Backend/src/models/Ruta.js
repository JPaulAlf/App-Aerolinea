const mongoose = require('mongoose');

<<<<<<< HEAD
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
=======
const Rutas = mongoose.model(
    "Rutas", 
    new mongoose.Schema({ 
        Inicio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aeropuertos'
        },
        Destino:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aeropuertos'
        },
        Duracion:Number,
        latitud_Inicio:Number,
        longitud_Inicio: Number,
        latitud_Final:Number,
        longitud_Final:Number
    })
);

module.exports = Rutas;
>>>>>>> fdb151b6683a48baf3d15a2e97d8f5f900af0848

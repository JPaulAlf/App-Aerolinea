const VueloModel = require("../models/Vuelo");
const AvionModel = require("../models/Avion");

module.exports.get = async (req, res, next) => {
  const vuelos = await VueloModel.find().populate("avion_id ruta_id").exec();
  res.json(vuelos);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const vuelo = await VueloModel.findOne({ _id: id }).populate("avion_id ruta_id").exec();
  res.json(vuelo);
};

module.exports.create = async (req, res, next) => {
  const { avion_id, ruta_id, hora_sal, hora_lleg } = req.body;

  const avion = await AvionModel.findById(avion_id).exec();
  const cantFilas = avion.cant_filas;
  const cantAsFil = avion.cant_af;
  let arrAsientos_Con_Filas = [];
  for (let i = 1; i <= cantFilas; i++) {
    let fila = [];
    for (let j = 1; j <= cantAsFil; j++) {
      let asiento = {
        "fil": i,
        "num": j,
        "est": 0
      }
      fila.push(asiento);
    }
    arrAsientos_Con_Filas.push(fila);
  }

  const vuelo = await new VueloModel({ avion_id: avion_id, ruta_id: ruta_id, hora_sal: hora_sal, hora_lleg: hora_lleg, asientos: arrAsientos_Con_Filas });
  vuelo.save();
  res.json(vuelo);
};

module.exports.delete = async (req, res, next) => {
  const vuelo = await VueloModel.findByIdAndRemove(req.params.id);
  // si vuelo es null significa que no existe el registro
  if (vuelo) {
    res.json({ result: "Flight deleted", vuelo });
  } else {
    res.json({ result: "Invalid Id", vuelo });
  }
};

module.exports.update = async (req, res, next) => {
  const { avion_id, ruta_id, hora_sal, hora_lleg } = req.body;
  const vuelo = await VueloModel.findOneAndUpdate(
    { _id: req.params.id },
    { avion_id, ruta_id, hora_sal, hora_lleg },
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(vuelo);
};

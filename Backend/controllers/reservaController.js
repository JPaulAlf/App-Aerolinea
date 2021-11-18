const ReservaModel = require("../models/Reserva");
const VueloModel = require("../models/Vuelo");

module.exports.get = async (req, res, next) => {
  const reservas = await ReservaModel.find()
    .populate("vuelo_id usuario_id")
    .exec();
  res.json(reservas);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const reserva = await ReservaModel.findOne({ _id: id })
    .populate("vuelo_id usuario_id")
    .exec();
  res.json(reserva);
};

module.exports.create = (req, res, next) => {
  const {
    vuelo_id,
    usuario_id,
    proceso,
    precio_t,
    fecha,
    detalle,
    num_asiento,
  } = req.body;
  const reserva = new ReservaModel({
    vuelo_id,
    usuario_id,
    proceso,
    precio_t,
    fecha,
    detalle,
    num_asiento,
  });
  reserva.save();
  res.json(reserva);
};

module.exports.delete = async (req, res, next) => {
  const reserva = await ReservaModel.findByIdAndRemove(req.params.id);
  // si reserva es null significa que no existe el registro
  if (reserva) {
    res.json({ result: "Reserve deleted", reserva });
  } else {
    res.json({ result: "Invalid Id", reserva });
  }
};

module.exports.checkIn = async (req, res, next) => {
  const { vuelo_id, detalle, asiento } = req.body; //  Fila-Asiento ej: 1-6
  const reserva = await ReservaModel.findOneAndUpdate(
    { _id: req.params.id },
    { proceso: 2, detalle: detalle, num_asiento: asiento },
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  var fila, asien;

  const array = asiento.split("-");
  fila = array[0];
  asien = array[1];

  const vuelo_Original = await VueloModel.findById(vuelo_id).exec();
  const asientos = vuelo_Original.asientos;
  for (let i = 0; i < asientos.length; i++) {
    if (asientos[i].fil === fila && asientos[i].num === asien) {
      asientos[i].est = true;
    }
  }

  const vuelo = await VueloModel.findOneAndUpdate(
    { _id: vuelo_id },
    {
      asientos: asientos,
    },
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );

  res.json(vuelo);

  res.json(reserva);
};

module.exports.finalizar = async (req, res, next) => {
const {
    vuelo_id
  } = req.body;


  const reserva = await ReservaModel.updateMany(
    { vuelo_id: {$eq : vuelo_id}},
     {$set: { "proceso" : 3 } }
    );

  res.json(reserva);
};


module.exports.update = async (req, res, next) => {
  const {
    vuelo_id,
    usuario_id,
    proceso,
    precio_t,
    fecha,
    detalle,
    num_asiento,
  } = req.body;
  const reserva = await ReservaModel.findOneAndUpdate(
    { _id: req.params.id },
    { vuelo_id, usuario_id, proceso, precio_t, fecha, detalle, num_asiento },
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(reserva);
};

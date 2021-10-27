const RutaModel = require("../models/Ruta");
const HorarioModel = require("../models/Horario");
const AeropuertoModel = require("../models/Aeropuerto");

module.exports.get = async (req, res, next) => {
  const ruta = await RutaModel.find().populate("horario_id").populate("inicio").populate("destino").exec();
  res.json(ruta);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const ruta = await RutaModel.findById(id).populate("horario_id").populate("inicio").populate("destino").exec();
  res.json(ruta);
};

module.exports.create = (req, res, next) => {
  var {inicio, destino, horarios, lon_in, lat_in, lon_fin, lat_fin, duracion, precio_trayecto, descuento, estado} = req.body;


 

var horarios_id=[];

horarios.forEach(element => {
  const { fecha, hora_sal } = element;
  const horario = await new HorarioModel({ 
    fecha, hora_sal });
  horario.save();
    horarios_id.push(horario._id);
});

horarios = horarios_id;



//se envían los aeropuertos sólo el _id sin el objeto

  const ruta = new RutaModel({ inicio:inicio, destino:destino, horarios:horarios, lon_in:lon_in, lat_in:lat_in, lon_fin:lon_fin, lat_fin:lat_fin, duracion:duracion, precio_trayecto:precio_trayecto, descuento:descuento, estado:estado});
  ruta.save();
  res.json(ruta);

 
};

module.exports.delete = async (req, res, next) => {


var ruta = await RutaModel.findById(req.params.id);

ruta.horarios.forEach(element => {
  await RutaModel.findByIdAndRemove(element._id);
  
});
   ruta = await RutaModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (ruta) {
    res.json({ result: `Post borrado correctamente`, post: ruta });
  } else {
    res.json({ result: "Id de Post Invalido Invalid", post: ruta });
  }
};

module.exports.update = async (req, res, next) => {
  const {inicio, destino, horarios, lon_in, lat_in, lon_fin, lat_fin, duracion, precio_trayecto, descuento, estado} = req.body;
   





    horarios.forEach(element =>{
     const {fecha, hora_sal} = element;
  const horario = await HorarioModel.findOneAndUpdate(
        { _id: element._id },
        {fecha, hora_sal}, 
        { new: true } // retornar el registro que hemos modificado con los nuevos valores
      );



    });
    
      

    const ruta = await RutaModel.findOneAndUpdate(
      { _id: req.params.id },
      {inicio:inicio, destino:destino, horarios:horarios, lon_in:lon_in, lat_in:lat_in, lon_fin:lon_fin, lat_fin:lat_fin, duracion:duracion, precio_trayecto:precio_trayecto, descuento:descuento, estado:estado}, // ==> {title: title, body: body}
      { new: true } // retornar el registro que hemos modificado con los nuevos valores
    );
    res.json(ruta);
};

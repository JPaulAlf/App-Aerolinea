const PostModel = require("../models/Direcion");


module.exports.get = async (req, res, next) => {
    const posts = await PostModel.find().populate("Direccion", "sennas latitud longitud").exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id }).exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const {sennas, latitud, longitud } = req.body;
  const post = new PostModel({ sennas:sennas, latitud:latitud,longitud:longitud  });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await PostModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: "Address deleted", post });
  } else {
    res.json({ result: "Invalid Id", post });
  }
};

module.exports.update = async (req, res, next) => {
    const {sennas, latitud, longitud } = req.body;
    const post = await PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { sennas, latitud,longitud }, 
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};
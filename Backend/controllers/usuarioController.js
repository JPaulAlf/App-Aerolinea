const UsuarioModel = require("../models/Usuario");
const DireccionModel = require("../models/Direccion");

const jwt = require('jsonwebtoken');

//Se obtiene las variables de entorno
const config = process.env;

// creación de nuevos usuarios
module.exports.signup = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        var newUser = new UsuarioModel({ username: username, password: password });
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.json({ success: false, msg: 'Username already exists.' });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
        });
    }
};

// logueo de usuarios
module.exports.signin = async (req, res, next) => {

    const { username, password } = req.body;

    const user = await UsuarioModel.findOne({ username: username }).exec();

    if (!user) {
        res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
        //Si el usuario existe verifica si las contraseñas
        user.comparePassword(password, user.password, function (err, isMatch) {
            if (isMatch && !err) {
                // Si el usuario es correcto y la contraseña coindice se procede a crear el token
                const token = jwt.sign({ "username": username}, 
                                         config.SECRETWORDJWT, 
                                         { expiresIn: "2h"}
                                       );
                // return the information including token as JSON
                res.json({ success: true, token: 'JWT ' + token });

            } else {
                //si la contraseña no coincide se procede a indicar el error
                res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
            }
        });
    }
};

module.exports.get = async (req, res, next) => {
    
        const usuario = await UsuarioModel.find().populate("direccion").exec();
        res.json(usuario);
    
   

}

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const usuario = await UsuarioModel.findOne({ _id: id }).populate("direccion").exec();
  res.json(usuario);
};



module.exports.create = async (req, res, next) => {
    var {rol, usuario, pwd, nombre, apellidos, correo, fech_nacimiento, tel_trabajo, tel_celular, estado, direccion} = req.body;

    const { sennas, latitud, longitud } = direccion
    const direccionUser = await new DireccionModel({ sennas: sennas, latitud: latitud, longitud: longitud });
    direccionUser.save();

    
    direccion = direccionUser._id;
    const User = await new UsuarioModel({rol, usuario, pwd, nombre, apellidos, correo, fech_nacimiento, tel_trabajo, tel_celular, estado, direccion});
    User.save();
    res.json(User);
  };


  module.exports.delete = async (req, res, next) => {
    var usuario = await UsuarioModel.findById(req.params.id)
   usuario = await UsuarioModel.findByIdAndRemove(req.params.id);
    // si Usuario es null significa que no existe el registro
    if (usuario) {
      res.json({ result: `Usuario borrado correctamente`, post: usuario });
    } else {
      res.json({ result: "Id de Usuario Invalido Invalid", post: usuario });
    }

    
    const direccion = await DireccionModel.findByIdAndRemove(usuario.direccion._id);
    
  };


  module.exports.update = async (req, res, next) => {

   

    const {rol, usuario, pwd, nombre, apellidos, correo, fech_nacimiento, tel_trabajo, tel_celular, estado, direccion } = req.body;
    const { sennas, latitud, longitud } = direccion
    const direccionUser = await DireccionModel.findOneAndUpdate(
        { _id: direccion._id },
        {sennas, latitud, longitud}, // ==> {title: title, body: body}
        { new: true } // retornar el registro que hemos modificado con los nuevos valores
      );
      

    const user = await UsuarioModel.findOneAndUpdate(
      { _id: req.params.id },
      {rol, usuario, pwd, nombre, apellidos, correo, fech_nacimiento, tel_trabajo, tel_celular, estado}, // ==> {title: title, body: body}
      { new: true } // retornar el registro que hemos modificado con los nuevos valores
    );
    res.json(user);
  };

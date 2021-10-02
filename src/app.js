const express = require ('express');
const morgan = require ('morgan');

const app= express();
app.use(express.json());


// variables de entorno:
app.use(morgan('dev'));
app.set("port", process.env.PORT || 8080);



module.exports = app;

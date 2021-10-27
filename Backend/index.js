const express = require('express');
const conectarDB = require('./database');
const app = express();
const cors = require("cors");

//connect to DB 

conectarDB();

app.use(express.json());
app.use(cors());

app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/vuelo', require('./routes/vuelo'));


app.listen(process.env.PORT || 4000,() => {


    console.log('The server is listening')

});
const express = require('express');
const conectarDB = require('./database');
const app = express();
const cors = require("cors");

//connect to DB 

conectarDB();

app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/usuario'));


app.listen(process.env.PORT || 4000,() => {


    console.log('The server is listening')

});
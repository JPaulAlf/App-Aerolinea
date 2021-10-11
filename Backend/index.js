const express = require('express');
const conectarDB = require('./src/database');
const app = express();
const cors = require("cors");

//connect to DB 

conectarDB();

app.use(express.json());
app.use(cors());

app.use('/api', require('./src/routes/users.routes'));


app.listen(process.env.PORT || 4000,() => {


    console.log('The server is listening')

});
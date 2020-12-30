//Archivo root principal para el arranque de la api

const container = require('./Src/Startup/container');
//obtenermos la BD  a traves del container q configuramos en container.js
const server = container.resolve("app");  //app hace referencia al register q hicimos en container.js
//obtenermos la BD  a traves del container q configuramos en container.js
const {MONGO_URI} = container.resolve("config");

const mongoose = require('mongoose');
mongoose.set("useCreateIndex", true);
mongoose.connect(MONGO_URI, {useNewUrlParser:true, useFindAndModify:false})
.then(()=>server.start())//si promesa se cumplió
.catch(console.log); //si promesa falla, le dejamos la responsabilidad al catch de ejecutar el console.log
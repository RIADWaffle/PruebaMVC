// Imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/ParkingDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.error('No se pudo conectar a MongoDB...', err));

// Configuración de EJS para front-end
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Rutas
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Puerto de ejecucion
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
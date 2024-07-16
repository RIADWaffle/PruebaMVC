const mongoose = require('mongoose');

// Modelo para los vehiculos de la BD
const vehicleSchema = new mongoose.Schema({
  plateNumber: { type: String, required: true },
  type: { type: String, required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date },
});

// Funcion que calcula los minutos que duraron en el parking
vehicleSchema.methods.getParkingDuration = function () {
  if (this.entryTime && this.exitTime) {
    return (this.exitTime - this.entryTime) / 60000; // duración en minutos
  }
  return 0;
};


// Funcion que calcula el precio acorde al tiempo y tipo
vehicleSchema.methods.getParkingFee = function () {
  const duration = this.getParkingDuration();
  switch (this.type) {
    case 'official':
      return 0;
    case 'resident':
      return duration * 1;
    case 'non-resident':
      return duration * 3;
    default:
      return 0;
  }
};

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;

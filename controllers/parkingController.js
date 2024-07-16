const Vehicle = require('../models/Vehicle');
const { generateExcelReport, generatePdfReport } = require('../reports/generateReport');

exports.registerEntry = async (req, res) => {
  const { plateNumber, type } = req.body;
  const vehicle = new Vehicle({
    plateNumber,
    type,
    entryTime: Date.now(),
  });
  await vehicle.save();
  res.render('entry', { vehicle });
};

exports.registerExit = async (req, res) => {
  const { plateNumber } = req.body;
  const vehicle = await Vehicle.findOne({ plateNumber, exitTime: null });
  if (vehicle) {
    vehicle.exitTime = Date.now();
    await vehicle.save();
    res.render('exit', { vehicle });
  } else {
    res.send('Vehicle not found');
  }
};

exports.generateReport = async (req, res) => {
  const { startDate, endDate, format } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);

  const vehicles = await Vehicle.find({
    entryTime: { $gte: start },
    exitTime: { $lte: end },
  });

  const reportData = vehicles.map(vehicle => ({
    plateNumber: vehicle.plateNumber,
    parkingTime: vehicle.getParkingDuration(),
    type: vehicle.type,
    amount: vehicle.getParkingFee(),
  }));

  if (format === 'excel') {
    generateExcelReport(reportData, res);
  } else if (format === 'pdf') {
    generatePdfReport(reportData, res);
  } else {
    res.status(400).send('Invalid format');
  }
};

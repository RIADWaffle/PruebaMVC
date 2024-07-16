const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

///////////////////////////////////////////
// Funcion para generar el archivo Excel
exports.generateExcelReport = (data, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Report');

  // Estructura de columnas
  worksheet.columns = [
    { header: 'Núm. placa', key: 'plateNumber', width: 15 },
    { header: 'Tiempo estacionado (min.)', key: 'parkingTime', width: 20 },
    { header: 'Tipo', key: 'type', width: 15 },
    { header: 'Cantidad a pagar', key: 'amount', width: 15 }
  ];

  // Guardado de datos en archivo
  data.forEach(item => {
    worksheet.addRow(item);
  });

  // Guardar localmente el archivo generado
  const filePath = path.join(__dirname, 'report.xlsx');
  workbook.xlsx.writeFile(filePath).then(() => {
    res.download(filePath, 'report.xlsx', (err) => {
      if (err) throw err;
      fs.unlinkSync(filePath);
    });
  });
};

///////////////////////////////////////////
// Funcion para generar el archivo PDF
exports.generatePdfReport = (data, startTime, endTime, res) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, 'report.pdf');
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(14).text(`inicio: ${startTime}`);
  doc.fontSize(14).text(`Fin:   ${endTime}`);
  doc.moveDown();

  data.forEach(item => {
    doc.fontSize(12).text(`Núm. placa: ${item.plateNumber}`);
    doc.text(`Tiempo estacionado (min.): ${item.parkingTime}`);
    doc.text(`Tipo: ${item.type}`);
    doc.text(`Cantidad a pagar: $${item.amount} MX`);
    doc.moveDown();
  });

  doc.end();
  doc.pipe(res);
};

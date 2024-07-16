const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

///////////////////////////////////////////
// Funcion para generar el archivo Excel
exports.generateExcelReport = (data, startTime, endTime, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Report');

  // Unir celdas y añadir el rango de fechas en la primera fila
  worksheet.mergeCells('A1:D1');
  worksheet.getCell('A1').value = `Inicio: ${startTime} - Final: ${endTime}`;
  worksheet.getCell('A1').font = { bold: true };
  worksheet.getCell('A1').alignment = { horizontal: 'center' };
  

  // Estructura de columnas
  worksheet.columns = [
    { header: 'Núm. placa', key: 'plateNumber', width: 20 },
    { header: 'Tiempo estacionado (min.)', key: 'parkingTime', width: 30 },
    { header: 'Tipo', key: 'type', width: 20 },
    { header: 'Cantidad a pagar', key: 'amount', width: 20 }
  ];

  worksheet.addRow(worksheet.columns.map(col => col.header));

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
  doc.fontSize(14).text(`Fin:    ${endTime}`);
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

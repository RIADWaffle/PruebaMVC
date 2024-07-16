## Dependencias

Este proyecto utiliza las siguientes dependencias:

- **Express**: Framework web para Node.js, utilizado para crear el servidor y manejar las rutas.
- **EJS**: Motor de plantillas para generar vistas HTML dinámicas.
- **Mongoose**: ODM para MongoDB, utilizado para interactuar con la base de datos.
- **ExcelJS**: Biblioteca para crear archivos Excel.
- **pdfKit**: Biblioteca para crear archivos PDF.
- **body-parser**: Middleware para manejar el cuerpo de las solicitudes HTTP.

## Instalación

Para comenzar con el proyecto, sigue estos pasos:

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/RIADWaffle/PruebaMVC.git
   cd PruebaMVC

2. **Instalar dependencias**:
   ```bash
   npm install

## Configuración de MongoDB Localmente

Para usar MongoDB de forma local, sigue estos pasos:

1. **Descargar e instalar MongoDB**:

   - Ve al [sitio oficial de MongoDB](https://www.mongodb.com/try/download/community) y descarga la versión Community Server.
   - [Sigue las instrucciones de instalación](https://youtu.be/eKXIxSZrJfw).

2. **Iniciar el servicio de MongoDB**:

   Abre una terminal y ejecuta el siguiente comando para iniciar el servicio:

       mongod
     
  Esto iniciará el servidor MongoDB en el puerto por defecto (27017).

## Iniciar la Aplicación

Una vez que tengas MongoDB corriendo y todas las dependencias instaladas, puedes iniciar la aplicación:
    
    npm start

Esto iniciará el servidor y la aplicación estará disponible en http://localhost:3000.

## Rutas Disponibles

- **/entry**: Registrar la entrada de un vehículo.
- **/exit**: Registrar la salida de un vehículo.
- **/report**: Generar un reporte de entradas y salidas.

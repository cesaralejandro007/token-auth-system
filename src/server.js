import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './router/authRoutes.js';

dotenv.config(); 
const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Verificar si la URI de MongoDB está definida
if (!process.env.MONGO_URI) {
  console.error("No se ha definido MONGO_URI en las variables de entorno");
  process.exit(1);  // Detener la ejecución si la URI no está definida
}

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB", error);
  });

// Usar las rutas de autenticación
app.use("/auth", authRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});

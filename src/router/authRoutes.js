import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import moment from 'moment-timezone';

const router = express.Router();

// Configurar la zona horaria (si no se ha hecho globalmente en tu servidor)
process.env.TZ = 'America/Caracas';  // Ajusta la zona horaria según lo necesites

// Registro
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Contraseña incorrecta" });

    // Obtener el tiempo de expiración correctamente
    const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hora desde ahora

    // Crear el token con la nueva expiración
    const token = jwt.sign(
      { id: user._id, exp: expirationTime }, // El exp debe estar dentro del payload
      process.env.JWT_SECRET
    );

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error en el login" });
  }
});

// Ruta protegida (Dashboard)
router.get("/dashboard", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Acceso denegado" });

  try {
    // Asegúrate de eliminar "Bearer " antes de pasar el token a jwt.verify
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    res.json({ message: "Acceso permitido al dashboard", userId: verified.id });
  } catch (error) {
    console.error("Token Error:", error); // Para obtener más detalles del error
    res.status(401).json({ error: "Token inválido o expirado" });
  }
});

export default router;

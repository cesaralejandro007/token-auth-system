import axios from "axios";

const API_URL = "http://localhost:5000/auth";

export const login = async (email, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, { email, password });
    return data;
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error al iniciar sesión");
  }
};

export const register = async (email, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/register`, { email, password });
    return data;
  } catch (error) {
    console.error("Error en register:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error al registrar usuario");
  }
};

export const checkToken = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error en checkToken:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error al verificar el token");
  }
};

import axios from "axios";

const API_URL = "http://localhost:5000/auth";

export const login = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/login`, { email, password });
  return data;
};

export const register = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/register`, { email, password });
  return data;
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
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || "Error al verificar el token");
      }
      throw new Error("Error desconocido al verificar el token");
    }
  };
  

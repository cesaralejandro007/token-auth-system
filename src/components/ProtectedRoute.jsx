import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../api/authService"; 

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No estás autenticado.");
      navigate("/login");
      return;
    }

    checkToken(token)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("Token inválido o expirado.");
        navigate("/login");
      });
  }, [navigate]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return children;
};

export default ProtectedRoute;

import { useState } from 'react';
import { register } from '../api/authService';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

const useRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 

    try {
      const response = await register(email, password);
      console.log('Usuario registrado:', response);
      
      // Alerta de éxito con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Ahora puedes iniciar sesión con tu cuenta.',
      });

      // Reiniciar los campos después de registro exitoso
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  };
};

export default useRegister;

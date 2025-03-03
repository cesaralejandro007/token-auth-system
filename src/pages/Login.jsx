import useLogin from '../hooks/useLogin';

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  } = useLogin();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 max-w-sm"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-md shadow-lg hover:opacity-90 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default Login;

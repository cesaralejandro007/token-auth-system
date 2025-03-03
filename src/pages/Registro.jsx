import useRegister from '../hooks/useRegister';  // Importar el hook personalizado

const Registro = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  } = useRegister();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 max-w-sm"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Registro
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 transition duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-md shadow-lg hover:opacity-90 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Registro;

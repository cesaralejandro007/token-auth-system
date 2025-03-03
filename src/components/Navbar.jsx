import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">Mi Aplicación</h1>
      <div>
        <Link to="/login" className="px-4">Login</Link>
        <Link to="/registro" className="px-4">Registro</Link>
        <Link to="/dashboard" className="px-4">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
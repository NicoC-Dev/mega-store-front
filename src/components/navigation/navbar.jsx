import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si existe la clave 'usuario' en el localStorage
    const user = localStorage.getItem("usuario");
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Eliminar la clave 'usuario' del localStorage para cerrar sesión
    localStorage.removeItem("usuario");
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-white shadow px-4 py-4 rounded">
      <div className="container flex justify-between items-center mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            MegaStore
          </span>
        </a>

        {/* Menú principal */}
        <div className="hidden lg:flex lg:items-center lg:w-auto">
          <ul className="font-medium flex space-x-6 items-center">
            <li>
              <a
                href="/marcas"
                className="text-gray-900 hover:text-blue-700 transition"
              >
                Marcas
              </a>
            </li>
            <li>
              <a
                href="/productos"
                className="text-gray-900 hover:text-blue-700 transition"
              >
                Productos
              </a>
            </li>
            <li>
              <a
                href="/categorias"
                className="text-gray-900 hover:text-blue-700 transition"
              >
                Categorías
              </a>
            </li>
            <li>
              <a
                href="/subcategorias"
                className="text-gray-900 hover:text-blue-700 transition"
              >
                Subcategorías
              </a>
            </li>

            {/* Botones de sesión */}
            {!isAuthenticated && (
              <>
                <li>
                  <a
                    href="/login"
                    className="py-2 px-4 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
                  >
                    Iniciar sesión
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className="py-2 px-4 text-blue-600 border border-blue-600 rounded-md shadow-md hover:bg-blue-600 hover:text-white transition-all duration-200"
                  >
                    Registrarse
                  </a>
                </li>
              </>
            )}

            {isAuthenticated && (
              <li>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 transition-all duration-200"
                >
                  Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Menú hamburguesa */}
        <div className="lg:hidden flex items-center">
          {isOpen ? (
            <FaTimes className="text-xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <FaBars className="text-xl cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <ul className="font-medium flex flex-col space-y-4 p-4">
          <li>
            <a
              href="/marcas"
              className="text-gray-900 hover:text-blue-700 transition"
            >
              Marcas
            </a>
          </li>
          <li>
            <a
              href="/productos"
              className="text-gray-900 hover:text-blue-700 transition"
            >
              Productos
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

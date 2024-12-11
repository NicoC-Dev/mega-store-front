import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get_productos } from "../../../../redux/actions/productos/productos";
import { Link } from "react-router-dom";
import axios from "axios";

const LoadingCard = () => <div className="card_load_extreme_descripion"></div>;

const Productos = ({ get_productos, productos }) => {
  useEffect(() => {
    get_productos();
  }, [get_productos]);

  const generateUniqueName = () => {
    const prefixes = ["Super", "Mega", "Eco", "Max", "Quick", "Pro"];
    const suffixes = ["Plus", "Fresh", "Express", "Prime", "Green", "Ultra"];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${randomPrefix}${randomSuffix}`;
  };

  const onSubmitCreate = async () => {
    const nombreUnico = generateUniqueName(); // Genera un nombre único

    const nuevoProducto = {
      nombre: nombreUnico,
      descripcion: "Monitor de la marca Samsung de pulgadas",
      tamano: "m",
      color: "rojo",
      precioUnitario: 245.99,
      stock: 32,
      umbralBajoStock: 10,
      marcaId: 1,
      subCategoriaId: 1,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/productos/registrar",
        nuevoProducto,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      get_productos(); // Recarga la lista de productos
    } catch (err) {
      console.error("Error al crear el producto:", err);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-4xl">Productos:</h1>
        <div className="flex gap-2">
          <button
            type="submit"
            onClick={onSubmitCreate}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:text-sm"
          >
            Crear
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos && productos.length > 0 ? (
          productos.map((producto) => (
            <Link
              to={`/productos/${producto.id}`}
              key={producto.id}
              className="bg-white shadow-md"
            >
              <LoadingCard />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {producto.nombre}
                </h2>
                <p className="text-gray-600">{producto.descripcion}</p>
                <p className="text-gray-900 font-bold mt-2">
                  ${producto.precioUnitario}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productos: state.productos.productos,
});

export default connect(mapStateToProps, { get_productos })(Productos);

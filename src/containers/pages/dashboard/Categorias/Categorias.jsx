import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get_categorias } from "../../../../redux/actions/categorias/categorias";
import { Link } from "react-router-dom";
import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Categorias = ({ get_categorias, categorias }) => {
  useEffect(() => {
    get_categorias();
  }, [get_categorias]);

  // Función para generar nombres únicos sin números
  const generateUniqueName = () => {
    const prefixes = ["Super", "Mega", "Eco", "Max", "Quick", "Pro"];
    const suffixes = ["Plus", "Fresh", "Express", "Prime", "Green", "Ultra"];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${randomPrefix}${randomSuffix}`;
  };

  const onSubmitCreate = async () => {
    const nombreUnico = generateUniqueName(); // Genera un nombre único

    const nuevaCategoria = {
      nombre: nombreUnico,
      descripcion: "Descripción de categoría",
      estaActivo: true,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/categorias/registrar",
        nuevaCategoria,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      get_categorias();
    } catch (err) {
      console.error("Error al crear la categoría:", err);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-4xl">Categorías:</h1>
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

      {categorias && categorias.length > 0 ? (
        <div className="w-full">
          <div className="grid grid-cols-3 font-bold text-lg border-b-2 border-gray-200 pb-2 mb-2">
            <span>Editar</span>
            <span>Nombre</span>
            <span>Descripción</span>
          </div>

          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className="grid grid-cols-3 items-center border-b border-gray-200 py-2"
            >
              <Link to={`/categoria/${categoria.id}`} className="flex">
                <PencilSquareIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </Link>
              <span className="text-gray-800">{categoria.nombre}</span>
              <span className="text-gray-600">{categoria.descripcion}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-4xl font-bold text-gray-800">
          No hay categorías
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  categorias: state.categorias.categorias,
});

export default connect(mapStateToProps, { get_categorias })(Categorias);

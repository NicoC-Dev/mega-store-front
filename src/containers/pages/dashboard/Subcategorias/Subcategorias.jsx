import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get_subcategorias } from "../../../../redux/actions/subcategorias/subcategorias";
import { Link } from "react-router-dom";
import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Subcategorias = ({ get_subcategorias, subcategorias }) => {
  useEffect(() => {
    get_subcategorias();
  }, [get_subcategorias]);

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
    const categoriaId = 1;
    const nuevaSubcategoria = {
      nombre: nombreUnico,
      descripcion: "Descripción de subcategoría",
      estaActivo: true,
      categoriaId: categoriaId,
    };

    try {
      await axios.post(
        `http://localhost:8080/api/subcategorias/registrar`,
        nuevaSubcategoria,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      get_subcategorias();
    } catch (err) {
      console.error("Error al crear la subcategoría:", err);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-4xl">Subcategorías:</h1>
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

      {subcategorias && subcategorias.length > 0 ? (
        <div className="w-full">
          <div className="grid grid-cols-3 font-bold text-lg border-b-2 border-gray-200 pb-2 mb-2">
            <span>Editar</span>
            <span>Nombre</span>
            <span>Descripción</span>
          </div>

          {subcategorias.map((subcategoria) => (
            <div
              key={subcategoria.id}
              className="grid grid-cols-3 items-center border-b border-gray-200 py-2"
            >
              <Link to={`/subcategoria/${subcategoria.id}`} className="flex">
                <PencilSquareIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </Link>
              <span className="text-gray-800">{subcategoria.nombre}</span>
              <span className="text-gray-600">{subcategoria.descripcion}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-4xl font-bold text-gray-800">
          No hay subcategorías
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  subcategorias: state.subcategorias.subcategorias,
});

export default connect(mapStateToProps, { get_subcategorias })(Subcategorias);

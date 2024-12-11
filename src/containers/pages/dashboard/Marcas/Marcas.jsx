import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get_marcas } from "../../../../redux/actions/marcas/marcas";
import { Link } from "react-router-dom";
import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Marcas = ({ get_marcas, marcas }) => {
  useEffect(() => {
    get_marcas();
  }, [get_marcas]);

  const onSubmitCreate = async () => {
    const nuevaMarca = {
      nombre: `Marca`,
      descripcion: "default",
      estaActivo: true,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/marcas/registrar",
        nuevaMarca,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      get_marcas();
    } catch (err) {
      console.error("Error al crear la marca:", err);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-4xl">Marcas:</h1>
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

      {marcas && marcas.length > 0 ? (
        <div className="w-full">
          <div className="grid grid-cols-3 font-bold text-lg border-b-2 border-gray-200 pb-2 mb-2">
            <span>Editar</span>
            <span>Nombre</span>
            <span>Descripción</span>
          </div>

          {marcas.map((marca) => (
            <div
              key={marca.id}
              className="grid grid-cols-3 items-center border-b border-gray-200 py-2"
            >
              <Link to={`/marcas/${marca.id}`} className="flex">
                <PencilSquareIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </Link>
              <span className="text-gray-800">{marca.nombre}</span>
              <span className="text-gray-600">{marca.descripcion}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-4xl font-bold text-gray-800">No hay marcas</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  marcas: state.marcas.marcas,
});

export default connect(mapStateToProps, { get_marcas })(Marcas);

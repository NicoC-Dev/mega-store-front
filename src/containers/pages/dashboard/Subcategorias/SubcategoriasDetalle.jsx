import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { get_subcategorias_detail } from "../../../../redux/actions/subcategorias/subcategorias";
import { get_categorias } from "../../../../redux/actions/categorias/categorias";
import { useParams } from "react-router-dom";
import axios from "axios";

function SubcategoriaDetalle({
  get_subcategorias_detail,
  subcategoria,
  get_categorias,
  categorias,
}) {
  const params = useParams();
  const id = params.id;

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    get_categorias();
  }, [get_categorias]);

  useEffect(() => {
    if (subcategoria) {
      setNombre(subcategoria.nombre);
      setDescripcion(subcategoria.descripcion);
      setCategoriaSeleccionada(subcategoria.categoria?.id || "");
    }
  }, [subcategoria]);

  useEffect(() => {
    get_subcategorias_detail(id);
  }, [get_subcategorias_detail, id]);

  const onSubmitDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/subcategorias/eliminar/${id}`
      );
      window.location.reload(); // Recarga la página para reflejar el cambio
    } catch (err) {
      setErrorMessage("Error al eliminar la subcategoría.");
      setShowModalError(true);
    }
  };

  const onSubmitReactive = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/subcategorias/reactivar/${id}`
      );
      window.location.reload(); // Recarga la página para reflejar el cambio
    } catch (err) {
      setErrorMessage("Error al reactivar la subcategoría.");
      setShowModalError(true);
    }
  };

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/subcategorias/actualizar/${id}`,
        {
          nombre,
          descripcion,
          categoriaId: categoriaSeleccionada,
        }
      );
      get_subcategorias_detail(id);
      setShowModalSuccess(true);
    } catch (err) {
      setErrorMessage("Error al actualizar la subcategoría.");
      setShowModalError(true);
    }
  };

  const onCancel = () => {
    setNombre(subcategoria.nombre);
    setDescripcion(subcategoria.descripcion);
    setCategoriaSeleccionada(subcategoria.categoria?.id || "");
  };

  const closeModal = () => {
    setShowModalError(false);
    setShowModalSuccess(false);
    setErrorMessage("");
  };

  // Verifica si categorias está disponible y es un array
  const categoriasDisponibles = Array.isArray(categorias) ? categorias : [];

  return (
    <div>
      {subcategoria ? (
        <div className="p-4 min-h-screen">
          <div className="flex justify-between">
            <div className="text-4xl font-bold">{subcategoria.nombre}</div>
            <div className="flex gap-2">
              {subcategoria.estaActivo ? (
                <button
                  type="submit"
                  onClick={onSubmitDelete}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:text-sm"
                >
                  <span>Eliminar</span>
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={onSubmitReactive}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm"
                >
                  <span>Mostrar</span>
                </button>
              )}
            </div>
          </div>

          <form onSubmit={onSubmitUpdate} className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className=" p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="categoria"
                className="block text-sm font-medium text-gray-700"
              >
                Categoría
              </label>
              <select
                id="categoria"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                {categoriasDisponibles.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="inline-flex w-full py-2 justify-center rounded-md border border-transparent bg-blue-600 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
              >
                Actualizar
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="inline-flex w-full py-2 justify-center rounded-md border border-transparent bg-gray-500 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>

          {showModalError && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Error</h2>
                <p>{errorMessage}</p>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {showModalSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Éxito</h2>
                <p>La subcategoría se ha actualizado correctamente.</p>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>Esta subcategoría no existe o fue eliminada</>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  subcategoria: state.subcategorias.subcategoria,
  categorias: state.categorias.categorias,
});

export default connect(mapStateToProps, { get_subcategorias_detail, get_categorias })(SubcategoriaDetalle);

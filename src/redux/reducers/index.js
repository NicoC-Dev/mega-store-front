import { combineReducers } from "redux";
import marcas from "./marcas";
import categorias from "./categorias";
import subcategorias from "./subcategorias";
import productos from "./productos";

export default combineReducers({
  marcas,
  categorias,
  subcategorias,
  productos,
});

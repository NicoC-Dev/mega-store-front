import {
  GET_SUBCATEGORIAS_SUCCES,
  GET_SUBCATEGORIAS_FAIL,
  GET_SUBCATEGORIAS_DETAIL_SUCCES,
  GET_SUBCATEGORIAS_DETAIL_FAIL,
} from "../actions/subcategorias/types";

const initialState = {
  subcategoria: null,
  subcategorias: null, // Cambiado de 'categorias' a 'subcategorias'
};

export default function subcategoriasReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBCATEGORIAS_SUCCES:
      return {
        ...state,
        subcategorias: payload, // Cambiado de 'categorias' a 'subcategorias'
      };
    case GET_SUBCATEGORIAS_FAIL:
      return {
        ...state,
        subcategorias: null,
      };
    case GET_SUBCATEGORIAS_DETAIL_SUCCES:
      return {
        ...state,
        subcategoria: payload,
      };
    case GET_SUBCATEGORIAS_DETAIL_FAIL:
      return {
        ...state,
        subcategoria: null,
      };
    default:
      return state;
  }
}

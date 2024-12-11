import {
  GET_CATEGORIAS_SUCCES,
  GET_CATEGORIAS_FAIL,
  GET_CATEGORIAS_DETAIL_SUCCES,
  GET_CATEGORIAS_DETAIL_FAIL,
} from "../actions/categorias/types";

const initialState = {
  categoria: null,
  categorias: null
};

export default function categorias(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIAS_SUCCES:
      return {
        ...state,
        categorias: payload
      };
    case GET_CATEGORIAS_FAIL:
      return {
        ...state,
        categorias: null
      };
    default:
      return state;
    case GET_CATEGORIAS_DETAIL_SUCCES:
      return {
        ...state,
        categoria: payload
      };
    case GET_CATEGORIAS_DETAIL_FAIL:
      return {
        ...state,
        categoria: null
      };
  }
}
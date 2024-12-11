import {
  GET_MARCAS_SUCCES,
  GET_MARCAS_FAIL,
  GET_MARCAS_DETAIL_SUCCES,
  GET_MARCAS_DETAIL_FAIL,
} from "../actions/marcas/types";

const initialState = {
  marca: null,
  marcas: null
};

export default function marcas(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MARCAS_SUCCES:
      return {
        ...state,
        marcas: payload
      };
    case GET_MARCAS_FAIL:
      return {
        ...state,
        marcas: null
      };
    default:
      return state;
    case GET_MARCAS_DETAIL_SUCCES:
      return {
        ...state,
        marca: payload
      };
    case GET_MARCAS_DETAIL_FAIL:
      return {
        ...state,
        marca: null
      };
  }
}
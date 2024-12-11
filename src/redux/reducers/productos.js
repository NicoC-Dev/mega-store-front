import {
  GET_PRODUCTOS_SUCCES,
  GET_PRODUCTOS_FAIL,
  GET_PRODUCTOS_DETAIL_SUCCES,
  GET_PRODUCTOS_DETAIL_FAIL,
} from "../actions/productos/types";

const initialState = {
  producto: null,
  productos: null,
};

export default function productosReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTOS_SUCCES:
      return {
        ...state,
        productos: payload,
      };
    case GET_PRODUCTOS_FAIL:
      return {
        ...state,
        productos: null,
      };
    case GET_PRODUCTOS_DETAIL_SUCCES:
      return {
        ...state,
        producto: payload,
      };
    case GET_PRODUCTOS_DETAIL_FAIL:
      return {
        ...state,
        producto: null,
      };
    default:
      return state;
  }
}

import axios from "axios";
import {
  GET_PRODUCTOS_SUCCES,
  GET_PRODUCTOS_FAIL,
  GET_PRODUCTOS_DETAIL_SUCCES,
  GET_PRODUCTOS_DETAIL_FAIL,
} from "./types";

export const get_productos = () => async (dispatch) => {
  const config = {
    headers: {
      accept: "application/json",
    },
  };

  try {
    const res = await axios.get("http://localhost:8080/api/productos/listar");
    if (res.status === 200) {
      dispatch({
        type: GET_PRODUCTOS_SUCCES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_PRODUCTOS_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_PRODUCTOS_FAIL,
    });
  }
};

export const get_productos_detail = (id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `http://localhost:8080/api/productos/buscar/${id}`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_PRODUCTOS_DETAIL_SUCCES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_PRODUCTOS_DETAIL_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_PRODUCTOS_DETAIL_FAIL,
    });
  }
};

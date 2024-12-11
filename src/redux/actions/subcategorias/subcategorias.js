import axios from "axios";
import {
  GET_SUBCATEGORIAS_SUCCES,
  GET_SUBCATEGORIAS_FAIL,
  GET_SUBCATEGORIAS_DETAIL_SUCCES,
  GET_SUBCATEGORIAS_DETAIL_FAIL,
} from "./types";

export const get_subcategorias = () => async (dispatch) => {
  const config = {
    headers: {
      accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      "http://localhost:8080/api/subcategorias/listar"
    );
    if (res.status === 200) {
      dispatch({
        type: GET_SUBCATEGORIAS_SUCCES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_SUBCATEGORIAS_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SUBCATEGORIAS_FAIL,
    });
  }
};

export const get_subcategorias_detail = (id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `http://localhost:8080/api/subcategorias/buscar/${id}`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_SUBCATEGORIAS_DETAIL_SUCCES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_SUBCATEGORIAS_DETAIL_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SUBCATEGORIAS_DETAIL_FAIL,
    });
  }
};

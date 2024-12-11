import axios from "axios";
import {
  GET_CATEGORIAS_SUCCES,
  GET_CATEGORIAS_FAIL,
  GET_CATEGORIAS_DETAIL_SUCCES,
  GET_CATEGORIAS_DETAIL_FAIL,
} from "./types";

export const get_categorias = () => async (dispatch) => {
  const config = {
    headers: {
      accept: "application/json",
    },
  };

  try {
    const res = await axios.get("http://localhost:8080/api/categorias/listar");
    if (res.status === 200) {
      dispatch({
        type: GET_CATEGORIAS_SUCCES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_CATEGORIAS_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_CATEGORIAS_FAIL,
    });
  }
};

export const get_categorias_detail = (id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `http://localhost:8080/api/categorias/${id}`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_CATEGORIAS_DETAIL_SUCCES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_CATEGORIAS_DETAIL_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_CATEGORIAS_DETAIL_FAIL,
    });
  }
};

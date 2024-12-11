import axios from "axios";
import {
  GET_MARCAS_SUCCES,
  GET_MARCAS_FAIL,
  GET_MARCAS_DETAIL_SUCCES,
  GET_MARCAS_DETAIL_FAIL,
} from "./types";

export const get_marcas = () => async (dispatch) => {
  const config = {
    headers: {
      accept: "application/json",
    },
  };

  try {
    const res = await axios.get("http://localhost:8080/api/marcas/listar");
    if (res.status === 200) {
      dispatch({
        type: GET_MARCAS_SUCCES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_MARCAS_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_MARCAS_FAIL,
    });
  }
};

export const get_marca_detail = (id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `http://localhost:8080/api/marcas/${id}`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_MARCAS_DETAIL_SUCCES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_MARCAS_DETAIL_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_MARCAS_DETAIL_FAIL,
    });
  }
};

import axios from 'axios'

export const detailUser = (iduser) => async (dispatch) => {
    try {
      dispatch({ type: "GET_DETAIL_PENDING" });
      const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}/user/${iduser}`);
      console.log(result);
      const detail = result.data.data
      dispatch({type: "GET_PRODUCT_SUCCESS", payload: detail})
    } catch (error) {
      console.log(error);
    }
  };
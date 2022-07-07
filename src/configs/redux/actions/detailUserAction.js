import axios from 'axios'

export const detailUser = (iduser) => async (dispatch) => {
    try {
      dispatch({ type: "GET_DETAIL_PENDING" });
      const result = await axios(`${process.env.REACT_APP_API_BACKEND}/user/${iduser}`);
      console.log(result);
      dispatch({
        type: "GET_DETAIL_SUCCESS",
        payload: result.data
      });
    } catch (error) {
      console.log(error);
    }
  };
const initialState = {
  isLoading: false,
  data: []
};

const detailUser = (state = initialState, action) => {
  switch (action.type) {
     case "GET_DETAIL_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_DETAIL_SUCCESS":
      return {
        ...state,
        detail: action.payload,
        isLoading: false,
      };
    case "GET_DETAIL_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default detailUser;

import { STORE_ORDER_DATA } from '../actionTypes';

const initialState = {
  data: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ORDER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
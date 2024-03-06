import { SHOW_LOADING } from "../actions/types";

const initialState = {
   loading:false
};

export default function reducer(state = initialState, action) {
    const { type,payload } = action
    switch (type) {
      case SHOW_LOADING:
        return { ...state, loading:payload};
      default:
        return state;
    }
  }
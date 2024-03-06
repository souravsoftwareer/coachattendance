import { GET_ATTENDANCE_COUNT } from "../actions/types";

const initialState = {
  logged: false,
  data: {
    totalcount:0,
    currentweek:0,
    currentmonth:0,
    data:[]
  },

};

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  // showMessage("action===>",action)

  switch (type) {
    case GET_ATTENDANCE_COUNT:
      return { ...state, data: payload };
   
    default:
      return state;
  }
}
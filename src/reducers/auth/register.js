import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_DATA, GET_GAMES, GET_TRAINING_CENTER } from "../../actions/types";

import moment from 'moment'

const initialState = {
  logged: false,
  user: {
    name: '',
    email: '',
    phone: '',
    photo: '',
    gender: true,
    group: '',
    providerId: '',
    providerType: '',
    token:'',
    designation:'',
    adhar_number:'',
    training_center:'',
    games:'',
    dob: new Date()
  },
  games:[],
  training_center:[]
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  // showMessage("action===>",action)

  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, logged: true };
    case LOGOUT_SUCCESS:
      return { ...state, logged: false };
    case REGISTER_DATA:
      return { ...state, user: payload };
    case GET_GAMES:
      return { ...state, games: payload }
    case GET_TRAINING_CENTER:
      return { ...state, training_center: payload }
    default:
      return state;
  }
}
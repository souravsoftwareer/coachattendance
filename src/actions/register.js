import { getApi } from "../api"
import AppUtils from "../utils/AppUtils"
import { showLoading } from "./loader"
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_DATA, GET_GAMES, GET_TRAINING_CENTER } from "./types"

export const loginSuccess = (logged) => async dispatch => {
    return dispatch({
        payload: logged,
        type: logged?LOGIN_SUCCESS:LOGOUT_SUCCESS
    })
}


export const updateUserData = (data) => async dispatch => {
  return dispatch({
    payload: data,
    type: REGISTER_DATA
  })
}

/**
 * 
 * @param {data,successCb,failureCb} param0 
 */
 export const sendOtp = ({
    data,
    successCb,
    failureCb
  }) => async dispatch => {
    let config = {
      method: 'POST',
      endpoint: "/loginUserWithMobileNumber",
      // headers,
      data
    }
    dispatch(showLoading(true))
    getApi(config)
      .then((res) => {
        dispatch(showLoading(false))
        AppUtils.showMessage("res ====>", res)
        if (res.statusCode === 200) {
          if (typeof successCb === 'function') {
            successCb(res.data)
  
  
          }
        }
        else {
          if (typeof failureCb === 'function') {
            failureCb(res)
          }
        }
  
  
      })
      .catch((res) => {
        dispatch(showLoading(false))
        if (typeof failureCb === 'function') {
          failureCb(res)
        }
      })
  
  }

/**
 * 
 * @param {data,successCb,failureCb} param0 
 */
 export const userLogout = ({
    data,
    successCb,
    failureCb
  }) => async dispatch => {
    let config = {
      method: 'POST',
      endpoint: "/userLogOut",
      // headers,
      data
    }
    dispatch(showLoading(true))
    getApi(config)
      .then((res) => {
        dispatch(showLoading(false))
        AppUtils.showMessage("res ====>", res)
        if (res.statusCode === 200) {
          if (typeof successCb === 'function') {
            successCb(res.data)
  
  
          }
        }
        else {
          if (typeof failureCb === 'function') {
            failureCb(res)
          }
        }
  
  
      })
      .catch((res) => {
        dispatch(showLoading(false))
        if (typeof failureCb === 'function') {
          failureCb(res)
        }
      })
  
  }

/**
 * 
 * @param {data,successCb,failureCb} param0 
 */
 export const verifyUserOtp = ({
    data,
    successCb,
    failureCb
  }) => async dispatch => {
    let config = {
      method: 'POST',
      endpoint: "/verifyotp",
      // headers,
      data
    }
    dispatch(showLoading(true))
    getApi(config)
      .then((res) => {
        dispatch(showLoading(false))
        AppUtils.showMessage("res ====>", res)
        if (res.statusCode === 200) {
          if (typeof successCb === 'function') {
            successCb(res.data)
  
  
          }
        }
        else {
          if (typeof failureCb === 'function') {
            failureCb(res)
          }
        }
  
  
      })
      .catch((res) => {
        dispatch(showLoading(false))
        if (typeof failureCb === 'function') {
          failureCb(res)
        }
      })
  
  }


  export const registerUser = ({
    data,
    successCb,
    failureCb
  }) => async dispatch => {
    let config = {
      method: 'POST',
      endpoint: "register",
      // headers,
      data
    }
    dispatch(showLoading(true))
    getApi(config)
      .then((res) => {
        dispatch(showLoading(false))
  
        if (res.statusCode === 200) {
          if (typeof successCb === 'function') {
            successCb(res.data)
          }
        }
        else {
          if (typeof failureCb === 'function') {
            failureCb(res.data)
          }
  
        }
  
  
      })
      .catch((res) => {
        dispatch(showLoading(false))
        if (typeof failureCb === 'function') {
          failureCb(res)
        }
      })
  
  };
  
  export const getGamesOrTrainingCenter = ({
    data,
    type,
    successCb,
    failureCb
  }) => async dispatch => {
    let config = {
      method: 'POST',
      endpoint: "get_all_recors_by_table_name",
      // headers,
      data
    }
    dispatch(showLoading(true))
    getApi(config)
      .then((res) => {
        dispatch(showLoading(false))
  
        if (res.statusCode === 200) {
          if (typeof successCb === 'function') {
            successCb(res.data)
            let resData = res.data.data
            let results = []
            if(Array.isArray(resData) && resData.length>0) {
               resData.map((ite)=>{
                 if(type === 'games') {
                  results.push({
                    id:ite.game_id,
                    name:ite.game_name
                  })
                 }else{
                  results.push({
                    id:ite.plg_id,
                    name:ite.plg_name
                  })
                 }
                  
               })
            } 
            if(type === 'games') {
              dispatch({type:GET_GAMES,payload:results})
            }else{
              dispatch({type:GET_TRAINING_CENTER,payload:results})
            }

            AppUtils.showMessage("respults ===>",results)
          }
        }
        else {
          if (typeof failureCb === 'function') {
            failureCb(res.data)
          }
          if(type === 'games') {
            dispatch({type:GET_GAMES,payload:[]})
          }else{
            dispatch({type:GET_TRAINING_CENTER,payload:[]})
          }
        }
    
      })
      .catch((res) => {
        AppUtils.showMessage("error ==>",res)
        dispatch(showLoading(false))
        if (typeof failureCb === 'function') {
          failureCb(res)
        }
        if(data.table_name === 'games') {
          dispatch({type:GET_GAMES,payload:[]})
        }else{
          dispatch({type:GET_TRAINING_CENTER,payload:[]})
        }
      })
  };
  
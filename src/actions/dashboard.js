import { getApi, uploadImg } from "../api"
import AppUtils from "../utils/AppUtils"
import { showLoading } from "./loader"
import { GET_ATTENDANCE_COUNT } from "./types";
import { USER_DATA } from "../constants/variables";

/**
 * getAttendance data
 * @param {data,successCb,failureCb} param0 
 */

export const getAttendanceData = ({
  data,
  successCb,
  failureCb
}) => async dispatch => {
  let headers = await AppUtils.getAuthHeader()
  AppUtils.showMessage("attendance header ",headers)
  let config = {
    method: 'GET',
    endpoint: `getAttendace`,
    headers
  }
  dispatch(showLoading(true))
  getApi(config)
    .then((res) => {
      dispatch(showLoading(false))
      AppUtils.showMessage("res ====>", res)
      if (res.statusCode === 200) {
        if (typeof successCb === 'function') {
          successCb(res.data)
          if (res.data && res.data.status) {
            let payload = {
              totalcount: res.data.totalcount,
              currentmonth: res.data.currentmonth,
              currentweek: res.data.currentweek,
              data: res.data.data
            }
            dispatch({ type: GET_ATTENDANCE_COUNT, payload })
          }
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
 * mark an attendance
 * @param {data,successCb,failureCb} param0 
 */

export const markAttendanceIn = ({
  data,
  user,
  successCb,
  failureCb
}) => async dispatch => {
  let headers = AppUtils.getMultipartHeaders()
  
  let config = {
    method: 'POST',
    // endpoint: `markAttendance?user_id=${user.users_id}`,
    endpoint: `markAttendance`,
    headers,
    data
  }
  dispatch(showLoading(true))
  uploadImg(config)
    .then((res) => {
      dispatch(showLoading(false))
      AppUtils.showMessage("res ====>", res)
      if (res) {
        if (res.statusCode === 200) {
          if (typeof successCb === 'function') {

            if (res.data && res.status) {
              successCb(res)
            } else {
              failureCb(res)
            }
          }
        }
        else {
          if (typeof failureCb === 'function') {
            failureCb(res)
          }
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
 * mark an attendance out
 * @param {data,successCb,failureCb} param0 
 */

export const markAttendanceOut = ({
  data,
  user,
  successCb,
  failureCb
}) => async dispatch => {
  let headers = await AppUtils.getMultipartHeaders()
  let config = {
    method: 'POST',
    // endpoint: `markAttendanceOut?user_id=${user.users_id}`,
    endpoint: `markAttendanceOut`,
    headers,
    data
  }
  dispatch(showLoading(true))
  uploadImg(config)
    .then((res) => {
      dispatch(showLoading(false))
      AppUtils.showMessage("res ====>", res)
      if (res.statusCode === 200) {
        if (typeof successCb === 'function') {

          if (res.data && res.status) {
            // let payload = {
            //    totalcount:res.data.totalcount,
            //    currentmonth:res.data.currentmonth,
            //    currentweek:res.data.currentweek,
            //    data:res.data.data
            // }
            // dispatch({type:GET_ATTENDANCE_COUNT,payload})
            successCb(res)
          } else {
            failureCb(res)
          }
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
 * add attendance remark
 * @param {data,successCb,failureCb} 
 */

export const attendanceRemark = ({
  data,
  successCb,
  failureCb
}) => async dispatch => {
  let headers = await AppUtils.getAuthHeader()
  let user = await AppUtils.reteriveItem(USER_DATA)
  let config = {
    method: 'POST',
    endpoint: `add_remark`,
    // endpoint: `add_remark?user_id=${user.users_id}`,
    headers,
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
 * update fcm token
 * @param {data,successCb,failureCb} 
 */

export const updateFcmToken = ({
  data,
  successCb,
  failureCb
}) => async dispatch => {
  let headers = await AppUtils.getAuthHeader()
  let user = await AppUtils.reteriveItem(USER_DATA)
  let config = {
    method: 'POST',
    endpoint: `updateUserFcmToken?user_id=${user.users_id}`,
    headers,
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
 * update history api
 * @param {data,successCb,failureCb} 
 */

export const updateHistory = ({
  data,
  successCb,
  failureCb
}) => async dispatch => {
  let headers = await AppUtils.getAuthHeader()
  
  let config = {
    method: 'POST',
    endpoint: `createHistory`,
    headers,
    data
  }
  // dispatch(showLoading(true))
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
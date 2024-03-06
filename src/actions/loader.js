import { SHOW_LOADING } from "./types";

export const showLoading = (loading) => async dispatch => {
    dispatch({
        payload: loading,
        type: SHOW_LOADING
    })
}
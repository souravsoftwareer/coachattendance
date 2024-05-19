import { isConsoleMessage } from "./config";
import { ToastAndroid } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_DATA, TOKEN } from "../constants/variables";
import store from './../store'

const AppUtils = {
    sleep: async (milliseconds) => {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds)
        });
    },
    /**
     * show console messages
     */

    showMessage: (key, message) => {
        if (isConsoleMessage) {
            if (key)
                console.log(key);
            if (key && message) {
                console.log(key, message)
            }

        }
    },
    showToast: ({
        message
    }) => {
        ToastAndroid.show(message, ToastAndroid.LONG)
    },
    validatePhone: (phone) => {
        var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(phone)
    },
    storeItem: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (err) {
            AppUtils.showMessage("unable to save data in async", err)
        }

    },
    reteriveItem: async (key) => {
        try {
            let data = await AsyncStorage.getItem(key)
            if (data) {
                data = JSON.parse(data)
            }
            return data
        } catch (err) {
            AppUtils.showMessage("unable to read data from async", err)
        }

    },
    reteriveString: async (key) => {
        try {
            let data = await AsyncStorage.getItem(key)
            // if (data) {
            //     data = JSON.parse(data)
            // }
            return data
        } catch (err) {
            AppUtils.showMessage("unable to read data from async", err)
        }

    },
    removeItem: async (key) => {
        try {
            let data = await AsyncStorage.removeItem(key)

            return data
        } catch (err) {
            AppUtils.showMessage("unable to remove data from async", err)
        }

    },
    getMultipartHeaders: () => {
        let commonHeaders = {
            'Content-Type': 'multipart/form-data'
        }
        let registerData = store.getState().register.user
        // let token = await AppUtils.reteriveString(TOKEN)
        let token = registerData.token
        // alert(token)
        
        if (token) {
            commonHeaders = {
                ...commonHeaders,
                'Authorization': `Bearer ${token}`
            }
        }
        return commonHeaders
    },
    getAuthHeader: async() => {
        let registerData = store.getState().register.user
        let token = await AppUtils.reteriveString(TOKEN)
        // let token = registerData.token
        // alert(token)
        let headers = {
        }
        if (token) {
            headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        // alert(token)
        return headers
    },
    parseMessage:(message)=>{
     let result = ""   
     let values = Object.values(message)
     if(values.length>0) {
       result = values.join("\n") 
     }
     return result
    }
}

export default AppUtils
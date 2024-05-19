import axios from 'axios'

import RNFetchBlob from 'rn-fetch-blob'
import AppUtils from '../utils/AppUtils'

export const baseUrl = "https://hrhk.in/demo/sportsapp/api/"

export const getApi = (config) => {

    return new Promise((resolve, reject) => {
        let url = baseUrl + config.endpoint
        // AppUtils.showMessage("url ==========> ",url)
        const options = {
            method: config.method,
            url:  url,
            headers: config.headers,
            data: config.data,
            timeout: 70000
        }
        // AppUtils.showMessage('config', config)
        axios(options)
            .then(async (response) => {
                // AppUtils.showMessage('reponnnn', response)

                // alert(config.url)
                let json = {
                    statusCode: response.status,
                    data: response.data?response.data:{},
                    
                }

                resolve(json);
            })
            .catch(async (error) => {
                // console.log(error.response)
                // AppUtils.showMessage('error ====>',error)
                let response = error.response
                //   resolve(101, error.message);
                // alert(config.url)
                AppUtils.showMessage('error',error)
                let json = {
                    statusCode: response && response.status?response.status:101,
                    status: response && response.data ? response.data : false
                    
                }

                resolve(json)
            });

    })
}

export const thirdPartyApi = (config) => {

    return new Promise((resolve, reject) => {

        const options = {
            method: config.method,
            url:  config.endpoint,
            headers: config.headers,
            data: config.data,
            timeout: 70000
        }
        AppUtils.showMessage('config', options)
        axios(options)
            .then(async (response) => {
                AppUtils.showMessage('reponnnn', response)

                // alert(config.url)
                let json = {
                    statusCode: response.status,
                    data: response.data?response.data:{},
                    
                }

                resolve(json);
            })
            .catch(async (error) => {
                // console.log(error.response)
                // AppUtils.showMessage('error',error)
                let response = error.response
                //   resolve(101, error.message);
                // alert(config.url)
                AppUtils.showMessage('error',response)
                let json = {
                    statusCode: response.status?response.status:101,
                    status: response.data ? response.data : false
                    
                }

                resolve(json)
            });

    })
}


export const uploadImg = (config) => {

    let url = baseUrl + config.endpoint
    return new Promise((resolve, reject) => {
        RNFetchBlob.fetch(config.method, url, config.headers, config.data)
            .then((resp) => {
                let status = resp.info().status;
                let response = resp.json()
                // alert(config.url)
                AppUtils.showMessage('upload resp', response)
                AppUtils.showMessage('status', status)

                if (status != 200) {
                    let json = {
                        statusCode: status ? status : 200,
                        message:'Something went wrong'
                    }
                    resolve(json)
                }
                else{
                    let json = {
                        statusCode: status ? status : 200,
                        status: response.status,
                        data: response.data?response.data:{},
                        message: response.message
                    }
                    resolve(json)
                }

                // resolve(json);
            }).catch((errorMessage, statusCode) => {
                AppUtils.showMessage('upload err', errorMessage)
                let json = {
                    status: statusCode,
                    message:'Something went wrong'
                }
                resolve(json)
            })
    })
}
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    Keyboard
} from 'react-native'
import back from '../../assets/images/parts/login_back.png'
import login from '../../assets/images/calendar.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BLOOD_COLORS from '../../constants/colors';
import { IconSets } from '../../components/Icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
import CoachInput from '../../components/CoachInput';
import Header from '../../components/Header';
import SimpleButton from '../../components/SimpleButton';
import VerifyOtp from '../../modals/VerifyOtp';
import AppUtils from '../../utils/AppUtils';
import { sendOtp, updateUserData, loginSuccess, verifyUserOtp } from '../../actions/register';
import { USER_DATA, TOKEN } from '../../constants/variables';

function LoginScreen({ navigation }) {

    let register = useSelector(state => state.register)
    let loader = useSelector(state => state.loader)
    let registerData = register.user
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [otp, setOtp] = useState('')
    const [currUser, setCurrUser] = useState(false)

    function onChange(type, data) {
        // alert(data)
        registerData[type] = data
        dispatch(updateUserData(registerData))
    }

    async function onVerify(userOtp) {

        if (userOtp === '' || userOtp.length < 4) {
            AppUtils.showToast({ message: 'Please enter valid otp ' })
            return
        }
        let number = registerData.phone
        let formData = new FormData()
        formData.append("phone", number)
        formData.append("otp", userOtp)
        setShow(true)
        dispatch(verifyUserOtp({
            data: formData,
            successCb: async (response) => {
                setShow(false)
                AppUtils.showMessage("response here ===>", response)
                if (response.data) {
                    let data = response.data
                    if (currUser) {
                        onChange('token', data.jwt_token)
                        AppUtils.showMessage("token ===>",data.jwt_token)
                        if(data.jwt_token) {
                        await AppUtils.storeItem(TOKEN, data.jwt_token)
                        await AppUtils.storeItem(USER_DATA, JSON.stringify(data))
                        dispatch(loginSuccess(true))
                        }
                        return
                    }
                    navigation.navigate('Register')
                } else{
                    AppUtils.showToast({message:"Otp did not match"})
                }

            },
            failureCb: (response) => {
                setShow(false)
                AppUtils.showMessage("failure response", response)
                AppUtils.showToast({message:"Otp did not match"})
            }
        }))
        // if(otp!=userOtp) {
        //     AppUtils.showToast({message:'Otp does not match'})
        //     return
        // }
        // setShow(false)
        // if(currUser!=null) {
        //     await AppUtils.storeItem(USER_DATA,JSON.stringify(currUser))
        //     dispatch(loginSuccess(true))

        //     return    
        // }
        // navigation.navigate('Register')
    }

    function signInWithPhoneNumber(isResend) {

        try {
            let number = registerData.phone
            //   alert(number)    
            if (number === '') {
                AppUtils.showToast({ message: 'Phone number should not be empty' })
                return
            }
            if (!AppUtils.validatePhone(number)) {
                AppUtils.showToast({ message: 'Please enter valid phone number' })
                return
            }

            Keyboard.dismiss()
            let formData = new FormData()
            formData.append("phone", number)
            dispatch(sendOtp({
                data: formData,
                successCb: async (response) => {
                    AppUtils.showToast({ message: "One time password is sent!!!" })
                    
                    AppUtils.showMessage("response here ===>",response)
                    
                    if (response) {
                        let status = response.status
                        if (status)
                            setCurrUser(true)
                    }
                    if (!isResend) {
                        setShow(true)
                    }
                },
                failureCb: (response) => {
                    AppUtils.showMessage("failure response", response)
                    AppUtils.showToast({ message: "Unable to send otp" })
                }
            }))
        } catch (err) {
            AppUtils.showToast({ message: error.message })
            Keyboard.dismiss()
        }

    }

    return (
        <View style={styles.container1}>
            <ImageBackground style={styles.back} source={back}>
                <Image source={login} style={styles.loginImg} />
                <Text style={styles.loginText}>LOGIN & REGISTER</Text>

            </ImageBackground>
            <View style={styles.container}>
                <View style={styles.body}>

                    <CoachInput
                        placeholder={'Enter phone number'}
                        containerStyle={{ marginTop: hp('4%') }}
                        keyboardType={'numeric'}
                        value={registerData.phone}
                        onChangeText={(text) => onChange('phone', text)}
                    />
                    <SimpleButton
                        title={'Next'}
                        containerStyle={{ marginTop: hp('4%') }}
                        onPress={() => signInWithPhoneNumber(false)}
                    />
                </View>
            </View>

            <VerifyOtp
                show={show}
                onClosed={() => setShow(false)}
                onVerify={(code) => onVerify(code)}
            // onResend={() => signInWithPhoneNumber(true)}
            />
            <Spinner
                visible={loader.loading}
                textContent={''}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%'
    },
    body: {
        paddingHorizontal: '6%',
        paddingVertical: '3%'
    },
    verifyText: {
        fontFamily: FONTS.BOLD
    },
    container1: {
        height: '100%',
        backgroundColor: COLORS.WHITE,
        alignItems: 'center'
    },
    back: {
        width: '100%',
        // height: '70%',
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center'

    },
    loginImg: {
        resizeMode: 'contain',
        height: 200,
        width: 130,
        alignSelf: 'center'
        // marginTop: 50
    },
    loginText: {
        paddingVertical: '5%',
        fontFamily: FONTS.SEMI_BOLD
    },
    buttonGroup: {
        width: '60%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '10%'
        //    backgroundColor:'blue'
    }

})

export default LoginScreen
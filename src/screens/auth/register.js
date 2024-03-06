import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import COLORS from '../../constants/colors';
import Header from './../../components/Header'
import SimpleButton from '../../components/SimpleButton';
import Icons, { IconSets } from '../../components/Icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import Input from '../../components/Input';

import { GROUPS } from '../../constants/data';

import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, registerUser, loginSuccess, getGamesOrTrainingCenter } from '../../actions/register';
import Spinner from 'react-native-loading-spinner-overlay';
import { REGISTER_SUCCESS } from '../../actions/types';
import FONTS from '../../constants/fonts';
import AppUtils from '../../utils/AppUtils';
import gray_male from './../../assets/images/gray_male.png'
import red_male from './../../assets/images/red_male.png'
import gray_female from './../../assets/images/gray_female.png'
import red_female from './../../assets/images/red_female.png'
import DatePicker from '../../components/DatePicker';
import moment from 'moment'
import { USER_DATA, TOKEN } from '../../constants/variables';
import Select2 from "react-native-select-two"

function RegisterScreen({ navigation }) {

    const dispatch = useDispatch()
    const [selectedGames, setSelectedGames] = useState([])
    const [selectedPlaGround, setSelectedPlaGround] = useState([])

    const register = useSelector(state => state.register)
    const loader = useSelector(state => state.loader)
    const registerData = register.user
    const games = register.games
    const training_center = register.training_center
    const [show, setShow] = useState(false)


    useEffect(() => {
        getRegisterMisc()
    }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getRegisterMisc()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    function onChange(type, data) {
        // alert(data)
        registerData[type] = data
        dispatch(updateUserData(registerData))
    }

    async function onRegister() {
        // alert('onRegister called')
        AppUtils.showMessage('register ====>', registerData)
        let { name, email, gender, password, phone, dob, address,designation,adhar_number } = registerData
        dob = moment(dob).format("YYYY-MM-DD")

        // alert(phone)
        if (name === '') {
            AppUtils.showToast({ message: "Name should not be empty" })
            return
        }
        else if (email === '') {
            AppUtils.showToast({ message: "Email id should not be empty" })
            return
        }
        else if (password === "") {
            AppUtils.showToast({ message: "Password should not be empty" })
            return
        }
        else if (dob === '') {
            AppUtils.showToast({ message: "Date of birth should not be empty" })
            return
        }
        else if (address === '') {
            AppUtils.showToast({ message: "Address should not be empty" })
            return
        }
        else if(adhar_number === '') {
            AppUtils.showToast({ message: "Adhar number should not be empty" })
            return
        }
        else if(designation === '') {
            AppUtils.showToast({ message: "Designation should not be empty" })
            return
        }
        else if(selectedGames.length == 0) {
            AppUtils.showToast({ message: "Games should not be empty" })
            return
        }
        else if(selectedPlaGround == 0) {
            AppUtils.showToast({ message: "Play ground should not be empty" })
            return
        }
        else if(adhar_number.length<12) {
            AppUtils.showToast({ message: "Please enter valid aadhar numer" })
            return
        }
        let formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("gander", gender ? 'Male' : 'Female')
        formData.append("phone", phone)
        formData.append("birthday", dob)
        formData.append("address", address)
        formData.append("aadhar_no", adhar_number)
        formData.append("training_center", selectedPlaGround.join(","))
        formData.append("games", selectedGames.join(","))
        AppUtils.showMessage("form data ===>", formData)
        dispatch(registerUser({
            data: formData,
            successCb: async (response) => {
                AppUtils.showMessage("success register", response)

                let status = response.status
                if (!status) {
                    let message = response.message ? AppUtils.parseMessage(response.message) : 'Error in registering user'
                    AppUtils.showToast({ message })
                    return
                }
                await AppUtils.storeItem(USER_DATA, JSON.stringify(response.data))
                await AppUtils.storeItem(TOKEN, response.token)
                onChange('token', response.token)
                dispatch(loginSuccess(true))

            },
            failureCb: (response) => {

                AppUtils.showMessage("failure register", response)
                let message = response.message ? AppUtils.parseMessage(response.message) : 'Error in registering user'
                AppUtils.showToast({ message })
            }
        }))
    }

    async function getRegisterMisc() {
        let data = new FormData()
        data.append("table_name", "games")
        dispatch(getGamesOrTrainingCenter({
            type: 'games',
            data,
            successCb: (response) => {
                AppUtils.showMessage("games response===> ", response)
            },
            failureCb: (response) => {
                AppUtils.showMessage("games got failure", response)
            }
        }))
        let data1 = new FormData()
        data1.append("table_name", "play_ground")

        dispatch(getGamesOrTrainingCenter({
            data: data1,
            type: 'play_ground',
            successCb: (response) => {
                AppUtils.showMessage("play ground response===> ", response)
            },
            failureCb: (response) => {
                AppUtils.showMessage("play ground got failure")
            }
        }))
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Header
                    title={'Register Coach'}
                    iconName={'arrow-back'}
                    iconType={IconSets.Ionicons}
                    iconStyle={{ color: COLORS.PINK }}
                    onLeftPress={() => navigation.goBack()}
                />
                <View style={styles.body}>
                    <View style={{ marginTop: '3%' }}>
                        <Input
                            placeholder={'Enter user name'}
                            value={registerData.name}
                            label={'Name'}
                            onChangeText={(text) => onChange('name', text)}
                        // keyboardType={'numeric'}
                        />
                    </View>
                    <View style={{ marginTop: '3%' }}>
                        <Input
                            label={`Email`}
                            placeholder={'Enter email id'}
                            containerStyle={{ marginTop: hp('1%') }}
                            value={registerData.email}
                            onChangeText={(text) => onChange('email', text)}
                        // keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.label}>
                        <Text>Date of Birth</Text>
                    </View>

                    <DatePicker
                        date={registerData.dob}
                        containerStyle={{ marginTop: hp('1%') }}
                        onChange={(date) => onChange("dob", date)}
                    />
                    <View style={{ marginTop: '3%' }}>
                        <Input
                            placeholder={'Enter address'}
                            label={`Address`}
                            value={registerData.address}
                            onChangeText={(text) => onChange('address', text)}
                        />
                    </View>

                    <View style={{ marginTop: '3%' }}>
                        <Input
                            placeholder={'Enter designation'}
                            label={`Designation`}
                            value={registerData.designation}
                            onChangeText={(text) => onChange('designation', text)}
                        />
                    </View>

                    <View style={{ marginTop: '3%' }}>
                        <Input
                            placeholder={'Enter adhar number'}
                            label={`Adhar number`}
                            value={registerData.adhar_number}
                            onChangeText={(text) => onChange('adhar_number', text)}
                            keyboardType={'numeric'}
                        />
                    </View>

                    <View style={{ marginTop: '3%' }}>
                        <Text style={styles.label}>Games</Text>
                        <Select2
                            style={styles.input}
                            colorTheme={COLORS.PINK}
                            popupTitle="Choose game"
                            title="Choose game"
                            data={games}
                            selectButtonText={'Choose'}
                            cancelButtonText={'Cancel'}
                            searchPlaceHolderText={'Search game by name'}
                            listEmptyTitle={'No games to show'}
                            onSelect={data => {
                                // this.setState({ data })
                                setSelectedGames([...data])
                            }}
                            onRemoveItem={data => {
                                // this.setState({ data })
                                setSelectedGames([...data])
                            }}
                        />
                    </View>
                    
                    <View style={{ marginTop: '3%' }}>
                        <Text style={styles.label}>Play ground</Text>
                        <Select2
                            style={styles.input}
                            colorTheme={COLORS.PINK}
                            popupTitle="Choose play ground"
                            title="Choose play ground"
                            data={training_center}
                            selectButtonText={'Choose'}
                            cancelButtonText={'Cancel'}
                            searchPlaceHolderText={'Search play ground by name'}
                            listEmptyTitle={'No play ground to show'}
                            onSelect={data => {
                                // this.setState({ data })
                                setSelectedPlaGround([...data])
                            }}
                            onRemoveItem={data => {
                                // this.setState({ data })
                                setSelectedPlaGround([...data])
                            }}
                        />
                    </View>


                    <Text style={styles.verifyText}>Gender</Text>
                    <View style={styles.genderView}>
                        <TouchableOpacity style={styles.genderInnerView} onPress={() => onChange('gender', !registerData.gender)} >
                            <Image style={styles.genderImg} source={registerData.gender ? red_male : gray_male} />
                            <Text style={styles.genderText}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.genderInnerView} onPress={() => onChange('gender', !registerData.gender)}>
                            <Image style={styles.genderImg} source={registerData.gender ? gray_female : red_female} />
                            <Text style={styles.genderText}>Female</Text>
                        </TouchableOpacity>
                    </View>


                    <SimpleButton
                        title={'Register'}
                        containerStyle={{ marginTop: hp('4%') }}
                        onPress={() => onRegister()}
                    />
                </View>
                <Spinner
                    visible={loader.loading}
                    textContent={''}
                />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        paddingHorizontal: '6%',
        paddingVertical: '3%'
    },
    verifyText: {
        fontFamily: FONTS.BOLD,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    location: {
        fontFamily: FONTS.MEDIUM,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    genderView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    genderInnerView: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    genderImg: {
        width: 50,
        height: 50
    },
    genderText: {
        fontFamily: FONTS.REGULAR
    },
    groupView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    checkView: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'center'
    },
    label: {
        paddingHorizontal: 10,
        paddingBottom: 2,
        marginTop: 7
    },
    input: {
        borderRadius: 25,
        borderWidth: 2,
        borderColor: COLORS.DARK_GRAY,

        // justifyContent:'space-around'
    }
})

export default RegisterScreen
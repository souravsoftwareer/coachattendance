import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    NativeModules,
    Image
} from 'react-native'
import { IconSets } from '../../components/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import MainHeader from '../../components/MainHeader';
import FONTS from '../../constants/fonts';
import SimpleButton from '../../components/SimpleButton';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { getAttendanceData, markAttendanceIn, markAttendanceOut, updateFcmToken, updateHistory } from '../../actions/dashboard';
import AppUtils from '../../utils/AppUtils';
import Spinner from 'react-native-loading-spinner-overlay';
import GetLocation from 'react-native-get-location';
import moment from 'moment';
import { USER_DATA } from '../../constants/variables';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob'
import AddRemark from '../../modals/AddRemark';
import messaging from '@react-native-firebase/messaging';
import { check, PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';
import BackgroundTimer from 'react-native-background-timer';
import LocationEnabler from "react-native-location-enabler"
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';

const {
    PRIORITIES: { HIGH_ACCURACY },
    useLocationSettings,
} = LocationEnabler;

function Home({ navigation }) {
    const dispatch = useDispatch()
    const dashboard = useSelector(state => state.dashboard)
    const loader = useSelector(state => state.loader)
    const dashboardData = dashboard.data
    const [location, setLocation] = useState({})
    const [resp, setResponse] = useState({})
    const coach = require('./../../assets/images/coach.png')
    const [show, setShow] = useState(false)

    const [enabled, requestResolution] = useLocationSettings(
        {
            priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
            alwaysShow: true, // default false
            needBle: true, // default false
        },
        false /* optional: default undefined */
    );


    async function openCamera() {
        //    alert('camera opened')



        let options = {
            width: 300,
            height: 400,
            cropping: true
        }

        ImagePicker.openCamera(options)
            .then((response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    AppUtils.showToast({ message: 'User cancelled' })
                } else if (response.error) {
                    AppUtils.showToast({ message: response.error })
                }
                else {

                    setResponse({ ...response })
                }
            }).catch((err) => {
                AppUtils.showToast({ message: err.message })

            })

    }

    async function getAttendance() {

        let user = await AppUtils.reteriveItem(USER_DATA)
        // alert(JSON.stringify(user))
        let data = {
            user_id: user.users_id
        }
        // alert(JSON.stringify(user))
        dispatch(getAttendanceData({
            data,
            successCb: (response) => {
                AppUtils.showMessage("success", response)
            },
            failureCb: (response) => {
                AppUtils.showMessage("fail", response)
            }
        }))
    }

    async function addRemark() {
        // alert('remark called')
        setShow(true)
    }

    async function markAttOut() {
        if (!(location.latitude && location.longitude)) {
            AppUtils.showToast({ message: 'Location not found !!!' })
            return
        }
        if (!resp.path) {
            AppUtils.showToast({ message: 'Image not selected' })
            return
        }
        let user = await AppUtils.reteriveItem(USER_DATA)

        let data = [
            {
                name: 'atd_lat',
                data: "" + location.latitude
            },
            {
                name: 'atd_long',
                data: "" + location.longitude
            },
            {
                name: 'atd_date',
                data: moment().format("YYYY-MM-DD")
            },
            {
                name: 'atd_time_out',
                data: moment().format("HH:mm:ss")
            },
            {
                name: 'photo',
                filename: 'coach.png',
                type: 'image/png',
                data: RNFetchBlob.wrap(resp.path)
            }
        ]

        dispatch(markAttendanceOut({
            data,
            user,
            successCb: (response) => {

                if (!response.status) {
                    let message = response.message ? AppUtils.parseMessage(response.message) : 'Error in marking out'
                    AppUtils.showMessage({ message })
                    return
                }
                AppUtils.showToast({ message: 'Attendance marked out !!!' })
                let resp = {}
                setResponse({ ...resp })
                getAttendance()
            },
            failureCb: (response) => {
                let message = response.message
                AppUtils.showMessage({ message })

            }
        }))
    }

    async function markAttdIn() {
        //    alert('in')
        if (!(location.latitude && location.longitude)) {
            AppUtils.showToast({ message: 'Location not found !!!' })
            return
        }

        if (!resp.path) {
            AppUtils.showToast({ message: 'Image not selected' })
            return
        }

        let user = await AppUtils.reteriveItem(USER_DATA)
        // alert(user.users_id)

        let data = [
            {
                name: 'atd_lat',
                data: "" + location.latitude
            },
            {
                name: 'atd_long',
                data: "" + location.longitude
            },
            {
                name: 'atd_date',
                data: moment().format("YYYY-MM-DD")
            },
            {
                name: 'atd_time_in',
                data: moment().format("HH:mm:ss")
            },
            {
                name: 'photo',
                filename: 'coach.png',
                type: 'image/png',
                data: RNFetchBlob.wrap(resp.path)
            }
        ]
        AppUtils.showMessage("data ===>", JSON.stringify(data))
        dispatch(markAttendanceIn({
            data,
            user,
            successCb: (response) => {

                if (!response.status) {
                    let message = response.message
                    AppUtils.showMessage({ message })
                    return
                }
                AppUtils.showMessage({ message: 'Attendance marked in !!' })
                let resp = {}
                setResponse({ ...resp })
                getAttendance()
            },
            failureCb: (response) => {
                AppUtils.showMessage("fail", response)
                AppUtils.showToast({ message: 'Error while marking attendance in' })
            }
        }))
    }

    async function getCurrentLocation() {
        let user = await AppUtils.reteriveItem(USER_DATA)
        let userId = user ? user.users_id : ""
        // NativeModules.LocationModule.startLocationService(userId)
        startBackgroundService()
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(data => {
                AppUtils.showMessage(data);
                setLocation({ ...data })
                let message = `${data.latitude},${data.longitude}`
                AppUtils.showToast({ message })

            })
            .catch(error => {
                const { code, message } = error;
                AppUtils.showMessage(message);
                // AppUtils.showToast({message});
            })
    }

    async function requestUserPermission() {
        try {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                let token = await messaging().getToken()
                //   AppUtils.showMessage('Authorization status:', authStatus);
                //   AppUtils.showMessage('Fcm Token :',token);
                if (token != "") {
                    let data = new FormData()
                    data.append("fcm_token", token)
                    dispatch(updateFcmToken({
                        data,
                        successCb: (response) => {
                            AppUtils.showMessage("token updated")
                        },
                        failureCb: (response) => {
                            AppUtils.showMessage("token update failure")
                        }
                    }))
                }
            }
        } catch (err) {
            AppUtils.showMessage("err here ===>", err)
        }

    }

    useEffect(() => {
        getAttendance()
        // requestLocationPermission()
        requestUserPermission()
    }, [])

    useEffect(() => {
        if (!enabled) {
            requestResolution()
            return
        }
        requestLocationPermission()
    }, [enabled])


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAttendance()
            // requestLocationPermission()
            requestUserPermission()
            // The screen is focused
            // Call any action
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    async function startBackgroundService() {
        let user = await AppUtils.reteriveItem(USER_DATA)

        RNLocation.configure({
            distanceFilter: 0, // Meters
            desiredAccuracy: {
                ios: 'best',
                android: 'balancedPowerAccuracy',
            },
            // Android only
            androidProvider: 'auto',
            interval: 5000, // Milliseconds
            fastestInterval: 10000, // Milliseconds
            maxWaitTime: 5000, // Milliseconds
            // iOS Only
            activityType: 'other',
            allowsBackgroundLocationUpdates: false,
            headingFilter: 1, // Degrees
            headingOrientation: 'portrait',
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
        });
        let locationSubscription = null;
        let locationTimeout = null;

        ReactNativeForegroundService.add_task(
            () => {
                RNLocation.requestPermission({
                    ios: 'whenInUse',
                    android: {
                        detail: 'fine',
                    },
                }).then((granted) => {
                    console.log('Location Permissions: ', granted);
                    // if has permissions try to obtain location with RN location
                    if (granted) {
                        locationSubscription && locationSubscription();
                        locationSubscription = RNLocation.subscribeToLocationUpdates(
                            ([locations]) => {
                                
                                let locationData = [locations][0]
                                console.log("foreground locations ===>", locationData);
                                let formData = new FormData()

                                formData.append("hst_date", moment().format("YYYY-MM-DD"))
                                formData.append("hst_lat", "" + locationData.latitude)
                                formData.append("hst_long", "" + locationData.longitude)
                                formData.append("userId", user.users_id)
                                dispatch(updateHistory({
                                    data: formData,
                                    successCb: (response) => {
                                        AppUtils.showMessage(response)
                                    },
                                    failureCb: (response) => {
                                        AppUtils.showMessage("failure", response)
                                    }
                                }))
                                locationSubscription();
                                locationTimeout && clearTimeout(locationTimeout);

                            },
                        );
                    } else {
                        locationSubscription && locationSubscription();
                        locationTimeout && clearTimeout(locationTimeout);
                        console.log('no permissions to obtain location');
                    }
                });
            },
            {
                delay: 60000,
                onLoop: true,
                taskId: 'taskid',
                onError: (e) => console.log('Error logging:', e),
            },
        );

        ReactNativeForegroundService.start({
            id: 144,
            title: "Coach Attendacne",
            message: "you are online!",
        });

        // let user = await AppUtils.reteriveItem(USER_DATA)

        // let formData = new FormData()

        // formData.append("hst_date", moment().format("YYYY-MM-DD"))
        // formData.append("hst_lat", "" + location.latitude)
        // formData.append("hst_long", "" + location.longitude)
        // formData.append("userId", user.users_id)
        // dispatch(updateHistory({
        //     data: formData,
        //     successCb: (response) => {
        //         AppUtils.showMessage(response)
        //     },
        //     failureCb: (response) => {
        //         AppUtils.showMessage("failure", response)
        //     }
        // }))




    }



    function requestLocationPermission() {
        let permissions = [
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        ]
        checkMultiple(permissions).
            then((statuses) => {
                console.log("statuses ===>", statuses)
                if (statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] != RESULTS.GRANTED ||
                    statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] != RESULTS.GRANTED
                ) {
                    requestMultiple(permissions).
                        then((statuses) => {
                            if (statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED &&
                                statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED) {
                                getCurrentLocation()
                            }
                        })

                } else {
                    getCurrentLocation()
                }
            })

    }
    function renderAttendance() {
        let attendanceData = dashboardData.data
        AppUtils.showMessage("attendanceData ===>", attendanceData)

        if (attendanceData) {


            if (attendanceData.length === 0) {
                return (
                    <SimpleButton
                        title={`Mark Attendance In`}
                        onPress={() => markAttdIn()}
                    />
                )
            } else {
                let currDate = moment().format("YYYY-MM-DD")
                let attendanceIn = attendanceData.find(ite => ite.atd_date === currDate)
                let attendanceOut = attendanceData.find(ite => ite.atd_date === currDate && ite.atd_time_out === "00:00:00")
                let marked = attendanceData.find(ite => ite.atd_date === currDate && ite.atd_time_out !== "00:00:00")

                if (!attendanceIn) {
                    return (
                        <SimpleButton
                            title={`Mark Attendance In`}
                            onPress={() => markAttdIn()}
                        />
                    )
                }
                if (attendanceOut) {
                    return (
                        <SimpleButton
                            title={`Mark Attendance Out`}
                            onPress={() => markAttOut()}
                        />
                    )
                }

                // if (marked) {
                //     return (
                //         <Text style={styles.marked}>Attendance already marked for today !!!</Text>
                //     )
                // }

                if (marked) {
                    return (
                        <SimpleButton
                            title={`Mark Attendance In`}
                            onPress={() => markAttdIn()}
                        />
                    )
                }
            }
        }
    }

    return (
        // <ScrollView nestedScrollEnabled>
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <MainHeader
                    title={'Home'}
                    leftIconName={'menu'}
                    leftIconType={IconSets.Ionicons}
                    // rightIconName={'search'}
                    // rightIconType={IconSets.Feather}
                    onLeftPress={() => navigation.toggleDrawer()}
                />
            </View>

            <View style={styles.main}>
                <View>
                    <Text style={styles.title}>Coach Attendance</Text>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardInnerView}>
                        <Text style={styles.cardSmallText}>Total</Text>
                        <Text style={styles.cardBoldText}>{dashboardData.totalcount}</Text>
                    </View>
                    <View style={styles.cardInnerView}>
                        <Text style={styles.cardSmallText}>Monthly</Text>
                        <Text style={styles.cardBoldText}>{dashboardData.currentmonth}</Text>
                    </View>
                    <View style={styles.cardInnerView}>
                        <Text style={styles.cardSmallText}>Weekly</Text>
                        <Text style={styles.cardBoldText}>{dashboardData.currentweek}</Text>
                    </View>

                </View>
                <View style={{ paddingVertical: 5, paddingHorizontal: 15, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => openCamera()}>
                        <Image source={resp.path ? { uri: resp.path } : coach} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={styles.label}>Upload your photo while marking attendance.</Text>

                </View>
                <View style={styles.btnView}>
                    {renderAttendance()}
                </View>

                <View style={styles.btnView1}>
                    <SimpleButton
                        title={`Give Remarks`}
                        onPress={() => addRemark()}
                    />
                </View>
            </View>
            {/* <View style={{ flex:0.5 }}/> */}
            <Spinner
                visible={loader.loading}
                textContent={''}
            />
            <AddRemark
                show={show}
                onClosed={() => setShow(false)}
                onAddRemark={() => setShow(false)}
            />
        </SafeAreaView>
        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.PINK,
        // height:heightPercentageToDP(100) 
        // paddingHorizontal:20
    },
    main: {
        // backgroundColor: BLOOD_COLORS.PINK,
        paddingHorizontal: 13,
        // paddingVertical: 12,
        height: '100%'
    },
    cardContainer: {
        backgroundColor: COLORS.WHITE,
        // opacity: 0.3,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        marginVertical: 3,
        paddingVertical: 25,

    },
    cardBoldText: {
        color: COLORS.DARK_GRAY,
        fontFamily: FONTS.EXTRA_BOLD,
        fontSize: 20
    },
    title: {
        color: COLORS.WHITE,
        fontFamily: FONTS.EXTRA_BOLD,
        fontSize: 15,
        paddingVertical: 15
    },
    marked: {
        color: COLORS.WHITE,
        fontFamily: FONTS.MEDIUM,
        fontSize: 14,
        paddingVertical: 15
    },
    cardSmallText: {
        color: COLORS.DARK_GRAY,
        fontFamily: FONTS.BOLD,
        fontSize: 11
    },
    cardInnerView: {
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnView: {
        width: '80%',
        paddingTop: heightPercentageToDP(10),
        alignSelf: 'center'
    },
    btnView1: {
        width: '80%',
        paddingTop: heightPercentageToDP(2),
        alignSelf: 'center'
    },
    label: {
        color: COLORS.WHITE,
        fontFamily: FONTS.REGULAR,
        fontSize: 15,
        textAlign: 'center'
    },
    image: {
        // resizeMode: 'contain',
        marginVertical: 10,
        width: 100,
        height: 100,
        borderRadius: 50
    }
})

export default Home
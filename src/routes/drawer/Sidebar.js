import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    NativeModules
} from 'react-native'
import gray_male from '../../assets/images/gray_male.png'
import { drawer_items } from './../../constants/data'
import COLORS from '../../constants/colors';

import { USER_DATA, TOKEN } from '../../constants/variables';
import { useDispatch } from 'react-redux';
import { loginSuccess, userLogout } from '../../actions/register';
import AppUtils from '../../utils/AppUtils';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    userView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        backgroundColor: COLORS.PINK
    },
    maleImg: {
        width: 50,
        height: 50,
        borderRadius:25
    },
    listView: {
        height: '80%',
        paddingHorizontal: 10,

    },
    itemView: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomColor: COLORS.DARK_GRAY,
        borderBottomWidth: 1
    },
    userName: {
        color: COLORS.WHITE
    }
})

function Sidebar({ navigation, navigationProp }) {

    const [user, setUser] = useState({})
    const dispatch = useDispatch()

    const getUser = async () => {
        let user = await AppUtils.reteriveItem(USER_DATA)
        if (user) {
            setUser({ ...user })
        }

    }

    useEffect(() => {
        getUser()
    }, [])

    async function onLogout() {
        ReactNativeForegroundService.stop()
        let data = {}
        dispatch(userLogout({
          data,
          successCb:async(response)=>{
            await AppUtils.removeItem(USER_DATA)
            await AppUtils.removeItem(TOKEN)
            dispatch(loginSuccess(false))
            navigation.navigate('Login')
          },
          failureCb:(response)=>{
              AppUtils.showToast({message:'Error while logging out!!!'})
          }
        }))
        
        navigation.closeDrawer()
        

    }

    async function onSideBar(item) {
        if (item.id === 4) {
            // logout user here
            onLogout()
            return
        }
        navigation.navigate(item.path)
        navigation.closeDrawer()

    }

    function renderItem({ item }) {
        return (
            <TouchableOpacity style={styles.itemView} onPress={() => onSideBar(item)}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.userView}>
                <Image source={gray_male} style={styles.maleImg} />
                <Text style={styles.userName}>{user ? user.name : "--"}</Text>
                <Text style={styles.userName}>{user ? user.email : "--"}</Text>
                <Text style={styles.userName}>{user ? user.phone : "--"}</Text>
            </View>
            <View style={styles.listView}>
                <FlatList
                    data={drawer_items}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
}

export default Sidebar
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native'
import SplashScreen from './../screens/splash'
import LoginScreen from './../screens/auth/login'
import RegisterScreen from './../screens/auth/register'

const Stack = createStackNavigator();
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN_SUCCESS } from '../actions/types';
import { USER_DATA, TOKEN } from '../constants/variables';
import { loginSuccess, updateUserData } from '../actions/register';
import AppUtils from '../utils/AppUtils';
import Home from './../routes/drawer'

function MainStack({ navigation }) {

  const register = useSelector(state => state.register)
  let registerData = register.user
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  // alert(register.logged)

  function onChange(type, data) {
    // alert(data)
    registerData[type] = data
    dispatch(updateUserData(registerData))
  }

  async function checkLogged() {
    let user = await AppUtils.reteriveString(TOKEN)
    if (user) {

      dispatch(loginSuccess(true))
      onChange('token', user)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    checkLogged()
  }, [])
  if (loading) {
    return <SplashScreen />
  }
  return (
    <>

      <NavigationContainer>

        <Stack.Navigator>
          {register.logged ? (
            <>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            </>

          ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
              </>

            )}


        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default MainStack
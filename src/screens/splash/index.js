import React,{ useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ActivityIndicator
} from 'react-native'
import back from '../../assets/images/splash.png'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BLOOD_COLORS from '../../constants/colors';
import BLOOD_FONTS from '../../constants/fonts';
import { useDispatch } from 'react-redux';


function SplashScreen( { navigation } ) {
 const dispatch = useDispatch() 
 const styles = StyleSheet.create({
   back:{
     width:'100%',
     height:'100%',
     
   },
   title:{
      fontSize:hp("5%"),
      fontFamily:BLOOD_FONTS.BOLD,
      color:BLOOD_COLORS.WHITE
   },
   desc:{
     color:BLOOD_COLORS.WHITE,
     fontFamily:BLOOD_FONTS.SEMI_BOLD,
     fontSize:hp("2%"),
   },
   upperView:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:hp("90%")
   },
   lowerView:{
    height:hp("10%")
   }    
 })
 
  return (
    <ImageBackground style={styles.back} source={back}>
        <View style={styles.upperView}>
        <Text style={styles.title}>Coach</Text>
        <Text style={styles.desc}>Attendance</Text>
        </View>
        <View style={styles.lowerView}>
         <ActivityIndicator size={'large'} color={BLOOD_COLORS.PINK}/> 
         </View>
    </ImageBackground>
  )
}

export default SplashScreen
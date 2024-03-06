import React from  'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import Icons from './../Icons'
// import Icon from 'react-native-vector-icons/FontAwesome'
import BLOOD_COLORS from '../../constants/colors';
import BLOOD_FONTS from '../../constants/fonts';
function BlockButton({
  title , 
  iconName,
  iconType,
  containerStyle,
  textStyle,
  onPress
}){
  const styles = StyleSheet.create({
      container:{
          width:'100%',
          padding:10,
          borderRadius:20,
          borderWidth:2,
          borderColor:BLOOD_COLORS.LIGHT_GRAY,
        //   flex:1,
          flexDirection:'row',
          alignItems:'center',
          // justifyContent:'space-around'
      },
      textStyle:{
        fontFamily:BLOOD_FONTS.REGULAR
      },
      textView:{
        width:'20%'
      },
      iconView:{
        width:'80%',
        alignItems:'center'
      }
  })  
  return (
      <TouchableOpacity style={[styles.container,containerStyle]} onPress={()=>onPress?onPress():null}>
       <View style={styles.textView}> 
        <Icons
         iconSet={iconType}
         name={iconName}
         style={[textStyle,styles.textStyle]}
        />
        </View>
       <View style={styles.iconView}> 
        <Text style={[textStyle,styles.textStyle]}>{title}</Text>
        </View>
      </TouchableOpacity>
  )
}

export default BlockButton
import React from  'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import Icons from './../Icons'
// import Icon from 'react-native-vector-icons/FontAwesome'
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
function SimpleButton({
  title , 
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
          borderColor:COLORS.LIGHT_GRAY,
          backgroundColor:COLORS.PINK,
        //   flex:1,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center'
      },
      textStyle:{
        fontFamily:FONTS.BOLD,
        color:COLORS.WHITE
      }
      
  })  
  return (
      <TouchableOpacity style={[styles.container,containerStyle]} onPress={()=>onPress?onPress():null}>  
         <Text style={[textStyle?textStyle:styles.textStyle]}>{title}</Text>
      </TouchableOpacity>
  )
}

export default SimpleButton
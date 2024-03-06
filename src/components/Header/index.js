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
function Header({
  title , 
  iconName,
  iconType,
  containerStyle,
  textStyle,
  iconStyle,
  onLeftPress
}){
  const styles = StyleSheet.create({
      container:{
          width:'100%',
          padding:10,
          flexDirection:'row',
          alignItems:'center',
          // justifyContent:'space-around'
      },
      textStyle:{
        fontFamily:FONTS.BOLD,
        color:COLORS.BLACK
      },
      iconStyle:{
        fontSize:22
      },
      textView:{
        width:'90%',
        // alignItems:'center',
        justifyContent:'center'
      },
      iconView:{
        width:'10%',
        alignItems:'center',
        justifyContent:'center'
      }
  })  
  return (
      <View style={[styles.container,containerStyle]} >
       <TouchableOpacity style={styles.iconView} onPress={()=>onLeftPress?onLeftPress():null}> 
        <Icons
         iconSet={iconType}
         name={iconName}
         style={[iconStyle,styles.iconStyle]}
        />
        </TouchableOpacity>
       <View style={styles.textView}> 
        <Text style={[textStyle,styles.textStyle]}>{title}</Text>
        </View>
      </View>
  )
}

export default Header
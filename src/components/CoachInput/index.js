import React from  'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native'
import Icons from './../Icons'
// import Icon from 'react-native-vector-icons/FontAwesome'
import COLORS from '../../constants/colors';

function CoachInput({
  containerStyle,
  textInputStyle,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  disabled
}){
  const styles = StyleSheet.create({
      container:{
          width:'100%',
          paddingHorizontal:5,
          borderRadius:25,
          borderWidth:2,
          borderColor:COLORS.DARK_GRAY,
        
          // justifyContent:'space-around'
      },
      textInput:{
          width:'100%'
      } 
  
  })  
  return (
      <View style={[styles.container,containerStyle]} >
        <TextInput
          style={[styles.textInput,textInputStyle]}
          placeholder={placeholder}
          value={value}
          keyboardType={keyboardType}
          editable={disabled}
          onChangeText={(text)=>onChangeText?onChangeText(text):null}
        /> 
      </View>
  )
}

export default CoachInput
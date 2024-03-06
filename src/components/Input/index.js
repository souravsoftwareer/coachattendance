import React from  'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native'
import Icons from '../Icons'
// import Icon from 'react-native-vector-icons/FontAwesome'
import COLORS from '../../constants/colors';
function Input({
  containerStyle,
  textInputStyle,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  disabled,
  label
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
      },
      label:{
          paddingHorizontal:10,
          paddingBottom:2
      } 
  
  })  
  return (
      <View  >
       {label &&(
           <View style={styles.label}>
           <Text>{label}</Text>
           </View>
       )}
       <View style={[styles.container,containerStyle]}>
        <TextInput
          style={[styles.textInput,textInputStyle]}
          placeholder={placeholder}
          value={value}
          keyboardType={keyboardType}
          editable={disabled}
          onChangeText={(text)=>onChangeText?onChangeText(text):null}
        /> 
        </View>
      </View>
  )
}

export default Input
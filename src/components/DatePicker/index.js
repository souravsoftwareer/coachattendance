import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
// import DatePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import COLORS from '../../constants/colors';

function DatePickerView({
    date,
    mode,
    onChange,
    containerStyle
}) {
    const [show,setShow] = useState(false)
    return (
        <TouchableOpacity style={[styles.input, containerStyle]} onPress={()=>setShow(true)}>
            <DateTimePickerModal
                isVisible={show}
                mode={mode?mode:'date'}
                date={date}
                onConfirm={(date)=>{onChange?onChange(date):null;setShow(false)}}
                onCancel={()=>setShow(false)}
                
            />
            <Text>{(mode && mode === 'datetime')?moment(date).format("YYYY-MM-DD HH:mm:ss"):moment(date).format("YYYY-MM-DD")}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    input: {
        borderRadius: 25,
        borderWidth: 2,
        borderColor: COLORS.DARK_GRAY,
        paddingHorizontal:15,
        paddingVertical:15
        // justifyContent:'space-around'
    },
})

export default DatePickerView
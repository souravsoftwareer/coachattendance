import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Modal from "react-native-modalbox";
import FONTS from '../constants/fonts';
import COLORS from '../constants/colors';
import BlockButton from '../components/SimpleButton';
import { IconSets } from '../components/Icons';
import AppUtils from '../utils/AppUtils';
import Input from '../components/Input';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import DatePickerView from '../components/DatePicker';
import { attendanceRemark } from '../actions/dashboard';
import moment from 'moment'

const styles = StyleSheet.create({
    container: {
        width: '90%',
        // height: '35%',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 25,
        backgroundColor: COLORS.WHITE
    },
    modal: {

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.TRANSPARENT
    },
    title: {
        fontFamily: FONTS.BOLD
    },
    footer: {

        justifyContent: 'center',
        marginTop: heightPercentageToDP('5%')
    },
    line: {
        height: 0.5,
        width: '100%',
        marginVertical: 10,
        backgroundColor: COLORS.DARK_GRAY
    }
})

function AddRemark({
    show,
    onClosed,
    onAddRemark
}) {
    const [remark, setRemark] = useState("")
    const [remarkDate, setRemarkDate] = useState(new Date())
    const dispatch = useDispatch()

    function onAddRemarkData() {
        if (remark == '') {
            AppUtils.showToast("Remark should not be empty")
            return
        }
        let data = new FormData()
        data.append("remark_date",moment().format("YYYY-MM-DD"))
        data.append("remark_time",moment().format("HH:mm:ss"))
        data.append("atd_remarks",remark)

        AppUtils.showMessage("data ===>",data)
        dispatch(attendanceRemark({
            data,
            successCb:(response)=>{
                AppUtils.showToast({ message:'Remark added successfully' })
                onClosedModal()
            },
            failureCb:()=>{
                AppUtils.showToast({ message:'Error in while adding remark' })
                onClosedModal()
            }
        }))
        

    }

    function onClosedModal() {
        setRemark('')
        if (onClosed) {
            onClosed()
        }

    }

    return (
        <Modal isOpen={show} style={styles.modal} position={'center'} onClosed={() => onClosedModal()}>
            <View style={styles.container}>
                <Text style={styles.title}>Add Remarks</Text>
                <View style={styles.line} />
                <View style={{ justifyContent: 'center', width: '90%' }}>
                    <View style={{ marginTop: '1%' }}>
                        <Input
                            label={`Remarks`}
                            placeholder={'Enter remarks here'}
                            containerStyle={{ marginTop: heightPercentageToDP('1%') }}
                            value={remark}
                            onChangeText={(text) => setRemark(text)}
                        // keyboardType={'numeric'}
                        />
                    </View>
                    {/* <View style={{ marginTop:5 }}>
                        <View style={styles.label}>
                            <Text>Remark Date</Text>
                        </View>

                        <DatePickerView
                            date={remarkDate}
                            containerStyle={{ marginTop: heightPercentageToDP('1%') }}
                            onChange={(date) => setRemarkDate(date)}
                            mode={'datetime'}
                        />
                    </View> */}
                </View>
                <View style={styles.footer}>
                    <View style={styles.line} />
                    <View style={{ flexDirection: 'row' }}>
                        <BlockButton
                            title={'Submit'}
                            iconType={IconSets.Ionicons}
                            iconName={'apps'}
                            onPress={() => onAddRemarkData()}
                            containerStyle={{ width: '40%' }}
                        />
                        <BlockButton
                            title={'Cancel'}
                            iconType={IconSets.Ionicons}
                            iconName={'apps'}
                            onPress={() => onClosedModal()}
                            containerStyle={{ width: '40%', backgroundColor: COLORS.DARK_GRAY }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddRemark
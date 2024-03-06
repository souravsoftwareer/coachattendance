import React,{ useState } from 'react'
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
import OTPInputView from '@twotalltotems/react-native-otp-input'
import AppUtils from '../utils/AppUtils';

const styles = StyleSheet.create({

    modal: {
        width: '90%',
        height: '35%',
        padding: 10,
        borderRadius: 10
    },
    title: {
        fontFamily: FONTS.BOLD
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    resend: {
        fontFamily: FONTS.SEMI_BOLD,
        color: COLORS.PINK
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: COLORS.PINK,
        color:'black'
    },

    underlineStyleBase: {
        width: 45,
        height: 45,
        borderWidth: 2,
        borderRadius:22.5,

    },

    underlineStyleHighLighted: {
        borderColor: COLORS.PINK,
    },
})

function VerifyOtp({
    show,
    onClosed,
    onVerify,
    onResend
}) {
    const [code,setCode] = useState("") 


    return (
        <Modal isOpen={show} style={styles.modal} position={'center'} onClosed={() => onClosed()}>
            <View style={styles.container}>
                <Text style={styles.title}>Confirmation verification code</Text>
                <View style={{justifyContent:'center',width:'100%',alignItems:'center'}}>
                    <OTPInputView
                        style={{ width: '80%', height: 100 }}
                        pinCount={4}
                        placeholderTextColor={'#000'}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        // onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            AppUtils.showMessage(`Code is ${code}, you are good to go!`)
                            setCode(code)
                        })}
                    />
                </View>
                <View style={styles.footer}>
                   <TouchableOpacity onPress={() => onResend?onResend():null}>
                    <Text style={styles.resend}>Re-send</Text>
                    </TouchableOpacity>
                    <BlockButton
                        title={'Verify'}
                        iconType={IconSets.Ionicons}
                        iconName={'apps'}
                        onPress={() => onVerify?onVerify(code):null}
                        containerStyle={{ width: '40%' }}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default VerifyOtp
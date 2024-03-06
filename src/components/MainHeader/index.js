import React from 'react'
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
function MainHeader({
    title,
    leftIconName,
    leftIconType,
    rightIconName,
    rightIconType,
    containerStyle,
    textStyle,
    iconStyle,
    onLeftPress,
    onRightPress
}) {
    const styles = StyleSheet.create({
        main: {
            backgroundColor: COLORS.PINK,
            paddingVertical: 12,
            paddingHorizontal: 12,
        },
        container: {
            width: '100%',
            // padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent:'space-around'
        },
        textStyle: {
            fontFamily: FONTS.BOLD,
            color: COLORS.WHITE
        },
        iconStyle: {
            fontSize: 22,
            color: COLORS.WHITE
        },
        textView: {
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        iconView: {
            width: '10%',
            // alignItems: 'center',
            justifyContent: 'center'
        },
        rightIconView: {
            width: '10%',
            alignItems: 'flex-end',
            justifyContent: 'center'
        }
        
    })
    return (
        <View style={styles.main}>
            <View style={[styles.container, containerStyle]} >
                <TouchableOpacity style={styles.iconView} onPress={() => onLeftPress ? onLeftPress() : null}>
                    <Icons
                        iconSet={leftIconType}
                        name={leftIconName}
                        style={[iconStyle, styles.iconStyle]}
                    />
                </TouchableOpacity>
                <View style={styles.textView}>
                    <Text style={[textStyle, styles.textStyle]}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.rightIconView} onPress={() => onRightPress ? onRightPress() : null}>
                    <Icons
                        iconSet={rightIconType}
                        name={rightIconName}
                        style={[iconStyle, styles.iconStyle]}
                    />
                </TouchableOpacity>

            </View>
           
        </View>
    )
}

export default MainHeader
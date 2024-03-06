import React, { } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native'
import { IconSets } from '../../components/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import MainHeader from '../../components/MainHeader';

function Aboutus({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <MainHeader
                    title={'About US'}
                    leftIconName={'menu'}
                    leftIconType={IconSets.Ionicons}
                    // rightIconName={'search'}
                    // rightIconType={IconSets.Feather}
                    onLeftPress={() => navigation.toggleDrawer()}
                />
            </View>
            <ScrollView nestedScrollEnabled>
              <View>
                  <Text>About Us</Text>
              </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.PINK,
        // paddingHorizontal:20
    },
    main: {
        // backgroundColor: BLOOD_COLORS.PINK,
        paddingHorizontal: 13,
        paddingVertical: 12
    },
    
})

export default Aboutus
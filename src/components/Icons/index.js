import React, { memo } from 'react';
import { TextProps } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconZocial from 'react-native-vector-icons/Zocial';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconAntDesignIcons from 'react-native-vector-icons/AntDesign';

export const IconSets = {
    Entypo: 'Entypo',
    EvilIcons: 'EvilIcons',
    Feather: 'Feather',
    FontAwesome: 'FontAwesome',
    FontAwesome5: 'FontAwesome5',
    Foundation: 'Foundation',
    Ionicons: 'Ionicons',
    MaterialIcons: 'MaterialIcons',
    MaterialCommunityIcons: 'MaterialCommunityIcons',
    Octicons: 'Octicons',
    Zocial: 'Zocial',
    SimpleLineIcons: 'SimpleLineIcons',
    AntDesign: 'AntDesign',
};

// type Props = {
//     iconSet: string;
//     name: string;
//     size: number;
//     color: string;
// };

const Icons = (props) => {
    const { iconSet, ...otherProps } = props;
    switch (iconSet) {
        case IconSets.Entypo:
            return <IconEntypo {...otherProps} />;
        case IconSets.EvilIcons:
            return <IconEvilIcons {...otherProps} />;
        case IconSets.Feather:
            return <IconFeather {...otherProps} />;
        case IconSets.FontAwesome:
            return <IconFontAwesome {...otherProps} />;
        case IconSets.FontAwesome5:
            return <IconFontAwesome5 {...otherProps} />;
        case IconSets.Foundation:
            return <IconFoundation {...otherProps} />;
        case IconSets.Ionicons:
            return <IconIonicons {...otherProps} />;
        case IconSets.MaterialIcons:
            return <IconMaterialIcons {...otherProps} />;
        case IconSets.MaterialCommunityIcons:
            return <IconMaterialCommunityIcons {...otherProps} />;
        case IconSets.Octicons:
            return <IconOcticons {...otherProps} />;
        case IconSets.Zocial:
            return <IconZocial {...otherProps} />;
        case IconSets.SimpleLineIcons:
            return <IconSimpleLineIcons {...otherProps} />;
        case IconSets.AntDesign:
            return <IconAntDesignIcons {...otherProps} />;
        default:
            return <IconFontAwesome {...otherProps} />;
    }
};

export default Icons;

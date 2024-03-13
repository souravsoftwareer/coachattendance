import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from './Sidebar';
import Home from './../../screens/dashboard/home';
import Aboutus from './../../screens/dashboard/aboutus';
import Contactus from './../../screens/dashboard/contactus';

const Drawer = createDrawerNavigator();

function DrawerNavigation({ navigationProps }) {
    return (
        <Drawer.Navigator initialRouteName={'Home'}
        screenOptions={{
            headerShown: false, // Hide the header for all screens
          }}
        drawerContent={(props) =>
            <Sidebar {...props } />
        }
        >
        <Drawer.Screen name="Home" component={Home}   options={{ drawerLabel: 'Home' }} />
        <Drawer.Screen name="Aboutus" component={Aboutus} />
        <Drawer.Screen name="Contactus" component={Contactus} />
      </Drawer.Navigator>
    )
}

export default DrawerNavigation
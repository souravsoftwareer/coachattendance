/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  View,
} from 'react-native';
import { Provider } from 'react-redux';

import Routes from './src/routes'
import store from './src/store';
import messaging from '@react-native-firebase/messaging';
import PushNotification,{ Importance } from 'react-native-push-notification'

function App() {

  function setupMessage(remoteMessage) {

    let notification = remoteMessage.notification
      PushNotification.localNotification({
        autoCancel: true,
        title: notification.title,
        message: notification.body,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        channelId:'coachattendance'
      })

  }

  function setupNOtification() {
    PushNotification.createChannel(
      {
        channelId: "coachattendance", 
        channelName: "coachattendance",
        channelDescription: "A channel to categorise your notifications", 
        playSound: false, 
        soundName: "default", 
        importance: Importance.HIGH,
        vibrate: true, 
      },
      (created) => console.log(`createChannel returned '${created}'`) 
    );
  }

  useEffect(() => {
    setupNOtification()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      setupMessage(remoteMessage)
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
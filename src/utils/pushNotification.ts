import {PermissionsAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const OsVersion = Platform.Version;

export const requestUserPermission = async () => {
  if (Platform.OS == 'android' && +OsVersion >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    ).then(async () => {
      await getFCMToken();
    });
  } else if (Platform.OS == 'android' && +OsVersion < 33) {
    await getFCMToken();
  } else if (Platform.OS == 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await getFCMToken();
    }
  }
};

export const getFCMToken = async () => {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  console.log('old_token', fcmtoken);
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log('new_token', fcmtoken);
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      console.log('error', error);
    }
  }
};

export const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('log_00', remoteMessage.notification);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('log_01', remoteMessage.notification);
      } else {
        console.log('log_02');
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('log_03', remoteMessage);
  });
};

import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export async function registerForPushNotification(){
  let token;
  if(Platform.OS === 'android'){
    await Notifications.setNotificationChannelAsync('default',{
      name : "default",
      importance : Notifications.AndroidImportance.MAX,
      vibrationPattern : [0,250,250,250],
      lightColor: "#FF231F7C",
    })
  }

  if(Device.isDevice){
    const {status : existingStatus } = Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    if(finalStatus !== 'granted'){
      const {status} = Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if(finalStatus !== 'granted'){
      alert("Failed to get push token for push notification!");
      return;
    }

  }

}
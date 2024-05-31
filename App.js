import 'react-native-gesture-handler';
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from "./app/navigation/AppNavigator";
import { useState } from "react";
import dayjs from "dayjs";
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)



export default function App() {

  const ref = createNavigationContainerRef();
  const [routeName, setRouteName] = useState('');


  return (
    <NavigationContainer
      ref={ref}
      onReady={() => setRouteName(ref.getCurrentRoute().name)
      }
      onStateChange={async () => {
        setRouteName(ref.getCurrentRoute().name);
      }}
    >
      <AppNavigator routeName={routeName} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

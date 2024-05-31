import React from 'react'
import { View } from "react-native";
import colors from "../config/colors";

const ScreenWrapper = ({ children, style = {} }) => {
  return (
    <View style={{ padding: 10, backgroundColor: colors.white, flex: 1, ...style }}>
      <>
        {children}
      </>
    </View>
  )
}

export default ScreenWrapper;
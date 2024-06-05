import React from 'react'
import { View, StyleSheet, ScrollView } from "react-native";
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import colors from "../config/colors";



const Editor = ({ onChange, placeholder, value }) => {

  console.log('value', value);
  let richText = React.useRef();


  return (
    <View style={styles.container}>
      {/* <ScrollView style={{ backgroundColor: 'green', flex: 1 }} */}
      {/* showsVerticalScrollIndicator={false} > */}
      <RichEditor
        containerStyle={{ ...styles.editor }}
        ref={richText}
        style={styles.rich}
        onChange={onChange}
        initialContentHTML={value}
        onHeightChange={e => console.log(e)}
        placeholder={placeholder}
        editorStyle={{ backgroundColor: 'white', color: 'black' }}
      />
      {/* </ScrollView> */}

      <RichToolbar
        editor={richText}
        style={[styles.richBar]}
        iconTint={colors.black}
        selectedIconTint={colors.primary}
        disabledIconTint={colors.grayText}
        actions={[
          actions.checkboxList,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.undo,
          actions.redo,
        ]}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  richEditor: {
    flex: 1,
  },
  editor: {
    height: 300,
  },
  rich: {
    height: 300,
    flex: 1,
    color: 'white',
  },
  richBar: {
    height: 55,
    paddingBottom: 14,
  },
});

export default Editor;
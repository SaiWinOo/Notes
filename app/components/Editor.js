import React from 'react'
import { View, StyleSheet } from "react-native";
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';



const Editor = () => {

  let richText = React.useRef();




  return (
    <View style={styles.container} >
      <RichEditor
        ref={richText}
        style={styles.richEditor}
        onChange={e => console.log(e)}
      />
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
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
});

export default Editor;
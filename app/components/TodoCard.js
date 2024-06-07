import React from 'react'
import {View, StyleSheet, Text, TouchableWithoutFeedback} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "../config/colors";
import {Octicons} from '@expo/vector-icons';


const TodoCard = ({todo, handleCheck, handleLongPress, handlePress, isSelecting}) => {
    return (
        <TouchableWithoutFeedback onLongPress={() => handleLongPress(todo)}
                                  onPress={() => handlePress(todo)}>
            <View style={styles.todo}>
                {
                    isSelecting ?
                        <Octicons style={{marginRight: 13}} name="multi-select" size={24} color={colors.gray}/>
                        :
                        <BouncyCheckbox
                            fillColor={colors.primary}
                            style={{width: 40}}
                            isChecked={todo.is_done}
                            onPress={(isChecked) => handleCheck(isChecked, todo.id)}
                        />
                }


                <View style={{flexDirection : 'row',justifyContent : 'space-between',alignItems : 'center'}}>
                    <Text style={{
                        color: todo.is_done ? colors.gray : colors.white,
                        textDecorationLine: todo.is_done ? 'line-through' : 'none'
                    }}>{todo.todo}</Text>
                    <BouncyCheckbox
                        fillColor={colors.primary}
                        style={{width: 40, backgroundColor : 'red'}}
                        isChecked={todo.is_done}
                        onPress={(isChecked) => handleCheck(isChecked, todo.id)}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    todo: {
        backgroundColor: '#ffffff30',
        padding: 20,
        borderRadius: 10,
        margin: 5,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default TodoCard;

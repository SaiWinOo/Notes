import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import constants from 'expo-constants';
import ScreenWrapper from "../../components/ScreenWrapper";
import colors from "../../config/colors";
import {plusButtonStyle} from "../../styles/styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import useDB from "../../../db/useDB";
import {useFocusEffect} from "@react-navigation/native";
import TodoCard from "../../components/TodoCard";
import HeaderButtons from "../../components/HeaderButtons";
import useSelect from "../../hooks/useSelect";


const TodoScreen = ({navigation}) => {

    const {fetchTodos, createTodoTable, deleteTodoByIds, updateDoneStatus} = useDB();
    const [todos, setTodos] = useState([]);
    const [selectedTodos, setSelectedTodos] = useState([]);
    const {isSelecting, setIsSelecting, isSelectedAll, setIsSelectedAll} = useSelect();


    const fetchAllTodos = async () => {
        try {
            let res = await fetchTodos();
            setTodos(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (todos.length && todos.length === selectedTodos.length) {
            setIsSelectedAll(true);
        }
    }, [selectedTodos]);

    useEffect(() => {
        const migrate = async () => {
            try {
                let res = await createTodoTable();
                // console.log('Response', res);
            } catch (e) {
                // console.log(e);
            }
        }
        migrate();
    }, []);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            const fetchData = async () => {
                if (isActive) {
                    await fetchAllTodos();
                }
            }
            fetchData();
            return () => {
                isActive = false;
            }
        }, [])
    );

    const handleCheck = async (isDone, id) => {
        try {
            await updateDoneStatus(isDone, id);
            fetchAllTodos();
        } catch (error) {
            console.log(error);
        }
    }


    const handleCancelSelect = () => {
        setIsSelecting(false);
        setSelectedTodos([]);
        setIsSelectedAll(false);
    }

    const handleSelectAll = () => {
        if (isSelectedAll) {
            setSelectedTodos([]);
            setIsSelecting(true);
            setIsSelectedAll(false);
        } else {
            let noteIds = [];
            todos.forEach(todo => {
                noteIds.push(todo.id);
            });
            setSelectedTodos(noteIds);
            setIsSelecting(true);
        }
    }


    const handleDelete = async () => {
        try {
            deleteTodoByIds(selectedTodos);
            setIsSelecting(false);
            setSelectedTodos([]);
            fetchAllTodos();
        } catch (error) {
            console.log(error);
        }
    }

    const handleLongPress = (todo) => {
        console.log(todo);
        if (isSelecting) return;
        setIsSelecting(true);
        setSelectedTodos(pre => [...pre, todo.id]);
    }

    const handlePress = (todo) => {

        if (!isSelecting) {
            navigation.navigate('TodoFormModal', todo);
            return;
        }

        if (selectedTodos.includes(todo.id)) {
            setSelectedTodos(pre => {
                let selectedItems = pre.filter(item => item !== todo.id);
                selectedItems.length === 0 && setIsSelecting(false);
                return selectedItems;
            });
            setIsSelectedAll(false);
        } else {
            setSelectedTodos(pre => [...pre, todo.id]);
        }
    }

    return (
        <SafeAreaView style={{paddingTop: constants.statusBarHeight, flex: 1, backgroundColor: colors.black}}>
            <TouchableOpacity onPress={() => navigation.navigate('TodoFormModal')} style={plusButtonStyle}>
                <AntDesign name="plus" size={28} color="white"/>
            </TouchableOpacity>
            <HeaderButtons isSelecting={isSelecting}
                           isSelectedAll={isSelectedAll}
                           handleDelete={handleDelete}
                           handleCancelSelect={handleCancelSelect}
                           handleSelectAll={handleSelectAll}
            />
            <ScreenWrapper>
                {
                    isSelecting ?
                        <Text style={{
                            fontSize: 20,
                            color: colors.white,
                            padding: 10,
                            fontWeight: '600',
                            opacity: isSelecting ? 1 : 0
                        }}>{selectedTodos.length} item selected.</Text>
                        :
                        <Text style={styles.title}>Note</Text>
                }
                <ScrollView>
                    {
                        todos.map(todo => (
                            <TodoCard key={todo.id}
                                      isSelecting={isSelecting}
                                      handlePress={handlePress}
                                      handleLongPress={handleLongPress}
                                      handleCheck={handleCheck} todo={todo}/>
                        ))
                    }
                </ScrollView>
            </ScreenWrapper>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 15,
        color: colors.white,
    },
});

export default TodoScreen;

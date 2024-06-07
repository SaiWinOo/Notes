import React from 'react';
import {TouchableOpacity, View} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import colors from "../config/colors";
import AntDesign from "@expo/vector-icons/AntDesign";

const HeaderButtons = ({handleCancelSelect,handleDelete,handleSelectAll,isSelectedAll, isSelecting}) => {
    return (
        <View style={{
            opacity: isSelecting ? 1 : 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
        }}>
            <TouchableOpacity style={{padding: 5}} onPress={handleCancelSelect}>
                <Feather name="x" size={30} color={colors.white}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', gap: 5}}>
                <TouchableOpacity style={{padding: 5}} onPress={handleDelete}>
                    <Ionicons name="trash-outline" size={30} color={colors.danger}/>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 5}} onPress={handleSelectAll}>
                    {
                        isSelectedAll ?
                            <AntDesign name="checksquare" size={30} color={colors.primary}/>
                            :
                            <AntDesign name="checksquareo" size={30} color={colors.white}/>

                    }
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HeaderButtons;

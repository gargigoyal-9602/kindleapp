import React, { Component, FunctionComponent } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
interface Props {
    options: any,
    selectedOption: any,
    onSelect: any
}
const RadioButtons: FunctionComponent<Props> = ({ options, selectedOption, onSelect }) => {
    return (
        <View style={styles.buttonContainer}>
            {options.map((item: any) => {
                return (
                    <View key={item.key} style={styles.container}>
                        <TouchableOpacity
                            style={styles.circle}
                            onPress={() => {
                                onSelect(item);
                            }}>
                            {selectedOption && selectedOption.key === item.key && (
                                <View style={styles.checkedCircle} />
                            )}
                        </TouchableOpacity>
                        <Text>{item.text}</Text>
                    </View>
                );
            })}
        </View>
    );
}
export default RadioButtons;
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        width:300
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#3aaeef',
    },
    container:
    {
        flexDirection: "row",
        justifyContent:"space-evenly",
        width:100
    }
});

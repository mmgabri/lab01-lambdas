import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const FieldFormWithIcon2 = ({ text, placeholder, icon, onChangeText, check_text, top, onClick }) => {

    return (

        <View>
            <Text style={[styles.text_footer, { marginTop: top }]}>{text}</Text>
            <View style={styles.action}>
                <Feather
                    name={icon}
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder={placeholder}
                    secureTextEntry={check_text ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => onChangeText(val)}
                />
                <TouchableOpacity
                    onPress={onClick}
                >
                    {check_text ?
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                        />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FieldFormWithIcon2;

const styles = StyleSheet.create({
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    

});

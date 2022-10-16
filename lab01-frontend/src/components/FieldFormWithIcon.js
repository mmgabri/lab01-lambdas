import React from 'react';
import { View, Text, TextInput, Platform, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const FieldFormWithIcon = ({ text, placeholder, icon, onChangeText, check_text, top, onEndEditing }) => {
    
    return (
        <View>
            <Text style={[styles.text_footer, { marginTop: top }]}>{text}</Text>
            <View style={styles.action}>
                <FontAwesome
                    name={icon}
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder={placeholder}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => onChangeText(val)}
                    onEndEditing={(e) => onEndEditing(e.nativeEvent.text)}
                />
                {check_text ?
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null}
            </View>
        </View>
    )
}

export default FieldFormWithIcon;

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
    }
});

import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback, RefreshControl, ScrollView } from "react-native";
import UserAvatar from 'react-native-user-avatar';
import moment from 'moment-timezone';
moment.localeData('pr-br')

const ListChats = ({ chats, onClick, onRefresh, refreshing }) => {

    const formatdate = (date) => {
        var d = moment(date)
        return d.format('LLL')
    }

    function Item({ item }) {
        return (
            <TouchableWithoutFeedback onPress={() => { onClick(item) }}>
                <View style={styles.listItem}>
                    <UserAvatar size={45} name={item.userConversation.name} bgColors={['#007bb6']} />
                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Text style={{ fontWeight: "bold", alignSelf: "flex-start", marginLeft: 10 }}>{item.userConversation.name}</Text>
                        <Text style={{ alignSelf: "flex-start", marginLeft: 10 }} >{item.text}</Text>
                    </View>
                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Text style={{ alignSelf: "flex-end", marginLeft: 0, fontSize: 11 }} >{formatdate(item.createdAt)}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <FlatList
            style={{ flex: 1 }}
            data={chats}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={item => item.chatId.toString()}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        />
    )
};

export default ListChats;

const styles = StyleSheet.create({
    listItem: {
        borderLeftColor: "blue",
        margin: 5,
        padding: 5,
        backgroundColor: "#FFF",
        width: "100%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
    }
});

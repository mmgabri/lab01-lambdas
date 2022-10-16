import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableWithoutFeedback, RefreshControl, ScrollView } from "react-native";
import { enunsTipoCategoria } from '../services/enuns';
import { formatValor } from '../services/utils';
import Feather from 'react-native-vector-icons/Feather';

const ListAnuncio = ({ anuncios, routeMeusAnuncios, onClick, onRefresh, refreshing}) => {

    function Item({ item }) {
        return (
            <TouchableWithoutFeedback onPress={() => { onClick(item) }}>
                <View style={styles.listItem}>
                    <Image source={{ uri: item.imagens[0] }} style={{ width: 80, height: 80 }} />
                    <View style={{ alignItems: "center", flex: 1 }}>

                        <Text style={{ fontWeight: "bold", alignSelf: "flex-start", marginLeft: 10 }}>{item.titulo}</Text>
                        <Text style={{ alignSelf: "flex-start", marginLeft: 10 }} >
                            {enunsTipoCategoria(item.categoria)}
                        </Text>
                        <Text style={{ alignSelf: "flex-start", marginLeft: 10 }} >
                            {formatValor(item.valor)}
                        </Text>
                    </View>

                    {routeMeusAnuncios &&
                        <View style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-end",
                        }}>
                            <Feather
                                name="more-vertical"
                                size={15}
                            ></Feather>

                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>

        );
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            <FlatList
                style={{ flex: 1 }}
                data={anuncios}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </ScrollView>
    )
};

export default ListAnuncio;

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

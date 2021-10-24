import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'



export function News({ navigation }) {
    const [data, getData] = useState([])

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = () => {
        axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                getData(response.data)
                // console.log(response.data.title)
            })
    }

    const moreDetails = (item) => {
        navigation.navigate('Details', { item })
        // console.log('itemId',item)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textTitleStyle}>New list</Text>
            </View>
            <FlatList
                style={{ marginTop: 16, paddingLeft: 18, paddingRight: 18 }}
                data={data}
                onEndReachedThreshold={10}
                keyExtractor={(item, index) => {
                    return index.toString();
                }}
                renderItem={({ item }) => {
                    // console.log('item', item)
                    return (
                        <View style={styles.itemArea}>
                            <View style={styles.item}>
                                <View style={styles.textArea}>
                                    <View style={styles.titleArea}>
                                        <Text style={{ fontSize: 14, color: 'black', lineHeight: 21, fontFamily: 'Roboto-Medium' }}>{item.title}</Text>
                                    </View>
                                    <View >
                                        <Text style={{ fontSize: 14, lineHeight: 21, color: '#A0ABB2', fontFamily: 'Roboto-Medium' }} numberOfLines={2}>{item.body}</Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.backGroundIcon} onPress={() => moreDetails(item.id)}>
                                        <Icon name="chevron-forward-outline"
                                            color={'#466BC9'}
                                            size={15}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default News;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    header: {
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        height: 88,
        justifyContent: 'center'
    },
    textTitleStyle: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'Roboto-Bold'

    },
    itemArea: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        paddingTop: 8,
        marginRight: 16
    },
    item: {
        flex: 1,
        height: 'auto',
        width: '100%',
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: "#F0F2F580",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
        padding: '11.11%',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    titleArea: {
        width: 232,
        marginBottom: 4
    },
    textArea: {
        width: 232,
        flexDirection: 'column'
    },
    backGroundIcon: {
        backgroundColor: '#ecf0fb',
        width: 21,
        height: 21,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 10
    }
})
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native';


export function Albums({ navigation }) {
    const [data, setData] = useState([])
    const [albums, setAlbums] = useState([])
    const isFocused = useIsFocused()
    const columns = 2

    useEffect(() => {
        getData()
    }, [isFocused])

    const getData = () => {
        axios
            .get('https://jsonplaceholder.typicode.com/photos')
            .then(response => {
                setData(response.data)
                // console.log(response.data)
            })
            .then(() => {
                const firstPhotoinAlbum = data.reduce((acumulator, item) => {
                    const isDuplicat = acumulator.find((i) => i.albumId === item.albumId)
                    if (!isDuplicat) {
                        return [...acumulator, item]
                    }
                    return acumulator;
                }, [])
                setAlbums(firstPhotoinAlbum)
                console.log('uniklane itemy', firstPhotoinAlbum)
            })
    }

    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textTitleStyle}>Albums</Text>
            </View>
            <FlatList
                style={{ marginTop: 16,paddingHorizontal:16}}
                numColumns={columns}
                columnWrapperStyle={{justifyContent:'space-between'}}
                data={albums}
                keyExtractor={(item, index) => {
                    return index.toString()
                }}
                renderItem={({ item }) => {
                    return (
                            <View style={styles.item}>
                                <View style={styles.imageArea}>
                                    <Image source={{ uri: item.url }} style={styles.imageStyle}></Image>
                                </View>
                                <View style={styles.titleArea}>
                                    <Text style={{ fontSize: 14, lineHeight: 21, color: '#001524', textAlign: 'center',fontFamily:'Roboto-Medium' }} numberOfLines={1}>{item.title}</Text>
                                </View>
                            </View>
                    )
                }}
            />
        </View>
    )
}

export default Albums;

const width=Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
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
        fontWeight: 'bold',
        fontFamily: 'Gilroy'
    },
    itemArea: {
        marginTop: 8,
        width:width /2,
        
    },
    item: {
        height: 139,
        width: '49%',
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
        flexDirection: 'column',
        marginTop:8
    },
    titleArea: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '30%'
    },
    imageArea: {
        height: '70%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: "contain",
    },
    imageStyle: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    }

})
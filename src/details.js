import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'


export function Details({ route, navigation }) {
    const [data, setData] = useState([])
    const [commentData, setCommentData] = useState([])
    const [textComment, setTextComment] = useState()
    const { item } = route.params
    const isFocused = useIsFocused()

    useEffect(() => {
        moreDetails()
        commentList()
    }, [isFocused])

    const moreDetails = () => {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${item}`)
            .then(response => {
                setData(response.data)
            })
    }

    const commentList = () => {
        axios
            .get('https://jsonplaceholder.typicode.com/posts/1/comments')
            .then(response => {
                setCommentData(response.data)
                // console.log(response.data)
            })
    }

    const sendComment = () => {
        axios
            .post('https://jsonplaceholder.typicode.com/posts/1/comments', {
                postId: 1,
                id: id,
                name: '',
                email: '',
                body: textComment,

            })
            .then(function (response) {
                alert(JSON.stringify(response.data));
                console.log(body)
            })

    }

    const [icone, setIcone] = useState({
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 100,
    })
    const [titlee, setTitlee] = useState({
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 200,
    })

    const userComment = commentData.map((item, index) => {

        return (
            <View style={styles.itemArea} key={index}>
                <View style={styles.item} >
                    <View style={styles.textArea}>
                        <View style={styles.titleArea}>
                            <Text style={{ fontSize: 20, color: 'black', lineHeight: 26, fontFamily: 'Roboto-Medium' }}>{item.name}</Text>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <Text style={{ fontSize: 14, lineHeight: 25, color: '#182F40', fontFamily: 'Roboto-Light' }}>{item.body}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    })

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 2 }}>
                <View style={styles.header}>
                    <View {...icone}
                        setStyle={setIcone}
                        style={{ marginLeft: '6%' }}>
                        <TouchableOpacity style={styles.backGroundIcon} onPress={() => navigation.goBack()}>
                            <Icon name="chevron-back-outline"
                                color={'#147865'}
                                size={18}
                            />
                        </TouchableOpacity>
                    </View>
                    <View {...titlee}
                        setStyle={setTitlee}>
                        <Text style={styles.textTitleStyle}>News details</Text>
                    </View>

                </View>
                <View style={styles.itemDetails}>
                    <View style={styles.item}>
                        <View style={styles.textArea}>
                            <View style={styles.titleArea}>
                                <Text style={{ fontSize: 20, color: 'black', lineHeight: 26, fontFamily: 'Roboto-Bold' }}>{data.title}</Text>
                            </View>
                            <View style={{ marginTop: 12 }}>
                                <Text style={{ fontSize: 14, lineHeight: 25, color: '#182F40', fontFamily: 'Roboto-Light' }}>{data.body}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.commentsArea}>
                    <Text style={{ fontSize: 14, color: '#586976', marginLeft: 8, fontFamily: 'Roboto-Medium' }}>Comments</Text>
                    <View style={styles.textInputStyle} >
                        <TextInput
                            placeholder='Here you can add your comment...'
                            placeholderTextColor='#586976'
                            multiline={true}
                            numberOfLines={3}
                            onChangeText={text => setTextComment(text)}
                            value={textComment}
                        ></TextInput>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={sendComment}>
                        <Text style={styles.txtButton}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 18, marginBottom: 24 }}>
                    <ScrollView>{userComment}</ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}

export default Details;

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
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    textTitleStyle: {
        fontSize: 16,
        color: 'black',

        fontFamily: 'Roboto-Bold',
        alignItems: 'center',


    },
    itemArea: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        marginTop: 8,
        paddingLeft: 16,
        paddingRight: 16,

    },
    itemDetails: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        marginTop: 24,
        paddingLeft: 16,
        paddingRight: 16,

    },
    item: {
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
        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    titleArea: {
        width: 232
    },
    textArea: {
        flexDirection: 'column',
    },
    backGroundIcon: {
        borderColor: '#F0F2F5',
        borderWidth: 1,
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 10
    },
    commentsArea: {
        marginTop: 40,
        paddingLeft: 16,
        paddingRight: 16,
    },
    textInputStyle: {

        height: 123,
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
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 14,
        color: '#586976',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 12
    },
    button: {
        width: '100%',
        height: 48,
        borderRadius: 8,
        backgroundColor: '#466BC9',
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center'

    },
    txtButton: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Roboto-Medium'
    }
})
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { firebase } from '../firebase/config'

export default function AdminHome() {
    const id = firebase.auth().currentUser.uid
    const [name, setName] = useState("")

    firebase
        .firestore()
        .collection('users')
        .doc(id)
        .get()
        .then((doc) => {
            setName(doc.data().name)
        })

    return (
        <View>
            <Text>Admin Dashboard</Text>
            <Text>Hey {name}</Text>
            
        </View>
    )
}
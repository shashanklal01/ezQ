import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { firebase } from '../firebase/config'
import UserHome from '../user/UserHome'
import AdminHome from '../admin/AdminHome'

export default function Home() {

    const id = firebase.auth().currentUser.uid
    const [isAdmin, setIsAdmin] = useState(false)

    firebase
        .firestore()
        .collection('admins')
        .doc(id)
        .get()
        .then((doc) => {
            if (doc.exists) {
                setIsAdmin(true)
            }
        })

    return (
        <View>
            {isAdmin ? (
                <AdminHome />
            ) : (
                    <UserHome />
                )}
        </View>
    )
}
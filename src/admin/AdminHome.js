import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { firebase } from '../firebase/config'
import AdminDashBoard from './AdminDashboard'
import AdminSetup from './AdminSetup'

export default function AdminHome() {

    const id = firebase.auth().currentUser.uid
    const [hasSetUp, setHasSetUp] = useState(false)

    firebase
        .firestore()
        .collection('admins')
        .doc(id)
        .get()
        .then(doc => setHasSetUp(doc.data().hasSetUp))
        .catch(error => alert(error))

    return (
        <View>
            {(hasSetUp) ? <AdminDashBoard /> : <AdminSetup /> }
        </View>
    )
}
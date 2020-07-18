import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { firebase } from '../firebase/config'
import AdminDashBoard from './AdminDashboard'
import AdminSetup from './AdminSetup'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

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
        <Stack.Navigator >
            {hasSetUp ? (
                <Stack.Screen
                    name="Dashboard"
                    options={{ headerShown: false }}
                    component={AdminDashBoard}
                />
            ) : (
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="Setup"
                        component={AdminSetup}
                    />
                )}
        </Stack.Navigator>
    )
}
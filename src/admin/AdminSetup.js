import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Card } from 'react-native-elements'

export default function AdminSetup() {
    return (
        <View>
            <Card
                title='Current Queue'
                titleStyle={styles.titleSyle}
            >
                
            </Card>
            <Card
                title='Manage Queue'
                titleStyle={styles.titleSyle}
            >
                
            </Card>
            <Card
                title='some other option'
                titleStyle={styles.titleSyle}
            >
                
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        textAlign: "center",
        position: "absolute",
    },
})
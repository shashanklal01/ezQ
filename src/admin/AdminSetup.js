import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Card } from 'react-native-elements'

export default function AdminSetup() {
    return (
        <View>
            <Card containerStyle={styles.card}>
                <Card
                    containerStyle={styles.card}
                    title='Current Queue'
                    titleStyle={styles.titleSyle}
                >

                </Card>
                <Card
                    containerStyle={styles.card}
                    title='Manage Queue'
                    titleStyle={styles.titleSyle}
                >

                </Card>
                <Card
                    containerStyle={styles.card}
                    title='some other option'
                    titleStyle={styles.titleSyle}
                >

                </Card>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20,
    },
    titleStyle: {
        textAlign: "center",
        position: "absolute",
    },
})
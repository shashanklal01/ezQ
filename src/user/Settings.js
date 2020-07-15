import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Card, Header } from 'react-native-elements';

export default function Settings() {

    const onSignoutPress = () => {
        firebase
            .auth()
            .signOut()
            .then(() => alert("Signout successful"))
            .catch(error => alert(error))
    }

    return (
        <KeyboardAwareScrollView >
            <Header centerComponent={{ text: 'Your Profile' }} />
            <Card
                containerStyle={styles.card}
                title='What is the name of your pharmacy?'
                titleStyle={styles.titleSyle}
            >
                <TextInput
                    placeholder='e.g. CVS'
                    autoCorrect={false}
                    inputStyle={styles.input}
                    onChangeText={val => setPharmaName(val)}
                    //value={pharmaName}
                />
            </Card>
            <TouchableOpacity
                onPress={() => onSignoutPress()}
                style={styles.button}
            >
                <Text style={styles.buttonTitle}>Signout</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 100,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Card, Header } from 'react-native-elements';

export default function Settings() {

    const [pharmaName, setPharmaName] = useState("")
    const [pharmaAddress, setPharmaAddress] = useState("")

    const onSignoutPress = () => {
        firebase
            .auth()
            .signOut()
            .then(() => alert("Signout successful"))
            .catch(error => alert(error))
    }

    return (
        <KeyboardAwareScrollView>
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
                    value={pharmaName}
                />
            </Card>
            <Card
                containerStyle={styles.card}
                title='What is the Address (Address, City, State, ZIP code)?'
                titleStyle={styles.titleSyle}
            >
                <TextInput
                    placeholder='Address, City, State, ZIP code'
                    autoCorrect={false}
                    inputStyle={styles.input}
                    onChangeText={val => setPharmaAddress(val)}
                    value={pharmaAddress}
                />
            </Card>
            <Card
                containerStyle={styles.card}
                title='Cover Picture'
                titleStyle={styles.titleSyle}
            >
                <TouchableOpacity
                    style={styles.buttonSmall}
                    onPress={() => onSignupPress()}> {/*NEEDS TO ACCESS PHONE'S GALLERY*/}
                    <Text style={styles.buttonTitle}>Choose Photo</Text>
                </TouchableOpacity>
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
    buttonSmall: {
        backgroundColor: '#b3b3b3',
        marginLeft: 80,
        marginRight: 80,
        height: 30,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
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
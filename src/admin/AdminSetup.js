import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Card, Header } from 'react-native-elements'

export default function AdminSetup() {

    const [pharmaName, setPharmaName] = useState("")
    const [days, setDays] = useState([])
    const [avgWait, setAvgWait] = useState(0)
    const [openTime, setOpenTime] = useState("")

    const onSubmitPress = () => {
        // DO THE FOLLOWING:
        // 1. change 'hasSetUp' boolean in the account info stored to 'true'
        const id = firebase.auth().currentUser.uid

        firebase
            .firestore()
            .collection('admins')
            .doc(id)
            .update({
                hasSetUp: true,
            })

        firebase
            .firestore()
            .collection('pharmacies')
            .doc()
            .set({
                pharmaName: pharmaName,
                days: days,
                avgWait: avgWait,
                openTime: openTime,
            })
            .then(() => alert("Pharmacy successfully set up!"))
            .catch(error => alert(error))
    }


    return (
        <KeyboardAwareScrollView>
            <Header centerComponent={{ text: 'Set Up Your Pharmacy' }} />
            <Card containerStyle={styles.card}>
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
                    title='Where are you located?'
                    titleStyle={styles.titleSyle}
                >
                    <Text>need to implement google maps here</Text>
                </Card>
                <Card
                    containerStyle={styles.card}
                    title='What are your days of operation?'
                    titleStyle={styles.titleSyle}
                >
                    
                </Card>
                <Card
                    containerStyle={styles.card}
                    title='What time are you open on these days?'
                    titleStyle={styles.titleSyle}
                >

                </Card>
                <Card
                    containerStyle={styles.card}
                    title='Average wait time per customer (min)'
                    titleStyle={styles.titleSyle}
                >

                </Card>
                <Card
                    containerStyle={styles.card}
                    title='some other option'
                    titleStyle={styles.titleSyle}
                >

                </Card>
                <Card
                    containerStyle={styles.card}
                    title='some other option'
                    titleStyle={styles.titleSyle}
                >

                </Card>
                <Card
                    containerStyle={styles.card}
                    title='some other option'
                    titleStyle={styles.titleSyle}
                >

                </Card>
                <Card
                    containerStyle={styles.card}
                    title='some other option'
                    titleStyle={styles.titleSyle}
                >

                </Card>
                <Card
                    containerStyle={styles.card}
                    title='some other option'
                    titleStyle={styles.titleSyle}
                >
                </Card>
                <TouchableOpacity
                    onPress={() => onSubmitPress()}
                    style={styles.button}
                >
                    <Text style={styles.buttonTitle}>Set Up Your Pharmacy</Text>
                </TouchableOpacity>
            </Card >

        </KeyboardAwareScrollView >
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
        marginVertical: 10,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20,
    },
    titleStyle: {
        textAlign: "center",
        position: "absolute",
    },
    input: {
        height: 10
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
    }
})
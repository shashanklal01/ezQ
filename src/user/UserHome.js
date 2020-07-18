import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config';
import { Card, Header } from 'react-native-elements';
import { handleQueryId } from "../util/index.js";


export default function UserHome() {
    const id = firebase.auth().currentUser.uid;
    const [name, setName] = useState("");
    const [queues, setQueues] = useState("");

    //Gets called once the application renders
    useEffect(() => {
        //changes the state of queues to whats returned from handleQueryId
        setQueues(handleQueryId("1fied8DyP6JWAMoSpHFK"));
    })

    firebase
        .firestore()
        .collection('users')
        .doc(id)
        .get()
        .then((doc) => {
            setName(doc.data().name)
        })

    //var curQueues = data.map(name, )
    return (
        
        <View>
            <KeyboardAwareScrollView>
                <Header centerComponent={{ text: 'Your Dashboard' }} />
                <Card containerStyle={styles.card}>
                    <Card
                        containerStyle={styles.card}
                        title='Queues will be displayed here'
                        titleStyle={styles.titleSyle}
                    >
                        {/* loop through queues state and display queues */}
                        {/* <TextInput
                        placeholder='e.g. CVS'
                        autoCorrect={false}
                        inputStyle={styles.input}
                        onChangeText={val => setPharmaName(val)}
                        value={pharmaName}
                    /> */}
                    </Card>
                </Card>
            </KeyboardAwareScrollView>
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
    }
})
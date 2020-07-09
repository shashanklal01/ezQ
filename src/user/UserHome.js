import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config';
import { Card, Header } from 'react-native-elements';
import TabNav from '../components/TabNav'

export default function UserHome() {
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

    //var curQueues = data.map(name, )


    return (
        <View>
            <KeyboardAwareScrollView>
                <Header centerComponent={{ text: 'Your Dashboard' }} />
                {/* <Card
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
                </Card> */}
            </KeyboardAwareScrollView>
            <TabNav />
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
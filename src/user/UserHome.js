import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config';
import { Card, Header } from 'react-native-elements';
import { handleQueryId } from "../util/index.js";
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

export default function UserHome() {
    const id = firebase.auth().currentUser.uid;
    const [qName, setQName] = useState("");
    const [queues, setQueues] = useState(null)
    const [queue, setQueue] = useState(null)
    const [queueDetails, setQueueDetails] = useState(null)
    const [visible, setVisible] = useState(false)

    const toggleModal = () => {
        setVisible(!visible)
    }

    // firebase
    //     .firestore()
    //     .collection('users')
    //     .doc(id)
    //     .get()
    //     .then((doc) => {
    //         setName(doc.data().name)
    //     })

    useEffect(() => {
        searchQueues()
        //changes the state of queues to whats returned from handleQueryId
        setQueue(handleQueryId("1fied8DyP6JWAMoSpHFK"));
    }, [])

    const searchQueues = () => {
        firebase
            .firestore()
            .collection('users')
            .doc(id)
            .get()
            .then(doc => setQueues(doc.data().curQueues))
            .catch(error => alert(error))
    }

    const getQueueDetails = (qId) => {
        firebase
            .firestore()
            .collection('queues')
            .doc(qId)
            .get()
            .then(doc => setQueueDetails(doc.data()))
            .catch(error => alert(error))
    }

    const getQName = (qId) => {
        const [qName, setQName] = useState("");
        firebase
            .firestore()
            .collection('queues')
            .doc(qId)
            .get()
            .then(doc => setQName(doc.data().qName))
            .catch(error => alert(error))
        return qName
    }

    const getPharmaName = () => {
        const [pharmaName, setPharmaName] = useState("")
        firebase
            .firestore()
            .collection('queues')
            .doc(qId)
            .get()
            .then(doc => setPharmaName(doc.data().pharmaId))
            .catch(error => alert(error))
        return pharmaName
    }

    const getWaitTime = () => {
        const [waitTime, setWaitTime] = useState(null)
        firebase
            .firestore()
            .collection('queues')
            .doc(qId)
            .get()
            .then(doc => setWaitTime(doc.data().users.length))
            .catch(error => alert(error))
        return waitTime
    }

    return (
        <View>
            <KeyboardAwareScrollView>
                <Header centerComponent={{ text: 'Your Dashboard', style: { color: '#fff' } }} />
                <Card containerStyle={styles.card}>
                    {!queues ? (
                        <View>
                            <Text style={styles.cardContent}>You are currently not in any queues!</Text>
                            <Text style={styles.cardContent}>To join one, head onto the Nearby Tab!</Text>
                        </View>
                    ) : (
                            <FlatList
                                data={queues}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => toggleModal()}>
                                        <Card containerStyle={styles.cardContent}>
                                            <Text>{getQName(item)}</Text>
                                        </Card>
                                        <Modal isVisible={visible}>
                                            <Card containerStyle={styles.card}>
                                                <Text>{getQName(item)}</Text>
                                                <Text>{getPharmaName(item)}</Text>
                                                <Text>{getWaitTime(item)}</Text>
                                            </Card>
                                            <TouchableOpacity
                                                onPress={() => toggleModal()}
                                                style={styles.button}>
                                                <Text style={styles.buttonTitle}>Go back</Text>
                                            </TouchableOpacity>
                                        </Modal>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
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
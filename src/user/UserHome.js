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

    // added in this bc it said qId was invalid
    const [qId, setQId] = useState(null)


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
        //setQueue(handleQueryId("1fied8DyP6JWAMoSpHFK"));
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

    //const [qName, setQName] = useState("");
    const getQName = (qId) => {
        firebase
            .firestore()
            .collection('queues')
            .doc(qId)
            .get()
            .then(doc => setQName(doc.data().qName))
            .catch(error => alert(error))
        return qName
    }

    const [pharmaName, setPharmaName] = useState("")
    const getPharmaName = (qId) => {
        firebase
            .firestore()
            .collection('queues')
            .doc(qId)
            .get()
            .then(doc => setPharmaName(doc.data().pharmaId))
            .catch(error => alert(error))
        return pharmaName
    }

    const [waitTime, setWaitTime] = useState(null)
    const getWaitTime = (qId) => {
        firebase
            .firestore()
            .collection('queues')
            .doc(qId)
            .get()
            .then(doc => {
                const count = doc.data().users.length
                const wait = doc.data().maxWaitPerCustomer
                setWaitTime(count * wait)
        })
            .catch(error => alert(error))
        return waitTime
    }

    const handleLeaveQueue = (qId) => {
        // removes the user from the queue
        firebase
            .firestore()
            .collection('queues')
            .doc(qId)
            .update({
                    'users': firebase.firestore.FieldValue.arrayRemove(id)
            })

        // removes the queue from the user
        firebase
            .firestore()
            .collection('users')
            .doc(id)
            .update({
                    'curQueues': firebase.firestore.FieldValue.arrayRemove(qId)
            })

        searchQueues() // at end looks for new queues
        //right now tested this by putting handleLeaveQueue to happen when the button is press to look at a queue, but this works as intended (assuming you send the correct qId in)
    }

    console.log("Current queues that this user can see:")
    console.log(queues)
    // slight bug here: when have more than one queue both cards keep switching back and forth between the names of the queues
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
                                keyExtractor={(item) => item['qId']}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        //console.log(item)
                                        //handleLeaveQueue(item)
                                        toggleModal()}
                                    }>
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
                                            <TouchableOpacity
                                                onPress={() => {
                                                    handleLeaveQueue(item)
                                                    toggleModal()
                                                    }
                                                }
                                                style={styles.button}>
                                                <Text style={styles.buttonTitle}>Leave Queue</Text>
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

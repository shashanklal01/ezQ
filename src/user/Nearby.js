import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Header, Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

export default function Nearby() {

    const [visible, setVisible] = useState(false)
    const [qId, setQId] = useState(null)

    const [nearbyPharma, setNearbyPharma] = useState([
        // { name: 'pharma 1', pharmaId: 1, qId: ['pickup1', 'flu1'], curCount: 5, time: 10 + ' min' },
        // { name: 'pharma 2', pharmaId: 2, qId: ['pickup2', 'flu2'], curCount: 3, time: 1 + ' min' },
    ])

    useEffect(() => {
        // in this, we want to set the array 'nearbyPharma' to an array
        // of all the nearby pharmacies, basically retrieve this info
        // from firebase and store into this array.
        // use the preset array on top as an example
        // const snapshot = firebase.firestore().collection('pharmacies').get()
        // setNearbyPharma(snapshot.docs.map(doc => doc.data()))
        // console.log(nearbyPharma)

        firebase
            .firestore()
            .collection('pharmacies')
            .get()
            .then(snapshot => {
                setNearbyPharma(snapshot.docs.map(doc => doc.data()))
            })
        console.log(nearbyPharma)
        //console.log(nearbyPharma[1].curQueuesId)
    }, [])

    const toggleModal = () => {
        setVisible(!visible)
    }

    const handleJoinQueue = (qId) => {
        //  adding a user to a queue for a specific pharmacy
        // (and adding that queue to the list for the user)

        const curUser = firebase.auth().currentUser.uid
        firebase
            .firestore()
            .collection('queues')
            .doc(qId)
            .update({
                users: firebase.firestore.FieldValue.arrayUnion(curUser)
            })
            .then(() => {
                firebase
                    .firestore()
                    .collection('users')
                    .doc(curUser)
                    .update({
                        curQueues: firebase.firestore.FieldValue.arrayUnion(qId)
                    })
                    .then(() => {
                        toggleModal()
                        alert("Queue joined successfully!")
                    })
                    .catch(error => alert(error))
            })
            .catch(error => alert(error))
    }

    const getCurPeople = (qId) => {
        firebase
            .firestore()
            .collection('queues')
            .doc(qId)
            .get()
            .then(doc => {
                return doc.data().users.length
            })
    }

    const getWaitTime = (qId) => {
        firebase
            .firestore()
            .collection('queues')
            .doc(qId)
            .get()
            .then(doc => {
                const wait = doc.data().maxWaitPerCustomer
                const curCount = doc.data().users.length
                return (wait * curCount)
            })
    }

    return (
        <SafeAreaView>
            <Header centerComponent={{ text: 'Nearby Pharmacies', style: { color: '#fff' } }} />
            <FlatList
                keyExtractor={(item) => item.pharmaId}
                data={nearbyPharma}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleModal()}>
                        <Card containerStyle={styles.cardContent}>
                            <View style={styles.cardTitle}>
                                <Text style={styles.pharmName}>{item['pharmaName']}</Text>
                                <Text style={styles.addressText}>{item['pharmaAddress']}</Text>
                            </View>
                            <Text>{getCurPeople(item['curQueuesId'][0])} people in queue</Text>
                            <Text>{getWaitTime(item['curQueuesId'][0])} avg. wait time</Text>
                        </Card>
                        <Modal isVisible={visible}>
                            <Card containerStyle={styles.card}>
                                <View style={styles.cardTitle}>
                                    <Text style={styles.pharmName}>{item['pharmaName']}</Text>
                                    <Text style={styles.addressText}>{item['pharmaAddress']}</Text>
                                </View>
                                <View style={styles.modalContent}> 
                                    <Text style={styles.modalContentInfo}>{getCurPeople(item['curQueuesId'][0])} people currently in queue</Text>
                                    <Text style={styles.modalContentInfo}>Estimated {getWaitTime(item['curQueuesId'][0])} of wait time</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        handleJoinQueue(item['curQueuesId'][0])
                                    }
                                    }>
                                    <Text style={styles.buttonTitle}>Join Queue</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => toggleModal()}
                                    style={styles.button}>
                                    <Text style={styles.buttonTitle}>Go back</Text>
                                </TouchableOpacity>
                            </Card>
                        </Modal>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
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
        paddingLeft: 30,
        paddingBottom: 30
    },
    modalContent: {
        marginHorizontal: 18,
        marginVertical: 20,
    },
    modalContentInfo: {
        fontSize: 20,
        textAlign: "center",
        marginVertical: 5,
    },
    titleStyle: {
        textAlign: "center",
        position: "absolute",
    },
    input: {
        height: 10
    },
    pharmName:{
        fontSize: 20,
    },
    cardTitle: {
        marginVertical: 10,
    },
    addressText: {
        color: '#919191',
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
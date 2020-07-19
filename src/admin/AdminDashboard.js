import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Card, Header } from 'react-native-elements'
import Modal from 'react-native-modal'
import MultiSelect from 'react-native-multiple-select';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

export default function AdminDashboard() {
    const [visible, setVisible] = useState(false)
    const [qName, setQName] = useState(null)
    const [time, setTime] = useState(null)
    const [autocall, setAutocall] = useState(null)
    const [partySize, setPartySize] = useState(null)
    const [queues, setQueues] = useState(null)
    const adminId = firebase.auth().currentUser.uid
    const [qId, setQId] = useState(null)
    const [pharmaId, setPharmaId] = useState(null)

    const toggleModal = () => {
        setVisible(!visible)
    }

    const handleSetupQueue = () => {
        if (!(qName !== null && time !== null && autocall !== null && partySize !== null)) {
            alert("One of the fields have been left incomplete, please check!")
            return
        }
        firebase
            .firestore()
            .collection('queues')
            .add({
                maxWaitPerCustomer: time[0],
                pharmaId: "",
                autocall: autocall[0],
                partySizeReq: partySize[0],
                qName: qName,
                users: [],
                upNextUser: "",
                qId: "",
            })
            .then((docRef) => {
                firebase
                    .firestore()
                    .collection('queues')
                    .doc(docRef.id)
                    .update({
                        qId: docRef.id,
                    })
                    .then(() => {
                        setQId(docRef.id)
                        storeQRefToPharmacy()
                        alert("Queue successfully created!")
                        toggleModal()
                    })
            })
            .catch(error => alert(error))
    }

    const storeQRefToPharmacy = () => {
        firebase
            .firestore()
            .collection('admins')
            .doc(adminId)
            .get()
            .then(doc => {
                setPharmaId(doc.data().pharmaId)
                console.log(pharmaId)
                firebase
                    .firestore()
                    .collection('pharmacies')
                    .doc(pharmaId)
                    .update({
                        curQueuesId: firebase.firestore.FieldValue.arrayUnion(qId)
                    })
            })
    }

    const autocallItems = [{
        id: true,
        name: 'True',
    },
    {
        id: false,
        name: 'False'
    }]

    const timeItems = [{
        id: 2,
        name: '< 2 min',
    },
    {
        id: 5,
        name: '< 5 min',
    },
    {
        id: 10,
        name: '< 10 min',
    },
    {
        id: 15,
        name: '< 15 min',
    },
    {
        id: 20,
        name: '< 20 min',
    },
    {
        id: 30,
        name: '< 30 min'
    },
    {
        id: 60,
        name: '< 30 min'
    }]

    const showQueueDetails = () => {

    }

    useEffect(() => {
        // get all queues of this pharmacy
    }, [])

    return (
        <KeyboardAwareScrollView>
            <Header centerComponent={{ text: 'Your Dashboard', style: { color: '#fff' } }} />
            <FlatList
                data={queues}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => showQueueDetails()}>

                    </TouchableOpacity>
                )}
            />
            <Modal visible={visible} propagateSwipe={true}>
                <ScrollView>
                    <Card>
                        <Header
                            //leftComponent={{icon: 'arrow-back'}} 
                            centerComponent={{ text: 'New Queue' }} />

                        <Card
                            containerStyle={styles.card}
                            title='Give your queue a name'
                            titleStyle={styles.titleSyle}
                        >
                            <TextInput
                                placeholder='e.g. Pickup, Flu Shot etc.'
                                autoCorrect={false}
                                inputStyle={styles.input}
                                onChangeText={val => setQName(val)}
                                value={qName}
                            />
                        </Card>
                        <Card
                            containerStyle={styles.card}
                            title='Average wait time per customer'
                            titleStyle={styles.titleSyle}
                        >
                            <MultiSelect
                                single={true}
                                items={timeItems}
                                uniqueKey="id"
                                onSelectedItemsChange={(val) => setTime(val)}
                                selectText={`< ${time} min`}
                            />
                        </Card>
                        <Card
                            containerStyle={styles.card}
                            title='Autocall customers?'
                            titleStyle={styles.titleSyle}
                        >
                            <MultiSelect
                                single={true}
                                items={autocallItems}
                                uniqueKey="id"
                                onSelectedItemsChange={(val) => setAutocall(val)}
                                selectText={`${autocall}`}

                            />
                        </Card>
                        <Card
                            containerStyle={styles.card}
                            title='Require party size?'
                            titleStyle={styles.titleSyle}
                        >
                            <MultiSelect
                                single={true}
                                items={autocallItems}
                                uniqueKey="id"
                                onSelectedItemsChange={(val) => setPartySize(val)}
                                selectText={`${partySize}`}

                            />
                        </Card>

                        <TouchableOpacity
                            onPress={() => handleSetupQueue()}
                            style={styles.button} >
                            <Text style={styles.buttonTitle}>Create New Queue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => toggleModal()}
                            style={styles.button} >
                            <Text style={styles.buttonTitle}>Return to Dashboard</Text>
                        </TouchableOpacity>
                    </Card>
                </ScrollView>
            </Modal>
            <TouchableOpacity
                onPress={() => toggleModal()}
                style={styles.button}
            >
                <Text style={styles.buttonTitle}>Set Up A New Queue</Text>
            </TouchableOpacity>
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
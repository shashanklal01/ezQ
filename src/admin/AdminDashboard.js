import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Card, Header } from 'react-native-elements'
import Modal from 'react-native-modal';
import MultiSelect from 'react-native-multiple-select';

export default function AdminDashboard() {
    const [visible, setVisible] = useState(false)
    const [qName, setQName] = useState("")
    const [time, setTime] = useState([])
    const [autocall, setAutocall] = useState([])
    const [partySize, setPartySize] = useState([])

    const toggleModal = () => {
        setVisible(!visible)
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
        id: 45,
        name: '< 45 min',
    },
    {
        id: 60,
        name: '< 60 min'
    },
    {
        id: 120,
        name: '< 120 min'
    }]

    return (
        <KeyboardAwareScrollView>
            <Header centerComponent={{ text: 'Your Dashboard' }} />
            <Modal isVisible={visible}>
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
                        onPress={() => toggleModal()}
                        style={styles.button} >
                        <Text style={styles.buttonTitle}>Create New Queue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => toggleModal()}
                        style={styles.button} >
                        <Text style={styles.buttonTitle}>Return to Dashboard</Text>
                    </TouchableOpacity>
                </Card>
            </Modal>
            <TouchableOpacity
                onPress={() => toggleModal()}
                style={styles.button}
            >
                <Text style={styles.buttonTitle}>Set Up A New Queue</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
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
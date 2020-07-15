import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Card, Header } from 'react-native-elements'
import MultiSelect from 'react-native-multiple-select';

export default function AdminSetup() {

    const [pharmaName, setPharmaName] = useState("")
    const [days, setDays] = useState([])
    const [openTime, setOpenTime] = useState("")

    const daysItems = [{
        id: 'monday',
        name: 'Monday'
    },
    {
        id: 'tuesday',
        name: 'Tuesday',
    },
    {
        id: 'wednesday',
        name: 'Wednesday',
    },
    {
        id: 'thursday',
        name: 'Thursday',
    },
    {
        id: 'friday',
        name: 'Friday',
    },
    {
        id: 'saturday',
        name: 'Saturday',
    },
    {
        id: 'sunday',
        name: 'Sunday',
    }]

    const timeItems = [{
        id: '00:00',
        name: '12 am'
    },
    {
        id: '01:00',
        name: '1 am'
    },
    {
        id: '02:00',
        name: '2 am'
    },
    {
        id: '03:00',
        name: '3 am'
    },
    {
        id: '04:00',
        name: '4 am'
    },
    {
        id: '05:00',
        name: '5 am'
    },
    {
        id: '06:00',
        name: '6 am'
    },
    {
        id: '07:00',
        name: '7 am'
    },
    {
        id: '08:00',
        name: '8 am'
    },
    {
        id: '09:00',
        name: '9 am'
    },
    {
        id: '10:00',
        name: '10 am'
    },
    {
        id: '11:00',
        name: '11 am'
    },
    {
        id: '12:00',
        name: '12 pm'
    },
    {
        id: '13:00',
        name: '1 pm'
    },
    {
        id: '14:00',
        name: '2 pm'
    },
    {
        id: '15:00',
        name: '3 pm'
    },
    {
        id: '16:00',
        name: '4 pm'
    },
    {
        id: '17:00',
        name: '5 pm'
    },
    {
        id: '18:00',
        name: '6 pm'
    },
    {
        id: '19:00',
        name: '7 pm'
    },
    {
        id: '20:00',
        name: '8 pm'
    },
    {
        id: '21:00',
        name: '9 pm'
    },
    {
        id: '22:00',
        name: '10 pm'
    },
    {
        id: '23:00',
        name: '11 pm'
    },]

    const onSubmitPress = () => {
        const adminId = firebase.auth().currentUser.uid
        firebase
            .firestore()
            .collection('pharmacies')
            .add({
                pharmaName: pharmaName,
                days: 'lol',
                openTime: 'lol',
                curQueuesId: [],
                createdById: adminId,
            })
            .then((docRef) => {
                firebase
                    .firestore()
                    .collection('admins')
                    .doc(adminId)
                    .update({
                        pharmaId: docRef.id,
                        hasSetUp: true,
                    })
                alert("Pharmacy successfully set up!")
            })
            .catch(error => alert(error))
    }


    return (
        <KeyboardAwareScrollView>
            <Header centerComponent={{ text: 'Set Up Your Pharmacy' }} />
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
                <MultiSelect
                    items={daysItems}
                    uniqueKey="id"
                    onSelectedItemsChange={(val) => setDays([...days, val])}
                    selectText={`${days}`}
                />
                <Text>{days}</Text>
            </Card>
            <Card
                containerStyle={styles.card}
                title='What time are you open on these days? Choose the opening and closing time'
                titleStyle={styles.titleSyle}
            >
                <MultiSelect
                    items={timeItems}
                    uniqueKey="id"
                    onSelectedItemsChange={(val) => setOpenTime([...openTime, val])}
                    selectText={`Opens at ${openTime[0]} and closes at ${openTime[1]}`}
                />
                <Text>{openTime}</Text>
            </Card>
            <TouchableOpacity
                onPress={() => onSubmitPress()}
                style={styles.button}
            >
                <Text style={styles.buttonTitle}>Set Up Your Pharmacy</Text>
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
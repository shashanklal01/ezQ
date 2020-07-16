import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Header, Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

export default function Nearby() {

    const [visible, setVisible] = useState(false)
    const [nearbyPharma, setNearbyPharma] = useState([
        { name: 'pharma 1', id: 1, curCount: 5, time: 10 + ' min' },
        { name: 'pharma 2', id: 2, curCount: 3, time: 1 + ' min' }
    ])

    useEffect(() => {
        // in this, we want to set the array 'nearbyPharma' to an array
        // of all the nearby pharmacies, basically retrieve this info
        // from firebase and store into this array
    }, [])

    const toggleModal = () => {
        setVisible(!visible)
    }

    return (
        <View>
            <Header centerComponent={{ text: 'Nearby Pharmacies' }} />
            <FlatList
                keyExtractor={(item) => item.id}
                data={nearbyPharma}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleModal()}>
                        <Text>{item.name}</Text>
                        <Modal visible={visible}>
                            <Card containerStyle={styles.card}>
                                <Text>{item.name}</Text>
                                <Text>{item.curCount}</Text>
                                <Text>{item.time}</Text>
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
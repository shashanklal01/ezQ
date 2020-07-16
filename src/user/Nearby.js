import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker, } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Header } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default function Nearby() {

    const [nearbyPharma, setNearbyPharma] = useState(null)

    useEffect(() => {
        // in this, we want to set the array 'nearbyPharma' to an array
        // of all the nearby pharmacies, basically retrieve this info
        // from firebase and store into this array
    }, [])

    return (
        <View>
            <Header centerComponent={{ text: 'Nearby Pharmacies' }} />
            <FlatList
                keyExtractor={(item) => item.id}
                data={nearbyPharma}
                renderItem={({ item }) => (
                    <Text>Will input stuff from array here</Text>
                )}
            />
        </View>
    )
}
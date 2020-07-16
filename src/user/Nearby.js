import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker, } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { Header } from 'react-native-elements';

export default function Nearby() {

    return (
        <KeyboardAwareScrollView>
            <Header centerComponent={{ text: 'Nearby Pharmacies' }} />
            <Text>Nearby pharmacies page</Text>
        </KeyboardAwareScrollView>
    )
}
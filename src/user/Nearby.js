import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHome from '../user/UserHome';

export default function Nearby() {
    return (
        <Text>Nearby pharmacies page</Text>
    )
}
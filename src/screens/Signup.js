import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Picker } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'

export default function Signup({ navigation }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')

    const onLoginPress = () => {
        navigation.navigate('Login')
    }

    const onSignupPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                firebase
                    .firestore()
                    .collection(isAdmin ? 'admins' : 'users')
                    .doc(response.user.uid.toString())
                    .set(
                        (isAdmin) ? {
                            id: response.user.uid,
                            name: name,
                            email: email,
                            admin: isAdmin,
                            hasSetUp: false,
                            pharmaId: ""
                        } : {
                                id: response.user.uid,
                                name: name,
                                email: email,
                                admin: isAdmin,
                                curQueues: [],
                                commonlyVisited: [],
                                upNextQueues: [],
                                missedQueues: [],
                            })
                    .then(() => alert("Signup Successful!"))
                    .catch(error => alert(error))
            })
            .catch(error => alert(error))
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                //LOGO: source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(val) => setName(val)}
                    value={name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    keyboardType='email-address'
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(val) => setEmail(val)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(val) => setPassword(val)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(val) => setConfirmPassword(val)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>I am a:</Text>
                </View>
                <Picker
                    style={{ justifyContent: 'center', height: '10%' }}
                    placeholderTextColor="#aaaaaa"
                    placeholder='I am a:'
                    selectedValue={isAdmin}
                    onValueChange={(val) => setIsAdmin(val)}
                >
                    <Picker.Item label="Customer" value={false} />
                    <Picker.Item label="Administrator" value={true} />
                </Picker>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSignupPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={() => onLoginPress()} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 100,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
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
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})
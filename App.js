import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import UserStack from './src/components/UserStack';
import AdminStack from './src/components/AdminStack'
import { decode, encode } from 'base-64'
import { firebase } from './src/firebase/config'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [curUser, setCurUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  //const id = firebase.auth().currentUser.uid
  //var adminId = 'cBGY2r0clxMfI66xuZcPngfK8j32'
  var user = firebase.auth().currentUser;

  // looks like by default, the admin signs in, probably gonna have to fix this
  var adminid = 'oopsie'
  var id;
  // if user exists, get the user id
  if (user) {
    id = firebase.auth().currentUser.uid
  } else {
    id = adminid;
  }

  console.log(id);

  
  firebase
    .firestore()
    .collection('admins')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setIsAdmin(true)
      }
    })

  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged(user => setCurUser(user))

  }, [])

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    )
  }

  const AppStack = () => {
    return (isAdmin ? <AdminStack /> : <UserStack />)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator >
        {!curUser ? (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
          />
        ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name="App"
              component={AppStack}
            />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHome from '../user/UserHome';
import Nearby from '../user/Nearby';
import Settings from '../user/Settings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={UserHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Nearby Pharmacies"
        component={Nearby}
        options={{
          tabBarLabel: 'Nearby',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="near-me" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )

  // return (
  //   <Tab.Navigator
  //     initialRouteName="Feed"
  //     tabBarOptions={{
  //       activeTintColor: '#e91e63',
  //     }}
  //   >
  //     <Tab.Screen
  //       name="Home"
  //       component={UserHome}
  //       options={{
  //         tabBarLabel: 'Home',
  //         tabBarIcon: ({ color, size }) => (
  //           <MaterialCommunityIcons name="home" color={color} size={size} />
  //         ),
  //       }}
  //     />
  //     <Tab.Screen
  //       name="Nearby"
  //       component={Nearby}
  //       options={{
  //         tabBarLabel: 'Nearby',
  //         tabBarIcon: ({ color, size }) => (
  //           <MaterialCommunityIcons name="bell" color={color} size={size} />
  //         ),
  //       }}
  //     />
  //     <Tab.Screen
  //       name="Settings"
  //       component={Settings}
  //       options={{
  //         tabBarLabel: 'Settings',
  //         tabBarIcon: ({ color, size }) => (
  //           <MaterialCommunityIcons name="account" color={color} size={size} />
  //         ),
  //       }}
  //     />
  //   </Tab.Navigator>
  // );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PeoplePage from './pages/PeopleScreen';
import FormPeoplePage from './pages/FormPeopleScreen';
import TrackerPage from './pages/TrackerScreen';
import FormTrackerPage from './pages/FormTrackerScreen';
import PeopleScreen from './pages/PeopleScreen';
import FormPeopleScreen from './pages/FormPeopleScreen';
import TrackerScreen from './pages/TrackerScreen';
import FormTrackerScreen from './pages/FormTrackerScreen';

const PeopleStack = createNativeStackNavigator();
function PeopleStackScreen() {
  return (
    <PeopleStack.Navigator>
      <PeopleStack.Screen name="People" component={PeopleScreen} />
      <PeopleStack.Screen name="FormPeople" component={FormPeopleScreen} />
    </PeopleStack.Navigator>
  );
}

const TrackerStack = createNativeStackNavigator();
function TrackerStackScreen() {
  return (
    <TrackerStack.Navigator>
      <TrackerStack.Screen name="Tracker" component={TrackerScreen} />
      <TrackerStack.Screen name="FormTracker" component={FormTrackerScreen} />
    </TrackerStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="PeopleTab" component={PeopleStackScreen} options={{ title: 'People' }} />
        <Tab.Screen name="TrackerTab" component={TrackerStackScreen} options={{ title: 'Tracker' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

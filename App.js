import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import SurveyScreen from './screens/SurveyScreen';
import LoginScreen from './screens/LoginScreen';
import DetailScreen from './screens/DetailScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#5DADE2" },
          headerTintColor: "#fff",
          // headerShown: false,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen component={LoginScreen} name="Login"></Stack.Screen>
        <Stack.Screen component={SurveyScreen} name="Survey"></Stack.Screen>
        <Stack.Screen component={DetailScreen} name="Detail"></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

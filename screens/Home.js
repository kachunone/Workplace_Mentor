import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { signOutUser } from "../FirebaseApp";

import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const Home = ({  route }) => {
  const { userEmail } = route.params;

  // For testing
  const signOutPressed = () => {
    signOutUser();
    navigation.popToTop();
    // Alert.alert("User signed out");
  };

  return (
    // <Tab.Navigator>
    //   <Tab.Screen>
    // </Tab.Navigator>
    <View></View>
  );
};
const styles = StyleSheet.create({
  
  signOutBtn: {
    padding: 12,
    alignItems: "center",
    width: 355,
    color: "white",
    backgroundColor: "#5DADE2",
    marginTop: 70,
  },
  
});

export default Home;

import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import {
  auth,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../FirebaseApp";
import { onAuthStateChanged } from "firebase/auth";



const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
       createUserDocumentFromAuth(user.uid)
     }
   })
  }, [])

  const resetFormFields = () => {
    setEmail("");
    setPassword("");
  };

  const createNewAccountPressed = async () => {
    try {
      await createAuthUserWithEmailAndPassword(email, password);
      navigation.navigate('Survey', {userEmail: email});
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          console.log("Email already in use");
          Alert.alert("Email already in use");
          break;
        case "auth/weak-password":
          console.log("Passwords must contain at least 6 characters");
          Alert.alert("Passwords must contain at least 6 characters");
          break;
        default:
          console.log("user creation encountered an error", err.code);
          Alert.alert("User creation encountered errors", err.code);
          break;
      }
    }
  };

  const loginPressed = async () => {
    try {
      const user = await signInAuthUserWithEmailAndPassword(email, password);

      navigation.navigate("Survey", { userEmail: email});

      resetFormFields();
    } catch (err) {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        Alert.alert("Incorrect email or password");
      } else {
        Alert.alert("Error occured");
      }
    }
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login to Your Account</Text>

      <Text style={styles.text}>Email:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your email"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <Text style={styles.text}>Password:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your password"
        autoCapitalize="none"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />

      

      <TouchableOpacity style={styles.loginBtn} onPress={loginPressed}>
        <Text style={{ fontSize: 20, color: "white" }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createAccBtn}
        onPress={createNewAccountPressed}
      >
        <Text style={{ fontSize: 20, color: "#5DADE2" }}>
          Create New Account
        </Text>
      </TouchableOpacity>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    marginTop: 25,
    marginBottom: 25,
  },
  text: {
    fontSize: 20,
    width: 355,
    paddingBottom: 2,
    marginTop: 20,
  },
  textInput: {
    fontSize: 20,
    height: 40,
    width: 355,
    borderWidth: 1,
    paddingLeft: 10,
  },
  errorText: {
    backgroundColor: "#FFEBEE",
    color: "#FF0000",
    fontSize: 20,
    width: 355,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  loginBtn: {
    padding: 12,
    alignItems: "center",
    width: 355,
    color: "white",
    backgroundColor: "#5DADE2",
    marginTop: 70,
  },
  createAccBtn: {
    padding: 12,
    alignItems: "center",
    width: 355,
    color: "white",
    backgroundColor: "white",
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#5DADE2",
  },
});

export default LoginScreen;

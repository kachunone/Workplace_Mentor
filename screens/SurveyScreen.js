import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { signOutUser } from "../FirebaseApp";
import { db } from "../FirebaseApp";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { auth } from "../FirebaseApp";
import { onAuthStateChanged } from "firebase/auth";

const SurveyScreen = ({ navigation, route }) => {
  const { userEmail } = route.params;

  const [algorithms, setAlgorithms] = useState("0");
  const [dataAnalytics, setDataAnalytics] = useState("0");
  const [statistics, setStatistics] = useState("0");
  const [databasDesign, setDatabasDesign] = useState("0");
  const [programming, setProgramming] = useState("0");
  const [communication, setCommunication] = useState("0");
  const [storytelling, setStorytelling] = useState("0");
  const [timeManagement, setTimeManagement] = useState("0");
  const [negotiation, setNegotiation] = useState("0");
  const [teamwork, setTeamwork] = useState("0");
  const [recommendEmployees, setRecommendEmployees] = useState(null);

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  const getDataFromFirestore = async () => {
    const docRef = doc(db, "employeeSurvey", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setAlgorithms(docSnap.data().algorithms);
      setDataAnalytics(docSnap.data().dataAnalytics);
      setStatistics(docSnap.data().statistics);
      setDatabasDesign(docSnap.data().databasDesign);
      setProgramming(docSnap.data().programming);
      setCommunication(docSnap.data().communication);
      setStorytelling(docSnap.data().storytelling);
      setTimeManagement(docSnap.data().timeManagement);
      setNegotiation(docSnap.data().negotiation);
      setTeamwork(docSnap.data().teamwork);
    } else {
      console.log(
        "No such document!-------------------------------------------------------------"
      );
    }
  };

  const getRecommendationFromAPI = async (resultString) => {
    try {
      const response = await fetch(
        `https://employee-helper-app.herokuapp.com/search?answers=${resultString}`
      );
      const jsonData = await response.json();
      console.log(`Number of Response JSON Data : ${jsonData.length}`);
      console.log(jsonData[0].last_name);
      setRecommendEmployees(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  const saveAnwserToFirestore = async (array) => {
    try {
      await setDoc(doc(db, "employeeSurvey", userEmail), array);
      console.log(`Successfully save data to Firestore`);
    } catch (err) {
      console.log("gyygiygygy---------------", err);
    }
  };

  const submitPressed = () => {
    const skillsWantToLearn = {
      algorithms: algorithms,
      dataAnalytics: dataAnalytics,
      statistics: statistics,
      databasDesign: databasDesign,
      programming: programming,
      communication: communication,
      storytelling: storytelling,
      timeManagement: timeManagement,
      negotiation: negotiation,
      teamwork: teamwork,
    };

    saveAnwserToFirestore(skillsWantToLearn);

    const result =
      algorithms +
      dataAnalytics +
      statistics +
      databasDesign +
      programming +
      communication +
      storytelling +
      timeManagement +
      negotiation +
      teamwork;

    getRecommendationFromAPI(result);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log(
          `going to details screen,  mentor: ${item.first_name} ${item.last_name}`
        );
        navigation.navigate("Detail", { item: item });
      }}
    >
      <View style={styles.listItem}>
        <View>
          <Text>{`Name: ${item.first_name} ${item.last_name}`}</Text>
          <Text>{`Department: ${item.department}`}</Text>
          <Text>{`Email: ${item.email}`}</Text>
        </View>
        <FontAwesome name="angle-right" size={30} color="orangered" />
      </View>
    </TouchableOpacity>
  );

  // For testing
  const signOutPressed = () => {
    signOutUser();
    navigation.popToTop();
    // Alert.alert("User signed out");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <Text>Hi, {userEmail}</Text> */}

        <Text style={styles.title}>Which category do you need help?</Text>

        <View>
          <View style={styles.questionCard1}>
            <Text style={styles.subtitle}>Algorithms: </Text>
            <Picker
              style={styles.picker}
              selectedValue={algorithms}
              onValueChange={(itemValue) => setAlgorithms(itemValue)}
            >
              <Picker.Item label="Yes" value="1" />
              <Picker.Item label="No" value="0" />
            </Picker>
          </View>

          <View style={styles.questionCard2}>
            <Text style={styles.subtitle}>Data Analytics:</Text>
            <Picker
              style={styles.picker}
              selectedValue={dataAnalytics}
              onValueChange={(itemValue) => setDataAnalytics(itemValue)}
            >
              <Picker.Item label="Yes" value="1" />
              <Picker.Item label="No" value="0" />
            </Picker>
          </View>

          <View style={styles.questionCard1}>
            <Text style={styles.subtitle}>Statistics: </Text>
            <Picker
              style={styles.picker}
              selectedValue={statistics}
              onValueChange={(itemValue) => setStatistics(itemValue)}
            >
              <Picker.Item label="Yes" value="1" />
              <Picker.Item label="No" value="0" />
            </Picker>
          </View>

          <View style={styles.questionCard2}>
            <Text style={styles.subtitle}>Database Design: </Text>
            <Picker
              style={styles.picker}
              selectedValue={databasDesign}
              onValueChange={(itemValue) => setDatabasDesign(itemValue)}
            >
              <Picker.Item label="Yes" value="1" />
              <Picker.Item label="No" value="0" />
            </Picker>
          </View>

          <View style={styles.questionCard1}>
            <Text style={styles.subtitle}>Programming: </Text>
            <Picker
              style={styles.picker}
              selectedValue={programming}
              onValueChange={(itemValue) => setProgramming(itemValue)}
            >
              <Picker.Item label="Yes" value="1" />
              <Picker.Item label="No" value="0" />
            </Picker>
          </View>

          <View style={styles.questionCard2}>
            <Text style={styles.subtitle}>Communication: </Text>
            <Picker
              style={styles.picker}
              selectedValue={communication}
              onValueChange={(itemValue) => setCommunication(itemValue)}
            >
              <Picker.Item label="Yes" value="1" />
              <Picker.Item label="No" value="0" />
            </Picker>
          </View>

          <View style={styles.questionCard1}>
            <Text style={styles.subtitle}>Storytelling: </Text>
            <Picker
              style={styles.picker}
              selectedValue={storytelling}
              onValueChange={(itemValue) => setStorytelling(itemValue)}
            >
              <Picker.Item label="Yes" value="1" />
              <Picker.Item label="No" value="0" />
            </Picker>
          </View>

          <View style={styles.questionCard2}>
            <Text style={styles.subtitle}>Time Management: </Text>
            <Picker
              style={styles.picker}
              selectedValue={timeManagement}
              onValueChange={(itemValue) => setTimeManagement(itemValue)}
            >
              <Picker.Item label="Yes" value="1" />
              <Picker.Item label="No" value="0" />
            </Picker>
          </View>

          <View style={styles.questionCard1}>
            <Text style={styles.subtitle}>Negotiation: </Text>
            <Picker
              style={styles.picker}
              selectedValue={negotiation}
              onValueChange={(itemValue) => setNegotiation(itemValue)}
            >
              <Picker.Item label="Yes" value="1" />
              <Picker.Item label="No" value="0" />
            </Picker>
          </View>

          <View style={styles.questionCard2}>
            <Text style={styles.subtitle}>Teamwork: </Text>
            <Picker
              style={styles.picker}
              selectedValue={teamwork}
              onValueChange={(itemValue) => setTeamwork(itemValue)}
            >
              <Picker.Item label="Yes" value="1" />
              <Picker.Item label="No" value="0" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={submitPressed}>
          <Text style={{ fontSize: 20, color: "white" }}>Submit</Text>
        </TouchableOpacity>

        {recommendEmployees && (
          <Text style={styles.listTitle}>Recommended Mentors</Text>
        )}

        <FlatList
          data={recommendEmployees}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={renderItem}
        />

        <TouchableOpacity style={styles.signOutBtn} onPress={signOutPressed}>
          <Text style={{ fontSize: 20, color: "white" }}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 40,
  },
  title: {
    marginTop: 30,
    fontSize: 25,
  },
  questionCard1: {
    marginTop: 20,
    alignSelf: "flex-start",
    marginBottom: 20,
    backgroundColor: "#85C1E9",
    width: 390,
    height: 150,
  },
  questionCard2: {
    marginTop: 20,
    alignSelf: "flex-start",
    marginBottom: 20,
    backgroundColor: "#ABEBC6",
    width: 390,
    height: 150,
  },
  subtitle: {
    fontSize: 25,
    justifyContent: "center",
    marginStart: 30,
  },
  picker: {
    marginTop: -50,
    width: 100,
    height: 150,
  },
  submitBtn: {
    padding: 12,
    alignItems: "center",
    width: 390,
    color: "white",
    backgroundColor: "#5DADE2",
    // alignSelf:'center'
    // marginTop: 70,
  },
  listTitle: {
    marginTop: 30,
    marginBottom: 10,
    alignSelf: "center",
    fontSize: 25,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 1,
  },
  signOutBtn: {
    padding: 12,
    alignItems: "center",
    width: 390,
    color: "white",
    backgroundColor: "#5DADE2",
    marginTop: 70,
  },
});

export default SurveyScreen;

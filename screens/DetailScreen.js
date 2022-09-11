import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Linking, Button } from "react-native";

const DetailScreen = ({ route }) => {
  const { item } = route.params;

  const [algorithms, setAlgorithms] = useState(false);
  const [dataAnalytics, setDataAnalytics] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [databasDesign, setDatabasDesign] = useState(false);
  const [programming, setProgramming] = useState(false);
  const [communication, setCommunication] = useState(false);
  const [storytelling, setStorytelling] = useState(false);
  const [timeManagement, setTimeManagement] = useState(false);
  const [negotiation, setNegotiation] = useState(false);
  const [teamwork, setTeamwork] = useState(false);

  useEffect(() => {
    setAlgorithms(item.algorithms);
    setDataAnalytics(item.data_analytics);
    setStatistics(item.statistics);
    setDatabasDesign(item.database_design);
    setProgramming(item.programming);
    setCommunication(item.communication);
    setStorytelling(item.storytelling);
    setTimeManagement(item.time_management);
    setNegotiation(item.negotiation);
    setTeamwork(item.teamwork);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text
          style={styles.name}
        >{`Name: ${item.first_name} ${item.last_name}`}</Text>
        <Text
          style={styles.department}
        >{`Department: ${item.department}`}</Text>

        <Button onPress={() => Linking.openURL(`mailto:${item.email}`) }
          title={item.email} />
        
        <Image
          source={require("../assets/what-is-mentoring1-square.jpeg")}
          style={styles.imgMentor}
        />
        <View style={styles.skillSet}>
          <Text style={styles.skillTitle}>Skill Set:</Text>
          {algorithms && <Text style={styles.skill}>Algorithms</Text>}
          {dataAnalytics && <Text style={styles.skill}>Data Analytics</Text>}
          {statistics && <Text style={styles.skill}>Statistics</Text>}
          {databasDesign && <Text style={styles.skill}>Database Design</Text>}
          {programming && <Text style={styles.skill}>Programming</Text>}
          {communication && <Text style={styles.skill}>Communication</Text>}
          {storytelling && <Text style={styles.skill}>Storytelling</Text>}
          {timeManagement && <Text style={styles.skill}>Time Management</Text>}
          {negotiation && <Text style={styles.skill}>Negotiation</Text>}
          {teamwork && <Text style={styles.skill}>Teamwork</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  name: {
    marginTop: 30,
    marginStart: 20,
    fontSize: 24,
  },
  department: {
    marginTop: 10,
    marginStart: 20,
    fontSize: 24,
  },
  email: {
    marginTop: 10,
    marginStart: 20,
    fontSize: 24,
  },
  imgMentor: {
    alignSelf:'center',
    width: 400,
    height: 400,
    padding: 10,
    marginBottom: 10,
    marginTop: 30,
  },
  skillSet: {
    marginTop: 20,
    marginStart: 20,
  },
  skillTitle: {
    fontSize: 30,
    marginBottom: 10,
  },
  skill: {
    fontSize: 25,
    
  },
});

export default DetailScreen;

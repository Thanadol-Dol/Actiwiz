import React, { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from "@react-navigation/native";
import navigateToNextScreen from "../screens/LoginPage";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";

const RequestDataUser = ({ route, navigation }: { route: any, navigation : any }) => {
  if (!route || !route.params) {
    console.error('Error: Route or route params are missing!');
    return null; 
  }

  const { student_name, academic_email } = route.params;

  if (!student_name || !academic_email) {
    console.error('Error: Required route parameters are missing!');
    console.log('Route Params:', route.params);
    return null;
  }

  const [valueDegree, setValueDegree] = useState<string | null>(null);
  const [valueFaculty, setValueFaculty] = useState<string | null>(null);
  const [valueDepartment, setValueDepartment] = useState<string | null>(null);
  const [valueAcademicYear, setValueAcademicYear] = useState<string | null>(null);
  const [user_id, setUser_id] = useState('');

  const [itemsDegree, setItemsDegree] = useState<any[]>([]);
  const [itemsFaculty, setItemsFaculty] = useState<any[]>([]);
  const [itemsDepartment, setItemsDepartment] = useState<any[]>([]);
  const [itemsAcademicYear, setItemsAcademicYear] = useState<any[]>([
    { label: "First Year", value: "1" },
    { label: "Second Year", value: "2" },
    { label: "Third Year", value: "3" },
    { label: "Fourth Year", value: "4" },
  ]);

  const [apiToken, setApiToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiToken = async () => {
      try {
        const token = await AsyncStorage.getItem("apiToken");
        setApiToken(token);
        console.log("apiToken:", token);
      } catch (error) {
        console.error("Error fetching apiToken from AsyncStorage:", error);
      }
    };

    fetchApiToken();
  }, []);

  useEffect(() => {
    axios.get('https://actiwizcpe.galapfa.ro/academics/degrees')
      .then(response => {
        const data: any[] = response.data;
        const filteredData = data.filter(item => (
          item.DegreeName !== null &&
          item.DegreeName !== undefined &&
          !itemsDegree.find(degree => degree.label === item.DegreeName)
        ));
        setItemsDegree(filteredData);
      })
      .catch(error => {
        console.error('Error fetching degrees data:', error);
      });
  }, []);

  useEffect(() => {
    if (valueDegree) {
      axios.get(`https://actiwizcpe.galapfa.ro/academics/${valueDegree}/faculties`)
        .then(response => {
          const data: any[] = response.data;
          const filteredData = data.filter(item => (
            item.FacultyName !== null &&
            item.FacultyName !== undefined &&
            !itemsDegree.find(faculty => faculty.label === item.FacultyName)
          ));
          setItemsFaculty(filteredData);
        })
        .catch(error => {
          console.error('Error fetching faculties data:', error);
        });
    }
  }, [valueDegree]);

  useEffect(() => {
    if (valueFaculty) {
      axios.get(`https://actiwizcpe.galapfa.ro/academics/${valueDegree}/${valueFaculty}/departments`)
        .then(response => {
          const data: any[] = response.data;
          const filteredData = data.filter(item => (
            item.DepartmentName !== null &&
            item.DepartmentName !== undefined &&
            !itemsDegree.find(department => department.label === item.DepartmentName)
          ));
          setItemsDepartment(filteredData);
        })
        .catch(error => {
          console.error('Error fetching departments data:', error);
        });
    }
  }, [valueDegree, valueFaculty]);

  const handleSignup = () => {
    if (!student_name || !academic_email || !valueDegree || !valueFaculty || !valueDepartment || !apiToken) {
      console.error('Error: Required data or apiToken is missing!');
      return;
    }
  
    const userData = {
      "UserID": 0,
      "StudentName": student_name,
      "AcademicDegree": valueDegree,
      "AcademicYear": valueAcademicYear,
      "AcademicEmail": academic_email,
      "Faculty": valueFaculty,
      "Department": valueDepartment
    };

    axios.post('https://actiwizcpe.galapfa.ro/users/create', userData, {
      headers: {
        "Authorization": `Bearer ${apiToken}`
      }
    })
      .then(response => {
        console.log('User created successfully:', response.data);
        const userId = response.data.user_id;
        AsyncStorage.setItem("userId", userId.toString())
        .then(() => {
          console.log('User ID stored successfully:', userId);
          navigation.navigate('FeedPageEvent');
        })
        .catch(error => {
          console.error('Error storing user ID:', error);
        });
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <>
    <StatusBar backgroundColor={Color.iOSFFFFFF}/>
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require("../assets/Header_Actiwiz.png")}
      />
      <RNPickerSelect
        placeholder={{
          label: 'Select AcademicYear',
          value: null,
        }}
        onValueChange={(itemValue: string | null) => setValueAcademicYear(itemValue)}
        items={itemsAcademicYear}
        style={{inputAndroid: {
          marginBottom: 40,
          width: "80%",
          zIndex: 1,
          color: '#000000',
          height: 50,
          borderRadius: 10,
          borderWidth: 2,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          borderColor: '#000000',
          paddingHorizontal: 10,
          alignSelf: 'center',
        },}}
      />

      <RNPickerSelect
        placeholder={{
          label: 'Select Degree',
          value: null,
        }}
        onValueChange={(itemValue: string | null) => setValueDegree(itemValue)}
        items={itemsDegree.map(item => ({ label: item.DegreeName, value: item.DegreeName }))}
        style={{inputAndroid: {
          marginBottom: 40,
          width: "80%",
          zIndex: 1,
          color: '#000000',
          height: 50,
          borderRadius: 10,
          borderWidth: 2,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          borderColor: '#000000',
          paddingHorizontal: 10,
          alignSelf: 'center',
        },}}
      />

      <RNPickerSelect
        placeholder={{
          label: 'Select Faculty',
          value: null,
        }}
        onValueChange={(itemValue: string | null)=> setValueFaculty(itemValue)}
        items={itemsFaculty.map(item => ({ label: item.FacultyName, value: item.FacultyName }))}
        style={{inputAndroid: {
          marginBottom: 40,
          width: "80%",
          zIndex: 1,
          color: '#000000',
          height: 50,
          borderRadius: 10,
          borderWidth: 2,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          borderColor: '#000000',
          paddingHorizontal: 10,
          alignSelf: 'center',
        },}}
      />

      <RNPickerSelect
        placeholder={{
          label: 'Select Department',
          value: null,
        }}
        onValueChange={(itemValue: string | null) => setValueDepartment(itemValue)}
        items={itemsDepartment.map(item => ({ label: item.DepartmentName, value: item.DepartmentName }))}
        style={{inputAndroid: {
          marginBottom: 40,
          width: "80%",
          zIndex: 1,
          color: '#000000',
          height: 50,
          borderRadius: 10,
          borderWidth: 2,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          borderColor: '#000000',
          paddingHorizontal: 10,
          alignSelf: 'center',
        },}}
      />

      <Text style={styles.createYourAccount}>Create your account</Text>
      <Pressable style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Signup Now</Text>
      </Pressable>
    </View>
    </>
  );
}; 

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width: "100%",
    height: 170,
    marginBottom: "15%",
    marginTop: "10%",
  },
  createYourAccount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  signupButton: {
    backgroundColor: Color.colorDarkorange_200,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "50%",
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RequestDataUser;

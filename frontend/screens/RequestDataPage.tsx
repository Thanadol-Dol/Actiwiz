import React, { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color } from "../utils/GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { setNewTokens, removeCredentials } from "../utils/credentialUtils";

const RequestDataPage = ({ route, navigation }: { route: any, navigation : any }) => {
  const { student_name, academic_email } = route.params;
  const [valueDegree, setValueDegree] = useState<string | null>(null);
  const [valueFaculty, setValueFaculty] = useState<string | null>(null);
  const [valueDepartment, setValueDepartment] = useState<string | null>(null);
  const [valueAcademicYear, setValueAcademicYear] = useState<string | null>(null);

  const [itemsDegree, setItemsDegree] = useState<any[]>([]);
  const [itemsFaculty, setItemsFaculty] = useState<any[]>([]);
  const [itemsDepartment, setItemsDepartment] = useState<any[]>([]);
  const itemsAcademicYear = [
    { label: "First Year", value: "1" },
    { label: "Second Year", value: "2" },
    { label: "Third Year", value: "3" },
    { label: "Fourth Year", value: "4" },
  ];
  const [apiToken, setApiToken] = useState<string | null>(null);

  useEffect(() => {
    const setCredentials = async () => {
      const api_token = await AsyncStorage.getItem("apiToken");
      if (api_token && student_name && academic_email) {
        setApiToken(api_token);
      } else {
        removeCredentials();
        navigation.navigate("LoginPage", { refresh: true });
      }
    };
    setCredentials();
  }, []);

  const degreesQuery = async () => {
    try{
      const response = await axios.get('https://actiwizcpe.galapfa.ro/academics/degrees');
      const data: any[] = response.data;
      const filteredData = data.filter(item => (
        item.DegreeName !== null &&
        item.DegreeName !== undefined &&
        !itemsDegree.find(degree => degree.label === item.DegreeName)
      ));
      setItemsDegree(filteredData);
    } catch (error: any) {
        if(error.response.status === 401 || error.response.data.detail.includes("401")){
          try{
              const refreshToken = await AsyncStorage.getItem("refreshToken");
              const response = await setNewTokens(refreshToken);
              setApiToken(response.api_token);
          } catch (error) {
              removeCredentials();
              navigation.navigate("LoginPage", { refresh: true });
              alert("Token Expired. Please login again.");
          }
        }
    };
  }
  useEffect(() => {
    if(apiToken){
      degreesQuery();
    }
  }, [apiToken]);

  const facultiesQuery = async () => {
    try{
      const response = await axios.get(`https://actiwizcpe.galapfa.ro/academics/${valueDegree}/faculties`);
      const data: any[] = response.data;
      const filteredData = data.filter(item => (
        item.FacultyName !== null &&
        item.FacultyName !== undefined &&
        !itemsDegree.find(faculty => faculty.label === item.FacultyName)
      ));
      setItemsFaculty(filteredData);
    } catch (error: any) {
        if(error.response.status === 401 || error.response.data.detail.includes("401")){
          try{
              const refreshToken = await AsyncStorage.getItem("refreshToken");
              const response = await setNewTokens(refreshToken);
              setApiToken(response.api_token);
          } catch (error) {
              removeCredentials();
              navigation.navigate("LoginPage", { refresh: true });
              alert("Token Expired. Please login again.");
          }
        }
    };
  };
  useEffect(() => {
    if (apiToken && valueDegree) {
      facultiesQuery();
    }
  }, [apiToken,valueDegree]);

  const departmentsQuery = async () => {
    try{
      const response = await axios.get(`https://actiwizcpe.galapfa.ro/academics/${valueDegree}/${valueFaculty}/departments`);
      const data: any[] = response.data;
      const filteredData = data.filter(item => (
        item.DepartmentName !== null &&
        item.DepartmentName !== undefined &&
        !itemsDegree.find(department => department.label === item.DepartmentName)
      ));
      setItemsDepartment(filteredData);
    } catch (error: any) {
        if(error.response.status === 401 || error.response.data.detail.includes("401")){
          try{
              const refreshToken = await AsyncStorage.getItem("refreshToken");
              const response = await setNewTokens(refreshToken);
              setApiToken(response.api_token);
          } catch (error) {
              removeCredentials();
              navigation.navigate("LoginPage", { refresh: true });
              alert("Token Expired. Please login again.");
          }
        }
    };
  };
  useEffect(() => {
    if (apiToken && valueFaculty) {
      departmentsQuery();
    }
  }, [apiToken,valueFaculty]);

  const handleSignup = async () => {
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

    try{
      const response = await axios.post('https://actiwizcpe.galapfa.ro/users/create', userData, {
        headers: {
          "Authorization": `Bearer ${apiToken}`
        }
      })
      console.log('User created successfully:', response.data);
      const userId = response.data.user_id;
      await AsyncStorage.setItem("userId", userId.toString(10))
      console.log('User ID stored successfully:', userId);
      navigation.navigate('EventFeedPage');
    } catch (error: any) {
        if(error.response.status === 401 || error.response.data.detail.includes("401")){
          try{
              const refreshToken = await AsyncStorage.getItem("refreshToken");
              const response = await setNewTokens(refreshToken);
              setApiToken(response.api_token);
              alert("Token Expired. Please try again.");
          } catch (error) {
              removeCredentials();
              navigation.navigate("LoginPage", { refresh: true });
              alert("Token Expired. Please login again.");
          }
        }
    };
  };

  return (
    <>
    <StatusBar backgroundColor={Color.iOSFFFFFF}/>
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require("../assets/app-header.png")}
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

export default RequestDataPage;

import React, { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from "@react-navigation/native"; 
import navigateToNextScreen from "../screens/LoginPage";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RequestDataUser = ({ route }: { route: any }) => {
  if (!route || !route.params) {
    console.log(route);
    console.error('Error: Route or route params are missing!');
    return null; 
  }

  const { student_name, academic_email } = route.params;

  if (!student_name || !academic_email) {
    console.error('Error: Required route parameters are missing!');
    console.log('Route Params:', route.params);
    return null;
  }

  const [openDegree, setOpenDegree] = useState(false);
  const [openFaculty, setOpenFaculty] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openAcademicYear, setOpenAcademicYear] = useState(false);

  const [valueDegree, setValueDegree] = useState(null);
  const [valueFaculty, setValueFaculty] = useState(null);
  const [valueDepartment, setValueDepartment] = useState(null);
  const [valueAcademicYear, setValueAcademicYear] = useState(null);

  const [itemsDegree, setItemsDegree] = useState<any[]>([]);
  const [itemsFaculty, setItemsFaculty] = useState<any[]>([]);
  const [itemsDepartment, setItemsDepartment] = useState<any[]>([]);
  const [itemsAcademicYear, setItemsAcademicYear] = useState<any[]>([
    { label: "First Year", value: 1 },
    { label: "Second Year", value: 2 },
    { label: "Third Year", value: 3 },
    { label: "Fourth Year", value: 4 },
  ]);

  const navigation = useNavigation();
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

  console.log("itemsDegree:", itemsDegree);
  console.log("itemsFaculty:", itemsFaculty);
  console.log("itemsDepartment:", itemsDepartment);

  useEffect(() => {
    axios.get('https://actiwizcpe.galapfa.ro/academics/degrees')
      .then(response => {
        const data: any[] = response.data;
        const filteredData = data.filter(item => (
          item.DegreeName !== null &&
          item.DegreeName !== undefined &&
          !itemsDegree.find(degree => degree.key === item.DegreeName)
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
            !itemsDegree.find(faculty => faculty.key === item.FacultyName)
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
            !itemsDegree.find(department => department.key === item.DepartmentName)
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
    console.log('user_id:', userData.UserID);
    console.log('student_name:', student_name);
    console.log('valueDegree:', valueDegree);
    console.log('valueAcademicYear:', valueAcademicYear);
    console.log('academic_email:', academic_email);
    console.log('valueFaculty:', valueFaculty);
    console.log('valueDepartment:', valueDepartment);

    axios.post('https://actiwizcpe.galapfa.ro/users/create', userData, {
      headers: {
      "Authorization": `Bearer ${apiToken}`
    }})
      .then(response => {
        console.log('User created successfully:', response.data);
        navigateToNextScreen({ navigation: 'FeedPage' });
      })
      .catch(error => {
        console.error('Error creating user:', error);
        // Handle error
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require("../assets/Header_Actiwiz.png")}
      />
      <DropDownPicker
        placeholder="Select your academic year"
        open={openAcademicYear}
        value={valueAcademicYear}
        items={itemsAcademicYear.map((item, index) => ({ 
          key: index.toString(),
          label: item.label,
          value: item.value.toString(),
        }))}
        setOpen={setOpenAcademicYear}
        setValue={setValueAcademicYear}
        setItems={setItemsAcademicYear} 
        containerStyle={{ marginBottom: 20, width: "80%", zIndex: 1000 }}
      />

      <DropDownPicker
        placeholder="Select your degree"
        open={openDegree}
        value={valueDegree}
        items={itemsDegree.map((item, index) => ({
          key: index.toString(),
          label: item.DegreeName as string,
          value: item.DegreeName as string,
        }))}
        setOpen={setOpenDegree}
        setValue={setValueDegree}
        setItems={setItemsDegree}
        containerStyle={{ marginBottom: 20, width: "80%", zIndex: 950 }}
      />
      <DropDownPicker
        placeholder="Select your faculty"
        open={openFaculty}
        value={valueFaculty}
        items={itemsFaculty.map((item, index) => ({
          key: index.toString(),
          label: item.FacultyName as string,
          value: item.FacultyName as string,
        }))}
        setOpen={setOpenFaculty}
        setValue={setValueFaculty}
        setItems={setItemsFaculty}
        containerStyle={{ marginBottom: 20, width: "80%", zIndex: 900 }}
        dropDownContainerStyle={{ backgroundColor: "#fafafa" }}
      />
      <DropDownPicker
        placeholder="Select your department"
        open={openDepartment}
        value={valueDepartment}
        items={itemsDepartment.map((item, index) => ({
          key: index.toString(),
          label: item.DepartmentName as string,
          value: item.DepartmentName as string,
        }))}
        setOpen={setOpenDepartment}
        setValue={setValueDepartment}
        setItems={setItemsDepartment}
        containerStyle={{ marginBottom: 20, width: "80%", zIndex: 850 }}
      />

      <Text style={styles.createYourAccount}>Create your account</Text>
      <Pressable style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Signup now</Text>
      </Pressable>
    </View>
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
    marginBottom: 20,
  },
  createYourAccount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  signupButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RequestDataUser;

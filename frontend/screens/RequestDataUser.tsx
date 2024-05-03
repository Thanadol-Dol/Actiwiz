import React, { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";

const RequestDataUser = () => {
  const [openDegree, setOpenDegree] = useState(false);
  const [openFaculty, setOpenFaculty] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);

  const [valueDegree, setValueDegree] = useState(null);
  const [valueFaculty, setValueFaculty] = useState(null);
  const [valueDepartment, setValueDepartment] = useState(null);

  const [itemsDegree, setItemsDegree] = useState<any[]>([]);
  const [itemsFaculty, setItemsFaculty] = useState<any[]>([]);
  const [itemsDepartment, setItemsDepartment] = useState<any[]>([]);

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
            !itemsDegree.find(degree => degree.key === item.FacultyName)
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
            !itemsDegree.find(degree => degree.key === item.DepartmentName)
          ));
          setItemsDepartment(filteredData);
        })
        .catch(error => {
          console.error('Error fetching departments data:', error);
        });
    }
  }, [valueDegree,valueFaculty]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require("../assets/Header_Actiwiz.png")}
      />
        <DropDownPicker
            placeholder="Select your degree"
            open={openDegree}
            value={valueDegree}
            items={itemsDegree.map((item, index) => ({
            key : index.toString(),
            label: item.DegreeName,
            value: item.DegreeName,
          }))}
          setOpen={setOpenDegree}
          setValue={setValueDegree}
          setItems={setItemsDegree}
          containerStyle={{ marginBottom: 20, width: "80%", zIndex: 1000}}
  />
<DropDownPicker
  placeholder="Select your faculty"
  open={openFaculty}
  value={valueFaculty}
  items={itemsFaculty.map((item, index) => ({
    key : index.toString(),
    label: item.FacultyName,
    value: item.FacultyName,
  }))}
  setOpen={setOpenFaculty}
  setValue={setValueFaculty}
  setItems={setItemsFaculty}
  containerStyle={{ marginBottom: 20, width: "80%", zIndex: 999}}
  dropDownContainerStyle={{ backgroundColor: "#fafafa" }}
/>
<DropDownPicker
  placeholder="Select your department"
  open={openDepartment}
  value={valueDepartment}
  items={itemsDepartment.map((item, index) => ({
    key : index.toString(),
    label: item.DepartmentName,
    value: item.DepartmentName,
  }))}
  setOpen={setOpenDepartment}
  setValue={setValueDepartment}
  setItems={setItemsDepartment}
  containerStyle={{ marginBottom: 20, width: "80%", zIndex: 998}} 
/>

      <Text style={styles.createYourAccount}>Create your account</Text>
      <Pressable style={styles.signupButton} onPress={() => {}}>
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

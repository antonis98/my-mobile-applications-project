import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ScrollView,SafeAreaView } from 'react-native';
import {Actions} from 'react-native-router-flux';


export default class UserScreen extends Component {

  constructor(props){
      super(props);
      this.state = {
        userdata: [],
        email:'',
        password: '',
        first_name:'',
        last_name: ''
      };
    }

    componentDidMount(){
      this.GetUser();
    }

  GetUser = () => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+id, {
      headers: {
        'X-Authorization':token
      },
    })
          .then((response) => response.json())
          .then((responseJson) => {
              console.log(responseJson);
              this.setState({
                  userdata: responseJson
              })
          })
          .catch((error) => {
              console.log(error);
          });
      }

      UpdateUser = () => {
            let to_send = {
              email: this.state.email,
              password: this.state.password,
              first_name: this.state.first_name,
              last_name: this.state.last_name,
            };

            return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+id, {
              method: 'patch',
              headers: {
                'Content-Type': 'application/json',
                'X-Authorization':token
              },
              body: JSON.stringify(to_send)
            })
            .then((responseJson) => {
              if(response.status === 200) {
                this.setState({
                    userdata: responseJson
                })
               alert("You successfully Updated your details.");
             }
              else if(response.status === 400) {
                alert("Password must be greater than 5 charecters.");
                alert("Password or Email is not correct.");
              };
            })
            .catch((error) => {
              console.log(error);
            })
          }

render(){
  return(
      <View style={styles.container}>
      <View style={styles.header}>
      <ScrollView>
      <TextInput style={styles.inputBox}
      onChangeText={(first_name) => this.setState({first_name})}
      placeholder="Name"
      />
      <TextInput style={styles.inputBox}
      onChangeText={(last_name) => this.setState({last_name})}
      placeholder="SurName"
      />
      <TextInput style={styles.inputBox}
      onChangeText={(email) => this.setState({email})}
      placeholder="Email"
      />
      <TextInput style={styles.inputBox}
      onChangeText={(password) => this.setState({password})}
      placeholder="Password"
      secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={() => {this.UpdateUser();}}>Update your info</Text>
      </TouchableOpacity>
      </ScrollView>
      </View>
      <View style={styles.footer}>
      <Text>{JSON.stringify(this.state.userdata)}</Text>
      </View>
      </View>
  )
}

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  inputBox: {
      width: 250,
      backgroundColor: '#eeeeee',
      borderRadius: 25,
      paddingHorizontal: 10,
      fontSize: 15,
      color: 'black',
      marginVertical: 10
  },
  button: {
      width: 300,
      backgroundColor: 'blue',
      borderRadius: 25,
      marginVertical: 25,
      paddingVertical: 10
  },
  buttonText: {
      fontSize: 20,
      fontWeight: '500',
      color: 'white',
      textAlign: 'center'
  }
  });

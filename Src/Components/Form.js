import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, AsyncStorage, Keyboard, PermissionsAndroid,Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Actions} from 'react-native-router-flux';


export default class Form extends Component {

  GotoMain(){
    Actions.GotoMain()
  }

  loginUser = () => {
        let to_send = {
          email: this.state.email,
          password: this.state.password,
        };
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(to_send)
        })
        .then((response) => response.json())
        .then((responseJson) => {
          id = responseJson.id;
          token = responseJson.token;
            alert('Looged In!');
            this.GotoMain();
        })
        .catch((error) => {
          console.log(error);
        })
      }

      CreateUser = () => {
            let to_send = {
              email: this.state.email,
              password: this.state.password,
              first_name: this.state.first_name,
              last_name: this.state.last_name,
            };

            return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(to_send)
            })
            .then((response) => {
              if(response.status === 201) {
               alert("You successfully registered.");
             }
              else if(response.status === 400) {
                alert("Password must be greater than 5 charecters.");
                alert("Password or Email is not correct or acount already exist.");
              };
            })
            .catch((error) => {
              console.log(error);
            })
          }

    constructor(props){
      global.id;
      global.token;
        super(props);
        this.state={
            email:'',
            password: '',
            first_name:'',
            last_name: ''
        }
    }

    saveData =async()=>{
        const {email,password,first_name,last_name} = this.state;
        //save data with asyncstorage
        let loginDetails={
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name
        }

        if(this.props.type == 'Signup')
        {
             this.CreateUser();
             AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
             Keyboard.dismiss();
             this.login();
       }
        else if(this.props.type == 'Login')
        {
            try{
                let loginDetails = await AsyncStorage.getItem('loginDetails');
                let ld = JSON.parse(loginDetails);

                if (ld.email != null && ld.password != null)
                {
                      this.loginUser();
                }

            }catch(error)
            {
                alert(error);
            }
        }
    }

    showData = async()=>{
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);
        alert('email: '+ ld.email + ' ' + 'password: ' + ld.password + '' + 'Name: '+ ld.first_name + ' ' + 'Surname: ' + ld.last_name);

    }

    render() {
      const renderAuthButton = () => {
      if(this.props.type == 'Signup') {
        return <TextInput style={styles.inputBox}
        onChangeText={(first_name) => this.setState({first_name})}
        placeholder="Name"
        />
      }
    }
    const renderAuthButton2 = () => {
    if(this.props.type == 'Signup') {
      return <TextInput style={styles.inputBox}
      onChangeText={(last_name) => this.setState({last_name})}
      placeholder="SurName"
      />
    }
  }
        return(
<ScrollView>
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({email})}
                placeholder="Email"
                onSubmitEditing={()=> this.password.focus()}/>

                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})}
                placeholder="Password"
                secureTextEntry
                ref={(input) => this.password = input}
                />
                {renderAuthButton()}
                {renderAuthButton2()}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => { this.saveData();  }}>{this.props.type}</Text>
                </TouchableOpacity>

            </View>
</ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
        marginVertical: 100,
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    }
});

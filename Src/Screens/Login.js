import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';

import {Actions} from 'react-native-router-flux';
import Form from '../Components/Form';


export default class Login extends Component {

    signup() {
        Actions.signup()
    }

    render() {
        return(
                <View style={styles.container}>
                <Text>Welcome to the Log in Page</Text>
                <Text>Please Enter your Email and Password Below!</Text>
                <Form type="Login"/>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Dont have an account yet? </Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Signup Here</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    signupTextCont: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 20,
      flexDirection: 'row',
    },
    signupText: {
      color: 'black',
      fontSize:17,
    },
    signupButton: {
        color: 'blue',
        fontSize:15,
        fontWeight: '500',
    }
});

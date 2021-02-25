import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView, AsyncStorage, Keyboard } from 'react-native';
import {Actions} from 'react-native-router-flux';
import Form from '../Components/Form';


export default class Signup extends Component {

    goBack() {
        Actions.pop()
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>After you Sign up Correctly</Text>
                <Text>Click the Log in Button Below</Text>
                <Form type="Signup"/>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account? </Text>
                    <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Log in</Text></TouchableOpacity>
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
      backgroundColor: 'white'
    },
    signupTextCont: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 15,
      flexDirection: 'row'
    },
    signupText: {
      color: 'black',
      fontSize:17
    },
    signupButton: {
        color: 'blue',
        fontSize:17,
        fontWeight: '500'
    }
});

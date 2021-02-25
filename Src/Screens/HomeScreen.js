import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar} from 'react-native';
import {Actions} from 'react-native-router-flux';


export default class HomeScreen extends Component {
  login() {
      Actions.login()
    }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Text>Welcome to the app!!</Text>
        </View>
         <View style={styles.footer}>
           <Text style={styles.title}>Search for the best Coffee Place near you!</Text>
           <Text style={styles.text}>Sign in with your acount to get started!</Text>
           <TouchableOpacity style={styles.button}>
            <Text style={styles.textSign} onPress={this.login}>Sign in to get started</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1565c0'
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
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  textSign: {
      color: 'black',
      fontWeight: 'bold'
  }
});

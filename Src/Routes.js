import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './Screens/Login';
import Signup from './Screens/Signup';
import MainScreen from './Screens/MainScreen';
import HomeScreen from './Screens/HomeScreen';
import UserScreen from './Screens/UserScreen';

export default class Routes extends Component {
    render() {
        return (
            <Router barButtonIconStyle ={styles.barButtonIconStyle}
                hideNavBar={false}
                navigationBarStyle={{backgroundColor: '#1565c0',}}
                titleStyle={{color: 'white',}}
            >
                <Stack key="root">
                <Scene key="HomeScreen" component={HomeScreen} title="HomeScreen"/>
                <Scene key="login" component={Login} title="Login"/>
                <Scene key="signup" component={Signup} title="Sign up"/>
                <Scene key="GotoMain" component={MainScreen} title="Main Page"/>
                <Scene key="GotoUser" component={UserScreen} title="User Information"/>
                </Stack>
            </Router>
        )
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: 'white'
    }
}

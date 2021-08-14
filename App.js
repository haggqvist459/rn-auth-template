import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native'
import AppStack from './src/stacks/AppStack';
import { UserProvider } from './src/contexts/UserContext';
import { FirebaseProvider } from './src/contexts/FirebaseContext';

const App = () => {

        useEffect(() => {
                console.log("App useEffect start")
                // ignore the warnings from firebase, only happens on Android
                LogBox.ignoreLogs(['Setting a timer']);
                return () => {
                        console.log("App useEffect return")
                }
        }, [])

        return (
                <FirebaseProvider>
                        <UserProvider>
                                <NavigationContainer>
                                        <AppStack />
                                </NavigationContainer>
                        </UserProvider>
                </FirebaseProvider>

        )
}

export default App

/*

TODO:
* Constants for component routes
* More Base components, streamline CSS
* Add toggle password visibility icon to password fields

*/
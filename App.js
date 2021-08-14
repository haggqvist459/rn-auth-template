import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/stacks/AppStack';
import { UserProvider } from './src/contexts/UserContext';
import { FirebaseProvider } from './src/contexts/FirebaseContext';

const App = () => {

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
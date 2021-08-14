import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SignIn, SignUp } from '../screens';

const AuthStack = () => {

        const AuthStack = createStackNavigator();

        return (
                <AuthStack.Navigator headerMode='none'>
                        <AuthStack.Screen name={'SignIn'} component={SignIn}/>
                        <AuthStack.Screen name={'SignUp'} component={SignUp}/>
                </AuthStack.Navigator>
        )
}

export default AuthStack


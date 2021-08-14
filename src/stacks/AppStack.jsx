import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { UserContext } from '../contexts/UserContext'
import { Splash } from '../screens'

const AppStack = () => {

        const AppStack = createStackNavigator();
        const [user] = useContext(UserContext)

        return (
                <AppStack.Navigator headerMode='none'>
                        {user.isLoggedIn === null ? <AppStack.Screen name="Splash" component={Splash} />
                        :
                        user.isLoggedIn ?
                                <AppStack.Screen name="Main" component={MainStack} />
                                :
                                <AppStack.Screen name="Auth" component={AuthStack} />
                        }     
                </AppStack.Navigator>
        )
}

export default AppStack
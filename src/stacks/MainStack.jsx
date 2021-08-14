import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home, Profile } from '../screens'

const MainStack = () => {

        const MainStack = createStackNavigator()
        return (
                <MainStack.Navigator headerMode="none">
                        <MainStack.Screen name={'Home'} component={Home}/>
                        <MainStack.Screen name={'Profile'} component={Profile}/>
                </MainStack.Navigator>
        )
}

export default MainStack


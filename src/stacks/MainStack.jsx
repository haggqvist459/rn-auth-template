import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Profile } from '../screens'
import { COLORS, ROUTES, adjustSize } from '../utils';
import { MaterialIcons } from '@expo/vector-icons';


const MainStack = () => {

        const MainStack = createBottomTabNavigator();

        const tabBarOptions = {
                showLabel: false,
                style: {
                        backgroundColor: COLORS.BLACK,
                }
        }

        const screenOptions = ({route}) => ({
                tabBarIcon: ({focused}) => {
                        let iconName = 'home'
                        switch(route.name) {
                                case ROUTES.HOME: 
                                        iconName = 'home';
                                        break;
                                case ROUTES.PROFILE:
                                        iconName = 'account-circle';
                                        break; 

                        }
                
                        return <MaterialIcons name={iconName} size={adjustSize(30)} color={focused ? COLORS.WHITE : COLORS.GRAY} />
                }
        })


        return (
                <MainStack.Navigator headerMode='none' tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
                        <MainStack.Screen name={ROUTES.HOME} component={Home}/>
                        <MainStack.Screen name={ROUTES.PROFILE} component={Profile}/>
                </MainStack.Navigator>
        )
}

export default MainStack;
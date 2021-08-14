import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import { UserContext } from '../contexts/UserContext'
import { FirebaseContext } from '../contexts/FirebaseContext'
import { loadFonts, COLORS } from '../utils'

const Splash = () => {

        const [_, setUser] = useContext(UserContext)
        const firebase = useContext(FirebaseContext)

        useEffect(() => {
                console.log("Splash useEffect start");

                
                getFonts().then(() => {
                        getCurrentUser();
                })
        }, []);


        const getFonts = async () => {
                try {
                        await loadFonts();
                } catch (error) {
                        console.error("could not load fonts: ", error);
                }
        }

        const getCurrentUser = async () => {
                try {
                        const user = await firebase.onAuthStateChanged();
                        if (user) {
                                console.log("Splash useEffect firebase.onAuthStateChanged result: ", user.uid);
                                const userInfo = await firebase.getUserInfo(user.uid);
                                setUser({
                                        isLoggedIn: true,
                                        email: userInfo.email,
                                        username: userInfo.username,
                                        uid: user.uid
                                })
                        } else {
                                console.log("Splash useEffect user not found");
                                setUser(state => ({ ...state, isLoggedIn: false }));
                        }
                } catch (error) {
                        console.error("error checking for a user: ", error);
                }
        }

        return (
                <Container>
                        <LottieView 
                                source={require("../assets/animations/loading-circle-blue.json")} 
                                autoPlay 
                                loop
                                speed={1.25}
                        />
                        <StatusBar barStyle='light-content'/>
                </Container>
        )
}

export default Splash

const Container = styled.View`
        flex: 1;
        align-items: center;
        justify-content: center;
        background-color: ${COLORS.WHITE_COFFEE};
`;

const StatusBar = styled.StatusBar``;
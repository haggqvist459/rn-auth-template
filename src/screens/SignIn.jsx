import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Alert, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { UserContext } from '../contexts/UserContext';
import { FirebaseContext } from '../contexts/FirebaseContext';
import { Text, Input } from '../components/base';
import { MaterialIcons } from '@expo/vector-icons';

// needs keyboard avoiding view etc


const SignIn = ({ navigation }) => {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [passwordHidden, setPasswordHidden] = useState(true);
        const [loading, setLoading] = useState(false);

        const [_, setUser] = useContext(UserContext);
        const firebase = useContext(FirebaseContext);

        // hook calls for this component
        useEffect(() => {
                console.log("SignIn useEffect start")

                return () => {
                        console.log("SignIn Screen useEffect cleanup")
                }
        }, [])

        const handleSignIn = async () => {
                setLoading(true);
                try {
                        await firebase.signIn(email, password);
                        const uid = firebase.getCurrentUser().uid;
                        console.log('handleSignIn uid: ', uid);
                        const userInfo = await firebase.getUserInfo(uid);
                        setUser({
                                username: userInfo.username,
                                email: userInfo.email,
                                uid,
                                isLoggedIn: true,
                                isLoading: false,
                        })
                } catch (error) {
                        console.log("error @signin, ", error.message);
                        createAlert(error.message);
                } finally {
                        setLoading(false);
                }
        }

        const createAlert = (error) => {
                Alert.alert(
                        error,
                        " ",
                        [{ text: "OK" }],
                )
        }

        return (
                <Container
                        behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <Main>
                                        <WelcomeContainer>
                                                <Text title semi center>
                                                        Welcome Back!
                                                </Text>
                                        </WelcomeContainer>
                                        <Auth>
                                                <AuthContainer>
                                                        <Text tiny semi left uppercase color={'#8C8B8B'}>Email Address:</Text>
                                                        <Input
                                                                autoCapitalize="none"
                                                                autoCompleteType="email"
                                                                autoCorrect={false}
                                                                keyboardType="email-address"
                                                                onChangeText={(value) => setEmail(value)}
                                                        />
                                                </AuthContainer>
                                                <AuthContainer>
                                                        <Text tiny semi left uppercase color={'#8C8B8B'}>Password:</Text>
                                                        <PasswordInputView>
                                                                <AuthField
                                                                        autoCapitalize="none"
                                                                        autoCompleteType="password"
                                                                        autoCorrect={false}
                                                                        secureTextEntry={passwordHidden}
                                                                        onChangeText={(value) => setPassword(value)}
                                                                />
                                                                <PasswordIconToggle onPress={() => setPasswordHidden(!passwordHidden)}>
                                                                        <MaterialIcons name={`visibility${passwordHidden ? '-off' : ''}`} size={24} color="black" />
                                                                </PasswordIconToggle>
                                                        </PasswordInputView>
                                                </AuthContainer>
                                        </Auth>
                                        <ButtonContainer
                                                onPress={() => handleSignIn()}
                                                disabled={loading}>
                                                {loading ?
                                                        <Loading /> :
                                                        <Text bold center color={'#181400'}>Sign In</Text>}
                                        </ButtonContainer>
                                        <SignUpLink onPress={() => navigation.navigate('SignUp')}>
                                                <Text small center> New to the app?<Text bold color={'#F1C902'}> Sign Up! </Text> </Text>
                                        </SignUpLink>
                                        <HeaderGraphic>
                                                <RightCircle />
                                                <LeftCircle />
                                        </HeaderGraphic>
                                        <StatusBar barStyle="light-content" />
                                </Main>
                        </TouchableWithoutFeedback>
                </Container>
        )
}

export default SignIn

const Container = styled.KeyboardAvoidingView`
        flex: 1;
        background-color: #E9E7E8;
`;
const Main = styled.View`
        flex: 1;
`;

const WelcomeContainer = styled.View`
        margin-top: 150px;
`;

const Auth = styled.View`
        margin: 32px 32px 32px;
`;

const AuthContainer = styled.View`
        margin-bottom:  32px;
`;

const AuthField = styled.TextInput`
        border-bottom-color: #00050f;
        border-bottom-width: 0.5px; 
        /* height: 48px; */
`;

const PasswordInputView = styled.View`
        
`;

const PasswordIconToggle = styled.TouchableOpacity`
        position: absolute;
        right: 5px;
        top: 12px;
        padding: 5px;
`;

const ButtonContainer = styled.TouchableOpacity`
        margin: 0 32px;
        height: 48px;
        align-items: center;
        justify-content: center;
        background-color: #F1C902;
        border-radius: 10px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
        color: '#181400',
        size: 'small',
}))``;

const SignUpLink = styled.TouchableOpacity`
        margin-top: 8px;
`;

const HeaderGraphic = styled.View`
        position: absolute;
        width: 100%;
        top: -50px;
        z-index: -100;
`;

const RightCircle = styled.View`
background-color: #181400; 
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 200px;
        right: -100px;
        top: -200px;
`;

const LeftCircle = styled.View`
        background-color: #F1C902; 
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 100px;
        left: -50px;
        top: -50px;
`;

const StatusBar = styled.StatusBar``;


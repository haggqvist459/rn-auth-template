import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Alert } from 'react-native'
import { FirebaseContext } from '../contexts/FirebaseContext'
import { UserContext } from '../contexts/UserContext'
import Text from '../components/base/CustomText'
import { MaterialIcons } from '@expo/vector-icons';


// needs keyboard avoiding view etc
const SignUp = ({ navigation }) => {

        // component states
        const [email, setEmail] = useState('');
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [passwordHidden, setPasswordHidden] = useState(true);
        const [loading, setLoading] = useState(false);

        // component contexts
        const firebase = useContext(FirebaseContext);
        const [_, setUser] = useContext(UserContext);

        useEffect(() => {
                console.log("SignUp useEffect Start")

                return () => {
                        console.log("SignUp Screen useEffect cleanup")
                }
        }, []);

        const handleSignUp = async () => {
                setLoading(true);

                if(validateInputs(username, email, password)) {
                        const user = {
                                username,
                                email,
                                password
                        }
                        try {
                                const createdUser = await firebase.createUser(user);
        
                                if (createdUser) {
                                        setUser({ ...createdUser, isLoggedIn: true });
                                }
        
                        } catch (error) {
                                console.log("Error @handleSignUp: ", error.message)
                        } finally {
                                setLoading(false);
                        }
                }               
                setLoading(false);
        }

        const validateInputs = (username, email, password) => {
                //here we need to check if either email, password or username are empty 
                // and if so interrupt the register process
                if (username.length >= 2) {
                        // username okay, check the email
                        if (email.indexOf('@') > 0) {
                                // username and email okay, check the password
                                if (password.length >= 7) {
                                        // username, email and password are all okay
                                        return true;
                                } else {
                                        createAlert('Bad password!', 'Password incorrectly formatted, might be too short');
                                        return false;
                                }
                        } else {
                                // alert the user of an incorrectly formatted email
                                createAlert('Bad email!', 'Email format incorrect, check it again.');
                                return false;
                        }
                } else {
                        // alert the user of an incorrect username
                        createAlert('Bad username!', 'Username is too short!');
                        return false;
                }
        }

        const createAlert = (title, feedback) => {
                Alert.alert(
                        title,
                        feedback,
                        [{ text: "OK" }]
                )
        }

        return (
                <Container>
                        <Main>
                                <Text large semi center>
                                        Sign up to get started!
                                </Text>
                        </Main>

                        <Auth>
                                <AuthContainer>
                                        <Text tiny semi left uppercase color={'#8C8B8B'}>Username</Text>
                                        <AuthField
                                                autoCorrect={false}
                                                onChangeText={(value) => setUsername(value)}
                                        />
                                </AuthContainer>
                                <AuthContainer>
                                        <Text tiny semi left uppercase color={'#8C8B8B'}>email</Text>
                                        <AuthField
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
                                onPress={() => handleSignUp()}
                                disabled={loading}>
                                {loading ?
                                        <Loading /> :
                                        <Text bold center color={'#181400'}>Sign Up</Text>}

                        </ButtonContainer>

                        <SignInLink onPress={() => navigation.navigate('SignIn')}>
                                <Text small center> Already registered?<Text bold color={'#F1C902'}> Sign in! </Text> </Text>
                        </SignInLink>

                        <HeaderGraphic>
                                <RightCircle />
                                <LeftCircle />
                        </HeaderGraphic>
                        <StatusBar barStyle="light-content" />
                </Container>
        )
}

export default SignUp

const Container = styled.View`
        flex: 1;
        background-color: #E9E7E8;
`;
const Main = styled.View`
        margin-top: 100px;
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
        height: 48px;
`;

const PasswordInputView = styled.View``;

const PasswordIconToggle = styled.TouchableOpacity`
        position: absolute;
        right: 5px;
        top: 12px;
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

const SignInLink = styled.TouchableOpacity`
        margin-top: 8px;
`;

const HeaderGraphic = styled.View`
        position: absolute;
        width: 100%;
        top: -100px;
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


import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Alert, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { UserContext } from '../contexts/UserContext';
import { FirebaseContext } from '../contexts/FirebaseContext';
import { Text, Input, PasswordInput, SubmitButton} from '../components/base';
import { COLORS, ROUTES, errorMessage} from '../utils';
import HeaderGraphics from '../components/HeaderGraphics';

// needs keyboard avoiding view etc

const SignIn = ({ navigation }) => {

        // contexts
        const [_, setUser] = useContext(UserContext);
        const firebase = useContext(FirebaseContext);

        // states
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);

        // hooks


        // functions
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
                        console.log("error @signin, ", error.code);
                        createAlert('Could not sign in', errorMessage('signIn-'+error.code));
                } finally {
                        setLoading(false);
                }
        }

        const createAlert = (title, feedback) => {
                Alert.alert(
                        title,
                        feedback,
                        [{ text: "OK" }],
                )
        }

        return (
                <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <HeaderGraphics/>
                                <Main>
                                        <WelcomeContainer>
                                                <Text title bold center>
                                                        Welcome Back!
                                                </Text>
                                        </WelcomeContainer>
                                        <Auth>
                                                <AuthContainer>
                                                        <Text tiny semi left uppercase color={COLORS.GRAY}>Email Address:</Text>
                                                        <Input
                                                                autoCapitalize="none"
                                                                autoCompleteType="email"
                                                                autoCorrect={false}
                                                                keyboardType="email-address"
                                                                onChangeText={(value) => setEmail(value)}
                                                        />
                                                </AuthContainer>
                                                <AuthContainer>
                                                        <Text tiny semi left uppercase color={COLORS.GRAY}>Password:</Text>
                                                        <PasswordInput
                                                                value={password}
                                                                onChangeText={(value) => setPassword(value)}
                                                        />
                                                </AuthContainer>
                                        </Auth>
                                        <SubmitButton 
                                                margin={'0 32px'}
                                                handler={handleSignIn}
                                                loading={loading}
                                                disabled={loading}
                                                text={'Sign In'}/>
                                        <SignUpLink onPress={() => navigation.navigate(ROUTES.SIGN_UP)}>
                                                <Text small center> New to the app? <Text small bold underline color={COLORS.PRIMARY_TEXT}>Sign Up!</Text> </Text>
                                        </SignUpLink>
                                </Main>
                </Container>
        )
}

export default SignIn

const Container = styled.KeyboardAvoidingView`
        flex: 1;
        background-color: ${COLORS.PRIMARY_BACKGROUND};
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

const SignUpLink = styled.TouchableOpacity`
        margin-top: 10px;
`;



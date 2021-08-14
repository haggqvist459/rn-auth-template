import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Alert } from 'react-native'
import { FirebaseContext } from '../contexts/FirebaseContext'
import { UserContext } from '../contexts/UserContext'
import { Text, Input, PasswordInput, SubmitButton } from '../components/base';
import HeaderGraphics from '../components/HeaderGraphics'
import { COLORS, ROUTES, errorMessage } from '../utils'


// needs keyboard avoiding view etc
const SignUp = ({ navigation }) => {

        // contexts
        const firebase = useContext(FirebaseContext);
        const [_, setUser] = useContext(UserContext);

        // states
        const [email, setEmail] = useState('');
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);


        // hooks

        // functions
        const handleSignUp = async () => {
                setLoading(true);
                if (validateInputs(username, email, password)) {
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
                                console.log("Error @handleSignUp: ", error.code)
                                createAlert('Could not register you', errorMessage(error.code));
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
                                        createAlert('Could not register you', 'Password incorrectly formatted, it needs to be at least 7 characters.');
                                        return false;
                                }
                        } else {
                                // alert the user of an incorrectly formatted email
                                createAlert('Could not register you', 'The email format is incorrect, check your email again.');
                                return false;
                        }
                } else {
                        // alert the user of an incorrect username
                        createAlert('Could not register you', 'Your username is too short. It needs to be at least two characters.');
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
                        <HeaderGraphics />
                        <Main>
                                <Text large bold center>
                                        Sign up to get started!
                                </Text>
                        </Main>

                        <Auth>
                                <AuthContainer>
                                        <Text tiny semi left uppercase color={COLORS.GRAY}>Username</Text>
                                        <Input
                                                autoCorrect={false}
                                                onChangeText={(value) => setUsername(value)}
                                        />
                                </AuthContainer>
                                <AuthContainer>
                                        <Text tiny semi left uppercase color={COLORS.GRAY}>email</Text>
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
                                handler={handleSignUp}
                                disabled={loading}
                                loading={loading}
                                text={'Sign Up'}
                        />
                        <SignInLink onPress={() => navigation.navigate(ROUTES.SIGN_IN)}>
                                <Text small center> Already registered? <Text small underline bold color={COLORS.PRIMARY_TEXT}>Sign in!</Text> </Text>
                        </SignInLink>
                </Container>
        )
}

export default SignUp

const Container = styled.View`
        flex: 1;
        background-color: ${COLORS.PRIMARY_BACKGROUND};
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

const SignInLink = styled.TouchableOpacity`
        margin-top: 10px;
`;

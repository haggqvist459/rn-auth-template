import React, { useContext } from 'react'
import styled from 'styled-components'
import Text from '../components/base/CustomText'
import { UserContext } from '../contexts/UserContext'
import { FirebaseContext } from '../contexts/FirebaseContext'

const Profile = ({ navigation }) => {

        const [_, setUser] = useContext(UserContext);
        const firebase = useContext(FirebaseContext);

        const handleProfileButtonClick = () => {
                navigation.navigate('Home');
        }

        const handleSignOut = async() => {
                const loggedOut = await firebase.signOut();
                if (loggedOut) {
                        // revert back to the initial state, reset the user values to empty strings
                        setUser(() => ({
                                username: '',
                                email: '',
                                uid: '',
                                isLoggedIn: false
                        }));
                }
        }

        return (
                <Container>
                        <StatusBar barStyle="dark-content" />
                        <Text title bold> Profile </Text>
                        <ProfileButton onPress={() => handleProfileButtonClick()}>
                                <Text mediumLarge bold> Home </Text>
                        </ProfileButton>
                        <SignOutButton onPress={() => handleSignOut()}>
                                <Text mediumLarge bold> Sign Out </Text>
                        </SignOutButton>
                </Container>
        )
}

export default Profile

const Container = styled.View`
        align-items: center;
        margin-top: 48px;
        flex: 1;
`;

const StatusBar = styled.StatusBar``;

const ProfileButton = styled.TouchableOpacity`
        margin-top: 16px;
        height: 48px;
        width: 160px;
        align-items: center;
        justify-content: center;
        background-color: #F1C902;
        border-radius: 10px;
`;

const SignOutButton = styled.TouchableOpacity`
        margin-top: 16px;
        height: 48px;
        width: 160px;
        align-items: center;
        justify-content: center;
        background-color: #F1C902;
        border-radius: 10px;
`;
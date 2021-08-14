import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { UserContext } from '../contexts/UserContext'
import { FirebaseContext } from '../contexts/FirebaseContext'
import { Text, Input, PasswordInput, SubmitButton } from '../components/base'
import { COLORS, adjustSize } from '../utils'
import { MaterialIcons } from '@expo/vector-icons';

const Profile = () => {

        // contexts 
        const [user, setUser] = useContext(UserContext);
        const firebase = useContext(FirebaseContext);

        // states
        const [newUsername, setNewUsername] = useState('');
        const [newUsernameLoading, setNewUsernameLoading] = useState(false);

        const [newEmail, setNewEmail] = useState()
        const [updateEmailLoading, setUpdateEmailLoading] = useState(false);


        const [currentPassword, setCurrentPassword] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false);
        // hooks


        // functions
        const handleSignOut = async () => {
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

        const handleUpdateUsername = async () => {
                setNewUsernameLoading(true);
                if (validateUsername(newUsername)){
                        try {
                                const didUpdateUsername = await firebase.updateUsername(newUsername);
                                if (didUpdateUsername) {
                                        setUser((state) => ({ ...state, username: newUsername }));
                                        console.log("Updated username in UserContext");
                                }
        
                        } catch (error) {
                                console.log("Error @handleUpdateUsername: ", error.message);
                        }
                } else {
                        // throw that error alert
                        console.log("error updating username")
                }
                
                //reset the state of the UI components
                setNewUsernameLoading(false);
                setNewUsername('');
        }

        const validateUsername = (value) => {
                if(value.length >= 2 && value.length <= 16){
                        return true
                } else {
                        return false
                }
        }

        return (
                <Container>
                        <TopView>
                                <Text title bold left>{user.username}</Text>
                                <LogoutButton onPress={() => handleSignOut()}>
                                        <MaterialIcons name='logout' size={adjustSize(30)} color={COLORS.SECONDARY_TEXT} />
                                </LogoutButton>
                        </TopView>
                        <Main>
                                <UpdateUsername>
                                        <InputView>
                                                <Text small left uppercase color={COLORS.GRAY}>update username</Text>
                                                <Input
                                                        mediumLarge
                                                        autoCorrect={false}
                                                        onChangeText={(value) => setNewUsername(value)}
                                                />
                                        </InputView>
                                        <SaveButton onPress={() => {handleUpdateUsername()}} disabled={newUsernameLoading} >
                                                {newUsernameLoading ?
                                                 <> </> :
                                                        <MaterialIcons name="check" size={adjustSize(30)} color={COLORS.PRIMARY_TEXT} />
                                                }
                                        </SaveButton>
                                </UpdateUsername>
                        </Main>
                </Container>
        )
}

export default Profile

const Container = styled.View`
        flex: 1;
        background-color: ${COLORS.PRIMARY_BACKGROUND};
`;

const TopView = styled.View`
        margin-top: 50px;
        padding-left: 15px;
        padding-right: 15px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
`;


const LogoutButton = styled.TouchableOpacity`
        background-color: ${COLORS.PRIMARY_BUTTON};
        border-color: ${COLORS.PRIMARY_BUTTON};
        border-width: 2px;
        border-radius: 6px;
        padding: 6px;
        padding-left: 12px;
        padding-right: 12px;
`;

const Main = styled.View`
        flex: 1;
        padding: 10px;
`;

const UpdateUsername = styled.View`
        padding-left: 5px;
        padding-right: 5px;
        padding: 5px;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;

`;

const InputView = styled.View`
        width: 60%;
`;

const SaveButton = styled.TouchableOpacity`
        background-color: ${COLORS.PRIMARY_BACKGROUND};
        border-color: ${COLORS.PRIMARY_BUTTON};
        border-width: 2px;
        border-radius: 6px;
        padding: 6px;
        padding-left: 12px;
        padding-right: 12px;
`;
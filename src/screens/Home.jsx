import React from 'react'
import styled from 'styled-components'
import Text from '../components/base/CustomText'

const Home = ({ navigation }) => {

        const handleProfileButtonClick = () => {
                navigation.navigate('Profile');
        }
        

        return (
                <Container>
                        <StatusBar barStyle="dark-content" />
                        <Text title bold> Home </Text>
                        <ProfileButton onPress={() => handleProfileButtonClick()}>
                                <Text large bold > Profile </Text>
                        </ProfileButton>
                </Container>
        )
}

export default Home

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
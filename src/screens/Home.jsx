import React from 'react'
import styled from 'styled-components'
import Text from '../components/base/CustomText'

const Home = ({ navigation }) => {

        const handleProfileButtonClick = () => {
                navigation.navigate('Profile');
        }


        return (
                <Container>
                        <StatusBar translucent={true} backgroundColor={"transparent"} barStyle="dark-content" />
                        <Title>
                                <Text title bold center> Home </Text>
                        </Title>
                        <TextBox>
                                <Text mediumLarge center semiBold>Main screen of the template, intended to be the landing page / main screen of the app after signing in. </Text>
                        </TextBox>


                        <ProfileButton onPress={() => handleProfileButtonClick()}>
                                <Text large bold > Profile </Text>
                        </ProfileButton>
                </Container>
        )
}

export default Home

const Container = styled.View`
        flex: 1;
`;

const Title = styled.View`
        margin-top: 50px;
`;

const TextBox = styled.View`
        margin-top: 25px;
        width: 80%;
        align-self: center;
`;

const ProfileButton = styled.TouchableOpacity`
        margin-top: 16px;
        height: 48px;
        width: 160px;
        align-self: center;
        align-items: center;
        justify-content: center;
        background-color: #F1C902;
        border-radius: 10px;
`;

const StatusBar = styled.StatusBar``;
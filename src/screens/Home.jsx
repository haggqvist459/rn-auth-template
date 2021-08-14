import React from 'react'
import styled from 'styled-components'
import Text from '../components/base/CustomText'
import { COLORS } from '../utils'

const Home = () => {

        return (
                <Container>
                        <StatusBar translucent={true} backgroundColor={"transparent"} barStyle="dark-content" />
                        <Title>
                                <Text title bold center> Home </Text>
                        </Title>
                        <TextBox>
                                <Text mediumLarge center semiBold>Main screen of the template, intended to be the landing page / main screen of the app after signing in. </Text>
                        </TextBox>
                </Container>
        )
}

export default Home

const Container = styled.View`
        flex: 1;
        background-color: ${COLORS.PRIMARY_BACKGROUND};
`;

const Title = styled.View`
        margin-top: 50px;
`;

const TextBox = styled.View`
        margin-top: 25px;
        width: 80%;
        align-self: center;
`;


const StatusBar = styled.StatusBar``;
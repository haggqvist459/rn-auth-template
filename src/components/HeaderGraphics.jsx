import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../utils'


const HeaderGraphics = () => {

        return (
                <Header>
                        <BlueCircleRight />
                        {/* <GreyCircleRight /> */}
                        <GreyCircleLeft />
                        <StatusBar
                                barStyle="light-content"
                                translucent={true}
                                backgroundColor={"transparent"}
                        />
                </Header>
        )
}

export default HeaderGraphics

const Header = styled.View`
        position: absolute;
        width: 100%;
        top: -50px;
        z-index: -100;
`;

const BlueCircleRight = styled.View`
        background-color: ${COLORS.CORNFLOWER_BLUE}; 
        position: absolute;
        right: -70px;
        top: -250px;
        width: 400px;
        height: 400px;
        border-radius: 200px;
`;

const GreyCircleRight = styled.View`
        background-color: ${COLORS.CHARLESTON_GREEN}; 
        position: absolute;
        top: 5px;
        right: -20px;
        width: 130px;
        height: 130px;
        border-radius: 65px;
`;


const GreyCircleLeft = styled.View`
        background-color: ${COLORS.CHARLESTON_GREEN}; 
        position: absolute;
        width: 200px;
        height: 200px;
        left: -20px;
        top: -50px;
        border-radius: 100px;
`;

const StatusBar = styled.StatusBar``;



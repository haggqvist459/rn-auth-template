import React from 'react'
import styled from 'styled-components'
import Text from './CustomText'
import { COLORS } from '../../utils'

const SubmitButton = (props) => {

        return (
                <Button {...props} onPress={props.handler} disabled={props.loading}>
                        {props.loading ?
                                <Loading /> :
                                <Text bold medium center uppercase color={props.color ?? COLORS.SECONDARY_TEXT}>{props.text}</Text>}
                </Button>
        )
}

export default SubmitButton


const Button = styled.TouchableOpacity`
        margin: ${props => props.margin ?? 0};
        height: ${props => props.height ?? '48px'};
        align-items: center;
        justify-content: center;
        background-color: ${props => props.backgroundColor ?? COLORS.PRIMARY_BUTTON};
        border-radius: ${props => props.borderRadius ?? '10px'};
`;

const Loading = styled.ActivityIndicator.attrs(() => ({
        color: COLORS.SECONDARY_TEXT,
        size: 'small',
}))``;

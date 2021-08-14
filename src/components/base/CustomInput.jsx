import React from 'react'
import styled from 'styled-components'
import { FONT_NAME, adjustSize, COLORS } from '../../utils'


const TextInput = ({ ...props }) => {
        return (
                <CustomInput {...props} />
        )
}

export default TextInput


const CustomInput = styled.TextInput`

        width: ${props => props.width ?? '100%'};
        height: ${props => props.height ?? '36px'};

        border-bottom-width: ${props => props.borderBottomWidth ?? '0.5px'}; 
        border-bottom-color: ${props => props.color ?? COLORS.PRIMARY_TEXT};    

        color: ${props => props.color ?? COLORS.PRIMARY_TEXT};

        margin: ${props => props.margin ?? 0};
        margin-top: ${props => props.marginTop ?? 0};
        margin-bottom: ${props => props.marginBottom ?? 0};
        margin-left: ${props => props.marginLeft ?? 0};
        margin-right: ${props => props.marginRight ?? 0};

        padding: ${props => props.padding ?? 0};
        padding-top: ${props => props.paddingTop ?? 0};
        padding-bottom: ${props => props.paddingBottom ?? 0};
        padding-left: ${props => props.paddingLeft ?? 0};
        padding-right: ${props => props.paddingRight ?? 0};


        ${({ title, large, mediumLarge, medium, small, tiny }) => {
                switch (true) {
                        case title:
                                return `font-size: ${adjustSize(32)}px;`;

                        case large:
                                return `font-size: ${adjustSize(24)}px;`;

                        case mediumLarge:
                                return `font-size: ${adjustSize(20)}px`;

                        case medium:
                                return `font-size: ${adjustSize(16)}px;`;

                        case small:
                                return `font-size: ${adjustSize(13)}px;`;

                        case tiny:
                                return `font-size: ${adjustSize(13)}px;`;

                        default:
                                return `font-size: ${adjustSize(14)}px;`;
                }
        }}

        ${({ black, blackItalic, bold, boldItalic, semiBold, semiBoldItalic, light, lightItalic, extraLight, extraLightItalic, italic }) => {
                switch (true) {
                        case black:
                                return `font-family: ${FONT_NAME}-Black;`;

                        case blackItalic:
                                return `font-family: ${FONT_NAME}-BlackItalic;`;

                        case bold:
                                return `font-family: ${FONT_NAME}-Bold;`;

                        case boldItalic:
                                return `font-family: ${FONT_NAME}-BoldItalic;`;

                        case semiBold:
                                return `font-family: ${FONT_NAME}-SemiBold;`;

                        case semiBoldItalic:
                                return `font-family: ${FONT_NAME}-SemiBoldItalic;`;

                        case light:
                                return `font-family: ${FONT_NAME}-Light;`;

                        case lightItalic:
                                return `font-family: ${FONT_NAME}-LightItalic;`;

                        case extraLight:
                                return `font-family: ${FONT_NAME}-ExtraLight;`;

                        case extraLightItalic:
                                return `font-family: ${FONT_NAME}-ExtraLightItalic;`;

                        case italic:
                                return `font-family: ${FONT_NAME}-Italic;`;

                        default:
                                return `font-family: ${FONT_NAME}-Regular;`;
                }
        }}

        ${({ uppercase, lowercase, capitalize }) => {
                switch (true) {
                        case uppercase:
                                return `text-transform: uppercase;`;
                        case lowercase:
                                return `text-transform: uppercase;`;
                        case capitalize:
                                return `text-transform: uppercase;`;
                        default:
                                return `text-transform: none`;
                }
        }}


`;


/*
border-bottom-color: #8C8B8B;
border-bottom-width: 0.5px;
height: 48px;

        ${({ underline, lineThrough }) => {
                switch (true) {
                        case underline:
                                return `text-decoration: underline;`;

                        case lineThrough:
                                return `text-decoration: line-through;`;

                        default:
                                return `text-decoration: none;`;
                }
        }}

*/
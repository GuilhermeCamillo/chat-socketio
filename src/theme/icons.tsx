import React from 'react';
import {styled} from 'styled-components';

interface GenerateIconProps {
  component: React.ElementType;
  styles?: {
    size?: number;
    [key: string]: any;
  };
}

import ChatLogo from '../../assets/svgs/chat-logo.svg';

export const CHAT_LOGO = ChatLogo;

export const generateIcon = (component: any, styles: any) => {
    if (component === null) return null;
    const Icon = styled(component).attrs(() => ({ width: styles?.size || 16, height: styles?.size || 16, ...styles }))``;
    return <Icon />;
  };

import React from 'react';
import { Content } from './styles';

export type ButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    color?: 'primary' | 'secondary' | 'third' | 'fourth' | 'fifth' | 'sixth' | 'transparent' | 'gray' | 'noomerRed' | 'secondaryRed' | 'fifthRed' | 'noomerGreen';
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | undefined
}

function Button({
    onClick,
    children,
    color = 'primary',
    disabled,
    type
}: ButtonProps){
    return (
        <Content onClick={onClick} color={color} disabled={disabled} type={type}>
            {children}
        </Content>
    )
}

export default Button;

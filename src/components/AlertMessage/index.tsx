import React, { Component, CSSProperties } from 'react';
import Link from './Link';

type AlertProps = {
    text: string,
    bgColor?: string,
    txtColor?: string,
    link?: string
}

const css: CSSProperties = {
    display: 'inline-block',
    width: '100%',
    position: 'relative',
    padding: '0.75rem 1.25rem',
    border: '1px solid transparent',
    borderRadius: '0.25rem',
    // width: 'fit-content',
    fontSize: 16,
    margin: '1rem 0',
}

export default class Alert extends Component<AlertProps, {}> {
    render() {
        const { text, bgColor = '#d4edda', txtColor = '#155724', link } = this.props;
        if (link) {
            return (
                <Link link={link}>
                    <div style={{ backgroundColor: bgColor, color: txtColor, ...css }}>
                        {text}
                    </div>
                </Link>
            )
        }
        return (
            <div style={{ backgroundColor: bgColor, color: txtColor, ...css }}>
                {text}
            </div>
        )
    }
}

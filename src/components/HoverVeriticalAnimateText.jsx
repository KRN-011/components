import React from 'react'

const HoverVeriticalAnimateText = ({ children, text, className }) => {

    const content = children ? (typeof children === 'string' ? children : React.Children.toArray(children).join('')) : text;

    return (
        <div className={`${className}`}>
            {content}
        </div>
    )
}

export default HoverVeriticalAnimateText

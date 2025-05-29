import React from 'react'
import { motion } from 'framer-motion'

const AnimatedText = ({ children, text, className, delay = 0, duration = 0.5, stagger = 0, staggerWithIndex = false, effect = 'None', direction, directionValue = 100, blurValue = 10, rotationValue = -5, scaleValue = 1.2 }) => {

    const content = children ? (typeof children === 'string' ? children : React.Children.toArray(children).join('')) : text;

    // All Errors
    if (staggerWithIndex === true && stagger === 0) {
        console.log('%c You have to set stagger to a value greater than 0 if you want to see effects and use staggerWithIndex.', 'background: #ffe4e6; color: red;')
    }

    if (direction !== 'up' || direction !== 'down' || direction !== 'left' || direction !== 'right') {
        console.log('%c You have to set direction to up, down, left, or right.', 'background: #ffe4e6; color: red;')
    }

    let initial, animate;
    if (effect === 'FadeOnly') {
        initial = { 
            opacity: 0 
        }
        animate = { 
            opacity: 1 
        }
    } else if (effect === 'VerticalFade') {
        initial = { 
            opacity: 0, 
            y: direction !== undefined && direction !== 'left' && direction !== 'right' ? direction === 'up' ? -directionValue : directionValue : 0 
        }
        animate = { 
            opacity: 1, 
            y: 0 
        }
    } else if (effect === 'HorizontalFade') {
        initial = { 
            opacity: 0, 
            x: direction !== undefined && direction !== 'up' && direction !== 'down' ? direction === 'left' ? -directionValue : directionValue : 0 
        }
        animate = { 
            opacity: 1, 
            x: 0 
        }
    } else if (effect === 'BlurWithDirection') {
        initial = { 
            opacity: 0, 
            filter: `blur(${blurValue}px)`, 
            y: direction !== undefined && direction !== 'left' && direction !== 'right' ? direction === 'up' ? -directionValue : directionValue : 0, 
            x: direction !== undefined && direction !== 'up' && direction !== 'down' ? direction === 'left' ? -directionValue : directionValue : 0 }
        animate = { 
            opacity: 1, 
            filter: `blur(0px)`, 
            y: 0, 
            x: 0 
        }
    } else if (effect === 'RotationScale') {
        initial = {
            opacity: 0,
            rotate: rotationValue,
            scale: scaleValue,
        },
        animate = {
            opacity: 1,
            rotate: 0,
            scale: 1
        }
    }

    return (
        <div className='w-full h-screen'>
            <div className='w-full h-full flex items-center justify-center bg-zinc-900'>
                <h1 
                    className={`text-zinc-100 knight-warrior-font ${className}`}
                >
                    {
                        content.split('').map((char, index) => {
                            const displayChar = char === ' ' ? '\u00A0' : char;
                            return (
                                <div key={index} className='relative inline-block' style={{ overflow: 'visible', lineHeight: 1.2 }}>
                                    <motion.span
                                        initial={initial}
                                        animate={animate}
                                        transition={{ duration, delay: stagger !== 0 ? staggerWithIndex ? index * stagger : stagger : delay }}
                                        className='text-zinc-100'
                                        style={{ display: 'inline-block' }}
                                    >
                                        {displayChar}
                                    </motion.span>
                                </div>
                            )
                        })
                    }
                </h1>
            </div>
        </div>
    )
}

export default AnimatedText

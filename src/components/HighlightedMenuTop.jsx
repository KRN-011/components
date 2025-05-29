import React, { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect } from 'react';

const HighlightedMenuTop = () => {

    const containerRef = useRef(null);
    const lastY = useRef(0);

    const [activeItem, setActiveItem] = useState(0);
    const [highlightProps, setHighlightProps] = useState({
        width: 0,
        left: 0,
        top: 0,
        height: 0
    });
    const [isHidden, setIsHidden] = useState(true);
    const [isTapped, setIsTapped] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll('.menu-item');
            const activeNode = items[activeItem];
            if (activeNode) {
                const itemRect = activeNode.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();
                setHighlightProps({
                    left: itemRect.left - containerRect.left,
                    top: itemRect.top - containerRect.top,
                    width: itemRect.width,
                    height: itemRect.height
                });
            }
        }
    }, [activeItem]);

    const handleActiveItem = (index, e) => {
        setActiveItem(index);
        const rect = e.target.getBoundingClientRect();
        const parentRect = e.target.parentNode.getBoundingClientRect();
        setHighlightProps({
            width: rect.width,
            left: rect.left - parentRect.left,
            top: rect.top - parentRect.top,
            height: rect.height
        })
    };

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (y) => {
        const difference = y - lastY.current;
        if (Math.abs(difference) > 50) {
            setIsHidden(difference > 0)
        }
        lastY.current = y;
    })

    const menuItems = [
        'Home',
        'About',
        'Projects',
        'Let\'s Connect'
    ]

    return (
        <div>
            <motion.div className='relative pt-5'>
                <motion.div 
                    variants={{
                        hidden: {
                            y: '-150%'
                        },
                        visible: {
                            y: '0%'
                        }
                    }}
                    initial={isHidden ? 'hidden' : 'visible'}
                    animate={isHidden ? 'hidden' : 'visible'}
                    transition={{
                        duration: 0.5,
                        ease: 'easeInOut'
                    }}
                    className='fixed left-1/2 -translate-x-1/2 w-[80vw] md:w-fit bg-zinc-100 rounded-full top-5 mx-auto z-50'
                >
                    <div ref={containerRef} className='flex flex-wrap items-center justify-center gap-2 py-1 px-1'>
                        <motion.div
                            style={{
                                height: highlightProps.height,
                            }}
                            animate={{
                                left: highlightProps.left,
                                width: highlightProps.width,
                                top: highlightProps.top
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30
                            }}
                            className={`h-full left-0 w-full rounded-full bg-zinc-900 absolute -z-10 `}
                        />
                        {
                            menuItems.map((item, index) => {
                                return (
                                    <div key={index} onClick={(e) => handleActiveItem(index, e)} className={`relative cursor-pointer px-1 menu-item py-1 sm:px-2 text-base ${activeItem === index ? 'text-zinc-100' : 'text-zinc-900'}`}>
                                        {item}
                                    </div>
                                )
                            })
                        }
                    </div>
                </motion.div>
            </motion.div>
            <motion.div
                transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }}
                className='fixed -top-8 w-full z-50'
            >
                <motion.div 
                    className='mx-auto rounded-3xl w-[20vw] h-10 bg-zinc-100'
                    whileHover={{
                        y: isHidden ? "20%" : "-20%"
                    }}
                    animate={{
                        y: isHidden ? "0%" : "-20%"
                    }}
                    onClick={() => {
                        setIsHidden(!isHidden);
                        setIsTapped(!isTapped);
                    }}
                />
            </motion.div>
        </div>
    )
}

export default HighlightedMenuTop

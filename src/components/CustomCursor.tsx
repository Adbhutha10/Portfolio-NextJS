'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, SpringOptions } from 'framer-motion';

const TRAIL_COUNT = 8;

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Lead coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Generate trail of springs
    const trail = Array.from({ length: TRAIL_COUNT }).map((_, i) => {
        // Higher index = more delay/inertia
        const config: SpringOptions = {
            damping: 20 + i * 2,
            stiffness: 200 - i * 15,
            mass: 0.5 + i * 0.1
        };

        // eslint-disable-next-line react-hooks/rules-of-hooks
        return {
            x: useSpring(mouseX, config),
            y: useSpring(mouseY, config)
        };
    });

    useEffect(() => {
        const checkTouch = () => {
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                setIsTouchDevice(true);
            }
        };
        checkTouch();

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button' ||
                target.dataset.cursor === 'hover';

            setIsHovered(!!isInteractive);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY, isVisible]);

    if (isTouchDevice) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference">
            {trail.map((point, i) => (
                <motion.div
                    key={i}
                    className="absolute top-0 left-0 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    style={{
                        x: point.x,
                        y: point.y,
                        // Center the cursor
                        translateX: "-50%",
                        translateY: "-50%",
                        width: 20 - i * 2, // Decreasing size
                        height: 20 - i * 2,
                        opacity: (1 - i / TRAIL_COUNT) * (isVisible ? 1 : 0),
                    }}
                    animate={{
                        scale: isHovered ? 1.5 + (i * 0.1) : 1,
                        backgroundColor: isHovered ? "#3b82f6" : "#ffffff",
                    }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
            ))}
        </div>
    );
}

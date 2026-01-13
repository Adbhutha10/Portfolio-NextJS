'use client';

import { useMotionValueEvent, MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ScrollyCanvasProps {
    scrollYProgress: MotionValue<number>;
}

export default function ScrollyCanvas({ scrollYProgress }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Number of frames - assumption based on file count
    const frameCount = 75;

    useEffect(() => {
        const loadImages = async () => {
            const promises: Promise<HTMLImageElement>[] = [];

            for (let i = 0; i < frameCount; i++) {
                const p = new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = `/sequence/${i.toString().padStart(3, '0')}.png`;
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error(`Failed to load frame ${i}`));
                });
                promises.push(p);
            }

            try {
                const loadedImages = await Promise.all(promises);
                setImages(loadedImages);
                setIsLoaded(true);
            } catch (err) {
                console.error("Error loading sequence images", err);
            }
        };

        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[index];
        const { width, height } = canvas;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate 'object-fit: cover'
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = width;
            drawHeight = width / imgRatio;
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;
        } else {
            drawWidth = height * imgRatio;
            drawHeight = height;
            offsetX = (width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Initial draw and resize handler
    useEffect(() => {
        if (!isLoaded || !canvasRef.current || images.length === 0) return;

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Redraw current frame
                const index = Math.round(scrollYProgress.get() * (images.length - 1));
                renderFrame(index);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial setup

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images, scrollYProgress]);


    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;
        const index = Math.round(latest * (images.length - 1));
        requestAnimationFrame(() => renderFrame(index));
    });

    return (
        <div className="absolute inset-0 w-full h-full">
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white/50 bg-black z-50">
                    Loading Sequence...
                </div>
            )}
        </div>
    );
}

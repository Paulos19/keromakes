"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FRAME_COUNT = 192;

export default function HeroScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [progress, setProgress] = useState(0);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new window.Image();
            const frameNumber = i.toString().padStart(3, "0");
            img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setImages(loadedImages);
                    renderFrame(0, loadedImages); // render first frame when all loaded
                }
            };
            loadedImages.push(img);
        }
    }, []);

    const renderFrame = (index: number, imgArray: HTMLImageElement[] = images) => {
        if (!canvasRef.current || imgArray.length === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = imgArray[index];
        if (!img) return;

        // Draw image covering the canvas (object-fit: cover equivalent)
        const renderWidth = canvas.width;
        const renderHeight = canvas.height;

        // Scale to fit while covering whole canvas
        const scaleX = renderWidth / img.width;
        const scaleY = renderHeight / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const offsetX = (renderWidth - newWidth) / 2;
        const offsetY = (renderHeight - newHeight) / 2;

        ctx.clearRect(0, 0, renderWidth, renderHeight);
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    };

    // Handle Scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const { top, height } = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate scroll progress within this specific container
            // Start when top hits 0, end when bottom hits viewport
            const scrollableDistance = height - viewportHeight;
            const scrolledDistance = -top;

            let rawProgress = scrolledDistance / scrollableDistance;
            rawProgress = Math.max(0, Math.min(1, rawProgress)); // Clamp between 0 and 1

            setProgress(rawProgress);

            if (images.length > 0) {
                // Leave the last 20% of the scroll for the cards overlapping animation
                const frameProgress = Math.min(rawProgress / 0.8, 1);
                const frameIndex = Math.floor(frameProgress * (FRAME_COUNT - 1));
                requestAnimationFrame(() => renderFrame(frameIndex));
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Initial call
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [images]);

    // Adjust canvas size on resize
    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Re-render current frame after resize
                const frameProgress = Math.min(progress / 0.8, 1);
                const frameIndex = Math.floor(frameProgress * (FRAME_COUNT - 1));
                if (images.length > 0) renderFrame(frameIndex);
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        return () => window.removeEventListener("resize", resizeCanvas);
    }, [images, progress]);

    // Cards animation values based on the last 20% of scroll progress
    // Progress goes from 0.8 to 1.0 -> map to 0 to 1
    const cardsScrolled = Math.max(0, (progress - 0.75) * 4);
    const cardsTranslateY = (1 - Math.min(cardsScrolled, 1)) * 100; // From 100% (hidden below) to 0% (visible)

    return (
        <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center">
                {/* Canvas for Video Frames */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full z-0 opacity-80"
                />

                {/* Big Title Overlay */}
                <div
                    className="relative z-10 flex flex-col items-center justify-start pt-64 w-full h-full pointer-events-none transition-transform duration-700 ease-out"
                    style={{ transform: `translateY(${progress * -50}px)`, opacity: 1 - (progress * 1.5) }}
                >
                    <h1 className="text-[12vw] leading-none font-bold text-white tracking-tighter mix-blend-overlay opacity-90">
                        DESPERTE A
                    </h1>
                    <h1 className="text-[12vw] leading-none font-bold text-white tracking-tighter mix-blend-overlay opacity-90 -mt-4">
                        SUA BELEZA
                    </h1>
                </div>

                {/* Overlapping Glassmorphism Cards */}
                <div
                    className="absolute bottom-0 left-0 right-0 w-full px-4 md:px-12 pb-8 md:pb-12 z-20 flex flex-col lg:flex-row items-end justify-between gap-4 md:gap-6 will-change-transform"
                    style={{ transform: `translateY(${cardsTranslateY}%)` }}
                >
                    {/* Card 1: Small left */}
                    <div className="w-full lg:w-[30%] bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D98FB5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center mb-8 md:mb-16 shadow-lg shadow-[#D98FB5]/20">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-6 md:h-6 text-[#D98FB5]">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">Tem dúvidas?</h3>
                        <p className="text-sm text-white/70 mb-6 md:mb-8 max-w-[280px]">Nossa equipe de especialistas está pronta para ajudar.</p>
                        <button className="text-white border-b border-white pb-1 text-sm font-medium hover:text-[#D98FB5] hover:border-[#D98FB5] transition-colors">
                            Fale Conosco
                        </button>
                    </div>

                    {/* Card 2: Wide Center/Right */}
                    <div className="w-full lg:w-[68%] bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-12 rounded-[24px] md:rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="w-full md:flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6 md:mb-12">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-white text-[11px] md:text-sm font-medium uppercase tracking-widest">Novidades</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-2 md:mb-4 leading-[1.1]">
                                Coleção<br className="hidden md:block" /> Primavera
                            </h3>
                        </div>

                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-[6px] md:border-[8px] border-white/10 flex items-center justify-center relative flex-shrink-0 scale-90 md:scale-100">
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="50%" cy="50%" r="42%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" className="md:stroke-[8px]" />
                                <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#D98FB5" strokeWidth="6" strokeDasharray="264" strokeDashoffset="66" className="md:stroke-[8px] transition-all duration-1000 ease-out" />
                            </svg>
                            <div className="text-center">
                                <span className="block text-2xl md:text-3xl font-bold text-white">75%</span>
                                <span className="text-white/60 text-[8px] md:text-xs uppercase tracking-widest mt-1 block">Inovação</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

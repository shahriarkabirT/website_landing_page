"use client"

import { useRef, ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxWrapperProps {
    children: ReactNode
    className?: string
    bgElement?: ReactNode
    depth?: number
    id?: string
}

export function ParallaxWrapper({
    children,
    className,
    bgElement,
    depth = 150,
    id
}: ParallaxWrapperProps) {
    const ref = useRef(null)

    // Track scroll progress for this specific container
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    // Transform the vertical position of the background based on scroll
    // Moving from -depth to +depth creates a parallax speed difference
    const y = useTransform(scrollYProgress, [0, 1], [-depth, depth])

    return (
        <div
            ref={ref}
            id={id}
            className={cn("relative overflow-hidden", className)}
        >
            {/* Parallax Background Layer */}
            {bgElement && (
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
                >
                    {bgElement}
                </motion.div>
            )}

            {/* Content Layer */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}

"use client";
import { MotionConfig, motion } from "motion/react";

// fades its content in and slides it up 16px when it scrolls into view, once (Motion: docs at motion.dev)
// reducedMotion="user": no movement for people who ask their OS for reduced motion
export default function FadeUp({ children }: { children: React.ReactNode }) {
    return (
        <MotionConfig reducedMotion="user">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
            >
                {children}
            </motion.div>
        </MotionConfig>
    )
}

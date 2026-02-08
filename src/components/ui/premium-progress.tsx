import React from 'react';
import { cn } from '@/lib/utils';

interface PremiumProgressBarProps {
    progress: number;
    className?: string;
}

export const PremiumProgressBar = ({ progress, className }: PremiumProgressBarProps) => {
    return (
        <div className={cn("w-full h-2 bg-secondary/30 rounded-full overflow-hidden", className)}>
            <div
                className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 transition-all duration-1000 ease-out relative"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            >
                {/* Glow effect */}
                <div className="absolute top-0 right-0 bottom-0 w-[20px] bg-gradient-to-r from-transparent to-white/30 blur-sm" />
            </div>
        </div>
    );
};

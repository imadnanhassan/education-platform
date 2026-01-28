import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className,
    padding = 'md',
    shadow = 'md',
    hover = false
}) => {
    const baseClasses = 'bg-white rounded-lg border border-gray-200';
    
    const paddings = {
        none: '',
        sm: 'p-3',
        md: 'p-6',
        lg: 'p-8'
    };
    
    const shadows = {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg'
    };
    
    const hoverEffect = hover ? 'hover:shadow-lg transition-shadow duration-300' : '';

    return (
        <div className={cn(
            baseClasses,
            paddings[padding],
            shadows[shadow],
            hoverEffect,
            className
        )}>
            {children}
        </div>
    );
};

export default Card;
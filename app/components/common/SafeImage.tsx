"use client";

import { Building2, ImageOff } from 'lucide-react';
import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
    src: string | null | undefined;
    fallbackSrc?: string;
    fallbackIcon?: 'building' | 'image' | 'user' | 'package';
    fallbackClassName?: string;
}

// Default fallback image (a simple placeholder)
const DEFAULT_FALLBACK = '/images/placeholder.png';

/**
 * SafeImage Component
 * 
 * A wrapper around Next.js Image that gracefully handles:
 * - Missing/null/undefined src
 * - Failed image loads (404, network errors)
 * - Shows fallback icon or image
 * 
 * @example
 * <SafeImage 
 *   src={hospital.logoUrl} 
 *   alt="Hospital logo"
 *   width={80}
 *   height={80}
 *   fallbackIcon="building"
 * />
 */
export default function SafeImage({
    src,
    alt,
    fallbackSrc = DEFAULT_FALLBACK,
    fallbackIcon = 'image',
    fallbackClassName,
    className,
    ...props
}: SafeImageProps) {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // If no src or error occurred, show fallback
    if (!src || hasError) {
        const iconClassName = fallbackClassName || className || 'w-full h-full';

        // Try fallback image first, if not available show icon
        if (fallbackSrc && fallbackSrc !== DEFAULT_FALLBACK) {
            return (
                <Image
                    {...props}
                    src={fallbackSrc}
                    alt={alt}
                    className={className}
                    onError={() => setHasError(true)}
                />
            );
        }

        // Show fallback icon
        return (
            <div
                className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${iconClassName}`}
                style={{
                    width: typeof props.width === 'number' ? props.width : undefined,
                    height: typeof props.height === 'number' ? props.height : undefined,
                }}
            >
                {fallbackIcon === 'building' ? (
                    <Building2 className="w-1/2 h-1/2 text-gray-400" />
                ) : (
                    <ImageOff className="w-1/3 h-1/3 text-gray-400" />
                )}
            </div>
        );
    }

    return (
        <>
            <Image
                {...props}
                src={src}
                alt={alt}
                className={`${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setHasError(true);
                    setIsLoading(false);
                }}
            />
            {isLoading && (
                <div
                    className="absolute inset-0 bg-gray-100 animate-pulse rounded"
                    style={{
                        width: typeof props.width === 'number' ? props.width : undefined,
                        height: typeof props.height === 'number' ? props.height : undefined,
                    }}
                />
            )}
        </>
    );
}

/**
 * Simple img tag version for cases where Next.js Image isn't needed
 */
export function SafeImg({
    src,
    alt,
    fallbackIcon = 'image',
    className,
    ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
    fallbackIcon?: 'building' | 'image' | 'user' | 'package';
}) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return (
            <div className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${className || ''}`}>
                {fallbackIcon === 'building' ? (
                    <Building2 className="w-1/2 h-1/2 text-gray-400" />
                ) : (
                    <ImageOff className="w-1/3 h-1/3 text-gray-400" />
                )}
            </div>
        );
    }

    return (
        <img
            {...props}
            src={src}
            alt={alt || ''}
            className={className}
            onError={() => setHasError(true)}
        />
    );
}

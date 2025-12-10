/**
 * Utility for generating random particle data for animations
 * This ensures Math.random() is called outside of render, avoiding React purity violations
 */

export interface Particle {
  id: number;
  left: number;
  top: number;
  size?: number;
  width?: number;
  height?: number;
  duration?: number;
  delay?: number;
  repeatDelay?: number;
  opacity?: number;
}

export const generateParticles = (count: number, options: Partial<Particle> = {}): Particle[] => {
  return [...Array(count)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 4 + Math.random() * 8,
    width: Math.random() * 4 + 2,
    height: Math.random() * 4 + 2,
    duration: 1 + Math.random() * 2,
    delay: Math.random() * 1,
    repeatDelay: Math.random() * 1,
    opacity: 0.3 + Math.random() * 0.7,
    ...options,
  }));
};

export const generateRandomValue = (min: number, max: number): number => {
  return min + Math.random() * (max - min);
};

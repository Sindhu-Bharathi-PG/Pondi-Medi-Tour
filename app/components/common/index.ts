/**
 * Common Components Barrel Export
 * 
 * Central export point for all reusable common components across the application.
 * Organized by functionality for better maintainability and discoverability.
 */

// ============================================================================
// Layout & Navigation Components
// ============================================================================
export { default as Footer } from './Footer';
export { default as Header } from './Header';
export { default as Navigation } from './Navigation';

// ============================================================================
// UI & Accessibility Components
// ============================================================================
export {
    default as CommonLoader, DashboardSkeleton,
    PageLoader, SkeletonCard, SkeletonLoader, SkeletonStatCard,
    SkeletonTableRow
} from './CommonLoader';
export { default as FloatingAccessibility } from './FloatingAccessibility';
export { default as LoadingSpinner } from './LoadingSpinner';
export { default as ModeToggle, ModeToggleCompact } from './ModeToggle';
export { default as SearchBar } from './SearchBar';

// ============================================================================
// Error Handling Components
// ============================================================================
export { default as ErrorBoundary } from './ErrorBoundary';

// ============================================================================
// Transition & Animation Components
// ============================================================================
export { default as SeaWaveTransition } from './SeaWaveTransition';
export { default as SmoothTransition } from './SmoothTransition';
export { default as TransitionOverlay } from './TransitionOverlay';
export { default as VideoTransition } from './VideoTransition';


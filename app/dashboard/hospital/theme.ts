/**
 * Hospital Dashboard Theme Configuration
 * Unified styling constants for consistent theming across all pages
 */

// Primary theme colors - Emerald/Teal medical theme
export const theme = {
    // Primary gradient for main actions
    primaryGradient: 'from-emerald-600 to-teal-600',
    primaryGradientHover: 'from-emerald-700 to-teal-700',
    primaryShadow: 'shadow-emerald-500/25',
    primaryShadowHover: 'shadow-emerald-500/40',

    // Text colors
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500',
    textHeading: 'text-gray-900',

    // Background colors
    bgPage: 'bg-gray-50/50',
    bgCard: 'bg-white',
    bgCardHover: 'hover:bg-gray-50',

    // Border colors
    borderDefault: 'border-gray-200',
    borderLight: 'border-gray-100',

    // Status colors
    statusSuccess: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    statusWarning: 'text-amber-700 bg-amber-50 border-amber-200',
    statusError: 'text-red-700 bg-red-50 border-red-200',
    statusInfo: 'text-blue-700 bg-blue-50 border-blue-200'
};

// Common component class strings
export const styles = {
    // Page wrapper
    pageContainer: 'min-h-full bg-gray-50/50',
    pageContent: 'relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6',

    // Headers
    pageTitle: 'text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight',
    pageSubtitle: 'text-gray-600 mt-1',
    sectionTitle: 'text-lg font-semibold text-gray-900',

    // Breadcrumb/back link
    backLink: 'inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600 mb-3 transition-colors',

    // Cards
    card: 'bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden',
    cardGlass: 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden',
    cardHeader: 'px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50',
    cardBody: 'p-6',

    // Buttons
    btnPrimary: 'flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all',
    btnSecondary: 'flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all',
    btnOutline: 'flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all',
    btnDanger: 'flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-all',

    // Form inputs
    input: 'w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400',
    inputWithIcon: 'w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400',
    label: 'block text-sm font-medium text-gray-700 mb-1.5',

    // Search bar
    searchContainer: 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-5 mb-6',
    searchInput: 'w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400',

    // Badges
    badge: 'px-2.5 py-1 rounded-lg text-xs font-medium',
    badgeSuccess: 'px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700',
    badgeWarning: 'px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-100 text-amber-700',
    badgeError: 'px-2.5 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700',
    badgeInfo: 'px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700',

    // Tables/Lists
    tableRow: 'px-6 py-4 hover:bg-gray-50/50 transition-colors border-b border-gray-50',
    tableHeader: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50',

    // Grid layouts
    gridCols2: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    gridCols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    gridCols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',

    // Stats cards
    statCard: 'bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg',

    // Empty state
    emptyState: 'min-h-[300px] flex flex-col items-center justify-center p-8 text-center',
    emptyIcon: 'w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4',
    emptyTitle: 'text-lg font-semibold text-gray-900 mb-2',
    emptyText: 'text-gray-500 max-w-md'
};

// Ambient background component
export const AmbientBackground = () => `
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-1/4 -left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-emerald-400/10 to-teal-400/5 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-1/4 -right-1/4 w-1/3 h-1/3 bg-gradient-to-tl from-teal-400/10 to-cyan-400/5 rounded-full blur-3xl"></div>
    </div>
`;

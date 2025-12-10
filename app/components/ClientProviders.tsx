'use client';

import React from 'react';
import { SiteModeProvider } from '../context/SiteModeContext';

/**
 * ClientProviders - Client-side wrapper that includes all providers
 */
export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SiteModeProvider>
            {children}
        </SiteModeProvider>
    );
};

export default ClientProviders;

'use client';

import React from 'react';
import { CurrencyProvider } from '../context/CurrencyContext';
import { HomeConfigProvider } from '../context/HomeConfigContext';
import { SiteModeProvider } from '../context/SiteModeContext';

/**
 * ClientProviders - Client-side wrapper that includes all providers
 */
export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SiteModeProvider>
            <HomeConfigProvider>
                <CurrencyProvider>
                    {children}
                </CurrencyProvider>
            </HomeConfigProvider>
        </SiteModeProvider>
    );
};

export default ClientProviders;

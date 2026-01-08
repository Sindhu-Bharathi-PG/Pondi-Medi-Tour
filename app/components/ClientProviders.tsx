'use client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { CurrencyProvider } from '../context/CurrencyContext';
import { HomeConfigProvider } from '../context/HomeConfigContext';
import { SiteModeProvider } from '../context/SiteModeContext';
import FloatingAccessibility from './common/FloatingAccessibility';

import TourGuide from './common/TourGuide';

/**
 * ClientProviders - Client-side wrapper that includes all providers
 */
export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthProvider>
            <SiteModeProvider>
                <HomeConfigProvider>
                    <CurrencyProvider>
                        {children}
                        <FloatingAccessibility />
                        <TourGuide />
                    </CurrencyProvider>
                </HomeConfigProvider>
            </SiteModeProvider>
        </AuthProvider>
    );
};

export default ClientProviders;

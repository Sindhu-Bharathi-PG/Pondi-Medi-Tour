"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Currency {
    code: string;
    symbol: string;
    name: string;
}

export const CURRENCIES: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

interface CurrencyContextType {
    selectedCurrency: Currency;
    setSelectedCurrency: (currency: Currency) => void;
    convertAmount: (amount: number, fromCurrency: string) => Promise<number>;
    formatCurrency: (amount: number, currencyCode?: string) => string;
    isConverting: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Cache for exchange rates (valid for 1 hour)
let exchangeRatesCache: { rates: Record<string, number>; timestamp: number } | null = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Default to INR, but try to load from localStorage on mount
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[3]); // Default to INR
    const [isConverting, setIsConverting] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from localStorage
    useEffect(() => {
        const savedCurrencyCode = localStorage.getItem('pondy_currency');
        if (savedCurrencyCode) {
            const savedCurrency = CURRENCIES.find(c => c.code === savedCurrencyCode);
            if (savedCurrency) {
                setSelectedCurrency(savedCurrency);
            }
        }
        setIsInitialized(true);
    }, []);

    // Update localStorage when currency changes
    const handleSetCurrency = (currency: Currency) => {
        setSelectedCurrency(currency);
        localStorage.setItem('pondy_currency', currency.code);
    };

    // Fetch exchange rates from API
    const fetchExchangeRates = async (): Promise<Record<string, number>> => {
        // Check cache first
        if (exchangeRatesCache && Date.now() - exchangeRatesCache.timestamp < CACHE_DURATION) {
            return exchangeRatesCache.rates;
        }

        try {
            // Using exchangerate-api.io free tier (no API key needed for basic usage)
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }

            const data = await response.json();

            // Cache the rates
            exchangeRatesCache = {
                rates: data.rates,
                timestamp: Date.now(),
            };

            return data.rates;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            // Return fallback rates if API fails
            return {
                USD: 1,
                EUR: 0.85,
                GBP: 0.73,
                INR: 83.12,
                AED: 3.67,
                SAR: 3.75,
                JPY: 110.0,
                AUD: 1.35,
            };
        }
    };

    // Convert amount from one currency to selected currency
    const convertAmount = async (amount: number, fromCurrency: string = 'INR'): Promise<number> => {
        // If same currency, return same amount
        if (fromCurrency === selectedCurrency.code) {
            return amount;
        }

        try {
            setIsConverting(true);
            const rates = await fetchExchangeRates();

            // Convert from source currency to USD, then USD to target currency
            const fromRate = rates[fromCurrency] || 1;
            const toRate = rates[selectedCurrency.code] || 1;

            // amount in source currency → USD → target currency
            const amountInUSD = amount / fromRate;
            const convertedAmount = amountInUSD * toRate;

            return Math.round(convertedAmount * 100) / 100; // Round to 2 decimal places
        } catch (error) {
            console.error('Currency conversion failed:', error);
            return amount; // Return original amount on error
        } finally {
            setIsConverting(false);
        }
    };

    // Format currency with symbol
    const formatCurrency = (amount: number, currencyCode?: string): string => {
        const currency = currencyCode
            ? CURRENCIES.find(c => c.code === currencyCode) || selectedCurrency
            : selectedCurrency;

        // Format based on currency
        const formatted = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(amount);

        return `${currency.symbol}${formatted}`;
    };

    // Prevent hydration mismatch by not rendering specific currency reliant UI until initialized if needed
    // However, since we default to INR for SSR, this is fine. 
    // Just ensuring we don't have hydration errors if local storage differs from server default?
    // Actually, for a perfect match, we should render children, but the context values might update after mount.
    // This is standard React behavior.

    return (
        <CurrencyContext.Provider
            value={{
                selectedCurrency,
                setSelectedCurrency: handleSetCurrency,
                convertAmount,
                formatCurrency,
                isConverting,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};

// Optional hook for components that may be used outside the provider
export const useCurrencyOptional = () => {
    return useContext(CurrencyContext);
};

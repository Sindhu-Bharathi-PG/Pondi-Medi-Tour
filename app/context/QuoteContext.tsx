"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface QuoteData {
    hospitalId?: number;
    hospitalName?: string;
    treatmentType?: string;
    packageName?: string;
    source?: string;
}

interface QuoteContextType {
    isOpen: boolean;
    quoteData: QuoteData;
    openQuoteWidget: (data?: QuoteData) => void;
    closeQuoteWidget: () => void;
    resetQuoteData: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [quoteData, setQuoteData] = useState<QuoteData>({});

    const openQuoteWidget = useCallback((data?: QuoteData) => {
        if (data) {
            setQuoteData(data);
        }
        setIsOpen(true);
    }, []);

    const closeQuoteWidget = useCallback(() => {
        setIsOpen(false);
    }, []);

    const resetQuoteData = useCallback(() => {
        setQuoteData({});
    }, []);

    return (
        <QuoteContext.Provider value={{ isOpen, quoteData, openQuoteWidget, closeQuoteWidget, resetQuoteData }}>
            {children}
        </QuoteContext.Provider>
    );
}

export function useQuote() {
    const context = useContext(QuoteContext);
    if (!context) {
        throw new Error('useQuote must be used within a QuoteProvider');
    }
    return context;
}

export default QuoteContext;

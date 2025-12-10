"use client";

import { useCurrency } from '@/app/context/CurrencyContext';
import { useEffect, useState } from 'react';

interface ConvertedPriceProps {
    amount: number;
    fromCurrency?: string;
    className?: string;
    showSymbol?: boolean;
}

export const ConvertedPrice: React.FC<ConvertedPriceProps> = ({
    amount,
    fromCurrency = 'INR',
    className = '',
    showSymbol = true,
}) => {
    const { convertAmount, formatCurrency, selectedCurrency, isConverting } = useCurrency();
    const [convertedAmount, setConvertedAmount] = useState<number>(amount);

    useEffect(() => {
        const performConversion = async () => {
            const result = await convertAmount(amount, fromCurrency);
            setConvertedAmount(result);
        };
        performConversion();
    }, [amount, fromCurrency, selectedCurrency, convertAmount]);

    if (isConverting) {
        return <span className={className}>...</span>;
    }

    return (
        <span className={className}>
            {showSymbol ? formatCurrency(convertedAmount) : convertedAmount.toLocaleString()}
        </span>
    );
};

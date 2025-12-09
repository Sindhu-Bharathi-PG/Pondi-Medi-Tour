"use client";

import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook for search functionality with filtering
 * @param items - Array of items to search through
 * @returns Search state and handlers
 */
export function useSearch(items: string[]) {
      const [query, setQuery] = useState('');
      const [focused, setFocused] = useState(false);

      const results = useMemo(() => {
            if (query.length === 0) return [];
            const lowerQuery = query.toLowerCase();
            return items.filter(item =>
                  item.toLowerCase().includes(lowerQuery)
            );
      }, [query, items]);

      const handleFocus = useCallback(() => setFocused(true), []);

      const handleBlur = useCallback(() => {
            // Delay to allow click events on results
            setTimeout(() => setFocused(false), 200);
      }, []);

      const selectResult = useCallback((result: string) => {
            setQuery(result);
            setFocused(false);
      }, []);

      const clearSearch = useCallback(() => {
            setQuery('');
            setFocused(false);
      }, []);

      return {
            query,
            setQuery,
            focused,
            setFocused,
            results,
            handleFocus,
            handleBlur,
            selectResult,
            clearSearch
      };
}

export default useSearch;

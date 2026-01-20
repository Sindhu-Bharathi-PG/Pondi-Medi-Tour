import { NextRequest, NextResponse } from 'next/server';

// In-memory server-side cache for faster repeated translations
const serverCache = new Map<string, { text: string; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hour cache TTL

// Language codes for MyMemory API
const LANGUAGE_CODES: Record<string, string> = {
    en: 'en',
    hi: 'hi',
    ta: 'ta',
    ml: 'ml',
    te: 'te',
    fr: 'fr',
    de: 'de',
    es: 'es',
    it: 'it',
    pt: 'pt',
    ja: 'ja',
    zh: 'zh-CN',
};

interface TranslateRequest {
    text: string;
    targetLanguage: string;
    sourceLanguage?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: TranslateRequest = await request.json();
        const { text, targetLanguage, sourceLanguage = 'en' } = body;

        // Validation
        if (!text?.trim()) {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            );
        }

        if (!targetLanguage || !LANGUAGE_CODES[targetLanguage]) {
            return NextResponse.json(
                { error: 'Invalid target language' },
                { status: 400 }
            );
        }

        // Return original if target is same as source
        if (targetLanguage === sourceLanguage) {
            return NextResponse.json({
                translatedText: text,
                sourceLanguage,
                targetLanguage,
                cached: true,
            });
        }

        // Check server cache
        const cacheKey = `${sourceLanguage}:${targetLanguage}:${text}`;
        const cached = serverCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            return NextResponse.json({
                translatedText: cached.text,
                sourceLanguage,
                targetLanguage,
                cached: true,
            });
        }

        // Use MyMemory Translation API (free, no API key needed)
        const sourceLang = LANGUAGE_CODES[sourceLanguage] || 'en';
        const targetLang = LANGUAGE_CODES[targetLanguage];

        const encodedText = encodeURIComponent(text);
        const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`;

        const response = await fetch(myMemoryUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('MyMemory API error:', response.status);
            return NextResponse.json({
                translatedText: text,
                sourceLanguage,
                targetLanguage,
                error: 'Translation service temporarily unavailable',
            });
        }

        const data = await response.json();

        // MyMemory returns translation in responseData.translatedText
        let translatedText = text;
        if (data.responseStatus === 200 && data.responseData?.translatedText) {
            translatedText = data.responseData.translatedText;

            // MyMemory sometimes returns UPPERCASE, decode HTML entities
            translatedText = decodeHTMLEntities(translatedText);
        }

        // Cache the result
        serverCache.set(cacheKey, {
            text: translatedText,
            timestamp: Date.now(),
        });

        // Clean old cache entries periodically
        if (serverCache.size > 1000) {
            const now = Date.now();
            for (const [key, value] of serverCache.entries()) {
                if (now - value.timestamp > CACHE_TTL) {
                    serverCache.delete(key);
                }
            }
        }

        return NextResponse.json({
            translatedText,
            sourceLanguage,
            targetLanguage,
            cached: false,
        });

    } catch (error) {
        console.error('Translation error:', error);
        return NextResponse.json(
            { error: 'Translation failed', translatedText: '' },
            { status: 500 }
        );
    }
}

// Helper to decode HTML entities
function decodeHTMLEntities(text: string): string {
    const entities: Record<string, string> = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&nbsp;': ' ',
    };

    return text.replace(/&[^;]+;/g, (match) => entities[match] || match);
}

// Health check endpoint
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        service: 'translation',
        provider: 'MyMemory (free)',
        cacheSize: serverCache.size,
        supportedLanguages: Object.keys(LANGUAGE_CODES),
    });
}

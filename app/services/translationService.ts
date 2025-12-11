// Language type definition (since LanguageContext doesn't exist yet)
type Language = 'en' | 'fr' | 'ta' | 'hi' | 'ar' | 'ru' | 'es';

interface TranslationParams {
  text: string;
  sourceLanguage?: string;
  targetLanguage: Language;
}

interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: Language;
}

class TranslationService {
  private static instance: TranslationService;
  private cache: Map<string, string> = new Map();

  private constructor() { }

  static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  private getCacheKey(text: string, language: Language): string {
    return `${text}|${language}`;
  }

  async translate(params: TranslationParams): Promise<string> {
    const { text, targetLanguage, sourceLanguage = 'en' } = params;

    // Return original if target is English
    if (targetLanguage === 'en' || !text) {
      return text;
    }

    const cacheKey = this.getCacheKey(text, targetLanguage);

    // Check cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          sourceLanguage,
          targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const data: TranslationResult = await response.json();
      const translatedText = data.translatedText;

      // Cache the result
      this.cache.set(cacheKey, translatedText);

      return translatedText;
    } catch (error) {
      console.error('Translation service error:', error);
      throw error;
    }
  }

  async batchTranslate(texts: string[], targetLanguage: Language): Promise<string[]> {
    return Promise.all(
      texts.map((text) =>
        this.translate({ text, targetLanguage })
          .catch(() => text) // Return original on error
      )
    );
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

export const translationService = TranslationService.getInstance();

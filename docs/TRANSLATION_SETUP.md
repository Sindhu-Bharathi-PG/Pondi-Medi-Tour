# Dynamic Page Translation with OpenRouter API

This implementation provides seamless dynamic page translation using the OpenRouter API with the Qwen 2.5 72B Instruct model.

## 📋 Overview

The translation system includes:

- **API Route** (`/api/translate`) - Server-side translation endpoint
- **Language Context** - Global state management for language switching
- **Hooks** - Custom hooks for translation functionality
- **Components** - Pre-built UI components for language switching and text translation
- **Services** - Translation service for batch operations and caching

## 🔑 Configuration

### Environment Variables

Create or update `.env.local`:

```bash
# OpenRouter API Configuration
OPENROUTER_API_KEY=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

# Site Configuration
SITE_URL=http://localhost:3000
```

## 📦 Supported Languages

- **English** (en)
- **Spanish** (es)
- **French** (fr)
- **German** (de)
- **Italian** (it)
- **Portuguese** (pt)
- **Japanese** (ja)
- **Chinese** (zh)
- **Hindi** (hi)
- **Tamil** (ta)
- **Malayalam** (ml)
- **Telugu** (te)

## 🚀 Usage

### 1. Wrap Your App with LanguageProvider

In `app/layout.tsx`:

```tsx
import { LanguageProvider } from "./context/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
```

### 2. Add Language Switcher to Header

In your Header component:

```tsx
import { LanguageSwitcher } from "@/components/common";

export default function Header() {
  return (
    <header>
      {/* Other header content */}
      <LanguageSwitcher />
    </header>
  );
}
```

### 3. Use TranslatableText Component

For individual text elements:

```tsx
import { TranslatableText } from "@/components/common";

export default function MyPage() {
  return (
    <div>
      <TranslatableText className="text-lg">
        Welcome to our website
      </TranslatableText>
    </div>
  );
}
```

### 4. Use useLocalization Hook

For programmatic translation:

```tsx
"use client";

import { useLocalization } from "@/hooks";

export default function MyComponent() {
  const {
    translate,
    currentLanguage,
    changeLanguage,
    isTranslating,
    batchTranslate,
  } = useLocalization();

  const handleTranslate = async () => {
    const translated = await translate("Hello, World!");
    console.log(translated);
  };

  const handleBatchTranslate = async () => {
    const texts = ["Hello", "Good morning", "Welcome"];
    const translations = await batchTranslate(texts);
    console.log(translations);
  };

  return (
    <div>
      <p>Current Language: {currentLanguage}</p>
      <button onClick={() => changeLanguage("es")}>Spanish</button>
      <button onClick={handleTranslate} disabled={isTranslating}>
        {isTranslating ? "Translating..." : "Translate"}
      </button>
      <button onClick={handleBatchTranslate}>Batch Translate</button>
    </div>
  );
}
```

### 5. Use useLanguage Hook (Advanced)

For direct context access:

```tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function AdvancedComponent() {
  const {
    currentLanguage,
    setLanguage,
    translateText,
    isTranslating,
    translationCache,
    clearCache,
  } = useLanguage();

  const getTranslations = async () => {
    const result = await translateText("Hello", "es");
    console.log(result);
  };

  return (
    <div>
      <p>Language: {currentLanguage}</p>
      <button onClick={() => setLanguage("fr")}>Switch to French</button>
      <button onClick={getTranslations}>Get Translation</button>
      <p>Cache size: {translationCache.size}</p>
      <button onClick={clearCache}>Clear Cache</button>
    </div>
  );
}
```

### 6. Use Translation Service Directly

For client-side operations without React hooks:

```tsx
import { translationService } from "@/services/translationService";

async function translateContent() {
  const translated = await translationService.translate({
    text: "Hello, World!",
    targetLanguage: "es",
    sourceLanguage: "en",
  });
  console.log(translated);

  // Batch translation
  const texts = ["Hello", "Good morning", "Welcome"];
  const translations = await translationService.batchTranslate(texts, "fr");
  console.log(translations);

  // Clear cache
  translationService.clearCache();
}
```

## 🏗️ Architecture

### API Endpoint: `/api/translate`

**Request:**

```json
{
  "text": "Hello, World!",
  "targetLanguage": "es",
  "sourceLanguage": "en"
}
```

**Response:**

```json
{
  "translatedText": "¡Hola, Mundo!",
  "sourceLanguage": "en",
  "targetLanguage": "es"
}
```

### Components

#### LanguageSwitcher

- Dropdown language selector
- Shows current language
- Loading indicator during translation
- Supports all 12 languages

#### TranslatableText

- Wraps text elements
- Automatic translation on language change
- Loading state management
- Fallback text support
- Cache-aware

### Hooks

#### useLocalization()

Returns:

- `currentLanguage` - Current active language
- `changeLanguage(lang)` - Switch language
- `translate(text, targetLang?)` - Translate text
- `batchTranslate(texts, targetLang)` - Translate multiple texts
- `isTranslating` - Boolean for loading state
- `pendingTranslations` - Count of pending translations
- `getLanguageInfo()` - Get language metadata
- `clearCache()` - Clear translation cache

#### useLanguage()

Returns:

- `currentLanguage` - Current active language
- `setLanguage(lang)` - Set current language
- `translateText(text, targetLang?)` - Translate text (cached)
- `isTranslating` - Loading state
- `translationCache` - Map of cached translations
- `clearCache()` - Clear cache

## 🎯 Features

✅ **Smart Caching** - Translations are cached to reduce API calls
✅ **Batch Translation** - Translate multiple texts efficiently
✅ **Loading States** - Built-in indicators for pending translations
✅ **Error Handling** - Graceful fallbacks on API errors
✅ **SSR Friendly** - Client-side rendering with proper context setup
✅ **TypeScript Support** - Fully typed with Language type
✅ **Performance** - Lazy translation with debouncing
✅ **12 Languages** - English, Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Hindi, Tamil, Malayalam, Telugu

## 🔄 Model Information

**Model**: Qwen/Qwen-2.5-72B-Instruct

- **Provider**: OpenRouter
- **Context Window**: Large (suitable for document translation)
- **Temperature**: 0.3 (optimized for accurate translations)
- **Max Tokens**: 500 per translation

## 📊 Translation Flow

```
User Changes Language
         ↓
LanguageSwitcher triggers setLanguage()
         ↓
LanguageContext updates currentLanguage
         ↓
TranslatableText components detect language change
         ↓
Check translation cache
         ↓
If not cached: Call /api/translate endpoint
         ↓
OpenRouter API (Qwen model) processes translation
         ↓
Result cached and displayed
         ↓
UI updates with translated content
```

## 🛡️ Best Practices

1. **Always wrap with LanguageProvider** at the root level
2. **Use TranslatableText** for simple text elements
3. **Use useLocalization** for complex logic
4. **Batch translate** when translating multiple texts
5. **Clear cache** when switching between major content sections
6. **Handle loading states** in UI for better UX
7. **Test translations** in all supported languages
8. **Monitor API costs** through OpenRouter dashboard

## ⚠️ Important Notes

- **First translation request** may take 1-2 seconds (API initialization)
- **Cached translations** are instant
- **English to English** returns original text (no API call)
- **Empty strings** are skipped
- **API errors** fall back to original text
- **Rate limiting** applies (OpenRouter standard limits)

## 🔌 API Limits

OpenRouter has standard rate limits:

- Check your API dashboard at https://openrouter.ai/
- Monitor usage to optimize costs

## 📝 Example: Full Page Translation

```tsx
"use client";

import { useLocalization } from "@/hooks";
import { LanguageSwitcher, TranslatableText } from "@/components/common";

export default function Page() {
  const { currentLanguage, isTranslating } = useLocalization();

  return (
    <div>
      <header className="flex justify-between items-center">
        <TranslatableText className="text-3xl font-bold">
          Welcome to Pondi
        </TranslatableText>
        <LanguageSwitcher />
      </header>

      <main>
        <section>
          <TranslatableText className="text-xl">
            Our medical tourism services
          </TranslatableText>

          {isTranslating && <p>Translating content...</p>}

          <TranslatableText>
            We offer world-class medical treatments
          </TranslatableText>
        </section>
      </main>
    </div>
  );
}
```

## 🚨 Troubleshooting

### Translation not working

1. Check `.env.local` has valid API key
2. Verify SITE_URL is set
3. Check browser console for errors
4. Test API endpoint directly

### Slow translations

1. Check cache size with `getLanguageInfo()`
2. Clear cache if necessary
3. Monitor OpenRouter API status
4. Check network connection

### Missing translations

1. Verify language code is correct
2. Check if language is supported
3. Try a simpler text first
4. Check API response in network tab

## 📚 Files Created

- `/app/api/translate/route.ts` - Translation API endpoint
- `/app/context/LanguageContext.tsx` - Language state management
- `/app/hooks/useLocalization.ts` - Translation hook
- `/app/components/common/LanguageSwitcher.tsx` - Language selector UI
- `/app/components/common/TranslatableText.tsx` - Translatable text component
- `/app/services/translationService.ts` - Translation service class
- `/.env.local.example` - Environment variables template

## 🎓 Next Steps

1. Set up environment variables
2. Wrap your app with LanguageProvider
3. Add LanguageSwitcher to header
4. Replace static text with TranslatableText
5. Test all supported languages
6. Monitor translation performance
7. Optimize based on usage patterns

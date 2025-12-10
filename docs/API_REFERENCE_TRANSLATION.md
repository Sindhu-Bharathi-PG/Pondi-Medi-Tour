# Translation API Reference

Complete API documentation for the dynamic translation system.

## Endpoint: POST /api/translate

Server-side endpoint for translating text using OpenRouter API.

### Request

```typescript
POST /api/translate
Content-Type: application/json

{
  "text": string;           // Text to translate
  "targetLanguage": string; // Target language code (e.g., 'es', 'fr')
  "sourceLanguage"?: string; // Source language (default: 'en')
}
```

### Request Parameters

| Parameter        | Type   | Required | Description                                    |
| ---------------- | ------ | -------- | ---------------------------------------------- |
| `text`           | string | Yes      | Text to translate (max 2000 chars recommended) |
| `targetLanguage` | string | Yes      | Target language code                           |
| `sourceLanguage` | string | No       | Source language code (default: 'en')           |

### Response

```json
{
  "translatedText": string;
  "sourceLanguage": string;
  "targetLanguage": string;
}
```

### Examples

#### Single Word Translation

Request:

```json
{
  "text": "Hello",
  "targetLanguage": "es"
}
```

Response:

```json
{
  "translatedText": "Hola",
  "sourceLanguage": "en",
  "targetLanguage": "es"
}
```

#### Sentence Translation

Request:

```json
{
  "text": "Welcome to our medical tourism platform",
  "targetLanguage": "fr",
  "sourceLanguage": "en"
}
```

Response:

```json
{
  "translatedText": "Bienvenue sur notre plateforme de tourisme médical",
  "sourceLanguage": "en",
  "targetLanguage": "fr"
}
```

#### Paragraph Translation

Request:

```json
{
  "text": "We offer world-class medical treatments with affordable packages. Our team of experienced doctors provides comprehensive care in a serene environment.",
  "targetLanguage": "de"
}
```

Response:

```json
{
  "translatedText": "Wir bieten medizinische Behandlungen auf Weltklasse-Niveau mit erschwinglichen Paketen. Unser Team erfahrener Ärzte bietet umfassende Betreuung in einer ruhigen Umgebung.",
  "sourceLanguage": "en",
  "targetLanguage": "de"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "Missing required fields: text and targetLanguage"
}
```

### 500 Internal Server Error

```json
{
  "error": "Translation service error",
  "details": "API error message"
}
```

## Supported Languages

| Code | Language   | Code | Language  |
| ---- | ---------- | ---- | --------- |
| en   | English    | ja   | Japanese  |
| es   | Spanish    | zh   | Chinese   |
| fr   | French     | hi   | Hindi     |
| de   | German     | ta   | Tamil     |
| it   | Italian    | ml   | Malayalam |
| pt   | Portuguese | te   | Telugu    |

## Context API: useLanguage()

Low-level hook for direct context access.

```typescript
interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translateText: (text: string, targetLanguage?: Language) => Promise<string>;
  isTranslating: boolean;
  translationCache: Map<string, string>;
  clearCache: () => void;
}
```

### Usage

```tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Component() {
  const {
    currentLanguage,
    setLanguage,
    translateText,
    isTranslating,
    translationCache,
    clearCache,
  } = useLanguage();

  // Change language
  const switchToSpanish = () => setLanguage("es");

  // Translate text
  const handleTranslate = async () => {
    const result = await translateText("Hello", "fr");
    console.log(result); // "Bonjour"
  };

  return (
    <div>
      <p>Current: {currentLanguage}</p>
      <p>Translating: {isTranslating ? "Yes" : "No"}</p>
      <p>Cache size: {translationCache.size}</p>
      <button onClick={switchToSpanish}>Spanish</button>
      <button onClick={handleTranslate}>Translate</button>
      <button onClick={clearCache}>Clear Cache</button>
    </div>
  );
}
```

## Hook API: useLocalization()

High-level convenience hook with additional features.

```typescript
interface UseLocalizationReturn {
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
  translate: (text: string, targetLang?: Language) => Promise<string>;
  batchTranslate: (texts: string[], targetLang: Language) => Promise<string[]>;
  isTranslating: boolean;
  pendingTranslations: number;
  getLanguageInfo: () => LanguageInfo;
  clearCache: () => void;
}
```

### Methods

#### changeLanguage(lang)

```typescript
const { changeLanguage } = useLocalization();
changeLanguage("es"); // Switch to Spanish
```

#### translate(text, targetLang?)

```typescript
const { translate, currentLanguage } = useLocalization();
const result = await translate("Hello", "fr");
// or use current language
const result = await translate("Hello"); // Translates to currentLanguage
```

#### batchTranslate(texts, targetLang)

```typescript
const { batchTranslate } = useLocalization();
const results = await batchTranslate(
  ["Hello", "Good morning", "Welcome"],
  "es"
);
```

#### getLanguageInfo()

```typescript
const { getLanguageInfo } = useLocalization();
const info = getLanguageInfo();
console.log(info);
// {
//   current: 'es',
//   isTranslating: false,
//   cacheSize: 42,
//   pendingCount: 0
// }
```

#### clearCache()

```typescript
const { clearCache } = useLocalization();
clearCache(); // Clear all cached translations
```

## Service API: translationService

Standalone service for non-React contexts.

```typescript
import { translationService } from "@/services/translationService";

// Single translation
const result = await translationService.translate({
  text: "Hello",
  targetLanguage: "es",
  sourceLanguage: "en",
});

// Batch translation
const results = await translationService.batchTranslate(
  ["Hello", "Good morning"],
  "fr"
);

// Cache management
translationService.clearCache();
const cacheSize = translationService.getCacheSize();
```

## Component API

### LanguageSwitcher

Dropdown component for language selection.

```tsx
import { LanguageSwitcher } from "@/components/common";

export default function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

**Features:**

- Dropdown with all 12 languages
- Current language highlight
- Loading indicator
- Disabled during translation

### TranslatableText

Wrapper component for text translation.

```tsx
interface TranslatableTextProps {
  children: string;
  className?: string;
  fallback?: string;
  loading?: React.ReactNode;
}

<TranslatableText className="text-lg">
  Welcome to our platform
</TranslatableText>;
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | string | - | Text to translate |
| `className` | string | '' | CSS classes |
| `fallback` | string | - | Fallback text on error |
| `loading` | ReactNode | 'Loading...' | Loading indicator |

## Type Definitions

```typescript
export type Language =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ja"
  | "zh"
  | "hi"
  | "ta"
  | "ml"
  | "te";

interface TranslateRequest {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
}

interface TranslateResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translateText: (text: string, targetLanguage?: Language) => Promise<string>;
  isTranslating: boolean;
  translationCache: Map<string, string>;
  clearCache: () => void;
}
```

## Implementation Details

### Translation Flow

```
User calls translate('text', 'es')
         ↓
Check cache for 'text|es'
         ↓
If found: return cached value
         ↓
If not found: POST to /api/translate
         ↓
OpenRouter API processes with Qwen 2.5 72B
         ↓
Response received
         ↓
Cache result and return
```

### Caching Strategy

- **Key Format:** `{originalText}|{languageCode}`
- **Storage:** In-memory Map (cleared on logout/tab close)
- **TTL:** No expiration (session-based)
- **Size:** Unbounded (clear if memory issues)

### Error Handling

All methods catch and handle errors:

```typescript
try {
  const result = await translate("Hello", "es");
} catch (error) {
  // Falls back to original text
  // Logs error to console
  console.error(error);
}
```

## Performance Metrics

### First Translation

- **Latency:** 1-2 seconds (API warm-up)
- **Network:** ~5KB request, ~2KB response
- **Processing:** Qwen model inference

### Cached Translation

- **Latency:** <10ms
- **Network:** None
- **Processing:** Map lookup

### Batch Translation

- **10 items:** 2-3 seconds
- **100 items:** 3-4 seconds
- **Parallel advantage:** Not used (sequential API calls)

## Rate Limiting

OpenRouter API limits:

- Check dashboard: https://openrouter.ai/
- Standard tier limits apply
- Monitor usage for cost optimization

## Best Practices

1. **Cache aggressively** - Reuse translations
2. **Batch when possible** - Group multiple translations
3. **Show loading states** - Inform users of delays
4. **Handle errors gracefully** - Fallback to original
5. **Clear cache periodically** - Prevent memory leaks
6. **Test all languages** - Verify quality
7. **Monitor API costs** - Watch OpenRouter usage
8. **Optimize prompts** - Better translations = faster

## Debugging

### Enable Verbose Logging

Add to component:

```typescript
const { translate, currentLanguage } = useLocalization();

const handleTranslate = async (text: string) => {
  console.log("Translating:", text, "to:", currentLanguage);
  const result = await translate(text);
  console.log("Result:", result);
};
```

### Check API Directly

```typescript
// In browser console
fetch("/api/translate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: "Hello",
    targetLanguage: "es",
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

### Monitor Cache

```typescript
const { translationCache, getLanguageInfo } = useLanguage();
console.log("Cache:", translationCache);
console.log("Info:", getLanguageInfo());
```

## Version History

### v1.0.0 (Current)

- Initial release
- 12 languages support
- Caching enabled
- Batch translation
- React hooks
- Standalone service
- Full TypeScript support

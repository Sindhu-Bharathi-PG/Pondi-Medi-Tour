# Quick Start: Dynamic Translation Integration

## ✅ Setup Complete!

Your application is now configured for dynamic translation with OpenRouter API and Qwen 2.5 72B model.

## 🚀 Quick Start (5 minutes)

### 1. Set Environment Variables

Create `.env.local` in the project root:

```bash
OPENROUTER_API_KEY=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
SITE_URL=http://localhost:3000
```

### 2. Test the Implementation

Visit the example page to see everything in action:

```
http://localhost:3000/translation-example
```

This page demonstrates:

- ✅ Single text translation
- ✅ Batch translation
- ✅ Language switching
- ✅ Cache management
- ✅ Loading states

### 3. Add Language Switcher to Your Header

In your `Header` component:

```tsx
import { LanguageSwitcher } from "@/components/common";

export default function Header() {
  return (
    <header>
      {/* Your header content */}
      <LanguageSwitcher />
    </header>
  );
}
```

### 4. Use TranslatableText for Page Content

Replace static text with dynamic translation:

```tsx
import { TranslatableText } from "@/components/common";

export default function MyPage() {
  return (
    <div>
      <TranslatableText className="text-2xl font-bold">
        Welcome to Pondy HealthPort
      </TranslatableText>

      <TranslatableText className="text-gray-600">
        Your gateway to world-class medical tourism
      </TranslatableText>
    </div>
  );
}
```

## 📋 Files Created

| File                                          | Purpose                            |
| --------------------------------------------- | ---------------------------------- |
| `/app/api/translate/route.ts`                 | Translation API endpoint           |
| `/app/context/LanguageContext.tsx`            | Language state & translation logic |
| `/app/hooks/useLocalization.ts`               | Main translation hook              |
| `/app/components/common/LanguageSwitcher.tsx` | UI language selector               |
| `/app/components/common/TranslatableText.tsx` | Text translation component         |
| `/app/services/translationService.ts`         | Standalone translation service     |
| `/app/translation-example/page.tsx`           | Demo/example page                  |
| `/docs/TRANSLATION_SETUP.md`                  | Complete documentation             |
| `/.env.local.example`                         | Environment variables template     |

## 🎯 Common Use Cases

### Translate Entire Page

```tsx
const { translate, currentLanguage } = useLocalization();

useEffect(() => {
  document.documentElement.lang = currentLanguage;
}, [currentLanguage]);
```

### Translate Dynamic Content

```tsx
const handleTranslateUserContent = async (content: string) => {
  const { translate } = useLocalization();
  const translated = await translate(content);
  setUserContent(translated);
};
```

### Bulk Translate Components

```tsx
const { batchTranslate } = useLocalization();

const translations = await batchTranslate(["Hello", "Good morning", "Welcome"]);
```

## 🔧 Advanced Configuration

### Custom Temperature (Accuracy vs Creativity)

Edit `/app/api/translate/route.ts`:

```typescript
temperature: 0.3,  // Lower = more accurate translations
max_tokens: 500,   // Adjust max translation length
```

### Different Model

Change `MODEL` variable in `/app/api/translate/route.ts`:

```typescript
const MODEL = "openrouter/auto"; // Let OpenRouter choose best model
```

### Custom Prompt Optimization

Modify the translation prompt in the API route for better results:

```typescript
const prompt = `You are a professional translator...
Maintain terminology consistency...
Preserve formatting and structure...`;
```

## 🧪 Testing

### Test Single Translation

```bash
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello", "targetLanguage": "es"}'
```

### Test Hook

Visit `/translation-example` and use the interactive demo

### Test Component

```tsx
<TranslatableText>Test your text here</TranslatableText>
```

## 📊 Monitoring

### Check Translation Cache Size

```tsx
const { getLanguageInfo } = useLocalization();
const info = getLanguageInfo();
console.log(`Cache size: ${info.cacheSize} items`);
```

### Clear Cache When Needed

```tsx
const { clearCache } = useLocalization();
clearCache(); // Frees up memory, translations will be re-fetched
```

## 🚨 Troubleshooting

### "Translation service error"

- ✅ Check API key in `.env.local`
- ✅ Verify SITE_URL is set
- ✅ Check OpenRouter account for API errors

### Slow translations

- ✅ First translation is slower (API warm-up)
- ✅ Subsequent translations use cache
- ✅ Check network tab for bottlenecks

### Not translating

- ✅ Ensure LanguageProvider wraps app
- ✅ Check browser console for errors
- ✅ Test with `/translation-example` page first
- ✅ Verify language code is supported

## 📞 Support

For more detailed documentation, see:

- `docs/TRANSLATION_SETUP.md` - Full documentation
- `app/translation-example/page.tsx` - Working example
- `app/api/translate/route.ts` - API implementation

## 🎉 You're All Set!

1. ✅ API endpoint configured
2. ✅ Language context set up
3. ✅ Components ready to use
4. ✅ Hooks available
5. ✅ Example page created

**Next steps:**

1. Set environment variables
2. Start dev server: `npm run dev`
3. Visit `/translation-example` to test
4. Integrate LanguageSwitcher into your header
5. Wrap content with TranslatableText
6. Deploy and enjoy multi-language support!

Happy translating! 🌍

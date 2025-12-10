# Migration Guide: Converting Pages to Dynamic Translation

Step-by-step guide to convert your existing pages to use dynamic translation.

## Overview

This guide shows how to migrate static content to support dynamic translation with the OpenRouter integration.

## Step 1: Understand Current Structure

Before migration, identify:

- ✅ Static text elements
- ✅ Dynamic content from APIs
- ✅ User-generated content
- ✅ UI labels and buttons
- ✅ Error messages

## Step 2: Simple Text Elements → TranslatableText

### Before

```tsx
export default function Home() {
  return (
    <div>
      <h1>Welcome to Pondy HealthPort</h1>
      <p>Your gateway to world-class medical tourism</p>
      <button>Learn More</button>
    </div>
  );
}
```

### After

```tsx
import { TranslatableText } from "@/components/common";

export default function Home() {
  return (
    <div>
      <h1>
        <TranslatableText className="text-3xl font-bold">
          Welcome to Pondy HealthPort
        </TranslatableText>
      </h1>
      <p>
        <TranslatableText>
          Your gateway to world-class medical tourism
        </TranslatableText>
      </p>
      <button>
        <TranslatableText>Learn More</TranslatableText>
      </button>
    </div>
  );
}
```

## Step 3: Dynamic Content → useLocalization Hook

### Before

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### After

```tsx
"use client";

import { useEffect, useState } from "react";
import { useLocalization } from "@/hooks";

export default function Services() {
  const [services, setServices] = useState([]);
  const { translate, currentLanguage } = useLocalization();

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then(async (data) => {
        // Translate service titles
        const translatedServices = await Promise.all(
          data.map(async (service) => ({
            ...service,
            title: await translate(service.title),
            description: await translate(service.description),
          }))
        );
        setServices(translatedServices);
      });
  }, [currentLanguage, translate]);

  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Step 4: Batch Translate Multiple Items

### Efficient Approach

```tsx
"use client";

import { useEffect, useState } from "react";
import { useLocalization } from "@/hooks";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const { batchTranslate, currentLanguage } = useLocalization();

  useEffect(() => {
    fetch("/api/doctors")
      .then((r) => r.json())
      .then(async (data) => {
        // Extract all text that needs translation
        const titles = data.map((d) => d.title);
        const specialties = data.map((d) => d.specialty);
        const bios = data.map((d) => d.bio);

        // Batch translate all at once
        const [translatedTitles, translatedSpecialties, translatedBios] =
          await Promise.all([
            batchTranslate(titles),
            batchTranslate(specialties),
            batchTranslate(bios),
          ]);

        // Reconstruct with translations
        const translatedDoctors = data.map((doctor, i) => ({
          ...doctor,
          title: translatedTitles[i],
          specialty: translatedSpecialties[i],
          bio: translatedBios[i],
        }));

        setDoctors(translatedDoctors);
      });
  }, [currentLanguage, batchTranslate]);

  return (
    <div>
      {doctors.map((doctor) => (
        <div key={doctor.id}>
          <h3>{doctor.title}</h3>
          <p>{doctor.specialty}</p>
          <p>{doctor.bio}</p>
        </div>
      ))}
    </div>
  );
}
```

## Step 5: Add Language Switcher

### Header Integration

```tsx
"use client";

import { LanguageSwitcher } from "@/components/common";
import { TranslatableText } from "@/components/common";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <div>
        <TranslatableText className="text-2xl font-bold">
          Pondy HealthPort
        </TranslatableText>
      </div>
      <nav>{/* Navigation items */}</nav>
      <LanguageSwitcher />
    </header>
  );
}
```

## Step 6: Handle Forms and User Input

### Before

```tsx
<input placeholder="Enter your name" />
<button>Submit</button>
<p className="error">This field is required</p>
```

### After

```tsx
<input placeholder={placeholderText} />
<button>
  <TranslatableText>Submit</TranslatableText>
</button>
{error && (
  <p className="error">
    <TranslatableText>{error}</TranslatableText>
  </p>
)}
```

With dynamic placeholders:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useLocalization } from "@/hooks";

export default function Form() {
  const [placeholder, setPlaceholder] = useState("Enter your name");
  const { translate, currentLanguage } = useLocalization();

  useEffect(() => {
    translate("Enter your name").then(setPlaceholder);
  }, [currentLanguage, translate]);

  return <input placeholder={placeholder} />;
}
```

## Step 7: Real-World Example - Medical Package Page

### Before

```tsx
export default function PackagesPage() {
  const packages = [
    {
      id: 1,
      name: "Basic Checkup",
      description: "Comprehensive health checkup",
      price: "$500",
    },
    // ... more packages
  ];

  return (
    <div>
      <h1>Medical Packages</h1>
      {packages.map((pkg) => (
        <div key={pkg.id}>
          <h3>{pkg.name}</h3>
          <p>{pkg.description}</p>
          <p>{pkg.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### After

```tsx
"use client";

import { useEffect, useState } from "react";
import { useLocalization } from "@/hooks";
import { TranslatableText } from "@/components/common";

interface Package {
  id: number;
  name: string;
  description: string;
  price: string;
  translatedName?: string;
  translatedDescription?: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: 1,
      name: "Basic Checkup",
      description: "Comprehensive health checkup",
      price: "$500",
    },
    // ... more packages
  ]);

  const { batchTranslate, currentLanguage } = useLocalization();

  useEffect(() => {
    const translatePackages = async () => {
      const names = packages.map((p) => p.name);
      const descriptions = packages.map((p) => p.description);

      const [translatedNames, translatedDescriptions] = await Promise.all([
        batchTranslate(names),
        batchTranslate(descriptions),
      ]);

      const updated = packages.map((pkg, i) => ({
        ...pkg,
        translatedName: translatedNames[i],
        translatedDescription: translatedDescriptions[i],
      }));

      setPackages(updated);
    };

    translatePackages();
  }, [currentLanguage, batchTranslate]);

  return (
    <div>
      <h1>
        <TranslatableText>Medical Packages</TranslatableText>
      </h1>
      {packages.map((pkg) => (
        <div key={pkg.id}>
          <h3>{pkg.translatedName || pkg.name}</h3>
          <p>{pkg.translatedDescription || pkg.description}</p>
          <p>{pkg.price}</p>
        </div>
      ))}
    </div>
  );
}
```

## Step 8: Meta Tags and SEO

### Dynamic Language Meta Tag

```tsx
"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return <div>{/* Your content */}</div>;
}
```

### Update Metadata

```tsx
import { useLanguage } from "@/context/LanguageContext";

// Note: This should be in a server component for proper SEO
export default function Page() {
  return (
    <>
      <title>Pondy HealthPort | Medical Tourism</title>
      <meta name="description" content="World-class medical tourism" />
      <meta name="lang" content="en" />
    </>
  );
}
```

## Step 9: Testing Your Migrations

### Test Checklist

- [ ] Language switcher appears
- [ ] Clicking language changes content
- [ ] First translation takes 1-2 seconds
- [ ] Subsequent translations are instant
- [ ] Graceful fallback on error
- [ ] Cache clears on demand
- [ ] All 12 languages work
- [ ] No console errors

### Test Code

```tsx
"use client";

import { useLocalization } from "@/hooks";

export default function TestPage() {
  const {
    translate,
    batchTranslate,
    currentLanguage,
    getLanguageInfo,
    clearCache,
  } = useLocalization();

  const testSingle = async () => {
    const result = await translate("Hello");
    console.log("Single:", result);
  };

  const testBatch = async () => {
    const results = await batchTranslate(["Hello", "Good morning", "Welcome"]);
    console.log("Batch:", results);
  };

  const testCache = () => {
    const info = getLanguageInfo();
    console.log("Cache info:", info);
  };

  return (
    <div>
      <p>Current Language: {currentLanguage}</p>
      <button onClick={testSingle}>Test Single</button>
      <button onClick={testBatch}>Test Batch</button>
      <button onClick={testCache}>Check Cache</button>
      <button onClick={clearCache}>Clear Cache</button>
    </div>
  );
}
```

## Step 10: Deployment Considerations

### Environment Setup

```bash
# .env.local (development)
OPENROUTER_API_KEY=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

# .env.production (or similar)
OPENROUTER_API_KEY=your-production-key
SITE_URL=https://your-domain.com
```

### Performance

- Cache translations aggressively
- Monitor API usage
- Consider rate limiting for high-traffic sites
- Test with expected traffic patterns

### Monitoring

```typescript
// Add to your monitoring/logging service
const { getLanguageInfo } = useLocalization();
const info = getLanguageInfo();

// Log metrics
console.log({
  timestamp: new Date(),
  language: info.current,
  cacheSize: info.cacheSize,
  pendingCount: info.pendingCount,
  isTranslating: info.isTranslating,
});
```

## Common Patterns

### Pattern 1: Lazy Translation

```typescript
const [translated, setTranslated] = useState<string | null>(null);

useEffect(() => {
  if (shouldTranslate) {
    translate(text).then(setTranslated);
  }
}, [shouldTranslate]);

return <div>{translated || text}</div>;
```

### Pattern 2: Translation with Loading

```typescript
const [state, setState] = useState<"idle" | "loading" | "done">("idle");

const handleTranslate = async () => {
  setState("loading");
  try {
    const result = await translate(text);
    setResult(result);
  } finally {
    setState("done");
  }
};
```

### Pattern 3: Conditional Translation

```typescript
const translated =
  currentLanguage === "en" ? originalText : await translate(originalText);
```

## Migration Checklist

- [ ] Add LanguageProvider to layout.tsx
- [ ] Create `.env.local` with API key
- [ ] Replace static text with TranslatableText
- [ ] Add LanguageSwitcher to header
- [ ] Update dynamic content with useLocalization
- [ ] Test all pages
- [ ] Test all supported languages
- [ ] Monitor API usage
- [ ] Set up error handling
- [ ] Document translation requirements
- [ ] Train team on new system
- [ ] Deploy to staging
- [ ] Deploy to production

## Need Help?

Refer to:

- `docs/TRANSLATION_SETUP.md` - Full documentation
- `docs/API_REFERENCE_TRANSLATION.md` - API reference
- `app/translation-example/page.tsx` - Working example
- `TRANSLATION_QUICKSTART.md` - Quick reference

Happy migrating! 🌍

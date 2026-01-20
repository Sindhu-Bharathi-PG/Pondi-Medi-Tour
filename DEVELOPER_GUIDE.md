# Pondi Medi Tour - Developer Guide

A comprehensive medical and wellness tourism platform for Pondicherry, India.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

**Visit:** `http://localhost:3000`

---

## 📁 Project Structure

```
pondimeditour/
├── app/                    # Next.js App Router pages
│   ├── components/         # Reusable components
│   │   ├── common/         # Header, Footer, etc.
│   │   ├── home/           # Homepage components
│   │   └── admin/          # Admin panel components
│   ├── context/            # React contexts
│   ├── api/                # API routes (Next.js)
│   ├── wellness/           # Wellness tourism page
│   ├── yoga-meditation/    # Yoga & meditation page
│   ├── spa-rejuvenation/   # Spa experiences page
│   ├── auroville/          # Auroville dedicated page
│   ├── destination/        # Explore Pondicherry page
│   ├── hospital/           # Hospital listings
│   ├── doctor/             # Doctor listings
│   └── dashboard/          # Admin dashboards
├── backend/                # Fastify backend API
├── public/                 # Static assets
│   └── images/             # Image files
└── .env.local              # Environment variables
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Backend | Fastify |
| Database | PostgreSQL |
| Auth | NextAuth.js |
| Images | Next/Image (optimized) |

---

## 🎨 Key Contexts

### 1. SiteModeContext
Switches between **Medical** and **Wellness** modes.

```tsx
import { useSiteMode } from '@/app/context/SiteModeContext';

const { mode, isMedical, isWellness, toggleMode } = useSiteMode();
```

### 2. LanguageContext
Handles multi-language translation.

```tsx
import { useLanguage } from '@/app/context/LanguageContext';

const { currentLanguage, translate, setLanguage } = useLanguage();
```

### 3. CurrencyContext
Manages currency conversion display.

```tsx
import { useCurrency } from '@/app/context/CurrencyContext';

const { currency, formatPrice } = useCurrency();
```

---

## 📄 Adding a New Page

1. **Create folder** in `app/`:
```
app/new-page/page.tsx
```

2. **Basic template:**
```tsx
"use client";

import { motion } from 'framer-motion';
import { Header, Footer } from '@/app/components/common';

const NewPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center">
                {/* Add content */}
            </section>
            
            <Footer />
        </div>
    );
};

export default NewPage;
```

3. **Add to navigation** in `app/context/SiteModeContext.tsx`:
```tsx
export const WELLNESS_NAV_LINKS = [
    // ... existing links
    { href: '/new-page', label: 'New Page', icon: 'Sparkles' },
];
```

---

## 🎭 Animation Patterns

### Fade In Up (Standard)
```tsx
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

<motion.div variants={fadeInUp} initial="hidden" animate="visible">
    Content
</motion.div>
```

### Stagger Children
```tsx
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

<motion.div variants={staggerContainer} initial="hidden" animate="visible">
    <motion.div variants={fadeInUp}>Item 1</motion.div>
    <motion.div variants={fadeInUp}>Item 2</motion.div>
</motion.div>
```

### Parallax Scrolling
```tsx
const { scrollY } = useScroll();
const heroY = useTransform(scrollY, [0, 500], [0, 150]);

<motion.div style={{ y: heroY }}>
    {/* Parallax content */}
</motion.div>
```

### Hover Effects
```tsx
<motion.div 
    whileHover={{ scale: 1.05, y: -10 }} 
    whileTap={{ scale: 0.95 }}
>
    Hover me
</motion.div>
```

---

## 🖼 Image Guidelines

### Using Next/Image
```tsx
import Image from 'next/image';

<div className="relative h-64">
    <Image
        src="/images/example.png"  // Local
        // OR src="https://..."    // External
        alt="Description"
        fill
        className="object-cover"
    />
</div>
```

### Image Locations
- **Generated images:** `public/images/`
- **External images:** Use Unsplash URLs with `?w=800` for optimization

### External Domains
Add to `next.config.ts`:
```ts
images: {
    remotePatterns: [
        { protocol: 'https', hostname: 'images.unsplash.com' },
        { protocol: 'https', hostname: '**' }, // Allow all HTTPS
    ],
},
```

### Production Best Practices

> ⚠️ **Important:** Local images in `public/images/` may not be available if not committed to git or not copied during deployment.

**Solution 1: Use External URLs (Recommended)**
```tsx
// ✅ Always works - uses Unsplash CDN
image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
```

**Solution 2: Use Image Utils with Fallbacks**
```tsx
import { WELLNESS_IMAGES } from '@/app/utils/imageUtils';

// Uses reliable external URLs
<Image src={WELLNESS_IMAGES.heroWellness} ... />
```

**Solution 3: Handle Errors**
```tsx
import { handleImageError } from '@/app/utils/imageUtils';

<Image 
    src="/images/local.png"
    onError={(e) => handleImageError(e, 'beach')}
/>
```

**Available Fallback Categories:**
- `hero`, `attraction`, `hospital`, `doctor`
- `spa`, `yoga`, `beach`, `auroville`, `french`

---

## 🎨 Color Palette

### Medical Mode
- Primary: `emerald-500` / `teal-600`
- Accent: `blue-600`

### Wellness Mode
- Primary: `amber-500` / `orange-500`
- Accent: `purple-600` / `pink-600`

### Common Gradients
```css
/* Hero gradient */
bg-gradient-to-r from-purple-900/80 via-pink-800/60 to-orange-700/40

/* Card gradient */
bg-gradient-to-br from-amber-50 to-orange-50

/* Text gradient */
text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500
```

---

## 🔧 Environment Variables

Create `.env.local`:
```env
# Site URL
SITE_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🧩 Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Header | `components/common/Header.tsx` | Navigation with mode switch |
| Footer | `components/common/Footer.tsx` | Site footer with links |
| EditableText | `components/admin/EditableText.tsx` | Inline text editing |
| LanguageSwitcher | In Header | Language selection dropdown |

---

## 🏃 Running Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:3001`

---

## � Admin Panel (Super Admin)

### Access
- **URL:** `http://localhost:3000/dashboard/admin`
- **Login:** `http://localhost:3000/login`

### Default Credentials
| Role | Email | Password |
|------|-------|----------|
| Super Admin | `admin@pondimeditour.com` | `admin123` |

### Features
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard/admin` | Stats overview, charts |
| Hospitals | `/dashboard/admin/hospitals` | Approve/reject hospitals |
| Inquiries | `/dashboard/admin/inquiries` | View all patient inquiries |
| Users | `/dashboard/admin/users` | Manage user accounts |
| Settings | `/dashboard/admin/settings` | Site configuration |

### Admin API Routes
```
GET  /api/admin/stats        # Dashboard statistics
GET  /api/admin/hospitals    # List all hospitals
PUT  /api/admin/hospitals/:id/approve
PUT  /api/admin/hospitals/:id/reject
GET  /api/admin/inquiries    # All inquiries
GET  /api/admin/settings     # Site settings
PUT  /api/admin/settings     # Update settings
```

---

## 🏥 Hospital Admin Panel

### Access
- **URL:** `http://localhost:3000/dashboard/hospital`
- **Login:** `http://localhost:3000/login`

### Default Credentials
| Hospital | Email | Password |
|----------|-------|----------|
| Demo Hospital | `hospital@demo.com` | `hospital123` |
| Manakula Vinayakar | `admin@mvhospital.com` | `mvh123` |

### Creating Hospital Credentials
Super Admin can create hospital credentials via:
1. Go to Admin Panel → Hospitals
2. Click "Create Credentials" on a hospital
3. Enter email and password
4. Hospital admin can now login

### Features
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard/hospital` | Hospital stats |
| Profile | `/dashboard/hospital/profile` | Edit hospital info |
| Packages | `/dashboard/hospital/packages` | Manage treatment packages |
| Inquiries | `/dashboard/hospital/inquiries` | View patient inquiries |
| Doctors | `/dashboard/hospital/doctors` | Manage doctor profiles |

### Hospital API Routes
```
GET  /api/hospitals/me           # Current hospital profile
PUT  /api/hospitals/me           # Update profile
GET  /api/hospitals/me/inquiries # Hospital's inquiries
GET  /api/hospitals/me/packages  # Hospital's packages
POST /api/hospitals/me/packages  # Create package
PUT  /api/hospitals/me/packages/:id
DELETE /api/hospitals/me/packages/:id
```

---

## 🗄️ Database Tables

### Core Tables
| Table | Purpose |
|-------|---------|
| `users` | All user accounts (admin, hospital, patient) |
| `hospitals` | Hospital profiles and details |
| `doctors` | Doctor profiles linked to hospitals |
| `packages` | Treatment packages by hospitals |
| `inquiries` | Patient inquiry submissions |
| `sessions` | Auth sessions (NextAuth) |

### User Roles
```sql
-- In users table
role: 'admin' | 'hospital' | 'patient'
```

### Hospital Status
```sql
-- In hospitals table  
status: 'pending' | 'approved' | 'rejected'
```

---

## �📝 Common Tasks

### Add a new attraction card
1. Add data to the attractions array in the page file
2. The map function will render it automatically

### Change navigation links
Edit `MEDICAL_NAV_LINKS` or `WELLNESS_NAV_LINKS` in `SiteModeContext.tsx`

### Add floating animations
Use the `FloatingElements` or `FloatingParticles` component patterns

### Create image carousel
Use state with thumbnail buttons (see Auroville page example)

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Check path starts with `/images/` for public folder |
| Animations not working | Ensure `"use client"` at top of file |
| Context errors | Wrap with providers in `layout.tsx` |
| Build errors | Run `npm run lint` to find issues |

---

## 📚 Documentation Links

- [Next.js App Router](https://nextjs.org/docs/app)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test locally
3. Commit with descriptive messages
4. Push and create pull request

---

**Happy Coding! 🚀**

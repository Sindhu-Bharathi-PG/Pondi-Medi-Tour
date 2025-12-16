# Cloudinary Setup for Doctor Profile Photos

## 1. Create a Cloudinary Account
1. Go to https://cloudinary.com and sign up for a free account
2. From your dashboard, note down your **Cloud Name**

## 2. Create Upload Preset
1. Go to Settings → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Set name as: `doctor_profiles`
5. Set Signing Mode to: **Unsigned**
6. Set folder to: `doctors` (optional)
7. Save

## 3. Add Environment Variable
Add to your `.env.local` file:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
```

## 4. Restart Dev Server
```bash
npm run dev
```

## Usage
The ImageUpload component now supports:
- ✅ Drag and drop images
- ✅ Click to browse files
- ✅ Image preview before upload
- ✅ Automatic URL storage in database
- ✅ Fallback manual URL input
- ✅ Delete uploaded image

The `imageUrl` field in the doctors table will automatically store the Cloudinary URL.

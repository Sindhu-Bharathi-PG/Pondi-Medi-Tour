# Quick Fix Guide - Inquiries Network Error

## 🐛 Problem Found

The frontend was calling `/api/inquiries` but the backend route was registered at `/api/hospitals/me/inquiries`.

## ✅ Fix Applied

Changed backend route registration in `server.js`:

**Before:**
```javascript
fastify.register(require('./modules/inquiries/routes/inquiryRoutes'), 
  { prefix: '/api/hospitals/me/inquiries' });
```

**After:**
```javascript
fastify.register(require('./modules/inquiries/routes/inquiryRoutes'), 
  { prefix: '/api/inquiries' });
```

## 🚀 Steps to Test

1. **Restart Backend:**
   ```bash
   cd backend
   # Stop current server (Ctrl+C if running)
   npm run dev
   ```

2. **Check Server Started:**
   - Look for: `Server listening on 3001`
   - Or visit: `http://localhost:3001/health`

3. **Test Inquiries Page:**
   - Go to: `http://localhost:3000/dashboard/hospital/inquiries`
   - Or: `http://localhost:3000/booking` (submit form)

4. **Verify Buttons Work:**
   - Mark as Responded ✅
   - Change Priority ✅
   - Close Inquiry ✅
   - Reply ✅

## 🔍 Debugging

### Check if Backend is Running:
```bash
# Windows
netstat -ano | findstr :3001

# If nothing shows, backend is NOT running
```

### Check Browser Console:
```javascript
// Should see successful API calls
fetch('http://localhost:3001/api/inquiries')
```

### Test API Directly:
```bash
# Should return JSON
curl http://localhost:3001/health
```

## ✅ Expected Behavior After Fix

1. **Page Loads:**
   - Shows real inquiries from database (or mock data if not auth)
   - No "Network error" alerts

2. **Mark as Responded:**
   - Click button → Status updates
   - No error alert
   - Timestamp appears

3. **Change Priority:**
   - Select from dropdown → Inquiry re-sorts
   - No error alert

4. **Console:**
   - No red errors
   - API calls show 200 status

## 🔧 If Still Not Working

1. **Backend Not Running:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Port 3001 Already in Use:**
   ```bash
   # Kill existing process
   # Then restart backend
   ```

3. **Check .env File:**
   ```
   PORT=3001
   DATABASE_URL=your_neon_url
   JWT_SECRET=your_secret
   ```

4. **Clear Browser Cache:**
   - Hard refresh: Ctrl+Shift+R
   - Or clear localStorage

## 📝 Summary

**Root Cause:** Route mismatch
**Solution:** Changed backend route prefix
**Action Required:** Restart backend server

After restart, all buttons should work! 🎉

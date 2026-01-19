# Quick Start Guide - Admin Panel Integration

## 🚀 Quick Start (5 Steps)

### 1. Start Your Backend
```powershell
# Open a new terminal
cd e:\Reactjs\eleckyoBackend
node server.js
```
**Expected Output:** Server running on port 5000 🚀

---

### 2. Start Your Admin Panel
```powershell
# Open another terminal
cd e:\Reactjs\adminelekyo
npm run dev
```
**Expected Output:** Admin panel running on http://localhost:5173

---

### 3. Login to Admin Panel
- Open browser: http://localhost:5173
- Use your existing user credentials from the ecommerce site
- Example: `admin@gmail.com` / `admin@123`

---

### 4. Test Features
✅ **Products Page** - Should show real products from your MongoDB
✅ **Search** - Type to filter products
✅ **Delete** - Click trash icon to delete a product

---

### 5. Check Backend Connection
Open browser console (F12) and check:
- No CORS errors
- API calls to `http://localhost:5000/api/*`
- Products loaded successfully

---

## ⚠️ Important Notes

1. **Admin Login** - Currently using regular user login. See INTEGRATION_GUIDE.md to add admin role verification.

2. **Already Created Users** - Login with any user from your ecommerce site database.

3. **API URL** - Currently set to `http://localhost:5000/api`. Change in `.env` if your backend runs elsewhere.

---

## 🔍 Troubleshooting

### Issue: "Failed to fetch products"
**Solution:** Make sure backend is running and MongoDB is connected

### Issue: "CORS error"
**Solution:** Check backend `cors()` configuration allows localhost:5173

### Issue: "Network Error on login"
**Solution:** Verify backend is running on port 5000

---

## 📁 What Was Created

✅ API configuration files
✅ Service layer (auth, products, orders, users)
✅ Updated login page with real authentication
✅ Updated products page with real data
✅ Environment variables setup
✅ Error handling and loading states

---

## 🎯 What's Next

See `INTEGRATION_GUIDE.md` for:
- Adding admin role verification
- Updating remaining pages (Orders, Users, Dashboard)
- Adding missing backend routes
- Deployment instructions

---

**Ready to test?** Start both servers and visit http://localhost:5173! 🎉

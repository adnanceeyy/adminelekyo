# Admin Panel Backend Integration Guide

## ✅ What's Been Done

### 1. **API Configuration**
- Created `src/config/api.config.js` - Central API configuration
- Added `.env` file for environment variables
- Installed `axios` for HTTP requests

### 2. **Service Layer Created**
- **`src/services/api.service.js`** - Base API service with interceptors
- **`src/services/auth.service.js`** - Admin authentication
- **`src/services/product.service.js`** - Product CRUD operations
- **`src/services/order.service.js`** - Order management

### 3. **Pages Updated**
- **Login Page** (`src/pages/logingpage.jsx`)
  - Now uses real backend authentication
  - Stores JWT token in localStorage
  
- **Products Page** (`src/pages/products.jsx`)
  - Fetches products from backend API
  - Displays loading/error states
  - Implements real-time search filtering
  - Delete functionality connected to backend
  - Shows real product images and data

---

## 🔧 What You Need To Do Next

### **Step 1: Start Your Backend Server**

```powershell
# Navigate to backend directory
cd e:\Reactjs\eleckyoBackend

# Start the backend server
npm start
# or
node server.js
```

Your backend should be running on `http://localhost:5000`

---

### **Step 2: Update Admin Panel API URL (If Backend is Deployed)**

If your backend is deployed (not localhost), update `.env`:

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

**Note:** For Render/Railway/other deployments, replace with your actual backend URL.

---

### **Step 3: Add Admin Login Route to Backend (IMPORTANT)**

Your backend currently doesn't have a dedicated admin login. You need to add an admin verification system:

#### Option A: Add Admin Role to User Model

Update `e:\Reactjs\eleckyoBackend\models\User.js`:

```javascript
const userSchema = new mongoose.Schema({
  // ... existing fields
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});
```

#### Option B: Create a Separate Admin Account

Manually set one user as admin in your MongoDB:

```javascript
// In MongoDB, update your user:
db.users.updateOne(
  { email: "admin@gmail.com" },
  { $set: { role: "admin" } }
)
```

Then update the login response to include role:

```javascript
// In userRoutes.js login route:
res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  profileImage: user.profileImage,
  role: user.role || 'user', // Add this
  token: generateToken(user._id),
});
```

---

### **Step 4: Update Remaining Admin Pages**

You still need to connect these pages to the backend:

#### **Orders Page** (`src/pages/orders.jsx`)
```javascript
import { useState, useEffect } from 'react';
import OrderService from '../services/order.service';

export default function Orders({ isDark, onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await OrderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // ... rest of your component
}
```

#### **Users Page** (`src/pages/users.jsx`)
Create `src/services/user.service.js`:

```javascript
import ApiService from './api.service';

const UserService = {
  getAllUsers: async () => {
    return await ApiService.get('/users'); // You'll need to add this route to backend
  },
  
  deleteUser: async (userId) => {
    return await ApiService.delete(`/users/${userId}`);
  },
};

export default UserService;
```

---

### **Step 5: Add Missing Backend Routes**

Your backend needs these additional routes:

#### **1. GET All Users** (for Users page)
In `routes/userRoutes.js`:

```javascript
// GET all users (admin only)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

#### **2. Update Order Status** (for Orders page)
In `routes/orders.js`:

```javascript
// PUT /api/orders/:id - Update order status
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

---

### **Step 6: Test the Integration**

1. **Start Backend**: `cd e:\Reactjs\eleckyoBackend && node server.js`
2. **Start Admin Panel**: `cd e:\Reactjs\adminelekyo && npm run dev`
3. **Login** with credentials from your database
4. **Test Products Page** - Should load real products from MongoDB
5. **Test Search** - Filter products by name/category
6. **Test Delete** - Delete a product and see it remove from DB

---

### **Step 7: Deploy (Optional)**

#### **Deploy Backend:**
- **Render/Railway**: Already deployed at your `CLIENT_URL`
- Make sure MongoDB connection works

#### **Deploy Admin Panel:**
- **Vercel/Netlify**:
  ```powershell
  cd e:\Reactjs\adminelekyo
  npm run build
  # Deploy the 'dist' folder
  ```
- Update `.env.production`:
  ```env
  REACT_APP_API_URL=https://your-backend.onrender.com/api
  ```

---

## 🔐 Security Recommendations

1. **Add Admin Verification**: Always check `user.role === 'admin'` on login
2. **Protect Routes**: Add middleware to verify admin token on all backend routes
3. **Environment Variables**: Never commit `.env` to git
4. **CORS Setup**: Make sure backend allows admin panel domain:

```javascript
// In server.js
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-admin-panel.vercel.app']
}));
```

---

## 📝 Quick Reference

### API Endpoints Your Backend Has:
- `GET /api/products` - Get all products
- `POST /api/products` - Add product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:email` - Get user orders
- `POST /api/users/login` - User login
- `POST /api/users` - Register user

### Environment Variables:
- `REACT_APP_API_URL` - Your backend API URL

### localStorage Keys:
- `adminToken` - JWT authentication token
- `adminUser` - User data (name, email, etc.)

---

## 🎯 Next Steps

1. ✅ Start backend server
2. ✅ Test login with existing user
3. ✅ Verify products page loads data
4. ⬜ Update remaining pages (Orders, Users, Dashboard)
5. ⬜ Add admin role verification
6. ⬜ Test all CRUD operations
7. ⬜ Deploy to production

---

## 🐛 Common Issues

### "Network Error" on Login:
- Check backend is running on port 5000
- Verify CORS is configured
- Check `.env` has correct API_URL

### "Unauthorized" Error:
- Token expired or invalid
- Clear localStorage and login again
- Check backend JWT_SECRET matches

### Products Not Loading:
- Check backend has products in MongoDB
- Verify `/api/products` route works
- Check browser console for errors

---

## 💡 Tips

1. **Use MongoDB Compass** to view/edit data directly
2. **Use Postman** to test API endpoints
3. **Check Browser DevTools** → Network tab for API calls
4. **Use console.log** in services to debug API responses

---

Need help? Check the console logs in both frontend and backend!

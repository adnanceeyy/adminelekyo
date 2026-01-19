# Admin Panel Architecture

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN PANEL (React)                      │
│                  http://localhost:5173                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests (axios)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     API SERVICES LAYER                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ AuthService  │  │ProductService│  │ OrderService │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ UserService  │  │ ApiService   │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ JWT Token in Headers
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND API (Express)                     │
│                  http://localhost:5000                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Routes:                                              │  │
│  │  • POST   /api/users/login                           │  │
│  │  • GET    /api/products                              │  │
│  │  • POST   /api/products      (admin)                 │  │
│  │  • PUT    /api/products/:id  (admin)                 │  │
│  │  • DELETE /api/products/:id  (admin)                 │  │
│  │  • GET    /api/orders                                │  │
│  │  • POST   /api/orders                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ MongoDB Driver
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                         │
│               mongodb+srv://cluster0.bhqd05z               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Products   │  │    Orders    │  │    Users     │     │
│  │ Collection   │  │  Collection  │  │  Collection  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
1. User enters credentials in Login Page
                ↓
2. AuthService.login() sends POST to /api/users/login
                ↓
3. Backend validates credentials
                ↓
4. Backend returns JWT token + user data
                ↓
5. Admin Panel stores token in localStorage
                ↓
6. All future API calls include token in Authorization header
                ↓
7. Backend verifies token with verifyAdmin middleware
                ↓
8. Backend processes request if token valid
```

---

## 📂 File Structure

```
adminelekyo/
├── src/
│   ├── config/
│   │   └── api.config.js          # API base URL config
│   ├── services/
│   │   ├── api.service.js         # Base HTTP client
│   │   ├── auth.service.js        # Login/logout
│   │   ├── product.service.js     # Product CRUD
│   │   ├── order.service.js       # Order management
│   │   └── user.service.js        # User management
│   ├── pages/
│   │   ├── logingpage.jsx         # ✅ Connected to backend
│   │   ├── products.jsx           # ✅ Connected to backend
│   │   ├── orders.jsx             # ⬜ Needs connection
│   │   ├── users.jsx              # ⬜ Needs connection
│   │   └── dashboard.jsx          # ⬜ Needs connection
│   └── ...
├── .env                            # Environment variables
├── INTEGRATION_GUIDE.md            # Full integration guide
├── QUICKSTART.md                   # Quick start guide
└── ARCHITECTURE.md                 # This file
```

---

## 🔄 Data Flow Example: Loading Products

```
1. Products Page mounted
        ↓
2. useEffect() calls fetchProducts()
        ↓
3. ProductService.getAllProducts()
        ↓
4. ApiService.get('/products')
        ↓
5. Axios adds JWT token from localStorage
        ↓
6. GET http://localhost:5000/api/products
        ↓
7. Backend queries MongoDB: Product.find({})
        ↓
8. MongoDB returns product documents
        ↓
9. Backend sends JSON response
        ↓
10. Products Page updates state with data
        ↓
11. UI renders product table
```

---

## 🛠️ Technology Stack

### Frontend (Admin Panel)
- **Framework:** React 19 + Vite
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Icons:** Tabler Icons React

### Backend API
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **CORS:** cors middleware

### Database
- **Type:** MongoDB Atlas (Cloud)
- **Collections:** Users, Products, Orders, Carts

---

## 🔒 Security Features

1. **JWT Authentication**
   - Token stored in localStorage
   - Included in Authorization header
   - Verified on backend for admin routes

2. **Password Hashing**
   - bcrypt with salt rounds
   - Passwords never stored in plain text

3. **CORS Protection**
   - Only allowed origins can access API
   - Configure in backend server.js

4. **Admin Middleware**
   - verifyAdmin() checks user role
   - Protects sensitive routes

---

## 📡 API Service Layer Benefits

### Why use services?

✅ **Centralized API Logic** - All API calls in one place
✅ **Token Management** - Automatic token injection
✅ **Error Handling** - Global error interceptors
✅ **Code Reusability** - DRY principle
✅ **Easy Testing** - Mock services in tests
✅ **Type Safety** - Clear function signatures

### Example Usage:

```javascript
// Before (without services)
const response = await fetch('http://localhost:5000/api/products', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
  }
});
const data = await response.json();

// After (with services)
const data = await ProductService.getAllProducts();
```

---

## 🎯 Integration Status

| Component | Status | Notes |
|-----------|--------|-------|
| API Config | ✅ Complete | Base URL configured |
| API Services | ✅ Complete | All services created |
| Login Page | ✅ Connected | Using AuthService |
| Products Page | ✅ Connected | Full CRUD operations |
| Orders Page | ⬜ Pending | Need to connect OrderService |
| Users Page | ⬜ Pending | Need to connect UserService |
| Dashboard | ⬜ Pending | Need to aggregate data |
| Settings | ⬜ Pending | No backend needed yet |

---

## 🚀 Next Implementation Steps

1. **Update Orders Page**
   - Import OrderService
   - Fetch orders on mount
   - Add status update functionality

2. **Update Users Page**
   - Add GET /api/users route to backend
   - Import UserService
   - Display user list with actions

3. **Update Dashboard**
   - Aggregate stats from all services
   - Show total products, orders, users
   - Display charts/graphs

4. **Add Admin Role Verification**
   - Update User model with role field
   - Check role on login
   - Restrict access based on role

---

For detailed implementation instructions, see `INTEGRATION_GUIDE.md`

# 🚀 Wearify - Complete Commands Reference

**Quick reference for all commands, setup, and workflows**

---

## 📋 Important Paths

```
Project Root: C:\Users\YOGESH\OneDrive\Desktop\Wearify
Database: wearify_db (MySQL)
Port: 8080
```

---

## 🔧 Maven Commands (PowerShell)

### **Run Application**
```powershell
.\mvnw.cmd spring-boot:run
```

### **Clean Build**
```powershell
.\mvnw.cmd clean install
```

### **Clean + Run**
```powershell
.\mvnw.cmd clean spring-boot:run
```

### **Stop Application**
```
Ctrl + C (in terminal)
```

---

## 🗄️ MySQL Commands

### **Login to MySQL**
```powershell
mysql -u root -p
# Password: root
```

### **Database Operations**
```sql
-- Create database
CREATE DATABASE wearify_db;

-- Use database
USE wearify_db;

-- Show all tables
SHOW TABLES;

-- View products
SELECT * FROM products;

-- View orders
SELECT * FROM orders;

-- View users
SELECT * FROM users;

-- View addresses
SELECT * FROM addresses;
```

### **Run SQL Script**
```powershell
# Option 1: MySQL Workbench
File → Open SQL Script → Execute

# Option 2: Command Line
mysql -u root -p wearify_db < "C:\Users\YOGESH\OneDrive\Desktop\Wearify\script.sql"
```

---

## 🌐 Important URLs

### **Frontend Pages**
```
Homepage:         http://localhost:8080/
Login:            http://localhost:8080/login
Checkout:         http://localhost:8080/checkout
Men's:            http://localhost:8080/mens
Women's:          http://localhost:8080/womens
Accessories:      http://localhost:8080/accessories
Shoes:            http://localhost:8080/shoes
About:            http://localhost:8080/about
```

### **Admin Panel**
```
Dashboard:        http://localhost:8080/admin
Products:         http://localhost:8080/admin/products
Orders:           http://localhost:8080/admin/orders
Users:            http://localhost:8080/admin/users
Add Product:      http://localhost:8080/admin/products/add
```

### **API Endpoints**
```
All Products:     http://localhost:8080/api/products
Product by ID:    http://localhost:8080/api/products/{id}
Register User:    http://localhost:8080/api/users/register
User by Email:    http://localhost:8080/api/users/email/{email}
Place Order:      http://localhost:8080/api/orders/place
```

---

## 📁 Important Files

### **Backend (Java)**
```
Controllers:
- HomeController.java       (Frontend routes)
- AdminController.java       (Admin CRUD operations)
- ProductController.java     (Product API)
- UserController.java        (User API)
- OrderController.java       (Order API)
- CartController.java        (Cart API)

Models:
- Product.java
- User.java
- Order.java
- Cart.java
- Address.java

Repositories:
- ProductRepository.java
- UserRepository.java
- OrderRepository.java
- CartRepository.java
- AddressRepository.java
```

### **Frontend (HTML/JS/CSS)**
```
Templates:
- index.html          (Homepage)
- login.html          (Login/Register)
- checkout.html       (Checkout page)

Static Files:
- styles.css          (Main styles)
- script.js           (Main JavaScript)
- auth.js             (Login/Register logic)
- navbar-auth.js      (User tooltip & navbar)
```

### **Configuration**
```
- application.properties    (Database config)
- pom.xml                  (Dependencies)
```

---

## 🔐 Login Credentials

### **Guest User (Testing)**
```
Email:    guest@wearify.com
Password: (any - not validated currently)
```

### **Create New User**
```
1. Go to: http://localhost:8080/login
2. Click "Register" tab
3. Fill details
4. Click "Create Account"
```

---

## 🛠️ Setup Commands (First Time)

### **1. Create Database**
```sql
CREATE DATABASE wearify_db;
```

### **2. Create Guest User (SQL)**
```sql
USE wearify_db;

INSERT IGNORE INTO users (id, name, email, phone) 
VALUES (1, 'Guest User', 'guest@wearify.com', '9999999999');

INSERT IGNORE INTO addresses (id, street, city, state, zip_code, user_id) 
VALUES (1, '123 Main Street', 'Mumbai', 'MAHARASHTRA', '400001', 1);
```

### **3. Add Sample Products**
```sql
-- Run: insert_sample_products.sql
-- Location: C:\Users\YOGESH\OneDrive\Desktop\Wearify\insert_sample_products.sql
```

### **4. Start Application**
```powershell
.\mvnw.cmd spring-boot:run
```

---

## 🐛 Troubleshooting

### **Port Already in Use**
```powershell
# Find process on port 8080
netstat -ano | findstr :8080

# Kill process by PID
taskkill /PID <PID> /F
```

### **Application Won't Start**
```powershell
# Clean and rebuild
.\mvnw.cmd clean install

# Then run
.\mvnw.cmd spring-boot:run
```

### **Database Connection Error**
```
Check:
1. MySQL is running
2. Database 'wearify_db' exists
3. Username/password in application.properties
   - spring.datasource.username=root
   - spring.datasource.password=root
```

### **Changes Not Reflecting**
```
1. Stop application (Ctrl + C)
2. Clean build: .\mvnw.cmd clean install
3. Restart: .\mvnw.cmd spring-boot:run
4. Hard refresh browser: Ctrl + F5
```

---

## 📦 Key Features Implemented

✅ **Backend Integration** - PetStore structure
✅ **Admin Panel** - Products, Orders, Users (CRUD)
✅ **Login System** - Register, Login, Logout
✅ **Password Toggle** - Show/hide on login & register
✅ **User Tooltip** - Stylish gradient tooltip on hover
✅ **Cart Protection** - Login required before adding
✅ **Dynamic Products** - Loaded from database API
✅ **Order Placement** - Frontend → Database integration

---

## 🎨 Design Elements

**Colors:**
```
Primary Gradient: #667eea → #764ba2
Theme: Modern, Premium, Professional
Fonts: Playfair Display (headings), Inter (body)
```

**Animations:**
```
Tooltip fade: 0.5s smooth
Button hover: 0.3s ease
Transitions: All smooth
```

---

## 📝 Next Steps (Future Development)

- [ ] Password validation (backend)
- [ ] Email verification
- [ ] Forgot password functionality
- [ ] User profile page
- [ ] Order history page
- [ ] Payment gateway integration
- [ ] Admin authentication
- [ ] Image upload for products
- [ ] Search functionality
- [ ] Product filters & sorting

---

## 💡 Quick Tips

1. **Always start MySQL** before running app
2. **Use Ctrl + F5** for hard refresh after changes
3. **Check console** for API errors
4. **Admin panel** needs no authentication (add later)
5. **localStorage** stores user session (clear if needed)
6. **Guest user** already exists for testing

---

## 📞 Important Notes

**Database:**
- Auto-creates tables on first run (Hibernate)
- Sample data via SQL scripts
- Guest user ID: 1, Address ID: 1

**Frontend:**
- Products load from `/api/products`
- Cart stored in localStorage
- Orders created via API on checkout

**Session:**
- localStorage key: `wearify-user`
- No expiry (manual logout required)
- Clear: `localStorage.removeItem('wearify-user')`

---

**🎯 Ready to go! All commands documented for next time!** ✨

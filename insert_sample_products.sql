-- Sample Products for Wearify Database
-- Run this in MySQL Workbench to add real products

USE wearify_db;

-- Insert Men's Products
INSERT INTO products (name, description, price, category, image_url, stock, brand) VALUES
('Classic White Shirt', 'Premium cotton formal shirt for professionals', 1299.99, 'MENS', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', 50, 'Wearify'),
('Slim Fit Jeans', 'Comfortable denim jeans with modern fit', 1899.99, 'MENS', 'https://images.unsplash.com/photo-1542272454315-7bf6fbc7ed0a?w=400', 40, 'Wearify'),
('Leather Jacket', 'Premium leather jacket for winters', 4999.99, 'MENS', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 25, 'Wearify'),
('Formal Blazer', 'Elegant blazer for formal occasions', 3499.99, 'MENS', 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400', 30, 'Wearify'),
('Casual T-Shirt', 'Comfortable cotton t-shirt for daily wear', 499.99, 'MENS', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 100, 'Wearify'),
('Chino Pants','Smart casual chinos for versatile styling', 1599.99, 'MENS', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w= 400', 60, 'Wearify');

-- Insert Women's Products
INSERT INTO products (name, description, price, category, image_url, stock, brand) VALUES
('Floral Dress', 'Beautiful floral pattern summer dress', 2299.99, 'WOMENS', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', 35, 'Wearify'),
('Silk Saree', 'Traditional silk saree with modern touch', 5999.99, 'WOMENS', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400', 20, 'Wearify'),
('Designer Kurti', 'Ethnic kurti with contemporary design', 1499.99, 'WOMENS', 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400', 45, 'Wearify'),
('Evening Gown', 'Elegant evening gown for special occasions', 6999.99, 'WOMENS', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400', 15, 'Wearify'),
('Casual Top', 'Comfortable top for everyday wear', 799.99, 'WOMENS', 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400', 70, 'Wearify'),
('Palazzo Pants', 'Trendy palazzo pants with comfort fit', 1299.99, 'WOMENS', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', 50, 'Wearify');

-- Insert Accessories
INSERT INTO products (name, description, price, category, image_url, stock, brand) VALUES
('Leather Wallet', 'Genuine leather wallet with multiple compartments', 899.99, 'ACCESSORIES', 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', 80, 'Wearify'),
('Designer Sunglasses', 'UV protected stylish sunglasses', 1499.99, 'ACCESSORIES', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400', 60, 'Wearify'),
('Smart Watch', 'Fitness tracking smartwatch', 3999.99, 'ACCESSORIES', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', 40, 'Wearify'),
('Designer Belt', 'Premium leather belt with metal buckle', 699.99, 'ACCESSORIES', 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400', 90, 'Wearify'),
('Handbag', 'Elegant handbag for women', 2499.99, 'ACCESSORIES', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', 35, 'Wearify'),
('Backpack', 'Spacious laptop backpack', 1799.99, 'ACCESSORIES', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 55, 'Wearify');

-- Insert Shoes
INSERT INTO products (name, description, price, category, image_url, stock, brand) VALUES
('Formal Shoes', 'Classic formal leather shoes', 2799.99, 'SHOES', 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400', 45, 'Wearify'),
('Sport Sneakers', 'Comfortable running sneakers', 2299.99, 'SHOES', 'https://images.unsplash. com/photo-1542291026-7eec264c27ff?w=400', 60, 'Wearify'),
('Casual Loafers', 'Comfortable loafers for daily use', 1899.99, 'SHOES', 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400', 50, 'Wearify'),
('High Heels', 'Elegant high heel sandals for women', 2499.99, 'SHOES', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', 30, 'Wearify'),
('Boots', 'Stylish ankle boots', 3299.99, 'SHOES', 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', 25, 'Wearify'),
('Sandals', 'Comfortable summer sandals', 999.99, 'SHOES', 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400', 70, 'Wearify');

-- Verify data
SELECT category, COUNT(*) as product_count FROM products GROUP BY category;
SELECT * FROM products LIMIT 5;

-- Create default guest user and address for orders
-- Run this script in MySQL Workbench

USE wearify_db;

-- First check if guest user exists
INSERT IGNORE INTO users (id, name, email, phone) 
VALUES (1, 'Guest User', 'guest@wearify.com', '9999999999');

-- Create default address for guest user
INSERT IGNORE INTO addresses (id, street, city, state, zip_code, user_id) 
VALUES (1, '123 Main Street', 'Mumbai', 'MAHARASHTRA', '400001', 1);

-- Verify data
SELECT * FROM users WHERE id = 1;
SELECT * FROM addresses WHERE id = 1;

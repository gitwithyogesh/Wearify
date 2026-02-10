-- Update existing products with original beautiful images
-- Run this in MySQL Workbench

USE wearify_db;

-- Update Men's Products with original images
UPDATE products SET image_url = 'https://images-static.nykaa.com/media/catalog/product/f/3/f30a4aeIB-DJ-04-3_NavyBlue_2.jpg?tr=w-500' WHERE id = 1 AND name = 'Classic White Shirt';
UPDATE products SET image_url = 'https://imagescdn.jaypore.com/img/app/product/3/39605494-12242801.jpg?w=500&auto=format', name = 'Casual Cotton Shirt' WHERE id = 5 AND name = 'Casual T-Shirt';
UPDATE products SET image_url = 'https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2024/NOVEMBER/27/aokKFNeK_554582fb48c240be84619fd34d53b462.jpg', name = 'Wool Blend Coat' WHERE id = 3 AND name = 'Leather Jacket';
UPDATE products SET image_url = 'https://images-static.nykaa.com/media/catalog/product/f/3/f30a4aeIB-DJ-04-3_NavyBlue_2.jpg?tr=w-500', name = 'Classic Denim Jacket' WHERE id = 2 AND name = 'Slim Fit Jeans';

-- Update Women's Products with original images
UPDATE products SET image_url = 'https://www.newyorkdress.com/cdn/shop/products/Ladivine-J871_silver_2_1200x.jpg?v=1757962020', name = 'Elegant Evening Dress' WHERE id = 10 AND name = 'Evening Gown';
UPDATE products SET image_url = 'https://images.edressit.com/ProductImages/420x633/201909/7967f640-6121-4946-a17b-102444b09f2c.jpg', name = 'Floral Summer Dress' WHERE id = 7 AND name = 'Floral Dress';
UPDATE products SET image_url = 'https://jusblouses.com/cdn/shop/files/VAI01940-Edit.jpg?v=1724671415&width=1000', name = 'Silk Blouse' WHERE id = 11 AND name = 'Casual Top';

-- Update Accessories with original images
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/61War56T+OL._AC_SX522_.jpg', name = 'Leather Crossbody Bag' WHERE id = 17 AND name = 'Handbag';
UPDATE products SET image_url = 'https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2025/SEPTEMBER/12/rvxO1D7w_d10fe9cb5ddd46fba6882a95dfcd7499.jpg' WHERE id = 14 AND name = 'Designer Sunglasses';
UPDATE products SET image_url = 'https://www.kanewatches.com/cdn/shop/products/1000x1500-03-gold-club-vintage-brown-kane-watches-pocket_750x.jpg' WHERE id = 15 AND name = 'Smart Watch';

-- Update Shoes with original images
UPDATE products SET image_url = 'https://stylestryproductionwls47sou4z.cdn.e2enetworks.net/images/products/medium/541de81e1fe08b4acae8e6798df5e7080e4c9dae.webp', name = 'Premium Sneakers' WHERE id = 20 AND name = 'Sport Sneakers';
UPDATE products SET image_url = 'https://cdn.shopify.com/s/files/1/0471/9584/8869/files/FST_FOSMF-2091_BLACK-MODEL1_498ca6fa-1561-4c59-b6aa-3fbc3b39570e_255x.jpg?v=1768043723', name = 'Oxford Business Shoes' WHERE id = 19 AND name = 'Formal Shoes';
UPDATE products SET image_url = 'https://assets.ajio.com/medias/sys_master/root1/20250902/tIhI/68b6fd853d468c61abb85a79/-473Wx593H-701869973-grey-MODEL.jpg', name = 'Running Shoes' WHERE id = 21 AND name = 'Casual Loafers';
UPDATE products SET image_url = 'https://img.drz.lazcdn.com/g/kf/Sffa53dffdf5d451e9b75c82400ed801bW.jpg_960x960q80.jpg_.webp', name = '7-inch High Heel' WHERE id = 22 AND name = 'High Heels';

-- Verify changes
SELECT id, name, LEFT(image_url, 50) as image_preview, category FROM products ORDER BY id;

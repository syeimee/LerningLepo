-- ===========================================
-- V10__insert_test_data.sql
-- テストデータ（10件ずつ）を各テーブルに挿入
-- ===========================================

-- ================================
-- テストデータ初期化のためのTRUNCATE
-- ================================

-- 外部キー制約を一時的に無効化（順番によるエラー防止）
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE reviews;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE cart_items;
TRUNCATE TABLE carts;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
TRUNCATE TABLE producers;
TRUNCATE TABLE users;
TRUNCATE TABLE view_histories;

-- 外部キー制約を再び有効にする
SET FOREIGN_KEY_CHECKS = 1;

-- ====================
-- users（ユーザー）
-- ====================
INSERT INTO users (email, password, name, address, phone_number, created_at, updated_at)
VALUES 
('alice@example.com', 'password1', 'Alice', '123 Main St', '09011110001', NOW(), NOW()),
('bob@example.com', 'password2', 'Bob', '456 Park Ave', '09011110002', NOW(), NOW()),
('carol@example.com', 'password3', 'Carol', '789 River Rd', '09011110003', NOW(), NOW()),
('dave@example.com', 'password4', 'Dave', '321 Ocean Blvd', '09011110004', NOW(), NOW()),
('emma@example.com', 'password5', 'Emma', '654 Maple Dr', '09011110005', NOW(), NOW()),
('frank@example.com', 'password6', 'Frank', '987 Oak St', '09011110006', NOW(), NOW()),
('grace@example.com', 'password7', 'Grace', '135 Pine Ln', '09011110007', NOW(), NOW()),
('hank@example.com', 'password8', 'Hank', '246 Cedar Ct', '09011110008', NOW(), NOW()),
('ivy@example.com', 'password9', 'Ivy', '357 Birch Rd', '09011110009', NOW(), NOW()),
('john@example.com', 'password10', 'John', '468 Walnut Way', '09011110010', NOW(), NOW());

-- ====================
-- categories（商品カテゴリ）
-- ====================
INSERT INTO categories (name, created_at, updated_at)
VALUES 
('Fruits', NOW(), NOW()),
('Vegetables', NOW(), NOW()),
('Dairy', NOW(), NOW()),
('Meat', NOW(), NOW()),
('Grains', NOW(), NOW()),
('Beverages', NOW(), NOW()),
('Snacks', NOW(), NOW()),
('Seafood', NOW(), NOW()),
('Bakery', NOW(), NOW()),
('Frozen Foods', NOW(), NOW());

-- ====================
-- producers（生産者）
-- ====================
INSERT INTO producers (name, description, location, created_at, updated_at)
VALUES 
('Green Farm', 'Organic farm in Nagano', 'Nagano', NOW(), NOW()),
('Fresh Fields', 'Local farmer in Hokkaido', 'Hokkaido', NOW(), NOW()),
('Ocean Harvest', 'Seafood supplier', 'Aomori', NOW(), NOW()),
('Golden Cow', 'Dairy producer', 'Shizuoka', NOW(), NOW()),
('Sunny Eggs', 'Egg farm', 'Chiba', NOW(), NOW()),
('Sweet Valley', 'Fruit orchard', 'Yamanashi', NOW(), NOW()),
('Happy Veggies', 'Vegetable farm', 'Kyoto', NOW(), NOW()),
('WheatWorks', 'Grain producer', 'Tochigi', NOW(), NOW()),
('BakeHouse', 'Bakery supplier', 'Tokyo', NOW(), NOW()),
('Frozen Delight', 'Frozen foods manufacturer', 'Osaka', NOW(), NOW());

-- ====================
-- products（商品）
-- ====================
INSERT INTO products (name, description, price, stock_quantity, category_id, producer_id, created_at, updated_at)
VALUES 
('Apple', 'Red apple from Aomori', 150.00, 100, 1, 1, NOW(), NOW()),
('Carrot', 'Sweet carrot', 80.00, 200, 2, 2, NOW(), NOW()),
('Milk', 'Fresh milk', 200.00, 150, 3, 4, NOW(), NOW()),
('Beef', 'Premium wagyu', 1500.00, 50, 4, 4, NOW(), NOW()),
('Rice', 'Koshihikari rice', 3000.00, 80, 5, 8, NOW(), NOW()),
('Juice', 'Apple juice 1L', 250.00, 90, 6, 1, NOW(), NOW()),
('Chips', 'Potato chips (salt)', 120.00, 120, 7, 6, NOW(), NOW()),
('Salmon', 'Hokkaido salmon fillet', 700.00, 60, 8, 3, NOW(), NOW()),
('Bread', 'Freshly baked bread', 180.00, 130, 9, 9, NOW(), NOW()),
('Frozen Dumplings', 'Pork gyoza (12pc)', 400.00, 110, 10, 10, NOW(), NOW());

-- ====================
-- carts（カート）
-- ====================
INSERT INTO carts (user_id, created_at, updated_at)
VALUES 
(1, NOW(), NOW()),
(2, NOW(), NOW()),
(3, NOW(), NOW()),
(4, NOW(), NOW()),
(5, NOW(), NOW()),
(6, NOW(), NOW()),
(7, NOW(), NOW()),
(8, NOW(), NOW()),
(9, NOW(), NOW()),
(10, NOW(), NOW());

-- ====================
-- cart_items（カート内の商品）
-- ====================
INSERT INTO cart_items (cart_id, product_id, quantity, created_at, updated_at)
VALUES 
(1, 1, 2, NOW(), NOW()),
(2, 2, 5, NOW(), NOW()),
(3, 3, 1, NOW(), NOW()),
(4, 4, 3, NOW(), NOW()),
(5, 5, 2, NOW(), NOW()),
(6, 6, 4, NOW(), NOW()),
(7, 7, 2, NOW(), NOW()),
(8, 8, 1, NOW(), NOW()),
(9, 9, 3, NOW(), NOW()),
(10, 10, 2, NOW(), NOW());

-- ====================
-- orders（注文）
-- ====================
INSERT INTO orders (user_id, cart_id, status, price, created_at, updated_at)
VALUES 
(1, 1, 'shipped', 300.00, NOW(), NOW()),
(2, 2, 'processing', 400.00, NOW(), NOW()),
(3, 3, 'delivered', 200.00, NOW(), NOW()),
(4, 4, 'shipped', 4500.00, NOW(), NOW()),
(5, 5, 'cancelled', 6000.00, NOW(), NOW()),
(6, 6, 'processing', 1000.00, NOW(), NOW()),
(7, 7, 'delivered', 240.00, NOW(), NOW()),
(8, 8, 'shipped', 700.00, NOW(), NOW()),
(9, 9, 'delivered', 540.00, NOW(), NOW()),
(10, 10, 'processing', 800.00, NOW(), NOW());

-- ====================
-- order_items（注文内の商品）
-- ====================
INSERT INTO order_items (order_id, product_id, quantity, price, created_at, updated_at)
VALUES 
(1, 1, 2, 150.00, NOW(), NOW()),
(2, 2, 5, 80.00, NOW(), NOW()),
(3, 3, 1, 200.00, NOW(), NOW()),
(4, 4, 3, 1500.00, NOW(), NOW()),
(5, 5, 2, 3000.00, NOW(), NOW()),
(6, 6, 4, 250.00, NOW(), NOW()),
(7, 7, 2, 120.00, NOW(), NOW()),
(8, 8, 1, 700.00, NOW(), NOW()),
(9, 9, 3, 180.00, NOW(), NOW()),
(10, 10, 2, 400.00, NOW(), NOW());

-- ====================
-- reviews（レビュー）
-- ====================
INSERT INTO reviews (product_id, user_id, rating, comment, created_at, updated_at)
VALUES 
(1, 1, 5, 'Amazing apples!', NOW(), NOW()),
(2, 2, 4, 'Fresh and crunchy.', NOW(), NOW()),
(3, 3, 3, 'Okay milk.', NOW(), NOW()),
(4, 4, 5, 'Top-quality beef!', NOW(), NOW()),
(5, 5, 4, 'Tasty rice.', NOW(), NOW()),
(6, 6, 2, 'Too sweet.', NOW(), NOW()),
(7, 7, 5, 'Perfect snack!', NOW(), NOW()),
(8, 8, 4, 'Delicious salmon.', NOW(), NOW()),
(9, 9, 3, 'Bread was okay.', NOW(), NOW()),
(10, 10, 4, 'Loved the dumplings.', NOW(), NOW());

-- ====================
-- view_histories（閲覧履歴）
-- ====================
INSERT INTO view_histories (user_id, product_id, viewed_at, created_at, updated_at)
VALUES
(1, 1, NOW() - INTERVAL 1 DAY, NOW(), NOW()),
(2, 2, NOW() - INTERVAL 2 DAY, NOW(), NOW()),
(3, 3, NOW() - INTERVAL 3 DAY, NOW(), NOW()),
(4, 4, NOW() - INTERVAL 4 DAY, NOW(), NOW()),
(5, 5, NOW() - INTERVAL 5 DAY, NOW(), NOW()),
(6, 6, NOW() - INTERVAL 6 DAY, NOW(), NOW()),
(7, 7, NOW() - INTERVAL 7 DAY, NOW(), NOW()),
(8, 8, NOW() - INTERVAL 8 DAY, NOW(), NOW()),
(9, 9, NOW() - INTERVAL 9 DAY, NOW(), NOW()),
(10, 10, NOW() - INTERVAL 10 DAY, NOW(), NOW());
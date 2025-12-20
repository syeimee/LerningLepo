-- ============================================================
-- 仮データ投入SQL
-- ============================================================

-- ============================================================
-- システムユーザー（最初に作成）
-- ============================================================

-- システムユーザー（他のデータのcreated_by/updated_byで参照されるため最初に作成）
INSERT INTO USER (user_id, password, user_role, permissions, disabled, created_by, updated_by) VALUES
('system', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 0, 'ALL', 0, 'system', 'system');

-- ============================================================
-- マスタデータ
-- ============================================================

-- 都道府県マスタ
INSERT INTO PREFECTURE (prefecture_code, name, disabled, created_by, updated_by) VALUES
('01', '北海道', 0, 'system', 'system'),
('02', '青森県', 0, 'system', 'system'),
('03', '岩手県', 0, 'system', 'system'),
('04', '宮城県', 0, 'system', 'system'),
('05', '秋田県', 0, 'system', 'system'),
('06', '山形県', 0, 'system', 'system'),
('07', '福島県', 0, 'system', 'system'),
('08', '茨城県', 0, 'system', 'system'),
('09', '栃木県', 0, 'system', 'system'),
('10', '群馬県', 0, 'system', 'system'),
('11', '埼玉県', 0, 'system', 'system'),
('12', '千葉県', 0, 'system', 'system'),
('13', '東京都', 0, 'system', 'system'),
('14', '神奈川県', 0, 'system', 'system'),
('15', '新潟県', 0, 'system', 'system'),
('16', '富山県', 0, 'system', 'system'),
('17', '石川県', 0, 'system', 'system'),
('18', '福井県', 0, 'system', 'system'),
('19', '山梨県', 0, 'system', 'system'),
('20', '長野県', 0, 'system', 'system'),
('21', '岐阜県', 0, 'system', 'system'),
('22', '静岡県', 0, 'system', 'system'),
('23', '愛知県', 0, 'system', 'system'),
('24', '三重県', 0, 'system', 'system'),
('25', '滋賀県', 0, 'system', 'system'),
('26', '京都府', 0, 'system', 'system'),
('27', '大阪府', 0, 'system', 'system'),
('28', '兵庫県', 0, 'system', 'system'),
('29', '奈良県', 0, 'system', 'system'),
('30', '和歌山県', 0, 'system', 'system'),
('31', '鳥取県', 0, 'system', 'system'),
('32', '島根県', 0, 'system', 'system'),
('33', '岡山県', 0, 'system', 'system'),
('34', '広島県', 0, 'system', 'system'),
('35', '山口県', 0, 'system', 'system'),
('36', '徳島県', 0, 'system', 'system'),
('37', '香川県', 0, 'system', 'system'),
('38', '愛媛県', 0, 'system', 'system'),
('39', '高知県', 0, 'system', 'system'),
('40', '福岡県', 0, 'system', 'system'),
('41', '佐賀県', 0, 'system', 'system'),
('42', '長崎県', 0, 'system', 'system'),
('43', '熊本県', 0, 'system', 'system'),
('44', '大分県', 0, 'system', 'system'),
('45', '宮崎県', 0, 'system', 'system'),
('46', '鹿児島県', 0, 'system', 'system'),
('47', '沖縄県', 0, 'system', 'system');

-- 所在地マスタ
INSERT INTO AREA (area_kbn, name, disabled, created_by, updated_by) VALUES
('HOKKAIDO', '北海道', 0, 'system', 'system'),
('TOHOKU', '東北', 0, 'system', 'system'),
('KANTO', '関東', 0, 'system', 'system'),
('CHUBU', '中部', 0, 'system', 'system'),
('KINKI', '近畿', 0, 'system', 'system'),
('CHUGOKU', '中国', 0, 'system', 'system'),
('SHIKOKU', '四国', 0, 'system', 'system'),
('KYUSHU', '九州', 0, 'system', 'system'),
('OKINAWA', '沖縄', 0, 'system', 'system');

-- カテゴリマスタ
INSERT INTO CATEGORY (category_id, name, disabled, created_by, updated_by) VALUES
('CAT001', '野菜', 0, 'system', 'system'),
('CAT002', '果物', 0, 'system', 'system'),
('CAT003', 'お米', 0, 'system', 'system'),
('CAT004', '肉類', 0, 'system', 'system'),
('CAT005', '乳製品', 0, 'system', 'system'),
('CAT006', '加工品', 0, 'system', 'system'),
('CAT007', '魚介類', 0, 'system', 'system'),
('CAT008', 'その他', 0, 'system', 'system');

-- ============================================================
-- ユーザーデータ
-- ============================================================

-- 一般ユーザー
INSERT INTO USER (user_id, password, user_role, permissions, disabled, created_by, updated_by) VALUES
('user001', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1, 'READ,WRITE', 0, 'system', 'system'),
('user002', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1, 'READ,WRITE', 0, 'system', 'system'),
('user003', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1, 'READ,WRITE', 0, 'system', 'system'),
('producer001', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 2, 'READ,WRITE,PRODUCER', 0, 'system', 'system'),
('producer002', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 2, 'READ,WRITE,PRODUCER', 0, 'system', 'system');

-- ユーザーメール
INSERT INTO USER_EMAIL (seq_no, user_id, email, is_primary, disabled, created_by, updated_by) VALUES
(1, 'user001', 'user001@example.com', TRUE, 0, 'system', 'system'),
(1, 'user002', 'user002@example.com', TRUE, 0, 'system', 'system'),
(2, 'user002', 'user002.sub@example.com', FALSE, 0, 'system', 'system'),
(1, 'user003', 'user003@example.com', TRUE, 0, 'system', 'system'),
(1, 'producer001', 'producer001@example.com', TRUE, 0, 'system', 'system'),
(1, 'producer002', 'producer002@example.com', TRUE, 0, 'system', 'system');

-- ユーザー詳細
INSERT INTO USER_DETAIL (user_id, display_name, last_name, first_name, last_name_kana, first_name_kana, disabled, created_by, updated_by) VALUES
('user001', '田中太郎', '田中', '太郎', 'タナカ', 'タロウ', 0, 'system', 'system'),
('user002', '佐藤花子', '佐藤', '花子', 'サトウ', 'ハナコ', 0, 'system', 'system'),
('user003', '鈴木一郎', '鈴木', '一郎', 'スズキ', 'イチロウ', 0, 'system', 'system'),
('producer001', '山田農園', '山田', '健太', 'ヤマダ', 'ケンタ', 0, 'system', 'system'),
('producer002', '高橋牧場', '高橋', '美咲', 'タカハシ', 'ミサキ', 0, 'system', 'system');

-- ユーザー住所
INSERT INTO USER_ADDRESS (seq_no, user_id, address, prefecture_code, is_primary, disabled, created_by, updated_by) VALUES
(1, 'user001', '渋谷区1-2-3', '13', TRUE, 0, 'system', 'system'),
(1, 'user002', '横浜市中区4-5-6', '14', TRUE, 0, 'system', 'system'),
(2, 'user002', '川崎市幸区7-8-9', '14', FALSE, 0, 'system', 'system'),
(1, 'user003', '千代田区10-11-12', '13', TRUE, 0, 'system', 'system');

-- ユーザー電話番号
INSERT INTO USER_PHONE_NUMBER (seq_no, user_id, phone_number, type, is_primary, disabled, created_by, updated_by) VALUES
(1, 'user001', '090-1234-5678', '携帯', TRUE, 0, 'system', 'system'),
(1, 'user002', '080-2345-6789', '携帯', TRUE, 0, 'system', 'system'),
(2, 'user002', '03-3456-7890', '自宅', FALSE, 0, 'system', 'system'),
(1, 'user003', '090-3456-7890', '携帯', TRUE, 0, 'system', 'system');

-- ============================================================
-- 生産者データ
-- ============================================================

-- 生産者
INSERT INTO PRODUCER (producer_id, name, farm_name, description, image_path, disabled, created_by, updated_by) VALUES
('PROD001', '山田健太', '山田農園', '北海道の大自然で育てた新鮮野菜をお届けします。農薬を極力使わず、有機栽培にこだわっています。', '/images/producers/yamada.jpg', 0, 'system', 'system'),
('PROD002', '高橋美咲', '高橋牧場', '信州の清らかな水と空気で育った乳牛から、美味しい乳製品を生産しています。', '/images/producers/takahashi.jpg', 0, 'system', 'system'),
('PROD003', '佐々木農園', '佐々木農園', '青森のりんご専門農家です。甘くてジューシーなりんごを丹精込めて育てています。', '/images/producers/sasaki.jpg', 0, 'system', 'system'),
('PROD004', '田村水産', '田村水産', '静岡県の漁港から直送の新鮮な海の幸をお届けします。', '/images/producers/tamura.jpg', 0, 'system', 'system'),
('PROD005', '鈴木ファーム', '鈴木ファーム', '熊本県阿蘇の豊かな土壌で育てた美味しいお米をお届けします。', '/images/producers/suzuki.jpg', 0, 'system', 'system');

-- 生産者住所
INSERT INTO PRODUCER_ADDRESS (producer_id, area_kbn, address, disabled, created_by, updated_by) VALUES
('PROD001', 'HOKKAIDO', '北海道富良野市〇〇町1-2-3', 0, 'system', 'system'),
('PROD002', 'CHUBU', '長野県松本市〇〇町4-5-6', 0, 'system', 'system'),
('PROD003', 'TOHOKU', '青森県弘前市〇〇町7-8-9', 0, 'system', 'system'),
('PROD004', 'CHUBU', '静岡県焼津市〇〇町10-11-12', 0, 'system', 'system'),
('PROD005', 'KYUSHU', '熊本県阿蘇市〇〇町13-14-15', 0, 'system', 'system');

-- ============================================================
-- 商品データ
-- ============================================================

-- 商品
INSERT INTO PRODUCT (product_id, description, price, stock_quantity, category_id, producer_id, disabled, created_by, updated_by) VALUES
('P001001', '北海道産の新鮮なじゃがいもです。ホクホクとした食感が特徴で、煮物や炒め物に最適です。', 580.00, 100, 'CAT001', 'PROD001', 0, 'system', 'system'),
('P001002', '北海道産の甘くて美味しいとうもろこしです。生でも食べられる甘さです。', 680.00, 80, 'CAT001', 'PROD001', 0, 'system', 'system'),
('P001003', '北海道産の新鮮なアスパラガスです。太くて柔らかく、甘みがあります。', 880.00, 50, 'CAT001', 'PROD001', 0, 'system', 'system'),
('P002001', '信州産の濃厚な生乳から作った牛乳です。毎日搾りたてをお届けします。', 380.00, 200, 'CAT005', 'PROD002', 0, 'system', 'system'),
('P002002', '信州産のヨーグルトです。無添加で健康的、プレーンタイプです。', 420.00, 150, 'CAT005', 'PROD002', 0, 'system', 'system'),
('P002003', '信州産のチーズです。クリーミーで濃厚な味わいが特徴です。', 1200.00, 60, 'CAT005', 'PROD002', 0, 'system', 'system'),
('P003001', '青森県産の甘くて美味しいふじりんごです。蜜入りで絶品です。', 980.00, 120, 'CAT002', 'PROD003', 0, 'system', 'system'),
('P003002', '青森県産の王林りんごです。酸味が少なく、甘みが強いのが特徴です。', 880.00, 100, 'CAT002', 'PROD003', 0, 'system', 'system'),
('P004001', '静岡県産の新鮮なマグロです。刺身や寿司に最適です。', 2800.00, 30, 'CAT007', 'PROD004', 0, 'system', 'system'),
('P004002', '静岡県産の新鮮なサバです。焼き魚や煮魚に最適です。', 680.00, 50, 'CAT007', 'PROD004', 0, 'system', 'system'),
('P005001', '熊本県阿蘇産のコシヒカリです。もっちりとした食感が特徴です。', 3800.00, 200, 'CAT003', 'PROD005', 0, 'system', 'system'),
('P005002', '熊本県阿蘇産のひのひかりです。甘みがあり、冷めても美味しいお米です。', 3500.00, 180, 'CAT003', 'PROD005', 0, 'system', 'system');

-- 商品画像
INSERT INTO PRODUCT_IMAGE (product_id, view_order, image_path, disabled, created_by, updated_by) VALUES
('P001001', 1, '/images/products/P001001_1.jpg', 0, 'system', 'system'),
('P001001', 2, '/images/products/P001001_2.jpg', 0, 'system', 'system'),
('P001002', 1, '/images/products/P001002_1.jpg', 0, 'system', 'system'),
('P001002', 2, '/images/products/P001002_2.jpg', 0, 'system', 'system'),
('P001003', 1, '/images/products/P001003_1.jpg', 0, 'system', 'system'),
('P002001', 1, '/images/products/P002001_1.jpg', 0, 'system', 'system'),
('P002002', 1, '/images/products/P002002_1.jpg', 0, 'system', 'system'),
('P002003', 1, '/images/products/P002003_1.jpg', 0, 'system', 'system'),
('P003001', 1, '/images/products/P003001_1.jpg', 0, 'system', 'system'),
('P003001', 2, '/images/products/P003001_2.jpg', 0, 'system', 'system'),
('P003001', 3, '/images/products/P003001_3.jpg', 0, 'system', 'system'),
('P003002', 1, '/images/products/P003002_1.jpg', 0, 'system', 'system'),
('P004001', 1, '/images/products/P004001_1.jpg', 0, 'system', 'system'),
('P004002', 1, '/images/products/P004002_1.jpg', 0, 'system', 'system'),
('P005001', 1, '/images/products/P005001_1.jpg', 0, 'system', 'system'),
('P005002', 1, '/images/products/P005002_1.jpg', 0, 'system', 'system');

-- ============================================================
-- 閲覧履歴データ
-- ============================================================

-- 閲覧履歴
INSERT INTO VIEW_HISTORY (user_id, product_id, viewed_at, disabled) VALUES
('user001', 'P001001', '2025-12-20 10:30:00', 0),
('user001', 'P003001', '2025-12-20 10:35:00', 0),
('user001', 'P002001', '2025-12-20 10:40:00', 0),
('user002', 'P005001', '2025-12-20 11:00:00', 0),
('user002', 'P001002', '2025-12-20 11:10:00', 0),
('user002', 'P004001', '2025-12-20 11:20:00', 0),
('user003', 'P003001', '2025-12-20 12:00:00', 0),
('user003', 'P003002', '2025-12-20 12:05:00', 0),
('user003', 'P002003', '2025-12-20 12:15:00', 0);

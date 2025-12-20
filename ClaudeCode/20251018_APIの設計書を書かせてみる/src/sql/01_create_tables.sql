-- ============================================================
-- テーブル定義DDL
-- ============================================================

-- ============================================================
-- マスタテーブル
-- ============================================================

-- 都道府県マスタ
CREATE TABLE IF NOT EXISTS PREFECTURE (
    prefecture_code VARCHAR(10) PRIMARY KEY COMMENT '都道府県コード',
    name VARCHAR(50) NOT NULL COMMENT '都道府県名',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時'
) COMMENT='都道府県マスタ';

-- 所在地マスタ
CREATE TABLE IF NOT EXISTS AREA (
    area_kbn VARCHAR(10) PRIMARY KEY COMMENT '所在地区分',
    name VARCHAR(100) NOT NULL COMMENT 'エリア名',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時'
) COMMENT='所在地マスタ';

-- カテゴリ
CREATE TABLE IF NOT EXISTS CATEGORY (
    category_id VARCHAR(50) PRIMARY KEY COMMENT 'カテゴリID',
    name VARCHAR(100) NOT NULL COMMENT 'カテゴリ名',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時'
) COMMENT='カテゴリ';

-- ============================================================
-- ユーザー関連テーブル
-- ============================================================

-- ユーザー
CREATE TABLE IF NOT EXISTS USER (
    user_id VARCHAR(255) PRIMARY KEY COMMENT 'ユーザーID',
    password VARCHAR(255) NOT NULL COMMENT 'パスワード(ハッシュ)',
    user_role INT NOT NULL COMMENT '役職',
    permissions VARCHAR(500) COMMENT '権限',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時'
) COMMENT='ユーザー';

-- ユーザーメール
CREATE TABLE IF NOT EXISTS USER_EMAIL (
    seq_no INT NOT NULL COMMENT '連番',
    user_id VARCHAR(255) NOT NULL COMMENT 'User.user_id',
    email VARCHAR(255) NOT NULL COMMENT 'メールアドレス',
    is_primary BOOLEAN DEFAULT FALSE COMMENT 'メイン住所かどうか',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    PRIMARY KEY (seq_no, user_id),
    FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE
) COMMENT='ユーザーメール';

-- ユーザー詳細
CREATE TABLE IF NOT EXISTS USER_DETAIL (
    user_id VARCHAR(255) PRIMARY KEY COMMENT 'User.user_id',
    display_name VARCHAR(100) COMMENT '表示名(ニックネーム等)',
    last_name VARCHAR(50) COMMENT '氏名(姓)',
    first_name VARCHAR(50) COMMENT '氏名(名)',
    last_name_kana VARCHAR(50) COMMENT '氏名かな(姓)',
    first_name_kana VARCHAR(50) COMMENT '氏名かな(名)',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE
) COMMENT='ユーザー詳細';

-- ユーザー住所
CREATE TABLE IF NOT EXISTS USER_ADDRESS (
    seq_no INT NOT NULL COMMENT '連番',
    user_id VARCHAR(255) NOT NULL COMMENT 'User.user_id',
    address VARCHAR(255) COMMENT '住所',
    prefecture_code VARCHAR(10) COMMENT 'Prefecture.prefecture_code',
    is_primary BOOLEAN DEFAULT FALSE COMMENT 'メイン住所かどうか',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    PRIMARY KEY (seq_no, user_id),
    FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE,
    FOREIGN KEY (prefecture_code) REFERENCES PREFECTURE(prefecture_code)
) COMMENT='ユーザー住所';

-- ユーザー電話番号
CREATE TABLE IF NOT EXISTS USER_PHONE_NUMBER (
    seq_no INT NOT NULL COMMENT '連番',
    user_id VARCHAR(255) NOT NULL COMMENT 'User.user_id',
    phone_number VARCHAR(20) NOT NULL COMMENT '電話番号',
    type VARCHAR(20) COMMENT '自宅・携帯など',
    is_primary BOOLEAN DEFAULT FALSE COMMENT 'メイン電話番号かどうか',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    PRIMARY KEY (seq_no, user_id),
    FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE
) COMMENT='ユーザー電話番号';

-- ============================================================
-- 生産者関連テーブル
-- ============================================================

-- 生産者
CREATE TABLE IF NOT EXISTS PRODUCER (
    producer_id VARCHAR(50) PRIMARY KEY COMMENT '生産者ID',
    name VARCHAR(100) NOT NULL COMMENT '生産者名',
    farm_name VARCHAR(100) COMMENT '農園名',
    description TEXT COMMENT '農園説明',
    image_path VARCHAR(500) COMMENT '生産者画像',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時'
) COMMENT='生産者';

-- 生産者住所
CREATE TABLE IF NOT EXISTS PRODUCER_ADDRESS (
    producer_id VARCHAR(50) NOT NULL COMMENT 'Producer.producer_id',
    area_kbn VARCHAR(10) NOT NULL COMMENT '所在地区分',
    address VARCHAR(255) NOT NULL COMMENT '所在地',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    PRIMARY KEY (producer_id, area_kbn),
    FOREIGN KEY (producer_id) REFERENCES PRODUCER(producer_id) ON DELETE CASCADE,
    FOREIGN KEY (area_kbn) REFERENCES AREA(area_kbn)
) COMMENT='生産者住所';

-- ============================================================
-- 商品関連テーブル
-- ============================================================

-- 商品
CREATE TABLE IF NOT EXISTS PRODUCT (
    product_id VARCHAR(50) PRIMARY KEY COMMENT '製品ID',
    description TEXT COMMENT '商品説明',
    price DECIMAL(10, 2) NOT NULL COMMENT '価格',
    stock_quantity INT NOT NULL DEFAULT 0 COMMENT '在庫数',
    category_id VARCHAR(50) COMMENT 'Category.category_id',
    producer_id VARCHAR(50) COMMENT 'Producer.producer_id',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id),
    FOREIGN KEY (producer_id) REFERENCES PRODUCER(producer_id)
) COMMENT='商品';

-- 商品画像
CREATE TABLE IF NOT EXISTS PRODUCT_IMAGE (
    product_id VARCHAR(50) NOT NULL COMMENT 'Product.product_id',
    view_order INT NOT NULL COMMENT '画像表示順番',
    image_path VARCHAR(500) NOT NULL COMMENT '画像パス',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_by VARCHAR(255) NOT NULL COMMENT '作成者 User.user_id',
    updated_by VARCHAR(255) NOT NULL COMMENT '更新者 User.user_id',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    PRIMARY KEY (product_id, view_order),
    FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id) ON DELETE CASCADE
) COMMENT='商品画像';

-- ============================================================
-- 履歴関連テーブル
-- ============================================================

-- 閲覧履歴
CREATE TABLE IF NOT EXISTS VIEW_HISTORY (
    user_id VARCHAR(255) NOT NULL COMMENT 'User.user_id',
    product_id VARCHAR(50) NOT NULL COMMENT 'Product.product_id',
    viewed_at DATETIME NOT NULL COMMENT '閲覧した日時',
    disabled INT DEFAULT 0 NOT NULL COMMENT '使用:0,不使用:1',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    PRIMARY KEY (user_id, product_id, viewed_at),
    FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id) ON DELETE CASCADE
) COMMENT='閲覧履歴';

-- ============================================================
-- インデックス
-- ============================================================

-- パフォーマンス向上のためのインデックス
CREATE INDEX idx_product_category ON PRODUCT(category_id);
CREATE INDEX idx_product_producer ON PRODUCT(producer_id);
CREATE INDEX idx_view_history_user ON VIEW_HISTORY(user_id);
CREATE INDEX idx_view_history_product ON VIEW_HISTORY(product_id);
CREATE INDEX idx_view_history_viewed_at ON VIEW_HISTORY(viewed_at);

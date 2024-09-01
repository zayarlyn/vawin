use yyyy;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `order_product`;

CREATE TABLE `customer` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deleted_at DATETIME NULL
) ENGINE = InnoDB;

CREATE TABLE `product` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deleted_at DATETIME NULL
) ENGINE = InnoDB;

CREATE TABLE `order` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('draft', 'paid', 'packaging', 'shipped', 'completed', 'cancelled', 'refunded') NOT NULL DEFAULT 'draft',
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deleted_at DATETIME NULL,
    customer_id BIGINT NOT NULL,

    FOREIGN KEY (customer_id) REFERENCES `customer`(id)
) ENGINE = InnoDB;

CREATE TABLE `order_product` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deleted_at DATETIME NULL,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,

    FOREIGN KEY (order_id) REFERENCES `order`(id),
    FOREIGN KEY (product_id) REFERENCES `product`(id)
) ENGINE = InnoDB;



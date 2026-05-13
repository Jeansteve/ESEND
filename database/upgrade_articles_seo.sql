-- Upgrade esend_articles with SEO columns
ALTER TABLE `esend_articles` ADD COLUMN `meta_title` VARCHAR(255) DEFAULT NULL AFTER `content`;
ALTER TABLE `esend_articles` ADD COLUMN `meta_description` TEXT DEFAULT NULL AFTER `meta_title`;

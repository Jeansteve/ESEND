-- Upgrade esend_articles with views and read_time columns
ALTER TABLE `esend_articles` ADD COLUMN `views` INT DEFAULT 0 AFTER `publish_date`;
ALTER TABLE `esend_articles` ADD COLUMN `read_time` INT DEFAULT 1 AFTER `views`;

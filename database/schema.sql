-- SQL Schema for ESEND Admin (MySQL)
-- Specialist: developpeur-back-end-ops

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Table Articles (Journal de l'Expert)
CREATE TABLE IF NOT EXISTS `esend_articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `publish_date` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Table Réalisations (Interventions)
CREATE TABLE IF NOT EXISTS `esend_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `tag` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Table Settings (Configurations)
CREATE TABLE IF NOT EXISTS `esend_settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Initial Settings
INSERT INTO `esend_settings` (`setting_key`, `setting_value`) VALUES
('gemini_api_key', ''),
('gemini_enabled', 'true'),
('contact_email', 'contact@esendnuisibles.fr'),
('google_reviews_id', ''),
('ga_id', ''),
('admin_password', 'admin')
ON DUPLICATE KEY UPDATE `setting_value` = `setting_value`;

SET FOREIGN_KEY_CHECKS = 1;

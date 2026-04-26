-- SQL Schema for ESEND Admin (MySQL) - VERSION ALIGNÉE SUR TNERI
-- Specialist: developpeur-back-end-ops

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Table Utilisateurs (Authentification Admin)
-- Comme sur TNERI, on sépare les comptes du reste des réglages.
CREATE TABLE IF NOT EXISTS `esend_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT 'Admin ESEND',
  `role` varchar(50) DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Table Articles (Journal de l'Expert)
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

-- 3. Table Réalisations (Interventions)
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

-- 4. Table Settings (Configurations)
CREATE TABLE IF NOT EXISTS `esend_settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Données Initiales
-- Suppression de admin_password de settings (on utilise esend_users maintenant)
INSERT INTO `esend_settings` (`setting_key`, `setting_value`) VALUES
('gemini_api_key', ''),
('gemini_enabled', 'true'),
('apify_token', ''),
('contact_email', 'contact@esendnuisibles.fr'),
('company_phone', ''),
('company_address', 'Menton, Alpes-Maritimes (06)'),
('company_siret', ''),
('company_name', 'ESEND Nuisibles'),
('company_certifications', 'Certibiocide'),
('company_zones', 'Menton, Monaco, Roquebrune-Cap-Martin, Cap-d\'Ail, Beausoleil, Nice, Côte d\'Azur (06)'),
('company_strengths', 'Intervention discrète et rapide, expertise en milieu haut de gamme, protocoles certifiés Certibiocide'),
('google_reviews_id', ''),
('ga_id', '')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- Création de l'utilisateur admin par défaut
INSERT INTO `esend_users` (`email`, `password`, `name`) VALUES
('admin@esend.fr', 'admin', 'Steve ESEND')
ON DUPLICATE KEY UPDATE `email` = `email`;

SET FOREIGN_KEY_CHECKS = 1;

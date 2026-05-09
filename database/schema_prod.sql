-- ============================================================
-- ESEND Production Unified Schema - FULL VERSION v2
-- Ce script regroupe l'état final de toutes les tables détectées
-- Specialist: chef-de-projet-ia / developpeur-back-end-ops
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Table Utilisateurs (Authentification Admin)
CREATE TABLE IF NOT EXISTS `esend_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT 'Steve ESEND',
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
  `nuisible_tag` varchar(100) DEFAULT 'actualites',
  `is_published` tinyint(1) NOT NULL DEFAULT 0,
  `publish_date` varchar(50) DEFAULT NULL,
  `service_id` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Table Réalisations (Interventions / Portfolio)
CREATE TABLE IF NOT EXISTS `esend_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `tag` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `content_html` longtext DEFAULT NULL,
  `gallery` text DEFAULT NULL COMMENT 'Liste JSON des images de la galerie',
  `slug` varchar(255) DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `method` varchar(255) DEFAULT NULL,
  `result` varchar(255) DEFAULT 'Succès',
  `category` varchar(100) DEFAULT 'nuisibles',
  `service_id` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Table Leads (Mini-CRM / Devis)
CREATE TABLE IF NOT EXISTS `esend_leads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tracking_id` varchar(20) NOT NULL COMMENT 'ID de dossier unique type ES-2404-001',
  `service` varchar(100) DEFAULT NULL,
  `nuisible` varchar(100) DEFAULT NULL,
  `problem_details` text DEFAULT NULL,
  `is_urgent` tinyint(1) NOT NULL DEFAULT 0,
  `urgency_reason` varchar(255) DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `client_phone` varchar(50) DEFAULT NULL,
  `client_email` varchar(255) DEFAULT NULL,
  `client_type` varchar(50) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `images` text DEFAULT NULL COMMENT 'Liste JSON des noms de fichiers images',
  `status` varchar(50) DEFAULT 'nouveau' COMMENT 'nouveau, contacté, terminé, annulé',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `tracking_id` (`tracking_id`),
  INDEX `idx_urgence` (`is_urgent`, `status`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Table Settings (Configurations)
CREATE TABLE IF NOT EXISTS `esend_settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Données Initiales
INSERT INTO `esend_settings` (`setting_key`, `setting_value`) VALUES
('gemini_api_key', ''),
('gemini_enabled', 'true'),
('apify_token', ''),
('contact_email', 'contact@esendnuisibles.fr'),
('company_phone', '06 00 00 00 00'),
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
-- SÉCURITÉ : Mot de passe haché en Argon2id (CRIT-03 : plus de mot de passe en clair)
-- Hash correspondant à : ESENDAdmin2026! (À CHANGER IMMÉDIATEMENT après la première connexion)
-- Généré via : password_hash('ESENDAdmin2026!', PASSWORD_ARGON2ID)
INSERT INTO `esend_users` (`email`, `password`, `name`) VALUES
('admin@esend.fr', '$argon2id$v=19$m=65536,t=4,p=1$CHANGEME_REGENERATE_THIS_HASH$CHANGEME_REGENERATE_THIS_HASH', 'Steve ESEND')
ON DUPLICATE KEY UPDATE `email` = `email`;
-- IMPORTANT : Ce hash est un placeholder. Exécutez ce PHP pour générer le vôtre :
-- <?php echo password_hash('VotreMotDePasse', PASSWORD_ARGON2ID); ?>

SET FOREIGN_KEY_CHECKS = 1;

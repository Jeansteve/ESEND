-- Migration : Ajout de la table de gestion des leads (classification automatique)
-- A exécuter dans phpMyAdmin sur Hostinger

CREATE TABLE IF NOT EXISTS `esend_leads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tracking_id` varchar(20) NOT NULL COMMENT 'ID de dossier unique type ES-2404-001',
  `service` varchar(100) DEFAULT NULL,
  `nuisible` varchar(100) DEFAULT NULL,
  `problem_details` text DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `client_phone` varchar(50) DEFAULT NULL,
  `client_email` varchar(255) DEFAULT NULL,
  `client_type` varchar(50) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'nouveau' COMMENT 'nouveau, contacté, terminé, annulé',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `tracking_id` (`tracking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

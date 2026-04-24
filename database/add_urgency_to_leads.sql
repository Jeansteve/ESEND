-- Migration : Ajout du champ d'urgence déclarée par le client
-- A exécuter dans phpMyAdmin sur Hostinger

ALTER TABLE `esend_leads`
  ADD COLUMN `is_urgent` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1 = Intervention urgente demandée par le client' AFTER `problem_details`,
  ADD COLUMN `urgency_reason` VARCHAR(255) DEFAULT NULL COMMENT 'Raison de l urgence (optionnel)' AFTER `is_urgent`;

-- Index pour accélérer les requêtes de tri par urgence
ALTER TABLE `esend_leads` ADD INDEX `idx_urgence` (`is_urgent`, `status`, `created_at`);

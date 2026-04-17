  -- ============================================================
  -- ESEND Upgrade Réalisations v3 - Migration SQL
  -- Specialist: developpeur-back-end-ops
  -- ============================================================

  ALTER TABLE `esend_projects`
    ADD COLUMN IF NOT EXISTS `content_html` LONGTEXT DEFAULT NULL AFTER `description`,
    ADD COLUMN IF NOT EXISTS `gallery` TEXT DEFAULT NULL AFTER `content_html`,
    ADD COLUMN IF NOT EXISTS `slug` VARCHAR(255) DEFAULT NULL AFTER `gallery`,
    ADD COLUMN IF NOT EXISTS `meta_title` VARCHAR(255) DEFAULT NULL AFTER `slug`,
    ADD COLUMN IF NOT EXISTS `meta_description` TEXT DEFAULT NULL AFTER `meta_title`,
    ADD COLUMN IF NOT EXISTS `service_id` INT(11) DEFAULT 1 AFTER `category`;

  -- On génère un index sur le slug pour les performances de recherche publique
  CREATE INDEX IF NOT EXISTS idx_project_slug ON `esend_projects`(slug);

  -- Mise à jour : on injecte la description actuelle dans le content_html pour ne rien perdre
  UPDATE `esend_projects` SET `content_html` = CONCAT('<p>', `description`, '</p>') WHERE `content_html` IS NULL;

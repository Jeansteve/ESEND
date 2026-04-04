-- ============================================================
-- ESEND Admin v2 — Migration SQL
-- Specialist: developpeur-back-end-ops, database-migrations-sql-migrations
-- À exécuter UNE SEULE FOIS sur Hostinger via phpMyAdmin
-- ============================================================

-- === TABLE esend_articles ===

-- Ajout colonne nuisible_tag (catégorie granulaire : rats, frelons...)
ALTER TABLE esend_articles 
  ADD COLUMN IF NOT EXISTS nuisible_tag VARCHAR(100) DEFAULT 'actualites';

-- Ajout colonne is_published (1=publié, 0=brouillon)
ALTER TABLE esend_articles 
  ADD COLUMN IF NOT EXISTS is_published TINYINT(1) NOT NULL DEFAULT 0;

-- Synchroniser status existant → is_published
UPDATE esend_articles SET is_published = 1 WHERE status = 'published' OR status = 'publish';

-- Ajout colonne updated_at (date de dernière modification)
ALTER TABLE esend_articles 
  ADD COLUMN IF NOT EXISTS updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Ajout colonne service_id si absente (liaison catégorie service)
ALTER TABLE esend_articles
  ADD COLUMN IF NOT EXISTS service_id INT(11) DEFAULT 1;

-- === TABLE esend_projects ===

-- Ajout is_published (réalisations publiées par défaut)
ALTER TABLE esend_projects 
  ADD COLUMN IF NOT EXISTS is_published TINYINT(1) NOT NULL DEFAULT 1;

-- Ajout updated_at
ALTER TABLE esend_projects 
  ADD COLUMN IF NOT EXISTS updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Ajout method et result si absents (champs ProjectModal)
ALTER TABLE esend_projects 
  ADD COLUMN IF NOT EXISTS method VARCHAR(255) DEFAULT NULL;
ALTER TABLE esend_projects 
  ADD COLUMN IF NOT EXISTS result VARCHAR(255) DEFAULT 'Succès';
ALTER TABLE esend_projects 
  ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'nuisibles';

-- ============================================================
-- Vérification post-migration
-- ============================================================
-- SELECT id, title, is_published, nuisible_tag, updated_at FROM esend_articles LIMIT 5;
-- SELECT id, title, is_published, updated_at FROM esend_projects LIMIT 5;

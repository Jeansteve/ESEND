-- Migration ESEND V5 : Ajout du support des images dans les leads
-- A exécuter dans phpMyAdmin sur Hostinger

ALTER TABLE `esend_leads` 
ADD COLUMN `images` TEXT DEFAULT NULL COMMENT 'Liste JSON des noms de fichiers images' 
AFTER `city`;

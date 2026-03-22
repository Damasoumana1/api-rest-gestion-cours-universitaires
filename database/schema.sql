-- Suppression si existe (pour relancer facilement)
DROP TABLE IF EXISTS cours CASCADE;
DROP TABLE IF EXISTS utilisateurs CASCADE;
DROP TABLE IF EXISTS etudiants CASCADE;

-- Création de la table cours
CREATE TABLE cours (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    enseignant VARCHAR(255) NOT NULL,
    volume_horaire INTEGER NOT NULL CHECK (volume_horaire > 0),
    actif BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cours_titre ON cours(titre);
CREATE INDEX idx_cours_enseignant ON cours(enseignant);

-- Table utilisateurs
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table etudiants
CREATE TABLE etudiants (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    niveau VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fonction Trigger pour mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER trigger_update_cours
BEFORE UPDATE ON cours
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_update_utilisateurs
BEFORE UPDATE ON utilisateurs
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_update_etudiants
BEFORE UPDATE ON etudiants
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Données de test
INSERT INTO cours (titre, enseignant, volume_horaire, actif)
VALUES 
('Services Web', 'Dr. Somda', 30, TRUE),
('Architecture Logicielle', 'Dr. Somda', 24, TRUE),
('Bases de Données', 'Dr. Kaboré', 40, TRUE),
('Intelligence Artificielle', 'Dr. Ouédraogo', 35, FALSE);

-- Suppression si existe (pour relancer facilement)
DROP TABLE IF EXISTS cours CASCADE;

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

-- Fonction Trigger pour mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER trigger_update_cours
BEFORE UPDATE ON cours
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Données de test
INSERT INTO cours (titre, enseignant, volume_horaire, actif)
VALUES 
('Services Web', 'Dr. Somda', 30, TRUE),
('Architecture Logicielle', 'Dr. Somda', 24, TRUE),
('Bases de Données', 'Dr. Kaboré', 40, TRUE),
('Intelligence Artificielle', 'Dr. Ouédraogo', 35, FALSE);

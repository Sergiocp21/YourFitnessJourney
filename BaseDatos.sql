-- Tabla de Usuarios
CREATE TABLE users (
    google_id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100),
    picture_url VARCHAR(255),
    height DECIMAL(5, 2),
    weight DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Ejercicios
CREATE TABLE exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    muscle_group ENUM(
        'Pecho',
        'Espalda',
        'Piernas',
        'Brazos',
        'Hombros',
        'Cardio',
        'Otros'
    ),
    media_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Rutinas
CREATE TABLE routines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(50) NULL, -- Usuario que crea la rutina
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- Si es pública o privada
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (google_id) REFERENCES users (google_id) ON DELETE CASCADE
);

-- Relación entre Usuarios y Ejercicios en Rutinas (con sets planeados)
CREATE TABLE user_routine_exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(50) NOT NULL, -- Usuario que personaliza la rutina
    routine_id BIGINT NOT NULL, -- Rutina asociada
    exercise_id BIGINT NOT NULL, -- Ejercicio específico
    sets INT CHECK (sets > 0), -- Número de series planeado
    FOREIGN KEY (google_id) REFERENCES users (google_id) ON DELETE CASCADE,
    FOREIGN KEY (routine_id) REFERENCES routines (id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises (id) ON DELETE CASCADE
);

-- Último progreso registrado del usuario para cada ejercicio
CREATE TABLE user_exercise_progress (
    google_id VARCHAR(50) NOT NULL,
    exercise_id BIGINT NOT NULL,
    last_sets INT CHECK (last_sets > 0),
    last_reps INT CHECK (last_reps > 0),
    last_weight DECIMAL(5, 2),
    PRIMARY KEY (google_id, exercise_id),
    FOREIGN KEY (google_id) REFERENCES users (google_id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises (id) ON DELETE CASCADE
);
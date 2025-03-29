-- Tabla de Usuarios (Google ID como Primary Key)
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
    google_id VARCHAR(50) NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (google_id) REFERENCES users (google_id) ON DELETE CASCADE
);

-- Relación Rutinas-Ejercicios Personalizados por Usuario
CREATE TABLE routine_exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(50) NOT NULL, -- Usuario que personaliza el ejercicio
    routine_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    sets INT CHECK (sets > 0),
    reps INT CHECK (reps > 0),
    weight DECIMAL(5, 2),
    rest_time INT DEFAULT 60,
    FOREIGN KEY (google_id) REFERENCES users (google_id) ON DELETE CASCADE,
    FOREIGN KEY (routine_id) REFERENCES routines (id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises (id) ON DELETE CASCADE
);

-- Relación de usuarios que guardan/copias rutinas de otros
CREATE TABLE user_routines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(50) NOT NULL,
    routine_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (google_id) REFERENCES users (google_id) ON DELETE CASCADE,
    FOREIGN KEY (routine_id) REFERENCES routines (id) ON DELETE CASCADE
);
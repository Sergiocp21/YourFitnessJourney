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
        'PECHO',
        'ESPALDA',
        'PIERNAS',
        'BRAZOS',
        'HOMBROS',
        'CARDIO',
        'CLASES',
        'CROSSFIT',
        'ABS',
        'DESCANSO',
        'OTROS'
    ),
    media_url VARCHAR(255),
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

-- Días personalizados dentro de una rutina
CREATE TABLE routine_days (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    routine_id BIGINT NOT NULL,
    day_order INT NOT NULL,
    day_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (routine_id) REFERENCES routines (id) ON DELETE CASCADE
);

-- Relación entre días de rutina y ejercicios personalizados del usuario
CREATE TABLE user_routine_day_exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(50) NOT NULL,
    routine_day_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    sets INT CHECK (sets > 0),
    exercise_order INT NOT NULL,
    FOREIGN KEY (google_id) REFERENCES users (google_id) ON DELETE CASCADE,
    FOREIGN KEY (routine_day_id) REFERENCES routine_days (id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises (id) ON DELETE CASCADE
);

-- Progreso del usuario en su rutina activa
CREATE TABLE user_routine_progress (
    google_id VARCHAR(50) PRIMARY KEY,
    routine_id BIGINT NOT NULL,
    current_day_order INT NOT NULL DEFAULT 1,
    last_completed DATE,
    FOREIGN KEY (google_id) REFERENCES users (google_id) ON DELETE CASCADE,
    FOREIGN KEY (routine_id) REFERENCES routines (id) ON DELETE CASCADE
);

-- Progreso del usuario por ejercicio
CREATE TABLE user_exercises (
    google_id VARCHAR(50) NOT NULL,
    exercise_id BIGINT NOT NULL,
    last_reps INT CHECK (last_reps >= 0),
    last_weight DECIMAL(5, 2),
    exercise_note VARCHAR(255),
    PRIMARY KEY (google_id, exercise_id),
    FOREIGN KEY (google_id) REFERENCES users (google_id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises (id) ON DELETE CASCADE
);
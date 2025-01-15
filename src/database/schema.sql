CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


CREATE TABLE languages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Insertar datos iniciales
INSERT INTO languages (name) VALUES ('JavaScript');


CREATE TABLE levels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Insertar datos iniciales
INSERT INTO levels (name) VALUES ('Principiante'), ('Intermedio'), ('Avanzado');


CREATE TABLE requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  language_id INT,
  level_id INT,
  user_id INT,
  FOREIGN KEY (language_id) REFERENCES languages(id),
  FOREIGN KEY (level_id) REFERENCES levels(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

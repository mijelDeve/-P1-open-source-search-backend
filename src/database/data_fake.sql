-- Crear la base de datos (si aún no está creada)
CREATE DATABASE IF NOT EXISTS open_source_app;
USE open_source_app;

-- Crear tabla `user` (Usuarios)
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Insertar datos falsos en `user`
INSERT INTO user (username, email, password) VALUES
('juanperez', 'juanperez@example.com', 'password123'),
('mariafernandez', 'maria@example.com', 'maria123'),
('alexmartinez', 'alexmartinez@example.com', 'alex123');

-- Crear tabla `language` (Lenguajes)
CREATE TABLE IF NOT EXISTS language (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Insertar datos falsos en `language`
INSERT INTO language (name) VALUES
('JavaScript'),
('Python'),
('Java'),
('Ruby'),
('Go');

-- Crear tabla `level` (Niveles)
CREATE TABLE IF NOT EXISTS level (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Insertar datos falsos en `level`
INSERT INTO level (name) VALUES
('Principiante'),
('Intermedio'),
('Avanzado');

-- Crear tabla `request` (Peticiones)
CREATE TABLE IF NOT EXISTS request (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  language_id INT,
  level_id INT,
  user_id INT,
  FOREIGN KEY (language_id) REFERENCES language(id),
  FOREIGN KEY (level_id) REFERENCES level(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Insertar datos falsos en `request`
INSERT INTO request (title, description, link, language_id, level_id, user_id) VALUES
('Contribuir a un proyecto en JavaScript', 'Proyecto para mejorar una librería de JavaScript.', 'https://github.com/juanperez/js-project', 1, 2, 1),
('Desarrollo de un chatbot en Python', 'Crear un chatbot sencillo usando NLP.', 'https://github.com/maria/python-chatbot', 2, 1, 2),
('Aplicación móvil con Java', 'Desarrollar una app Android usando Java.', 'https://github.com/alexmartinez/android-app', 3, 3, 3),
('Automatización de tareas con Ruby', 'Script de automatización de tareas usando Ruby.', 'https://github.com/juanperez/ruby-automation', 4, 2, 1),
('Proyecto de microservicios en Go', 'Crear un sistema de microservicios usando Go.', 'https://github.com/alexmartinez/go-microservices', 5, 3, 3);

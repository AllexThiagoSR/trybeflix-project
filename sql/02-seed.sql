USE Trybeflix;
INSERT INTO directors(name) VALUES ('Christopher Nolan');
INSERT INTO genres(name) VALUES
('Ação'),
('Drama'),
('Ficção Científica'),
('Aventura'),
('Mistério');
INSERT INTO movies(name, release_year, director_id, genre_id) VALUES
('A Origem', 2010, 1, 3),
('Tenet', 2020, 1, 1),
('O Grande Truque', 2006, 1, 2),
('Batman: O Cavaleiro das Trevas Ressurge', 2012, 1, 1),
('Dunkirk', 2017, 1, 1),
('Interestelar', 2014, 1, 3),
('Amnésia', 2000, 1, 5);
CREATE TABLE IF NOT EXISTS prodotti (
	id serial PRIMARY KEY,
	name VARCHAR ( 50 ) UNIQUE NOT NULL,
	count INT NOT NULL
)
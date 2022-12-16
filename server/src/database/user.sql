CREATE TYPE UserRole AS ENUM ('admin', 'user');


CREATE TABLE IF NOT EXISTS users (
   id serial NOT NULL,
   username VARCHAR ( 50 ) UNIQUE NOT NULL,
    password VARCHAR ( 50 ) NOT NULL,

    firstName VARCHAR ( 50 ) NOT NULL,
    lastName VARCHAR ( 50 ) NOT NULL,
    email VARCHAR ( 50 ) UNIQUE NOT NULL,
    role UserRole NOT NULL DEFAULT 'user',
    refreshToken VARCHAR ( 50 ) NULL,
    createAt TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updateAt TIMESTAMP NOT NULL DEFAULT current_timestamp
);
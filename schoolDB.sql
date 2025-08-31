-- Run this in MySQL to create the database and table
CREATE DATABASE IF NOT EXISTS schoolDB;
USE schoolDB;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(15) NOT NULL,
  image TEXT NOT NULL,
  email_id TEXT NOT NULL
);

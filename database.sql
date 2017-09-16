CREATE DATABASE todolist;

CREATE TABLE tasks_todo(
	id SERIAL PRIMARY KEY,
	task VARCHAR(50),
	description VARCHAR(100),
	date_added DATE,
	deadline DATE,
	complete BOOLEAN DEFAULT false);
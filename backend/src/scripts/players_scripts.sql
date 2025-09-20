/* CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
	team_id INTEGER,
	position_id INTEGER,
	contractValue INTEGER,
	contractYears INTEGER,
    isActive BOOLEAN DEFAULT TRUE,
	CONSTRAINT fk_team FOREIGN KEY(team_id) REFERENCES teams(id) ON DELETE SET NULL,
	CONSTRAINT fk_position FOREIGN KEY(position_id) REFERENCES positions(id) ON DELETE SET NULL
); */

INSERT INTO players (name, team_id, position_id, contractValue, contractYears)
VALUES ('Dak Prescott', 9, 1, 240000000, 4);